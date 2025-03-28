// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bgImage from '../../../assets/bg2.svg';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para determinar si la pantalla es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Contenido centrado */}
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
          Sustainable Soil and Subsoil Health
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Join us in preserving and improving the soils for a greener future.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/project/about"
            className="px-6 py-3 bg-brown text-white font-bold rounded-full hover:bg-opacity-80 transition-all duration-300"
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}