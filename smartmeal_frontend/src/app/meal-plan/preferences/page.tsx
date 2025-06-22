'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { useUser } from '@/contexts/UserContext';
import recipesData from '@/data/recipes.json';

interface MealPlanPreferences {
  goal: string;
  cuisine: string;
  calories: number;
  cookingTime: string;
}

export default function MealPlanPreferencesPage() {
  const router = useRouter();
  const { userProfile } = useUser();
  const [preferences, setPreferences] = useState<MealPlanPreferences>({
    goal: '',
    cuisine: '',
    calories: 400,
    cookingTime: ''
  });

  useEffect(() => {
    // Prepopulate preferences from user profile
    const defaultGoal = getDefaultGoal();
    const defaultCuisine = getDefaultCuisine();
    const defaultCalories = getDefaultCalories();
    const defaultCookingTime = getDefaultCookingTime();

    setPreferences({
      goal: defaultGoal,
      cuisine: defaultCuisine,
      calories: defaultCalories,
      cookingTime: defaultCookingTime
    });
  }, [userProfile]);

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

  const getDefaultCookingTime = (): string => {
    // Map user's cooking time preference to available options
    switch (userProfile.cookingTime) {
      case 'Quick (15-30 min)': return 'quick';
      case 'Standard (30-45 min)': return 'standard';
      case 'Relaxed (45-60 min)': return 'relaxed';
      case 'No time limit': return 'unlimited';
      default: return 'standard';
    }
  };

  const handlePreferenceChange = (field: keyof MealPlanPreferences, value: string | number) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateMealPlan = () => {
    if (!preferences.goal || !preferences.cuisine || !preferences.cookingTime) {
      alert('Please select all preferences to continue.');
      return;
    }

    // Store preferences in localStorage for meal planning
    localStorage.setItem('mealPlanPreferences', JSON.stringify(preferences));
    router.push('/meal-plan');
  };

  const canContinue = preferences.goal && preferences.cuisine && preferences.cookingTime;

  const calorieRanges = [
    { value: 300, label: '300 calories', description: 'Light meal or snack' },
    { value: 400, label: '400 calories', description: 'Moderate portion' },
    { value: 500, label: '500 calories', description: 'Standard meal' },
    { value: 600, label: '600+ calories', description: 'Hearty portion' }
  ];

  const cookingTimeOptions = [
    { id: 'quick', label: 'Quick & Easy', description: '15-30 minutes', icon: '⚡' },
    { id: 'standard', label: 'Standard Cooking', description: '30-45 minutes', icon: '🍳' },
    { id: 'relaxed', label: 'Relaxed Cooking', description: '45-60 minutes', icon: '👨‍🍳' },
    { id: 'unlimited', label: 'No Time Limit', description: 'Take your time', icon: '🧘‍♂️' }
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

  const getCookingTimeRecommendation = (timeId: string): string | null => {
    const defaultTime = getDefaultCookingTime();
    if (timeId === defaultTime) {
      return 'Your preference';
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/meal" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-body"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Meal Planning</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="title-medium text-gray-900 text-4xl mb-6">
            Meal Plan Preferences
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            Let's create your perfect meal plan! We've pre-filled your preferences based on your profile, 
            but feel free to adjust them to match what you're looking for today.
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
                    style={isSelected ? { 
                      borderColor: '#9cb481'
                    } : {}}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className={`card-title font-body ${
                        isSelected ? '' : 'text-gray-900'
                      }`}
                      style={isSelected ? { color: '#7a9365' } : {}}>
                        {goal.name}
                      </span>
                    </div>
                    {recommendation && (
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 rounded-full font-body" style={{ 
                          backgroundColor: '#e8f0e0', 
                          color: '#7a9365' 
                        }}>
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
                    style={isSelected ? { 
                      borderColor: '#f4a261'
                    } : {}}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">{cuisine.icon}</span>
                      <span className={`card-title text-sm font-body ${
                        isSelected ? '' : 'text-gray-900'
                      }`}
                      style={isSelected ? { color: '#e8956b' } : {}}>
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

          {/* Cooking Time Selection */}
          <div className="card">
            <h2 className="card-title text-gray-900 mb-6">How much time do you have?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cookingTimeOptions.map((option) => {
                const recommendation = getCookingTimeRecommendation(option.id);
                const isSelected = preferences.cookingTime === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handlePreferenceChange('cookingTime', option.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left relative ${
                      isSelected
                        ? 'bg-green-light shadow-lg'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { 
                      borderColor: '#9cb481'
                    } : {}}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={`card-title font-body ${
                            isSelected ? '' : 'text-gray-900'
                          }`}
                          style={isSelected ? { color: '#7a9365' } : {}}>
                            {option.label}
                          </span>
                          {recommendation && (
                            <span className="text-xs px-2 py-1 rounded-full font-body" style={{ 
                              backgroundColor: '#e8f0e0', 
                              color: '#7a9365' 
                            }}>
                              ✨ {recommendation}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 font-body ${
                          isSelected ? '' : 'text-gray-600'
                        }`}
                        style={isSelected ? { color: '#7a9365' } : {}}>
                          {option.description}
                        </p>
                      </div>
                    </div>
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
                        ? 'bg-orange-secondary-light shadow-lg'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    style={isSelected ? { 
                      borderColor: '#f4a261'
                    } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={`card-title font-body ${
                            isSelected ? '' : 'text-gray-900'
                          }`}
                          style={isSelected ? { color: '#e8956b' } : {}}>
                            {range.label}
                          </span>
                          {recommendation && (
                            <span className="text-xs px-2 py-1 rounded-full font-body" style={{ 
                              backgroundColor: '#fce4d0', 
                              color: '#e8956b' 
                            }}>
                              ✨ {recommendation}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 font-body ${
                          isSelected ? '' : 'text-gray-600'
                        }`}
                        style={isSelected ? { color: '#e8956b' } : {}}>
                          {range.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f4a261' }}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Create Meal Plan Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCreateMealPlan}
              disabled={!canContinue}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 font-body ${
                canContinue
                  ? 'btn-primary'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Create My Meal Plan</span>
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="text-center">
            <p className="text-gray-600 text-sm max-w-2xl mx-auto font-body">
              💡 <strong>Smart defaults:</strong> We've selected preferences based on your profile settings. 
              You can change any of these to customize your meal plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 