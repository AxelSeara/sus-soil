import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiUser, FiMail, FiMessageCircle, FiCheckSquare } from 'react-icons/fi';

// X (Twitter) icon component
function XIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.3,2.3L12,10l7.7-7.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3c0.4,0.4,0.4,1,0,1.4L14,12l7.7,7.7c0.4,0.4,0.4,1,0,1.4l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0L12,14l-7.7,7.7c-0.4,0.4-1,0.4-1.4,0L1.6,20.3c-0.4-0.4-0.4-1,0-1.4L9.3,12L1.6,4.3c-0.4-0.4-0.4-1,0-1.4l1.3-1.3C3.3,1.9,3.9,1.9,4.3,2.3z" />
    </svg>
  );
}

// Animation effect for fade-in
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agree) {
      console.log(formData);
      setSubmitted(true);
    } else {
      alert('Please agree to the terms.');
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Contact Information & Socials */}
        <motion.div 
          className="text-center lg:text-left" 
          variants={fadeInVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-brown mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-brown mb-6 max-w-xl mx-auto lg:mx-0">
            If you have any questions, feel free to contact us at{' '}
            <a href="mailto:contact@example.com" className="text-darkGreen hover:underline">
              contact@example.com
            </a>. You can also find us on social media:
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start space-x-6 mb-8">
            <a
              href="https://facebook.com"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter (X)"
            >
              <XIcon size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 mt-16 rounded-lg shadow-lg w-full"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Your Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Your Message
            </label>
            <div className="relative">
              <FiMessageCircle className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-darkGreen"
            />
            <label htmlFor="agree" className="ml-2 text-sm font-medium text-gray-900">
              <FiCheckSquare className="inline-block mr-1" />
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-darkGreen text-white py-3 rounded-lg font-bold text-lg hover:bg-green-800 focus:ring-2 focus:ring-darkGreen transition-colors"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;