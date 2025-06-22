'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiUpload, HiPhotograph } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select an image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleProcessReceipt = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For now, add some mock ingredients extracted from receipt
    const mockIngredients = [
      { id: '1', name: 'Chicken breast', quantity: '2 lbs' },
      { id: '2', name: 'Broccoli', quantity: '1 bunch' },
      { id: '3', name: 'Rice', quantity: '2 cups' },
      { id: '4', name: 'Olive oil', quantity: '1 bottle' }
    ];
    
    localStorage.setItem('userIngredients', JSON.stringify(mockIngredients));
    
    // Navigate to preferences to confirm preferences before recipes
    router.push('/shopping-done/preferences');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getDropZoneStyles = () => {
    if (isDragOver) {
      return {
        borderColor: '#9cb481',
        backgroundColor: '#f0f4ed'
      };
    } else if (selectedFile) {
      return {
        borderColor: '#9cb481',
        backgroundColor: '#f0f4ed'
      };
    } else {
      return {};
    }
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
            Upload Your Receipt
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            Upload an image of your receipt from your device and we'll automatically extract the ingredients for you.
          </p>
        </div>

        {/* Upload Interface */}
        <div className="max-w-2xl mx-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
              isDragOver || selectedFile
                ? 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
            }`}
            style={getDropZoneStyles()}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <HiPhotograph className="w-16 h-16 mx-auto" style={{ color: '#9cb481' }} />
                <div>
                  <p className="text-gray-900 font-semibold font-body">{selectedFile.name}</p>
                  <p className="text-gray-600 text-sm font-body">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <p className="text-sm font-body" style={{ color: '#7a9365' }}>✓ Ready to process</p>
              </div>
            ) : (
              <div className="space-y-4">
                <HiUpload className="w-16 h-16 text-gray-500 mx-auto" />
                <div>
                  <p className="text-gray-900 font-semibold mb-2 font-body">
                    Drop your receipt image here
                  </p>
                  <p className="text-gray-600 text-sm font-body">
                    or click to browse your files
                  </p>
                </div>
                <p className="text-xs text-gray-500 font-body">
                  Supports JPG, PNG, WebP • Max 10MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleProcessReceipt}
                disabled={isProcessing}
                className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 font-body ${
                  isProcessing
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#9cb481' }}></div>
              <p className="text-gray-600 font-body">Extracting ingredients from your receipt...</p>
            </div>
          )}

          {/* Tips */}
          <div className="mt-12 card">
            <h3 className="card-title text-gray-900 mb-4">📄 Upload Tips</h3>
            <ul className="space-y-2 text-gray-700 font-body">
              <li className="flex items-start space-x-2">
                <span className="mt-1" style={{ color: '#9cb481' }}>•</span>
                <span>Use clear, high-resolution images for best results</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1" style={{ color: '#9cb481' }}>•</span>
                <span>Ensure all text on the receipt is readable</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1" style={{ color: '#9cb481' }}>•</span>
                <span>Avoid glare or shadows on the receipt</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1" style={{ color: '#9cb481' }}>•</span>
                <span>Make sure the entire receipt is visible in the image</span>
              </li>
            </ul>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 p-4 rounded-lg bg-orange-secondary-light" style={{ border: '1px solid #f4a261' }}>
            <p className="text-center font-body" style={{ color: '#e8956b' }}>
              <strong>🚧 Feature in Development:</strong> Receipt image processing is coming soon! 
              For now, you'll get sample ingredients and can proceed to set your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 