import React, { useState } from 'react';
import { motion } from 'framer-motion';
import mapImage from '../../../assets/map.png'; // Adjust path if needed

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

  // Base animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      className="relative py-20 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-brown mb-4">
            Consortium & Living Labs
          </h2>
          <p className="text-boreal text-base md:text-lg max-w-3xl mx-auto">
            Explore the different types of ecosystems and areas we work in, as well as the overall
            location of our Living Labs.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Column: Map */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg">
              <img src={mapImage} alt="Map" className="w-full h-full object-cover" />
            </div>

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

          {/* Right Column: Info + Buttons */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-8">
            <div className="flex justify-around flex-wrap gap-8">
              {/* Summary info circles */}
              <div className="bg-lightGreen text-brown w-40 h-40 rounded-full shadow-md p-4 flex items-center justify-center">
                <p className="text-center font-bold text-sm leading-snug">
                  22 Partners<br />13 Countries
                </p>
              </div>
              <div className="bg-lightGreen text-brown w-40 h-40 rounded-full shadow-md p-4 flex items-center justify-center">
                <p className="text-center font-bold text-sm leading-snug">
                  15 Living Labs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    variants={itemVariants}
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
      </div>
    </motion.section>
  );
};

export default MapaAlternative;