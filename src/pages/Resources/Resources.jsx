// src/pages/Resources/Resources.jsx
import React from 'react';

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        Resources Overview
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to our Resources Overview! Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Vestibulum lacinia, neque in ultricies 
          venenatis, dui justo feugiat risus, eget ultricies quam ipsum ac justo.
        </p>
        <p className="text-gray-700 leading-relaxed">
          In this section, you will find various materials, practice abstracts, 
          and newsletters related to our project. Feel free to explore and 
          download any resources that may help you in your work.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Why Resources Matter
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Resources are essential for sharing knowledge and best practices. 
          Morbi imperdiet, ex eget laoreet interdum, felis ex sollicitudin sem, 
          quis dignissim velit turpis a turpis. Praesent scelerisque, nibh et 
          tempus tincidunt, massa ante porta dui, non finibus enim massa vel erat.
        </p>
        <div className="bg-lightGreen p-4 rounded shadow-sm text-brown">
          <h3 className="font-bold mb-2">Key Benefits</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Faster knowledge transfer</li>
            <li>Better collaboration among stakeholders</li>
            <li>Improved project outcomes</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Next Steps
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You can visit each dedicated section for more detailed resources. 
          Head over to Materials, Practice Abstracts, or Newsletter to find 
          exactly what you need.
        </p>
      </section>
    </div>
  );
}