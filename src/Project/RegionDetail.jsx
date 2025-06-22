// src/Project/RegionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { regions } from '../data/regions'; // Import shared regions data

export default function RegionDetail() {
  const { regionId } = useParams();
  const [region, setRegion] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);

  useEffect(() => {
    const found = regions.find(r => r.id.toLowerCase() === regionId.toLowerCase());
    setRegion(found || null);
    setLoadingImg(true);
  }, [regionId]);

  if (!region) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500">Region not found</h2>
        <Link to="/living-labs" className="text-blue-600 underline mt-4 inline-block">
          Back to Living Labs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">        
      {/* Quick Menu */}
      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h2 className="w-full text-center text-brown font-serif text-xl font-bold mb-4">Quick Menu</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/living-labs" className="px-4 py-2 rounded-lg font-semibold shadow-sm hover:scale-105 transform transition bg-white border border-brown text-brown hover:bg-darkGreen hover:text-white">
            All Living Labs
          </Link>
          {regions.map(reg => {
            const isActive = reg.id.toLowerCase() === region.id.toLowerCase();
            return (
              <Link
                key={reg.id}
                to={`/living-labs/${reg.id}`}
                className={`px-4 py-2 rounded-lg font-semibold shadow-sm transform transition hover:scale-105 ${isActive ? 'text-white' : 'text-brown'}`}
                style={{ backgroundColor: isActive ? reg.color : '#f8f8f8' }}
              >
                {reg.id}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-brown font-serif mb-8 text-center">{region.info}</h1>

      {/* Main Image */}
      <div className="w-full max-w-3xl mx-auto h-64 rounded-lg mb-6 overflow-hidden relative">
        {loadingImg && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
        <img
          src={region.image}
          alt={region.info}
          className="w-full h-full object-cover"
          onLoad={() => setLoadingImg(false)}
          onError={e => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
        />
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto mb-8">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{region.description}</p>
      </div>

      {/* Living Labs Buttons */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-bold font-serif text-brown mb-4">Living Labs in this region</h3>
        <div className="flex flex-wrap gap-4">
          {region.livingLabs.map((lab, idx) => {
            const slug = lab.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={idx}
                to={`/living-labs/${region.id}/${slug}`}
                className="px-4 py-2 bg-gray-100 rounded-lg font-medium hover:bg-opacity-80"
              >
                {lab}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12">
        <Link to="/living-labs" className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80 font-serif">
          Back to Living Labs
        </Link>
      </div>
    </div>
  );
}
