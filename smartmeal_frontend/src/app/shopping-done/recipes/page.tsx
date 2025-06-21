'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiClock, HiUsers, HiPlus, HiStar } from 'react-icons/hi';
import { MdArrowBack, MdLocalFireDepartment } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';
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
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Generating your personalized recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done/preferences" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Preferences</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Personalized Recipes
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Based on your <span className="text-blue-400 font-semibold">{userIngredients.length} ingredients</span> and 
            <span className="text-green-400 font-semibold"> {preferences?.cuisine}</span> cuisine preference, 
            here are recipes perfect for your <span className="text-purple-400 font-semibold">{preferences?.goal}</span> goal.
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
                        <div className="flex items-center space-x-1 bg-green-900/20 text-green-400 px-2 py-1 rounded-full text-xs">
                          <HiStar className="w-3 h-3" />
                          <span>{matchingIngredients} matches</span>
                        </div>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(recipe.difficulty)} bg-zinc-900`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {recipe.name}
                  </h3>

                  {/* Recipe Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <HiClock className="w-4 h-4" />
                      <span className="text-sm">{recipe.cookingTime}m</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <HiUsers className="w-4 h-4" />
                      <span className="text-sm">{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MdLocalFireDepartment className="w-4 h-4" />
                      <span className="text-sm">{recipe.calories} cal</span>
                    </div>
                  </div>

                  {/* Nutrition Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Protein: {recipe.nutrition.protein}g</span>
                      <span>Carbs: {recipe.nutrition.carbs}g</span>
                      <span>Fat: {recipe.nutrition.fat}g</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 h-2 rounded-full" 
                           style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
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
                className="flex items-center space-x-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-white transition-all duration-300 group"
              >
                <HiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>Load 2 More Recipes</span>
              </button>
            </div>
          )}

          {/* No More Recipes Message */}
          {displayedRecipes.length === recipes.length && recipes.length > 3 && (
            <div className="text-center mt-12">
              <p className="text-gray-400">
                That's all the recipes we have for your preferences! 
                <Link href="/shopping-done/preferences" className="text-blue-400 hover:text-blue-300 ml-2">
                  Try different preferences
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* No Recipes Found */}
        {recipes.length === 0 && (
          <div className="text-center mt-12">
            <div className="card max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">No Recipes Found</h3>
              <p className="text-gray-300 mb-6">
                We couldn't find recipes matching your preferences. Try adjusting your cuisine or calorie preferences.
              </p>
              <Link 
                href="/shopping-done/preferences"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Adjust Preferences</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 