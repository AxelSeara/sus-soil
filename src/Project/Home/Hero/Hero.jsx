// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Colores originales
const darkGreen = "#6EBA77"; // Tono oscuro
const green = "#89C37B";     // Tono medio

// Hook para detectar si es móvil (ancho < 768px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// Función para generar una forma aleatoria (elige entre circle, left y right)
const randomShape = () => {
  const shapeTypes = ["circle", "left", "right"];
  const colors = [darkGreen, green];
  return {
    shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

// Variants para animar cada figura
const shapeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut', delay: i * 0.05 },
  }),
};

// Variant para el contenedor de figuras (stagger sutil)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// Variants para el bloque de texto principal
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 }
  },
};

export default function Hero() {
  const isMobile = useIsMobile();
  // Tamaño fijo para cada figura
  const shapeSize = isMobile ? 200 : 250;
  const totalShapes = isMobile ? 9 : 18;

  // Generamos un array de figuras aleatorias al montar.
  const [shapes] = useState(() =>
    Array.from({ length: totalShapes }, () => randomShape())
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lightGreen">
      {/* Fondo animado de figuras usando grid para evitar espacios vacíos */}
      <motion.div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${shapeSize}px, 1fr))`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            style={{ width: shapeSize, height: shapeSize }}
            className="relative"
            custom={i}
            variants={shapeVariants}
          >
            <div className="absolute inset-0 overflow-hidden">
              {renderShape(shape, shapeSize, i)}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contenido principal con animación */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl mx-auto px-4 text-left text-brown font-serif"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          Sustainable Soil and Subsoil Health Promotion
        </h1>
        <p className="mb-8 text-lg md:text-xl leading-relaxed">
          By implementing agroecological land use and management.
        </p>
        <Link
          to="/project/about"
          className="inline-block px-6 py-3 bg-brown text-white rounded-full font-semibold shadow-lg transition-colors text-base md:text-lg hover:bg-opacity-90"
        >
          Learn More About The Project
        </Link>
      </motion.div>
    </div>
  );
}

// Función para renderizar la forma según su tipo y color, usando el índice para alternar composiciones
function renderShape({ shapeType, color }, shapeSize, i) {
  if (shapeType === "circle") {
    return (
      <div
        style={{
          backgroundColor: color,
          width: shapeSize,
          height: shapeSize,
          borderRadius: '50%',
        }}
      />
    );
  } else if (shapeType === "left") {
    // Alterna entre composición vertical y horizontal para semicirculos a la izquierda.
    const isVertical = i % 2 === 0;
    return (
      <div
        style={{
          backgroundColor: color,
          width: shapeSize,
          height: shapeSize,
          borderRadius: '50%',
          clipPath: isVertical
            ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            : 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
        }}
      />
    );
  } else {
    // shapeType === "right"
    return (
      <div
        style={{
          backgroundColor: color,
          width: shapeSize,
          height: shapeSize,
          borderRadius: '50%',
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        }}
      />
    );
  }
}
