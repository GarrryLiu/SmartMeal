from fastapi import APIRouter, HTTPException
from models.schemas import RecipeRequest, RecipeResponse, Recipe
import random

router = APIRouter()

# Fake recipe data for demo
FAKE_RECIPES = [
    Recipe(
        id="1",
        name="Grilled Chicken with Cherry Tomatoes",
        description="A healthy and delicious grilled chicken dish with fresh cherry tomatoes",
        ingredients=["chicken breast", "cherry tomatoes", "olive oil", "garlic", "herbs"],
        instructions=[
            "Season chicken breast with salt and pepper",
            "Heat olive oil in a pan over medium heat",
            "Cook chicken for 6-8 minutes per side",
            "Add cherry tomatoes and garlic",
            "Cook for 2-3 minutes until tomatoes burst"
        ],
        prep_time=10,
        cook_time=20,
        servings=2,
        calories_per_serving=350,
        tags=["healthy", "quick", "protein"]
    ),
    Recipe(
        id="2",
        name="Cherry Tomato Pasta",
        description="Simple and flavorful pasta with cherry tomatoes",
        ingredients=["pasta", "cherry tomatoes", "garlic", "basil", "parmesan"],
        instructions=[
            "Cook pasta according to package instructions",
            "Sauté garlic in olive oil",
            "Add cherry tomatoes and cook until they burst",
            "Toss with cooked pasta",
            "Garnish with fresh basil and parmesan"
        ],
        prep_time=5,
        cook_time=15,
        servings=4,
        calories_per_serving=420,
        tags=["vegetarian", "pasta", "quick"]
    ),
    Recipe(
        id="3",
        name="Chicken Stir-Fry",
        description="Quick and healthy chicken stir-fry with vegetables",
        ingredients=["chicken breast", "bell peppers", "broccoli", "soy sauce", "ginger"],
        instructions=[
            "Cut chicken into bite-sized pieces",
            "Stir-fry chicken until golden",
            "Add vegetables and stir-fry",
            "Add soy sauce and ginger",
            "Serve hot with rice"
        ],
        prep_time=15,
        cook_time=10,
        servings=3,
        calories_per_serving=380,
        tags=["asian", "stir-fry", "healthy"]
    )
]

@router.post("/recipes/from-receipt", response_model=RecipeResponse)
async def generate_recipes_from_receipt(request: RecipeRequest):
    """
    Generate recipes based on available ingredients from receipt
    """
    try:
        # For demo purposes, return 2-3 random recipes
        num_recipes = min(random.randint(2, 3), len(FAKE_RECIPES))
        selected_recipes = random.sample(FAKE_RECIPES, num_recipes)
        
        return RecipeResponse(
            recipes=selected_recipes,
            total_count=len(selected_recipes),
            message=f"Generated {len(selected_recipes)} recipes based on your ingredients: {', '.join(request.items)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recipes: {str(e)}") 