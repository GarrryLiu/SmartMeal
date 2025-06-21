'use client';

import { useUser } from '@/contexts/UserContext';
import { 
  MdRestaurant, 
  MdFitnessCenter, 
  MdEco, 
  MdLocalFlorist,
  MdGrain,
  MdWaves,
  MdBalance,
  MdNoFood,
  MdFireplace,
  MdNature,
  MdSpa
} from 'react-icons/md';

const dietOptions = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'I eat a little bit of everything.',
    icon: MdRestaurant,
  },
  {
    id: 'low-carb',
    name: 'Low-Carb',
    description: 'Focusing on protein and fats, limiting sugars and starches.',
    icon: MdFitnessCenter,
  },
  {
    id: 'low-fat',
    name: 'Low-Fat',
    description: 'Prioritizing lean proteins and vegetables.',
    icon: MdBalance,
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'No meat or fish.',
    icon: MdLocalFlorist,
  },
  {
    id: 'vegan',
    name: 'Vegan',
    description: 'No animal products of any kind, including dairy, eggs, and honey.',
    icon: MdEco,
  },
  {
    id: 'pescatarian',
    name: 'Pescatarian',
    description: 'Vegetarian, but I include fish and seafood.',
    icon: MdWaves,
  },
  {
    id: 'flexitarian',
    name: 'Flexitarian',
    description: 'Mostly vegetarian, but I occasionally eat meat or fish.',
    icon: MdNature,
  },
  {
    id: 'gluten-free',
    name: 'Gluten-Free',
    description: 'Avoiding wheat, barley, and rye.',
    icon: MdNoFood,
  },
  {
    id: 'keto',
    name: 'Keto',
    description: 'Very low-carb, high-fat diet.',
    icon: MdFireplace,
  },
  {
    id: 'paleo',
    name: 'Paleo',
    description: 'Focusing on whole foods, lean proteins, and vegetables; avoiding grains, dairy, and legumes.',
    icon: MdGrain,
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    description: 'Emphasizing fruits, vegetables, whole grains, and healthy fats like olive oil.',
    icon: MdSpa,
  },
];

export default function DietStep() {
  const { userProfile, updateProfile } = useUser();

  const handleDietSelect = (dietId: string) => {
    updateProfile({ diet: dietId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-300 text-lg">
          This section helps us understand your overall eating philosophy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dietOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = userProfile.diet === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => handleDietSelect(option.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-white bg-zinc-800 shadow-lg'
                  : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start space-x-4">
                <IconComponent 
                  className={`w-8 h-8 flex-shrink-0 ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`} 
                />
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isSelected ? 'text-white' : 'text-gray-200'
                  }`}>
                    {option.name}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? 'text-gray-200' : 'text-gray-400'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 