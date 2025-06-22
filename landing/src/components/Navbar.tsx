import React from 'react';
import { motion } from 'framer-motion';
import { getAppUrl } from '@/config/urls';

const Navbar = () => {
  const appUrl = getAppUrl();
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-display text-2xl font-semibold">SnapCook</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How it Works</a>
            <a href="#stats" className="text-gray-600 hover:text-gray-900 transition">Impact</a>
            <a 
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary-green text-white rounded-full hover:bg-primary-green-dark transition hover-lift font-medium"
            >
              Try SnapCook Free
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
