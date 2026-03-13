// src/components/Mapa.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardReveal, imageFadeScale, listReveal, sectionReveal, hoverLift } from '../../../lib/motion';

import mapBase from '../../../assets/regions/map.webp'; // fallback
import noMap from '../../../assets/regions/Nomap.webp';
import borealImage from '../../../assets/regions/Boreal.webp';
import atlanticImage from '../../../assets/regions/Atlantic.webp';
import continentalImage from '../../../assets/regions/Continental.webp';
import pannonianImage from '../../../assets/regions/Pannonian.webp';
import mediterraneanImage from '../../../assets/regions/Mediterranean.webp';
import alpineImage from '../../../assets/regions/Alpine.webp';

const containerVariants = listReveal;
const itemVariants = cardReveal;

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

  const ctaLabel = 'Explore Living Labs';
  const ctaTo = activeRegion ? `/living-labs/${slug(activeRegion)}` : '/living-labs';
  const ctaBg = '#4b3a2f';

  const handleRegionClick = (id) => {
    setActiveRegion((prev) => (prev === id ? null : id));
  };

  const clearSelection = () => {
    setActiveRegion(null);
    setHoveredRegion(null);
  };

  const handleKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegionClick(id);
    }
  };

  return (
    <section className="section-shell relative bg-gradient-to-b from-white via-[#f5fbf7] to-[#edf8f1]">
      <div className="content-shell">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left column */}
          <motion.div
            className="rounded-2xl border border-darkGreen/10 bg-white/80 backdrop-blur-lg shadow-[0_18px_38px_-28px_rgba(20,64,37,0.7)] p-6 md:p-10"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-brown mb-4">
              Consortium & Living Labs
            </h2>
            <p className="text-lg md:text-xl text-brown/90 font-serif mb-6 leading-relaxed">
              Explore the different types of ecosystems and areas we work in, as well as
              the overall location of our Living Labs.
            </p>

            {/* Region chips */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3"
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
                      'rounded-full py-2 px-3 min-h-[40px]',
                      'ring-offset-2 focus:outline-none focus-visible:ring-2',
                      'transition-all font-semibold',
                      // Tipografía fluida y compacta
                      'text-[clamp(11px,2.6vw,14px)] leading-[1.1]',
                      // Estado visual
                      isActive ? 'text-white scale-[1.03] border border-white/40' : 'text-brown hover:shadow-md border border-transparent',
                    ].join(' ')}
                    style={{
                      backgroundColor: isActive ? r.color : '#f6f6f6',
                      boxShadow: isActive ? '0 6px 18px rgba(0,0,0,.12)' : undefined,
                      outline: isActive ? `2px solid ${r.color}33` : 'none',
                    }}
                    whileHover={hoverLift.whileHover}
                    whileTap={hoverLift.whileTap}
                    transition={{ duration: 0.22 }}
                  >
                    <span className="inline-flex w-full items-center justify-center gap-1.5">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: r.color }}
                        aria-hidden="true"
                      />
                      {isActive && (
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold leading-none" aria-hidden="true">
                          ✓
                        </span>
                      )}
                      {/* Contenedor con min-w-0 para hacer efectivo el truncate */}
                      <span className="min-w-0">
                        <span className="block truncate max-w-full">{r.label}</span>
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 min-h-[24px]">
              {activeRegion ? (
                <p className="text-sm text-brown/80">
                  Selected region: <span className="font-semibold">{regionData?.label}</span>
                </p>
              ) : (
                <p className="text-sm text-brown/70">Select a region to preview it on the map.</p>
              )}
            </div>

            {/* Primary CTA (always visible) */}
            <motion.div
              className="mt-8 flex justify-center"
              variants={sectionReveal}
              initial={false}
              animate="visible"
            >
              <Link
                to={ctaTo}
                aria-label={activeRegion ? `Go to ${regionData?.label}` : 'Go to Living Labs'}
                className="px-6 py-3 font-bold rounded-lg shadow-md text-white hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen ring-offset-2"
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
          <motion.div className="motion-stable w-full max-w-lg mx-auto lg:mx-0" variants={itemVariants}>
            <div className="relative w-full aspect-square rounded-[28px] overflow-hidden shadow-sm">
              <img
                src={noMap}
                alt="Base map"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <AnimatePresence initial={false} mode="sync">
                {overlayImg && (
                  <motion.img
                    key={overlayKey}
                    src={overlayImg}
                    alt={regionData ? `${regionData.label} overlay` : 'Map overlay'}
                    className="motion-stable absolute inset-0 w-full h-full object-cover"
                    initial={false}
                    animate={imageFadeScale.animate}
                    exit={imageFadeScale.exit}
                    transition={{ ...imageFadeScale.transition, duration: 0.28 }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </AnimatePresence>

              {/* Corner caption for subtle feedback */}
              <div className="absolute bottom-3 right-3">
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-2.5 py-1 text-[11px] rounded-full bg-white/85 backdrop-blur border border-black/5 text-brown hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen"
                  aria-label="Reset map to overview"
                  title="Reset to overview"
                >
                  {regionData ? `Current: ${regionData.label} · Reset` : 'Current: Overview'}
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-brown/70 text-center lg:text-left">
              Tip: Tap a region chip to preview it. Tap “Reset” to return to overview.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
