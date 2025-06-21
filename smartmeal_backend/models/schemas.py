from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Path A Models - Recipe Generation from Receipt
class RecipeRequest(BaseModel):
    items: List[str]

class Recipe(BaseModel):
    id: str
    name: str
    description: str
    ingredients: List[str]
    instructions: List[str]
    prep_time: int  # in minutes
    cook_time: int  # in minutes
    servings: int
    calories_per_serving: int
    image_url: Optional[str] = None
    tags: List[str] = []

class RecipeResponse(BaseModel):
    recipes: List[Recipe]
    total_count: int
    message: str

# Path B Models - Weekly Plan Generation from Goal
class PlanRequest(BaseModel):
    goal: str

class DailyMeal(BaseModel):
    breakfast: Recipe
    lunch: Recipe
    dinner: Recipe
    total_calories: int
    total_protein: float
    total_carbs: float
    total_fat: float

class WeeklyPlan(BaseModel):
    monday: DailyMeal
    tuesday: DailyMeal
    wednesday: DailyMeal
    thursday: DailyMeal
    friday: DailyMeal
    saturday: DailyMeal
    sunday: DailyMeal

class AnalyticsData(BaseModel):
    weekly_calories: int
    weekly_protein: float
    weekly_carbs: float
    weekly_fat: float
    goal_compliance: float  # percentage
    variety_score: float  # 0-100
    daily_breakdown: Dict[str, Dict[str, float]]  # daily nutrition breakdown

class ShoppingList(BaseModel):
    items: List[str]
    estimated_cost: float
    store_suggestions: List[str]
    categories: Dict[str, List[str]]  # organized by category

class PlanResponse(BaseModel):
    plan: WeeklyPlan
    analytics: AnalyticsData
    shopping_list: ShoppingList
    goal: str
    message: str

# User Profile Models
class UserPreferences(BaseModel):
    cuisine_preferences: List[str]
    allergies: List[str]
    dietary_restrictions: List[str]
    cooking_frequency: str  # "daily", "weekdays", "weekends"
    household_size: int

class NutritionGoals(BaseModel):
    daily_calories: int
    protein_goal: float
    carb_goal: float
    fat_goal: float
    fiber_goal: float

class UserProfile(BaseModel):
    name: str
    email: str
    preferences: UserPreferences
    nutrition_goals: NutritionGoals
    member_since: str
    plan_type: str  # "free", "premium"
    last_login: str

class ProfileResponse(BaseModel):
    profile: UserProfile
    message: str 