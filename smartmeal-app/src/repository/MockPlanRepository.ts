import { PlanResponse, Recipe, DailyMeal, WeeklyPlan, AnalyticsData, ShoppingList } from '../models';
import { IPlanRepository } from './types';

export class MockPlanRepository implements IPlanRepository {
  async generatePlanFromGoal(goal: string): Promise<PlanResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create mock data
    const mockRecipe: Recipe = {
      id: '1',
      name: 'Mock Recipe',
      description: 'A delicious mock recipe for testing',
      ingredients: ['ingredient 1', 'ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      prep_time: 10,
      cook_time: 20,
      servings: 2,
      calories_per_serving: 300,
      tags: ['mock', 'test']
    };

    const mockDailyMeal: DailyMeal = {
      breakfast: mockRecipe,
      lunch: mockRecipe,
      dinner: mockRecipe,
      total_calories: 900,
      total_protein: 30,
      total_carbs: 45,
      total_fat: 25
    };

    const mockWeeklyPlan: WeeklyPlan = {
      monday: mockDailyMeal,
      tuesday: mockDailyMeal,
      wednesday: mockDailyMeal,
      thursday: mockDailyMeal,
      friday: mockDailyMeal,
      saturday: mockDailyMeal,
      sunday: mockDailyMeal
    };

    const mockAnalytics: AnalyticsData = {
      weekly_calories: 6300,
      weekly_protein: 210,
      weekly_carbs: 315,
      weekly_fat: 175,
      goal_compliance: 85,
      variety_score: 75
    };

    const mockShoppingList: ShoppingList = {
      items: ['Item 1', 'Item 2', 'Item 3'],
      estimated_cost: 50,
      store_suggestions: ['Mock Store']
    };

    return {
      plan: mockWeeklyPlan,
      analytics: mockAnalytics,
      shopping_list: mockShoppingList,
      goal,
      message: `Mock ${goal} plan generated successfully!`
    };
  }
} 