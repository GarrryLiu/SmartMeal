from fastapi import APIRouter, HTTPException
from models.schemas import PlanRequest, PlanResponse, WeeklyPlan, DailyMeal, Recipe, AnalyticsData, ShoppingList
import random

router = APIRouter()

# Fake recipe data for meal plans
FAKE_BREAKFAST_RECIPES = [
    Recipe(
        id="bf1",
        name="Protein Smoothie Bowl",
        description="Nutritious smoothie bowl with berries and granola",
        ingredients=["banana", "berries", "protein powder", "almond milk", "granola"],
        instructions=["Blend banana, berries, and protein powder", "Top with granola"],
        prep_time=5,
        cook_time=0,
        servings=1,
        calories_per_serving=320,
        tags=["breakfast", "protein", "smoothie"]
    ),
    Recipe(
        id="bf2",
        name="Avocado Toast",
        description="Simple and healthy avocado toast",
        ingredients=["whole grain bread", "avocado", "eggs", "salt", "pepper"],
        instructions=["Toast bread", "Mash avocado", "Top with poached egg"],
        prep_time=10,
        cook_time=5,
        servings=1,
        calories_per_serving=280,
        tags=["breakfast", "healthy", "quick"]
    ),
    Recipe(
        id="bf3",
        name="Greek Yogurt Parfait",
        description="High-protein yogurt with nuts and honey",
        ingredients=["greek yogurt", "honey", "almonds", "berries", "chia seeds"],
        instructions=["Layer yogurt with berries", "Top with nuts and honey"],
        prep_time=5,
        cook_time=0,
        servings=1,
        calories_per_serving=350,
        tags=["breakfast", "protein", "quick"]
    )
]

FAKE_LUNCH_RECIPES = [
    Recipe(
        id="l1",
        name="Quinoa Salad",
        description="Fresh quinoa salad with vegetables",
        ingredients=["quinoa", "cucumber", "tomatoes", "olive oil", "lemon"],
        instructions=["Cook quinoa", "Chop vegetables", "Mix with dressing"],
        prep_time=15,
        cook_time=15,
        servings=2,
        calories_per_serving=350,
        tags=["lunch", "vegetarian", "healthy"]
    ),
    Recipe(
        id="l2",
        name="Grilled Chicken Wrap",
        description="Protein-packed chicken wrap",
        ingredients=["chicken breast", "tortilla", "lettuce", "tomato", "sauce"],
        instructions=["Grill chicken", "Assemble wrap", "Serve"],
        prep_time=10,
        cook_time=15,
        servings=1,
        calories_per_serving=420,
        tags=["lunch", "protein", "wrap"]
    ),
    Recipe(
        id="l3",
        name="Tuna Salad",
        description="Light and protein-rich tuna salad",
        ingredients=["tuna", "celery", "onion", "mayo", "mustard"],
        instructions=["Mix tuna with vegetables", "Add mayo and mustard"],
        prep_time=10,
        cook_time=0,
        servings=2,
        calories_per_serving=380,
        tags=["lunch", "protein", "quick"]
    )
]

FAKE_DINNER_RECIPES = [
    Recipe(
        id="d1",
        name="Salmon with Vegetables",
        description="Baked salmon with roasted vegetables",
        ingredients=["salmon", "broccoli", "carrots", "olive oil", "herbs"],
        instructions=["Season salmon", "Roast vegetables", "Bake salmon"],
        prep_time=15,
        cook_time=25,
        servings=2,
        calories_per_serving=450,
        tags=["dinner", "fish", "healthy"]
    ),
    Recipe(
        id="d2",
        name="Vegetarian Stir-Fry",
        description="Colorful vegetable stir-fry",
        ingredients=["tofu", "bell peppers", "broccoli", "soy sauce", "ginger"],
        instructions=["Stir-fry tofu", "Add vegetables", "Season with sauce"],
        prep_time=10,
        cook_time=15,
        servings=2,
        calories_per_serving=380,
        tags=["dinner", "vegetarian", "asian"]
    ),
    Recipe(
        id="d3",
        name="Beef Stir-Fry",
        description="High-protein beef with vegetables",
        ingredients=["beef strips", "bell peppers", "onion", "soy sauce", "garlic"],
        instructions=["Stir-fry beef", "Add vegetables", "Season with sauce"],
        prep_time=15,
        cook_time=10,
        servings=2,
        calories_per_serving=520,
        tags=["dinner", "protein", "asian"]
    )
]

