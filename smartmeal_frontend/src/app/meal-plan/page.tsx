'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { HiCheck, HiShoppingCart, HiStar } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { Spotlight } from '@/components/Spotlight';
import groceriesData from '@/data/groceries.json';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  essential?: boolean;
}

interface GroceryCategory {
  name: string;
  icon: string;
  items: GroceryItem[];
}

export default function MealPlanPage() {
  const { userProfile } = useUser();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [groceryList, setGroceryList] = useState<GroceryCategory[]>([]);

  useEffect(() => {
    // Generate personalized grocery list based on user profile
    let personalizedList = [...groceriesData.categories] as GroceryCategory[];
    
    // Add diet-specific recommendations
    if (userProfile.diet === 'vegetarian' || userProfile.diet === 'vegan') {
      // Remove meat items for vegetarians/vegans
      personalizedList = personalizedList.map(category => ({
        ...category,
        items: category.name === 'Proteins' 
          ? category.items.filter(item => !['chicken-breast', 'salmon'].includes(item.id))
          : category.items
      }));
      
      // Add vegetarian-specific items
      if (groceriesData.recommendations.vegetarian) {
        personalizedList.push({
          name: 'Plant-Based Extras',
          icon: '🌱',
          items: groceriesData.recommendations.vegetarian.additionalItems.map(item => ({
            ...item,
            essential: false
          }))
        });
      }
    }

    // Add keto-specific items
    if (userProfile.diet === 'keto' && groceriesData.recommendations.keto) {
      personalizedList.push({
        name: 'Keto Essentials',
        icon: '🥥',
        items: groceriesData.recommendations.keto.additionalItems.map(item => ({
          ...item,
          essential: false
        }))
      });
    }

    // Add high-protein items if user has high protein goals
    if (userProfile.macroGoals.includes('High Protein') && groceriesData.recommendations['high-protein']) {
      personalizedList.push({
        name: 'High Protein Boost',
        icon: '💪',
        items: groceriesData.recommendations['high-protein'].additionalItems.map(item => ({
          ...item,
          essential: false
        }))
      });
    }

    setGroceryList(personalizedList);
  }, [userProfile]);

  const handleItemCheck = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const getTotalItems = () => {
    return groceryList.reduce((total, category) => total + category.items.length, 0);
  };

  const getCheckedCount = () => {
    return checkedItems.size;
  };

  const getPersonalizedMessage = () => {
    const dietName = userProfile.diet || 'balanced';
    const goals = userProfile.macroGoals.length > 0 ? userProfile.macroGoals.join(' and ') : 'healthy eating';
    
    return `Based on your ${dietName} diet preferences and ${goals} goals, we recommend buying these fresh, nutritious ingredients to fuel your week ahead.`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/meal" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Meal Planning</span>
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <HiShoppingCart className="w-4 h-4" />
            <span>{getCheckedCount()} of {getTotalItems()} items</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Personalized Grocery List
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {getPersonalizedMessage()}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Shopping Progress</span>
            <span className="text-sm text-gray-400">
              {Math.round((getCheckedCount() / getTotalItems()) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(getCheckedCount() / getTotalItems()) * 100}%` }}
            />
          </div>
        </div>

        {/* Grocery Categories */}
        <div className="space-y-8">
          {groceryList.map((category) => (
            <div key={category.name} className="card">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
                <span className="text-sm text-gray-400">
                  ({category.items.filter(item => checkedItems.has(item.id)).length}/{category.items.length})
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemCheck(item.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        isChecked
                          ? 'border-green-400 bg-green-900/20'
                          : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isChecked
                            ? 'border-green-400 bg-green-400'
                            : 'border-zinc-600'
                        }`}>
                          {isChecked && <HiCheck className="w-4 h-4 text-black" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${
                              isChecked 
                                ? 'line-through text-gray-400' 
                                : 'text-white'
                            }`}>
                              {item.name}
                            </h3>
                            {item.essential && (
                              <HiStar className="w-4 h-4 text-yellow-400" title="Essential item" />
                            )}
                          </div>
                          <p className={`text-sm ${
                            isChecked ? 'line-through text-gray-500' : 'text-gray-300'
                          }`}>
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <div className="card max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Shopping Summary</h3>
            <div className="space-y-2 text-gray-300">
              <p>Total Items: {getTotalItems()}</p>
              <p>Completed: {getCheckedCount()}</p>
              <p>Remaining: {getTotalItems() - getCheckedCount()}</p>
            </div>
            {getCheckedCount() === getTotalItems() && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-400 rounded-lg">
                <p className="text-green-200 font-semibold">🎉 Shopping complete! Ready to cook!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 