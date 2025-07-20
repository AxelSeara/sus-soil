// src/components/Footer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaNewspaper,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import susSoilLogo from '../assets/logo.png';
import euLogo from '../assets/EN-Funded by the EU-POS.png';
import bgImage from '../assets/bg2.svg';

const quickLinks = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/project/work-packages', label: 'Project', icon: FaTasks },
  { to: '/news', label: 'News', icon: FaNewspaper },
  { to: '/contact', label: 'Contact', icon: FaEnvelope },
];

const socialLinks = [
  { href: 'https://www.facebook.com/SUSSOIL/', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://x.com/SUSSOIL', label: 'X (Twitter)', icon: FaXTwitter },
  { href: 'https://www.linkedin.com/company/sus-soil', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://www.youtube.com/@sus-soil', label: 'YouTube', icon: FaYoutube },
];

export default function Footer() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const linkBase =
    'flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded';
  const linkRest =
    'text-brown hover:text-white hover:bg-darkGreen/80 px-2 py-1 rounded-md';
  const activeClass = 'underline decoration-2 underline-offset-4 text-white';
  const socialBase =
    'inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80 text-brown shadow hover:bg-darkGreen hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  // Back to top
  const [showTop, setShowTop] = useState(false);
  const onScroll = useCallback(() => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    setShowTop(scrolled > 400);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Modal Cookies
  const [modal, setModal] = useState({ open: false, type: null });
  const legalTexts = {
    cookies: {
      title: 'Cookies',
      body: `We use only essential cookies for core functionality and lightweight analytics (Vercel / Metricool) to understand aggregated, anonymized usage (page views, device type). These analytics do not personally identify you. You can disable cookies in your browser; the site will still function.`
    }
  };
  const openModal = (type) => setModal({ open: true, type });
  const closeModal = () => setModal({ open: false, type: null });

  // Escape key for modal
  useEffect(() => {
    if (!modal.open) return;
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.open]);

  // Schema.org
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SUS-SOIL Project',
    url: 'https://sus-soil.eu',
    logo: 'https://sus-soil.eu/path/to/logo.png',
    sameAs: socialLinks.map((s) => s.href),
  };

  return (
    <footer className="border-t border-gray-300 relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Top Logos & Disclaimer */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-16 mb-4">
            <img
              src={susSoilLogo}
              alt="SUS-SOIL project logo"
              className="h-36 w-auto"
              loading="lazy"
              width={288}
              height={144}
            />
            <img
              src={euLogo}
              alt="Funded by the European Union"
              className="h-16 w-auto"
              loading="lazy"
              width={256}
              height={64}
            />
          </div>
          <p className="text-xs text-gray-700 leading-snug max-w-3xl font-sans text-center">
            This project has received funding from the European Union’s Horizon Europe research
            and innovation programme under grant agreement No GA 101157560. Views and opinions
            expressed are those of the author(s) only and do not necessarily reflect those of the
            European Union. Neither the European Union nor the granting authority can be held
            responsible for them.
          </p>
        </div>
      </div>

      {/* Lower section */}
      <div
        className="bg-cover bg-center bg-no-repeat px-6 py-14"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Quick Links */}
            <nav aria-label="Quick links">
              <h3 className="text-brown text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                {quickLinks.map((lnk) => (
                  <li key={lnk.to}>
                    <Link
                      to={lnk.to}
                      className={`${linkBase} ${linkRest} ${
                        isActive(lnk.to) ? activeClass : ''
                      }`}
                    >
                      <lnk.icon className="w-4 h-4" aria-hidden="true" />
                      <span>{lnk.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div
              className="flex flex-col items-center md:items-center"
              aria-labelledby="newsletter-heading"
            >
              <h3 id="newsletter-heading" className="text-brown text-lg font-semibold mb-6">
                Join Our Newsletter
              </h3>
              <a
                href="https://gmail.us11.list-manage.com/subscribe?u=6fbd6e1c74aa5e4a311896dcc&id=826cb744b4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brown text-white px-6 py-2 rounded-lg hover:bg-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white font-semibold text-sm"
                aria-label="Subscribe to the SUS-SOIL newsletter (opens in a new tab)"
              >
                Subscribe
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-end" aria-labelledby="follow-heading">
              <h3 id="follow-heading" className="text-brown text-lg font-semibold mb-4">
                Follow Us
              </h3>
              <ul className="flex flex-wrap gap-4 mb-6" aria-label="Social media links">
                {socialLinks.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={socialBase}
                      aria-label={`SUS-SOIL on ${s.label}`}
                      title={`SUS-SOIL on ${s.label}`}
                    >
                      <s.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="text-center md:text-right text-xs text-gray-700 max-w-xs leading-relaxed">
                <p>Connect with us for updates & insights.</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="text-center mt-10 border-t border-brown/40 pt-5 pb-3">
            <p className="text-brown text-sm">
              © {new Date().getFullYear()} SUS-SOIL. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-brown font-medium flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openModal('cookies')}
                className="underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Cookies
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <div
        className={`fixed right-5 bottom-5 z-[1050] transition-opacity ${
          showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
            onClick={scrollToTop}
          className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-brown text-white shadow-lg hover:bg-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 transition-transform group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Modal (Cookies only) */}
      {modal.open && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-white max-w-lg w-full rounded-xl shadow-xl border border-brown/20 p-6 animate-fadeIn">
            <h3 id="legal-modal-title" className="text-xl font-semibold text-brown mb-4">
              {legalTexts[modal.type].title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {legalTexts[modal.type].body}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-md bg-brown text-white font-medium hover:bg-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </footer>
  );
}