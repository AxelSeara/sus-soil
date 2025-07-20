// src/Project/Project1/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiDatabase, FiTrendingUp, FiLayers, FiTool, FiShield } from 'react-icons/fi';

export default function About() {
  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.12 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 0.68, 0.43, 0.99] },
    },
  };

  // Lista de outcomes (texto EXACTO; solo asignamos un icono y estilos)
  const outcomes = [
    {
      text: `To develop a subsoil/soil monitoring database (S-DB)
            able to be interoperable with the LUCAS and ESDAC databases.`,
      icon: FiDatabase,
      featured: true,
    },
    {
      text: `To analyse the long-term ASM land use and management
            of 3 relevant types of soil per LL and the relationship
            with rural and urban ecosystem services delivery,
            including modelling.`,
      icon: FiLayers,
    },
    {
      text: `To develop a set of farm idiotypes per LL mixing the ASM best practices
            as an alternative to conventional systems to enhance the ecosystem services
            provision at regional level for citizens.`,
      icon: FiTrendingUp,
    },
    {
      text: `To create a Subsoil Decision Support Tool (S-DST) considering
            soil degradation and relevant business models.`,
      icon: FiTool,
    },
    {
      text: `To propose a subsoil policy strategy framework
            to foster ASM best practices.`,
      icon: FiShield,
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-16 text-brown relative">
      {/* Background subtle pattern overlay (optional) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_25%_25%,#3c6,transparent_60%)]"
      />

      {/* Título principal */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight">
          About SUS-SOIL
        </h1>
        <div className="mt-4 mx-auto h-1 w-36 rounded-full bg-gradient-to-r from-lightGreen via-darkGreen to-lightGreen" />
      </div>

      {/* Introducción */}
      <div className="relative mt-12 bg-white/80 backdrop-blur-sm border border-lightGreen/30 shadow-sm p-8 md:p-10 rounded-2xl">
        <p className="text-lg leading-relaxed">
          SUS-SOIL is a 4-year Horizon Europe funded project that adopts a
          multidisciplinary approach, focused on the development of 15 Subsoil-Living
          Labs (LLs) to inventory, analyse and benchmark different agroecology subsoil
          management (ASM) and land uses, studying their impacts on the subsoil spatial
          variations and dynamics to best combine ASM practices in rural and urban areas
          within a global regional context.
        </p>
        <p className="text-lg leading-relaxed mt-6">
          SUS-SOIL results will be the start point to increase the awareness of land
          managers and public authorities to understand the subsoil threats and risks,
          support EU agroecological transformation tackling subsoils and increasing
          ecosystem services delivery, promote water security and climate change
          mitigation of rural and urban ecosystems.
        </p>
      </div>

      {/* División decorativa */}
      <div className="relative my-14">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brown/25 to-transparent" />
      </div>

      {/* Subtítulo */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        Main Outcomes
      </h2>

      {/* Grid animado */}
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {outcomes.map((o, i) => {
          const Icon = o.icon || FiTarget;
            return (
            <motion.div
              key={i}
              variants={cardVariants}
              className={
                `group relative overflow-hidden rounded-2xl p-6 md:p-7 ` +
                `bg-gradient-to-br from-lightGreen/70 to-lightGreen/40 backdrop-blur-sm ` +
                `border border-lightGreen/40 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)] ` +
                `transition-all duration-300 hover:shadow-[0_6px_22px_-4px_rgba(0,0,0,0.18)] ` +
                `hover:border-lightGreen/60 hover:-translate-y-1 focus-within:-translate-y-1 focus-within:shadow-lg ` +
                (o.featured ? 'lg:col-span-2' : '')
              }
            >
              {/* Sutil glow circular */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-lightGreen/30 blur-3xl rounded-full" />
              </div>

              {/* Número */}
              <span className="absolute top-4 right-5 text-4xl font-black tracking-tight text-brown/15 group-hover:text-brown/25 select-none transition-colors">
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Icono principal */}
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/70 border border-lightGreen/40 shadow-inner shadow-white/40 text-darkGreen transition-transform duration-300 group-hover:scale-105">
                <Icon className="w-6 h-6" />
              </div>

              {/* Texto (sin cambios de contenido) */}
              <p className="text-brown/90 text-base leading-relaxed whitespace-pre-line">
                {o.text}
              </p>

              {/* Línea decorativa inferior */}
              <div className="mt-5 h-px w-1/2 bg-gradient-to-r from-brown/30 to-transparent group-hover:from-brown/50 transition-colors" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}