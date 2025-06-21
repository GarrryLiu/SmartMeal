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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-300 text-lg">
          We'll do our best to avoid ingredients you're not a fan of.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {commonDislikes.map((dislike) => {
          const isSelected = userProfile.dislikes.includes(dislike.id);
          
          return (
            <button
              key={dislike.id}
              onClick={() => handleDislikeToggle(dislike.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-orange-400 bg-orange-900/20 shadow-lg'
                  : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{dislike.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    isSelected ? 'text-orange-200' : 'text-gray-200'
                  }`}>
                    {dislike.name}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? 'text-orange-300' : 'text-gray-400'
                  }`}>
                    {dislike.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Dislikes */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Other Dislikes</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={otherDislike}
            onChange={(e) => setOtherDislike(e.target.value)}
            placeholder="Please specify..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            onKeyPress={(e) => e.key === 'Enter' && handleOtherDislikeAdd()}
          />
          <button
            onClick={handleOtherDislikeAdd}
            disabled={!otherDislike.trim()}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        
        {otherDislikes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {otherDislikes.map((dislike) => (
              <span
                key={dislike}
                className="bg-orange-900/20 border border-orange-400 text-orange-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{dislike}</span>
                <button
                  onClick={() => removeOtherDislike(dislike)}
                  className="text-orange-300 hover:text-orange-100"
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