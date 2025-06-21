'use client';

import { HiWifi } from 'react-icons/hi';

export default function Offline() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="text-center">
        <HiWifi className="w-24 h-24 text-gray-600 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">
          You're Offline
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Don't worry! You can still use SnapCook Planner offline.
        </p>
        <div className="card max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4">
            Available Offline Features:
          </h2>
          <ul className="text-left space-y-2 text-gray-300">
            <li>• View saved meal plans</li>
            <li>• Browse cached recipes</li>
            <li>• Access your profile</li>
            <li>• View analytics</li>
          </ul>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary mt-8"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 