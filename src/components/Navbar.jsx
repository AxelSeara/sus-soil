import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi'; 

const Navbar = () => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleSubmenu = () => setSubmenuOpen(!isSubmenuOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-6 transition duration-300 ease-in-out">
        <Link to="/" className="flex items-center text-gray-800 text-lg font-bold space-x-2 hover:text-blue-500 transition duration-300 ease-in-out">
          <span>SUS-SOIL</span>
        </Link>
        <button onClick={toggleMenu} className="md:hidden flex items-center p-3 transition duration-300 ease-in-out">
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div className={`absolute md:relative top-16 md:top-auto w-full md:w-auto bg-white md:bg-transparent left-0 transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} md:scale-100 md:opacity-100`}>
          <ul className="flex flex-col md:flex-row items-center md:space-x-4 p-4 md:p-0">
            <li className="relative">
              <button onClick={toggleSubmenu} className="flex items-center space-x-1 hover:text-blue-500 transition duration-300 ease-in-out">
                Home <FiChevronDown />
              </button>
              {isSubmenuOpen && (
                <ul className="absolute bg-white shadow rounded z-10 p-2 transition-all duration-500 ease-in-out transform scale-100">
                  <li><Link to="/about" className="block px-4 py-2 hover:text-blue-500 transition duration-300 ease-in-out">About</Link></li>
                  <li><Link to="/work-packages" className="block px-4 py-2 hover:text-blue-500 transition duration-300 ease-in-out">Work Packages</Link></li>
                  <li><Link to="/partners" className="block px-4 py-2 hover:text-blue-500 transition duration-300 ease-in-out">Partners</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/news" className="py-2 px-3 hover:text-blue-500 transition duration-300 ease-in-out">News</Link></li>
            <li><Link to="/living-labs" className="py-2 px-3 hover:text-blue-500 transition duration-300 ease-in-out">Living Labs</Link></li>
            <li><Link to="/resources" className="py-2 px-3 hover:text-blue-500 transition duration-300 ease-in-out">Resources</Link></li>
            <li><Link to="/knowledge-cloud" className="py-2 px-3 hover:text-blue-500 transition duration-300 ease-in-out">Knowledge Cloud</Link></li>
            <li><Link to="/contact" className="py-2 px-3 hover:text-blue-500 transition duration-300 ease-in-out">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;