// src/components/Detalles.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importar iconos desde la carpeta assets/icons
import AwarenessIcon from '../../../assets/icons/Awareness.svg';
import EcosystemIcon from '../../../assets/icons/Ecosystem.svg';
import EUIcon from '../../../assets/icons/EU.svg';
import WaterIcon from '../../../assets/icons/Water.svg';

// Objetivos con títulos e íconos
const objectives = [
  {
    title: 'Awareness for land managers',
    icon: AwarenessIcon,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Supporting EU transformation',
    icon: EUIcon,
    text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada.'
  },
  {
    title: 'Ecosystem services delivery',
    icon: EcosystemIcon,
    text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.'
  },
  {
    title: 'Water security & climate',
    icon: WaterIcon,
    text: 'Curabitur sit amet magna quam. Praesent in libero vel turpis pellentesque.'
  },
];

// Variants para animar el contenedor principal de la tarjeta principal
const mainCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Variants para el contenedor del grid (stagger)
const gridContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      ease: 'easeInOut',
      duration: 0.6,
    },
  },
};

// Variants para cada tarjeta individual
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
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

export default function Detalles() {
  return (
    <div className="relative py-16 px-4 bg-lightGreen">
      <div className="max-w-screen-xl mx-auto">
        {/* Tarjeta principal animada */}
        <motion.div
          className="w-full mb-12 p-6 md:p-10 rounded-xl bg-white/70 backdrop-blur-lg shadow-xl text-left"
          variants={mainCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-brown">
            The Project
          </h2>
          <p className="text-lg md:text-xl text-brown font-serif mt-4">
            SUS-SOIL is a 4-year project adopting a multidisciplinary approach that will 
            develop a set of 15 Subsoil-Living Labs to inventory, analyse and benchmark 
            different agroecology subsoil management and land uses and their impacts.
          </p>
        </motion.div>

        {/* Grid de tarjetas animado */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-white shadow-md p-6 text-center cursor-pointer 
                         hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -3 }} // pequeña elevación en hover
            >
              {/* Icono grande (responsive) con animación leve */}
              <motion.img
                src={obj.icon}
                alt={obj.title}
                className="w-20 h-20 md:w-32 md:h-32 mx-auto transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="text-brown font-medium font-serif text-lg mt-4">
                {obj.title}
              </h3>
              <p className="text-sm text-brown font-serif mt-2">
                {obj.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}