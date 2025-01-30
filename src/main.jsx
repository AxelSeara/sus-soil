// index.jsx
import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import App from './App.jsx';
import './index.css';
import logo from './assets/logo.png'; // Ajusta la ruta según tu proyecto

// Variables de entorno
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';
const constructionPass = import.meta.env.VITE_CONSTRUCTION_PASS || 'prueba';

// Variantes para la animación del fondo con colores de marca
const backgroundVariants = {
  initial: {
    background: [
      'linear-gradient(120deg, #9dbf4c, #add946)', // Color de marca 1
      'linear-gradient(120deg, #add946, #9dbf4c)', // Color de marca 2
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

  // Simulamos una carga inicial (e.g. verificar estado del servidor)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podrías esperar a que se carguen datos reales en lugar de un setTimeout.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 segundos simulando la “carga” inicial
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === constructionPass) {
      setAuthorized(true);
    } else {
      setErrorMsg('Wrong password');
    }
  };

  // 1) Primero mostramos el “spinner” de carga
  if (loading) {
    return (
      <motion.div
        className="h-screen flex flex-col items-center justify-center text-center text-white"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        {/* Spinner con Tailwind */}
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-r-transparent mb-4"></div>
        <p className="text-lg font-semibold">Loading site...</p>
      </motion.div>
    );
  }

  // 2) Si la contraseña es correcta, cargamos la App
  if (authorized) {
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }

  // 3) Página de construcción con el formulario de contraseña
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center text-white px-4"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
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