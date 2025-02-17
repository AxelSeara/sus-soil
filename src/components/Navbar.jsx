// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg'; // Ajusta la ruta según tu estructura

// Array con los IDs de regiones para el submenú
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

const Navbar = () => {
  const [open, setOpen] = React.useState(false);     // Estado del menú móvil
  const [labsOpen, setLabsOpen] = React.useState(false); // Estado del submenú "Living Labs" en móvil

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
            <li>
              <Link
                to="/"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                News
              </Link>
            </li>

            {/* Submenú Living Labs en Desktop (hover) */}
            <li className="relative group">
              {/* Botón principal (sin <Link> para que el hover funcione) */}
              <span className="inline-flex items-center text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors cursor-pointer">
                Living Labs
                <CaretDownIcon />
              </span>
              {/* Submenú (hover) */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-boreal shadow-lg rounded-lg min-w-[10rem] mt-1">
                {/* Opción para ver todos */}
                <li>
                  <Link
                    to="/living-labs"
                    className="block px-4 py-2 hover:bg-lightGreen hover:text-white transition-colors rounded-t-lg"
                  >
                    All Living Labs
                  </Link>
                </li>
                {/* Regiones */}
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

            <li>
              <Link
                to="/resources"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/knowledge-cloud"
                className="text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
              >
                Knowledge Cloud
              </Link>
            </li>
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
              <li>
                <Link
                  to="/"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  News
                </Link>
              </li>

              {/* Submenú Living Labs en Móvil (click) */}
              <li>
                <button
                  onClick={() => setLabsOpen(!labsOpen)}
                  className="block w-full text-left text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                >
                  Living Labs
                  <span className="ml-1 inline-flex">
                    <CaretDownIcon />
                  </span>
                </button>
                {labsOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {/* Ver todos */}
                    <li>
                      <Link
                        to="/living-labs"
                        className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                        onClick={() => {
                          setOpen(false);
                          setLabsOpen(false);
                        }}
                      >
                        All Living Labs
                      </Link>
                    </li>
                    {/* Regiones */}
                    {regionIDs.map((regionID) => (
                      <li key={regionID}>
                        <Link
                          to={`/living-labs/${regionID}`}
                          className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setLabsOpen(false);
                          }}
                        >
                          {regionID}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/resources"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/knowledge-cloud"
                  className="block text-boreal p-2 rounded-lg hover:bg-lightGreen hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Knowledge Cloud
                </Link>
              </li>
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

export default Navbar;