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
import { HiX } from 'react-icons/hi';

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
  const [customCuisine, setCustomCuisine] = useState('');

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

  const handleAddCustomCuisine = () => {
    if (customCuisine.trim() && !userProfile.preferredCuisines.includes(customCuisine.trim())) {
      updateProfile({
        preferredCuisines: [...userProfile.preferredCuisines, customCuisine.trim()]
      });
      setCustomCuisine('');
    }
  };

  const predefinedIds = cuisineOptions.map(option => option.id);
  const otherCuisines = userProfile.preferredCuisines.filter(cuisine => !predefinedIds.includes(cuisine));

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex-1">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            What type of cuisine do you enjoy? This helps us suggest recipes you'll love.
          </p>
        </div>
      </div>

      {/* Cuisine Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {cuisineOptions.map((cuisine, index) => {
          const isSelected = userProfile.preferredCuisines.includes(cuisine.id);
          
          return (
            <button
              key={cuisine.id}
              onClick={() => handleCuisineToggle(cuisine.id)}
              className={`option-card-compact text-center ${getSelectionClass(index, isSelected)}`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: getIconBgColor(index, isSelected) }}
                >
                  <cuisine.icon 
                    className="w-7 h-7"
                    style={{ color: getIconColor(index, isSelected) }}
                  />
                </div>
                <div className="space-y-1">
                  <span className={`card-title text-sm ${
                    isSelected ? '' : 'text-gray-800'
                  }`}
                  style={isSelected ? { color: getTextColor(index, true) } : {}}>
                    {cuisine.name}
                  </span>
                  {cuisine.description && (
                    <span className={`text-xs leading-relaxed block ${
                      isSelected ? '' : 'text-gray-600'
                    }`}
                    style={isSelected ? { color: getTextColor(index, true) } : {}}>
                      {cuisine.description}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Cuisines Section */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="card-title text-gray-900 mb-5">Add Custom Cuisines</h3>
        <div className="flex flex-wrap gap-3 mb-5">
          {userProfile.preferredCuisines
            .filter(cuisine => !cuisineOptions.some(c => c.id === cuisine))
            .map((cuisine) => (
              <div
                key={cuisine}
                className="flex items-center space-x-2 border text-sm font-medium px-4 py-2 rounded-full"
                style={{ 
                  backgroundColor: '#e8f0e0', 
                  borderColor: '#9cb481', 
                  color: '#3f6613' 
                }}
              >
                <span>{cuisine}</span>
                <button
                  onClick={() => handleCuisineToggle(cuisine)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: '#3f6613' }}
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
        
        <div className="flex space-x-3">
          <input
            type="text"
            value={customCuisine}
            onChange={(e) => setCustomCuisine(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomCuisine()}
            placeholder="Add another cuisine..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition-all"
            onFocus={(e) => {
              e.target.style.borderColor = '#9cb481';
              e.target.style.boxShadow = '0 0 0 3px rgba(156, 180, 129, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handleAddCustomCuisine}
            disabled={!customCuisine.trim()}
            className="text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#9cb481' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#7a9365')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#9cb481')}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
} 