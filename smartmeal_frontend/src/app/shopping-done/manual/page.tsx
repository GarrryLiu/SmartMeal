'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiPlus, HiTrash, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export default function ManualInputPage() {
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
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    }
  };

  const updateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(ingredients.map(ingredient => 
      ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    ));
  };

  const handleContinue = () => {
    const validIngredients = ingredients.filter(ing => ing.name.trim() && ing.quantity.trim());
    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient with name and quantity.');
      return;
    }
    
    // Store ingredients in localStorage for the next step
    localStorage.setItem('userIngredients', JSON.stringify(validIngredients));
    router.push('/shopping-done/preferences');
  };

  const canContinue = ingredients.some(ing => ing.name.trim() && ing.quantity.trim());

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Input Options</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Add Your Ingredients
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            List the ingredients you have available. Include quantities to help us suggest the right portion sizes for your recipes.
          </p>
        </div>

        {/* Ingredients Form */}
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-center space-x-4 p-4 bg-zinc-900 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-semibold text-gray-300">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ingredient Name
                      </label>
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                        placeholder="e.g., Chicken breast, Tomatoes, Rice..."
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quantity
                      </label>
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                        placeholder="e.g., 2 lbs, 1 cup, 500g..."
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove ingredient"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add More Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={addIngredient}
                className="flex items-center space-x-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
              >
                <HiPlus className="w-5 h-5" />
                <span>Add Another Ingredient</span>
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                canContinue
                  ? 'btn-primary'
                  : 'bg-zinc-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Preferences</span>
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              💡 <strong>Tips:</strong> Be as specific as possible with quantities (e.g., "2 lbs chicken breast" instead of just "chicken"). 
              This helps us suggest recipes with the right serving sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 