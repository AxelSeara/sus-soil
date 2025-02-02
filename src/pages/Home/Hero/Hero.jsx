// Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Paleta de colores verdes
const GREEN_COLORS = [
  '#6eba77',
  '#87c27b',
  '#9dbf4c',
  '#add946',
  '#a6d776',
  '#6EBA77',
];

// Variants para animar cada forma
const shapeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1.2, // Las formas crecen un poco más
    opacity: 0.8,
    transition: {
      duration: 2.5, // Duración extendida para una animación más suave
      ease: 'easeInOut',
    },
  },
};

// Variants para el texto y el botón
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Función para generar una forma aleatoria
function createRandomShape() {
  // Tamaño aleatorio entre 100 y 300 px
  const size = Math.floor(Math.random() * 200) + 100;
  // Posición aleatoria (%) en toda la superficie
  const top = Math.floor(Math.random() * 100);
  const left = Math.floor(Math.random() * 100);
  // Color aleatorio de la paleta
  const color = GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)];

  // Elegimos si es círculo o semicírculo
  const shapeType = Math.random() < 0.5 ? 'circle' : 'semicircle';

  return {
    id: Date.now() + '_' + Math.random(), // identificador único
    size,
    top,
    left,
    color,
    shapeType,
  };
}

export default function Hero() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Agrega la primera tanda de formas
    const initialShapes = Array.from({ length: 3 }).map(() => createRandomShape());
    setShapes(initialShapes);

    // Cada 4 segundos, agrega una forma nueva
    const interval = setInterval(() => {
      setShapes((prev) => [...prev, createRandomShape()]);
    }, 4000);

    // Limpia el intervalo al desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-200">
      {/* Renderizamos cada forma */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          variants={shapeVariants}
          initial="initial"
          animate="animate"
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top + '%',
            left: shape.left + '%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: shape.color,
            opacity: 0.8,
            borderRadius: shape.shapeType === 'circle' ? '9999px' : '9999px 9999px 0 0',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-left text-brown">
        {/* Título animado */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Sustainable Soil and Subsoil Health Promotion
        </motion.h1>

        {/* Párrafo animado */}
        <motion.p
          className="mb-8 text-xl md:text-2xl leading-relaxed"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          By implementing agroecological land use and management
        </motion.p>

        {/* Botón animado */}
        <motion.button
          className="px-8 py-4 bg-brown text-white rounded-full font-semibold shadow-lg transition-colors text-lg md:text-xl hover:bg-opacity-90"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Learn More About The Project
        </motion.button>
      </div>
    </div>
  );
}