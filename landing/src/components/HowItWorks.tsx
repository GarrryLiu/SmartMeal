import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';
import { IoReceiptOutline, IoSettingsOutline, IoSearchOutline, IoRestaurantOutline } from 'react-icons/io5';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const steps = [
    {
      number: '01',
      title: 'Snap Your Receipt',
      description: 'Take a photo of your grocery receipt or manually add items you bought.',
      icon: <IoReceiptOutline className="w-10 h-10 text-primary-green" />,
    },
    {
      number: '02',
      title: 'Set Your Preferences',
      description: 'Tell us about your dietary needs, cooking time, and flavor preferences.',
      icon: <IoSettingsOutline className="w-10 h-10 text-primary-green" />,
    },
    {
      number: '03',
      title: 'Get Smart Recipes',
      description: 'Receive AI-generated recipes that use your ingredients efficiently.',
      icon: <IoSearchOutline className="w-10 h-10 text-primary-green" />,
    },
    {
      number: '04',
      title: 'Cook & Enjoy',
      description: 'Follow step-by-step instructions and enjoy delicious, waste-free meals.',
      icon: <IoRestaurantOutline className="w-10 h-10 text-primary-green" />,
    },
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-white to-cream/30" id="how-it-works">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            How <span className="text-primary-green">SnapCook</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your groceries into delicious meals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-primary-green/30" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-green/10 to-primary-green/5 rounded-2xl mx-auto mb-4 flex items-center justify-center relative z-10 hover:shadow-lg transition-all duration-300"
                >
                  {step.icon}
                </motion.div>
                <div className="text-primary-green font-bold text-sm mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 soft-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <BsCheckCircleFill className="text-primary-green text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Zero Food Waste</h4>
                <p className="text-gray-600 text-sm">Use every ingredient efficiently</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BsCheckCircleFill className="text-primary-green text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Save Money</h4>
                <p className="text-gray-600 text-sm">Reduce grocery spending by 30%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BsCheckCircleFill className="text-primary-green text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Eat Healthier</h4>
                <p className="text-gray-600 text-sm">Personalized nutrition tracking</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
