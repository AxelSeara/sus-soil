import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import News from './pages/News';
import LivingLabs from './pages/LivingLabs';
import Resources from './pages/Resources';
import KnowledgeCloud from './pages/KnowledgeCloud';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/living-labs" element={<LivingLabs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;