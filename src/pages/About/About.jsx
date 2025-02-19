// src/pages/About/About.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Simple arrow icon that rotates when toggled
function ArrowIcon({ direction = 'down' }) {
  return (
    <svg
      className={`w-4 h-4 transform transition-transform duration-200 ${
        direction === 'up' ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// A reusable collapsible component
function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-lightGreen p-4 rounded shadow-sm mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-brown font-semibold text-left focus:outline-none"
      >
        <span>{title}</span>
        <ArrowIcon direction={open ? 'up' : 'down'} />
      </button>
      {open && (
        <div className="mt-2 text-brown">
          {children}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const location = useLocation();

  // Scroll to the hashed section on mount or when the hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page title with margin to avoid overlap */}
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        About Page
      </h1>

      {/* SECTION 1: About */}
      <section id="about-section" className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">About</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed 
          ante ut arcu tempus convallis. Nulla semper cursus faucibus. 
          Mauris tempor tincidunt arcu, a suscipit nulla pellentesque eu. 
          Vestibulum at sem augue. Pellentesque blandit, ex sed dictum vulputate, 
          ex urna porttitor sem, a accumsan dui magna vel quam.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Curabitur pharetra, diam non convallis viverra, sapien felis luctus dui, 
          ac lacinia est orci non sem. Pellentesque luctus ultricies neque, sed 
          vulputate libero pulvinar ac. Nulla facilisi. Nam rhoncus velit eget 
          hendrerit varius. Morbi aliquet nulla eu felis lobortis, nec vehicula 
          lorem ultricies.
        </p>
      </section>

      {/* SECTION 2: Work Packages */}
      <section id="work-packages" className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Work Packages</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Suspendisse potenti. Vestibulum sed ultrices libero. 
          Praesent ornare sapien sed nunc vehicula, non tincidunt nisi varius. 
          Sed vel accumsan lorem. Curabitur sodales euismod magna, vel feugiat 
          justo consequat quis. Nullam pharetra, lorem a rhoncus vulputate, 
          diam augue semper enim, a vehicula ipsum erat at sem.
        </p>

        {/* Slide placeholders */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <div className="w-72 h-48 bg-gray-300 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Slide 1
          </div>
          <div className="w-72 h-48 bg-gray-300 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Slide 2
          </div>
          <div className="w-72 h-48 bg-gray-300 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Slide 3
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-6">
          Pellentesque sit amet magna sit amet nulla ultrices pretium. 
          Suspendisse non lacus accumsan, egestas nulla vel, rutrum dui. 
          Donec dapibus, odio eu malesuada iaculis, ipsum nisi vestibulum velit, 
          eu luctus metus augue sit amet est.
        </p>
      </section>

      {/* SECTION 3: Partners */}
      <section id="partners" className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Partners</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Below are some of our partner institutions...
        </p>

        {/* Partner logo placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-300 w-full h-20 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Logo 1
          </div>
          <div className="bg-gray-300 w-full h-20 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Logo 2
          </div>
          <div className="bg-gray-300 w-full h-20 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Logo 3
          </div>
          <div className="bg-gray-300 w-full h-20 flex items-center justify-center text-gray-600 font-semibold rounded shadow-md">
            Logo 4
          </div>
        </div>
      </section>

      {/* COLLAPSIBLE SECTION with arrow icon, lightGreen background, brown text */}
      <Collapsible title="Additional Info">
        <p className="mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et 
          venenatis lectus. Vestibulum fermentum quam nec urna pulvinar, 
          quis rhoncus quam ultrices.
        </p>
        <p className="mb-2">
          Sed porta, enim at consectetur consequat, lectus nunc dictum ex, 
          vel luctus quam diam ut leo. Aenean eu finibus diam. Phasellus sed 
          orci dolor. Vestibulum pharetra cursus ligula, et finibus sem 
          sollicitudin a.
        </p>
        <p>
          Integer non eros tristique, tristique lacus vitae, egestas libero. 
          Praesent sed risus nec quam rutrum fermentum.
        </p>
      </Collapsible>
    </div>
  );
}