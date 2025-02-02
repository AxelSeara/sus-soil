import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom'; // ¡Importa Link aquí!
import CountUp from 'react-countup'; // Optional: if you prefer using a library for count up
import mapImage from '../../../assets/map.png'; // Adjust the path if necessary

// Variant to animate the section from the left
const sectionVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Variants for container and cards
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      ease: 'easeInOut',
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

// Sample objectives with example text
const objectives = [
  { title: 'Awareness for land managers', emoji: '🌍', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Supporting EU transformation', emoji: '🔄', text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada.' },
  { title: 'Ecosystem services delivery', emoji: '🌿', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.' },
  { title: 'Water security & climate', emoji: '💧', text: 'Curabitur sit amet magna quam. Praesent in libero vel turpis pellentesque.' },
];

// Regions for Living Labs
const regions = [
  { id: 'Boreal', label: 'Boreal', color: '#284b55' },
  { id: 'Atlantic', label: 'Atlantic', color: '#2e8479' },
  { id: 'Continental', label: 'Continental', color: '#b7543d' },
  { id: 'Alpine', label: 'Alpine', color: '#775786' },
  { id: 'Pannonian', label: 'Pannonian', color: '#86884c' },
  { id: 'Mediterranean', label: 'Mediterranean', color: '#ee9c39' },
  { id: 'BlackSea', label: 'Black Sea', color: '#5c81b5' },
  { id: 'Anatolian', label: 'Anatolian', color: '#a02b16' },
];

const MapaAlternative = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  // Toggle active region on click
  const handleRegionClick = (regionId) => {
    setActiveRegion((prev) => (prev === regionId ? null : regionId));
  };

  return (
    <motion.section
      className="relative py-24 px-4 bg-gradient-to-b from-green-200 to-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Main Card */}
        <motion.div
          className="w-full mb-12 p-6 md:p-10 rounded-xl bg-white/70 backdrop-blur-lg shadow-xl text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-brown">
            Consortium & Living Labs
          </h2>
          <p className="text-lg md:text-xl text-brown max-w-4xl mt-4">
            Explore the different types of ecosystems and areas we work in, as well as the overall location of our Living Labs.
          </p>
        </motion.div>

        {/* Grid of Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Map Card: now only the circular map image with a subtle shadow */}
          <motion.div className="relative w-80 h-80 rounded-full overflow-hidden shadow-sm mx-auto" variants={itemVariants}>
            <img
              src={mapImage}
              alt="Map"
              className="w-full h-full object-cover"
            />
            {activeRegion && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="w-64 h-64 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: regions.find((r) => r.id === activeRegion)?.color,
                    opacity: 0.8,
                  }}
                >
                  <p className="text-white text-2xl font-semibold">
                    {regions.find((r) => r.id === activeRegion)?.label}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Info Card: Summary with CountUp values in a single column */}
          <motion.div
            className="rounded-xl bg-white/70 backdrop-blur-lg shadow-md p-6 flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <motion.div className="text-4xl font-bold text-brown">
                <CountUpWrapper end={22} duration={2} />
              </motion.div>
              <p className="text-sm text-brown mt-1">Partners</p>
              <motion.div className="text-4xl font-bold text-brown mt-4">
                <CountUpWrapper end={13} duration={2} />
              </motion.div>
              <p className="text-sm text-brown mt-1">Countries</p>
              <motion.div className="text-4xl font-bold text-brown mt-4">
                <CountUpWrapper end={15} duration={2} />
              </motion.div>
              <p className="text-sm text-brown mt-1">Living Labs</p>
            </motion.div>

            {/* Region Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={`block w-full text-center py-2 rounded-full shadow-md font-semibold transition-transform duration-200 ${
                      isActive ? 'text-white scale-105' : 'text-brown'
                    }`}
                    style={{
                      backgroundColor: isActive ? region.color : '#f8f8f8',
                    }}
                  >
                    {region.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* "View More about Living Labs" Button */}
        <div className="text-center mt-12">
          <Link
            to="/living-labs"
            className="px-8 py-4 bg-brown text-white font-bold rounded-full shadow-md hover:bg-opacity-90 transition-transform duration-200 transform hover:-translate-y-1"
          >
            View More about Living Labs
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

// CountUpWrapper: simple count-up animation without external libraries,
// triggered when the component is in view.
const CountUpWrapper = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // assuming 60fps
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [end, duration]);
  return <span>{count}</span>;
};

export default MapaAlternative;