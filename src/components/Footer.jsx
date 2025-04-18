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
import bgImage from '../assets/bg2.svg';

const quickLinks = [
  { to: '/', label: 'Home', Icon: FaHome },
  { to: '/project/work-packages', label: 'Project', Icon: FaTasks },
  { to: '/news', label: 'News', Icon: FaNewspaper },
  // { to: '/living-labs', label: 'Living Labs', Icon: FaFlask },
  // { to: '/resources', label: 'Resources', Icon: FaBookOpen },
  { to: '/contact', label: 'Contact', Icon: FaEnvelope },
];

const socialLinks = [
  { href: 'https://www.facebook.com/SUSSOIL/', Icon: FaFacebookF },
  { href: 'https://x.com/SUSSOIL', Icon: FaXTwitter },
  { href: 'https://www.linkedin.com/company/sus-soil', Icon: FaLinkedinIn },
  { href: 'https://www.youtube.com/@sus-soil', Icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-300">
      {/* Pre-Footer: Logos y disclaimer */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto flex flex-col items-center">
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
            research and innovation programme under grant agreement No GA 101157560. 
            Views and opinions expressed are however those of the author(s) only and 
            do not necessarily reflect those of the European Union. Neither the 
            European Union nor the granting authority can be held responsible for them.
          </p>
        </div>
      </div>

      {/* Footer inferior con fondo (bg2.svg) */}
      <div
        className="bg-cover bg-center bg-no-repeat px-6 py-12"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="container mx-auto">
          {/* Distribución en 3 columnas en desktop, 1 en móvil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-brown text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center gap-2 text-brown hover:text-white transition duration-300"
                  >
                    <link.Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter - Columna centrada */}
            <div className="flex flex-col items-center">
              <h3 className="text-brown text-lg font-semibold mb-4">
                Join Our Newsletter
              </h3>
              <a
                href="https://gmail.us11.list-manage.com/subscribe?u=6fbd6e1c74aa5e4a311896dcc&id=826cb744b4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300"
              >
                Subscribe
              </a>
            </div>

            {/* Follow Us - Columna centrada */}
            <div className="flex flex-col items-center">
              <h3 className="text-brown text-lg font-semibold mb-4">
                Follow Us
              </h3>
              <ul className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brown hover:text-white transition duration-300"
                    >
                      <social.Icon className="w-5 h-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pie de página */}
          <div className="text-center mt-8 border-t border-brown pt-4 pb-2">
            <p className="text-brown text-sm">
              © {new Date().getFullYear()} SUS-SOIL. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}