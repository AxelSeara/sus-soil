import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* Dejamos tu estructura de variables: 
   - mapBase = noMap
   - noMap = map 
   como lo tengas originalmente.
   Aquí muestro algo genérico para no romper tu naming actual.
*/
import mapBase from '../../../assets/regions/map.png'; // "noMap"
import noMap from '../../../assets/regions/Nomap.png';      // "map"
import borealImage from '../../../assets/regions/Boreal.png';
import atlanticImage from '../../../assets/regions/Atlantic.png';
import continentalImage from '../../../assets/regions/Continental.png';
import alpineImage from '../../../assets/regions/Alpine.png';
import pannonianImage from '../../../assets/regions/Pannonian.png';
import mediterraneanImage from '../../../assets/regions/Mediterranean.png';
import blackSeaImage from '../../../assets/regions/BlackSea.png';
import anatolianImage from '../../../assets/regions/Anatolian.png';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      ease: 'easeInOut',
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 15 },
  },
};

const regions = [
  { id: 'Boreal', label: 'Boreal', color: '#284b55', img: borealImage },
  { id: 'Atlantic', label: 'Atlantic', color: '#2e8479', img: atlanticImage },
  { id: 'Continental', label: 'Continental', color: '#b7543d', img: continentalImage },
  { id: 'Alpine', label: 'Alpine', color: '#775786', img: alpineImage },
  { id: 'Pannonian', label: 'Pannonian', color: '#86884c', img: pannonianImage },
  { id: 'Mediterranean', label: 'Mediterranean', color: '#ee9c39', img: mediterraneanImage },
  { id: 'BlackSea', label: 'Black Sea', color: '#5c81b5', img: blackSeaImage },
  { id: 'Anatolian', label: 'Anatolian', color: '#a02b16', img: anatolianImage },
];

export default function Mapa() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Al hacer click: si ya está activa, se desactiva. Si no, se selecciona.
  const handleRegionClick = (regionId) => {
    setActiveRegion((prev) => (prev === regionId ? null : regionId));
  };

  // Overlay final según hovered > active
  const finalRegion = activeRegion || hoveredRegion;
  const regionData = finalRegion 
    ? regions.find((r) => r.id === finalRegion)
    : null;

  // Img resultante 
  const overlayImg = regionData?.img || mapBase; // tu mapBase es "Nomap.png"
  // Para AnimatePresence key
  const overlayKey = finalRegion || 'noMap';

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Texto y botones */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 md:p-10"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-medium font-serif text-brown mb-6">
              Consortium & Living Labs
            </h2>
            <p className="text-lg md:text-xl text-brown font-serif mb-8 leading-relaxed">
              Explore the different types of ecosystems and areas we work in, as well as
              the overall location of our Living Labs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    aria-pressed={isActive}
                    className={`w-full text-center py-2 rounded-full shadow-md font-semibold text-xs md:text-sm 
                                transition-all
                                ${isActive ? 'text-white scale-105' : 'text-brown'}`}
                    style={{
                      backgroundColor: isActive ? region.color : '#f8f8f8',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {region.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Sólo se muestra “Explore more” si hay una region fija (click) */}
            {activeRegion && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Link
                  to={`/living-labs/${activeRegion.toLowerCase()}`}
                  className="px-6 py-3 font-bold rounded-full shadow-md text-white hover:-translate-y-1 transition-transform"
                  style={{ backgroundColor: regionData?.color }}
                >
                  Explore more about {regionData?.label}
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mapa base + overlay */}
          <motion.div className="w-full max-w-lg mx-auto lg:mx-0" variants={itemVariants}>
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
              {/* “NoMap.png” según tu naming */}
              <img
                src={noMap}
                alt="Base Map"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* AnimatePresence */}
              <AnimatePresence mode="wait">
                {overlayImg && (
                  <motion.img
                    key={overlayKey}
                    src={overlayImg}
                    alt="Region Overlay"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}