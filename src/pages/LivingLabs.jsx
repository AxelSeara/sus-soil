import React from 'react';
import { motion } from 'framer-motion';

const regions = [
  { id: "Boreal", color: ['#284b55', 'transparent'], info: "Boreal" },
  { id: "Atlantic", color: ['#2e8479', 'transparent'], info: "Atlantic" },
  { id: "Continental", color: ['#b7543d', 'transparent'], info: "Continental" },
  { id: "Alpine", color: ['#775786', 'transparent'], info: "Alpine" },
  { id: "Pannonian", color: ['#86884c', 'transparent'], info: "Pannonian" },
  { id: "Mediterranean", color: ['#ee9c39', 'transparent'], info: "Mediterranean" },
  { id: "BlackSea", color: ['#5c81b5', 'transparent'], info: "Black Sea" },
  { id: "Anatolian", color: ['#a02b16', 'transparent'], info: "Anatolian" }
];

const LivingLabs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Living Labs</h1>
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
          >
            <h2 className="text-xl font-bold">{region.id}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LivingLabs;