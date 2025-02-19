// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg';

// Flecha minimalista (outline) para el dropdown
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

// IDs de regiones para el submenú Living Labs (ejemplo)
const regionIDs = [
  'Boreal',
  'Atlantic',
  'Continental',
  'Alpine',
  'Pannonian',
  'Mediterranean',
  'BlackSea',
  'Anatolian',
];

const Navbar = () => {
  // Estado para abrir/cerrar menú móvil
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SUS-SOIL Logo" className="h-16" />
        </Link>

        {/* Botón Mobile */}
        <button
          className="md:hidden text-boreal p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightGreen rounded-lg"
          onClick={toggleMenu}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Nav Links en escritorio */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>

            {/* Submenú About (hover) */}
            <li className="relative group">
              <span className="inline-flex items-center text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors cursor-pointer">
                About
                <CaretDownIcon />
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-boreal shadow-lg rounded-lg min-w-[10rem] z-50">
                <li>
                  <Link
                    to="/about#about-section"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-t-lg"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about#work-packages"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors"
                  >
                    Work Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about#partners"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-b-lg"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </li>

            {/* News */}
            <li>
              <Link
                to="/news"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                News
              </Link>
            </li>

            {/* Submenú Living Labs (hover) */}
            <li className="relative group">
              <span className="inline-flex items-center text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors cursor-pointer">
                Living Labs
                <CaretDownIcon />
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-boreal shadow-lg rounded-lg min-w-[10rem] z-50">
                <li>
                  <Link
                    to="/living-labs"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-t-lg"
                  >
                    All Living Labs
                  </Link>
                </li>
                {regionIDs.map((regionID) => (
                  <li key={regionID}>
                    <Link
                      to={`/living-labs/${regionID}`}
                      className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors"
                    >
                      {regionID}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Submenú Resources (hover) */}
            <li className="relative group">
              <span className="inline-flex items-center text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors cursor-pointer">
                Resources
                <CaretDownIcon />
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-boreal shadow-lg rounded-lg min-w-[10rem] z-50">
                <li>
                  <Link
                    to="/resources"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-t-lg"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/materials"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors"
                  >
                    Materials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/practice-abstracts"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors"
                  >
                    Practice Abstracts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/newsletter"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-b-lg"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </li>

            {/* Knowledge Cloud */}
            <li>
              <Link
                to="/knowledge-cloud"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Knowledge Cloud
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 p-4">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* Submenú About (click en móvil) */}
              <MobileSubmenu
                title="About"
                links={[
                  { to: '/about#about-section', label: 'About' },
                  { to: '/about#work-packages', label: 'Work Packages' },
                  { to: '/about#partners', label: 'Partners' },
                ]}
                onClose={() => setOpen(false)}
              />

              {/* News */}
              <li>
                <Link
                  to="/news"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  News
                </Link>
              </li>

              {/* Submenú Living Labs (click en móvil) */}
              <MobileSubmenu
                title="Living Labs"
                links={[
                  { to: '/living-labs', label: 'All Living Labs' },
                  ...regionIDs.map((id) => ({ to: `/living-labs/${id}`, label: id })),
                ]}
                onClose={() => setOpen(false)}
              />

              {/* Submenú Resources (click en móvil) */}
              <MobileSubmenu
                title="Resources"
                links={[
                  { to: '/resources', label: 'Overview' },
                  { to: '/resources/materials', label: 'Materials' },
                  { to: '/resources/practice-abstracts', label: 'Practice Abstracts' },
                  { to: '/resources/newsletter', label: 'Newsletter' },
                ]}
                onClose={() => setOpen(false)}
              />

              {/* Knowledge Cloud */}
              <li>
                <Link
                  to="/knowledge-cloud"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Knowledge Cloud
                </Link>
              </li>

              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/**
 * Componente auxiliar para submenús en móvil:
 *  - Título con un botón que alterna open/close
 *  - Lista de enlaces
 */
function MobileSubmenu({ title, links, onClose }) {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  return (
    <li>
      <button
        onClick={() => setSubmenuOpen(!submenuOpen)}
        className="block w-full text-left text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
      >
        {title}
        <span className="ml-1 inline-flex">
          <CaretDownIcon />
        </span>
      </button>
      {submenuOpen && (
        <ul className="mt-2 ml-4 space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                onClick={onClose}
              >
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