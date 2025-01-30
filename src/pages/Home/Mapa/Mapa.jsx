import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mapImage from '../../../assets/map.png'; // Ajusta la ruta si es necesario

// Variants para animaciones sutiles
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
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

const itemVariants = {
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

const MapaAlternative = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const regions = [
    { id: 'Boreal', label: 'Boreal', color: '#284b55' },
    { id: 'Atlantic', label: 'Atlantic', color: '#2e8479' },
    { id: 'Continental', label: 'Continental', color: '#b7543d' },
    { id: 'Alpine', label: 'Alpine', color: '#775786' },
    { id: 'Pannonian', label: 'Pannonian', color: '#86884c' },
    { id: 'Mediterranean', label: 'Mediterranean', color: '#ee9c39' },
    { id: 'BlackSea', label: 'Black Sea', color: '#5c81b5' },
    { id: 'Anatolian', label: 'Anatolian', color: '#a02b16' },
  ];

  const handleMouseEnter = (regionId) => setActiveRegion(regionId);
  const handleMouseLeave = () => setActiveRegion(null);

  return (
    <motion.section
      className="relative py-24 px-4 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
        {/* Tarjeta grande: Título + texto */}
        <motion.div
          className="rounded-xl bg-white/70 backdrop-blur-lg shadow-xl p-6 md:p-10 text-left"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            Consortium & Living Labs
          </h2>
          <p className="text-base md:text-lg text-boreal max-w-3xl">
            Explore the different types of ecosystems and areas we work in, 
            as well as the overall location of our Living Labs.
          </p>
        </motion.div>

        {/* Sub-grid bento style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tarjeta del mapa */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg">
              <img
                src={mapImage}
                alt="Map"
                className="w-full h-full object-cover"
              />
              {activeRegion && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    className="w-64 h-64 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: regions.find((r) => r.id === activeRegion)?.color,
                      opacity: 0.8,
                    }}
                  >
                    <p className="text-white text-2xl font-semibold">
                      {regions.find((r) => r.id === activeRegion)?.label}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Tarjeta de info: círculos + botones de regiones */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 flex flex-col gap-8"
            variants={itemVariants}
          >
            {/* Summary info circles */}
            <div className="flex justify-around flex-wrap gap-8">
              <div className="bg-lightGreen text-brown w-36 h-36 rounded-full shadow-md p-4 flex items-center justify-center">
                <p className="text-center font-bold text-sm leading-snug">
                  22 Partners<br />13 Countries
                </p>
              </div>
              <div className="bg-lightGreen text-brown w-36 h-36 rounded-full shadow-md p-4 flex items-center justify-center">
                <p className="text-center font-bold text-sm leading-snug">
                  15 Living Labs
                </p>
              </div>
            </div>

            {/* Botones de regiones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onMouseEnter={() => handleMouseEnter(region.id)}
                    onMouseLeave={handleMouseLeave}
                    className={`block w-full text-center py-2 rounded-full shadow-md font-semibold transition-transform duration-200 ${
                      isActive ? 'text-white scale-105' : 'text-brown'
                    }`}
                    style={{
                      backgroundColor: isActive ? region.color : '#f8f8f8',
                    }}
                  >
                    {region.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Botón "View More about Living Labs" */}
        <div className="text-center mt-12">
          <Link
            to="/living-labs"
            className="px-8 py-4 bg-brown text-white font-bold rounded-full shadow-md 
                      hover:bg-opacity-90 transition-transform duration-200 transform hover:-translate-y-1"
          >
            View More about Living Labs
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default MapaAlternative;