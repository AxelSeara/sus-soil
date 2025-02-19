// src/pages/Resources/PracticeAbstracts.jsx
import React from 'react';

export default function PracticeAbstracts() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        Practice Abstracts
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Practice Abstracts are short summaries of practical information. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Praesent rhoncus nisi sit amet dui tempus blandit.
        </p>
        <p className="text-gray-700 leading-relaxed">
          These abstracts are designed to be easily digestible and shareable 
          among various stakeholders, enabling quick knowledge transfer.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li>Concise format for quick reading</li>
          <li>Clear action points or recommendations</li>
          <li>Relevant for farmers, advisors, or policymakers</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Aliquam erat volutpat. Morbi volutpat ex mi, vel fermentum nibh 
          consequat in. Donec vulputate mi sit amet mattis lacinia.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">
          How to Contribute
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have a best practice or case study, you can submit it to 
          our Practice Abstract library. Nulla at metus in leo bibendum 
          tempus eget non arcu.
        </p>
      </section>
    </div>
  );
}