def create_fake_daily_meal() -> DailyMeal:
    """Create a fake daily meal with random recipes"""
    breakfast = random.choice(FAKE_BREAKFAST_RECIPES)
    lunch = random.choice(FAKE_LUNCH_RECIPES)
    dinner = random.choice(FAKE_DINNER_RECIPES)
    
    total_calories = breakfast.calories_per_serving + lunch.calories_per_serving + dinner.calories_per_serving
    
    return DailyMeal(
        breakfast=breakfast,
        lunch=lunch,
        dinner=dinner,
        total_calories=total_calories,
        total_protein=random.uniform(25, 35),
        total_carbs=random.uniform(45, 65),
        total_fat=random.uniform(15, 25)
    )

def create_fake_weekly_plan() -> WeeklyPlan:
    """Create a fake weekly meal plan"""
    return WeeklyPlan(
        monday=create_fake_daily_meal(),
        tuesday=create_fake_daily_meal(),
        wednesday=create_fake_daily_meal(),
        thursday=create_fake_daily_meal(),
        friday=create_fake_daily_meal(),
        saturday=create_fake_daily_meal(),
        sunday=create_fake_daily_meal()
    )

def create_fake_analytics(goal: str) -> AnalyticsData:
    """Create fake analytics data based on goal"""
    base_calories = {"fitness": 2200, "weight-loss": 1800, "muscle-gain": 2500, "low-carb": 2000}
    weekly_calories = base_calories.get(goal, 2000) * 7
    
    # Create daily breakdown
    daily_breakdown = {}
    days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    for day in days:
        daily_breakdown[day] = {
            "calories": random.randint(1800, 2200),
            "protein": random.uniform(20, 35),
            "carbs": random.uniform(40, 70),
            "fat": random.uniform(15, 30)
        }
    
    return AnalyticsData(
        weekly_calories=weekly_calories,
        weekly_protein=random.uniform(140, 180),
        weekly_carbs=random.uniform(200, 300),
        weekly_fat=random.uniform(70, 100),
        goal_compliance=random.uniform(85, 95),
        variety_score=random.uniform(75, 90),
        daily_breakdown=daily_breakdown
    )

def create_fake_shopping_list() -> ShoppingList:
    """Create a fake shopping list with categories"""
    items = [
        "Chicken breast", "Salmon fillets", "Eggs", "Greek yogurt",
        "Quinoa", "Brown rice", "Sweet potatoes", "Broccoli",
        "Spinach", "Bell peppers", "Cherry tomatoes", "Avocados",
        "Bananas", "Berries", "Almonds", "Olive oil"
    ]
    
    # Organize items by category
    categories = {
        "Proteins": ["Chicken breast", "Salmon fillets", "Eggs", "Greek yogurt"],
        "Grains": ["Quinoa", "Brown rice", "Sweet potatoes"],
        "Vegetables": ["Broccoli", "Spinach", "Bell peppers", "Cherry tomatoes"],
        "Fruits": ["Avocados", "Bananas", "Berries"],
        "Pantry": ["Almonds", "Olive oil"]
    }
    
    return ShoppingList(
        items=random.sample(items, random.randint(12, 16)),
        estimated_cost=random.uniform(80, 120),
        store_suggestions=["Whole Foods", "Trader Joe's", "Local Market"],
        categories=categories
    )

@router.post("/plans/from-goal", response_model=PlanResponse)
async def generate_plan_from_goal(request: PlanRequest):
    """
    Generate a weekly meal plan based on dietary goal
    """
    try:
        # Validate goal
        valid_goals = ["fitness", "weight-loss", "muscle-gain", "low-carb", "vegetarian"]
        if request.goal not in valid_goals:
            raise HTTPException(status_code=400, detail=f"Invalid goal. Must be one of: {valid_goals}")
        
        # Create fake data
        weekly_plan = create_fake_weekly_plan()
        analytics = create_fake_analytics(request.goal)
        shopping_list = create_fake_shopping_list()
        
        return PlanResponse(
            plan=weekly_plan,
            analytics=analytics,
            shopping_list=shopping_list,
            goal=request.goal,
            message=f"Generated a personalized {request.goal} meal plan for you!"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating meal plan: {str(e)}") 