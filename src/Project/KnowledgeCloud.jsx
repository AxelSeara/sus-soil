// src/pages/KnowledgeCloud/KnowledgeCloud.jsx
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

// Example PDF placeholder data
const pdfDocs = [
  {
    id: 1,
    name: 'Project Overview',
    description: 'A summary of the entire project scope',
    link: '#',
  },
  {
    id: 2,
    name: 'Technical Guidelines',
    description: 'Detailed instructions for technical aspects',
    link: '#',
  },
  {
    id: 3,
    name: 'Research Findings',
    description: 'Preliminary data on soil health metrics',
    link: '#',
  },
];

export default function KnowledgeCloud() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic (basic example)
  const filteredDocs = pdfDocs.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-lightGreen text-brown flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        {/* Title / Hero */}
        <h1 className="mt-16 text-5xl font-bold font-serif text-center mb-8">
          Knowledge Cloud
        </h1>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Welcome to the Knowledge Cloud! Here you can find a variety of 
          documents, PDFs, and other resources related to our project. 
          Feel free to browse or search for specific files below.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold">12</span>
            <p className="text-sm">Total PDFs</p>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold">5</span>
            <p className="text-sm">New Uploads</p>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-extrabold">20+</span>
            <p className="text-sm">Collaborators</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brown"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-brown text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Table of PDFs */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded shadow-md">
            <thead className="bg-brown text-white">
              <tr>
                <th className="px-4 py-2 text-left">Document Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-lightGreen/40">
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {doc.description}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <a
                        href={doc.link}
                        className="inline-flex items-center bg-brown text-white px-3 py-1 rounded hover:bg-opacity-80 transition-colors"
                      >
                        <FiDownload className="mr-1" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-4 text-center text-gray-700"
                  >
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer or Additional Info */}
      <div className="bg-white py-4 text-center">
        <p className="text-sm text-brown">
          &copy; {new Date().getFullYear()} Knowledge Cloud
        </p>
      </div>
    </div>
  );
}