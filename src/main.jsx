import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import App from './App.jsx';
import './index.css';
import logo from './assets/logo.png'; // Asegúrate de la ruta (usa /assets si está en carpeta public)

// Variables de entorno (o booleans fijos)
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';
const constructionPass = import.meta.env.VITE_CONSTRUCTION_PASS || 'prueba';

// Animación del fondo
const backgroundVariants = {
  initial: {
    background: [
      'linear-gradient(120deg, #9dbf4c, #add946)',
      'linear-gradient(120deg, #add946, #9dbf4c)',
    ],
  },
  animate: {
    background: [
      'linear-gradient(120deg, #add946, #9dbf4c)',
      'linear-gradient(120deg, #9dbf4c, #add946)',
    ],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 10,
      ease: 'linear',
    },
  },
};

function UnderConstruction() {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica si ya está guardada la autorización en sessionStorage
    const storedAuth = sessionStorage.getItem('underConstructionAuthorized');
    if (storedAuth === 'true') {
      setAuthorized(true);
    }
    // Simula carga inicial (logo, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === constructionPass) {
      setAuthorized(true);
      // Almacena en sessionStorage para no pedir pass de nuevo
      sessionStorage.setItem('underConstructionAuthorized', 'true');
    } else {
      setErrorMsg('Wrong password');
    }
  };

  // 1) Si está en modo “carga”, se muestra el spinner
  if (loading) {
    return (
      <motion.div
        className="h-screen flex flex-col items-center justify-center text-center text-white"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-r-transparent mb-4"></div>
        <p className="text-lg font-semibold">Loading site...</p>
      </motion.div>
    );
  }

  // 2) Si ya está autorizado, carga la app
  if (authorized) {
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }

  // 3) Pantalla de construcción si no está autorizado
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center text-white px-4"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      {/* Asegúrate de que la ruta del logo sea correcta */}
      <img src={logo} alt="Logo" className="w-32 mb-6" />

      <h1 className="text-2xl md:text-3xl font-bold mb-2">We're getting ready!</h1>
      <p className="text-lg md:text-xl mb-8">
        Our website is under construction.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col w-72 mx-auto">
        <input
          type="password"
          placeholder="Enter construction pass"
          className="px-4 py-2 mb-2 border border-gray-300 rounded text-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg('');
          }}
        />
        {errorMsg && (
          <span className="text-red-400 text-sm mb-2">{errorMsg}</span>
        )}
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 rounded font-bold hover:bg-gray-700 transition-colors"
        >
          Enter
        </button>
      </form>
    </motion.div>
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