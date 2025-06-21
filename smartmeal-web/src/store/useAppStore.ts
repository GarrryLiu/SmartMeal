import { create } from 'zustand';
import { AppState, WeeklyPlan, Recipe, AnalyticsData, ShoppingList, UserProfile } from '../models';
import apiService from '../services/api';

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentPlan: null,
  currentAnalytics: null,
  currentShoppingList: null,
  userProfile: null,
  isLoading: false,
  error: null,
  activeTab: 'home',

  // Actions
  generatePlanFromGoal: async (goal: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.generatePlanFromGoal(goal);
      set({
        currentPlan: response.plan,
        currentAnalytics: response.analytics,
        currentShoppingList: response.shopping_list,
        isLoading: false,
        activeTab: 'mealplan'
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate meal plan',
        isLoading: false
      });
    }
  },

  generateRecipesFromReceipt: async (items: string[]): Promise<Recipe[]> => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await apiService.generateRecipesFromReceipt(items);
      set({ isLoading: false });
      return recipes;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate recipes',
        isLoading: false
      });
      throw error;
    }
  },

  loadUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getUserProfile();
      set({
        userProfile: response.profile,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load user profile',
        isLoading: false
      });
    }
  },

  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  clearError: () => {
    set({ error: null });
  },
})); 