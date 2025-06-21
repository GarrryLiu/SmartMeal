'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  diet: string;
  preferredCuisines: string[];
  allergies: string[];
  dislikes: string[];
  calorieTracking: 'none' | 'estimate' | 'specific';
  dailyCalorieTarget?: number;
  macroGoals: string[];
  portionSize: string;
  cookingTime: string;
  isOnboardingComplete: boolean;
}

interface UserContextType {
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  diet: '',
  preferredCuisines: [],
  allergies: [],
  dislikes: [],
  calorieTracking: 'none',
  macroGoals: [],
  portionSize: '',
  cookingTime: '',
  isOnboardingComplete: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setUserProfile({ ...defaultProfile });
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 