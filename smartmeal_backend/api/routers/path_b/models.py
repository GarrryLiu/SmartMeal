from pydantic import BaseModel
from typing import List, Dict, Any

class PlanRequest(BaseModel):
    goal: str

class DailyMeal(BaseModel):
    breakfast: dict
    lunch: dict
    dinner: dict
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
    goal_compliance: float
    variety_score: float
    daily_breakdown: Dict[str, Dict[str, float]]

class ShoppingList(BaseModel):
    items: List[str]
    estimated_cost: float
    store_suggestions: List[str]
    categories: Dict[str, List[str]]

class PlanResponse(BaseModel):
    plan: WeeklyPlan
    analytics: AnalyticsData
    shopping_list: ShoppingList
    goal: str
    message: str 