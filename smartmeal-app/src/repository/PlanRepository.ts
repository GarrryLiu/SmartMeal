import networkService from '../api/networkService';
import { PlanResponse } from '../models';
import { IPlanRepository } from './types';

export class PlanRepository implements IPlanRepository {
  async generatePlanFromGoal(goal: string): Promise<PlanResponse> {
    try {
      const response = await networkService.post('/api/v1/plans/from-goal', {
        goal,
      });
      return response.data;
    } catch (error) {
      console.error('Error generating plan from goal:', error);
      throw error;
    }
  }
} 