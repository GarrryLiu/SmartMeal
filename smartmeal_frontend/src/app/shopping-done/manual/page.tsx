'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiPlus, HiTrash, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export default function ManualPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', quantity: '' }
  ]);

  const addIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients([...ingredients, { id: newId, name: '', quantity: '' }]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };

  const updateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const handleFindRecipes = () => {
    const validIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }
    
    // Store ingredients in localStorage for recipe suggestions
    localStorage.setItem('userIngredients', JSON.stringify(validIngredients));
    router.push('/shopping-done/recipes');
  };

  const canContinue = ingredients.some(ing => ing.name.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Input Options</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Add Your Ingredients
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Manually add the ingredients you have and we'll suggest recipes you can make with them.
          </p>
        </div>

        {/* Ingredients List */}
        <div className="max-w-2xl mx-auto space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                {index + 1}
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g., Chicken breast)"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                
                <input
                  type="text"
                  placeholder="Quantity (e.g., 2 lbs, 1 cup)"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          {/* Add Ingredient Button */}
          <button
            onClick={addIngredient}
            className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-all duration-300"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Another Ingredient</span>
          </button>

          {/* Find Recipes Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleFindRecipes}
              disabled={!canContinue}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                canContinue
                  ? 'btn-primary'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Find Recipes</span>
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Better Results</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Be specific with ingredient names (e.g., "boneless chicken thighs" vs "chicken")</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Include quantities when possible for more accurate recipe suggestions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Don't forget pantry staples like oils, spices, and condiments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 