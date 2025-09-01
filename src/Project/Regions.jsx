import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Variants para animar el contenedor (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 },
  },
};

// Variants para cada tarjeta
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Solo las regiones pedidas, manteniendo textos y colores
const regions = [
  {
    id: 'Boreal',
    info: ' ',
    color: ['#284b55', '#EAF4F1'],
  },
  {
    id: 'Atlantic',
    info: ' ',
    color: ['#2e8479', '#F1FBFA'],
  },
  {
    id: 'Continental',
    info: ' ',
    color: ['#b7543d', '#FCECE9'],
  },
  {
    id: 'Pannonian',
    info: ' ',
    color: ['#86884c', '#FCFCE9'],
  },
  {
    id: 'Mediterranean',
    info: ' ',
    color: ['#ee9c39', '#FEF8EE'],
  },
];

export default function LivingLabs() {
  return (
    <main className="container mx-auto px-6 py-16">
      <header className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-brown font-serif">Living Labs</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Welcome to our Living Labs section! Each region below represents a unique
          ecosystem and set of challenges for soil management. Explore and discover
          the local partnerships and projects focusing on sustainable subsoil practices.
        </p>
      </header>

      <section aria-label="Living Labs regions">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region) => (
            <motion.div key={region.id} variants={cardVariants}>
              <Link
                to={`/living-labs/${region.id}`}
                aria-label={`View details of ${region.id} region`}
                className="group relative block w-full h-56 sm:h-64 rounded-xl overflow-hidden shadow-md focus:outline-none
                           focus-visible:ring-2 ring-offset-2 ring-brown/50 transition-transform hover:scale-[1.015]"
              >
                {/* Fondo con solo gradiente (sin imagen) */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%)`,
                  }}
                />

                {/* Overlay para mejorar contraste en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Contenido */}
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm font-serif">
                    {region.id}
                  </h2>
                  <p className="text-xs sm:text-sm mt-1 text-white/95 drop-shadow-sm font-serif">
                    {region.info}
                  </p>

                  {/* Indicador sutil de clic navegable */}
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-[12px] text-white/95 opacity-90
                               bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                         className="transition-transform group-hover:translate-x-0.5">
                      <path d="M13 5l7 7-7 7M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>

                {/* Borde sutil para definición en fondos claros */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}