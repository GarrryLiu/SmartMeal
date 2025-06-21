"""
Utilities for processing AI responses
"""
import json
from typing import List, Dict, Any
from models.schemas import Recipe

def parse_recipe_response(ai_response: Dict[str, Any]) -> List[Recipe]:
    """
    Parse and validate AI response into Recipe objects
    
    Args:
        ai_response: Dictionary from AI containing recipes
        
    Returns:
        List of validated Recipe objects
    """
    recipes = []
    
    # Handle different possible response formats
    recipe_list = None
    
    # Check for 'recipes' key (expected format)
    if 'recipes' in ai_response:
        recipe_list = ai_response['recipes']
    # Check if the response itself is a list
    elif isinstance(ai_response, list):
        recipe_list = ai_response
    # Check for other possible keys
    elif 'items' in ai_response:
        recipe_list = ai_response['items']
    elif 'results' in ai_response:
        recipe_list = ai_response['results']
    else:
        # If none of the above, print the keys to debug
        print(f"Unexpected AI response format. Keys found: {ai_response.keys()}")
        raise ValueError(f"AI response missing 'recipes' field. Found keys: {list(ai_response.keys())}")
    
    for idx, recipe_data in enumerate(recipe_list):
        try:
            # Handle ingredients - they might come as objects or strings
            ingredients = recipe_data.get('ingredients', [])
            if ingredients and isinstance(ingredients[0], dict):
                # If ingredients are objects like {"item": "Chicken", "quantity": "2"}
                ingredients = [ing.get('item', str(ing)) for ing in ingredients]
            
            # Ensure required fields with defaults
            recipe = Recipe(
                id=recipe_data.get('id', f'ai_recipe_{idx}'),
                name=recipe_data['name'],
                description=recipe_data['description'],
                ingredients=ingredients,
                instructions=recipe_data.get('instructions', []),
                prep_time=int(recipe_data.get('prep_time', 15)),
                cook_time=int(recipe_data.get('cook_time', 30)),
                servings=int(recipe_data.get('servings', 4)),
                calories_per_serving=int(recipe_data.get('calories_per_serving', 0)),
                tags=recipe_data.get('tags', [])
            )
            recipes.append(recipe)
        except Exception as e:
            print(f"Error parsing recipe {idx}: {str(e)}")
            continue
    
    if not recipes:
        raise ValueError("No valid recipes could be parsed from AI response")
    
    return recipes

def extract_ingredients_from_receipt(receipt_text: str) -> List[str]:
    """
    Extract ingredients from receipt text
    This is a placeholder - in production, you'd use OCR or more sophisticated parsing
    """
    # For demo, return mock ingredients
    return [
        'chicken breast', 'bell peppers', 'onions', 'garlic',
        'rice', 'tomatoes', 'olive oil', 'pasta', 'ground beef', 'cheese'
    ]
