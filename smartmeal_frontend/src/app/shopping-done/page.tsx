'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiCamera, HiUpload, HiPencilAlt, HiArrowRight } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Spotlight />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/meal" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Meal Planning</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Did You Buy?
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                  ? 'border-blue-400 bg-blue-900/20 shadow-lg shadow-blue-500/20' 
                  : 'border-zinc-700 bg-zinc-950 hover:border-blue-500 hover:bg-blue-900/10',
                green: isSelected 
                  ? 'border-green-400 bg-green-900/20 shadow-lg shadow-green-500/20' 
                  : 'border-zinc-700 bg-zinc-950 hover:border-green-500 hover:bg-green-900/10',
                purple: isSelected 
                  ? 'border-purple-400 bg-purple-900/20 shadow-lg shadow-purple-500/20' 
                  : 'border-zinc-700 bg-zinc-950 hover:border-purple-500 hover:bg-purple-900/10',
              };

              const iconColorClasses = {
                blue: isSelected ? 'text-blue-400' : 'text-blue-500',
                green: isSelected ? 'text-green-400' : 'text-green-500',
                purple: isSelected ? 'text-purple-400' : 'text-purple-500',
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
                        <div className="absolute -inset-2 border-2 border-white rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className={`text-xl font-semibold transition-colors ${
                        isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {method.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors ${
                        isSelected ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
                      }`}>
                        {method.description}
                      </p>
                    </div>

                    <div className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                      isSelected 
                        ? 'text-white' 
                        : `text-${method.color}-500 group-hover:text-${method.color}-400`
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
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            💡 <strong>Pro tip:</strong> The more accurate your ingredient list, the better recipe suggestions we can provide. 
            Don't worry about exact quantities - we'll help you adjust as needed!
          </p>
        </div>
      </div>
    </div>
  );
} 