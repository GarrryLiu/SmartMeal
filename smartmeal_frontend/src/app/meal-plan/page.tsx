'use client';

import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { MdCheckCircle, MdCalendarToday, MdBarChart, MdMenuBook, MdShoppingCart } from 'react-icons/md';

export default function MealPlan() {
  return (
    <main className="page-container">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="back-link">
          <HiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="section-title">
          Create Your Meal Plan
        </h1>
        
        <div className="card">
          <p className="text-gray-300 text-lg mb-8">
            This is where you'll be able to create your personalized meal plan.
            Coming soon with features like:
          </p>
          
          <ul className="feature-list">
            <li className="feature-item">
              <MdCheckCircle className="w-5 h-5 text-blue-400" />
              <span>Dietary preferences selection</span>
            </li>
            <li className="feature-item">
              <MdCalendarToday className="w-5 h-5 text-blue-400" />
              <span>Weekly meal calendar</span>
            </li>
            <li className="feature-item">
              <MdBarChart className="w-5 h-5 text-blue-400" />
              <span>Nutritional goals setting</span>
            </li>
            <li className="feature-item">
              <MdMenuBook className="w-5 h-5 text-blue-400" />
              <span>Recipe suggestions</span>
            </li>
            <li className="feature-item">
              <MdShoppingCart className="w-5 h-5 text-blue-400" />
              <span>Shopping list generation</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
} 