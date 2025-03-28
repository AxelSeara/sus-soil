import React from 'react';

export default function Newsletter() {
  return (
    <div className="bg-gradient-to-b from-lightGreen to-white py-20 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start text-brown">
        {/* Texto e información */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Newsletter
          </h1>
          <p className="text-lg leading-relaxed mb-10">
            Stay up to date with our latest news, project milestones, and events. 
            Subscribe to our newsletter and never miss an update!
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-bold font-serif mb-4">
              Newsletter Archive
            </h2>
            <p className="text-gray-700 mb-4">
              Newsletter issues will be available soon. In the future, this section will be updated with past issues.
            </p>
            <div className="p-4 border border-dashed border-brown/50 bg-white rounded text-center text-gray-500 italic">
              (Placeholder: Newsletter Archive)
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold font-serif mb-2">Coming Soon</h3>
            <p className="text-gray-700 leading-relaxed">
              We will share all SUS-SOIL newsletter issues soon. Stay tuned!
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-brown/10">
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Join Our Mailing List
          </h3>
          <p className="text-sm text-brown mb-6">
            Click the button below to sign up and receive project updates:
          </p>
          <a
            href="https://gmail.us11.list-manage.com/subscribe?u=6fbd6e1c74aa5e4a311896dcc&id=826cb744b4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown hover:bg-opacity-80 text-white font-semibold px-6 py-3 rounded-full text-center transition-all"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
}