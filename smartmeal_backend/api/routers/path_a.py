from fastapi import APIRouter, HTTPException
from models.schemas import RecipeRequest, RecipeResponse, Recipe
from services.ai_service import gemini_service
from services.utils import parse_recipe_response
import os

router = APIRouter()

# Check if we should use mock data (for testing without API key)
USE_MOCK_DATA = os.getenv("USE_MOCK_DATA", "false").lower() == "true"

# Mock data for fallback/testing
MOCK_RECIPES = [
    Recipe(
        id="mock1",
        name="Test Recipe - Chicken Stir Fry",
        description="Mock recipe for testing",
        ingredients=["chicken", "vegetables", "soy sauce"],
        instructions=["Cook chicken", "Add vegetables", "Serve"],
        prep_time=10,
        cook_time=20,
        servings=4,
        calories_per_serving=300,
        tags=["test", "mock"]
    )
]

@router.post("/recipes/from-receipt", response_model=RecipeResponse)
async def generate_recipes_from_receipt(request: RecipeRequest):
    """
    Generate recipes based on available ingredients from receipt
    Path A endpoint - uses Gemini AI to generate recipes
    """
    try:
        # Log the incoming request for debugging
        print(f"Received request with {len(request.items)} items: {request.items}")
        
        # Use mock data if configured (for testing)
        if USE_MOCK_DATA:
            return RecipeResponse(
                recipes=MOCK_RECIPES,
                total_count=len(MOCK_RECIPES),
                message="Mock recipes returned for testing"
            )
        
        # Prepare preferences based on the request
        preferences = {}
        if request.goal:
            preferences['dietary_goal'] = request.goal
        
        # Add user preferences if provided
        if request.user_preferences:
            preferences.update(request.user_preferences)
            # Log user preferences for debugging
            print(f"User preferences: diet={preferences.get('diet')}, allergies={preferences.get('allergies')}")
            
        # Determine the style based on goal
        style = "default"
        if request.goal == "fitness":
            style = "health_focused"
        elif request.goal == "quick":
            style = "quick_meals"
        elif request.goal == "budget":
            style = "budget_conscious"
        
        # Call Gemini AI service
        print(f"Calling Gemini AI with style: {style}")
        
        # Convert detailed items to dict format if available
        detailed_ingredients = None
        if request.detailed_items:
            detailed_ingredients = [
                {
                    'name': item.name,
                    'quantity': item.quantity,
                    'unit': item.unit,
                    'price': item.price
                }
                for item in request.detailed_items
            ]
        
        ai_response = gemini_service.generate_recipes_from_ingredients(
            ingredients=request.items,
            style=style,
            preferences=preferences,
            detailed_ingredients=detailed_ingredients
        )
        
        # Parse the AI response into Recipe objects
        recipes = parse_recipe_response(ai_response)
        
        # Log success
        print(f"Successfully generated {len(recipes)} recipes")
        
        # Build response message
        goal_message = f" for {request.goal} goal" if request.goal else ""
        message = f"Generated {len(recipes)} personalized recipes{goal_message} based on your ingredients"
        
        return RecipeResponse(
            recipes=recipes,
            total_count=len(recipes),
            message=message
        )
        
    except Exception as e:
        print(f"Error in generate_recipes_from_receipt: {str(e)}")
        # Return a more detailed error for debugging
        raise HTTPException(
            status_code=500, 
            detail=f"Error generating recipes: {str(e)}. Make sure your Gemini API key is set correctly."
        )

@router.get("/recipes/test")
async def test_ai_connection():
    """
    Test endpoint to verify Gemini AI connection
    """
    try:
        # Test with simple ingredients
        test_ingredients = ["chicken", "rice", "vegetables"]
        response = gemini_service.generate_recipes_from_ingredients(
            ingredients=test_ingredients,
            style="default"
        )
        return {
            "status": "success",
            "message": "Gemini AI connection successful",
            "sample_response": response
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Gemini AI connection failed: {str(e)}",
            "hint": "Check if GEMINI_API_KEY is set in .env file"
        }
