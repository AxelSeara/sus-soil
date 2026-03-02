// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CookieConsent from 'react-cookie-consent';
import Deliverables from './Project/Deliverables';
import { Analytics } from '@vercel/analytics/react';
import SEO from './components/SEO';

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

function RouteSEO() {
  const location = useLocation();
  const { pathname, search } = location;

  if (pathname === '/news' || pathname.startsWith('/news/') || pathname.startsWith('/event/')) {
    return null;
  }

  const isEventsFilter = pathname === '/news' && new URLSearchParams(search).get('filter')?.toLowerCase() === 'events';

  const routeConfig = [
    {
      match: /^\/$/,
      title: 'SUS-SOIL | Sustainable Soil and Subsoil Management',
      description:
        'SUS-SOIL develops innovative, climate-resilient solutions for sustainable soil and subsoil management across European Living Labs.',
      canonicalPath: '/',
      keywords: 'SUS-SOIL, sustainable soil, subsoil, living labs, agroecology, Horizon Europe',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SUS-SOIL',
        url: 'https://sus-soil.eu/',
        description:
          'SUS-SOIL develops innovative, climate-resilient solutions for sustainable soil and subsoil management across European Living Labs.',
      },
    },
    {
      match: /^\/news$/,
      title: isEventsFilter ? 'Events | SUS-SOIL' : 'News & Events | SUS-SOIL',
      description: isEventsFilter
        ? 'Discover the latest SUS-SOIL events, workshops, and project activities across Europe.'
        : 'Read the latest SUS-SOIL news, updates, and events on sustainable soil and subsoil management.',
      canonicalPath: isEventsFilter ? '/news?filter=events' : '/news',
      keywords: 'SUS-SOIL news, SUS-SOIL events, soil project updates, agroecology events',
    },
    {
      match: /^\/living-labs$/,
      title: 'Living Labs | SUS-SOIL',
      description: 'Explore SUS-SOIL Living Labs across biogeographic regions and discover regional actions for soil health.',
      canonicalPath: '/living-labs',
      keywords: 'Living Labs, biogeographic regions, soil innovation, SUS-SOIL',
    },
    {
      match: /^\/project\/about$/,
      title: 'About SUS-SOIL | Project Overview',
      description: 'Learn about SUS-SOIL objectives, methodology, and impact for sustainable soil and subsoil management.',
      canonicalPath: '/project/about',
    },
    {
      match: /^\/project\/work-packages$/,
      title: 'Work Packages | SUS-SOIL',
      description: 'Explore SUS-SOIL work packages and the technical roadmap for research, validation, and impact.',
      canonicalPath: '/project/work-packages',
    },
    {
      match: /^\/project\/partners$/,
      title: 'Partners | SUS-SOIL Consortium',
      description: 'Meet the SUS-SOIL consortium partners driving innovation in sustainable land and soil management.',
      canonicalPath: '/project/partners',
    },
    {
      match: /^\/project\/deliverables$/,
      title: 'Deliverables | SUS-SOIL',
      description: 'Access SUS-SOIL public deliverables and project outputs.',
      canonicalPath: '/project/deliverables',
    },
    {
      match: /^\/resources$/,
      title: 'Resources | SUS-SOIL',
      description: 'Browse SUS-SOIL resources, materials, practice abstracts, and newsletters.',
      canonicalPath: '/resources',
    },
    {
      match: /^\/resources\/materials$/,
      title: 'Materials | SUS-SOIL Resources',
      description: 'Access SUS-SOIL project materials and knowledge assets.',
      canonicalPath: '/resources/materials',
    },
    {
      match: /^\/resources\/practice-abstracts$/,
      title: 'Practice Abstracts | SUS-SOIL',
      description: 'Explore SUS-SOIL practice abstracts and applied insights for sustainable soil management.',
      canonicalPath: '/resources/practice-abstracts',
    },
    {
      match: /^\/resources\/newsletter$/,
      title: 'Newsletter | SUS-SOIL',
      description: 'Read the latest SUS-SOIL newsletters and project updates.',
      canonicalPath: '/resources/newsletter',
    },
    {
      match: /^\/knowledge-cloud$/,
      title: 'Knowledge Cloud | SUS-SOIL',
      description: 'Access SUS-SOIL knowledge resources and digital content for soil and subsoil management.',
      canonicalPath: '/knowledge-cloud',
    },
    {
      match: /^\/contact$/,
      title: 'Contact | SUS-SOIL',
      description: 'Get in touch with the SUS-SOIL project team.',
      canonicalPath: '/contact',
    },
  ];

  const match = routeConfig.find((cfg) => cfg.match.test(pathname));
  const fallback = {
    title: 'SUS-SOIL',
    description:
      'SUS-SOIL develops sustainable solutions for soil and subsoil health under the Horizon Europe programme.',
    canonicalPath: pathname || '/',
  };
  const meta = match || fallback;

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      keywords={meta.keywords}
      canonicalPath={meta.canonicalPath}
      structuredData={meta.structuredData}
    />
  );
}

const App = () => {
  return (
    <Router>
      <RouteSEO />
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
