import React from 'react';
import { motion } from 'framer-motion';

const Detalles = () => {
  const objectives = [
    {
      title: "Increasing the awareness of land managers and public authorities",
      description: "To understand the subsoil threats and risks."
    },
    {
      title: "Supporting EU agroecological transformation",
      description: "Tackling subsoils."
    },
    {
      title: "Increasing ecosystem services delivery",
      description: ""
    },
    {
      title: "Promoting water security and climate change mitigation",
      description: "Of rural and urban ecosystems."
    }
  ];

  // Variants para el contenedor principal (animación en secuencia)
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  // Variants para cada círculo
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <div className="relative py-24 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brown">
            The Project
          </h2>
          <p className="text-base md:text-lg text-boreal max-w-4xl mx-auto">
            SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will develop a set of 15
            Subsoil-Living Labs to inventory, analyse and benchmark different agroecology subsoil
            management and land uses and their impacts on the subsoil spatial variations and dynamics to best
            combine them in rural and urban areas within a global regional context.
          </p>
        </div>

        {/* Contenedor de los objetivos animados */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              className="w-56 h-56 bg-lightGreen rounded-full flex items-center justify-center p-6 mx-auto shadow-md relative"
              variants={circleVariants}
            >
              <div className="text-center px-2">
                <h3 className="text-brown font-bold text-base mb-2 leading-tight">
                  {objective.title}
                </h3>
                <p className="text-boreal text-sm leading-snug">
                  {objective.description || " "}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Efecto de fondo decorativo */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-lightGreen rounded-full mix-blend-multiply filter blur-2xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-lightGreen rounded-full mix-blend-multiply filter blur-2xl opacity-40 pointer-events-none" />
    </div>
  );
};

export default Detalles;
