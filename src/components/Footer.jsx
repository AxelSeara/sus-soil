// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaNewspaper,
  FaFlask,
  FaBookOpen,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Icono Twitter/X
import susSoilLogo from '../assets/logo.png';
import euLogo from '../assets/funded-ue-300x61.png';

// Quick Links
const quickLinks = [
  { to: '/', label: 'Home', Icon: FaHome },
  { to: '/project/work-packages', label: 'Project', Icon: FaTasks },
  { to: '/news', label: 'News', Icon: FaNewspaper },
  { to: '/living-labs', label: 'Living Labs', Icon: FaFlask },
  { to: '/resources', label: 'Resources', Icon: FaBookOpen },
  { to: '/contact', label: 'Contact', Icon: FaEnvelope },
];

// Redes sociales
const socialLinks = [
  { href: 'https://facebook.com', Icon: FaFacebookF },
  { href: 'https://x.com', Icon: FaXTwitter },
  { href: 'https://linkedin.com', Icon: FaLinkedinIn },
  { href: 'https://youtube.com', Icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-300">
      {/* Pre-Footer: fondo blanco con logos + disclaimer UE */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto flex flex-col items-center">
          {/* Logos en fila */}
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-16 mb-4">
            <img
              src={susSoilLogo}
              alt="SUS-SOIL Logo"
              className="h-36 w-auto"
            />
            <img
              src={euLogo}
              alt="Funded by the EU"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-xs text-gray-700 leading-snug max-w-3xl font-sans text-center">
            This project has received funding from the European Union’s Horizon Europe 
            research and innovation programme under grant agreement No GA 101157560. Views 
            and opinions expressed are however those of the author(s) only and do not 
            necessarily reflect those of the European Union. Neither the European Union 
            nor the granting authority can be held responsible for them.
          </p>
        </div>
      </div>

      {/* Footer principal: fondo lightGreen */}
      <div className="bg-lightGreen px-6 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-brown text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-brown hover:text-darkGreen transition duration-300"
                  >
                    <link.Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-brown text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown hover:text-darkGreen transition duration-300"
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-brown text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-brown rounded-lg text-brown 
                           focus:outline-none focus:ring-2 focus:ring-darkGreen"
              />
              <button
                type="submit"
                className="bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 
                           transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="text-center mt-8 border-t border-brown pt-4 pb-2">
          <p className="text-brown text-sm">
            © {new Date().getFullYear()} SUS-SOIL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}