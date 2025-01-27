import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'; // Importa los íconos de FontAwesome

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agree) {
      console.log(formData); // Implement here your submit logic (e.g., API call)
      setSubmitted(true);
    } else {
      alert('Please agree to the terms.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-brown font-serif">Contact Us</h1>
      <p className="text-center mb-6 text-brown">
        If you have any questions, feel free to contact us at <a href="mailto:contact@example.com" className="text-green-700 hover:underline">contact@example.com</a>.
        You can also find us on social media:
      </p>
      <div className="flex justify-center space-x-6 mb-8">
        <a href="https://facebook.com" className="text-green-700 hover:text-green-800 text-2xl"><FaFacebookF /></a>
        <a href="https://twitter.com" className="text-green-700 hover:text-green-800 text-2xl"><FaTwitter /></a>
        <a href="https://youtube.com" className="text-green-700 hover:text-green-800 text-2xl"><FaYoutube /></a>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-700"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-700"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-700"
            rows="4"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-green-700"
            />
          </div>
          <label htmlFor="agree" className="ml-2 text-sm font-medium text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-800 focus:ring-2 focus:ring-green-700 transition-colors"
        >
          Submit
        </button>
      </form>

      {submitted && <p className="text-center mt-6 text-green-700">Your message has been sent successfully!</p>}
    </div>
  );
};

export default Contact;
