import React from 'react';

export default function Newsletter() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mb-8">
        Newsletter
      </h1>

      <section className="mb-16">
        <p className="text-gray-700 leading-relaxed mb-4">
          On this section we will share all SUS-SOIL newsletter numbers soon.
        </p>
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

      <section className="bg-lightGreen p-4 rounded shadow-sm text-brown">
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
      </section>
    </div>
  );
}
