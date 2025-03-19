// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightGreen text-brown text-center">
      {/* A bouncing "404" heading */}
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}