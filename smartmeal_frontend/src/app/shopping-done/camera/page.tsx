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
      
      // Add mock ingredients extracted from photo
      const mockIngredients = [
        { id: '1', name: 'Tomatoes', quantity: '3 large' },
        { id: '2', name: 'Onions', quantity: '2 medium' },
        { id: '3', name: 'Ground beef', quantity: '1 lb' },
        { id: '4', name: 'Pasta', quantity: '1 box' }
      ];
      
      localStorage.setItem('userIngredients', JSON.stringify(mockIngredients));
      
      // For now, redirect to preferences to confirm preferences
      // In a real implementation, this would process the image and extract ingredients
      alert('Camera feature coming soon! We\'ve added some sample ingredients for you.');
      router.push('/shopping-done/preferences');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/shopping-done" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-body"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Input Options</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="title-medium text-gray-900 text-4xl mb-6">
            Take a Photo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
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
                  <HiCamera className="w-24 h-24 mx-auto mb-4" style={{ color: '#9cb481' }} />
                </div>
                <p className="text-gray-600 font-body">Processing image...</p>
              </div>
            ) : (
              <div className="text-center">
                <HiCamera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-body">Camera preview will appear here</p>
              </div>
            )}
          </div>

          {/* Capture Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleCapturePhoto}
              disabled={isCapturing}
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 font-body ${
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
          <div className="p-4 rounded-lg bg-orange-secondary-light" style={{ border: '1px solid #f4a261' }}>
            <p className="text-center font-body" style={{ color: '#e8956b' }}>
              <strong>🚧 Feature in Development:</strong> Camera capture is coming soon! 
              For now, you'll get sample ingredients and can proceed to set your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 