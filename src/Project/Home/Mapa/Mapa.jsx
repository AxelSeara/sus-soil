// src/components/MapaAlternative.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mapImage from '../../../assets/map.png';

// Variants para animaciones de contenedores internos
const containerVariants = {
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

// Regiones de Living Labs
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

export default function MapaAlternative() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    setActiveRegion((prev) => (prev === regionId ? null : regionId));
  };

  // Buscar la región activa para mostrar el botón
  const regionData = activeRegion
    ? regions.find((r) => r.id === activeRegion)
    : null;

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Tarjeta principal animada */}
        <motion.div
          className="w-full mb-12 p-6 md:p-10 rounded-xl bg-white/70 backdrop-blur-lg shadow-xl text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-brown">
            Consortium & Living Labs
          </h2>
          <p className="text-lg md:text-xl text-brown font-serif max-w-4xl mt-4">
            Explore the different types of ecosystems and areas we work in, as well as
            the overall location of our Living Labs.
          </p>
        </motion.div>

        {/* Grid de tarjetas animado */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Mapa */}
          <motion.div
            className="relative w-80 h-80 rounded-full overflow-hidden shadow-sm mx-auto"
            variants={itemVariants}
          >
            <img
              src={mapImage}
              alt="Map"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Resumen + Botones de regiones */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 flex flex-col items-center justify-center"
            variants={itemVariants}
          >
            {/* Botones de regiones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={`block w-full text-center py-2 rounded-full shadow-md font-semibold text-xs md:text-sm whitespace-nowrap transition-transform duration-200 ${
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

            {/* Botón de exploración de la región activa */}
            {activeRegion && (
              <motion.div
                className="mt-8 flex justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Link
                  to={`/living-labs/${activeRegion.toLowerCase()}`}
                  className="px-6 py-3 font-bold rounded-full shadow-md text-white transition-transform duration-200 transform hover:-translate-y-1 flex items-center justify-center"
                  style={{ backgroundColor: regionData?.color }}
                >
                  Explore more about {regionData?.label}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
