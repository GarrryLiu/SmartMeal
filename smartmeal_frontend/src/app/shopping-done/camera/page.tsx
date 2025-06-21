'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiCamera, HiRefresh } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

export default function CameraPage() {
  const router = useRouter();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate capture process
    setTimeout(() => {
      setIsCapturing(false);
      // For now, redirect to manual input
      // In a real implementation, this would process the image and extract ingredients
      alert('Camera feature coming soon! Redirecting to manual input for now.');
      router.push('/shopping-done/manual');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Input Options</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Capture Your Receipt
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Position your receipt in the camera frame and we'll automatically extract the ingredients for you.
          </p>
        </div>

        {/* Camera Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Camera Preview Placeholder */}
            <div className="aspect-[3/4] bg-zinc-900 rounded-xl border-2 border-zinc-700 flex items-center justify-center mb-8">
              {isCapturing ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-300">Processing receipt...</p>
                </div>
              ) : (
                <div className="text-center">
                  <HiCamera className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Camera preview will appear here</p>
                  <p className="text-sm text-gray-500 mt-2">Make sure your receipt is well-lit and fully visible</p>
                </div>
              )}
            </div>

            {/* Capture Button */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                  isCapturing
                    ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                }`}
              >
                <HiCamera className="w-6 h-6" />
                <span>{isCapturing ? 'Processing...' : 'Capture Receipt'}</span>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 card">
            <h3 className="text-xl font-semibold text-white mb-4">📸 Photography Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Ensure good lighting - avoid shadows on the receipt</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Keep the receipt flat and fully visible in the frame</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Hold your device steady to avoid blurry images</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Make sure all text is clear and readable</span>
              </li>
            </ul>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-400 rounded-lg">
            <p className="text-yellow-200 text-center">
              <strong>🚧 Feature in Development:</strong> Camera receipt scanning is coming soon! 
              For now, you'll be redirected to manual input after capturing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 