import os
import json
import requests
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from .prompts import RECIPE_GENERATION_SYSTEM_PROMPT, get_recipe_prompt

# Load environment variables
load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.mock_mode = not self.api_key
        
        if self.mock_mode:
            print("Warning: GEMINI_API_KEY not found. Running in mock mode with sample data.")
        else:
            # Use the Gemini 2.0 Flash model via REST API
            self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"
        
    def generate_recipes_from_ingredients(
        self, 
        ingredients: List[str], 
        style: str = "default",
        preferences: Optional[Dict[str, Any]] = None,
        detailed_ingredients: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Generate recipes based on ingredients using Gemini AI REST API
        """
        
        # If in mock mode, return sample data
        if self.mock_mode:
            return self._get_mock_recipes(ingredients, style, preferences)
        
        # Build the prompt using our prompt templates
        if detailed_ingredients:
            # Format detailed ingredients for the prompt
            ingredient_text = []
            for ing in detailed_ingredients:
                text = ing['name']
                if ing.get('quantity') and ing.get('unit'):
                    text += f" ({ing['quantity']} {ing['unit']})"
                ingredient_text.append(text)
            ingredients = ingredient_text
        
        user_prompt = get_recipe_prompt(
            ingredients=ingredients,
            style=style,
            **(preferences or {})
        )
        
        # Force JSON output with very explicit instructions
        full_prompt = f"""OUTPUT ONLY VALID JSON. NO OTHER TEXT.
        
{user_prompt}

IMPORTANT: Your entire response must be a valid JSON array starting with [ and ending with ]. Do not include any explanatory text before or after the JSON."""
        
        # Prepare the request payload
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": full_prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,  # Lower temperature for more consistent JSON
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 2048
            }
        }
        
        try:
            # Make the API request
            response = requests.post(
                self.api_url,
                headers={'Content-Type': 'application/json'},
                json=payload
            )
            
            # Check for errors
            if response.status_code != 200:
                raise Exception(f"API returned status code {response.status_code}: {response.text}")
            
            # Parse the response
            result = response.json()
            
            # Extract the generated text
            if 'candidates' in result and len(result['candidates']) > 0:
                generated_text = result['candidates'][0]['content']['parts'][0]['text']
                
                # Debug: Print what AI returned
                print(f"AI Response: {generated_text[:500]}...")  # Print first 500 chars
                
                # Clean up the response if it contains markdown code blocks
                if "```json" in generated_text:
                    generated_text = generated_text.split("```json")[1].split("```")[0]
                elif "```" in generated_text:
                    generated_text = generated_text.split("```")[1].split("```")[0]
                
                # Try to find JSON array in the response
                import re
                # Look for array pattern
                array_match = re.search(r'\[\s*\{[\s\S]*\}\s*\]', generated_text)
                if array_match:
                    generated_text = array_match.group()
                
                # Parse JSON
                parsed_response = json.loads(generated_text.strip())
                
                # Debug: Print parsed response type
                print(f"Parsed response type: {type(parsed_response)}")
                
                # Handle if AI returns array directly instead of object with 'recipes' key
                if isinstance(parsed_response, list):
                    parsed_response = {"recipes": parsed_response}
                
                return parsed_response
            else:
                raise Exception("No candidates found in API response")
                
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON. Raw response: {generated_text[:200]}...")
            # Try to extract JSON if it's embedded in text
            import re
            json_match = re.search(r'\[[\s\S]*\]', generated_text)
            if json_match:
                try:
                    parsed = json.loads(json_match.group())
                    return {"recipes": parsed} if isinstance(parsed, list) else parsed
                except:
                    pass
            raise Exception(f"Failed to parse AI response as JSON: {str(e)}")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Error making API request: {str(e)}")
        except Exception as e:
            raise Exception(f"Error calling Gemini API: {str(e)}")
    
    def _get_mock_recipes(self, ingredients: List[str], style: str = "default", preferences: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Return mock recipe data for testing when API key is not available"""
        mock_recipes = [
            {
                "name": f"Delicious {style.title()} Recipe",
                "description": f"A tasty recipe using {', '.join(ingredients[:3])}",
                "ingredients": [
                    {"name": ing, "quantity": "1", "unit": "piece"} for ing in ingredients[:5]
                ],
                "instructions": [
                    "Wash and prepare all ingredients",
                    "Heat oil in a pan",
                    "Add ingredients and cook for 10 minutes",
                    "Season to taste and serve"
                ],
                "cooking_time": 20,
                "difficulty": "Easy",
                "servings": 2,
                "nutrition": {
                    "calories": 300,
                    "protein": "15g",
                    "carbs": "25g",
                    "fat": "12g"
                }
            },
            {
                "name": f"Quick {style.title()} Meal",
                "description": f"Fast and healthy meal with {', '.join(ingredients[:2])}",
                "ingredients": [
                    {"name": ing, "quantity": "2", "unit": "pieces"} for ing in ingredients[:3]
                ],
                "instructions": [
                    "Prepare ingredients",
                    "Cook in a skillet",
                    "Add seasoning",
                    "Serve hot"
                ],
                "cooking_time": 15,
                "difficulty": "Easy",
                "servings": 1,
                "nutrition": {
                    "calories": 250,
                    "protein": "12g",
                    "carbs": "20g",
                    "fat": "10g"
                }
            }
        ]
        
        return {"recipes": mock_recipes}

# Create a singleton instance
gemini_service = GeminiService()
