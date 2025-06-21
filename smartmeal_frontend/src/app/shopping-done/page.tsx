'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiCamera, HiUpload, HiPencilAlt, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';

export default function ShoppingDonePage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const inputMethods = [
    {
      id: 'camera',
      title: 'Take a Photo',
      description: 'Snap a picture of your receipt and we\'ll extract the ingredients automatically',
      icon: HiCamera,
      color: 'blue',
      action: () => router.push('/shopping-done/camera')
    },
    {
      id: 'upload',
      title: 'Upload Receipt',
      description: 'Upload an image of your receipt from your device gallery',
      icon: HiUpload,
      color: 'green',
      action: () => router.push('/shopping-done/upload')
    },
    {
      id: 'manual',
      title: 'Add Manually',
      description: 'Type in your ingredients and quantities yourself',
      icon: HiPencilAlt,
      color: 'purple',
      action: () => router.push('/shopping-done/manual')
    }
  ];

  const handleMethodSelect = (method: typeof inputMethods[0]) => {
    setSelectedMethod(method.id);
    setTimeout(() => {
      method.action();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/meal" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Meal Planning</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Did You Buy?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tell us about your ingredients and we'll suggest delicious recipes you can make right now. 
            Choose how you'd like to add your ingredients below.
          </p>
        </div>

        {/* Input Method Options */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inputMethods.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedMethod === method.id;
              
              const colorClasses = {
                blue: isSelected 
                  ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50',
                green: isSelected 
                  ? 'border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-500/20' 
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50',
                purple: isSelected 
                  ? 'border-purple-400 bg-purple-50 shadow-lg shadow-purple-500/20' 
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50',
              };

              const iconColorClasses = {
                blue: isSelected ? 'text-blue-500' : 'text-blue-500',
                green: isSelected ? 'text-emerald-500' : 'text-emerald-500',
                purple: isSelected ? 'text-purple-500' : 'text-purple-500',
              };
              
              return (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method)}
                  className={`p-8 rounded-xl border-2 transition-all duration-300 text-center group ${
                    colorClasses[method.color as keyof typeof colorClasses]
                  }`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <IconComponent 
                        className={`w-16 h-16 transition-all duration-300 ${
                          iconColorClasses[method.color as keyof typeof iconColorClasses]
                        }`} 
                      />
                      {isSelected && (
                        <div className="absolute -inset-2 border-2 border-emerald-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className={`text-xl font-semibold transition-colors ${
                        isSelected ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
                      }`}>
                        {method.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors ${
                        isSelected ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                        {method.description}
                      </p>
                    </div>

                    <div className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                      isSelected 
                        ? 'text-emerald-600' 
                        : `text-${method.color}-500 group-hover:text-${method.color}-600`
                    }`}>
                      <span>Get Started</span>
                      <HiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            💡 <strong>Pro tip:</strong> The more accurate your ingredient list, the better recipe suggestions we can provide. 
            Don't worry about exact quantities - we'll help you adjust as needed!
          </p>
        </div>
      </div>
    </div>
  );
} 