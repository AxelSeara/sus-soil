import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Verifica si estamos en modo "Under Construction"
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';

createRoot(document.getElementById('root')).render(
  isUnderConstruction ? (
    <h1 style={{ textAlign: 'center', marginTop: '20%' }}>Site Under Construction</h1>
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);