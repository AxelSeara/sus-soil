import React from 'react';

const Colaboradores = () => {
  // Array to represent 27 placeholders for logos
  const logos = new Array(27).fill(0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-6 font-serif">Collaborators</h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-9">
        {logos.map((_, index) => (
          <div key={index} className="bg-gray-200 flex items-center justify-center p-4 rounded">
            <svg className="h-10 w-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <rect width="100%" height="100%" />
              <text fill="#000000" fontSize="12" dy="10.5" x="50%" y="50%" textAnchor="middle">Logo</text>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colaboradores;