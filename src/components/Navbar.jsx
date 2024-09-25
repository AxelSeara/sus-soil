import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi'; // Asegúrate de instalar react-icons

const Navbar = () => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-gray-800 text-lg font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-4 text-gray-800">
          <li className="relative">
            <button 
              onClick={toggleSubmenu}
              className="flex items-center hover:text-blue-500 transition duration-300 focus:outline-none"
            >
              Home <FiChevronDown className="ml-1" />
            </button>
            {isSubmenuOpen && (
              <ul className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                <li><Link to="/about" className="block px-4 py-2 hover:text-blue-500 transition duration-300">About</Link></li>
                <li><Link to="/work-packages" className="block px-4 py-2 hover:text-blue-500 transition duration-300">Work Packages</Link></li>
                <li><Link to="/partners" className="block px-4 py-2 hover:text-blue-500 transition duration-300">Partners</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/news" className="hover:text-blue-500 transition duration-300">News</Link>
          </li>
          <li>
            <Link to="/living-labs" className="hover:text-blue-500 transition duration-300">Living Labs</Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-blue-500 transition duration-300">Resources</Link>
          </li>
          <li>
            <Link to="/knowledge-cloud" className="hover:text-blue-500 transition duration-300">Knowledge Cloud</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition duration-300">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;