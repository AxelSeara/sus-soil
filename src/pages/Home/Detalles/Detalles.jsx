// Detalles.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Animaciones de contenedor y tarjetas
const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
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

// Objetivos con títulos e íconos (ejemplo)
const objectives = [
  {
    title: 'Awareness for land managers',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12 2C6.486 2 2 6.487 2 12s4.487 10 10 10 10-4.487 10-10S17.514 2 12 2zM8.5 13C7.672 13 7 12.327 7 11.5S7.672 10 8.5 10s1.5.672 1.5 1.5S9.328 13 8.5 13zm7 0c-.828 0-1.5-.672-1.5-1.5S14.672 10 15.5 10s1.5.672 1.5 1.5S16.328 13 15.5 13zm-3.5 4c-2.33 0-4.395-1.46-5.185-3.5h10.37C15.395 15.54 13.33 17 11 17z" />
      </svg>
    ),
  },
  {
    title: 'Supporting EU transformation',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M11.293 17.293l-6-6 1.414-1.414L11 14.586 18.293 7.293l1.414 1.414-8 8z" />
      </svg>
    ),
  },
  {
    title: 'Ecosystem services delivery',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    title: 'Water security & climate',
    icon: (
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12 7.499C9.793 9.744 6 14.094 6 16.5 6 19.533 8.467 22 11.5 22s5.5-2.467 5.5-5.5c0-2.406-3.793-6.756-5.999-9.001z" />
      </svg>
    ),
  },
];

export default function Detalles() {
  return (
    <>
      {/* Estilos y keyframes en la misma página */}
      <style>
        {`
          @keyframes gradientMotion {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
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
        // Degradado inline (mismo verde que el Hero) -> #6eba77 a blanco
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brown">
              The Project
            </h2>
            <p className="text-base md:text-lg text-brown max-w-4xl">
              SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will develop a set of 15
              Subsoil-Living Labs to inventory, analyse and benchmark different agroecology subsoil
              management and land uses and their impacts.
            </p>
          </motion.div>

          {/* Grid con las tarjetas (solo título e ícono animado) */}
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
                           p-6 text-left cursor-pointer hover:shadow-xl 
                           hover:bg-white/70 transition-all duration-300"
                variants={cardVariants}
              >
                {/* Ícono con degradado animado en su trazo (text-fill) */}
                <div className="flex items-center mb-4">
                  {/* contenedor para cambiar el color con gradientMotion */}
                  <div className="icon-gradient-bg">{obj.icon}</div>
                </div>

                {/* Solo título, sin descripción */}
                <h3 className="text-brown font-bold text-lg mb-0">
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