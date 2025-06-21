'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiCamera, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';

export default function CameraPage() {
  const router = useRouter();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapturePhoto = () => {
    setIsCapturing(true);
    // Simulate photo capture and processing
    setTimeout(() => {
      setIsCapturing(false);
      // For now, redirect to manual input
      // In a real implementation, this would process the image and extract ingredients
      alert('Camera feature coming soon! Redirecting to manual input for now.');
      router.push('/shopping-done/manual');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Input Options</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Take a Photo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Snap a picture of your receipt and we'll automatically extract the ingredients for you.
          </p>
        </div>

        {/* Camera Interface */}
        <div className="max-w-2xl mx-auto">
          {/* Camera Placeholder */}
          <div className="aspect-video bg-gray-100 border-2 border-gray-300 rounded-xl flex items-center justify-center mb-8">
            {isCapturing ? (
              <div className="text-center">
                <div className="animate-pulse">
                  <HiCamera className="w-24 h-24 text-emerald-500 mx-auto mb-4" />
                </div>
                <p className="text-gray-600">Processing image...</p>
              </div>
            ) : (
              <div className="text-center">
                <HiCamera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Camera preview will appear here</p>
              </div>
            )}
          </div>

          {/* Capture Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleCapturePhoto}
              disabled={isCapturing}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                isCapturing
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              <HiCamera className="w-5 h-5" />
              <span>{isCapturing ? 'Processing...' : 'Capture Receipt'}</span>
            </button>
          </div>

          {/* Coming Soon Notice */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 text-center">
              <strong>🚧 Feature in Development:</strong> Camera capture is coming soon! 
              For now, you'll be redirected to manual input after capturing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 