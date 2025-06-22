// src/Project/LivingLabDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { regions, livingLabs } from '../data/regions'; // Import shared data

export default function LivingLabDetail() {
  const { regionId, labId } = useParams();
  const [lab, setLab] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const foundLab = livingLabs.find(l => l.id === labId) || null;
    const foundRegion = regions.find(r => r.id.toLowerCase() === regionId.toLowerCase()) || null;
    setLab(foundLab);
    setRegion(foundRegion);
  }, [regionId, labId]);

  if (!lab) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500">Living Lab not found</h2>
        <Link to={`/living-labs/${regionId}`} className="text-blue-600 underline mt-4 inline-block">
          Back to Region
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">{lab.title}</h1>
      <img src={lab.image} alt={lab.title} className="w-full max-w-3xl mb-6 rounded-lg" />
      <p className="text-gray-700 whitespace-pre-line mb-8">{lab.description}</p>

      {region ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">About the {region.info}</h2>
          <p className="text-gray-700 whitespace-pre-line mb-8">{region.description}</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">About this region</h2>
          <p className="text-gray-700 whitespace-pre-line mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </>
      )}

      {lab.gallery && lab.gallery.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lab.gallery.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i + 1}`} className="rounded shadow-sm" />
            ))}
          </div>
        </>
      )}

      <div className="text-center mt-12">
        <Link
          to={`/living-labs/${regionId}`}
          className="bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80"
        >
          Back to {region?.info || 'Region'}
        </Link>
      </div>
    </div>
  );
}
