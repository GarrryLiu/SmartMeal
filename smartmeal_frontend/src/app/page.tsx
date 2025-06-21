'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { userProfile } = useUser();

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="title-large text-5xl md:text-7xl font-bold mb-8 tracking-wider">
              SnapCook
            </h1>
            
            <div className="mb-12">
              {!userProfile.isOnboardingComplete ? (
                <>
                  <p className="text-xl md:text-2xl mb-4 font-body" style={{ color: '#9cb481' }}>
                    New to SnapCook?
                  </p>
                  <Link 
                    href="/onboarding"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 font-body"
                  >
                    <span>Get Started</span>
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xl md:text-2xl text-gray-600 mb-4 font-body">
                    Ready to plan your next meal?
                  </p>
                  <Link 
                    href="/meal"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 font-body"
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
