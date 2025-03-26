// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg'; // Ajusta la ruta real

export default function Navbar() {
  // Menú móvil
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dropdowns en desktop
  const [projectOpen, setProjectOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const projectRef = useRef(null);
  const resourcesRef = useRef(null);

  // Overflow hidden si el menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  // Cerrar dropdowns si clic afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (projectRef.current && !projectRef.current.contains(e.target)) {
        setProjectOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Items dropdown
  const projectItems = [
    { to: '/project/about', label: 'About' },
    { to: '/project/work-packages', label: 'Work Packages' },
    { to: '/project/partners', label: 'Partners' },
  ];

  // Nota: Se comenta la línea de 'Overview'
  const resourcesItems = [
    // { to: '/resources', label: 'Overview' }, 
    { to: '/resources/materials', label: 'Materials' },
    { to: '/resources/practice-abstracts', label: 'Practice Abstracts' },
    { to: '/resources/newsletter', label: 'Newsletter' },
  ];

  // Clases base
  const navLinkClass =
    "text-brown text-sm lg:text-base font-medium hover:text-darkGreen transition-colors";

  // Contenedor dropdown (desktop)
  const dropdownContainerClass =
    "absolute left-0 top-full mt-2 bg-white text-brown rounded-md shadow-lg border border-gray-200 z-[1000] min-w-[200px] p-2";

  // Item dropdown (desktop)
  const dropdownItemClass =
    "block px-4 py-2 hover:bg-green hover:text-white transition-colors rounded-md";

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-[1000] bg-white border-b border-gray-300 shadow-md px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
        {/* Logo + Botón Menú Móvil */}
        <div className="flex justify-between w-full lg:w-auto">
          {/* LOGO local */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
          </Link>
          {/* Botón Menú móvil */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-500 rounded-md hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 
                       transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desktop */}
        <div className="hidden lg:flex lg:pl-8">
          <ul className="flex items-center gap-6">
            {/* Home */}
            <li>
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
            </li>

            {/* Project (dropdown) */}
            <li className="relative" ref={projectRef}>
              <button
                onClick={() => setProjectOpen(!projectOpen)}
                className={`${navLinkClass} flex items-center`}
              >
                Project
                <FiChevronDown className="ml-1.5 w-4 h-4" />
              </button>
              {projectOpen && (
                <div className={dropdownContainerClass}>
                  {projectItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className={dropdownItemClass}
                      onClick={() => setProjectOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Living labs */}
            <li>
              <Link to="/living-labs" className={navLinkClass}>
                Living Labs
              </Link>
            </li>

            {/* Resources (dropdown) */}
            <li className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`${navLinkClass} flex items-center`}
              >
                Resources
                <FiChevronDown className="ml-1.5 w-4 h-4" />
              </button>
              {resourcesOpen && (
                <div className={dropdownContainerClass}>
                  {resourcesItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className={dropdownItemClass}
                      onClick={() => setResourcesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* News */}
            <li>
              <Link to="/news" className={navLinkClass}>
                News
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link to="/contact" className={navLinkClass}>
                Contact
              </Link>
            </li>

            {/* Social Icons */}
            <li className="flex items-center space-x-4 ml-4">
              <a
                href="https://facebook.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://youtube.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md
                     flex flex-col z-50"
        >
          <ul className="flex flex-col gap-4 p-4">
            {/* HOME */}
            <li>
              <Link
                to="/"
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Project - dropdown en móvil */}
            <li>
              <button
                onClick={() => setProjectOpen(!projectOpen)}
                className={`${navLinkClass} flex items-center justify-between w-full`}
              >
                <span>Project</span>
                <FiChevronDown className="ml-1.5 w-4 h-4" />
              </button>
              {projectOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="flex flex-col">
                    {projectItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={item.to}
                          className="block px-4 py-2 text-brown hover:bg-green hover:text-white transition-colors"
                          onClick={() => {
                            setProjectOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Living Labs */}
            <li>
              <Link
                to="/living-labs"
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Living Labs
              </Link>
            </li>

            {/* Resources - dropdown en móvil */}
            <li>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`${navLinkClass} flex items-center justify-between w-full`}
              >
                <span>Resources</span>
                <FiChevronDown className="ml-1.5 w-4 h-4" />
              </button>
              {resourcesOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="flex flex-col">
                    {resourcesItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={item.to}
                          className="block px-4 py-2 text-brown hover:bg-green hover:text-white transition-colors"
                          onClick={() => {
                            setResourcesOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* News */}
            <li>
              <Link
                to="/news"
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                News
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </li>

            {/* Social Icons */}
            <li className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://youtube.com"
                className="text-brown hover:text-darkGreen transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}