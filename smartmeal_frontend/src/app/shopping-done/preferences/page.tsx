'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';
import { useUser } from '@/contexts/UserContext';
import recipesData from '@/data/recipes.json';

interface RecipePreferences {
  goal: string;
  cuisine: string;
  calories: number;
}

export default function PreferencesPage() {
  const router = useRouter();
  const { userProfile } = useUser();
  const [preferences, setPreferences] = useState<RecipePreferences>({
    goal: '',
    cuisine: '',
    calories: 400
  });
  const [ingredientCount, setIngredientCount] = useState(0);

  useEffect(() => {
    // Get ingredient count from localStorage
    const storedIngredients = localStorage.getItem('userIngredients');
    if (storedIngredients) {
      const ingredients = JSON.parse(storedIngredients);
      setIngredientCount(ingredients.length);
    } else {
      // Redirect back if no ingredients found
      router.push('/shopping-done/manual');
      return;
    }

    // Prepopulate preferences from user profile
    const defaultGoal = getDefaultGoal();
    const defaultCuisine = getDefaultCuisine();
    const defaultCalories = getDefaultCalories();

    setPreferences({
      goal: defaultGoal,
      cuisine: defaultCuisine,
      calories: defaultCalories
    });
  }, [router, userProfile]);

  const getDefaultGoal = (): string => {
    // Map user's macro goals to recipe goals
    if (userProfile.macroGoals.includes('High Protein')) {
      return 'muscle-gain';
    }
    if (userProfile.calorieTracking === 'estimate' || userProfile.calorieTracking === 'specific') {
      return 'weight-loss';
    }
    return 'maintenance';
  };

  const getDefaultCuisine = (): string => {
    // Use the first preferred cuisine from user profile, or default to American
    if (userProfile.preferredCuisines.length > 0) {
      const userCuisine = userProfile.preferredCuisines[0].toLowerCase();
      // Check if the user's cuisine matches our available cuisines
      const availableCuisine = recipesData.cuisineTypes.find(c => 
        c.name.toLowerCase() === userCuisine || 
        c.id === userCuisine
      );
      return availableCuisine ? availableCuisine.id : 'american';
    }
    return 'american';
  };

  const getDefaultCalories = (): number => {
    // Use user's daily calorie target divided by meals (assuming 3 meals)
    if (userProfile.calorieTracking === 'specific' && userProfile.dailyCalorieTarget) {
      const caloriesPerMeal = Math.round(userProfile.dailyCalorieTarget / 3);
      // Round to nearest available option
      if (caloriesPerMeal <= 350) return 300;
      if (caloriesPerMeal <= 450) return 400;
      if (caloriesPerMeal <= 550) return 500;
      return 600;
    }
    // Default based on portion size preference
    switch (userProfile.portionSize) {
      case 'lighter': return 300;
      case 'standard': return 400;
      case 'hearty': return 500;
      case 'leftovers': return 600;
      default: return 400;
    }
  };

  const handlePreferenceChange = (field: keyof RecipePreferences, value: string | number) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateRecipes = () => {
    if (!preferences.goal || !preferences.cuisine) {
      alert('Please select both a goal and cuisine preference.');
      return;
    }

    // Store preferences in localStorage
    localStorage.setItem('recipePreferences', JSON.stringify(preferences));
    router.push('/shopping-done/recipes');
  };

  const canContinue = preferences.goal && preferences.cuisine;

  const calorieRanges = [
    { value: 300, label: '300 calories', description: 'Light meal or snack' },
    { value: 400, label: '400 calories', description: 'Moderate portion' },
    { value: 500, label: '500 calories', description: 'Standard meal' },
    { value: 600, label: '600+ calories', description: 'Hearty portion' }
  ];

  const getGoalRecommendation = (goalId: string): string | null => {
    const defaultGoal = getDefaultGoal();
    if (goalId === defaultGoal) {
      return 'Based on your profile';
    }
    return null;
  };

  const getCuisineRecommendation = (cuisineId: string): string | null => {
    const defaultCuisine = getDefaultCuisine();
    if (cuisineId === defaultCuisine) {
      return 'Your preferred cuisine';
    }
    return null;
  };

  const getCalorieRecommendation = (calories: number): string | null => {
    const defaultCalories = getDefaultCalories();
    if (calories === defaultCalories) {
      return 'Based on your goals';
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done/manual" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Ingredients</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recipe Preferences
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Great! You've added <span className="text-blue-400 font-semibold">{ingredientCount} ingredients</span>. 
            We've pre-filled your preferences based on your profile, but feel free to adjust them for this recipe search.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Goal Selection */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-white mb-6">What's your goal?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipesData.goalTypes.map((goal) => {
                const recommendation = getGoalRecommendation(goal.id);
                const isSelected = preferences.goal === goal.id;
                
                return (
                  <button
                    key={goal.id}
                    onClick={() => handlePreferenceChange('goal', goal.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left relative ${
                      isSelected
                        ? 'border-blue-400 bg-blue-900/20'
                        : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className={`font-semibold ${
                        isSelected ? 'text-blue-200' : 'text-white'
                      }`}>
                        {goal.name}
                      </span>
                    </div>
                    {recommendation && (
                      <div className="mt-2">
                        <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">
                          ✨ {recommendation}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuisine Selection */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-white mb-6">Preferred cuisine?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recipesData.cuisineTypes.map((cuisine) => {
                const recommendation = getCuisineRecommendation(cuisine.id);
                const isSelected = preferences.cuisine === cuisine.id;
                
                return (
                  <button
                    key={cuisine.id}
                    onClick={() => handlePreferenceChange('cuisine', cuisine.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-center relative ${
                      isSelected
                        ? 'border-green-400 bg-green-900/20'
                        : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">{cuisine.icon}</span>
                      <span className={`font-semibold text-sm ${
                        isSelected ? 'text-green-200' : 'text-white'
                      }`}>
                        {cuisine.name}
                      </span>
                    </div>
                    {recommendation && (
                      <div className="absolute -top-2 -right-2">
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                          ⭐
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calorie Target */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-white mb-6">Target calories per serving</h2>
            <div className="space-y-4">
              {calorieRanges.map((range) => {
                const recommendation = getCalorieRecommendation(range.value);
                const isSelected = preferences.calories === range.value;
                
                return (
                  <button
                    key={range.value}
                    onClick={() => handlePreferenceChange('calories', range.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-purple-400 bg-purple-900/20'
                        : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={`font-semibold ${
                            isSelected ? 'text-purple-200' : 'text-white'
                          }`}>
                            {range.label}
                          </span>
                          {recommendation && (
                            <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                              ✨ {recommendation}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          isSelected ? 'text-purple-300' : 'text-gray-400'
                        }`}>
                          {range.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Recipes Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateRecipes}
              disabled={!canContinue}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                canContinue
                  ? 'btn-primary'
                  : 'bg-zinc-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Generate My Recipes</span>
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="text-center">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              💡 <strong>Smart defaults:</strong> We've selected preferences based on your profile settings. 
              You can change any of these to explore different recipe options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 