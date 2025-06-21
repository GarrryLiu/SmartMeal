import axios from 'axios';
import { Recipe, PlanResponse, ProfileResponse } from '../models';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Path A: Generate recipes from receipt
  generateRecipesFromReceipt: async (items: string[], goal?: string, detailedItems?: any[]): Promise<Recipe[]> => {
    try {
      const payload: any = { items };
      if (goal) payload.goal = goal;
      if (detailedItems) payload.detailed_items = detailedItems;
      
      const response = await api.post('/recipes/from-receipt', payload);
      return response.data.recipes;
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw error;
    }
  },

  // Path B: Generate meal plan from goal
  generatePlanFromGoal: async (goal: string): Promise<PlanResponse> => {
    try {
      const response = await api.post('/plans/from-goal', { goal });
      return response.data;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  },

  // User Profile
  getUserProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
};

export default apiService; 