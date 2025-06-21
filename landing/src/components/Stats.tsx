import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { value: '40%', label: 'Less Food Waste', className: 'text-primary-green' },
    { value: '$150', label: 'Saved Monthly', className: 'text-accent-orange' },
    { value: '2hrs', label: 'Time Saved Weekly', className: 'text-primary-green-dark' },
    { value: '95%', label: 'User Satisfaction', className: 'text-primary-green' },
  ];

  return (
    <section ref={ref} className="py-20 bg-cream/50" id="stats">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.className}`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
