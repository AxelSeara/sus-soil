// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Colores originales
const darkGreen = "#6EBA77"; // Figura: tono oscuro
const green = "#89C37B";     // Figura: tono medio

// Hook para detectar si es móvil (ancho < 768px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// Función para generar una forma aleatoria (elige entre darkGreen y green)
const randomShape = () => {
  const shapeTypes = ["circle", "left", "right"];
  // Selecciona aleatoriamente entre darkGreen y green
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

// Variant para el contenedor (stagger sutil)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function Hero() {
  const isMobile = useIsMobile();
  const columns = isMobile ? 3 : 6;
  const totalShapes = isMobile ? 9 : 18;

  // Array de figuras aleatorias
  const [shapes] = useState(() =>
    Array.from({ length: totalShapes }, () => randomShape())
  );

  // Ancho de cada figura en porcentaje
  const shapeWidth = `${100 / columns}%`;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lightGreen">
      {/* Fondo animado de figuras */}
      <motion.div
        className="absolute inset-0 flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            style={{ width: shapeWidth }}
            className="relative"
            custom={i}
            variants={shapeVariants}
          >
            <div className="pb-[100%]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {renderShape(shape)}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-left text-brown font-serif">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          Sustainable Soil and Subsoil Health Promotion
        </h1>
        <p className="mb-8 text-lg md:text-xl leading-relaxed">
          By implementing agroecological land use and management.
        </p>
        <Link
          to="/about"
          className="inline-block px-6 py-3 bg-brown text-white rounded-full font-semibold shadow-lg transition-colors text-base md:text-lg hover:bg-opacity-90"
        >
          Learn More About The Project
        </Link>
      </div>
    </div>
  );
}

// Renderiza la forma según su tipo y color
function renderShape({ shapeType, color }) {
  if (shapeType === "circle") {
    return (
      <div
        className="absolute w-full h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  } else if (shapeType === "left") {
    return (
      <div
        className="absolute w-[200%] h-full rounded-full"
        style={{
          backgroundColor: color,
          clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
        }}
      />
    );
  } else {
    // shapeType === "right"
    return (
      <div
        className="absolute w-[200%] h-full rounded-full"
        style={{
          backgroundColor: color,
          left: "-100%",
          clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        }}
      />
    );
  }
}