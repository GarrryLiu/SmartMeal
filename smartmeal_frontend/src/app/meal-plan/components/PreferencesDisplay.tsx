import Link from 'next/link';

interface MealPlanPreferences {
  goal: string;
  cuisine: string;
  calories: number;
  cookingTime: string;
}

interface PreferencesDisplayProps {
  preferences: MealPlanPreferences | null;
}

export default function PreferencesDisplay({ preferences }: PreferencesDisplayProps) {
  if (!preferences) return null;
  
  const { goal, cuisine, calories, cookingTime } = preferences;
  
  const goalNames = {
    'weight-loss': 'Weight Loss',
    'muscle-gain': 'Muscle Gain', 
    'maintenance': 'Maintenance',
    'energy-boost': 'Energy Boost',
    'heart-health': 'Heart Health'
  };
  
  const cuisineNames = {
    'american': 'American',
    'mediterranean': 'Mediterranean',
    'chinese': 'Chinese',
    'thai': 'Thai',
    'italian': 'Italian',
    'mexican': 'Mexican',
    'indian': 'Indian',
    'japanese': 'Japanese'
  };
  
  const timeNames = {
    'quick': 'Quick & Easy (15-30 min)',
    'standard': 'Standard (30-45 min)',
    'relaxed': 'Relaxed (45-60 min)',
    'unlimited': 'No Time Limit'
  };

  return (
    <div className="mb-8">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Meal Plan Preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Goal:</span>
            <p className="text-blue-600 font-medium">{goalNames[goal as keyof typeof goalNames] || goal}</p>
          </div>
          <div>
            <span className="text-gray-600">Cuisine:</span>
            <p className="text-emerald-600 font-medium">{cuisineNames[cuisine as keyof typeof cuisineNames] || cuisine}</p>
          </div>
          <div>
            <span className="text-gray-600">Calories:</span>
            <p className="text-purple-600 font-medium">{calories} per serving</p>
          </div>
          <div>
            <span className="text-gray-600">Cooking Time:</span>
            <p className="text-orange-600 font-medium">{timeNames[cookingTime as keyof typeof timeNames] || cookingTime}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link 
            href="/meal-plan/preferences"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ✏️ Adjust preferences
          </Link>
        </div>
      </div>
    </div>
  );
} 