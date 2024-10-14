import React, { useState } from 'react';
import { motion } from 'framer-motion';

const regions = [
  { id: "Boreal", color: ['#284b55', 'transparent'], info: "Boreal", description: "Description for Boreal" },
  { id: "Atlantic", color: ['#2e8479', 'transparent'], info: "Atlantic", description: "Description for Atlantic" },
  { id: "Continental", color: ['#b7543d', 'transparent'], info: "Continental", description: "Description for Continental" },
  { id: "Alpine", color: ['#775786', 'transparent'], info: "Alpine", description: "Description for Alpine" },
  { id: "Pannonian", color: ['#86884c', 'transparent'], info: "Pannonian", description: "Description for Pannonian" },
  { id: "Mediterranean", color: ['#ee9c39', 'transparent'], info: "Mediterranean", description: "Description for Mediterranean" },
  { id: "BlackSea", color: ['#5c81b5', 'transparent'], info: "Black Sea", description: "Description for Black Sea" },
  { id: "Anatolian", color: ['#a02b16', 'transparent'], info: "Anatolian", description: "Description for Anatolian" }
];

const LivingLabs = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleModalOpen = (region) => {
    setSelectedRegion(region);
  };

  const handleModalClose = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mt-16 mb-6">Living Labs</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {regions.map(region => (
          <motion.div key={region.id}
            className="w-full h-64 flex items-center justify-center text-center bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer overflow-hidden"
            whileHover={{ backgroundSize: '100% 100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%)`,
              backgroundSize: '100% 200%',
              backgroundPosition: 'top center'
            }}
            onClick={() => handleModalOpen(region)}
          >
            <h2 className="text-xl font-bold">{region.id}</h2>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 md:w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleModalClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedRegion.info}</h2>
            <img
              src="https://via.placeholder.com/300"
              alt={selectedRegion.info}
              className="w-full h-48 object-cover mb-4"
            />
            <p>{selectedRegion.description}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivingLabs;