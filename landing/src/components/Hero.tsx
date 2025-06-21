import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { BiLeaf } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Auto-flip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green/20 rounded-full mb-6"
            >
              <BiLeaf className="text-primary-green" />
              <span className="text-sm font-medium text-primary-green-dark">Reduce food waste by 40%</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Turn Your <span className="text-primary-green">Groceries</span><br />
              Into Smart Meals
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Snap your receipt, get personalized recipes. Save money, reduce waste, 
              and discover delicious meals tailored to your preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <motion.a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-green text-white rounded-full font-medium text-lg flex items-center space-x-2 hover-lift soft-shadow hover:bg-primary-green-dark transition"
              >
                <span>Try SnapCook Free</span>
                <BsArrowRight className="text-xl" />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-700 rounded-full font-medium text-lg border-2 border-gray-200 hover:border-primary-green transition"
              >
                Watch Demo
              </motion.button>
            </div>
            
            {/* Trust badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center space-x-8 text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <FiShoppingBag />
                <span className="text-sm">10,000+ meals planned</span>
              </div>
              <div className="flex items-center space-x-2">
                <BiLeaf />
                <span className="text-sm">500kg food saved</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - 3D Card Flip Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  width: '320px',
                  height: '420px'
                }}
                className="relative cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front - Grocery Receipt */}
                <div
                  style={{ 
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                  }}
                  className="bg-white rounded-2xl shadow-2xl p-6"
                >
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">🛒</div>
                    <h3 className="font-mono text-sm text-gray-500 uppercase tracking-wider">Grocery Receipt</h3>
                    <div className="h-px bg-gray-300 mt-2"></div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Chicken Breast</span>
                      <span>$8.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Honey</span>
                      <span>$4.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Garlic</span>
                      <span>$1.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Soy Sauce</span>
                      <span>$3.49</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Rice</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Broccoli</span>
                      <span>$3.49</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <div className="h-px bg-gray-300 mb-2"></div>
                    <div className="flex justify-between font-mono text-sm font-bold">
                      <span>TOTAL</span>
                      <span>$27.94</span>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="w-32 h-10 rounded"
                           style={{
                             background: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)`,
                             opacity: 0.8
                           }}
                      />
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2">Thank you for shopping!</p>
                  </div>
                </div>
                
                {/* Back - Recipe Cards */}
                <div
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                  }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl p-6"
                >
                  <div className="h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Your Smart Recipe</h3>
                      <p className="text-xs text-gray-600">AI-Generated from your groceries</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-5xl">🍗</span>
                      <span className="text-5xl">🍯</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 text-center mb-3">Honey Garlic Chicken</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>⏱️ Cook Time</span>
                        <span className="font-medium">30 min</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>🔥 Calories</span>
                        <span className="font-medium">320 cal</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>🍽️ Servings</span>
                        <span className="font-medium">4 servings</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>📊 Difficulty</span>
                        <span className="font-medium">Medium</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2 justify-center">
                      <span className="text-xs px-3 py-1 bg-white/60 rounded-full">Protein</span>
                      <span className="text-xs px-3 py-1 bg-white/60 rounded-full">AI Recommended</span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-sm text-gray-600">5.0</span>
                      </div>
                      <p className="text-center text-xs text-green-600 font-medium mt-2">
                        ✨ Perfect match with your ingredients!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Hint text */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center text-sm text-gray-500 mt-4"
              >
                {!isFlipped ? "Watch the magic happen..." : "Click to see your receipt"}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;