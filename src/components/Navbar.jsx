// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const resourcesItems = [
    { to: '/resources', label: 'Overview' },
    { to: '/resources/materials', label: 'Materials' },
    { to: '/resources/practice-abstracts', label: 'Practice Abstracts' },
    { to: '/resources/newsletter', label: 'Newsletter' },
  ];

  // Clase base para los enlaces del navbar
  const navLinkClass =
    "text-brown text-sm lg:text-base font-medium hover:text-darkGreen transition-colors";
  
  // Contenedor de dropdown con ancho mínimo ajustado y padding extra
  const dropdownContainerClass =
    "absolute left-0 mt-2 bg-lightGreen text-brown rounded shadow-lg z-[1000] min-w-[300px] p-2";
  
  // Clase para cada opción del dropdown
  const dropdownItemClass =
    "block px-4 py-3 hover:bg-green hover:text-white transition-colors";

  return (
    <nav className="fixed z-[1000] border-b border-solid border-prime-gray-200 w-full py-3 bg-white">
      <div className="container mx-auto">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-14">
          <div className="flex justify-between w-full">
            <Link to="/" className="flex items-center">
              {/* Logo aumentado en aproximadamente un 20% */}
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
            <button 
              type="button"
              className="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden w-full lg:flex lg:pl-11" id="navbar-default">
            <ul className="flex lg:items-center flex-col lg:flex-row mt-4 lg:mt-0 gap-4 lg:gap-0">
              <li>
                <Link to="/" className={`${navLinkClass} mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`${navLinkClass} mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/living-labs" className={`${navLinkClass} mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  Living Labs
                </Link>
              </li>
              {/* Resources Dropdown using group hover */}
              <li className="relative group">
                <button className={`${navLinkClass} flex items-center justify-between mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  Resources <FiChevronDown className="w-3 h-3 ml-1.5" />
                </button>
                <div
                  className={`${dropdownContainerClass} opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200`}
                >
                  <ul>
                    {resourcesItems.map((item, index) => (
                      <li key={index}>
                        <Link to={item.to} className={dropdownItemClass}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/news" className={`${navLinkClass} mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${navLinkClass} mb-2 lg:mr-6 md:mb-0 md:mr-3`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="w-full lg:hidden mt-4" id="navbar-default">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/living-labs" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                    Living Labs
                  </Link>
                </li>
                <li className="relative">
                  <button 
                    className={`${navLinkClass} flex items-center justify-between w-full`} 
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  >
                    Resources <FiChevronDown className="w-3 h-3 ml-1.5" />
                  </button>
                  {mobileResourcesOpen && (
                    <div className="bg-lightGreen rounded shadow-lg mt-2 min-w-[300px] p-2">
                      <ul className="py-2">
                        {resourcesItems.map((item, index) => (
                          <li key={index}>
                            <Link 
                              to={item.to} 
                              className={dropdownItemClass}
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/news" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;