import React from 'react';
import { motion } from 'framer-motion';
import { cardReveal, listReveal, sectionReveal } from '../../../lib/motion';

import AwarenessIcon from '../../../assets/icons/Awareness.svg';
import EcosystemIcon from '../../../assets/icons/Ecosystem.svg';
import EUIcon from '../../../assets/icons/EU.svg';
import WaterIcon from '../../../assets/icons/Water.svg';

const objectives = [
  { title: 'Awareness for land managers', icon: AwarenessIcon },
  { title: 'Supporting EU transformation', icon: EUIcon },
  { title: 'Ecosystem services delivery', icon: EcosystemIcon },
  { title: 'Water security & climate', icon: WaterIcon },
];

export default function Detalles() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#eaf7ed] via-[#f3fbf5] to-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Título principal centrado */}
        <motion.div
          className="w-full mb-12 p-6 md:p-10 rounded-2xl border border-darkGreen/10 bg-white/75 backdrop-blur-lg text-center shadow-[0_14px_38px_-28px_rgba(25,80,45,0.7)]"
          variants={sectionReveal}
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brown font-medium">
            The Project
          </h2>
        </motion.div>

        {/* Grid de tiles */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={listReveal}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {objectives.map((obj, index) => {
            return (
              <motion.div
                key={index}
                className="aspect-square bg-white/95 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-darkGreen/10 shadow-[0_10px_26px_-20px_rgba(20,66,38,0.7)] hover:shadow-[0_18px_30px_-22px_rgba(20,66,38,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                variants={cardReveal}
              >
                <img
                  src={obj.icon}
                  alt={obj.title}
                  className="w-20 h-20 md:w-24 md:h-24 mb-4"
                />
                <h3 className="text-brown font-medium font-serif text-lg">
                  {obj.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
