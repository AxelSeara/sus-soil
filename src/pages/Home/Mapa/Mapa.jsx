import React, { useState } from 'react';
import mapImage from '../../../assets/map.png'; // Confirma que esta es la ruta correcta del mapa

const Mapa = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const regions = [
    { id: "Boreal", label: "Boreal", color: '#284b55' },
    { id: "Atlantic", label: "Atlantic", color: '#2e8479' },
    { id: "Continental", label: "Continental", color: '#b7543d' },
    { id: "Alpine", label: "Alpine", color: '#775786' },
    { id: "Pannonian", label: "Pannonian", color: '#86884c' },
    { id: "Mediterranean", label: "Mediterranean", color: '#ee9c39' },
    { id: "BlackSea", label: "Black Sea", color: '#5c81b5' },
    { id: "Anatolian", label: "Anatolian", color: '#a02b16' }
  ];

  const handleMouseEnter = regionId => setActiveRegion(regionId);
  const handleMouseLeave = () => setActiveRegion(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 font-serif">Consortium & Living Labs</h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-12">

        {/* Left section with green circles, responsive adjustment */}
        <div className="flex-1 md:flex md:flex-col items-center space-y-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div className="flex items-center justify-center bg-green-500 text-white w-32 h-32 rounded-full">
              <p className="text-center font-bold">22 Partners<br />from 13 Countries</p>
            </div>
            <div className="flex items-center justify-center bg-green-500 text-white w-32 h-32 rounded-full">
              <p className="text-center font-bold">15 Living Labs</p>
            </div>
          </div>
        </div>

        {/* Center section with the map */}
        <div className="flex-1 relative">
          <img src={mapImage} alt="Map" className="w-full h-auto" />
          {activeRegion && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: regions.find(r => r.id === activeRegion)?.color, opacity: 0.7 }}
              >
                <p className="text-white text-xl font-semibold">{regions.find(r => r.id === activeRegion)?.label}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right section with region list */}
        <div className="flex-1 space-y-2">
          {regions.map(region => (
            <button
              key={region.id}
              onMouseEnter={() => handleMouseEnter(region.id)}
              onMouseLeave={handleMouseLeave}
              className={`block min-w-[150px] text-center m-2 p-2 rounded-full transition-transform duration-300 transform hover:scale-105 ${activeRegion === region.id ? 'text-white' : 'text-gray-800'}`}
              style={{ backgroundColor: activeRegion === region.id ? region.color : '#f0f0f0' }}
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