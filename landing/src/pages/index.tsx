import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCamera, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
