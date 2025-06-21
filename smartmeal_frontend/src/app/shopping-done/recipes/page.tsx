'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiClock, HiUsers, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import recipesData from '@/data/recipes.json';

interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  cookingTime: number;
  servings: number;
  calories: number;
  difficulty: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
}

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

interface RecipePreferences {
  goal: string;
  cuisine: string;
  calories: number;
}

export default function RecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([]);
  const [preferences, setPreferences] = useState<RecipePreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from localStorage
    const storedIngredients = localStorage.getItem('userIngredients');
    const storedPreferences = localStorage.getItem('recipePreferences');

    if (!storedIngredients || !storedPreferences) {
      router.push('/shopping-done');
      return;
    }

    const ingredients: Ingredient[] = JSON.parse(storedIngredients);
    const prefs: RecipePreferences = JSON.parse(storedPreferences);

    setUserIngredients(ingredients);
    setPreferences(prefs);

    // Filter and sort recipes based on preferences and ingredients
    const filteredRecipes = filterRecipes(ingredients, prefs);
    setRecipes(filteredRecipes);
    setDisplayedRecipes(filteredRecipes.slice(0, 3));
    setLoading(false);
  }, [router]);

  const filterRecipes = (ingredients: Ingredient[], prefs: RecipePreferences): Recipe[] => {
    const userIngredientNames = ingredients.map(ing => ing.name.toLowerCase());
    
    let filtered = recipesData.recipes.filter((recipe: Recipe) => {
      // Filter by cuisine if not 'any'
      if (prefs.cuisine !== 'any' && recipe.cuisine !== prefs.cuisine) {
        return false;
      }
      
      // Filter by calories (within 100 calorie range)
      if (Math.abs(recipe.calories - prefs.calories) > 100) {
        return false;
      }
      
      return true;
    });

    // Score recipes based on ingredient matches
    const scoredRecipes = filtered.map(recipe => {
      const ingredientMatches = recipe.ingredients.filter(ingredient => 
        userIngredientNames.some(userIng => 
          userIng.includes(ingredient.replace('-', ' ')) || 
          ingredient.replace('-', ' ').includes(userIng)
        )
      ).length;
      
      return {
        ...recipe,
        score: ingredientMatches
      };
    });

    // Sort by score (ingredient matches) and then by calories proximity
    scoredRecipes.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return Math.abs(a.calories - prefs.calories) - Math.abs(b.calories - prefs.calories);
    });

    return scoredRecipes;
  };

  const handleLoadMore = () => {
    const nextRecipes = recipes.slice(3, 5);
    setDisplayedRecipes([...displayedRecipes, ...nextRecipes]);
    setShowMore(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMatchingIngredients = (recipe: Recipe) => {
    const userIngredientNames = userIngredients.map(ing => ing.name.toLowerCase());
    return recipe.ingredients.filter(ingredient => 
      userIngredientNames.some(userIng => 
        userIng.includes(ingredient.replace('-', ' ')) || 
        ingredient.replace('-', ' ').includes(userIng)
      )
    ).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-fresh text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done/preferences" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Preferences</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Personalized Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Based on your <span className="text-blue-600 font-semibold">{userIngredients.length} ingredients</span> and 
            <span className="text-emerald-600 font-semibold"> {preferences?.cuisine}</span> cuisine preference, 
            here are recipes perfect for your <span className="text-purple-600 font-semibold">{preferences?.goal}</span> goal.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRecipes.map((recipe, index) => {
              const matchingIngredients = getMatchingIngredients(recipe);
              
              return (
                <div
                  key={recipe.id}
                  className="card group hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/shopping-done/recipes/${recipe.id}`)}
                >
                  {/* Recipe Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{recipe.image}</span>
                    <div className="flex items-center space-x-2">
                      {matchingIngredients > 0 && (
                        <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                          <HiArrowRight className="w-3 h-3" />
                          <span>{matchingIngredients} matches</span>
                        </div>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(recipe.difficulty)} bg-gray-100`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {recipe.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {recipe.description}
                    </p>

                    {/* Recipe Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <HiClock className="w-4 h-4" />
                        <span>{recipe.cookingTime} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HiUsers className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MdArrowBack className="w-4 h-4" />
                        <span className="text-sm">{recipe.calories} cal</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((matchingIngredients / recipe.ingredients.length) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      You have {matchingIngredients} of {recipe.ingredients.length} ingredients
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {!showMore && recipes.length > 3 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 transition-all duration-300 group"
              >
                <HiArrowRight className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>Load 2 More Recipes</span>
              </button>
            </div>
          )}

          {/* No Recipes Found */}
          {displayedRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Recipes Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find recipes matching your preferences and ingredients. 
                  Try adjusting your preferences or adding more ingredients.
                </p>
                <Link 
                  href="/shopping-done/preferences"
                  className="btn-primary"
                >
                  Adjust Preferences
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 