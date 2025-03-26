// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      // Fade-in al montar
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}

      // Parallax mediante background-attachment: fixed
      style={{
        backgroundImage: "url('/src/assets/bg2.svg')", // Ajusta la ruta
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="
        relative
        min-h-screen
        flex 
        flex-col
        items-center
        justify-center
        px-4
      "
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
          {/* Botón 1 */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/project/about"
            className="px-6 py-3 bg-brown text-white font-bold rounded-full 
                       hover:bg-opacity-80 transition-all duration-300"
          >
            Learn More
          </motion.a>
          {/* Botón 2 */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/contact"
            className="px-6 py-3 bg-transparent border border-brown text-brown 
                       font-bold rounded-full hover:bg-brown hover:text-white 
                       transition-all duration-300"
          >
            Contact Us
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}