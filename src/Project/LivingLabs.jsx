// LivingLabs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Array con la información de cada región
const regions = [
  {
    id: 'Boreal',
    color: ['#284b55', '#EAF4F1'],
    info: 'Boreal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel justo ligula. Fusce vitae ipsum et justo vestibulum efficitur. Cras in mauris tincidunt, pulvinar lorem nec, tincidunt metus. Praesent laoreet nibh nec libero interdum, in mollis nisl convallis...',
    image: 'https://source.unsplash.com/r0aq9pYIadI/600x400',
  },
  {
    id: 'Atlantic',
    color: ['#2e8479', '#E2F1EE'],
    info: 'Atlantic',
    description: 'Description for Atlantic',
    image: 'https://source.unsplash.com/hkjsfuyxK10/600x400',
  },
  {
    id: 'Continental',
    color: ['#b7543d', '#F4E6E3'],
    info: 'Continental',
    description: 'Description for Continental',
    image: 'https://source.unsplash.com/TRhGEGdw-YY/600x400',
  },
  {
    id: 'Alpine',
    color: ['#775786', '#F1EAF3'],
    info: 'Alpine',
    description: 'Description for Alpine',
    image: 'https://source.unsplash.com/ZEVkLRWmnX4/600x400',
  },
  {
    id: 'Pannonian',
    color: ['#86884c', '#F4F4E5'],
    info: 'Pannonian',
    description: 'Description for Pannonian',
    image: 'https://source.unsplash.com/2cddwbyhTsY/600x400',
  },
  {
    id: 'Mediterranean',
    color: ['#ee9c39', '#FDF3E5'],
    info: 'Mediterranean',
    description: 'Description for Mediterranean',
    image: 'https://source.unsplash.com/mDa8FAg782c/600x400',
  },
  {
    id: 'BlackSea',
    color: ['#5c81b5', '#E6EDF5'],
    info: 'Black Sea',
    description: 'Description for Black Sea',
    image: 'https://source.unsplash.com/5UhayavS2d4/600x400',
  },
  {
    id: 'Anatolian',
    color: ['#a02b16', '#F4E4E1'],
    info: 'Anatolian',
    description: 'Description for Anatolian',
    image: 'https://source.unsplash.com/LSKmkJGog64/600x400',
  },
];

export default function LivingLabs() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center mb-8 text-brown font-serif">
        Living Labs
      </h1>

      {/* Introduction / Simulated Text */}
      <div className="max-w-3xl mx-auto  mb-12">
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to our Living Labs section! Here, we explore different regions 
          and their unique environmental, agricultural, and cultural 
          characteristics. Each lab is a hub for innovation, research, and 
          hands-on collaboration.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Discover the special attributes of each area, the projects taking 
          place, and the partnerships driving sustainable soil health solutions. 
          Dive into the region that interests you the most!
        </p>
      </div>

      {/* Grid of Regions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {regions.map((region) => (
          <Link
            key={region.id}
            to={`/living-labs/${region.id}`}
            className="w-full h-64 flex items-center justify-center text-center text-white border border-gray-300 rounded-lg shadow-lg cursor-pointer overflow-hidden"
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              whileHover={{ scale: 1.05, backgroundSize: 'cover' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundImage: `linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%), url(${region.image})`,
                backgroundSize: 'cover, cover',
                backgroundPosition: 'center',
              }}
            >
              <h2 className="text-xl font-bold drop-shadow-lg font-serif">
                {region.id}
              </h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}