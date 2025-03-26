import React from 'react';

export default function Newsletter() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl text-brown">
      {/* Título principal */}
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
        Newsletter
      </h1>

      {/* Breve descripción */}
      <p className="text-lg leading-relaxed mb-10">
        Stay up to date with our latest news, project milestones, and events. 
        Subscribe to our newsletter and never miss an update!
      </p>

      {/* Sección de archivo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-serif mb-4">
          Newsletter Archive
        </h2>
        <p className="text-gray-700 mb-4">
          Access past issues of our newsletter here:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
          <li>Newsletter #1 - January</li>
          <li>Newsletter #2 - March</li>
          <li>Newsletter #3 - June</li>
          <li>Newsletter #4 - September</li>
        </ul>
      </section>

      {/* Sección 'coming soon' */}
      <section className="mb-16">
        <h3 className="text-xl font-semibold font-serif mb-2">
          Coming Soon
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We will share all SUS-SOIL newsletter issues soon. Stay tuned!
        </p>
      </section>

      {/* Formulario de suscripción */}
      <section className="p-6 bg-lightGreen rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 font-serif">
          Subscribe
        </h3>
        <p className="text-sm text-brown">
          Enter your email to get updates directly in your inbox:
        </p>
        <form 
          className="mt-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            // Lógica de suscripción
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-3 py-2 rounded focus:outline-none focus:ring-2 
                       focus:ring-darkGreen border border-brown"
            required
          />
          <button
            type="submit"
            className="bg-brown text-white px-6 py-2 rounded hover:bg-opacity-90
                       transition-colors"
          >
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}