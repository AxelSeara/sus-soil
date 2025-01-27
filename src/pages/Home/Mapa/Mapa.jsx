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
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 font-serif text-brown">Consortium & Living Labs</h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-16">

        {/* Left section with green circles */}
        <div className="flex-1 md:flex md:flex-col items-center space-y-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
            <div className="flex items-center justify-center bg-lightGreen text-brown w-40 h-40 rounded-full p-4">
              <p className="text-center font-bold text-sm leading-tight">22 Partners<br />from 13 Countries</p>
            </div>
            <div className="flex items-center justify-center bg-lightGreen text-brown w-40 h-40 rounded-full p-4">
              <p className="text-center font-bold text-sm leading-tight">15 Living Labs</p>
            </div>
          </div>
        </div>

        {/* Center section with the map */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="relative w-80 h-80 rounded-full overflow-hidden">
            <img src={mapImage} alt="Map" className="w-full h-full object-cover" />
          </div>
          {activeRegion && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-64 h-64 rounded-full flex items-center justify-center"
                style={{ backgroundColor: regions.find(r => r.id === activeRegion)?.color, opacity: 0.8 }}
              >
                <p className="text-white text-2xl font-semibold">{regions.find(r => r.id === activeRegion)?.label}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right section with region list */}
        <div className="flex-1 space-y-4">
          {regions.map(region => (
            <button
              key={region.id}
              onMouseEnter={() => handleMouseEnter(region.id)}
              onMouseLeave={handleMouseLeave}
              className={`block w-full text-center py-3 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-md ${activeRegion === region.id ? 'text-white' : 'text-brown'}`}
              style={{ backgroundColor: activeRegion === region.id ? region.color : '#f8f8f8' }}
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