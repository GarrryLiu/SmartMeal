'use client';

import { useUser } from '@/contexts/UserContext';
import { MdAccessTime, MdTimer, MdSchedule, MdTimelapse } from 'react-icons/md';

const cookingTimeOptions = [
  {
    id: 'quick',
    name: 'Quick & Easy',
    description: 'Under 20 minutes',
    icon: MdAccessTime,
    color: 'green',
  },
  {
    id: 'standard',
    name: 'Standard',
    description: '20-40 minutes',
    icon: MdTimer,
    color: 'blue',
  },
  {
    id: 'relaxed',
    name: 'Relaxed',
    description: '40-60 minutes',
    icon: MdSchedule,
    color: 'purple',
  },
  {
    id: 'no-limit',
    name: "I don't mind the time",
    description: '60+ minutes',
    icon: MdTimelapse,
    color: 'orange',
  },
];

export default function CookingTimeStep() {
  const { userProfile, updateProfile } = useUser();

  const getIconColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#7a9365' : '#e8956b'; // Darker versions for selected
    }
    // Alternate between primary and secondary colors for unselected icons
    return index % 2 === 0 ? '#9cb481' : '#f4a261';
  };

  const getIconBgColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#e8f0e0' : '#fce4d0'; // Light versions for selected
    }
    // Alternate between light versions for unselected
    return index % 2 === 0 ? '#f0f4ed' : '#fce4d0';
  };

  const getSelectionClass = (index: number, isSelected: boolean) => {
    if (!isSelected) return '';
    return index % 2 === 0 ? 'selected-green' : 'selected-orange';
  };

  const getTextColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return index % 2 === 0 ? '#7a9365' : '#e8956b';
    }
    return '';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex-1">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            How much time do you typically have for cooking? This helps us suggest appropriate recipes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cookingTimeOptions.map((option, index) => {
          const isSelected = userProfile.cookingTime === option.id;
          const IconComponent = option.icon;
          
          return (
            <button
              key={option.id}
              onClick={() => updateProfile({ cookingTime: option.id })}
              className={`option-card text-left ${getSelectionClass(index, isSelected)}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: getIconBgColor(index, isSelected) }}
                >
                  <IconComponent 
                    className="w-7 h-7"
                    style={{ color: getIconColor(index, isSelected) }}
                  />
                </div>
                <h3 className={`card-title ${
                  isSelected ? '' : 'text-gray-800'
                }`}
                style={isSelected ? { color: getTextColor(index, true) } : {}}>
                  {option.name}
                </h3>
              </div>
              <p className={`text-sm leading-relaxed ${
                isSelected ? '' : 'text-gray-600'
              }`}
              style={isSelected ? { color: getTextColor(index, true) } : {}}>
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 text-sm">
          💡 Don't worry - you can always filter recipes by cooking time when planning meals!
        </p>
      </div>
    </div>
  );
} 