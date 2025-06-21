'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import DietStep from '@/components/onboarding/DietStep';
import CuisineStep from '@/components/onboarding/CuisineStep';
import AllergiesStep from '@/components/onboarding/AllergiesStep';
import DislikesStep from '@/components/onboarding/DislikesStep';
import HealthGoalsStep from '@/components/onboarding/HealthGoalsStep';
import CookingTimeStep from '@/components/onboarding/CookingTimeStep';
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi';

const steps = [
  { id: 'diet', title: 'Diet Preferences', component: DietStep },
  { id: 'cuisine', title: 'Preferred Cuisines', component: CuisineStep },
  { id: 'allergies', title: 'Allergies', component: AllergiesStep },
  { id: 'dislikes', title: 'Dislikes', component: DislikesStep },
  { id: 'health', title: 'Health Goals', component: HealthGoalsStep },
  { id: 'cooking', title: 'Cooking Time', component: CookingTimeStep },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { updateProfile } = useUser();
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateProfile({ isOnboardingComplete: true });
      router.push('/');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="onboarding-container min-h-screen flex flex-col bg-soft-grey">
      {/* Header Section with Better Spacing */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="title-medium text-gray-900 text-4xl">
            {steps[currentStep].title}
          </h1>
          <span className="text-gray-500 text-lg font-medium bg-white px-4 py-2 rounded-full shadow-sm">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              backgroundColor: '#9cb481'
            }}
          />
        </div>
      </div>

      {/* Step Content with Better Container */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <CurrentStepComponent />
      </div>

      {/* Navigation Buttons with Better Styling */}
      <div className="flex justify-between items-center pt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium transition-colors duration-300 ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed bg-gray-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white bg-white/80 border border-gray-200'
          }`}
        >
          <HiArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-3 text-white px-8 py-4 rounded-2xl font-semibold transition-colors duration-300 hover-green-button"
          style={{ backgroundColor: '#9cb481' }}
        >
          <span>{currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}</span>
          {currentStep === steps.length - 1 ? (
            <HiCheck className="w-5 h-5" />
          ) : (
            <HiArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
} 