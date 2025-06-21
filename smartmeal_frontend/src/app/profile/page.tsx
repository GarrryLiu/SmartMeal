'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { HiPencil, HiRefresh } from 'react-icons/hi';
import { MdLocalDining, MdRestaurant, MdWarning, MdThumbDown, MdFitnessCenter, MdAccessTime } from 'react-icons/md';

export default function ProfilePage() {
  const { userProfile, resetProfile } = useUser();

  // Color scheme functions similar to onboarding components
  const getIconColor = (index: number) => {
    // Alternate between primary and secondary colors
    return index % 2 === 0 ? '#9cb481' : '#f4a261';
  };

  const getIconBgColor = (index: number) => {
    // Alternate between light versions
    return index % 2 === 0 ? '#f0f4ed' : '#fce4d0';
  };

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

  const profileSections = [
    { 
      icon: MdLocalDining, 
      title: 'Diet Preferences', 
      content: userProfile.diet ? getDietDisplayName(userProfile.diet) : 'Not set' 
    },
    { 
      icon: MdRestaurant, 
      title: 'Preferred Cuisines', 
      content: formatList(userProfile.preferredCuisines) 
    },
    { 
      icon: MdWarning, 
      title: 'Allergies', 
      content: formatList(userProfile.allergies) 
    },
    { 
      icon: MdThumbDown, 
      title: 'Dislikes', 
      content: formatList(userProfile.dislikes) 
    },
    { 
      icon: MdFitnessCenter, 
      title: 'Health Goals', 
      content: null, // Special case for complex content
      isComplex: true 
    },
    { 
      icon: MdAccessTime, 
      title: 'Cooking Time', 
      content: userProfile.cookingTime ? getCookingTimeDisplayName(userProfile.cookingTime) : 'Not set' 
    },
  ];

  return (
    <div className="min-h-screen bg-soft-grey text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="title-medium text-gray-900 text-4xl">Your Profile</h1>
          <div className="flex space-x-3">
            <Link
              href="/onboarding"
              className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-all duration-300 font-body"
            >
              <HiPencil className="w-4 h-4" />
              <span>Edit</span>
            </Link>
            <button
              onClick={resetProfile}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 hover:text-red-700 transition-all duration-300 font-body"
            >
              <HiRefresh className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {!userProfile.isOnboardingComplete ? (
          <div className="card text-center">
            <h2 className="card-title text-gray-900 mb-4 text-2xl">Welcome to SnapCook!</h2>
            <p className="text-gray-600 mb-6 font-body">
              Complete your profile setup to get personalized meal recommendations.
            </p>
            <Link href="/onboarding" className="btn-primary font-body">
              Complete Setup
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {profileSections.map((section, index) => (
              <div key={section.title} className="card">
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: getIconBgColor(index) }}
                  >
                    <section.icon 
                      className="w-6 h-6"
                      style={{ color: getIconColor(index) }}
                    />
                  </div>
                  <h3 className="card-title text-gray-900">{section.title}</h3>
                </div>
                
                {section.isComplex ? (
                  <div className="space-y-2 text-gray-700 font-body">
                    <p><strong>Calorie Tracking:</strong> {getCalorieTrackingDisplay()}</p>
                    <p><strong>Macro Goals:</strong> {formatList(userProfile.macroGoals)}</p>
                    <p><strong>Portion Size:</strong> {userProfile.portionSize ? getPortionSizeDisplayName(userProfile.portionSize) : 'Not set'}</p>
                  </div>
                ) : (
                  <p className="text-gray-700 font-body">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {userProfile.isOnboardingComplete && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-body">
              Your preferences help us create personalized meal plans and recipe suggestions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 