'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { HiClock, HiUsers, HiArrowLeft } from 'react-icons/hi';
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

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as string;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [checkedInstructions, setCheckedInstructions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // First check for generated recipes in localStorage
    const generatedRecipes = localStorage.getItem('generatedRecipes');
    let foundRecipe: Recipe | undefined;
    
    if (generatedRecipes) {
      const parsedGeneratedRecipes = JSON.parse(generatedRecipes);
      foundRecipe = parsedGeneratedRecipes.find((r: Recipe) => r.id === recipeId);
    }
    
    // If not found in generated recipes, fallback to mock data
    if (!foundRecipe) {
      foundRecipe = recipesData.recipes.find(r => r.id === recipeId) as Recipe;
    }
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
      case 'easy': return { color: '#9cb481', backgroundColor: '#e8f0e0' };
      case 'medium': return { color: '#f4a261', backgroundColor: '#fce4d0' };
      case 'hard': return { color: '#dc2626', backgroundColor: '#fee2e2' };
      default: return { color: '#6b7280', backgroundColor: '#f3f4f6' };
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-fresh text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#9cb481' }}></div>
          <p className="text-gray-600 font-body">Loading recipe...</p>
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
            href="/shopping-done/recipes" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-body"
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
            <h1 className="title-medium text-gray-900 text-4xl md:text-5xl mb-4">
              {recipe.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 font-body">
              {recipe.description}
            </p>
            
            {/* Recipe Stats */}
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="flex items-center space-x-2 text-gray-600 font-body">
                <HiClock className="w-5 h-5" />
                <span>{recipe.cookingTime} minutes</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 font-body">
                <HiUsers className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 font-body">
                <span>{recipe.calories} calories</span>
              </div>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium font-body"
                style={getDifficultyColor(recipe.difficulty)}
              >
                {recipe.difficulty}
              </span>
            </div>

            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-body">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="card">
              <h2 className="card-title text-gray-900 mb-6 flex items-center space-x-2">
                <span>Ingredients</span>
                <span className="text-sm text-gray-600 font-body">({recipe.ingredients.length} items)</span>
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
                          ? 'bg-green-light shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      style={isChecked ? { borderColor: '#9cb481' } : {}}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isChecked 
                            ? 'border-gray-900' 
                            : 'border-gray-300'
                        }`}
                        style={isChecked ? { backgroundColor: '#9cb481', borderColor: '#9cb481' } : {}}>
                          {isChecked && <HiArrowLeft className="w-3 h-3 text-white" />}
                        </div>
                        
                        <div className="flex-1">
                          <span className={`font-body ${
                            isChecked ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {ingredient.replace('-', ' ')}
                          </span>
                          {hasIngredient && (
                            <div className="flex items-center space-x-1 mt-1" style={{ color: '#9cb481' }}>
                              <HiArrowLeft className="w-4 h-4" />
                              <span className="text-xs font-body">You have this</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="card">
              <h2 className="card-title text-gray-900 mb-6 flex items-center space-x-2">
                <span>Instructions</span>
                <span className="text-sm text-gray-600 font-body">({recipe.instructions.length} steps)</span>
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
                          ? 'bg-orange-secondary-light shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      style={isChecked ? { borderColor: '#f4a261' } : {}}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isChecked 
                            ? 'border-gray-900' 
                            : 'border-gray-300'
                        }`}
                        style={isChecked ? { backgroundColor: '#f4a261', borderColor: '#f4a261' } : {}}>
                          {isChecked ? (
                            <HiArrowLeft className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-600 font-body">{index + 1}</span>
                          )}
                        </div>
                        
                        <p className={`font-body ${
                          isChecked ? 'line-through text-gray-500' : 'text-gray-900'
                        } leading-relaxed`}>
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
          <div className="mt-8 card">
            <h2 className="card-title text-gray-900 mb-6">Nutrition per Serving</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 title-medium" style={{ color: '#9cb481' }}>{recipe.nutrition.protein}g</div>
                <div className="text-sm text-gray-600 font-body">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 title-medium" style={{ color: '#f4a261' }}>{recipe.nutrition.carbs}g</div>
                <div className="text-sm text-gray-600 font-body">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 title-medium" style={{ color: '#9cb481' }}>{recipe.nutrition.fat}g</div>
                <div className="text-sm text-gray-600 font-body">Fat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 title-medium" style={{ color: '#f4a261' }}>{recipe.nutrition.fiber}g</div>
                <div className="text-sm text-gray-600 font-body">Fiber</div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-8 text-center">
            <div className="card">
              <h3 className="card-title text-gray-900 mb-4">Cooking Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 font-body">
                  <span>Ingredients: {checkedIngredients.size} of {recipe.ingredients.length}</span>
                  <span>Instructions: {checkedInstructions.size} of {recipe.instructions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((checkedIngredients.size + checkedInstructions.size) / (recipe.ingredients.length + recipe.instructions.length)) * 100}%`,
                      backgroundColor: '#9cb481'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 