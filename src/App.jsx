// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CookieConsent from 'react-cookie-consent';
import Deliverables from './Project/Deliverables';
import { Analytics } from '@vercel/analytics/react';

// Lazy-loaded routes (performance: smaller initial bundle)
const Home = lazy(() => import('./Project/Home/Home'));
const News = lazy(() => import('./Project/News'));
const NewsDetail = lazy(() => import('./Project/NewsDetail'));
const EventDetail = lazy(() => import('./Project/EventDetail'));
const LivingLabs = lazy(() => import('./Project/Regions'));
const RegionDetail = lazy(() => import('./Project/RegionDetail'));
const LivingLabDetail = lazy(() => import('./Project/LivingLabDetail'));
const WorkPackages = lazy(() => import('./Project/Project1/WorkPackages'));
const Partners = lazy(() => import('./Project/Project1/Partners'));
const About = lazy(() => import('./Project/Project1/About'));
const Resources = lazy(() => import('./Project/Resources/Resources'));
const Materials = lazy(() => import('./Project/Resources/Materials'));
const PracticeAbstracts = lazy(() => import('./Project/Resources/PracticeAbstracts'));
const Newsletter = lazy(() => import('./Project/Resources/Newsletter'));
const KnowledgeCloud = lazy(() => import('./Project/KnowledgeCloud'));
const Contact = lazy(() => import('./Project/Contact'));
const NotFound = lazy(() => import('./Project/NotFound'));

const App = () => {
  return (
    <Router>
      <Analytics />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="pt-16">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-3 text-brown">
                <div className="w-10 h-10 border-2 border-brown border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <span className="text-sm md:text-base">Loading page…</span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/living-labs" element={<LivingLabs />} />
            <Route path="/living-labs/:regionId/:labId" element={<LivingLabDetail />} />
            <Route path="/living-labs/:regionId" element={<RegionDetail />} />
            <Route path="/project/work-packages" element={<WorkPackages />} />
            <Route path="/project/about" element={<About />} />
            <Route path="/project/partners" element={<Partners />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/materials" element={<Materials />} />
            <Route path="/resources/practice-abstracts" element={<PracticeAbstracts />} />
            <Route path="/resources/newsletter" element={<Newsletter />} />
            <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/deliverables" element={<Deliverables />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="I Accept"
        cookieName="siteCookieConsent"
        style={{ background: '#5e3319' }}
        buttonStyle={{ background: '#6EBB78', color: '#fff', fontSize: '14px' }}
        expires={150}
      >
        We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies.
      </CookieConsent>
    </Router>
  );
};

export default App;
