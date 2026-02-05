import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import portadaLLs from '../assets/regions/Mapa sección LLs.png';

// ✅ IMPORTAR DESDE DATA (fuente única)
import { regions } from '../data/regions';

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

export default function LivingLabs() {
  return (
    <main className="w-full bg-white">
      {/* Portada */}
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
          ecosystem and set of challenges for soil management.
        </p>
      </header>

      {/* Listado */}
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
                  {/* Imagen */}
                  <img
                    src={region.image}
                    alt={`${region.id} region`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay de color (usa region.color real) */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-x-1/3"
                    style={{
                      backgroundImage: `linear-gradient(
                        135deg,
                        ${region.color} 0%,
                        ${region.color} 40%,
                        transparent 70%
                      )`,
                    }}
                  />

                  {/* Capa ligera de contraste */}
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Contenido */}
                  <div className="relative z-10 h-full w-full px-6 sm:px-8 py-6 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                      {region.id}
                    </h2>

                    <button
                      type="button"
                      className="mt-3 inline-flex items-center justify-center self-start
                                 text-sm font-medium text-white
                                 bg-white/12 hover:bg-white/18
                                 px-3.5 py-2 rounded-full backdrop-blur-sm
                                 ring-1 ring-white/25 transition"
                      aria-hidden="true"
                    >
                      Explore →
                    </button>
                  </div>

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