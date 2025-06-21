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

// Analytics Models
export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AnalyticsData {
  weekly_calories: number;
  weekly_protein: number;
  weekly_carbs: number;
  weekly_fat: number;
  goal_compliance: number;
  variety_score: number;
  daily_breakdown: Record<string, DailyNutrition>;
}

// Shopping List Models
export interface ShoppingList {
  items: string[];
  estimated_cost: number;
  store_suggestions: string[];
  categories: Record<string, string[]>;
}

// User Profile Models
export interface UserPreferences {
  cuisine_preferences: string[];
  allergies: string[];
  dietary_restrictions: string[];
  cooking_frequency: string;
  household_size: number;
}

export interface NutritionGoals {
  daily_calories: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
  fiber_goal: number;
}

export interface UserProfile {
  name: string;
  email: string;
  preferences: UserPreferences;
  nutrition_goals: NutritionGoals;
  member_since: string;
  plan_type: string;
  last_login: string;
}

// API Response Models
export interface PlanResponse {
  plan: WeeklyPlan;
  analytics: AnalyticsData;
  shopping_list: ShoppingList;
  goal: string;
  message: string;
}

export interface ProfileResponse {
  profile: UserProfile;
  message: string;
}

// App State Models
export interface AppState {
  // Current data
  currentPlan: WeeklyPlan | null;
  currentAnalytics: AnalyticsData | null;
  currentShoppingList: ShoppingList | null;
  userProfile: UserProfile | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  activeTab: string;
  
  // Actions
  generatePlanFromGoal: (goal: string) => Promise<void>;
  generateRecipesFromReceipt: (items: string[]) => Promise<Recipe[]>;
  loadUserProfile: () => Promise<void>;
  setActiveTab: (tab: string) => void;
  clearError: () => void;
} 