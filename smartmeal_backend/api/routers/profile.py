from fastapi import APIRouter
from models.schemas import ProfileResponse, UserProfile, UserPreferences, NutritionGoals

router = APIRouter()

@router.get("/profile", response_model=ProfileResponse)
async def get_user_profile():
    """
    Get user profile with preferences and nutrition goals
    """
    # Create fake user profile data
    preferences = UserPreferences(
        cuisine_preferences=["Asian", "Mediterranean", "Italian"],
        allergies=["None"],
        dietary_restrictions=["None"],
        cooking_frequency="weekdays",
        household_size=2
    )
    
    nutrition_goals = NutritionGoals(
        daily_calories=2200,
        protein_goal=150.0,
        carb_goal=250.0,
        fat_goal=80.0,
        fiber_goal=30.0
    )
    
    profile = UserProfile(
        name="John Doe",
        email="john.doe@example.com",
        preferences=preferences,
        nutrition_goals=nutrition_goals,
        member_since="January 2024",
        plan_type="premium",
        last_login="Today at 10:30 AM"
    )
    
    return ProfileResponse(
        profile=profile,
        message="User profile retrieved successfully"
    ) 