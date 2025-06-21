'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { HiShoppingCart } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { Spotlight } from '@/components/Spotlight';
import PreferencesDisplay from './components/PreferencesDisplay';
import GroceryCategory from './components/GroceryCategory';
import ProgressBar from './components/ProgressBar';
import ShoppingSummary from './components/ShoppingSummary';
import { useGroceryList } from './hooks/useGroceryList';
import { getPersonalizedMessage } from './utils/messaging';

interface MealPlanPreferences {
  goal: string;
  cuisine: string;
  calories: number;
  cookingTime: string;
}

export default function MealPlanPage() {
  const { userProfile } = useUser();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [mealPlanPreferences, setMealPlanPreferences] = useState<MealPlanPreferences | null>(null);
  const groceryList = useGroceryList();

  useEffect(() => {
    // Get meal plan preferences from localStorage
    const storedPreferences = localStorage.getItem('mealPlanPreferences');
    if (storedPreferences) {
      setMealPlanPreferences(JSON.parse(storedPreferences));
    }
  }, []);

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
            {getPersonalizedMessage(userProfile, mealPlanPreferences)}
          </p>
        </div>

        {/* Preferences Display */}
        <PreferencesDisplay preferences={mealPlanPreferences} />

        {/* Progress Bar */}
        <ProgressBar checkedCount={getCheckedCount()} totalCount={getTotalItems()} />

        {/* Grocery Categories */}
        <div className="space-y-8">
          {groceryList.map((category) => (
            <GroceryCategory
              key={category.name}
              name={category.name}
              icon={category.icon}
              items={category.items}
              checkedItems={checkedItems}
              onItemCheck={handleItemCheck}
            />
          ))}
        </div>

        {/* Summary */}
        <ShoppingSummary totalItems={getTotalItems()} checkedCount={getCheckedCount()} />
      </div>
    </div>
  );
} 