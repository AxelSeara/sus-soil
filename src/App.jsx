// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import EventDetail from './pages/EventDetail'; // Importa el nuevo componente
import LivingLabs from './pages/LivingLabs';
import Resources from './pages/Resources';
import KnowledgeCloud from './pages/KnowledgeCloud';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/event/:id" element={<EventDetail />} /> {/* Nueva ruta para eventos */}
        <Route path="/living-labs" element={<LivingLabs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;