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
    <div className="page-container min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            {steps[currentStep].title}
          </h1>
          <span className="text-gray-400">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col">
        <CurrentStepComponent />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentStep === 0
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <HiArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 btn-primary"
        >
          <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
          {currentStep === steps.length - 1 ? (
            <HiCheck className="w-4 h-4" />
          ) : (
            <HiArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
} 