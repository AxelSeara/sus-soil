// EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaEnvelope,
  FaWhatsapp,
  FaTelegramPlane,
  FaCopy,
} from 'react-icons/fa';

// Ícono X para Twitter
const XIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.3,2.3L12,10l7.7-7.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3c0.4,0.4,0.4,1,0,1.4L14,12l7.7,7.7
      c0.4,0.4,0.4,1,0,1.4l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0L12,14l-7.7,7.7c-0.4,0.4-1,0.4-1.4,0L1.6,20.3
      c-0.4-0.4-0.4-1,0-1.4L9.3,12L1.6,4.3c-0.4-0.4-0.4-1,0-1.4l1.3-1.3C3.3,1.9,3.9,1.9,4.3,2.3z" />
  </svg>
);

// Ícono para Bluesky (muy simplificado: una "B")
const BlueskyIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text x="2" y="18" fontSize="18" fontFamily="Arial" fill="currentColor">
      B
    </text>
  </svg>
);

/**
 * Helper para formatear la fecha para Google Calendar.
 * Se asume un evento de día completo.
 */
const formatDateForCalendar = (dateStr) => {
  const d = new Date(dateStr);
  const year = d.getUTCFullYear();
  const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + d.getUTCDate()).slice(-2);
  return `${year}${month}${day}`;
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');

  // Carga el evento (desde WP)
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/event/${id}?_embed`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoadingEvent(false);
        window.scrollTo(0, 0);
      }
    };
    fetchEvent();
  }, [id]);

  if (loadingEvent) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Placeholder de carga */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-red-500">Event not found</h2>
      </div>
    );
  }

  // Extracción de datos del evento
  const title = event.acf?.title || event.title?.rendered || 'No Title';
  const imageUrl =
    event._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const date = event.acf?.date || event.date;
  const location = event.acf?.location || '';
  const description = event.acf?.description || '';

  // Enlace para "Add to Calendar" (Google Calendar)
  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatDateForCalendar(date)}/${formatDateForCalendar(date)}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Opciones de compartir (reordenadas: Facebook, Bluesky, Twitter, Email, WhatsApp, Telegram, Copy Link)
  const shareOptions = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      icon: <FaFacebookF size={16} />,
    },
    {
      name: 'Bluesky',
      href: `https://blueskyweb.xyz/compose?text=${encodeURIComponent(
        title + " " + window.location.href
      )}`,
      bg: 'bg-sky-400',
      hover: 'hover:bg-sky-500',
      icon: <BlueskyIcon size={16} />,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(
        title
      )}`,
      bg: 'bg-slate-500',
      hover: 'hover:bg-slate-600',
      icon: <XIcon size={16} />,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=Check out this event: ${window.location.href}`,
      bg: 'bg-gray-600',
      hover: 'hover:bg-gray-700',
      icon: <FaEnvelope size={16} />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + window.location.href)}`,
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      icon: <FaWhatsapp size={16} />,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(title)}`,
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      icon: <FaTelegramPlane size={16} />,
    },
    {
      name: 'Copy Link',
      onClick: handleCopyLink,
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      icon: <FaCopy size={16} />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-4 py-12">
        {/* Grid de dos columnas: Imagen y Detalles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-16">
          {/* Columna izquierda: Imagen */}
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[800px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xl">Here flyer image</span>
              </div>
            )}
          </div>
          {/* Columna derecha: Detalles en tarjeta vertical (formato A4) */}
          <div className="bg-green-200 p-6 rounded-xl shadow-lg flex flex-col min-h-[800px]">
            <h1 className="text-3xl sm:text-4xl font-bold text-brown mb-4">
              {title}
            </h1>
            <p className="text-gray-500 text-sm mb-2">
              Date: <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
            </p>
            {location && (
              <p className="text-gray-500 text-sm mb-4">
                Location: <span className="font-medium">{location}</span>
              </p>
            )}
            <div
              className="text-brown leading-relaxed flex-1 mb-6"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        </div>

        {/* Sección de botones: Add to Calendar y Share */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brown text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Add to Calendar
          </a>
          <button
            onClick={toggleShareOptions}
            className="bg-gray-200 text-brown px-6 py-3 rounded-full hover:bg-gray-300 transition-colors"
          >
            Share
          </button>
        </div>

        {/* Menú de compartir con animación */}
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t pt-4 max-w-xl mx-auto space-y-2"
          >
            {shareOptions.map((option, idx) =>
              option.href ? (
                <a
                  key={idx}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex justify-between items-center ${option.bg} ${option.hover} text-white px-4 py-2 rounded transition-colors`}
                >
                  <span>{option.name}</span>
                  <span>{option.icon}</span>
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={option.onClick}
                  className={`w-full flex justify-between items-center ${option.bg} ${option.hover} text-white px-4 py-2 rounded transition-colors`}
                >
                  <span>{option.name}</span>
                  <span>{option.icon}</span>
                </button>
              )
            )}
            {copySuccess && (
              <p className="mt-2 text-sm text-green-600 text-center">{copySuccess}</p>
            )}
          </motion.div>
        )}

        {/* Tarjeta de Google Maps (usando la dirección en la búsqueda) */}
        {location && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-brown mb-4">Event Location</h2>
            <div className="border rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Event Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
                allowFullScreen
                className="w-full h-64"
              ></iframe>
            </div>
          </div>
        )}

        {/* Sección "Stay Updated" con CTA mejorado */}
        <div className="mt-12 border-t pt-8 text-center">
          <h2 className="text-2xl font-bold text-brown mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Join our newsletter to receive the latest updates on upcoming events.
          </p>
          <form
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              // Lógica de suscripción (placeholder)
              setNewsletterSuccess('Subscribed successfully!');
              setTimeout(() => setNewsletterSuccess(''), 3000);
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Subscribe Now
            </button>
          </form>
          {newsletterSuccess && (
            <p className="mt-4 text-green-600">{newsletterSuccess}</p>
          )}
        </div>

        {/* Botón para volver a la lista de eventos/noticias */}
        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="bg-brown text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Back to Events & News
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;