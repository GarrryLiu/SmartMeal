'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { MdRestaurant, MdShoppingCart } from 'react-icons/md';

export default function MealPage() {
  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Meals
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you'd like to get started with your meal planning
          </p>
        </div>

        {/* Options Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/meal-plan/preferences" className="card group cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <MdRestaurant className="w-8 h-8 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                  Create Your Perfect Meal Plan
                </h2>
              </div>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                Get personalized meal suggestions based on your preferences, dietary needs, and schedule.
              </p>
              <div className="flex items-center space-x-2 mt-4 text-emerald-500 group-hover:text-emerald-600 transition-colors">
                <span className="font-medium">Start Planning</span>
                <HiArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/shopping-done" className="card group cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <MdShoppingCart className="w-8 h-8 text-orange-500 group-hover:text-orange-600 transition-colors" />
                <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                  Just Finished Shopping
                </h2>
              </div>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                Tell us what you bought and we'll suggest delicious recipes you can make right now.
              </p>
              <div className="flex items-center space-x-2 mt-4 text-orange-500 group-hover:text-orange-600 transition-colors">
                <span className="font-medium">Find Recipes</span>
                <HiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 