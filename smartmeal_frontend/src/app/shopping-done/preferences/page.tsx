'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerateRecipes = async () => {
    if (!preferences.goal || !preferences.cuisine) {
      alert('Please select both a goal and cuisine preference.');
      return;
    }

    setIsGenerating(true);

    try {
      // Get ingredients from localStorage
      const storedIngredients = localStorage.getItem('userIngredients');
      if (!storedIngredients) {
        alert('No ingredients found. Please go back and add ingredients.');
        return;
      }

      const ingredients = JSON.parse(storedIngredients);
      
      // Extract just the ingredient names
      const ingredientNames = ingredients.map((ing: any) => ing.name);

      // Prepare the API request for path_a API
      const requestData = {
        items: ingredientNames,
        goal: preferences.goal,
        user_preferences: {
          diet: userProfile.diet,
          allergies: userProfile.allergies,
          dislikes: userProfile.dislikes,
          preferredCuisines: userProfile.preferredCuisines,
          cookingTime: userProfile.cookingTime,
          cuisine: preferences.cuisine,
          targetCalories: preferences.calories
        }
      };

      console.log('Sending to path_a API:', requestData);

      // Make API call to path_a backend endpoint
      const response = await fetch('http://localhost:8000/api/v1/recipes/from-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received from path_a API:', data);

      // Transform API response to match our Recipe format
      const transformedRecipes = data.recipes.map((recipe: any, index: number) => ({
        id: recipe.id || `recipe-${index}`,
        name: recipe.name,
        cuisine: preferences.cuisine,
        cookingTime: recipe.prep_time + recipe.cook_time,
        servings: recipe.servings,
        calories: recipe.calories_per_serving,
        difficulty: recipe.cook_time <= 20 ? 'easy' : recipe.cook_time <= 40 ? 'medium' : 'hard',
        image: recipe.image_url || '🍽️', // Use API image or default emoji
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        nutrition: {
          protein: 25, // Default values - could be enhanced if API provides these
          carbs: 35,
          fat: 15,
          fiber: 5
        },
        tags: recipe.tags || []
      }));

      // Store API response and preferences in localStorage
      localStorage.setItem('generatedRecipes', JSON.stringify(transformedRecipes));
      localStorage.setItem('recipePreferences', JSON.stringify(preferences));
      localStorage.setItem('apiResponse', JSON.stringify(data)); // Store original API response for debugging
      
      // Navigate to recipes page
      router.push('/shopping-done/recipes');

    } catch (error) {
      console.error('Error generating recipes from path_a API:', error);
      alert('Failed to generate recipes. Please make sure the backend is running and try again.');
      
      // Fallback: use mock data for development
      localStorage.setItem('recipePreferences', JSON.stringify(preferences));
      router.push('/shopping-done/recipes');
    } finally {
      setIsGenerating(false);
    }
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
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done/manual" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-body"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Ingredients</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="title-medium text-gray-900 text-4xl mb-6">
            Recipe Preferences
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            Great! You've added <span className="font-semibold" style={{ color: '#9cb481' }}>{ingredientCount} ingredients</span>. 
            We've pre-filled your preferences based on your profile, but feel free to adjust them for this recipe search.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Goal Selection */}
          <div className="card">
            <h2 className="card-title text-gray-900 mb-6">What's your goal?</h2>
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
                        ? 'bg-green-light shadow-lg'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { borderColor: '#9cb481' } : {}}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className={`font-semibold font-body ${
                        isSelected ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {goal.name}
                      </span>
                    </div>
                    {recommendation && (
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 rounded-full font-body bg-green-light" style={{ color: '#7a9365' }}>
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
            <h2 className="card-title text-gray-900 mb-6">Preferred cuisine?</h2>
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
                        ? 'bg-orange-secondary-light shadow-lg'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { borderColor: '#f4a261' } : {}}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">{cuisine.icon}</span>
                      <span className={`font-semibold text-sm font-body ${
                        isSelected ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {cuisine.name}
                      </span>
                    </div>
                    {recommendation && (
                      <div className="absolute -top-2 -right-2">
                        <span className="text-xs text-white px-2 py-1 rounded-full font-body" style={{ backgroundColor: '#f4a261' }}>
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
            <h2 className="card-title text-gray-900 mb-6">Target calories per serving</h2>
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
                        ? 'bg-green-light shadow-lg'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { borderColor: '#9cb481' } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={`font-semibold font-body ${
                            isSelected ? 'text-gray-900' : 'text-gray-900'
                          }`}>
                            {range.label}
                          </span>
                          {recommendation && (
                            <span className="text-xs px-2 py-1 rounded-full font-body bg-green-light" style={{ color: '#7a9365' }}>
                              ✨ {recommendation}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 font-body ${
                          isSelected ? 'text-gray-600' : 'text-gray-600'
                        }`}>
                          {range.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9cb481' }}>
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
              disabled={!canContinue || isGenerating}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 font-body ${
                canContinue && !isGenerating
                  ? 'btn-primary'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{isGenerating ? 'Generating Recipes...' : 'Generate My Recipes'}</span>
              {!isGenerating && <HiArrowRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Profile Info */}
          <div className="text-center">
            <p className="text-gray-600 text-sm max-w-2xl mx-auto font-body">
              💡 <strong>Smart defaults:</strong> We've selected preferences based on your profile settings. 
              You can change any of these to customize your meal plan.
            </p>
            <p className="text-gray-500 text-xs max-w-2xl mx-auto font-body mt-2">
              🤖 Using AI-powered recipe generation from path_a API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 