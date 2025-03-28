// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiUser, FiMail, FiMessageCircle } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6'; // Twitter/X icon

// Fade-in animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir el enlace mailto con subject y body
    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:mrosa.mosquera.losada@usc.es?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Contact Info & Social Links */}
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
          <p className="text-lg text-brown mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            If you have any questions, feel free to contact us at{' '}
            <a 
              href="mailto:mrosa.mosquera.losada@usc.es" 
              className="text-darkGreen hover:underline"
            >
              mrosa.mosquera.losada@usc.es
            </a>. You can also find us on social media:
          </p>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start space-x-6 mb-8">
            <a
              href="https://www.facebook.com/SUSSOIL/"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/SUSSOIL"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter (X)"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/sus-soil"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/@sus-soil"
              className="text-brown hover:text-darkGreen text-2xl transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full"
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

          <button
            type="submit"
            className="w-full bg-darkGreen text-white py-3 rounded-lg font-bold text-lg hover:bg-green-800 focus:ring-2 focus:ring-darkGreen transition-colors"
          >
            Submit
          </button>

          {submitted && (
            <p className="text-center mt-4 text-green-700 font-semibold">
              Your message has been sent successfully!
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}