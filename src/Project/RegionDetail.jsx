// src/pages/RegionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const regions = [
  {
    id: 'Boreal',
    info: 'Boreal',
    color: '#284b55',
    image: 'https://source.unsplash.com/r0aq9pYIadI/600x400',
    description: `
      El Boreal abarca áreas con climas fríos y bosques extensos. 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vestibulum lacinia, neque in ultricies venenatis, dui justo feugiat risus, 
      eget ultricies quam ipsum ac justo. Nullam et orci ac justo porttitor 
      dignissim eu ac lacus. Sed vehicula maximus odio, et dapibus quam posuere ut. 
      Curabitur semper sapien at est faucibus, a dignissim lacus ornare. 
      Pellentesque accumsan, nibh at tempus pellentesque, lorem ex fermentum nulla, 
      eget fermentum ex arcu a odio. Sed bibendum ultrices efficitur. 
      Fusce ullamcorper nunc eget nulla dignissim, vel malesuada tellus dictum.
    `,
  },
  {
    id: 'Atlantic',
    info: 'Atlantic',
    color: '#2e8479',
    image: 'https://source.unsplash.com/hkjsfuyxK10/600x400',
    description: `
      El Atlantic se caracteriza por costas húmedas y temperaturas suaves. 
      Suspendisse sagittis tortor non diam molestie, in varius massa posuere. 
      Etiam sed semper nisl. Praesent efficitur porta velit, quis porta erat rutrum non.
    `,
  },
  {
    id: 'Continental',
    info: 'Continental',
    color: '#b7543d',
    image: 'https://source.unsplash.com/TRhGEGdw-YY/600x400',
    description: `
      El Continental cuenta con climas más extremos y suelos profundos. 
      Proin efficitur leo et semper pharetra. Nulla facilisi. Donec vitae 
      volutpat enim, eget pellentesque massa. Cras posuere interdum mi in volutpat.
    `,
  },
  {
    id: 'Alpine',
    info: 'Alpine',
    color: '#775786',
    image: 'https://source.unsplash.com/ZEVkLRWmnX4/600x400',
    description: `
      Las zonas Alpine destacan por sus montañas elevadas y ecosistemas frágiles. 
      Sed tincidunt sapien sed odio faucibus, vitae vehicula felis imperdiet.
      Vestibulum aliquet mi sed ante luctus, vel sodales nulla iaculis.
    `,
  },
  {
    id: 'Pannonian',
    info: 'Pannonian',
    color: '#86884c',
    image: 'https://source.unsplash.com/2cddwbyhTsY/600x400',
    description: `
      La región Pannonian es rica en llanuras y suelos fértiles. 
      Duis id tellus nec dui vehicula porta. Morbi semper libero eu turpis pulvinar maximus.
    `,
  },
  {
    id: 'Mediterranean',
    info: 'Mediterranean',
    color: '#ee9c39',
    image: 'https://source.unsplash.com/mDa8FAg782c/600x400',
    description: `
      El Mediterranean es famoso por sus veranos secos y suelos calcáreos. 
      Cras accumsan magna nec urna ullamcorper, vel congue erat vestibulum.
    `,
  },
  {
    id: 'BlackSea',
    info: 'Black Sea',
    color: '#5c81b5',
    image: 'https://source.unsplash.com/5UhayavS2d4/600x400',
    description: `
      La región Black Sea combina costas y valles fértiles. 
      Sed quis libero in sem auctor finibus ac non sapien. Donec lobortis, nisl a imperdiet 
      varius, ante libero facilisis arcu, a ultrices sapien eros sed justo.
    `,
  },
  {
    id: 'Anatolian',
    info: 'Anatolian',
    color: '#a02b16',
    image: 'https://source.unsplash.com/LSKmkJGog64/600x400',
    description: `
      Anatolian se ubica en la península de Anatolia, con climas variados y suelos antiguos. 
      Fusce dignissim, nunc eget pretium sodales, velit diam fermentum arcu, eget facilisis nisi 
      purus vitae libero.
    `,
  },
];

export default function RegionDetail() {
  const { id } = useParams(); // Region ID from URL
  const [region, setRegion] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);

  useEffect(() => {
    // Buscar la región sin distinción de mayúsculas
    const found = regions.find(r => r.id.toLowerCase() === id.toLowerCase());
    setRegion(found || null);
    setLoadingImg(true);
  }, [id]);

  if (!region) {
    return (
      <div className="container mx-auto px-6 py-16 text-center ">
        <h2 className="text-2xl font-bold text-red-500">Region not found</h2>
        <Link
          to="/living-labs"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Back to Living Labs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Quick Menu with all Regions */}
      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h2 className="w-full text-center text-brown font-serif text-xl font-bold mb-4">
          Quick Menu
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Link to All Living Labs */}
          <Link
            to="/living-labs"
            className="px-4 py-2 rounded-lg font-semibold shadow-sm 
                       hover:scale-105 transform transition 
                       bg-white border border-brown text-brown 
                       hover:bg-darkGreen hover:text-white"
          >
            All Living Labs
          </Link>

          {/* Button to each region with color highlight if it's the current region */}
          {regions.map(reg => {
            const isActive = reg.id.toLowerCase() === region.id.toLowerCase();
            return (
              <Link
                key={reg.id}
                to={`/living-labs/${reg.id}`}
                className={`px-4 py-2 rounded-lg font-semibold shadow-sm transform transition 
                            hover:scale-105
                            ${isActive ? 'text-white' : 'text-brown'}`}
                style={{
                  backgroundColor: isActive ? reg.color : '#f8f8f8'
                }}
              >
                {reg.id}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-brown font-serif mb-8 text-center">
        {region.info}
      </h1>

      {/* Imagen principal */}
      <div className="w-full max-w-3xl mx-auto h-64 rounded-lg mb-6 overflow-hidden relative">
        {loadingImg && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
        <img
          src={region.image}
          alt={region.info}
          className="w-full h-full object-cover"
          onLoad={() => setLoadingImg(false)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
          }}
        />
      </div>

      {/* Descripción */}
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {region.description}
        </p>
      </div>

      <hr className="my-8 border-brown border" />

      {/* Sección: Related News */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-bold font-serif text-brown mb-2">
          Related News
        </h3>
        {/* Aquí 3 placeholders; en el futuro, fetch real data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-20 rounded shadow-sm flex items-center justify-center">
              <span className="text-sm text-gray-700">
                News Placeholder {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-brown border" />

      {/* Sección: Related Events */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-bold font-serif text-brown mb-2">
          Related Events
        </h3>
        {/* Igual, 3 placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-20 rounded shadow-sm flex items-center justify-center">
              <span className="text-sm text-gray-700">
                Event Placeholder {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-brown border" />

      {/* Sección: Colaboradores */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-bold font-serif text-brown mb-2">
          Collaborators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-16 rounded shadow-sm flex items-center justify-center">
              <span className="text-sm text-gray-700">
                Logo {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-brown border" />

      {/* Sección: Area Responsible */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-bold font-serif text-brown mb-2">
          Area Responsible
        </h3>
        <div className="flex justify-around">
          {[
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Charlie' },
          ].map((person, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-sm mb-2">
                <FaUser size={24} className="text-gray-700" />
              </div>
              <span className="text-sm text-gray-700 font-serif">
                {person.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para volver a la lista de Living Labs */}
      <div className="text-center mt-8">
        <Link
          to="/living-labs"
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80 font-serif"
        >
          Back to Living Labs
        </Link>
      </div>
    </div>
  );
}