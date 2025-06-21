'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { MdFitnessCenter, MdBalance, MdLocalDining } from 'react-icons/md';

export default function HealthGoalsStep() {
  const { userProfile, updateProfile } = useUser();
  const [customCalories, setCustomCalories] = useState(userProfile.dailyCalorieTarget?.toString() || '');

  const handleCalorieTrackingChange = (type: 'none' | 'estimate' | 'specific') => {
    updateProfile({ calorieTracking: type });
    if (type !== 'specific') {
      updateProfile({ dailyCalorieTarget: undefined });
      setCustomCalories('');
    }
  };

  const handleCustomCaloriesChange = (value: string) => {
    setCustomCalories(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateProfile({ dailyCalorieTarget: numValue });
    }
  };

  const handleMacroGoalToggle = (goal: string) => {
    const currentGoals = userProfile.macroGoals;
    const isSelected = currentGoals.includes(goal);
    
    if (isSelected) {
      updateProfile({
        macroGoals: currentGoals.filter(g => g !== goal)
      });
    } else {
      updateProfile({
        macroGoals: [...currentGoals, goal]
      });
    }
  };

  const handlePortionSizeChange = (size: string) => {
    updateProfile({ portionSize: size });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-gray-300 text-lg">
          This helps us tailor the nutritional content of your meals.
        </p>
      </div>

      {/* Calorie Tracking */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">Do you want to track calories?</h3>
        <div className="space-y-4">
          <button
            onClick={() => handleCalorieTrackingChange('none')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              userProfile.calorieTracking === 'none'
                ? 'border-green-400 bg-green-900/20 shadow-lg'
                : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MdBalance className={`w-6 h-6 ${
                userProfile.calorieTracking === 'none' ? 'text-green-400' : 'text-gray-400'
              }`} />
              <div>
                <h4 className={`font-semibold ${
                  userProfile.calorieTracking === 'none' ? 'text-green-200' : 'text-gray-200'
                }`}>
                  No, just focus on healthy recipes
                </h4>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleCalorieTrackingChange('estimate')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              userProfile.calorieTracking === 'estimate'
                ? 'border-green-400 bg-green-900/20 shadow-lg'
                : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MdLocalDining className={`w-6 h-6 ${
                userProfile.calorieTracking === 'estimate' ? 'text-green-400' : 'text-gray-400'
              }`} />
              <div>
                <h4 className={`font-semibold ${
                  userProfile.calorieTracking === 'estimate' ? 'text-green-200' : 'text-gray-200'
                }`}>
                  Yes, give me a general estimate per meal
                </h4>
              </div>
            </div>
          </button>

          <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            userProfile.calorieTracking === 'specific'
              ? 'border-green-400 bg-green-900/20 shadow-lg'
              : 'border-zinc-700 bg-zinc-950'
          }`}>
            <button
              onClick={() => handleCalorieTrackingChange('specific')}
              className="w-full text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <MdFitnessCenter className={`w-6 h-6 ${
                  userProfile.calorieTracking === 'specific' ? 'text-green-400' : 'text-gray-400'
                }`} />
                <div>
                  <h4 className={`font-semibold ${
                    userProfile.calorieTracking === 'specific' ? 'text-green-200' : 'text-gray-200'
                  }`}>
                    Yes, I have a specific daily target
                  </h4>
                </div>
              </div>
            </button>
            {userProfile.calorieTracking === 'specific' && (
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="number"
                  value={customCalories}
                  onChange={(e) => handleCustomCaloriesChange(e.target.value)}
                  placeholder="2000"
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white w-24"
                />
                <span className="text-gray-300">calories per day</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Macronutrient Goals */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">Any specific macronutrient goals?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['No, just a balanced diet', 'High Protein', 'High Fiber', 'Low Sodium'].map((goal) => {
            const isSelected = userProfile.macroGoals.includes(goal);
            
            return (
              <button
                key={goal}
                onClick={() => handleMacroGoalToggle(goal)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-blue-400 bg-blue-900/20 shadow-lg'
                    : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                }`}
              >
                <h4 className={`font-semibold ${
                  isSelected ? 'text-blue-200' : 'text-gray-200'
                }`}>
                  {goal}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Portion Size */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6">What are your portion size preferences?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'lighter', name: 'Lighter Portions', description: 'e.g., for weight management' },
            { id: 'standard', name: 'Standard Portions', description: 'balanced and satisfying' },
            { id: 'hearty', name: 'Hearty Portions', description: 'e.g., for athletic training' },
            { id: 'leftovers', name: "I'm cooking for leftovers!", description: 'meal prep friendly' },
          ].map((portion) => {
            const isSelected = userProfile.portionSize === portion.id;
            
            return (
              <button
                key={portion.id}
                onClick={() => handlePortionSizeChange(portion.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-purple-400 bg-purple-900/20 shadow-lg'
                    : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
                }`}
              >
                <h4 className={`font-semibold mb-1 ${
                  isSelected ? 'text-purple-200' : 'text-gray-200'
                }`}>
                  {portion.name}
                </h4>
                <p className={`text-sm ${
                  isSelected ? 'text-purple-300' : 'text-gray-400'
                }`}>
                  {portion.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 