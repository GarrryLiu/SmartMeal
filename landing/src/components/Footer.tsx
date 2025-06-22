import React from 'react';
import { BiLeaf } from 'react-icons/bi';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-display text-2xl font-semibold">SnapCook</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-sm">
              Transform your groceries into delicious meals with AI. Save money, reduce waste, eat better.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How it Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">API</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 SnapCook. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
