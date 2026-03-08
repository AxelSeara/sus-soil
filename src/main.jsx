import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';

function UnderConstruction() {
  return (
    <div className="h-screen flex items-center justify-center bg-white text-brown px-6 text-center">
      <p className="text-xl md:text-2xl font-semibold">Website under maintenance.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  isUnderConstruction ? (
    <UnderConstruction />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);
