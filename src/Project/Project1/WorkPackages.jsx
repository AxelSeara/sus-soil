// src/Project/Project1/WorkPackages.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Data de los WP
const workPackages = [
  {
    title: "WP1 - Networking: the Agroecological Subsoil Management Network",
    ledBy: "Centro Internazionale di Altistudi Agronomici Mediterranei (CIHEAM-IAMB)",
    objectives: [
      "To establish 15 Living Labs (LLs) in pedoclimatic relevant areas for Europe and to organize all LL activities.",
      "To establish the Agroecological Subsoil Management Network (ASMN) to foster synergies...",
      "To support the rest of SUS-SOIL Work Packages, from WP2 to WP8."
    ]
  },
  {
    title: "WP2 - Subsoil Database collection and harmonization...",
    ledBy: "E-Science European Infrastructure (LifeWatch ERIC)",
    objectives: [
      "To map current subsoil/soil fertility projects, initiatives, databases...",
      "To develop a protocol for subsoil sampling and data gathering.",
      "To develop the SUS-SOIL template database (S-DB)..."
    ]
  },
  {
    title: "WP3 – Soil health, land use and management experiments",
    ledBy: "Agricultural University of Athens (AUA)",
    objectives: [
      "To identify the long-term land use LUCAS points in order to be sampled...",
      "To gather harmonized data from the selected agricultural, forest and urban soils.",
      "To analyse the topsoil/subsoil dynamics and plant production..."
    ]
  },
  {
    title: "WP4 - Subsoil /soil interactions...",
    ledBy: "Università di Pisa (UNIPI)",
    objectives: [
      "To provide a framework for the new models development.",
      "To model the topsoil/subsoil traits at various depths...",
      "To identify main LL farm ideotypes...",
      "To develop aboveground indicators to provide subsoil health indicators."
    ]
  },
  {
    title: "WP5 - Subsoil ecosystem services sustainability assessment",
    ledBy: "Universidade de Coimbra (UC)",
    objectives: [
      "To develop an integrated assessment framework...",
      "To quantify the cost of implementing the alternative farm and urban infrastructure ideotypes.",
      "To evaluate the willingness to implement the subsoil sustainable practices..."
    ]
  },
  {
    title: "WP6 - Bioeconomic and Macroenconomic MODAM-CGE Model",
    ledBy: "Leibniz Centre for Agricultural Landscape Research (ZALF)",
    objectives: [
      "To develop robust business plans and innovative business models...",
      "To develop and optimize a DST based on MODAM modelling...",
      "To develop policy alternatives for addressing subsoil health challenges..."
    ]
  },
  {
    title: "WP7 - Sub-soil database platform development",
    ledBy: "Agricultural University of Athens (AUA)",
    objectives: [
      "To develop digital tools to present the aggregated knowledge...",
      "A Subsoil Database.",
      "A Subsoil Knowledge Cloud (S-KC).",
      "A Subsoil Decision Support Tool (DST).",
      "An Alive Handbook."
    ]
  },
  {
    title: "WP8 - Communication, Dissemination and Exploitation",
    ledBy: "Fundación Empresa Universidad Gallega (FEUGA)",
    objectives: [
      "To communicate project results and its relevance...",
      "To facilitate active dissemination and demonstration...",
      "To design and develop a methodological framework..."
    ]
  },
  {
    title: "WP9 – Project Management",
    ledBy: "Universidade de Santiago de Compostela (USC)",
    objectives: [
      "To implement project infrastructure for efficient reporting...",
      "To administer and transfer payments from the European Commission.",
      "To consolidate and submit periodic progress reports...",
      "To organize the kick-off meeting and the international conference.",
      "To address all financial, ethical, legal, intellectual property...",
      "To create a project database."
    ]
  },
  {
    title: "WP10 - Ethics requirements",
    ledBy: "Universidade de Santiago de Compostela (USC)",
    objectives: [
      "To ensure compliance with the 'ethics requirements' set out in this work package."
    ]
  }
];

// Variants para el contenedor principal (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      // Aplica un retardo para cada hijo
      staggerChildren: 0.15,
    },
  },
};

// Variants para cada tarjeta (fade + slide in + scale)
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function WorkPackages() {
  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4 text-brown">
      {/* Título de la sección */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Work Packages
      </h1>
      {/* Subtítulo breve */}
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
        To facilitate achieving its different goals, the project activities are 
        structured across ten Work Packages.
      </p>

      {/* Contenedor animado con framer-motion */}
      <motion.div
        className="space-y-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {workPackages.map((wp, index) => (
          // Cada tarjeta se envuelve con motion.div
          <motion.div 
            key={index}
            className="bg-white shadow-md p-6 rounded-lg transition-transform duration-300
                       hover:shadow-lg hover:-translate-y-1"
            variants={cardVariants}
          >
            {/* Título WP */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              {wp.title}
            </h2>
            {/* Led by */}
            <p className="text-md md:text-lg font-medium text-darkGreen mb-4">
              Led by: {wp.ledBy}
            </p>
            {/* Lista de objetivos */}
            <ul className="list-disc pl-5 space-y-2 text-md md:text-lg leading-relaxed">
              {wp.objectives.map((objective, objIndex) => (
                <li key={objIndex}>{objective}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}