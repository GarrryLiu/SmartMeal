// Path A Models - Recipe Generation from Receipt
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  servings: number;
  calories_per_serving: number;
  image_url?: string;
  tags: string[];
}

export interface RecipeResponse {
  recipes: Recipe[];
  total_count: number;
  message: string;
}

// Path B Models - Weekly Plan Generation from Goal
export interface DailyMeal {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
}

export interface WeeklyPlan {
  monday: DailyMeal;
  tuesday: DailyMeal;
  wednesday: DailyMeal;
  thursday: DailyMeal;
  friday: DailyMeal;
  saturday: DailyMeal;
  sunday: DailyMeal;
}

export interface AnalyticsData {
  weekly_calories: number;
  weekly_protein: number;
  weekly_carbs: number;
  weekly_fat: number;
  goal_compliance: number;
  variety_score: number;
}

export interface ShoppingList {
  items: string[];
  estimated_cost: number;
  store_suggestions: string[];
}

export interface PlanResponse {
  plan: WeeklyPlan;
  analytics: AnalyticsData;
  shopping_list: ShoppingList;
  goal: string;
  message: string;
} 