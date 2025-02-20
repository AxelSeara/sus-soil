// src/pages/About/About.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Colaboradores from '../Home/Colaboradores/Colaboradores';

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
      {open && <div className="mt-2 text-brown">{children}</div>}
    </div>
  );
}

// Simple automatic carousel for Work Packages
function Carousel() {
  const slides = [
    { id: 1, bgColor: 'green', text: 'Slide 1: Green placeholder' },
    { id: 2, bgColor: 'lightgreen', text: 'Slide 2: LightGreen placeholder' },
    { id: 3, bgColor: 'darkgreen', text: 'Slide 3: DarkGreen placeholder' },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded shadow-md">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xl font-bold transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: slide.bgColor }}
        >
          {slide.text}
        </div>
      ))}
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
          Suspendisse potenti. Vestibulum sed ultrices libero. Praesent ornare
          sapien sed nunc vehicula, non tincidunt nisi varius. Sed vel accumsan
          lorem. Curabitur sodales euismod magna, vel feugiat justo consequat quis.
          Nullam pharetra, lorem a rhoncus vulputate, diam augue semper enim, a
          vehicula ipsum erat at sem.
        </p>

        {/* Automatic Carousel */}
        <Carousel />

        <p className="text-gray-700 leading-relaxed mt-6">
          Pellentesque sit amet magna sit amet nulla ultrices pretium. Suspendisse
          non lacus accumsan, egestas nulla vel, rutrum dui. Donec dapibus, odio eu
          malesuada iaculis, ipsum nisi vestibulum velit, eu luctus metus augue sit
          amet est.
        </p>
      </section>

      {/* SECTION 3: Partners */}
      <section id="partners" className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Partners</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Below are some of our partner institutions along with our collaborators:
        </p>

        {/* Simulated partner details with bullet points and icons */}
        <ul className="list-none mb-8">
          <li className="flex items-start mb-2">
            <FiCheck className="text-darkGreen mt-1 mr-2" />
            <span className="text-gray-700">
              Partner Institution One - Leading in research and innovation.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="text-darkGreen mt-1 mr-2" />
            <span className="text-gray-700">
              Partner Institution Two - Specializing in sustainable practices.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <FiCheck className="text-darkGreen mt-1 mr-2" />
            <span className="text-gray-700">
              Partner Institution Three - Renowned for technological advancements.
            </span>
          </li>
        </ul>

        {/* Use the Collaboradores component */}
        <div className="mb-8">
          <Colaboradores />
        </div>
      </section>

      {/* Additional Expandable Sections */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-4">Frequently Asked Questions</h2>
        <Collapsible title="What is the main goal of this project?">
          <p className="text-gray-700 leading-relaxed">
            The project aims to promote sustainable soil and subsoil health by implementing
            agroecological land use and management practices.
          </p>
        </Collapsible>
        <Collapsible title="How can I participate?">
          <p className="text-gray-700 leading-relaxed">
            Participation is open to everyone interested in sustainable practices. Check our
            website for upcoming events and workshops.
          </p>
        </Collapsible>
        <Collapsible title="Who are the project partners?">
          <p className="text-gray-700 leading-relaxed">
            Our partners include leading institutions in research, innovation, and sustainability.
          </p>
        </Collapsible>
      </section>
    </div>
  );
}