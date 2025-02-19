// src/pages/Resources/Materials.jsx
import React from 'react';

export default function Materials() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        Materials
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Overview of Materials
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to the Materials section. Here you will find documents, 
          guides, and other files that support our project. Lorem ipsum 
          dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Nullam vehicula lorem at odio facilisis vehicula. Suspendisse non 
          lorem sed sem hendrerit fringilla. Aliquam erat volutpat.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Types of Materials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-300 p-4 rounded shadow-md">
            <h3 className="text-brown font-semibold mb-2">Reports</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Detailed analyses, project updates, or final results.
            </p>
          </div>
          <div className="bg-gray-300 p-4 rounded shadow-md">
            <h3 className="text-brown font-semibold mb-2">Guidelines</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Step-by-step instructions for best practices or procedures.
            </p>
          </div>
          <div className="bg-gray-300 p-4 rounded shadow-md">
            <h3 className="text-brown font-semibold mb-2">Flyers</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Quick reference sheets or promotional materials.
            </p>
          </div>
          <div className="bg-gray-300 p-4 rounded shadow-md">
            <h3 className="text-brown font-semibold mb-2">Case Studies</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Real-world examples highlighting successes or lessons learned.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Download Instructions
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All materials can be downloaded by clicking on the respective 
          links. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed et dolor vel enim ullamcorper finibus.
        </p>
      </section>
    </div>
  );
}