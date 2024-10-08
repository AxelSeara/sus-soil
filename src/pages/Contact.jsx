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
    <div className="container mx-auto px-4 py-12 ">
      <h1 className="text-3xl font-bold text-center mb-6 mt-16">Contact Page</h1>
      <p className="text-center mb-4">
        If you have any questions, feel free to contact us at <a href="mailto:contact@example.com" className="text-green-700 hover:underline">contact@example.com</a>.
        You can also find us on social media:
      </p>
      <div className="flex justify-center space-x-4 mb-6">
        <a href="https://facebook.com" className="text-green-700 hover:text-green-800"><FaFacebookF /></a>
        <a href="https://twitter.com" className="text-green-700 hover:text-green-800"><FaTwitter /></a>
        <a href="https://youtube.com" className="text-green-700 hover:text-green-800"><FaYoutube /></a>
      </div>
      <form class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
  <div class="mb-6">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="John Doe" required />
  </div>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="name@example.com" required />
  </div>
  <div class="mb-6">
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
    <textarea id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" rows="4" placeholder="Write your message here..." required></textarea>
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500" required />
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-gray-900">I agree to the terms and conditions</label>
  </div>
  <button type="submit" class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
</form>
      {submitted && <p className="text-center mt-4 text-green-500">Your message has been sent successfully!</p>}
    </div>
  );
};

export default Contact;