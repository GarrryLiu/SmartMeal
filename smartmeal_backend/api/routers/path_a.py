from fastapi import APIRouter, HTTPException
from models.schemas import RecipeRequest, RecipeResponse, Recipe
import random

router = APIRouter()

# Fake recipe data for demo - organized by goals
FAKE_RECIPES_BY_GOAL = {
    "fitness": [
        Recipe(
            id="f1",
            name="High-Protein Chicken Bowl",
            description="Protein-packed bowl perfect for muscle building",
            ingredients=["chicken breast", "quinoa", "broccoli", "olive oil", "garlic"],
            instructions=[
                "Season chicken with herbs and spices",
                "Grill chicken until cooked through",
                "Cook quinoa according to package",
                "Steam broccoli until tender",
                "Assemble bowl with chicken, quinoa, and broccoli"
            ],
            prep_time=15,
            cook_time=25,
            servings=2,
            calories_per_serving=450,
            tags=["high-protein", "muscle-building", "healthy"]
        ),
        Recipe(
            id="f2",
            name="Protein Power Smoothie",
            description="Nutrient-dense smoothie for post-workout recovery",
            ingredients=["banana", "berries", "protein powder", "almond milk", "spinach"],
            instructions=[
                "Add all ingredients to blender",
                "Blend until smooth",
                "Serve immediately"
            ],
            prep_time=5,
            cook_time=0,
            servings=1,
            calories_per_serving=320,
            tags=["protein", "smoothie", "recovery"]
        )
    ],
    "weight-loss": [
        Recipe(
            id="wl1",
            name="Light Chicken Salad",
            description="Low-calorie chicken salad with fresh vegetables",
            ingredients=["chicken breast", "lettuce", "tomatoes", "cucumber", "olive oil"],
            instructions=[
                "Grill chicken breast",
                "Chop vegetables",
                "Mix with light dressing",
                "Serve on bed of lettuce"
            ],
            prep_time=10,
            cook_time=15,
            servings=2,
            calories_per_serving=280,
            tags=["low-calorie", "weight-loss", "salad"]
        ),
        Recipe(
            id="wl2",
            name="Vegetable Stir-Fry",
            description="Low-calorie vegetable stir-fry",
            ingredients=["broccoli", "bell peppers", "onions", "soy sauce", "ginger"],
            instructions=[
                "Chop all vegetables",
                "Stir-fry in minimal oil",
                "Add soy sauce and ginger",
                "Serve hot"
            ],
            prep_time=10,
            cook_time=10,
            servings=2,
            calories_per_serving=180,
            tags=["low-calorie", "vegetarian", "weight-loss"]
        )
    ],
    "muscle-gain": [
        Recipe(
            id="mg1",
            name="Beef and Sweet Potato Bowl",
            description="High-calorie bowl for muscle gain",
            ingredients=["beef strips", "sweet potatoes", "quinoa", "olive oil", "herbs"],
            instructions=[
                "Cook beef strips until browned",
                "Roast sweet potatoes",
                "Cook quinoa",
                "Assemble bowl with all ingredients"
            ],
            prep_time=15,
            cook_time=30,
            servings=2,
            calories_per_serving=650,
            tags=["high-calorie", "muscle-gain", "protein"]
        )
    ],
    "low-carb": [
        Recipe(
            id="lc1",
            name="Keto Chicken with Vegetables",
            description="Low-carb chicken dish with keto-friendly vegetables",
            ingredients=["chicken breast", "broccoli", "cauliflower", "butter", "herbs"],
            instructions=[
                "Season chicken with herbs",
                "Cook chicken in butter",
                "Steam vegetables",
                "Serve together"
            ],
            prep_time=10,
            cook_time=20,
            servings=2,
            calories_per_serving=380,
            tags=["low-carb", "keto", "protein"]
        )
    ],
    "vegetarian": [
        Recipe(
            id="v1",
            name="Quinoa Buddha Bowl",
            description="Nutritious vegetarian bowl with quinoa and vegetables",
            ingredients=["quinoa", "broccoli", "bell peppers", "tomatoes", "olive oil"],
            instructions=[
                "Cook quinoa",
                "Roast vegetables",
                "Assemble bowl",
                "Drizzle with olive oil"
            ],
            prep_time=10,
            cook_time=25,
            servings=2,
            calories_per_serving=320,
            tags=["vegetarian", "healthy", "quinoa"]
        )
    ]
}

# Fallback recipes for when no goal is specified
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
    )
]

@router.post("/recipes/from-receipt", response_model=RecipeResponse)
async def generate_recipes_from_receipt(request: RecipeRequest):
    """
    Generate recipes based on available ingredients from receipt and user's health goal
    """
    try:
        # Select recipes based on goal if provided
        if request.goal and request.goal in FAKE_RECIPES_BY_GOAL:
            available_recipes = FAKE_RECIPES_BY_GOAL[request.goal]
        else:
            available_recipes = FAKE_RECIPES
        
        # For demo purposes, return 2-3 random recipes
        num_recipes = min(random.randint(2, 3), len(available_recipes))
        selected_recipes = random.sample(available_recipes, num_recipes)
        
        goal_message = f" for {request.goal} goal" if request.goal else ""
        
        return RecipeResponse(
            recipes=selected_recipes,
            total_count=len(selected_recipes),
            message=f"Generated {len(selected_recipes)} personalized recipes{goal_message} based on your ingredients: {', '.join(request.items)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recipes: {str(e)}") 