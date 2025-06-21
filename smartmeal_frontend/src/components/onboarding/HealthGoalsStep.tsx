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

  const getCardColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#9cb481' : '#f4a261';
    }
    return '#f9fafb';
  };

  const getCardBorder = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#9cb481' : '#f4a261';
    }
    return '#e5e7eb';
  };

  const getTextColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#7a9365' : '#e8956b';
    }
    return '#374151';
  };

  const getSelectionClass = (index: number, isSelected: boolean) => {
    if (!isSelected) return '';
    return index % 2 === 0 ? 'selected-green' : 'selected-orange';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex-1">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            Help us understand your health and nutrition goals to personalize your meal recommendations.
          </p>
        </div>
      </div>

      {/* Calorie Tracking */}
      <div className="mb-10">
        <h3 className="card-title text-gray-900 mb-6">Do you want to track calories?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { type: 'none', title: 'No, thanks', desc: 'Focus on balanced, nutritious meals without counting calories' },
            { type: 'estimate', title: 'Rough estimate', desc: 'See approximate calorie ranges for meal planning' },
            { type: 'specific', title: 'Track precisely', desc: 'Set a specific daily calorie target' }
          ].map((option, index) => {
            const isSelected = userProfile.calorieTracking === option.type;
            
            return (
              <div key={option.type} className={`option-card ${getSelectionClass(index, isSelected)}`}>
                <button
                  onClick={() => updateProfile({ calorieTracking: option.type as any })}
                  className="w-full text-left"
                >
                  <h4 className={`card-title mb-2 ${
                    isSelected ? '' : 'text-gray-800'
                  }`}
                  style={isSelected ? { color: getTextColor(index, true) } : {}}>
                    {option.title}
                  </h4>
                  <p className={`text-sm ${
                    isSelected ? '' : 'text-gray-600'
                  }`}
                  style={isSelected ? { color: getTextColor(index, true) } : {}}>
                    {option.desc}
                  </p>
                </button>
                {option.type === 'specific' && userProfile.calorieTracking === 'specific' && (
                  <div className="flex items-center space-x-2 mt-3">
                    <input
                      type="number"
                      value={userProfile.dailyCalorieTarget || ''}
                      onChange={(e) => updateProfile({ dailyCalorieTarget: parseInt(e.target.value) || undefined })}
                      placeholder="2000"
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none w-24 transition-all"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#9cb481';
                        e.target.style.boxShadow = '0 0 0 3px rgba(156, 180, 129, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <span className="text-gray-600">calories per day</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Macronutrient Goals */}
      <div className="mb-10">
        <h3 className="card-title text-gray-900 mb-6">Any specific macronutrient goals?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['No, just a balanced diet', 'High Protein', 'High Fiber', 'Low Sodium'].map((goal, index) => {
            const isSelected = userProfile.macroGoals.includes(goal);
            
            return (
              <button
                key={goal}
                onClick={() => handleMacroGoalToggle(goal)}
                className={`option-card text-left ${getSelectionClass(index, isSelected)}`}
              >
                <h4 className={`card-title ${
                  isSelected ? '' : 'text-gray-800'
                }`}
                style={isSelected ? { color: getTextColor(index, true) } : {}}>
                  {goal}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Portion Size */}
      <div>
        <h3 className="card-title text-gray-900 mb-6">What are your portion size preferences?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'lighter', name: 'Lighter Portions', description: 'e.g., for weight management' },
            { id: 'standard', name: 'Standard Portions', description: 'balanced and satisfying' },
            { id: 'hearty', name: 'Hearty Portions', description: 'e.g., for athletic training' },
            { id: 'leftovers', name: "I'm cooking for leftovers!", description: 'meal prep friendly' },
          ].map((portion, index) => {
            const isSelected = userProfile.portionSize === portion.id;
            
            return (
              <button
                key={portion.id}
                onClick={() => handlePortionSizeChange(portion.id)}
                className={`option-card text-center ${getSelectionClass(index, isSelected)}`}
              >
                <h4 className={`card-title mb-2 ${
                  isSelected ? '' : 'text-gray-800'
                }`}
                style={isSelected ? { color: getTextColor(index, true) } : {}}>
                  {portion.name}
                </h4>
                <p className={`text-sm ${
                  isSelected ? '' : 'text-gray-600'
                }`}
                style={isSelected ? { color: getTextColor(index, true) } : {}}>
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