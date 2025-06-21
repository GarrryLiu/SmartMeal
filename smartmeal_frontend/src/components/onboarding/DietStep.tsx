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
            Tell us about your dietary preferences so we can personalize your meal recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietOptions.map((diet, index) => {
          const isSelected = userProfile.diet === diet.id;
          
          return (
            <button
              key={diet.id}
              onClick={() => updateProfile({ diet: diet.id })}
              className={`option-card text-left ${getSelectionClass(index, isSelected)}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: getIconBgColor(index, isSelected) }}
                >
                  <diet.icon 
                    className="w-7 h-7"
                    style={{ color: getIconColor(index, isSelected) }}
                  />
                </div>
                <span className={`card-title ${
                  isSelected ? '' : 'text-gray-800'
                }`}
                style={isSelected ? { color: getTextColor(index, true) } : {}}>
                  {diet.name}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                isSelected ? '' : 'text-gray-600'
              }`}
              style={isSelected ? { color: getTextColor(index, true) } : {}}>
                {diet.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
} 