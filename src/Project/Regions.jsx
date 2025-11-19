// src/Project/LivingLabs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import portadaLLs from '../assets/regions/Mapa sección LLs.png';

// Thumbnails de regiones
import Region_Alpine        from '../assets/thumbnails/regions/Alpine.jpg';
import Region_Atlantic      from '../assets/thumbnails/regions/Atlantic.jpg';
import Region_Boreal        from '../assets/thumbnails/regions/Boreal.jpg';
import Region_Continental   from '../assets/thumbnails/regions/Continental.jpg';
import Region_Mediterranean from '../assets/thumbnails/regions/Mediterranean.jpg';
import Region_Pannonian     from '../assets/thumbnails/regions/Pannonian.jpg';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Regiones (una columna, full width)
const regions = [
  {
    id: 'Boreal',
    info: ' ',
    color: '#284b55',
    image: Region_Boreal,
  },
  {
    id: 'Atlantic',
    info: ' ',
    color: '#2e8479',
    image: Region_Atlantic,
  },
  {
    id: 'Continental',
    info: ' ',
    color: '#b7543d',
    image: Region_Continental,
  },
  {
    id: 'Pannonian',
    info: ' ',
    color: '#86884c',
    image: Region_Pannonian,
  },
  {
    id: 'Mediterranean',
    info: ' ',
    color: '#ee9c39',
    image: Region_Mediterranean,
  },
  {
    id: 'Alpine',
    info: ' ',
    color: '#6b5d4f',
    image: Region_Alpine,
  },
];

export default function LivingLabs() {
  return (
    <main className="w-full bg-white">
      {/* Portada: full-bleed, sin recortes, sobre fondo blanco */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white">
        <div className="mx-auto w-full px-4 sm:px-6 py-4 sm:py-6">
          <img
            src={portadaLLs}
            alt="Mapa de las regiones de Living Labs"
            className="mx-auto w-full max-h-[70vh] object-contain select-none"
            loading="eager"
          />
        </div>
      </section>

      {/* Cabecera */}
      <header className="mx-auto px-6 py-8 text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-brown font-serif">Living Labs</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Welcome to our Living Labs section! Each region below represents a unique
          ecosystem and set of challenges for soil management. Explore and discover
          the local partnerships and projects focusing on sustainable subsoil practices.
        </p>
      </header>

      {/* Menú: una sola columna, full width, Explore debajo del título */}
      <section
        aria-label="Living Labs regions"
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        <motion.div
          className="flex flex-col gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region) => (
            <motion.div key={region.id} variants={cardVariants}>
              <Link
                to={`/living-labs/${region.id}`}
                aria-label={`View details of ${region.id} region`}
                className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50"
              >
                <div className="relative w-full h-56 sm:h-64 overflow-hidden shadow-sm hover:shadow-md transition-shadow ring-1 ring-black/5">
                  {/* Imagen base */}
                  <img
                    src={region.image}
                    alt={`${region.id} region`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Degradado color → transparente que se desplaza a la izquierda en hover */}
                  <div
                    className="
                      absolute inset-0
                      transition-transform duration-500 ease-out
                      group-hover:-translate-x-1/3
                    "
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${region.color} 0%, ${region.color} 40%, transparent 70%)`,
                      mixBlendMode: 'normal',
                    }}
                  />

                  {/* Capa muy ligera para legibilidad general */}
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Contenido */}
                  <div className="relative z-10 h-full w-full px-6 sm:px-8 py-6 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm font-serif">
                      {region.id}
                    </h2>

                    {/* Botón Explore debajo del título */}
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center justify-center w-auto self-start
                                 text-sm sm:text-[15px] font-medium text-white
                                 bg-white/12 hover:bg-white/18 active:bg-white/24
                                 px-3.5 py-2 rounded-full backdrop-blur-sm
                                 ring-1 ring-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                                 transition"
                      aria-hidden="true"
                    >
                      Explore
                      <svg
                        className="ml-2"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13 5l7 7-7 7M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {region.info?.trim() && (
                      <p className="mt-2 text-white/95 text-sm sm:text-base line-clamp-2">
                        {region.info}
                      </p>
                    )}
                  </div>

                  {/* Línea base sutil */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}