"""
Prompt templates for different AI generation scenarios
"""

RECIPE_GENERATION_SYSTEM_PROMPT = """You are a recipe generation API that ONLY returns valid JSON responses. 
Never include explanatory text, greetings, or commentary outside the JSON structure.
Always respond with a JSON array of recipe objects and nothing else."""

RECIPE_GENERATION_PROMPTS = {
    "default": """Based on these grocery items, create 2-3 diverse recipes that:
- Use ingredients efficiently (minimize waste)
- Offer variety in cooking time (quick & regular options)
- Include different meal types (main, side, etc.)
- Are practical for home cooking

Ingredients: {ingredients}

Return ONLY a valid JSON array of recipes in this exact format (no additional text):
[
  {{
    "id": "1",
    "name": "Recipe Name",
    "description": "Brief description of the dish",
    "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
    "instructions": ["Step 1: Do this", "Step 2: Then this", "Step 3: Finally this"],
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "calories_per_serving": 350,
    "tags": ["healthy", "quick", "main-dish"]
  }},
  {{
    "id": "2",
    "name": "Another Recipe",
    "description": "Description",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["Step 1", "Step 2"],
    "prep_time": 10,
    "cook_time": 20,
    "servings": 2,
    "calories_per_serving": 280,
    "tags": ["vegetarian", "side-dish"]
  }}
]""",
    
    "health_focused": """Create healthy recipes using: {ingredients}

Return ONLY this JSON array format:
[
  {{
    "id": "1",
    "name": "Healthy Recipe Name",
    "description": "Nutritious description emphasizing health benefits",
    "ingredients": ["chicken breast", "broccoli", "olive oil"],
    "instructions": ["Step 1: Prepare ingredients", "Step 2: Cook healthily", "Step 3: Serve"],
    "prep_time": 15,
    "cook_time": 25,
    "servings": 4,
    "calories_per_serving": 320,
    "tags": ["healthy", "high-protein", "low-carb"]
  }}
]

Requirements:
- Emphasize nutritional value
- Use healthy cooking methods (grilling, steaming, roasting)
- Include 2-3 recipes
- NO text outside JSON""",
    
    "quick_meals": """Generate quick recipes (under 30 minutes) using:
{ingredients}

Focus on:
- Minimal prep time
- One-pot or sheet-pan meals
- Simple cooking techniques
- Meal prep friendly options
- Clear time-saving tips""",
    
    "budget_conscious": """Create cost-effective recipes that maximize these ingredients:
{ingredients}

Priorities:
- Stretch ingredients across multiple servings
- Use affordable cooking methods
- Suggest budget-friendly substitutions
- Include leftover usage tips
- Focus on filling, satisfying meals"""
}

def get_recipe_prompt(ingredients: list, style: str = "default", **kwargs) -> str:
    """
    Get the appropriate prompt template based on style
    
    Args:
        ingredients: List of available ingredients
        style: Prompt style (default, health_focused, quick_meals, budget_conscious)
        **kwargs: Additional parameters like dietary_restrictions, cuisine_preference, etc.
    """
    prompt = RECIPE_GENERATION_PROMPTS.get(style, RECIPE_GENERATION_PROMPTS["default"])
    prompt = prompt.format(ingredients=", ".join(ingredients))
    
    # Add user profile constraints
    if kwargs.get('diet'):
        diet_map = {
            'vegetarian': 'vegetarian (no meat or fish)',
            'vegan': 'vegan (no animal products)',
            'keto': 'ketogenic (very low carb, high fat)',
            'paleo': 'paleo (no grains, dairy, or processed foods)',
            'gluten-free': 'gluten-free'
        }
        diet_desc = diet_map.get(kwargs['diet'], kwargs['diet'])
        prompt += f"\n\nDiet Requirement: Recipes MUST be {diet_desc}"
    
    if kwargs.get('allergies'):
        prompt += f"\n\nAllergies: MUST NOT contain: {', '.join(kwargs['allergies'])}"
    
    if kwargs.get('dislikes'):
        prompt += f"\nDislikes: Avoid if possible: {', '.join(kwargs['dislikes'])}"
    
    if kwargs.get('preferredCuisines'):
        prompt += f"\nPreferred Cuisines: Prioritize {', '.join(kwargs['preferredCuisines'])} styles"
    
    if kwargs.get('cookingTime'):
        time_map = {
            'minimal': 'under 20 minutes total',
            'moderate': '30-45 minutes total',
            'extensive': 'can be over 1 hour'
        }
        time_desc = time_map.get(kwargs['cookingTime'], '30-45 minutes')
        prompt += f"\nCooking Time: Recipes should take {time_desc}"
    
    # Original additional constraints
    if kwargs.get('dietary_restrictions'):
        prompt += f"\n\nDietary Restrictions: {', '.join(kwargs['dietary_restrictions'])}"
    
    if kwargs.get('cuisine_preference'):
        prompt += f"\nPreferred Cuisine: {kwargs['cuisine_preference']}"
    
    if kwargs.get('servings'):
        prompt += f"\nTarget Servings: {kwargs['servings']}"
    
    if kwargs.get('max_time'):
        prompt += f"\nMaximum Total Time: {kwargs['max_time']} minutes"
    
    return prompt
