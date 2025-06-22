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
      color: 'green',
      action: () => router.push('/shopping-done/camera')
    },
    {
      id: 'upload',
      title: 'Upload Receipt',
      description: 'Upload an image of your receipt from your device gallery',
      icon: HiUpload,
      color: 'orange',
      action: () => router.push('/shopping-done/upload')
    },
    {
      id: 'manual',
      title: 'Add Manually',
      description: 'Type in your ingredients and quantities yourself',
      icon: HiPencilAlt,
      color: 'green',
      action: () => router.push('/shopping-done/manual')
    }
  ];

  const handleMethodSelect = (method: typeof inputMethods[0]) => {
    setSelectedMethod(method.id);
    setTimeout(() => {
      method.action();
    }, 200);
  };

  const getColorStyles = (color: string, isSelected: boolean) => {
    if (color === 'green') {
      return {
        card: isSelected 
          ? 'bg-green-light shadow-lg' 
          : 'border-gray-200 bg-white hover:bg-gray-50',
        border: isSelected ? { borderColor: '#9cb481' } : {},
        icon: { color: '#9cb481' },
        text: isSelected ? { color: '#7a9365' } : { color: '#9cb481' }
      };
    } else {
      return {
        card: isSelected 
          ? 'bg-orange-secondary-light shadow-lg' 
          : 'border-gray-200 bg-white hover:bg-gray-50',
        border: isSelected ? { borderColor: '#f4a261' } : {},
        icon: { color: '#f4a261' },
        text: isSelected ? { color: '#e8956b' } : { color: '#f4a261' }
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-fresh text-gray-900 relative overflow-hidden">
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/meal" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-body"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Meal Planning</span>
          </Link>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="title-medium text-gray-900 text-4xl mb-6">
            What Did You Buy?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
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
              const styles = getColorStyles(method.color, isSelected);
              
              return (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method)}
                  className={`p-8 rounded-xl border-2 transition-all duration-300 text-center group ${styles.card}`}
                  style={styles.border}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <IconComponent 
                        className="w-16 h-16 transition-all duration-300"
                        style={styles.icon}
                      />
                      {isSelected && (
                        <div className="absolute -inset-2 border-2 rounded-full animate-pulse" style={{ borderColor: method.color === 'green' ? '#9cb481' : '#f4a261' }} />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className={`card-title transition-colors ${
                        isSelected ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
                      }`}>
                        {method.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors font-body ${
                        isSelected ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                        {method.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-sm font-medium transition-all duration-300 font-body" style={styles.text}>
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
          <p className="text-gray-600 text-sm max-w-2xl mx-auto font-body">
            💡 <strong>Pro tip:</strong> The more accurate your ingredient list, the better recipe suggestions we can provide. 
            Don't worry about exact quantities - we'll help you adjust as needed!
          </p>
        </div>
      </div>
    </div>
  );
} 