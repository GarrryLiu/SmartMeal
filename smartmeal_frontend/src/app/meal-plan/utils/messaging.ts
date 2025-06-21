interface MealPlanPreferences {
  goal: string;
  cuisine: string;
  calories: number;
  cookingTime: string;
}

interface UserProfile {
  diet?: string;
  macroGoals: string[];
}

export function getPersonalizedMessage(
  userProfile: UserProfile, 
  mealPlanPreferences: MealPlanPreferences | null
): string {
  const dietName = userProfile.diet || 'balanced';
  const goals = userProfile.macroGoals.length > 0 ? userProfile.macroGoals.join(' and ') : 'healthy eating';
  
  let message = `Based on your ${dietName} diet preferences and ${goals} goals`;
  
  if (mealPlanPreferences) {
    const { goal, cuisine, calories, cookingTime } = mealPlanPreferences;
    const goalNames = {
      'weight-loss': 'weight loss',
      'muscle-gain': 'muscle gain',
      'maintenance': 'maintenance',
      'energy-boost': 'energy boost',
      'heart-health': 'heart health'
    };
    const timeNames = {
      'quick': 'quick cooking',
      'standard': 'standard cooking time',
      'relaxed': 'relaxed cooking',
      'unlimited': 'unlimited time'
    };
    
    message += `, targeting ${goalNames[goal as keyof typeof goalNames] || goal} with ${cuisine} cuisine preferences and ${timeNames[cookingTime as keyof typeof timeNames] || cookingTime}`;
  }
  
  return `${message}, we recommend buying these fresh, nutritious ingredients to fuel your week ahead.`;
} 