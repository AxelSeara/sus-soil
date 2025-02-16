import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mapImage from '../../../assets/map.png';

// Variants para animaciones
const sectionVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

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

const MapaAlternative = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    setActiveRegion((prev) => (prev === regionId ? null : regionId));
  };

  return (
    <motion.section
      className="relative py-24 px-4 bg-gradient-to-b from-lightGreen to-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Tarjeta principal */}
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
          <p className="text-lg md:text-xl text-brown font-sans max-w-4xl mt-4">
            Explore the different types of ecosystems and areas we work in, as well as the overall location of our Living Labs.
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Mapa */}
          <motion.div className="relative w-80 h-80 rounded-full overflow-hidden shadow-sm mx-auto" variants={itemVariants}>
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
          </motion.div>

          {/* Resumen con CountUp */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <motion.div className="text-4xl font-bold text-brown">
                22
              </motion.div>
              <p className="text-sm text-brown mt-1">Partners</p>
              <motion.div className="text-4xl font-bold text-brown mt-4">
                13
              </motion.div>
              <p className="text-sm text-brown mt-1">Countries</p>
              <motion.div className="text-4xl font-bold text-brown mt-4">
                15
              </motion.div>
              <p className="text-sm text-brown mt-1">Living Labs</p>
            </motion.div>

            {/* Botones de regiones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
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
        </motion.div>

        {/* Botón "View More about Living Labs" */}
        <div className="text-center mt-12">
          <Link
            to="/living-labs"
            className="px-8 py-4 bg-brown text-white font-bold rounded-full shadow-md hover:bg-opacity-90 transition-transform duration-200 transform hover:-translate-y-1"
          >
            View More about Living Labs
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default MapaAlternative;