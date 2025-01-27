import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../../assets/bg1.svg'; // Asegúrate de que la ruta es correcta

const Hero = () => {
  // Definimos las variantes para la animación
  const textVariants = {
    initial: {
      scale: 0.9,
      filter: "blur(4px)",
      opacity: 0
    },
    animate: {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative h-screen flex flex-col md:flex-row items-center justify-center text-white overflow-hidden"
         style={{ 
           background: `url(${backgroundImage}) repeat`,
           backgroundSize: '55.33%'  // pattern size adjust
         }}>
      <motion.div className="z-10 p-5 text-center"
                  variants={textVariants}
                  initial="initial"
                  animate="animate">
        <h1 className="text-5xl font-bold mb-4">
          Sustainable Soil and Subsoil Health Promotion
        </h1>
        <p className="mb-4">
          by implementing agroecological land use and management
        </p>
        <button className="px-6 py-3 bg-brown hover:bg-opacity-80 rounded-full font-bold shadow-lg transition-colors">
          Learn More About The Project
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;