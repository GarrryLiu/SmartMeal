'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { MdRestaurant, MdShoppingCart } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

export default function MealPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plan Your Meals
          </h1>
          <p className="text-xl text-gray-300">
            Choose how you'd like to get started with your meal planning
          </p>
        </div>

        {/* Options Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/meal-plan" className="card group cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <MdRestaurant className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <h2 className="text-2xl font-semibold text-white group-hover:text-gray-100 transition-colors">
                  Create Your Perfect Meal Plan
                </h2>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Get personalized meal suggestions based on your preferences, dietary needs, and schedule.
              </p>
              <div className="flex items-center space-x-2 mt-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="font-medium">Start Planning</span>
                <HiArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/shopping-done" className="card group cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <MdShoppingCart className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                <h2 className="text-2xl font-semibold text-white group-hover:text-gray-100 transition-colors">
                  Just Finished Shopping
                </h2>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Tell us what you bought and we'll suggest delicious recipes you can make right now.
              </p>
              <div className="flex items-center space-x-2 mt-4 text-green-400 group-hover:text-green-300 transition-colors">
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