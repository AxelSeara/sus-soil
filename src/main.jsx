import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import App from './App.jsx';
import './index.css';
import logo from './assets/logo.png'; // Asegúrate de que la ruta es correcta

// Verifica si estamos en modo "Under Construction"
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';

// Variantes para la animación del fondo
const backgroundVariants = {
  initial: {
    background: ["linear-gradient(120deg, #006400, #008000)", "linear-gradient(120deg, #008000, #00FF00)"]
  },
  animate: {
    background: ["linear-gradient(120deg, #00FF00, #008000)", "linear-gradient(120deg, #008000, #006400)"],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 10,
      ease: "linear"
    }
  }
};

createRoot(document.getElementById('root')).render(
  isUnderConstruction ? (
    <motion.div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '20px' }} />
      <h1 style={{ color: 'white', fontSize: '2em', fontWeight: 'bold' }}>We're getting ready!</h1>
      <p style={{ color: 'white', fontSize: '1.2em' }}>Our website is under construction.</p>
    </motion.div>
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);