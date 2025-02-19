// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg';

function CaretDownIcon() {
  return (
    <svg
      className="ml-1 w-3 h-3 stroke-current fill-none"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const regionIDs = [
  'Boreal', 'Atlantic', 'Continental', 'Alpine',
  'Pannonian', 'Mediterranean', 'BlackSea', 'Anatolian',
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);

  const subMenus = {
    About: [
      { to: '/about#about-section', label: 'About' },
      { to: '/about#work-packages', label: 'Work Packages' },
      { to: '/about#partners', label: 'Partners' },
    ],
    'Living Labs': [
      { to: '/living-labs', label: 'All Living Labs' },
      ...regionIDs.map(id => ({ to: `/living-labs/${id}`, label: id })),
    ],
    Resources: [
      { to: '/resources', label: 'Overview' },
      { to: '/resources/materials', label: 'Materials' },
      { to: '/resources/practice-abstracts', label: 'Practice Abstracts' },
      { to: '/resources/newsletter', label: 'Newsletter' },
    ],
  };

  // Efecto hover base para menú de escritorio
  const baseClass = "text-boreal p-2 rounded-lg transition-colors cursor-pointer";
  const hoverClass = "hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown";

  const handleMouseEnter = menuName => setActiveSubmenu(menuName);
  const handleClearSubmenu = () => setActiveSubmenu(null);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md backdrop-blur-md transition-all duration-300" onMouseLeave={handleClearSubmenu}>
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo: duplica tamaño si hay submenú activo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SUS-SOIL Logo" className={`transition-all duration-300 ${activeSubmenu ? 'h-32' : 'h-16'}`} />
        </Link>
        {/* Botón móvil */}
        <button className="md:hidden text-boreal p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGreen rounded-lg" onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        {/* Menú escritorio */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li onMouseEnter={handleClearSubmenu}>
              <Link to="/" className={`${baseClass} ${hoverClass}`}>Home</Link>
            </li>
            {Object.keys(subMenus).map(menu => (
              <li key={menu} onMouseEnter={() => handleMouseEnter(menu)}>
                <span className={`${baseClass} ${hoverClass} inline-flex items-center`}>
                  {menu} <CaretDownIcon />
                </span>
              </li>
            ))}
            <li onMouseEnter={handleClearSubmenu}>
              <Link to="/news" className={`${baseClass} ${hoverClass}`}>News</Link>
            </li>
            {/*
              // Knowledge Cloud temporalmente comentado
              <li onMouseEnter={handleClearSubmenu}>
                <Link to="/knowledge-cloud" className={`${baseClass} ${hoverClass}`}>Knowledge Cloud</Link>
              </li>
            */}
            <li onMouseEnter={handleClearSubmenu}>
              <Link to="/contact" className={`${baseClass} ${hoverClass}`}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Submenú escritorio alineado a la derecha */}
      <AnimatePresence>
        {activeSubmenu && (
          <motion.div key="sub-navbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:block bg-gray-50 shadow-inner overflow-hidden border-t border-gray-200"
          >
            <ul className="max-w-screen-xl mx-auto px-4 py-4 flex justify-end items-center space-x-4">
              {subMenus[activeSubmenu].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-boreal p-2 rounded-lg transition-colors hover:bg-gray-200 hover:text-brown hover:underline decoration-brown">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link to="/" className="block text-boreal p-2 rounded-lg hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown transition-colors" onClick={() => setOpen(false)}>Home</Link>
              </li>
              <MobileSubmenu title="About" links={subMenus.About} onClose={() => setOpen(false)} />
              <li>
                <Link to="/news" className="block text-boreal p-2 rounded-lg hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown transition-colors" onClick={() => setOpen(false)}>News</Link>
              </li>
              <MobileSubmenu title="Living Labs" links={subMenus['Living Labs']} onClose={() => setOpen(false)} />
              <MobileSubmenu title="Resources" links={subMenus.Resources} onClose={() => setOpen(false)} />
              {/*
                // Knowledge Cloud temporalmente comentado
                <li>
                  <Link to="/knowledge-cloud" className="block text-boreal p-2 rounded-lg hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown transition-colors" onClick={() => setOpen(false)}>Knowledge Cloud</Link>
                </li>
              */}
              <li>
                <Link to="/contact" className="block text-boreal p-2 rounded-lg hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown transition-colors" onClick={() => setOpen(false)}>Contact</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function MobileSubmenu({ title, links, onClose }) {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);
  return (
    <li>
      <button
        onClick={() => setSubmenuOpen(!submenuOpen)}
        className="block w-full text-left text-boreal p-2 rounded-lg hover:bg-gray-100 hover:border-b-2 hover:border-brown hover:text-brown transition-colors"
      >
        {title} <CaretDownIcon />
      </button>
      {submenuOpen && (
        <ul className="mt-2 ml-4 space-y-2">
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} className="block text-boreal p-2 rounded-lg hover:bg-gray-200 hover:text-brown hover:underline decoration-brown transition-colors" onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Navbar;