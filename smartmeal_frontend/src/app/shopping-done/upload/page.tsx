'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiUpload, HiPhotograph } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { Spotlight } from '@/components/Spotlight';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // For now, redirect to manual input
      // In a real implementation, this would process the image and extract ingredients
      alert('Upload feature coming soon! Redirecting to manual input for now.');
      router.push('/shopping-done/manual');
    }, 2000);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
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
            Upload Your Receipt
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload an image of your receipt from your device and we'll automatically extract the ingredients for you.
          </p>
        </div>

        {/* Upload Interface */}
        <div className="max-w-2xl mx-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-zinc-600 hover:border-zinc-500 rounded-xl p-12 text-center transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <HiPhotograph className="w-16 h-16 text-green-400 mx-auto" />
                <div>
                  <p className="text-white font-semibold">{selectedFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <p className="text-green-400 text-sm">✓ Ready to process</p>
              </div>
            ) : (
              <div className="space-y-4">
                <HiUpload className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-white font-semibold mb-2">
                    Drop your receipt image here
                  </p>
                  <p className="text-gray-400 text-sm">
                    or click to browse your files
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Supports JPG, PNG, WebP • Max 10MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleUpload}
                disabled={isProcessing}
                className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  isProcessing
                    ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                <HiUpload className="w-5 h-5" />
                <span>{isProcessing ? 'Processing...' : 'Process Receipt'}</span>
              </button>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-300">Extracting ingredients from your receipt...</p>
            </div>
          )}

          {/* Tips */}
          <div className="mt-12 card">
            <h3 className="text-xl font-semibold text-white mb-4">📄 Upload Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Use clear, high-resolution images for best results</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Ensure all text on the receipt is readable</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Avoid glare or shadows on the receipt</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Make sure the entire receipt is visible in the image</span>
              </li>
            </ul>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-400 rounded-lg">
            <p className="text-yellow-200 text-center">
              <strong>🚧 Feature in Development:</strong> Receipt image processing is coming soon! 
              For now, you'll be redirected to manual input after uploading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 