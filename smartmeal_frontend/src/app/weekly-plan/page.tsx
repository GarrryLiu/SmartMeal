'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import recipesData from '@/data/recipes.json';
import Link from 'next/link';
import { HiRefresh, HiPencil } from 'react-icons/hi';
import { MdRestaurant } from 'react-icons/md';

interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  cookingTime: number;
  calories: number;
  image: string;
  description: string;
  difficulty: string;
}

interface WeeklyPlan {
  [key: string]: {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
  };
}

const weekdays = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function WeeklyPlanPage() {
  const { userProfile } = useUser();
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate a random recipe based on meal type and user preferences
  const generateRandomRecipe = (mealType: string): Recipe | null => {
    let availableRecipes = recipesData.recipes;

    // Filter recipes based on meal type and typical calorie ranges
    if (mealType === 'breakfast') {
      availableRecipes = recipesData.recipes.filter(recipe => 
        recipe.calories <= 400 && 
        (recipe.tags?.includes('quick') || recipe.cookingTime <= 20 ||
         recipe.name.toLowerCase().includes('bowl') ||
         recipe.name.toLowerCase().includes('omelet') ||
         recipe.name.toLowerCase().includes('smoothie'))
      );
    } else if (mealType === 'lunch') {
      availableRecipes = recipesData.recipes.filter(recipe => 
        recipe.calories >= 300 && recipe.calories <= 500
      );
    } else if (mealType === 'dinner') {
      availableRecipes = recipesData.recipes.filter(recipe => 
        recipe.calories >= 350 && recipe.calories <= 600
      );
    }

    // If user has cuisine preferences, prioritize them
    if (userProfile?.preferredCuisines?.length > 0) {
      const preferredRecipes = availableRecipes.filter(recipe =>
        userProfile.preferredCuisines.some(cuisine => 
          recipe.cuisine === cuisine.toLowerCase()
        )
      );
      if (preferredRecipes.length > 0) {
        availableRecipes = preferredRecipes;
      }
    }

    if (availableRecipes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableRecipes.length);
    return availableRecipes[randomIndex] as Recipe;
  };

  // Generate a complete weekly plan
  const generateWeeklyPlan = () => {
    setIsGenerating(true);
    
    const newPlan: WeeklyPlan = {};
    
    weekdays.forEach(day => {
      newPlan[day] = {
        breakfast: generateRandomRecipe('breakfast'),
        lunch: generateRandomRecipe('lunch'),
        dinner: generateRandomRecipe('dinner')
      };
    });

    // Simulate loading time for better UX
    setTimeout(() => {
      setWeeklyPlan(newPlan);
      setIsGenerating(false);
      // Save to localStorage
      localStorage.setItem('weeklyPlan', JSON.stringify(newPlan));
    }, 1000);
  };

  // Load weekly plan from localStorage or generate new one
  useEffect(() => {
    const savedPlan = localStorage.getItem('weeklyPlan');
    if (savedPlan) {
      try {
        setWeeklyPlan(JSON.parse(savedPlan));
      } catch (error) {
        console.error('Error parsing saved weekly plan:', error);
        generateWeeklyPlan();
      }
    } else {
      generateWeeklyPlan();
    }
  }, []);

  const regenerateDay = (day: string) => {
    const newDayPlan = {
      breakfast: generateRandomRecipe('breakfast'),
      lunch: generateRandomRecipe('lunch'),
      dinner: generateRandomRecipe('dinner')
    };

    const updatedPlan = {
      ...weeklyPlan,
      [day]: newDayPlan
    };

    setWeeklyPlan(updatedPlan);
    localStorage.setItem('weeklyPlan', JSON.stringify(updatedPlan));
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '#9cb481'; // Green
      case 'lunch': return '#f4a261'; // Orange
      case 'dinner': return '#7a9365'; // Darker green
      default: return '#9cb481';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl text-gray-900 mb-6">
            Your Weekly Meal Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            A personalized weekly meal plan tailored to your preferences. 
            Click on any meal to see details or regenerate meals for variety.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={generateWeeklyPlan}
            disabled={isGenerating}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-body ${
              isGenerating
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'btn-primary hover:shadow-lg'
            }`}
          >
            <HiRefresh className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate New Plan'}</span>
          </button>

          <Link
            href="/meal-plan/preferences"
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-body btn-secondary"
          >
            <HiPencil className="w-5 h-5" />
            <span>Update Preferences</span>
          </Link>
        </div>

        {/* Weekly Plan Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left font-title text-lg text-gray-900 border-b border-gray-200">
                    Day
                  </th>
                  <th className="px-6 py-4 text-center font-title text-lg border-b border-gray-200" style={{ color: '#9cb481' }}>
                    🌅 Breakfast
                  </th>
                  <th className="px-6 py-4 text-center font-title text-lg border-b border-gray-200" style={{ color: '#f4a261' }}>
                    ☀️ Lunch
                  </th>
                  <th className="px-6 py-4 text-center font-title text-lg border-b border-gray-200" style={{ color: '#7a9365' }}>
                    🌙 Dinner
                  </th>
                </tr>
              </thead>
              <tbody>
                {weekdays.map((day, dayIndex) => (
                  <tr key={day} className={`${dayIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    <td className="px-6 py-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-title text-lg text-gray-900">{day}</span>
                        <button
                          onClick={() => regenerateDay(day)}
                          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"
                          title={`Regenerate meals for ${day}`}
                        >
                          <HiRefresh className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                      const recipe = weeklyPlan[day]?.[mealType as keyof typeof weeklyPlan[string]];
                      const mealColor = getMealColor(mealType);
                      
                      return (
                        <td key={mealType} className="px-6 py-6 border-b border-gray-200">
                          {recipe ? (
                            <div className="text-center">
                              <div 
                                className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md cursor-pointer"
                                style={{ 
                                  borderColor: mealColor + '40',
                                  backgroundColor: mealColor + '10'
                                }}
                              >
                                <div className="text-2xl mb-2">{recipe.image}</div>
                                <h3 className="font-body font-semibold text-gray-900 text-sm mb-1">
                                  {recipe.name}
                                </h3>
                                <div className="flex items-center justify-center space-x-3 text-xs text-gray-600">
                                  <span>{recipe.calories} cal</span>
                                  <span>•</span>
                                  <span>{recipe.cookingTime} min</span>
                                </div>
                                <div className="mt-2">
                                  <span 
                                    className="text-xs px-2 py-1 rounded-full font-body"
                                    style={{ 
                                      backgroundColor: mealColor + '20',
                                      color: mealColor
                                    }}
                                  >
                                    {recipe.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center p-4 rounded-xl border-2 border-dashed border-gray-200">
                              <MdRestaurant className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm font-body">No recipe</p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-3" style={{ color: '#9cb481' }}>📊</div>
            <h3 className="font-title text-lg text-gray-900 mb-2">Total Meals</h3>
            <p className="text-2xl font-bold" style={{ color: '#9cb481' }}>21</p>
            <p className="text-sm text-gray-600 font-body">meals planned</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3" style={{ color: '#f4a261' }}>🔥</div>
            <h3 className="font-title text-lg text-gray-900 mb-2">Avg Calories</h3>
            <p className="text-2xl font-bold" style={{ color: '#f4a261' }}>
              {Object.values(weeklyPlan).length > 0 
                ? Math.round(
                    Object.values(weeklyPlan).reduce((total, day) => {
                      const dayCalories = (day.breakfast?.calories || 0) + 
                                        (day.lunch?.calories || 0) + 
                                        (day.dinner?.calories || 0);
                      return total + dayCalories;
                    }, 0) / Object.values(weeklyPlan).length
                  )
                : 0
              }
            </p>
            <p className="text-sm text-gray-600 font-body">per day</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3" style={{ color: '#7a9365' }}>🍽️</div>
            <h3 className="font-title text-lg text-gray-900 mb-2">Variety</h3>
            <p className="text-2xl font-bold" style={{ color: '#7a9365' }}>
              {new Set(Object.values(weeklyPlan).flatMap(day => 
                [day.breakfast, day.lunch, day.dinner].filter(recipe => recipe).map(recipe => recipe!.cuisine)
              )).size}
            </p>
            <p className="text-sm text-gray-600 font-body">cuisines</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-title text-2xl text-gray-900 mb-4">Ready to Start Cooking?</h2>
            <p className="text-gray-600 mb-6 font-body">
              Generate your shopping list based on this weekly plan and start your healthy eating journey.
            </p>
            <Link
              href="/meal-plan/preferences"
              className="btn-primary font-body"
            >
              Create Shopping List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 