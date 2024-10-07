import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'; // Restored original Twitter icon

const Footer = () => {
  return (
    <footer className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <Link to="/" className="text-gray-800 text-xl font-bold font-serif">SUS-SOIL</Link> {/* Font applied */}
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-gray-800 text-lg font-semibold">Quick Links</h3>
          <ul className="list-none">
            <li><Link to="/about" className="text-gray-600 hover:text-blue-500 transition duration-300">About Us</Link></li>
            <li><Link to="/news" className="text-gray-600 hover:text-blue-500 transition duration-300">News</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-blue-500 transition duration-300">Contact</Link></li>
            <li><Link to="/resources" className="text-gray-600 hover:text-blue-500 transition duration-300">Resources</Link></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-gray-800 text-lg font-semibold">Social Media</h3>
          <ul className="flex space-x-4">
            <li><a href="https://facebook.com" className="text-gray-600 hover:text-green-500 transition duration-300"><FaFacebookF /></a></li>
            <li><a href="https://twitter.com" className="text-gray-600 hover:text-green-500 transition duration-300"><FaTwitter /></a></li>
            <li><a href="https://linkedin.com" className="text-gray-600 hover:text-green-500 transition duration-300"><FaLinkedinIn /></a></li>
            <li><a href="https://youtube.com" className="text-gray-600 hover:text-green-500 transition duration-300"><FaYoutube /></a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-800 text-lg font-semibold">Join Our Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 border rounded-lg" />
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center mt-4 border-t border-gray-300 pt-4">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} University XYZ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;