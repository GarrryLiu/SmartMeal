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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MdWarning className="w-6 h-6 text-red-400" />
          <p className="text-red-400 font-semibold">Critical for your safety</p>
        </div>
        <p className="text-gray-300 text-lg">
          We will <strong>always</strong> exclude these from your recommendations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search allergies..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white"
        />
      </div>

      {/* Common Allergies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAllergies.map((allergy) => {
          const isSelected = userProfile.allergies.includes(allergy.id);
          
          return (
            <button
              key={allergy.id}
              onClick={() => handleAllergyToggle(allergy.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-red-400 bg-red-900/20 shadow-lg'
                  : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{allergy.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    isSelected ? 'text-red-200' : 'text-gray-200'
                  }`}>
                    {allergy.name}
                  </h3>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Allergies */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Other Allergies</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={otherAllergy}
            onChange={(e) => setOtherAllergy(e.target.value)}
            placeholder="Please specify..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            onKeyPress={(e) => e.key === 'Enter' && handleOtherAllergyAdd()}
          />
          <button
            onClick={handleOtherAllergyAdd}
            disabled={!otherAllergy.trim()}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        
        {otherAllergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {otherAllergies.map((allergy) => (
              <span
                key={allergy}
                className="bg-red-900/20 border border-red-400 text-red-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{allergy}</span>
                <button
                  onClick={() => removeOtherAllergy(allergy)}
                  className="text-red-300 hover:text-red-100"
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