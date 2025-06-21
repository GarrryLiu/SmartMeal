'use client';

import { HiScale, HiClock, HiCurrencyDollar, HiSparkles } from 'react-icons/hi';

export default function Analytics() {
  return (
    <div className="page-container">
      <h1 className="section-title mb-12">
        Your Meal Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        <div className="card">
          <div className="flex items-center space-x-4">
            <HiScale className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Nutritional Balance</h3>
              <p className="text-gray-300">Your meals are well balanced</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <HiClock className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Meal Timing</h3>
              <p className="text-gray-300">Average meal prep: 25 mins</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <HiCurrencyDollar className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Budget Tracking</h3>
              <p className="text-gray-300">15% under monthly budget</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <HiSparkles className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Recipe Variety</h3>
              <p className="text-gray-300">12 unique recipes this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="mt-12 card">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Detailed Analytics Coming Soon
        </h2>
        <p className="text-gray-300">
          We're working on bringing you detailed analytics including:
        </p>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>• Nutritional trends over time</li>
          <li>• Cost per meal analysis</li>
          <li>• Ingredient usage patterns</li>
          <li>• Meal satisfaction ratings</li>
        </ul>
      </div>
    </div>
  );
} 