import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Variants para animar el contenedor (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

// Variants para cada tarjeta
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const regions = [
  {
    id: 'Boreal',
    info: 'Northern latitudes with extensive forests',
    // Gradiente start y end (puedes cambiar los colores o usar un array [colorStart, colorEnd])
    color: ['#284b55', '#EAF4F1'],
    image: 'https://source.unsplash.com/r0aq9pYIadI/600x400', // Cambia a tu URL
  },
  {
    id: 'Atlantic',
    info: 'Coastal climates with mild temperatures',
    color: ['#2e8479', '#F1FBFA'],
    image: 'https://source.unsplash.com/hkjsfuyxK10/600x400',
  },
  {
    id: 'Continental',
    info: 'More extreme climates and deeper soils',
    color: ['#b7543d', '#FCECE9'],
    image: 'https://source.unsplash.com/TRhGEGdw-YY/600x400',
  },
  {
    id: 'Alpine',
    info: 'Mountainous areas with fragile ecosystems',
    color: ['#775786', '#F6F1FA'],
    image: 'https://source.unsplash.com/ZEVkLRWmnX4/600x400',
  },
  {
    id: 'Pannonian',
    info: 'Plains and fertile soils',
    color: ['#86884c', '#FCFCE9'],
    image: 'https://source.unsplash.com/2cddwbyhTsY/600x400',
  },
  {
    id: 'Mediterranean',
    info: 'Dry summers and calcareous soils',
    color: ['#ee9c39', '#FEF8EE'],
    image: 'https://source.unsplash.com/mDa8FAg782c/600x400',
  },
  {
    id: 'BlackSea',
    info: 'Coasts and fertile valleys',
    color: ['#5c81b5', '#EEF3FA'],
    image: 'https://source.unsplash.com/5UhayavS2d4/600x400',
  },
  {
    id: 'Anatolian',
    info: 'Varied climates in ancient soils',
    color: ['#a02b16', '#FAEEEB'],
    image: 'https://source.unsplash.com/LSKmkJGog64/600x400',
  },
];

export default function LivingLabs() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-brown font-serif">
        Living Labs
      </h1>

      <div className="max-w-3xl mx-auto mb-12 text-gray-700 leading-relaxed">
        <p className="mb-4">
          Welcome to our Living Labs section! Each region below represents a unique 
          ecosystem and set of challenges for soil management. Explore and discover 
          the local partnerships and projects focusing on sustainable subsoil practices.
        </p>
      </div>

      {/* Contenedor animado con framer-motion */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {regions.map((region) => (
          <motion.div 
            key={region.id} 
            variants={cardVariants}
          >
            <Link
              to={`/living-labs/${region.id}`}
              aria-label={`View details of ${region.id} region`}
              className="relative w-full h-56 sm:h-64 flex items-center justify-center 
                         text-center text-white border border-gray-300 
                         rounded-lg shadow-lg cursor-pointer overflow-hidden group
                         transition-transform transform hover:scale-105"
            >
              {/* Imagen de fondo + gradiente */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%), 
                    url(${region.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Overlay al hover (más oscura) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

              {/* Contenido textual */}
              <div className="relative z-10 flex flex-col items-center px-4">
                <h2 className="text-lg sm:text-xl font-bold drop-shadow-md font-serif">
                  {region.id}
                </h2>
                <p className="text-xs sm:text-sm mt-1 drop-shadow-md font-serif">
                  {region.info}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}