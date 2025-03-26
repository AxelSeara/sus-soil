// src/pages/Resources/Resources.jsx
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

export default function ResourcesAndKnowledgeCloud() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDocs = pdfDocs.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      {/* RESOURCES SECTION */}
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mb-8">
        Resources Overview
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Introduction</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to our Resources Overview! Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vestibulum lacinia, neque in ultricies venenatis, dui justo
          feugiat risus, eget ultricies quam ipsum ac justo.
        </p>
        <p className="text-gray-700 leading-relaxed">
          In this section, you will find various materials, practice abstracts, and newsletters
          related to our project. Feel free to explore and download any resources that may help
          you in your work.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Why Resources Matter</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Resources are essential for sharing knowledge and best practices. Morbi imperdiet, ex
          eget laoreet interdum, felis ex sollicitudin sem, quis dignissim velit turpis a turpis.
        </p>
        <div className="bg-lightGreen p-4 rounded shadow-sm text-brown mb-4">
          <h3 className="font-bold mb-2">Key Benefits</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Faster knowledge transfer</li>
            <li>Better collaboration among stakeholders</li>
            <li>Improved project outcomes</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          You can visit each dedicated section for more detailed resources. Head over to
          Materials, Practice Abstracts, or Newsletter to find exactly what you need.
        </p>
      </section>

      <hr className="border-gray-300 mb-16" />

      {/* KNOWLEDGE CLOUD SECTION */}
      <div className="min-h-screen bg-lightGreen text-brown flex flex-col">
        <div className="container mx-auto px-4 py-16 flex-1">
          <h1 className="mt-16 text-5xl font-bold font-serif text-center mb-8">
            Knowledge Cloud
          </h1>
          <p className="text-center text-lg max-w-2xl mx-auto mb-12">
            Welcome to the Knowledge Cloud! Here you can find a variety of documents, PDFs, and other
            resources related to our project. Feel free to browse or search for specific files below.
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
                      <td className="px-4 py-2 text-sm text-gray-700">{doc.description}</td>
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
                    <td colSpan="3" className="px-4 py-4 text-center text-gray-700">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white py-4 text-center">
          <p className="text-sm text-brown">
            &copy; {new Date().getFullYear()} Knowledge Cloud
          </p>
        </div>
      </div>
    </div>
  );
}