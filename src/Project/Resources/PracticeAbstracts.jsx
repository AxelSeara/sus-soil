// src/Project/Resources/PracticeAbstracts.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Variants para animar el contenedor
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function PracticeAbstracts() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lightGreen to-white">
      <motion.div
        className="max-w-2xl mx-auto p-6 text-center bg-white/70 backdrop-blur-md rounded-lg shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brown font-serif">
          Practice Abstracts
        </h1>

        {/* Texto anterior: WIP message */}
        <p className="text-md md:text-lg text-brown leading-relaxed">
          On this section we will share all SUS-SOIL project scientific publications soon.
        </p>

        {/* Opcional: sugerencia de newsletter */}
        {/* <div className="mt-8">
          <p className="text-md md:text-lg text-gray-700">
            Meanwhile, sign up for our newsletter to get updates directly in your inbox.
          </p>
          <form className="flex flex-col md:flex-row mt-4 gap-2 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-auto px-4 py-2 rounded border border-brown focus:ring-2 focus:ring-darkGreen text-brown"
            />
            <button
              type="submit"
              className="bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </motion.div>
    </section>
  );
}