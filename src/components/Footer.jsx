// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { XIcon } from './XIcon'; // Ajusta la ruta si lo separaste en un componente
import susSoilLogo from '../assets/logo.png'; // Ajusta la ruta a tu logo SUS-SOIL
import euLogo from '../assets/funded-ue-300x61.png'; // Ajusta la ruta a tu logo de la UE

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-darkGreen">
      {/* ===========================
          PREFOOTER SECTION
          =========================== */}
    <div className="bg-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center">
        {/* Columna 1: Logo SUS-SOIL */}
        <div className="flex flex-col items-center">
          {/* Ajusta h-40 si deseas un tamaño mayor para el logo SUS-SOIL */}
          <img
            src={susSoilLogo}
            alt="SUS-SOIL Logo"
            className="h-40 w-auto mb-4"
          />
        </div>

        {/* Columna 2: Logo UE + texto de soporte */}
        <div className="flex flex-col items-center">
          {/* Logo UE más pequeño (por ejemplo, h-16) */}
          <img
            src={euLogo}
            alt="Funded by the EU"
            className="h-16 w-auto mb-2"
          />
          {/* Texto más pequeño (text-sm), centrado y con ancho máximo ajustable */}
          <p className="text-xs text-gray-700  leading-snug max-w-[310px]">
            Views and opinions expressed are however those of the author(s) only and do not necessarily reflect 
            those of the European Union or the European Research Executive Agency – EREA. Neither the European 
            Union nor the granting authority can be held responsible for them. Grant agreement ID: 101061051
          </p>
        </div>
      </div>
    </div>

      {/* ===========================
          MAIN FOOTER SECTION
          =========================== */}
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
        {/* Quick Links */}
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="list-none space-y-2">
            <li>
              <Link to="/" className="text-brown hover:text-darkGreen transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-brown hover:text-darkGreen transition duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/living-labs" className="text-brown hover:text-darkGreen transition duration-300">
                Living Labs
              </Link>
            </li>
            <li>
              <Link to="/resources" className="text-brown hover:text-darkGreen transition duration-300">
                Resources
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media y News & Events */}
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Social Media</h3>
          <ul className="flex space-x-4 mb-4">
            <li>
              <a
                href="https://facebook.com"
                className="text-brown hover:text-darkGreen transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                className="text-brown hover:text-darkGreen transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon size={16} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="text-brown hover:text-darkGreen transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                className="text-brown hover:text-darkGreen transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
          {/* Sección: News and Events */}
          <div>
            <h3 className="text-brown text-lg font-semibold mb-2">News and Events</h3>
            <ul className="list-none space-y-2">
              <li>
                <Link to="/news" className="text-brown hover:text-darkGreen transition duration-300">
                  News
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-brown hover:text-darkGreen transition duration-300">
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-brown rounded-lg text-brown focus:outline-none focus:ring-2 focus:ring-darkGreen"
            />
            <button
              type="submit"
              className="bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center mt-8 border-t border-brown pt-4">
        <p className="text-brown text-sm">
          © {new Date().getFullYear()} SUS-SOIL. All rights reserved.
        </p>
        <p className="text-brown text-sm mt-2">
          Website designed by{" "}
          <a
            href="https://www.axels.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-darkGreen"
          >
            Axel S
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;