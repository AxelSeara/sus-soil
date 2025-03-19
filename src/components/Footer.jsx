// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { XIcon } from './XIcon'; // If you have it in the same file, remove this import
import susSoilLogo from '../assets/logo.png'; // Adjust to your actual path
import euLogo from '../assets/funded-ue-300x61.png'; // Adjust to your actual path

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* ===========================
          PREFOOTER SECTION
          =========================== */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center">
          {/* Columna 1: Logo SUS-SOIL */}
          <div className="flex flex-col items-center">
            <img
              src={susSoilLogo}
              alt="SUS-SOIL Logo"
              className="h-40 w-auto mb-4"
            />
          </div>

          {/* Columna 2: Logo UE + texto de soporte */}
          <div className="flex flex-col items-center">
            <img
              src={euLogo}
              alt="Funded by the EU"
              className="h-16 w-auto mb-2"
            />
            <p className="text-xs text-gray-700 leading-snug max-w-[310px] font-sans">
            This project has received funding from the European Union’s Horizon Europe research and innovation programme under grant agreement No GA 101157560. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them
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
              <Link to="/about" className="text-brown hover:text-darkGreen transition duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/living-labs" className="text-brown hover:text-darkGreen transition duration-300">
                Living Labs
              </Link>
            </li>
            <li>
              <Link to="/knowledge-cloud" className="text-brown hover:text-darkGreen transition duration-300">
                Knowledge Cloud
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-brown hover:text-darkGreen transition duration-300">
                Contact
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
          {/* Sección: News & Events (combined into one link) */}
          <div>
            <h3 className="text-brown text-lg font-semibold mb-2">News & Events</h3>
            <ul className="list-none space-y-2">
              <li>
                <Link to="/news" className="text-brown hover:text-darkGreen transition duration-300">
                  News & Events
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

      </div>
    </footer>
  );
};

export default Footer;