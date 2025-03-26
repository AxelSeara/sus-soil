// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

const shapeColors = [
  'rgba(176,211,146,0.5)', // lightGreen a ~50% opacidad
  'rgba(110,187,120,0.4)', // otro tono verde suave
];

// Animación de cada shape (stagger suave)
const shapeVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // escalonamos la aparición
      duration: 0.8,
      ease: 'circOut',
    },
  }),
};

/** Genera semicírculo o círculo aleatoriamente */
function getBorderRadius(isSemi) {
  return isSemi ? '0 100% 100% 0' : '50%'; 
}

export default function Hero() {
  const shapeCount = 10; 
  const shapes = Array.from({ length: shapeCount }).map((_, i) => {
    const isSemi = Math.random() < 0.5; 
    const size = Math.random() * 150 + 80; // entre 80 y 230 px
    const color = shapeColors[i % shapeColors.length];
    const top = Math.random() * 80; 
    const left = Math.random() * 80;

    return (
      <motion.div
        key={i}
        custom={i}
        variants={shapeVariants}
        initial="hidden"
        animate="show"
        className="absolute"
        style={{
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          backgroundColor: color,
          borderRadius: getBorderRadius(isSemi),
        }}
      />
    );
  });

  return (
    // Añadimos mt-16 para dejar hueco bajo el navbar
    <div className="relative min-h-screen overflow-hidden bg-white mt-16">
      {/* contenedor de shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes}
      </div>

      {/* overlay semitransparente para suavizar */}
      <div className="absolute inset-0 bg-white bg-opacity-40 pointer-events-none z-10" />

      {/* Contenido principal */}
      <div className="relative z-20 flex items-center">
        {/* 2-column layout en desktop */}
        <div className="container mx-auto px-6 py-20 md:grid md:grid-cols-2 md:gap-8">
          {/* Columna Izquierda */}
          <div className="flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
              Sustainable Soil and Subsoil Health
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Join us in preserving and improving the soils for a greener future.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/project/about"
                className="px-6 py-3 bg-brown text-white font-bold rounded-full hover:bg-opacity-80 transition-all duration-300"
              >
                Learn More
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/contact"
                className="px-6 py-3 bg-transparent border border-brown text-brown font-bold rounded-full hover:bg-brown hover:text-white transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </div>
          </div>

          {/* Columna Derecha (espacio para ver shapes) */}
          <div className="hidden md:block" />
        </div>
      </div>
      {/* Flecha de scroll-down eliminada */}
    </div>
  );
}