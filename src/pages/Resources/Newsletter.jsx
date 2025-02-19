// src/pages/Resources/Newsletter.jsx
import React from 'react';

export default function Newsletter() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        Newsletter
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Latest Updates
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our newsletter keeps you informed about recent developments. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Fusce volutpat ullamcorper magna, non ultrices ante accumsan quis.
        </p>
        <div className="bg-lightGreen p-4 rounded shadow-sm text-brown">
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <p className="text-sm">
            Enter your email to get updates directly in your inbox.
          </p>
          <form className="mt-2 flex space-x-2">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded focus:outline-none"
            />
            <button className="bg-brown text-white px-4 py-2 rounded hover:bg-opacity-90">
              Sign Up
            </button>
          </form>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Newsletter Archive
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Access past issues of our newsletter here:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Newsletter #1 - January</li>
          <li>Newsletter #2 - March</li>
          <li>Newsletter #3 - June</li>
          <li>Newsletter #4 - September</li>
        </ul>
      </section>
    </div>
  );
}