import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCamera, FiCpu, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { BiDish, BiTime } from 'react-icons/bi';

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <FiCamera className="w-6 h-6" />,
      title: 'Smart Receipt Scanning',
      description: 'Just snap a photo of your receipt and our AI instantly identifies all your ingredients.',
      bgColor: 'bg-primary-green',
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: 'AI-Powered Recipes',
      description: 'Get personalized recipes based on your dietary preferences, allergies, and cooking skills.',
      bgColor: 'bg-accent-orange',
    },
    {
      icon: <BiDish className="w-6 h-6" />,
      title: 'Meal Planning',
      description: 'Plan your entire week with smart suggestions that use all your ingredients efficiently.',
      bgColor: 'bg-primary-green',
    },
    {
      icon: <FiShoppingCart className="w-6 h-6" />,
      title: 'Smart Shopping Lists',
      description: 'Generate optimized shopping lists that minimize waste and maximize meal variety.',
      bgColor: 'bg-accent-orange',
    },
    {
      icon: <BiTime className="w-6 h-6" />,
      title: 'Time-Based Suggestions',
      description: 'Get quick 15-minute meals for busy weekdays or elaborate recipes for weekends.',
      bgColor: 'bg-primary-green',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Health Tracking',
      description: 'Monitor nutrition, track calories, and maintain your health goals effortlessly.',
      bgColor: 'bg-accent-orange',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-6" id="features">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="text-primary-green">Cook Smarter</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From receipt scanning to meal planning, SnapCook makes cooking effortless and sustainable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-2xl hover-lift soft-shadow"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
