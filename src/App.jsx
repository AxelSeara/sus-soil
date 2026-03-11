// src/App.jsx
import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
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
const Deliverables = lazy(() => import('./Project/Deliverables'));
const NotFound = lazy(() => import('./Project/NotFound'));
const CONSENT_KEY = 'siteCookieConsentV2';

function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeConsent(next) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
}

function CookiePreferenceCenter({ consent, onSave, openPanelToken, onVisibilityChange }) {
  const [isOpen, setIsOpen] = useState(!consent);
  const [mode, setMode] = useState(consent ? 'manage' : 'quick');
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const modalRef = React.useRef(null);

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    if (!consent) {
      setIsOpen(true);
      setMode('quick');
    }
  }, [consent]);

  useEffect(() => {
    if (openPanelToken > 0) {
      setIsOpen(true);
      setMode('manage');
    }
  }, [openPanelToken]);

  useEffect(() => {
    onVisibilityChange?.(isOpen);
  }, [isOpen, onVisibilityChange]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && consent) setIsOpen(false);
      if (event.key !== 'Tab') return;
      const root = modalRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, consent]);

  const saveAndClose = (next) => {
    onSave(next);
    setIsOpen(false);
    setMode('manage');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end bg-black/35 backdrop-blur-[2px] md:items-center md:justify-center">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-brown/20 bg-[#f4faf5] p-4 shadow-[0_-14px_40px_rgba(25,38,31,0.16)] md:max-w-2xl md:rounded-2xl md:border md:p-6"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 id="cookie-title" className="text-lg font-semibold text-brown">
              Your privacy choices
            </h3>
            <p className="mt-1 text-sm text-brown/85">
              Choose how SUS-SOIL may use optional cookies.
            </p>
          </div>
          {consent && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-brown/20 px-2 py-1 text-sm text-brown hover:bg-lightGreen/25"
              aria-label="Close cookie settings"
            >
              Close
            </button>
          )}
        </div>

        {mode === 'quick' ? (
          <div className="space-y-3">
            <p className="text-sm text-brown/80">
              We use strictly necessary cookies for core functionality. Analytics and marketing cookies are optional.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => setMode('manage')}
                className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
              >
                Manage preferences
              </button>
              <button
                type="button"
                onClick={() =>
                  saveAndClose({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() =>
                  saveAndClose({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="rounded-full bg-darkGreen px-4 py-2 text-sm font-semibold text-white hover:bg-darkGreen/90"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2 rounded-xl border border-brown/15 bg-white/70 p-3 text-sm">
              <label className="flex items-center justify-between gap-3 rounded-lg p-2">
                <span className="text-brown/90">Strictly necessary (always active)</span>
                <input type="checkbox" checked disabled aria-label="Strictly necessary cookies are always active" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-lightGreen/15">
                <span className="text-brown/90">Analytics</span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-label="Enable analytics cookies"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-lightGreen/15">
                <span className="text-brown/90">Marketing / social tracking</span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  aria-label="Enable marketing cookies"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  saveAndClose({
                    necessary: true,
                    analytics,
                    marketing,
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-white hover:bg-brown/90"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() =>
                  saveAndClose({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() =>
                  saveAndClose({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
              >
                Accept all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [consent, setConsent] = useState(() => readConsent());
  const [openPanelToken, setOpenPanelToken] = useState(0);
  const [cookiePanelVisible, setCookiePanelVisible] = useState(false);
  const allowAnalytics = useMemo(() => !!consent?.analytics, [consent]);

  useEffect(() => {
    if (!allowAnalytics) return;
    if (window.__metricoolLoaded) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://tracker.metricool.com/resources/be.js';
    script.onload = () => {
      if (window.beTracker?.t) {
        window.beTracker.t({ hash: '5b4b7628993fcc0e3178513fdf7bf6e8' });
        window.__metricoolLoaded = true;
      }
    };
    document.head.appendChild(script);
  }, [allowAnalytics]);

  const handleSaveConsent = (next) => {
    writeConsent(next);
    setConsent(next);
  };

  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <RouteSEO />
      {allowAnalytics ? <Analytics /> : null}
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
      <Footer suppressBackToTop={cookiePanelVisible} onOpenCookieSettings={() => setOpenPanelToken((v) => v + 1)} />
      <CookiePreferenceCenter
        consent={consent}
        onSave={handleSaveConsent}
        openPanelToken={openPanelToken}
        onVisibilityChange={setCookiePanelVisible}
      />
    </Router>
  );
};

export default App;
