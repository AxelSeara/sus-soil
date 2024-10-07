import React from 'react';
import { motion } from 'framer-motion';

const gradientVariants = {
  initial: { background: 'linear-gradient(120deg, #4caf50, #388e3c)' },
  animate: {
    background: ['linear-gradient(120deg, #4caf50, #388e3c)', 'linear-gradient(120deg, #388e3c, #4caf50)'],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

const contentVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const Hero = () => {
  return (
    <div className="relative h-screen flex flex-col md:flex-row items-center justify-center text-white overflow-hidden">
      <motion.div
        className="absolute w-full h-full"
        variants={gradientVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div className="z-10 flex-1 flex justify-center items-center p-5 mt-16"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <img src="https://via.placeholder.com/450" alt="Eco Image" className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg" />
      </motion.div>
      <motion.div className="z-10 flex-1 p-5 text-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
          Sustainable Soil and Subsoil Health Promotion
        </h1>
        <p className="mb-4">
          by implementing agroecological land use and management
        </p>
        <button className="px-6 py-3 bg-green-700 hover:bg-green-800 rounded-full font-bold shadow-lg transition-colors">
          Learn More About The Project
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;