import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi'; 

const Navbar = () => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleSubmenu = () => {
    // Ensure that submenu toggling only affects mobile view
    if (window.innerWidth < 768) {
      setSubmenuOpen(!isSubmenuOpen);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    // Automatically open the submenu when the main menu is opened on mobile
    if (window.innerWidth < 768) {
      setSubmenuOpen(true);
    }
  };

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-6">
        <Link to="/" className="flex items-center text-gray-800 text-lg font-bold space-x-2 hover:text-blue-500">
          <span>SUS-SOIL</span>
        </Link>
        <button onClick={toggleMenu} className="md:hidden flex items-center p-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div className={`fixed md:relative top-0 left-0 w-full h-full md:h-auto md:w-auto bg-white transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row items-center md:space-x-4 p-4 md:p-0">
            <li className="relative">
              <button onClick={toggleSubmenu} className="flex items-center space-x-1 hover:text-blue-500">
                Home <FiChevronDown />
              </button>
              {isSubmenuOpen && (
                <ul className="absolute top-full left-0 w-full md:w-auto bg-white shadow rounded z-10">
                  <li><Link to="/about" className="block w-full text-center md:text-left px-4 py-2 hover:text-blue-500">About</Link></li>
                  <li><Link to="/work-packages" className="block w-full text-center md:text-left px-4 py-2 hover:text-blue-500">Work Packages</Link></li>
                  <li><Link to="/partners" className="block w-full text-center md:text-left px-4 py-2 hover:text-blue-500">Partners</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/news" className="block w-full text-center md:text-left py-2 px-3 hover:text-blue-500">News</Link></li>
            <li><Link to="/living-labs" className="block w-full text-center md:text-left py-2 px-3 hover:text-blue-500">Living Labs</Link></li>
            <li><Link to="/resources" className="block w-full text-center md:text-left py-2 px-3 hover:text-blue-500">Resources</Link></li>
            <li><Link to="/knowledge-cloud" className="block w-full text-center md:text-left py-2 px-3 hover:text-blue-500">Knowledge Cloud</Link></li>
            <li><Link to="/contact" className="block w-full text-center md:text-left py-2 px-3 hover:text-blue-500">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;