'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { MdWarning, MdSearch } from 'react-icons/md';

const commonAllergies = [
  { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
  { id: 'tree-nuts', name: 'Tree Nuts (Almonds, Walnuts)', icon: '🌰' },
  { id: 'milk', name: 'Milk / Dairy', icon: '🥛' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'soy', name: 'Soy', icon: '🫘' },
  { id: 'wheat', name: 'Wheat', icon: '🌾' },
  { id: 'fish', name: 'Fish', icon: '🐟' },
  { id: 'shellfish', name: 'Shellfish (Shrimp, Crab)', icon: '🦐' },
  { id: 'sesame', name: 'Sesame', icon: '🌱' },
  { id: 'mustard', name: 'Mustard', icon: '🌭' },
];

export default function AllergiesStep() {
  const { userProfile, updateProfile } = useUser();
  const [otherAllergy, setOtherAllergy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAllergyToggle = (allergyId: string) => {
    const currentAllergies = userProfile.allergies;
    const isSelected = currentAllergies.includes(allergyId);
    
    if (isSelected) {
      updateProfile({
        allergies: currentAllergies.filter(id => id !== allergyId)
      });
    } else {
      updateProfile({
        allergies: [...currentAllergies, allergyId]
      });
    }
  };

  const handleOtherAllergyAdd = () => {
    if (otherAllergy.trim() && !userProfile.allergies.includes(otherAllergy.trim())) {
      updateProfile({
        allergies: [...userProfile.allergies, otherAllergy.trim()]
      });
      setOtherAllergy('');
    }
  };

  const removeOtherAllergy = (allergy: string) => {
    updateProfile({
      allergies: userProfile.allergies.filter(a => a !== allergy)
    });
  };

  const predefinedIds = commonAllergies.map(allergy => allergy.id);
  const otherAllergies = userProfile.allergies.filter(allergy => !predefinedIds.includes(allergy));

  const filteredAllergies = commonAllergies.filter(allergy =>
    allergy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MdWarning className="w-6 h-6" style={{ color: '#f4a261' }} />
          <p className="font-semibold" style={{ color: '#f4a261' }}>Critical for your safety</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            Let us know about any food allergies or intolerances so we can keep you safe.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#9cb481' }} />
        <input
          type="text"
          placeholder="Search for allergies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition-all"
          onFocus={(e) => {
            e.target.style.borderColor = '#9cb481';
            e.target.style.boxShadow = '0 0 0 3px rgba(156, 180, 129, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Allergy Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredAllergies.map((allergy, index) => {
          const isSelected = userProfile.allergies.includes(allergy.id);
          const isOrangeCard = index % 2 !== 0; // Orange for odd indices
          const selectionClass = isSelected ? (isOrangeCard ? 'selected-orange' : 'selected-green') : '';
          
          return (
            <button
              key={allergy.id}
              onClick={() => handleAllergyToggle(allergy.id)}
              className={`option-card text-left relative ${selectionClass}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`card-title mb-1 ${
                    isSelected ? '' : 'text-gray-800'
                  }`}
                  style={isSelected ? { color: isOrangeCard ? '#e8956b' : '#7a9365' } : {}}>
                    {allergy.name}
                  </h3>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: isOrangeCard ? '#f4a261' : '#9cb481' }}>
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Allergies */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="card-title text-gray-900 mb-5">Other Allergies</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={otherAllergy}
            onChange={(e) => setOtherAllergy(e.target.value)}
            placeholder="Add another allergy..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleOtherAllergyAdd()}
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
            onClick={handleOtherAllergyAdd}
            disabled={!otherAllergy.trim()}
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