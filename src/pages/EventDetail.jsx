import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaXTwitter,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
} from 'react-icons/fa6';

//
// Skeleton para el detalle principal de evento
//
const SkeletonEventDetail = () => (
  <div className="animate-pulse flex flex-col gap-4">
    <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
    <div className="w-full h-64 bg-gray-200 rounded"></div>
    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
    <div className="h-4 w-full bg-gray-200 rounded"></div>
    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    <div className="flex gap-2 mt-4">
      <div className="h-10 w-36 bg-gray-300 rounded"></div>
      <div className="h-10 w-36 bg-gray-300 rounded"></div>
    </div>
  </div>
);

//
// Skeleton para tarjetas de eventos recientes
//
const SkeletonRecentEventCard = () => (
  <div className="border p-4 rounded-lg shadow-md animate-pulse flex flex-col gap-2">
    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
    <div className="w-full h-36 bg-gray-200 rounded"></div>
    <div className="h-4 w-1/2 bg-gray-300 rounded self-end"></div>
  </div>
);

const EventDetail = () => {
  const { id } = useParams();

  // Estados para el evento principal
  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  // Estados para eventos recientes
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Para el menú de compartir
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    // Carga del evento principal
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/event/${id}?_embed`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event detail:', error);
      } finally {
        setLoadingEvent(false);
        window.scrollTo(0, 0); // Scroll al inicio
      }
    };

    // Carga de los eventos recientes
    const fetchRecentEvents = async () => {
      try {
        setLoadingRecent(true);
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/event?per_page=3&order=desc&orderby=date&_embed'
        );
        const data = await response.json();
        setRecentEvents(data);
      } catch (error) {
        console.error('Error fetching recent events:', error);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchEvent();
    fetchRecentEvents();
  }, [id]);

  // Muestra skeleton mientras carga el evento principal
  if (loadingEvent && !event) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6 mt-16">
        <Link
          to="/events"
          className="inline-flex items-center text-brown hover:text-green-700 transition-colors mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </Link>
        <SkeletonEventDetail />
      </div>
    );
  }

  // Si ya cargó pero no se encontró el evento
  if (!event) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6 mt-16">
        <Link
          to="/events"
          className="inline-flex items-center text-brown hover:text-green-700 transition-colors mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </Link>
        <h2 className="text-2xl font-bold text-red-500">Event not found</h2>
      </div>
    );
  }

  // Datos clave del evento
  const title = event.acf?.title || 'Untitled Event';
  const description = event.acf?.description || '';
  const date = event.acf?.date || event.date; // Asegúrate de usar el campo correcto
  const location = event.acf?.location || 'N/A';
  const featuredImgUrl =
    event._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  // Renderiza menú desplegable de compartir
  const renderShareDropdown = () => {
    if (!shareOpen) return null;

    return (
      <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-10 border">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaFacebookF />
          Share on Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(
            title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaXTwitter />
          Share on X
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=Check out this event! ${
            window.location.href
          }`}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaEnvelope />
          Share via Email
        </a>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Sección de detalle de evento */}
      <section className="max-w-screen-xl mx-auto px-4 py-6 mt-16">
        {/* Botón para volver al listado de eventos */}
        <div className="mb-6">
          <Link
            to="/events"
            className="inline-flex items-center text-brown hover:text-green-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>

        {/* Tarjeta principal con info del evento */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brown font-serif">
            {title}
          </h1>
          {/* Imagen destacada */}
          {featuredImgUrl && (
            <img
              src={featuredImgUrl}
              alt={title}
              className="w-full max-h-[600px] object-cover rounded-md mb-4"
            />
          )}

          {/* Fecha y lugar */}
          <p className="text-sm text-gray-500 mb-2">
            Date: <span className="font-medium">{date}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Location: <span className="font-medium">{location}</span>
          </p>

          {/* Descripción del evento */}
          <div className="text-brown leading-relaxed mb-8 whitespace-pre-line">
            {description}
          </div>

          {/* Botón y menú para compartir */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShareOpen((prev) => !prev)}
              className="inline-flex items-center bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
            >
              Share
              {shareOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            {renderShareDropdown()}
          </div>
        </div>
      </section>

      {/* Sección de eventos recientes */}
      <section className="max-w-screen-xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-brown font-serif">
          Recent Events
        </h2>

        {loadingRecent ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonRecentEventCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentEvents.map((ev) => {
              const evTitle = ev.acf?.title || 'Untitled Event';
              const evImage =
                ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
              const evDate = ev.acf?.date || ev.date;
              const evLocation = ev.acf?.location || 'N/A';

              return (
                <div
                  key={ev.id}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-brown font-serif mb-2 line-clamp-2">
                    {evTitle}
                  </h3>
                  {evImage ? (
                    <img
                      src={evImage}
                      alt={evTitle}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 mb-2 rounded"></div>
                  )}
                  <p className="text-sm text-gray-500 mb-1">
                    Date: <span className="font-medium">{evDate}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Location: <span className="font-medium">{evLocation}</span>
                  </p>
                  <Link
                    to={`/event/${ev.id}`}
                    className="mt-auto inline-block bg-brown text-white px-4 py-2 rounded-full text-center hover:bg-opacity-80 transition-colors"
                  >
                    See Event
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDetail;