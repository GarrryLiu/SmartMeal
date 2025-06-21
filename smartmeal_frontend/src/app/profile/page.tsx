'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { HiPencil, HiRefresh } from 'react-icons/hi';
import { MdLocalDining, MdRestaurant, MdWarning, MdThumbDown, MdFitnessCenter, MdAccessTime } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

export default function ProfilePage() {
  const { userProfile, resetProfile } = useUser();

  const formatList = (items: string[]) => {
    if (items.length === 0) return 'None selected';
    if (items.length <= 3) return items.join(', ');
    return `${items.slice(0, 3).join(', ')} and ${items.length - 3} more`;
  };

  const getDietDisplayName = (dietId: string) => {
    const dietMap: { [key: string]: string } = {
      'classic': 'Classic',
      'low-carb': 'Low-Carb',
      'low-fat': 'Low-Fat',
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'pescatarian': 'Pescatarian',
      'flexitarian': 'Flexitarian',
      'gluten-free': 'Gluten-Free',
      'keto': 'Keto',
      'paleo': 'Paleo',
      'mediterranean': 'Mediterranean',
    };
    return dietMap[dietId] || dietId;
  };

  const getCookingTimeDisplayName = (timeId: string) => {
    const timeMap: { [key: string]: string } = {
      'quick': 'Quick & Easy (Under 20 min)',
      'standard': 'Standard (20-40 min)',
      'relaxed': 'Relaxed (40-60 min)',
      'no-limit': "I don't mind the time (60+ min)",
    };
    return timeMap[timeId] || timeId;
  };

  const getPortionSizeDisplayName = (sizeId: string) => {
    const sizeMap: { [key: string]: string } = {
      'lighter': 'Lighter Portions',
      'standard': 'Standard Portions',
      'hearty': 'Hearty Portions',
      'leftovers': "I'm cooking for leftovers!",
    };
    return sizeMap[sizeId] || sizeId;
  };

  const getCalorieTrackingDisplay = () => {
    switch (userProfile.calorieTracking) {
      case 'none':
        return 'No calorie tracking';
      case 'estimate':
        return 'General estimates per meal';
      case 'specific':
        return `Target: ${userProfile.dailyCalorieTarget || 'Not set'} calories/day`;
      default:
        return 'Not set';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Your Profile</h1>
          <div className="flex space-x-3">
            <Link
              href="/onboarding"
              className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
            >
              <HiPencil className="w-4 h-4" />
              <span>Edit Preferences</span>
            </Link>
            <button
              onClick={resetProfile}
              className="flex items-center space-x-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-700 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300"
            >
              <HiRefresh className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {!userProfile.isOnboardingComplete ? (
          <div className="card text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Welcome to SmartMeal!</h2>
            <p className="text-gray-300 mb-6">
              Complete your profile setup to get personalized meal recommendations.
            </p>
            <Link href="/onboarding" className="btn-primary">
              Complete Setup
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diet Preferences */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdLocalDining className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Diet Preferences</h3>
              </div>
              <p className="text-gray-300">
                {userProfile.diet ? getDietDisplayName(userProfile.diet) : 'Not set'}
              </p>
            </div>

            {/* Preferred Cuisines */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdRestaurant className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Preferred Cuisines</h3>
              </div>
              <p className="text-gray-300">
                {formatList(userProfile.preferredCuisines)}
              </p>
            </div>

            {/* Allergies */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdWarning className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Allergies</h3>
              </div>
              <p className="text-gray-300">
                {formatList(userProfile.allergies)}
              </p>
            </div>

            {/* Dislikes */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdThumbDown className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">Dislikes</h3>
              </div>
              <p className="text-gray-300">
                {formatList(userProfile.dislikes)}
              </p>
            </div>

            {/* Health Goals */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdFitnessCenter className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Health Goals</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p><strong>Calorie Tracking:</strong> {getCalorieTrackingDisplay()}</p>
                <p><strong>Macro Goals:</strong> {formatList(userProfile.macroGoals)}</p>
                <p><strong>Portion Size:</strong> {userProfile.portionSize ? getPortionSizeDisplayName(userProfile.portionSize) : 'Not set'}</p>
              </div>
            </div>

            {/* Cooking Time */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <MdAccessTime className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Cooking Time</h3>
              </div>
              <p className="text-gray-300">
                {userProfile.cookingTime ? getCookingTimeDisplayName(userProfile.cookingTime) : 'Not set'}
              </p>
            </div>
          </div>
        )}

        {userProfile.isOnboardingComplete && (
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Your preferences help us create personalized meal plans and recipe suggestions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 