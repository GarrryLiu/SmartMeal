'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { HiClock, HiUsers, HiCheck, HiStar } from 'react-icons/hi';
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

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as string;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [checkedInstructions, setCheckedInstructions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Find the recipe
    const foundRecipe = recipesData.recipes.find(r => r.id === recipeId) as Recipe;
    if (!foundRecipe) {
      router.push('/shopping-done/recipes');
      return;
    }
    setRecipe(foundRecipe);

    // Get user ingredients
    const storedIngredients = localStorage.getItem('userIngredients');
    if (storedIngredients) {
      setUserIngredients(JSON.parse(storedIngredients));
    }
  }, [recipeId, router]);

  const toggleIngredientCheck = (ingredient: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredient)) {
      newChecked.delete(ingredient);
    } else {
      newChecked.add(ingredient);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleInstructionCheck = (index: number) => {
    const newChecked = new Set(checkedInstructions);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedInstructions(newChecked);
  };

  const isUserIngredient = (ingredient: string) => {
    const userIngredientNames = userIngredients.map(ing => ing.name.toLowerCase());
    return userIngredientNames.some(userIng => 
      userIng.includes(ingredient.replace('-', ' ')) || 
      ingredient.replace('-', ' ').includes(userIng)
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'hard': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading recipe...</p>
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
            href="/shopping-done/recipes" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Recipes</span>
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <span className="text-8xl">{recipe.image}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {recipe.name}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
              {recipe.description}
            </p>
            
            {/* Recipe Stats */}
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <HiClock className="w-5 h-5" />
                <span>{recipe.cookingTime} minutes</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <HiUsers className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MdLocalFireDepartment className="w-5 h-5" />
                <span>{recipe.calories} calories</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>

            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-xs bg-zinc-800 text-gray-300 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                <span>Ingredients</span>
                <span className="text-sm text-gray-400">({recipe.ingredients.length} items)</span>
              </h2>
              
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => {
                  const isChecked = checkedIngredients.has(ingredient);
                  const hasIngredient = isUserIngredient(ingredient);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleIngredientCheck(ingredient)}
                      className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                        isChecked
                          ? 'border-green-400 bg-green-900/20'
                          : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isChecked
                            ? 'border-green-400 bg-green-400'
                            : 'border-zinc-600'
                        }`}>
                          {isChecked && <HiCheck className="w-3 h-3 text-black" />}
                        </div>
                        
                        <span className={`flex-1 ${
                          isChecked ? 'line-through text-gray-400' : 'text-white'
                        }`}>
                          {ingredient.replace('-', ' ')}
                        </span>
                        
                        {hasIngredient && (
                          <div className="flex items-center space-x-1 text-green-400">
                            <HiStar className="w-4 h-4" />
                            <span className="text-xs">You have this</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                <span>Instructions</span>
                <span className="text-sm text-gray-400">({recipe.instructions.length} steps)</span>
              </h2>
              
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => {
                  const isChecked = checkedInstructions.has(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleInstructionCheck(index)}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                        isChecked
                          ? 'border-blue-400 bg-blue-900/20'
                          : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isChecked
                            ? 'border-blue-400 bg-blue-400'
                            : 'border-zinc-600 bg-zinc-800'
                        }`}>
                          {isChecked ? (
                            <HiCheck className="w-4 h-4 text-black" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-300">{index + 1}</span>
                          )}
                        </div>
                        
                        <p className={`text-sm leading-relaxed ${
                          isChecked ? 'line-through text-gray-400' : 'text-gray-200'
                        }`}>
                          {instruction}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Nutrition Information */}
          <div className="card mt-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Nutrition Information</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{recipe.nutrition.protein}g</div>
                <div className="text-sm text-gray-400">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{recipe.nutrition.carbs}g</div>
                <div className="text-sm text-gray-400">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{recipe.nutrition.fat}g</div>
                <div className="text-sm text-gray-400">Fat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{recipe.nutrition.fiber}g</div>
                <div className="text-sm text-gray-400">Fiber</div>
              </div>
            </div>
          </div>

          {/* Cooking Progress */}
          <div className="card mt-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Cooking Progress</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Ingredients: {checkedIngredients.size}/{recipe.ingredients.length}</span>
                <span>Instructions: {checkedInstructions.size}/{recipe.instructions.length}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(checkedIngredients.size / recipe.ingredients.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(checkedInstructions.size / recipe.instructions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {checkedIngredients.size === recipe.ingredients.length && 
               checkedInstructions.size === recipe.instructions.length && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-400 rounded-lg text-center">
                  <p className="text-green-200 font-semibold">🎉 Recipe completed! Enjoy your meal!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 