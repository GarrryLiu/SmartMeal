import { RecipeResponse, PlanResponse } from '../models';

export interface IPlanRepository {
  generatePlanFromGoal(goal: string): Promise<PlanResponse>;
}

export interface IRecipeRepository {
  generateRecipesFromReceipt(items: string[]): Promise<RecipeResponse>;
} 