// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Project/Home/Home';
import News from './Project/News';
import NewsDetail from './Project/NewsDetail';
import EventDetail from './Project/EventDetail';
import LivingLabs from './Project/LivingLabs';
import Resources from './Project/Resources/Resources';
import KnowledgeCloud from './Project/KnowledgeCloud';
import Contact from './Project/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RegionDetail from './Project/RegionDetail';
import WorkPackages from './Project/Project1/WorkPackages';
import Partners from './Project/Project1/Partners';
import About from './Project/Project1/About';
import Materials from './Project/Resources/Materials';
import PracticeAbstracts from './Project/Resources/PracticeAbstracts';
import Newsletter from './Project/Resources/Newsletter';
import NotFound from './Project/NotFound';
import CookieConsent from 'react-cookie-consent';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/living-labs" element={<LivingLabs />} />
          <Route path="/living-labs/:id" element={<RegionDetail />} />
          <Route path="/project/work-packages" element={<WorkPackages />} />
          <Route path="/project/about" element={<About />} />
          <Route path="/project/partners" element={<Partners />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/materials" element={<Materials />} />
          <Route path="/resources/practice-abstracts" element={<PracticeAbstracts />} />
          <Route path="/resources/newsletter" element={<Newsletter />} />
          <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="I Accept"
        cookieName="siteCookieConsent"
        style={{ background: "#5e3319" }}
        buttonStyle={{ background: "#6EBB78", color: "#fff", fontSize: "14px" }}
        expires={150}
      >
        We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies.
      </CookieConsent>
    </Router>
  );
};

export default App;