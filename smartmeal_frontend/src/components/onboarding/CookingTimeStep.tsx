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

  const handleCookingTimeSelect = (timeId: string) => {
    updateProfile({ cookingTime: timeId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-300 text-lg">
          How much time do you realistically have to cook on a busy night?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cookingTimeOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = userProfile.cookingTime === option.id;
          
          const colorClasses = {
            green: isSelected 
              ? 'border-green-400 bg-green-900/20 text-green-200' 
              : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900',
            blue: isSelected 
              ? 'border-blue-400 bg-blue-900/20 text-blue-200' 
              : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900',
            purple: isSelected 
              ? 'border-purple-400 bg-purple-900/20 text-purple-200' 
              : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900',
            orange: isSelected 
              ? 'border-orange-400 bg-orange-900/20 text-orange-200' 
              : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900',
          };

          const iconColorClasses = {
            green: isSelected ? 'text-green-400' : 'text-gray-400',
            blue: isSelected ? 'text-blue-400' : 'text-gray-400',
            purple: isSelected ? 'text-purple-400' : 'text-gray-400',
            orange: isSelected ? 'text-orange-400' : 'text-gray-400',
          };
          
          return (
            <button
              key={option.id}
              onClick={() => handleCookingTimeSelect(option.id)}
              className={`p-8 rounded-xl border-2 transition-all duration-300 text-left ${
                colorClasses[option.color as keyof typeof colorClasses]
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <IconComponent 
                  className={`w-12 h-12 ${
                    iconColorClasses[option.color as keyof typeof iconColorClasses]
                  }`} 
                />
                <div>
                  <h3 className={`font-semibold text-xl mb-2 ${
                    isSelected ? '' : 'text-gray-200'
                  }`}>
                    {option.name}
                  </h3>
                  <p className={`text-lg ${
                    isSelected ? '' : 'text-gray-400'
                  }`}>
                    {option.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          Don't worry, you can always adjust this later in your profile settings.
        </p>
      </div>
    </div>
  );
} 