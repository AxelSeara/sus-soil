import React from 'react';
import { motion } from 'framer-motion';

// Variants para animaciones del contenedor
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
};

// Variants para las tarjetas con ajuste en el spring
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90, // un poco más de rigidez
      damping: 20,   // mayor amortiguamiento para suavizar
    },
  },
};

// Objetivos con títulos e íconos (emojis grandes) y texto de ejemplo
const objectives = [
  { title: 'Awareness for land managers', emoji: '🌍', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Supporting EU transformation', emoji: '🔄', text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada.' },
  { title: 'Ecosystem services delivery', emoji: '🌿', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.' },
  { title: 'Water security & climate', emoji: '💧', text: 'Curabitur sit amet magna quam. Praesent in libero vel turpis pellentesque.' },
];

export default function Detalles() {
  return (
    <>
      {/* Estilos en línea para animar el gradiente de los íconos */}
      <style>
        {`
          @keyframes gradientMotion {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .icon-gradient-bg {
            background: linear-gradient(90deg, #6EBB78, #89C37B, #B0D392, #6EBB78);
            background-size: 200% 200%;
            animation: gradientMotion 5s infinite ease-in-out;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      <div className="relative py-24 px-4 bg-green-200">
        <div className="max-w-screen-xl mx-auto">
          {/* Tarjeta principal */}
          <motion.div
            className="w-full mb-12 p-6 md:p-10 rounded-xl bg-white/70 backdrop-blur-lg shadow-xl text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-brown">
              The Project
            </h2>
            <p className="text-lg md:text-xl text-brown max-w-4xl mt-4">
              SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will develop a set of 15 Subsoil-Living Labs to inventory, analyse and benchmark different agroecology subsoil management and land uses and their impacts.
            </p>
          </motion.div>

          {/* Grid de tarjetas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {objectives.map((obj, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-white/50 backdrop-blur-md shadow-md p-6 text-center cursor-pointer hover:shadow-xl hover:bg-white/70 transition-all duration-300"
                variants={cardVariants}
              >
                {/* Ícono grande con gradiente animado */}
                <div className="text-6xl icon-gradient-bg">{obj.emoji}</div>
                <h3 className="text-brown font-bold text-lg mt-4">
                  {obj.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2">
                  {obj.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}