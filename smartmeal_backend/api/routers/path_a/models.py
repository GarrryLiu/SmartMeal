from pydantic import BaseModel
from typing import List, Optional

class RecipeRequest(BaseModel):
    items: List[str]
    goal: Optional[str] = None

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

class ReceiptUploadResponse(BaseModel):
    success: bool
    items: List[str]
    categories: dict
    total_items: int
    message: str 