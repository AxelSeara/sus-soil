import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const regions = [
  { id: 'Boreal', color: ['#284b55', '#EAF4F1'], info: 'Boreal', description: 'Description for Boreal' },
  { id: 'Atlantic', color: ['#2e8479', '#E2F1EE'], info: 'Atlantic', description: 'Description for Atlantic' },
  { id: 'Continental', color: ['#b7543d', '#F4E6E3'], info: 'Continental', description: 'Description for Continental' },
  { id: 'Alpine', color: ['#775786', '#F1EAF3'], info: 'Alpine', description: 'Description for Alpine' },
  { id: 'Pannonian', color: ['#86884c', '#F4F4E5'], info: 'Pannonian', description: 'Description for Pannonian' },
  { id: 'Mediterranean', color: ['#ee9c39', '#FDF3E5'], info: 'Mediterranean', description: 'Description for Mediterranean' },
  { id: 'BlackSea', color: ['#5c81b5', '#E6EDF5'], info: 'Black Sea', description: 'Description for Black Sea' },
  { id: 'Anatolian', color: ['#a02b16', '#F4E4E1'], info: 'Anatolian', description: 'Description for Anatolian' },
];

// Variants para el modal con animaciones sutiles
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const LivingLabs = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);

  const handleModalOpen = (region) => {
    setSelectedRegion(region);
    setLoadingImg(true); // cada vez que se abre el modal, reseteamos
  };

  const handleModalClose = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mt-16 mb-8 text-brown">
        Living Labs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {regions.map((region) => (
          <motion.div
            key={region.id}
            className="w-full h-64 flex items-center justify-center text-center text-white border border-gray-300 rounded-lg shadow-lg cursor-pointer overflow-hidden"
            whileHover={{
              backgroundSize: '100% 100%',
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%)`,
              backgroundSize: '100% 200%',
              backgroundPosition: 'top center',
            }}
            onClick={() => handleModalOpen(region)}
          >
            <h2 className="text-xl font-bold drop-shadow-lg">{region.id}</h2>
          </motion.div>
        ))}
      </div>

      {/* Modal con AnimatePresence para animar la salida */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Modal */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl relative w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto"
              variants={modalVariants}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                onClick={handleModalClose}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-brown">
                {selectedRegion.info}
              </h2>

              {/* Imagen con placeholder skeleton */}
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden relative">
                {loadingImg && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                {/* Simulamos tardar en cargar la imagen con un random src */}
                <img
                  src="https://via.placeholder.com/600" // Reemplaza con tu ruta
                  alt={selectedRegion.info}
                  className="w-full h-full object-cover"
                  onLoad={() => setLoadingImg(false)}
                />
              </div>

              <p className="text-gray-700 mb-6">
                {selectedRegion.description}
              </p>

              <button
                className="block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80 mx-auto"
                onClick={handleModalClose}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivingLabs;