'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

const commonDislikes = [
  { id: 'cilantro', name: 'Cilantro', description: 'the "soapy" one', icon: '🌿' },
  { id: 'mushrooms', name: 'Mushrooms', description: 'all varieties', icon: '🍄' },
  { id: 'olives', name: 'Olives', description: 'green or black', icon: '🫒' },
  { id: 'blue-cheese', name: 'Blue Cheese', description: 'strong and moldy', icon: '🧀' },
  { id: 'anchovies', name: 'Anchovies', description: 'salty little fish', icon: '🐟' },
  { id: 'beets', name: 'Beets', description: 'earthy and sweet', icon: '🍠' },
  { id: 'tofu', name: 'Tofu', description: 'soy-based protein', icon: '⬜' },
  { id: 'mayonnaise', name: 'Mayonnaise', description: 'creamy condiment', icon: '🥄' },
  { id: 'spicy-food', name: 'Spicy Food', description: 'in general', icon: '🌶️' },
  { id: 'red-meat', name: 'Red Meat', description: 'Beef, Lamb', icon: '🥩' },
];

export default function DislikesStep() {
  const { userProfile, updateProfile } = useUser();
  const [otherDislike, setOtherDislike] = useState('');

  const handleDislikeToggle = (dislikeId: string) => {
    const currentDislikes = userProfile.dislikes;
    const isSelected = currentDislikes.includes(dislikeId);
    
    if (isSelected) {
      updateProfile({
        dislikes: currentDislikes.filter(id => id !== dislikeId)
      });
    } else {
      updateProfile({
        dislikes: [...currentDislikes, dislikeId]
      });
    }
  };

  const handleOtherDislikeAdd = () => {
    if (otherDislike.trim() && !userProfile.dislikes.includes(otherDislike.trim())) {
      updateProfile({
        dislikes: [...userProfile.dislikes, otherDislike.trim()]
      });
      setOtherDislike('');
    }
  };

  const removeOtherDislike = (dislike: string) => {
    updateProfile({
      dislikes: userProfile.dislikes.filter(d => d !== dislike)
    });
  };

  const predefinedIds = commonDislikes.map(dislike => dislike.id);
  const otherDislikes = userProfile.dislikes.filter(dislike => !predefinedIds.includes(dislike));

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex-1">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            What foods do you prefer to avoid? We'll keep these out of your meal plans.
          </p>
        </div>
      </div>

      {/* Dislike Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {commonDislikes.map((dislike, index) => {
          const isSelected = userProfile.dislikes.includes(dislike.id);
          const isOrangeCard = index % 2 !== 0; // Orange for odd indices
          const selectionClass = isSelected ? (isOrangeCard ? 'selected-orange' : 'selected-green') : '';
          
          return (
            <button
              key={dislike.id}
              onClick={() => handleDislikeToggle(dislike.id)}
              className={`option-card text-left relative ${selectionClass}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`card-title mb-1 ${
                    isSelected ? '' : 'text-gray-800'
                  }`}
                  style={isSelected ? { color: isOrangeCard ? '#e8956b' : '#7a9365' } : {}}>
                    {dislike.name}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? '' : 'text-gray-600'
                  }`}
                  style={isSelected ? { color: isOrangeCard ? '#e8956b' : '#7a9365' } : {}}>
                    {dislike.description}
                  </p>
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

      {/* Other Dislikes */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="card-title text-gray-900 mb-5">Other Dislikes</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={otherDislike}
            onChange={(e) => setOtherDislike(e.target.value)}
            placeholder="Add something you don't like..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleOtherDislikeAdd()}
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
            onClick={handleOtherDislikeAdd}
            disabled={!otherDislike.trim()}
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