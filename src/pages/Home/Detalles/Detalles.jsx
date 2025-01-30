import React from 'react';
import { motion } from 'framer-motion';

// Variants para animaciones de contenedor y tarjetas
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

// Objetivos con títulos e íconos (emojis grandes)
const objectives = [
  { title: 'Awareness for land managers', emoji: '🌍' },
  { title: 'Supporting EU transformation', emoji: '🔄' },
  { title: 'Ecosystem services delivery', emoji: '🌿' },
  { title: 'Water security & climate', emoji: '💧' },
];

export default function Detalles() {
  return (
    <>
      {/* Estilos en línea para gradiente de fondo y animación de iconos */}
      <style>
        {`
          @keyframes gradientMotion {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .icon-gradient-bg {
            background: linear-gradient(90deg, #6eba77, #9dbf4c, #add946, #6eba77);
            background-size: 200% 200%;
            animation: gradientMotion 5s infinite ease-in-out;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      <div
        className="relative py-24 px-4"
        // Mismo degradado de fondo que en el Hero
        style={{
          background: 'linear-gradient(to bottom, #6eba77 0%, #ffffff 40%)',
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Tarjeta grande (texto principal) */}
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
              SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will develop a set of 15
              Subsoil-Living Labs to inventory, analyse and benchmark different agroecology subsoil
              management and land uses and their impacts.
            </p>
          </motion.div>

          {/* Grid con las tarjetas (bento-box style) */}
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
                className="rounded-xl bg-white/50 backdrop-blur-md shadow-md 
                           p-6 text-center cursor-pointer hover:shadow-xl 
                           hover:bg-white/70 transition-all duration-300"
                variants={cardVariants}
              >
                {/* Ícono grande con degradado animado */}
                <div className="text-6xl icon-gradient-bg">{obj.emoji}</div>

                {/* Solo título, sin descripción */}
                <h3 className="text-brown font-bold text-lg mt-4">
                  {obj.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}