// src/components/Navbar.jsx (Refactored with accessibility, UX, and maintainability improvements)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg';

// --- Data ------------------------------------------------------------------
const projectItems = [
  { to: '/project/about',          label: 'About' },
  { to: '/project/work-packages',  label: 'Work Packages' },
  { to: '/project/partners',       label: 'Partners' },
  { to: '/project/deliverables',   label: 'Deliverables' }, // 🆕 Añadido
];

const resourcesItems = [
  { to: '/resources/materials',           label: 'Materials' },
  { to: '/resources/practice-abstracts',  label: 'Practice Abstracts' },
  { to: '/resources/newsletter',          label: 'Newsletter' },
];

// --- Utility hooks ---------------------------------------------------------
function useEscape(callback) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') callback();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [callback]);
}

// Focus trap for mobile menu (basic)
function useFocusTrap(active, containerRef, firstFocusableRef) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (firstFocusableRef?.current) firstFocusableRef.current.focus();
      else first.focus();

      function handleKey(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      container.addEventListener('keydown', handleKey);
      return () => container.removeEventListener('keydown', handleKey);
    }
  }, [active, containerRef, firstFocusableRef]);
}

// --- Component -------------------------------------------------------------
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menus, setMenus] = useState({ project: false, resources: false });
  const location = useLocation();

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);
  const projectMenuRef = useRef(null);
  const resourcesMenuRef = useRef(null);

  const closeAllMenus = useCallback(() => {
    setMenus({ project: false, resources: false });
    setMobileOpen(false);
  }, []);

  useEscape(closeAllMenus);
  useFocusTrap(mobileOpen, mobileMenuRef, firstMobileLinkRef);

  // Disable body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileOpen]);

  // Close mobile menu if resized to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        document.body.style.overflow = 'auto';
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when navigating
  useEffect(() => {
    setMenus({ project: false, resources: false });
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setMenus(prev => ({ project: false, resources: false, [name]: !prev[name] }));
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinkClass = 'text-brown text-sm lg:text-base font-medium hover:text-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white';
  const activeClass = 'text-darkGreen font-semibold underline decoration-lightGreen decoration-2 underline-offset-4';

  const dropdownContainerClass = 'absolute left-0 top-full mt-2 bg-white text-brown rounded-md shadow-lg border border-gray-200 z-[1000] min-w-[220px] p-2 animate-fadeIn';
  const dropdownItemClass = 'block px-4 py-2 text-sm rounded-md hover:bg-green hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown';
  const socialLinkClass = 'text-brown hover:text-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded';

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg">Skip to main content</a>
      <nav className="fixed top-0 left-0 w-full h-16 z-[1000] bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm px-4" aria-label="Main navigation">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
          {/* Logo & Mobile Toggle */}
          <div className="flex justify-between w-full lg:w-auto">
            <Link to="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <img src={logo} alt="SUS-SOIL logo" className="h-10 w-auto mr-2" />
            </Link>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="lg:hidden p-2 text-gray-600 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-200"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:pl-8">
            <ul className="flex items-center gap-6" role="menubar" aria-label="Primary">
              <li>
                <Link to="/" className={`${navLinkClass} ${isActive('/') ? activeClass : ''}`}>Home</Link>
              </li>
              <li className="relative" ref={projectMenuRef}>
                <button
                  onClick={() => toggleMenu('project')}
                  className={`${navLinkClass} flex items-center ${menus.project ? 'text-darkGreen' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={menus.project}
                  aria-controls="project-menu"
                >
                  Project <FiChevronDown className={`ml-1.5 w-4 h-4 transition-transform ${menus.project ? 'rotate-180' : ''}`} />
                </button>
                {menus.project && (
                  <div id="project-menu" role="menu" className={dropdownContainerClass}>
                    {projectItems.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        className={`${dropdownItemClass} ${isActive(item.to) ? 'bg-green text-white' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li className="relative" ref={resourcesMenuRef}>
                <button
                  onClick={() => toggleMenu('resources')}
                  className={`${navLinkClass} flex items-center ${menus.resources ? 'text-darkGreen' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={menus.resources}
                  aria-controls="resources-menu"
                >
                  Resources <FiChevronDown className={`ml-1.5 w-4 h-4 transition-transform ${menus.resources ? 'rotate-180' : ''}`} />
                </button>
                {menus.resources && (
                  <div id="resources-menu" role="menu" className={dropdownContainerClass}>
                    {resourcesItems.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        className={`${dropdownItemClass} ${isActive(item.to) ? 'bg-green text-white' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <Link to="/living-labs" className={`${navLinkClass} ${isActive('/living-labs') ? activeClass : ''}`}>Living Labs</Link>
              </li>
              <li>
                <Link to="/news" className={`${navLinkClass} ${isActive('/news') ? activeClass : ''}`}>News</Link>
              </li>
              <li>
                <Link to="/contact" className={`${navLinkClass} ${isActive('/contact') ? activeClass : ''}`}>Contact</Link>
              </li>
              <li className="flex items-center space-x-4 ml-4" aria-label="Social media">
                <a
                  href="https://www.facebook.com/SUSSOIL/"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on Facebook"
                >
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a
                  href="https://x.com/SUSSOIL"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on X (Twitter)"
                >
                  <FaXTwitter aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/sus-soil"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on LinkedIn"
                >
                  <FaLinkedinIn aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/@sus-soil"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on YouTube"
                >
                  <FaYoutube aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileOpen && (
          <div
            id="mobile-nav-panel"
            ref={mobileMenuRef}
            className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 origin-top animate-slideDown"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-4 p-4" aria-label="Mobile primary navigation">
              <li>
                <Link
                  ref={firstMobileLinkRef}
                  to="/"
                  className={`${navLinkClass} ${isActive('/') ? activeClass : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => toggleMenu('project')}
                  className={`${navLinkClass} flex items-center justify-between w-full ${menus.project ? 'text-darkGreen' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={menus.project}
                  aria-controls="m-project-menu"
                >
                  <span>Project</span>
                  <FiChevronDown className={`ml-1.5 w-5 h-5 transition-transform ${menus.project ? 'rotate-180' : ''}`} />
                </button>
                {menus.project && (
                  <div id="m-project-menu" className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="flex flex-col">
                      {projectItems.map(item => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className={`block px-4 py-2 text-brown hover:bg-green hover:text-white transition-colors ${isActive(item.to) ? 'bg-green text-white' : ''}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/living-labs"
                  className={`${navLinkClass} ${isActive('/living-labs') ? activeClass : ''}`}
                >
                  Living Labs
                </Link>
              </li>
              <li>
                <button
                  onClick={() => toggleMenu('resources')}
                  className={`${navLinkClass} flex items-center justify-between w-full ${menus.resources ? 'text-darkGreen' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={menus.resources}
                  aria-controls="m-resources-menu"
                >
                  <span>Resources</span>
                  <FiChevronDown className={`ml-1.5 w-5 h-5 transition-transform ${menus.resources ? 'rotate-180' : ''}`} />
                </button>
                {menus.resources && (
                  <div id="m-resources-menu" className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="flex flex-col">
                      {resourcesItems.map(item => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className={`block px-4 py-2 text-brown hover:bg-green hover:text-white transition-colors ${isActive(item.to) ? 'bg-green text-white' : ''}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/news"
                  className={`${navLinkClass} ${isActive('/news') ? activeClass : ''}`}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`${navLinkClass} ${isActive('/contact') ? activeClass : ''}`}
                >
                  Contact
                </Link>
              </li>
              <li className="flex items-center space-x-4 pt-2" aria-label="Social media">
                <a
                  href="https://www.facebook.com/SUSSOIL/"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on Facebook"
                >
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a
                  href="https://x.com/SUSSOIL"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on X (Twitter)"
                >
                  <FaXTwitter aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/sus-soil"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on LinkedIn"
                >
                  <FaLinkedinIn aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/@sus-soil"
                  className={socialLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUS-SOIL on YouTube"
                >
                  <FaYoutube aria-hidden="true" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); mobileMenuButtonRef.current?.focus(); }}
                  className="mt-4 w-full px-4 py-2 text-center text-sm text-brown bg-gray-100 hover:bg-gray-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Close menu
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

/* Tailwind custom animations (add to your global CSS if not present):
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
.animate-fadeIn { animation: fadeIn 140ms ease-out; }
@keyframes slideDown { 0% { opacity:0; transform: scaleY(.96);} 100% { opacity:1; transform: scaleY(1);} }
.animate-slideDown { animation: slideDown 180ms ease-out; transform-origin: top; }
*/