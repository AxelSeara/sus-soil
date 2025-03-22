// src/components/Mapa.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mapImage from '../../../assets/map.png';

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

export default function Mapa() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    setActiveRegion((prev) => (prev === regionId ? null : regionId));
  };

  const regionData = activeRegion
    ? regions.find((r) => r.id === activeRegion)
    : null;

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Texto y botones */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 md:p-10"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-medium font-serif text-brown mb-4">
              Consortium & Living Labs
            </h2>
            <p className="text-lg md:text-xl text-brown font-serif mb-8">
              Explore the different types of ecosystems and areas we work in, as well as
              the overall location of our Living Labs.
            </p>

            {/* Botones de región animados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={`w-full text-center py-2 rounded-full shadow-md font-semibold text-xs md:text-sm transition-all ${
                      isActive ? 'text-white scale-105' : 'text-brown'
                    }`}
                    style={{
                      backgroundColor: isActive ? region.color : '#f8f8f8',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {region.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Botón de acceso */}
            {activeRegion && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Link
                  to={`/living-labs/${activeRegion.toLowerCase()}`}
                  className="px-6 py-3 font-bold rounded-full shadow-md text-white hover:-translate-y-1 transition-transform"
                  style={{ backgroundColor: regionData?.color }}
                >
                  Explore more about {regionData?.label}
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Imagen del mapa */}
          <motion.div
            className="w-full max-w-lg mx-auto lg:mx-0"
            variants={itemVariants}
          >
            <div className="w-full rounded-xl overflow-hidden ">
              <img
                src={mapImage}
                alt="Map"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}