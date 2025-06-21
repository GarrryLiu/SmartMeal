'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { 
  MdFlag,
  MdLocalPizza,
  MdRamenDining,
  MdDinnerDining,
  MdFastfood,
  MdLunchDining,
  MdEmojiFoodBeverage,
  MdFoodBank,
  MdRestaurant,
  MdTerrain,
  MdLocalBar,
  MdBeachAccess,
  MdPublic,
  MdStar
} from 'react-icons/md';

const cuisineOptions = [
  { id: 'american', name: 'American', description: 'New England, Southern, etc.', icon: MdFlag },
  { id: 'italian', name: 'Italian', description: 'Pizza, pasta, and more', icon: MdLocalPizza },
  { id: 'mexican', name: 'Mexican', description: 'Tacos, burritos, and spices', icon: MdEmojiFoodBeverage },
  { id: 'chinese', name: 'Chinese', description: 'Sichuan, Cantonese, etc.', icon: MdDinnerDining },
  { id: 'japanese', name: 'Japanese', description: 'Sushi, ramen, and traditional', icon: MdFastfood },
  { id: 'indian', name: 'Indian', description: 'Curries, spices, and variety', icon: MdLunchDining },
  { id: 'thai', name: 'Thai', description: 'Sweet, sour, and spicy', icon: MdRamenDining },
  { id: 'vietnamese', name: 'Vietnamese', description: 'Fresh herbs and pho', icon: MdFoodBank },
  { id: 'korean', name: 'Korean', description: 'BBQ, kimchi, and fermented', icon: MdRestaurant },
  { id: 'mediterranean', name: 'Mediterranean', description: 'Greek, Lebanese, etc.', icon: MdTerrain },
  { id: 'french', name: 'French', description: 'Classic techniques and flavors', icon: MdLocalBar },
  { id: 'caribbean', name: 'Caribbean', description: 'Tropical and island flavors', icon: MdBeachAccess },
  { id: 'latin-american', name: 'Latin American', description: 'Peruvian, Colombian, etc.', icon: MdPublic },
  { id: 'adventurous', name: "I'm adventurous!", description: 'Surprise me with variety', icon: MdStar },
];

export default function CuisineStep() {
  const { userProfile, updateProfile } = useUser();
  const [otherCuisine, setOtherCuisine] = useState('');

  const handleCuisineToggle = (cuisineId: string) => {
    const currentCuisines = userProfile.preferredCuisines;
    const isSelected = currentCuisines.includes(cuisineId);
    
    if (isSelected) {
      updateProfile({
        preferredCuisines: currentCuisines.filter(id => id !== cuisineId)
      });
    } else {
      updateProfile({
        preferredCuisines: [...currentCuisines, cuisineId]
      });
    }
  };

  const handleOtherCuisineAdd = () => {
    if (otherCuisine.trim() && !userProfile.preferredCuisines.includes(otherCuisine.trim())) {
      updateProfile({
        preferredCuisines: [...userProfile.preferredCuisines, otherCuisine.trim()]
      });
      setOtherCuisine('');
    }
  };

  const removeOtherCuisine = (cuisine: string) => {
    updateProfile({
      preferredCuisines: userProfile.preferredCuisines.filter(c => c !== cuisine)
    });
  };

  const predefinedIds = cuisineOptions.map(option => option.id);
  const otherCuisines = userProfile.preferredCuisines.filter(cuisine => !predefinedIds.includes(cuisine));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-300 text-lg">
          Select all the flavors you love! We'll use this to inspire your weekly plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cuisineOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = userProfile.preferredCuisines.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleCuisineToggle(option.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-white bg-zinc-800 shadow-lg'
                  : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent 
                  className={`w-6 h-6 flex-shrink-0 ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`} 
                />
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
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

      {/* Other Cuisines */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Other Cuisines</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={otherCuisine}
            onChange={(e) => setOtherCuisine(e.target.value)}
            placeholder="Type a cuisine..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            onKeyPress={(e) => e.key === 'Enter' && handleOtherCuisineAdd()}
          />
          <button
            onClick={handleOtherCuisineAdd}
            disabled={!otherCuisine.trim()}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        
        {otherCuisines.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {otherCuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{cuisine}</span>
                <button
                  onClick={() => removeOtherCuisine(cuisine)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 