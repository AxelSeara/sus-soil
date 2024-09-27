import React from 'react';
import { motion } from 'framer-motion';  // Ensure Framer Motion is installed

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

  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 relative text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">The Project</h2>
        <p className="text-lg">
          SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will develop a set of 15
          Subsoil-Living Labs to inventory, analyse and benchmark different agroecology subsoil
          management and land uses and their impacts on the subsoil spatial variations and dynamics to best
          combine them in rural and urban areas within a global regional context.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {objectives.map((objective, index) => (
          <motion.div
            key={index}
            className="bg-green-500 rounded-full w-64 h-64 flex items-center justify-center p-6 mx-auto shadow-lg"
            variants={hoverVariants}
            whileHover="hover"
          >
            <div>
              <h3 className="text-white font-bold">{objective.title}</h3>
              <p className="text-white font-bold">{objective.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
    </div>
  );
};

export default Detalles;