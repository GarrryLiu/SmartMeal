'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useUser } from '@/contexts/UserContext';
import { Spotlight } from '@/components/Spotlight';

export default function Home() {
  const { userProfile } = useUser();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              SmartMeal Planner
            </h1>
            
            <div className="mb-12">
              {!userProfile.isOnboardingComplete ? (
                <>
                  <p className="text-xl md:text-2xl text-blue-400 mb-4">
                    New to SmartMeal?
                  </p>
                  <Link 
                    href="/onboarding"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xl md:text-2xl text-gray-300 mb-4">
                    Ready to plan your next meal?
                  </p>
                  <Link 
                    href="/meal"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
                  >
                    <span>Let's Start Planning Your Meal</span>
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
