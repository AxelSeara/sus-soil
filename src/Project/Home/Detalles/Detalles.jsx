import React from 'react';
import { motion } from 'framer-motion';

import AwarenessIcon from '../../../assets/icons/Awareness.svg';
import EcosystemIcon from '../../../assets/icons/Ecosystem.svg';
import EUIcon from '../../../assets/icons/EU.svg';
import WaterIcon from '../../../assets/icons/Water.svg';

const objectives = [
  { title: 'Awareness for land managers', icon: AwarenessIcon },
  { title: 'Supporting EU transformation', icon: EUIcon },
  { title: 'Ecosystem services delivery', icon: EcosystemIcon },
  { title: 'Water security & climate', icon: WaterIcon },
];

// Animación para tiles (2 desde izquierda, 2 desde derecha)
const getTileVariant = (groupIndex) => {
  const direction = groupIndex < 2 ? -100 : 100;
  return {
    hidden: { opacity: 0, x: direction },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smoothness
      },
    },
  };
};

// Animación principal para "The Project"
const mainCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Detalles() {
  return (
    <div className="relative py-16 px-4 bg-lightGreen">
      <div className="max-w-screen-xl mx-auto">
        {/* Título principal centrado */}
        <motion.div
          className="w-full mb-12 p-6 md:p-10 rounded-xl bg-white/70 backdrop-blur-lg text-center"
          variants={mainCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brown font-medium">
            The Project
          </h2>
        </motion.div>

        {/* Grid de tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((obj, index) => {
            const variant = getTileVariant(index);
            return (
              <motion.div
                key={index}
                className="aspect-square bg-white rounded-xl p-6 flex flex-col justify-center items-center text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={variant}
              >
                <img
                  src={obj.icon}
                  alt={obj.title}
                  className="w-20 h-20 md:w-24 md:h-24 mb-4"
                />
                <h3 className="text-brown font-medium font-serif text-lg">
                  {obj.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}