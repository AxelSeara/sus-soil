// index.js (o main.jsx, según tu proyecto)
import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import App from './App.jsx';
import './index.css'; // Importa tus estilos Tailwind
import logo from './assets/logo.png'; // Ajusta la ruta a tu logo

// Lee variables de entorno
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';
const constructionPass = import.meta.env.VITE_CONSTRUCTION_PASS || 'prueba';

// Animación del fondo (usa tus colores darkGreen y lightGreen)
const backgroundVariants = {
  initial: {
    background: [
      'linear-gradient(120deg, #6EBA77, #B0D392)',
      'linear-gradient(120deg, #B0D392, #6EBA77)',
    ],
  },
  animate: {
    background: [
      'linear-gradient(120deg, #B0D392, #6EBA77)',
      'linear-gradient(120deg, #6EBA77, #B0D392)',
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
      sessionStorage.setItem('underConstructionAuthorized', 'true');
    } else {
      setErrorMsg('Wrong password');
    }
  };

  // 1) Pantalla de carga
  if (loading) {
    return (
      <motion.div
        className="h-screen flex flex-col items-center justify-center text-center text-white font-sans"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-r-transparent mb-4"></div>
        <p className="text-lg font-semibold">Loading site...</p>
      </motion.div>
    );
  }

  // 2) Si autorizado, carga la app
  if (authorized) {
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }

  // 3) Pantalla de construcción
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center text-white px-4 font-sans"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-32 mb-6" />

      <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
        We're getting ready!
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Our website is under construction.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col w-72 mx-auto">
        <input
          type="password"
          placeholder="Enter construction pass"
          className="px-4 py-2 mb-2 border border-brown rounded text-brown text-center focus:outline-none focus:ring-2 focus:ring-darkGreen"
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
          className="bg-brown text-white py-2 rounded font-bold text-lg hover:bg-opacity-90 focus:ring-2 focus:ring-darkGreen transition-colors"
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
