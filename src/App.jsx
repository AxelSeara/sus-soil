// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import EventDetail from './pages/EventDetail'; // Importa el nuevo componente
import LivingLabs from './pages/LivingLabs';
import Resources from './pages/Resources/Resources';
import KnowledgeCloud from './pages/KnowledgeCloud';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RegionDetail from './pages/RegionDetail';
import About from './pages/About/About';
import Materials from './pages/Resources/Materials';
import PracticeAbstracts from './pages/Resources/PracticeAbstracts';
import Newsletter from './pages/Resources/Newsletter';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
       <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/living-labs" element={<LivingLabs />} />
        <Route path="/living-labs/:id" element={<RegionDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/materials" element={<Materials />} />
        <Route path="/resources/practice-abstracts" element={<PracticeAbstracts />} />
        <Route path="/resources/newsletter" element={<Newsletter />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;