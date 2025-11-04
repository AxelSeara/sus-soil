// src/components/Footer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  // Modales legales (3 secciones)
  const [modal, setModal] = useState({ open: false, type: null });
  const closeBtnRef = useRef(null);

  const openModal = (type) => setModal({ open: true, type });
  const closeModal = () => setModal({ open: false, type: null });

  // Bloquear scroll del body y enfocar el botón de cerrar
  useEffect(() => {
    if (!modal.open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modal.open]);

  // Escape key para cerrar modal
  useEffect(() => {
    if (!modal.open) return;
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.open]);

  // Textos legales
  const legalTexts = {
    legal: {
      title: 'Legal Notice',
      body: `LEGAL NOTICE

1. Identification of the Owner 

Registered name: UNIVERSIDADE DE SANTIAGO DE COMPOSTELA. 
CIF/NIF: Q1518001A 
Registered office: San Xerome College, Praza do Obradoiro, s/n.  15782 Santiago de Compostela 
Telephone: +34 881 811 000 
E-mail: mrosa.mosquera.losada@usc.es  

2. Purpose 

These conditions regulate the use that the Owner makes available to users of the website, which may be modified without notice, so their periodic consultation is recommended, especially when preparing to make effective use of products and / or services. 

3. Conditions of access and use 

Access to the website is free and attributes the condition of User to whoever does it, who will be able to access the contents or even contact its administrators. The user must therefore read, understand and accept the present conditions of use before proceeding to the navigation and/or use of the services, which will mean his express acceptance and adhesion to them in the terms and conditions that are expressed below: 

i) Commitment to the diligent use of the resources, in strict compliance with current legislation, with respect for good customs and the “netiquette”, that is to say, the set of rules of general behaviour on the Internet; 

ii) The user will accept the terms and conditions or bases of participation of a specific service or resource when these are necessary, which will be explicitly required where applicable and; 

iii) You may not use the website outside the terms accepted by these conditions of use, specifically for illicit purposes, contrary to morality or public order in any of its expressions, or constituting a crime. 

Similarly, if comments or entries of opinions are allowed, the Owner will not be responsible in any case for the opinions expressed by third parties, but reserves the right to withdraw or even not publish those that are offensive or inappropriate or, failing that, when it had effective knowledge of the content of the published. 

4. Intellectual and Industrial Property 

The Owner owns all rights to the website, its logos, structure, images and constituent elements of the object code, as well as the programming and engineering of the source code. All these elements, in addition to the publications included, are protected by Spanish and European legislation on intellectual and industrial property. 

Any reproduction, adaptation, modification or public communication of all or part of the contents of the website, carried out in any form or by any means, mechanical, manual or otherwise, without the express authorisation of the Owner, is prohibited. 

FEUGA is the owner of the intellectual property rights derived from the elements that make up its website or has the corresponding authorisation for their use. This website protects intellectual property rights, therefore all photographs, icons, videos …. are roperty of this entity or have been granted with the express consent of the owner, acknowledging the authorship and ownership of the elements provided by third parties. 

5. Protection of personal data 

The Owner has adopted all security measures, both technical and organizational, required by the regulations on data protection, more specifically according to Law 15/1999 on the Protection of Personal Data, or rule that replaces it and those that develop it, and Regulation 2016/679 European Data Protection. 

6. Applicable law and jurisdiction 

These General Conditions are subject to Spanish law, submitting any dispute to the courts and tribunals of the city of Santiago de Compostela, renouncing any other general or special jurisdiction that may correspond to them.`
    },
    cookies: {
      title: 'Cookie Policy',
      body: `COOKIE POLICY 

In compliance with the provisions of article 22.2 of Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce, this website informs you, in this section, about the policy of collection and processing of cookies. 

What are cookies? 
A cookie is a file that is downloaded to your computer when you access certain websites. Cookies allow a website to, among other things, store and retrieve information about the browsing habits of a user or his/her computer, and, depending on the information they contain and the way he/she uses his/her computer, they can be used to recognize the user. 

What types of cookies does this website use? 
This website uses the following types of cookies: 

Analysis cookies: These are those which, whether processed by us or by third parties, allow us to quantify the number of users and thus carry out the measurement and statistical analysis of the use made by users of the service offered. For this purpose, your navigation on our website is analyzed in order to improve the products or services we offer you. 

Technical Cookies: These allow the user to navigate through the restricted area and use its different functions, such as, for example, to carry out the purchase process of an article. 

Personalisation cookies: These are cookies that allow the user to access the service with some general characteristics predefined according to a series of criteria in the user’s terminal, such as the language or the type of browser used to connect to the service. 

Deactivate the cookies 
You can allow, block or delete the cookies installed on your computer by configuring the options of the browser installed on your computer. 
Most web browsers offer the ability to allow, block or delete cookies installed on your computer. 
You can then access the settings of the most common web browsers to accept, install or disable cookies: 

Set cookies in Google Chrome 
Setting Cookies in Microsoft Internet Explorer 
Setting Cookies in Mozilla Firefox 
Setting Cookies in Safari (Apple) 

This website uses third-party services to collect information for statistical and web usage purposes. 
In particular, we use Google Analytics services for our statistics and advertising. Some cookies are essential for the operation of the site, for example, the built-in browser. 

Warning about deleting cookies 
You can remove and block all cookies from this site, but part of the site will not work or the quality of the web page may be affected. 
If you have any questions about our cookie policy, you can contact this website through our Contact Us section.`
    },
    privacy: {
      title: 'Privacy Policy',
      body: `PRIVACY POLICY 

1. Privacy Policy DIGI-Rangeland Website 

This privacy policy refers to how the SUS-SOIL project website visitors’ personal data will be processed by FEUGA and how the information collected through the website is handled in accordance with applicable privacy regulations. By choosing to use this Service, you agree to the collection and use of information in accordance with this Policy. We will not use or share your information with anyone except as described in this Privacy Policy. These conditions may be modified without prior notice, so we recommend checking them periodically. 

2. Owner identity and contact details 

Personal data will be processed by SUS-SOIL consortium partners, who will take appropriate measures to prevent data loss, unauthorized access, modification, or unwanted disclosure. 

3. Conditions of access and use 

Access to the website is free and grants the status of User to anyone who visits it, allowing access to its content or to contact the administrators. 

Users must read, understand, and accept these terms of use before navigating or using the services, which implies express acceptance and adherence under the following terms: 
i) A commitment to the responsible use of resources, in strict compliance with current legislation, good practices, and “netiquette” — the set of general behavior norms on the Internet; 
ii) Users will accept the specific terms and conditions or participation rules of a particular service or resource when required, which will be explicitly requested when applicable; 
iii) The website may not be used in ways that fall outside these terms, including for illicit purposes, those contrary to morality or public order, or that could constitute a criminal offense. 

If comments or opinions are allowed, the Owner is not responsible for the opinions expressed by third parties, but reserves the right to remove or withhold content deemed offensive, inappropriate, or upon gaining effective knowledge of its nature. 

4. Privacy Policies of other project-related sites 

The SUS-SOIL project website includes social media buttons to facilitate interaction with your networks. Please note that this Privacy Policy does not apply to the external websites linked through the SUS-SOIL website. We encourage you to review their privacy policies before submitting any personal information. We are not responsible for the content or security of these external sites. 

5. Consent 

By accessing our Service, you accept this Privacy Policy and consent to the collection, storage, use, and disclosure of your personal information as described herein. 

Your data, including personal information, may be stored on our servers. By using this Service, you consent to the collection, storage, use, and disclosure of your personal information in accordance with our privacy policy, available on their website.`
    },
  };

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
                onClick={() => openModal('legal')}
                className="underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Legal Notice
              </button>
              <span aria-hidden="true">•</span>
              <button
                type="button"
                onClick={() => openModal('cookies')}
                className="underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Cookie Policy
              </button>
              <span aria-hidden="true">•</span>
              <button
                type="button"
                onClick={() => openModal('privacy')}
                className="underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Privacy Policy
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

      {/* Modal (Legal / Cookies / Privacy) - responsive con scroll y botón cerrar */}
      {modal.open && modal.type && (
        <div
          className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close modal background"
          />

          {/* Contenedor del modal (full-screen en móvil, caja en desktop) */}
          <div
            className="relative w-full h-full sm:h-auto sm:w-full sm:max-w-2xl bg-white rounded-none sm:rounded-xl shadow-xl border border-brown/20 overflow-hidden"
            role="document"
          >
            {/* Header sticky con botón cerrar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-white/95">
              <h3 id="legal-modal-title" className="text-base sm:text-lg font-semibold text-brown">
                {legalTexts[modal.type].title}
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-brown/20 text-brown hover:bg-darkGreen hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido con scroll interno */}
            <div className="px-4 sm:px-6 py-4 overflow-y-auto max-h-[calc(100vh-56px)] sm:max-h-[80vh]">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {legalTexts[modal.type].body}
              </div>
            </div>

            {/* Footer sticky en móvil con botón cerrar */}
            <div className="sticky bottom-0 z-10 px-4 sm:px-6 py-3 border-t bg-white/95 sm:hidden">
              <button
                type="button"
                onClick={closeModal}
                className="w-full px-5 py-2 rounded-md bg-brown text-white font-medium hover:bg-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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