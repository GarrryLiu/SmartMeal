import { create } from 'zustand';
import { PlanResponse } from '../models';
import { serviceLocator } from '../services';

interface AppState {
  currentPlan: PlanResponse | null;
  isLoadingPlan: boolean;
  error: Error | null;
}

interface AppActions {
  fetchInitialPlan: () => Promise<void>;
  generateNewPlan: (goal: string) => Promise<void>;
  clearError: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set, get) => ({
  // State
  currentPlan: null,
  isLoadingPlan: false,
  error: null,

  // Actions
  fetchInitialPlan: async () => {
    try {
      set({ isLoadingPlan: true, error: null });
      const plan = await serviceLocator.planRepository.generatePlanFromGoal('fitness');
      set({ currentPlan: plan, isLoadingPlan: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to fetch initial plan'),
        isLoadingPlan: false 
      });
    }
  },

  generateNewPlan: async (goal: string) => {
    try {
      set({ isLoadingPlan: true, error: null });
      const plan = await serviceLocator.planRepository.generatePlanFromGoal(goal);
      set({ currentPlan: plan, isLoadingPlan: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to generate new plan'),
        isLoadingPlan: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 