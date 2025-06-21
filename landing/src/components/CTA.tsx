import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-primary-green relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Start Cooking Smarter Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands who are saving money, reducing waste, and eating better with SnapCook.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary-green-dark rounded-full font-medium text-lg flex items-center space-x-2 hover-lift hover:bg-gray-50 transition"
            >
              <span>Try SnapCook Free</span>
              <BsArrowRight className="text-xl" />
            </motion.a>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80"
            >
              No credit card required • Free forever
            </motion.div>
          </div>
          
          {/* Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/80 text-sm"
          >
            <span>✓ Unlimited recipes</span>
            <span>✓ Smart meal planning</span>
            <span>✓ Nutrition tracking</span>
            <span>✓ Shopping lists</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
