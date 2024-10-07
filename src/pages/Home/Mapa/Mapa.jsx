import React, { useState } from 'react';

const Mapa = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const regions = [
    { id: "Boreal", label: "Boreal" },
    { id: "Atlantic", label: "Atlantic" },
    { id: "Continental", label: "Continental" },
    { id: "Alpine", label: "Alpine" },
    { id: "Pannonian", label: "Pannonian" },
    { id: "Mediterranean", label: "Mediterranean" },
    { id: "BlackSea", label: "Black Sea" },
    { id: "Anatolian", label: "Anatolian" }
  ];

  const handleMouseEnter = regionId => setActiveRegion(regionId);
  const handleMouseLeave = () => setActiveRegion(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 font-serif">Consortium & Living Labs</h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Placeholder for the map as a square */}
        <div className="flex-1 bg-gray-200 rounded-lg shadow-inner border-2 border-gray-300 relative md:min-w-0 w-full md:w-64 md:h-64" style={{ minHeight: '256px' }}>
          <div className={`absolute inset-0 transition-colors duration-300 ${activeRegion ? 'bg-green-300' : 'bg-gray-200'}`}></div>
        </div>

        {/* List of regions */}
        <div className="flex-1 space-y-2">
          {regions.map(region => (
            <button
              key={region.id}
              onMouseEnter={() => handleMouseEnter(region.id)}
              onMouseLeave={handleMouseLeave}
              className={`block w-full text-left m-2 p-2 rounded-lg transition-colors duration-300 ${activeRegion === region.id ? 'bg-green-700 text-white' : 'bg-green-300 text-green-900'}`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mapa;