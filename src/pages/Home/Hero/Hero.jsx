// Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tonos de verde
const darkGreen = "#6EBA77"; // Tailwind: darkGreen
const green = "#89C37B";     // Tailwind: green

// Hook para detectar si es móvil (ancho < 768px)
const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width < 768;
};

// Función para generar una forma aleatoria
function randomShape() {
  const shapes = ["circle", "left", "right"];
  const colors = ["darkGreen", "green"];
  return {
    shapeType: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

// Mapa de colores
const colorMap = {
  darkGreen,
  green,
};

// Variants para animar cada figura
const shapeVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

// Variants para el contenedor (stagger)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  const isMobile = useIsMobile();

  // Definimos las columnas y la cantidad de figuras según el dispositivo
  const columns = isMobile ? 3 : 6;
  // 3 filas en móvil => 3 x 3 = 9 figuras
  // 3 filas en escritorio => 3 x 6 = 18 figuras
  const totalShapes = isMobile ? 9 : 18;

  // Generamos el array de figuras aleatorias
  const [shapes] = useState(() =>
    Array.from({ length: totalShapes }, () => randomShape())
  );

  // Calculamos la clase de ancho según columnas
  const widthClass = `w-1/${columns}`;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lightGreen">
      {/* Contenedor flex que aloja las figuras */}
      <motion.div
        className="absolute inset-0 flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`relative ${widthClass}`}
            variants={shapeVariants}
          >
            {/* Fuerza la altura a ser igual al ancho (cuadrado) */}
            <div className="pb-[100%]" />
            {/* Contenedor para la forma */}
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
        <button className="px-6 py-3 bg-brown text-white rounded-full font-semibold shadow-lg transition-colors text-base md:text-lg hover:bg-opacity-90">
          Learn More About The Project
        </button>
      </div>
    </div>
  );
}

// Renderiza la forma correspondiente
function renderShape({ shapeType, color }) {
  const bgColor = colorMap[color];

  if (shapeType === "circle") {
    // Círculo perfecto que rellena el cuadrado
    return (
      <div
        className="absolute w-full h-full rounded-full"
        style={{ backgroundColor: bgColor }}
      />
    );
  } else if (shapeType === "left") {
    // Semicírculo anclado a la izquierda
    return (
      <div
        className="absolute w-[200%] h-full rounded-full"
        style={{
          backgroundColor: bgColor,
          clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
        }}
      />
    );
  } else {
    // shapeType === "right"
    // Semicírculo anclado a la derecha
    return (
      <div
        className="absolute w-[200%] h-full rounded-full"
        style={{
          backgroundColor: bgColor,
          left: "-100%",
          clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        }}
      />
    );
  }
}