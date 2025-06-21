'use client';

import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { MdInventory, MdRestaurant, MdAccessTime, MdBolt, MdEco } from 'react-icons/md';

export default function ShoppingDone() {
  return (
    <main className="page-container">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="back-link">
          <HiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="section-title">
          What's in Your Kitchen?
        </h1>
        
        <div className="card">
          <p className="text-gray-300 text-lg mb-8">
            This page will help you make the most of your groceries.
            Coming soon with features like:
          </p>
          
          <ul className="feature-list">
            <li className="feature-item">
              <MdInventory className="w-5 h-5 text-blue-400" />
              <span>Ingredient inventory management</span>
            </li>
            <li className="feature-item">
              <MdRestaurant className="w-5 h-5 text-blue-400" />
              <span>Smart recipe recommendations</span>
            </li>
            <li className="feature-item">
              <MdAccessTime className="w-5 h-5 text-blue-400" />
              <span>Expiration date tracking</span>
            </li>
            <li className="feature-item">
              <MdBolt className="w-5 h-5 text-blue-400" />
              <span>Quick meal suggestions</span>
            </li>
            <li className="feature-item">
              <MdEco className="w-5 h-5 text-blue-400" />
              <span>Waste reduction tips</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
} 