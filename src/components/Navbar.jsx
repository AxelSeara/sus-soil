import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/1lineLogo.svg"
            alt="SUS-SOIL Logo"
            className="h-8"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-boreal p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green rounded-lg"
          onClick={toggleMenu}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/living-labs"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                Living Labs
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/knowledge-cloud"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                Knowledge Cloud
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Nav Animation */}
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
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/living-labs"
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Living Labs
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/knowledge-cloud"
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Knowledge Cloud
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-boreal p-2 rounded-lg hover:bg-green hover:text-white transition-colors"
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