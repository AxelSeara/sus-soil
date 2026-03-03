// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/bg2.svg';
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-scroll md:bg-fixed"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#eff8f0]/45 via-[#f6fbf6]/30 to-white/50"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(122,194,129,0.25),transparent_36%),radial-gradient(circle_at_82%_70%,rgba(46,132,121,0.16),transparent_40%)]"
        aria-hidden="true"
      />

      {/* Contenido centrado */}
      <div className="relative text-center max-w-2xl rounded-3xl border border-white/60 bg-white/55 backdrop-blur-md px-6 py-10 md:px-12 md:py-12 shadow-[0_16px_45px_-26px_rgba(20,64,37,0.55)]">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
          Sustainable Soil and Subsoil Health
        </h1>
        <p className="text-lg text-brown/85 mb-8 leading-relaxed">
          Join us in preserving and improving the soils for a greener future.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <MotionLink
            whileHover={hoverLift.whileHover}
            whileTap={hoverLift.whileTap}
            to="/project/about"
            className="px-6 py-3 bg-darkGreen text-white font-bold rounded-full hover:bg-darkGreen/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 focus-visible:ring-offset-white shadow-md"
          >
            Learn More
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
}
