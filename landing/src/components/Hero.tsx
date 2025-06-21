import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { BiLeaf } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
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
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Turn Your <span className="text-primary-green">Groceries</span><br />
            Into Smart Meals
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Snap your receipt, get personalized recipes. Save money, reduce waste, 
            and discover delicious meals tailored to your preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            className="mt-12 flex items-center justify-center space-x-8 text-gray-500"
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
        
        {/* Hero Image/Animation - Redesigned */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Your Groceries - Simplified */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-gray-50 p-6 rounded-2xl relative"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Groceries</h3>
                
                {/* Clean Grid of Ingredients */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🥕</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🥦</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🍗</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🧄</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🧅</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-2xl">🍅</span>
                  </motion.div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4 text-center">Available ingredients</p>
              </motion.div>
              
              {/* AI Processing - Simplified */}
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="relative"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 bg-gradient-to-br from-primary-green to-primary-green-dark rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    AI
                  </motion.div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-20 h-20 bg-primary-green rounded-full"
                  />
                </motion.div>
                
                {/* Arrow indicators */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute left-[-60px] text-gray-300"
                >
                  <BsArrowRight size={24} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className="absolute right-[-60px] text-gray-300"
                >
                  <BsArrowRight size={24} />
                </motion.div>
              </div>
              
              {/* Recipe Card - Clean Design */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-primary-green/10 to-primary-green/5 p-6 rounded-2xl relative"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Smart Recipe</h3>
                
                {/* Recipe Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, type: "spring" }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-5xl">🍽️</span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.0 }}
                      className="bg-primary-green/20 px-3 py-1 rounded-full"
                    >
                      <span className="text-xs font-medium text-primary-green-dark">AI Match</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">Honey Garlic Chicken</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">⏱️</span>
                        <span>25 mins</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🔥</span>
                        <span>320 calories</span>
                      </div>
                      <div className="flex items-center text-sm text-primary-green font-medium">
                        <span className="mr-2">✨</span>
                        <span>Perfect match!</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Progress indicator - Simplified */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-8 flex justify-center items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ backgroundColor: ["#e5e7eb", "#9cb481"] }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="w-8 h-1 rounded-full bg-gray-300"
                />
                <motion.div
                  animate={{ backgroundColor: ["#e5e7eb", "#9cb481"] }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="w-8 h-1 rounded-full bg-gray-300"
                />
                <motion.div
                  animate={{ backgroundColor: ["#e5e7eb", "#9cb481"] }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  className="w-8 h-1 rounded-full bg-gray-300"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;