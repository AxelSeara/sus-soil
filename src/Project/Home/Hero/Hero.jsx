// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/bg2.svg?url';
import { EASE_STANDARD, hoverLift, sectionReveal } from '../../../lib/motion';

const MotionLink = motion(Link);

export default function Hero() {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={sectionReveal}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-scroll md:bg-fixed"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-white/12"
        aria-hidden="true"
      />

      {/* Contenido centrado */}
      <div className="relative text-center max-w-3xl rounded-2xl border border-white/55 bg-[#f6fbf5]/86 backdrop-blur-sm px-6 py-8 md:px-12 md:py-10 shadow-[0_12px_30px_-18px_rgba(20,64,37,0.48)]">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#3f2416] mb-5 leading-[1.06]">
          Sustainable Soil and Subsoil Health
        </h1>
        <p className="mx-auto max-w-[62ch] text-lg text-[#5a3a2a]/90 mb-7 leading-relaxed">
          Join us in preserving and improving the soils for a greener future.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <MotionLink
            whileHover={hoverLift.whileHover}
            whileTap={hoverLift.whileTap}
            to="/project/about"
            className="px-6 py-3 bg-[#4a2a1c] text-white font-semibold rounded-lg hover:bg-[#3f2416] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a2a1c] focus-visible:ring-offset-2 focus-visible:ring-offset-white shadow-[0_8px_20px_-12px_rgba(40,24,16,0.6)]"
          >
            Learn More
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
}
