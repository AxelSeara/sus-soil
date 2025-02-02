// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
// Se utiliza el logo desde src/assets/logo.png
import logo from '../assets/1lineLogo.svg';

/**
 * Componente personalizado para el ícono de X (Twitter).
 * Utiliza un SVG simple en forma de X. 
 */
const XIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.3,2.3L12,10l7.7-7.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3c0.4,0.4,0.4,1,0,1.4L14,12l7.7,7.7c0.4,0.4,0.4,1,0,1.4l-1.3,1.3
      c-0.4,0.4-1,0.4-1.4,0L12,14l-7.7,7.7c-0.4,0.4-1,0.4-1.4,0L1.6,20.3c-0.4-0.4-0.4-1,0-1.4L9.3,12L1.6,4.3c-0.4-0.4-0.4-1,0-1.4
      l1.3-1.3C3.3,1.9,3.9,1.9,4.3,2.3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-green-200">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="SUS-SOIL Logo" className="h-12" />
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="list-none space-y-2">
            <li>
              <Link to="/" className="text-brown hover:text-green-700 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-brown hover:text-green-700 transition duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/living-labs" className="text-brown hover:text-green-700 transition duration-300">
                Living Labs
              </Link>
            </li>
            <li>
              <Link to="/resources" className="text-brown hover:text-green-700 transition duration-300">
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
                className="text-brown hover:text-green-700 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                className="text-brown hover:text-green-700 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon size={16} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="text-brown hover:text-green-700 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                className="text-brown hover:text-green-700 transition duration-300"
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
                <Link to="/news" className="text-brown hover:text-green-700 transition duration-300">
                  News
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-brown hover:text-green-700 transition duration-300">
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
              className="px-4 py-2 border border-brown rounded-lg text-brown focus:outline-none focus:ring-2 focus:ring-green-700"
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
            className="underline hover:text-green-700"
          >
            Axel S
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;