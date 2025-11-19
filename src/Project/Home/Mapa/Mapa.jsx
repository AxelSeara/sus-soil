// src/components/Mapa.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import mapBase from '../../../assets/regions/map.png'; // fallback
import noMap from '../../../assets/regions/Nomap.png';
import borealImage from '../../../assets/regions/Boreal.png';
import atlanticImage from '../../../assets/regions/Atlantic.png';
import continentalImage from '../../../assets/regions/Continental.png';
import pannonianImage from '../../../assets/regions/Pannonian.png';
import mediterraneanImage from '../../../assets/regions/Mediterranean.png';
import alpineImage from '../../../assets/regions/Alpine.png';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.18, ease: 'easeInOut', duration: 0.55 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

// Only the requested regions
const regions = [
  { id: 'Boreal',        label: 'Boreal',        color: '#284b55', img: borealImage },
  { id: 'Atlantic',      label: 'Atlantic',      color: '#2e8479', img: atlanticImage },
  { id: 'Continental',   label: 'Continental',   color: '#b7543d', img: continentalImage },
  { id: 'Pannonian',     label: 'Pannonian',     color: '#86884c', img: pannonianImage },
  { id: 'Mediterranean', label: 'Mediterranean', color: '#ee9c39', img: mediterraneanImage },
  { id: 'Alpine',        label: 'Alpine',        color: '#6b5d4f', img: alpineImage },
];

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

export default function Mapa() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const finalRegion = activeRegion || hoveredRegion;
  const regionData = useMemo(
    () => (finalRegion ? regions.find((r) => r.id === finalRegion) : null),
    [finalRegion]
  );

  const overlayImg = regionData?.img || mapBase;
  const overlayKey = finalRegion || 'noMap';

  const ctaLabel = activeRegion ? `Explore ${regionData?.label}` : 'Explore our Living Labs';
  const ctaTo = activeRegion ? `/living-labs/${slug(activeRegion)}` : '/living-labs';
  const ctaBg = activeRegion ? (regionData?.color || '#4b3a2f') : '#4b3a2f';

  const handleRegionClick = (id) => {
    setActiveRegion((prev) => (prev === id ? null : id));
  };

  const handleKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegionClick(id);
    }
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left column */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 md:p-10"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-medium font-serif text-brown mb-4">
              Consortium & Living Labs
            </h2>
            <p className="text-lg md:text-xl text-brown/90 font-serif mb-6 leading-relaxed">
              Explore the different types of ecosystems and areas we work in, as well as
              the overall location of our Living Labs.
            </p>

            {/* Region chips (mejorados para evitar desborde) */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              role="toolbar"
              aria-label="Toggle region overlays"
            >
              {regions.map((r) => {
                const isActive = activeRegion === r.id;
                return (
                  <motion.button
                    key={r.id}
                    type="button"
                    onClick={() => handleRegionClick(r.id)}
                    onMouseEnter={() => setHoveredRegion(r.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onKeyDown={(e) => handleKey(e, r.id)}
                    aria-pressed={isActive}
                    aria-label={`${isActive ? 'Disable' : 'Enable'} ${r.label} overlay`}
                    title={r.label}
                    className={[
                      // Layout truncado fiable
                      'w-full min-w-0 overflow-hidden',
                      'rounded-full py-2 px-3 min-h-[36px]',
                      'ring-offset-2 focus:outline-none focus-visible:ring-2',
                      'transition-all font-semibold',
                      // Tipografía fluida y compacta
                      'text-[clamp(11px,2.6vw,14px)] leading-[1.1]',
                      // Estado visual
                      isActive ? 'text-white scale-[1.03]' : 'text-brown hover:shadow-md',
                    ].join(' ')}
                    style={{
                      backgroundColor: isActive ? r.color : '#f6f6f6',
                      boxShadow: isActive ? '0 6px 18px rgba(0,0,0,.12)' : undefined,
                      outline: isActive ? `2px solid ${r.color}33` : 'none',
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <span className="inline-flex w-full items-center justify-center gap-1.5">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: r.color }}
                        aria-hidden="true"
                      />
                      {/* Contenedor con min-w-0 para hacer efectivo el truncate */}
                      <span className="min-w-0">
                        <span className="block truncate max-w-full">{r.label}</span>
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Primary CTA (always visible) */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Link
                to={ctaTo}
                aria-label={activeRegion ? `Go to ${regionData?.label}` : 'Go to Living Labs'}
                className="px-6 py-3 font-bold rounded-full shadow-md text-white hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 ring-offset-2"
                style={{ backgroundColor: ctaBg }}
              >
                {ctaLabel}
              </Link>
            </motion.div>

            {/* A11y live status */}
            <p className="sr-only" aria-live="polite">
              {activeRegion ? `${regionData?.label} selected` : 'No region selected'}
            </p>
          </motion.div>

          {/* Right column: map */}
          <motion.div className="w-full max-w-lg mx-auto lg:mx-0" variants={itemVariants}>
            <div className="relative w-full aspect-square rounded-[28px] overflow-hidden shadow-sm">
              <img
                src={noMap}
                alt="Base map"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              <AnimatePresence mode="wait">
                {overlayImg && (
                  <motion.img
                    key={overlayKey}
                    src={overlayImg}
                    alt={regionData ? `${regionData.label} overlay` : 'Map overlay'}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </AnimatePresence>

              {/* Corner caption for subtle feedback */}
              <div className="absolute bottom-3 right-3">
                <span
                  className="px-2.5 py-1 text-[11px] rounded-full bg-white/80 backdrop-blur border border-black/5"
                  style={{ color: regionData?.color || '#4b3a2f' }}
                >
                  {regionData ? regionData.label : 'Overview'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}