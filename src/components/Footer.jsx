import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/1lineLogo.svg'; // Ruta actualizada para el nuevo logo

const Footer = () => {
  return (
    <footer className="bg-lightGreen">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div>
          <Link to="/">
            <img src={logo} alt="SUS-SOIL Logo" className="h-12" />
          </Link>
        </div>
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="list-none space-y-2">
            <li><Link to="/about" className="text-brown hover:text-green-700 transition duration-300">About Us</Link></li>
            <li><Link to="/news" className="text-brown hover:text-green-700 transition duration-300">News</Link></li>
            <li><Link to="/contact" className="text-brown hover:text-green-700 transition duration-300">Contact</Link></li>
            <li><Link to="/resources" className="text-brown hover:text-green-700 transition duration-300">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Social Media</h3>
          <ul className="flex space-x-4">
            <li><a href="https://facebook.com" className="text-brown hover:text-green-700 transition duration-300"><FaFacebookF /></a></li>
            <li><a href="https://twitter.com" className="text-brown hover:text-green-700 transition duration-300"><FaTwitter /></a></li>
            <li><a href="https://linkedin.com" className="text-brown hover:text-green-700 transition duration-300"><FaLinkedinIn /></a></li>
            <li><a href="https://youtube.com" className="text-brown hover:text-green-700 transition duration-300"><FaYoutube /></a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-brown text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 border border-brown rounded-lg text-brown focus:outline-none focus:ring-2 focus:ring-green-700" />
            <button type="submit" className="bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-brown pt-4">
        <p className="text-brown text-sm">© {new Date().getFullYear()} SUS-SOIL. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
