import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import portadaLLs from '../assets/regions/Mapa sección LLs.webp';
import { cardReveal, listReveal } from '../lib/motion';

// ✅ IMPORTAR DESDE DATA (fuente única)
import { regions } from '../data/regions';

const containerVariants = listReveal;
const cardVariants = cardReveal;

export default function LivingLabs() {
  return (
    <main className="w-full bg-gradient-to-b from-[#f3f8f5] via-white to-[#f6faf7]">
      {/* Portada */}
      <section className="w-full bg-white">
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
        <h1 className="text-3xl md:text-4xl font-bold text-brown font-serif">Living Labs</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Welcome to our Living Labs section! Each region below represents a unique
          ecosystem and set of challenges for soil management.
        </p>
      </header>

      {/* Listado */}
      <section aria-label="Living Labs regions" className="w-full pb-8">
        <motion.div
          className="mx-auto max-w-[1600px] overflow-hidden rounded-2xl border border-darkGreen/15 bg-darkGreen/5 shadow-sm"
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          {regions.map((region) => (
            <motion.div key={region.id} variants={cardVariants}>
              <Link
                to={`/living-labs/${region.id}`}
                aria-label={`View details of ${region.id} region`}
                className="group block w-full border-b border-darkGreen/15 last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#12251f] sm:h-60 md:h-64">
                  {/* Imagen */}
                  <img
                    src={region.image}
                    alt={`${region.id} region`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                    loading="lazy"
                  />

                  {/* Capa de contraste global, sin cambios de layout en hover */}
                  <div className="absolute inset-0 bg-black/26 transition-colors duration-300 group-hover:bg-black/35" />

                  {/* Banda de color fija: mantiene continuidad visual entre tarjetas */}
                  <div
                    className="absolute inset-y-0 left-0 w-[min(78vw,27rem)] sm:w-[min(62vw,30rem)] md:w-[min(50vw,34rem)]"
                    style={{
                      background: `linear-gradient(104deg, ${region.color} 0%, ${region.color} 66%, transparent 100%)`,
                    }}
                  />

                  {/* Contenido */}
                  <div className="relative z-10 flex h-full w-full flex-col justify-center gap-2 px-6 py-6 sm:px-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-xs">
                      Biogeographic Region
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif leading-tight">
                      {region.id}
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 max-w-[34ch] line-clamp-2">
                      {region.info}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 self-start">
                      <span
                        className="h-2 w-2 rounded-full bg-white/80 transition-all duration-300 group-hover:scale-125 group-hover:bg-white"
                        aria-hidden="true"
                      />
                      <span
                        className="inline-flex items-center justify-center rounded-full bg-white/16 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition group-hover:bg-white/24"
                        aria-hidden="true"
                      >
                        Explore Region
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
