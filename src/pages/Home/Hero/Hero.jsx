import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../../assets/bg1.svg';

const Hero = () => {
  // Variants para el contenedor principal (para animar los hijos en secuencia)
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants para cada elemento hijo
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `url(${backgroundImage}) repeat`,
        backgroundSize: '55.33%', // Ajusta el patron segun sea necesario
      }}
    >
      {/* Overlay sutil para resaltar el texto */}
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          Sustainable Soil and Subsoil Health Promotion
        </motion.h1>

        <motion.p
          className="mb-8 text-lg md:text-xl"
          variants={itemVariants}
        >
          By implementing agroecological land use and management
        </motion.p>

        <motion.button
          className="px-6 py-3 bg-brown hover:bg-opacity-80 rounded-full font-bold shadow-lg transition-colors"
          variants={itemVariants}
        >
          Learn More About The Project
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;