import React, { useEffect, useMemo, useState } from 'react';

/**
 * SkeletonCard:
 * Tarjeta en modo “skeleton” (animación de carga) para mostrar
 * mientras se obtienen los datos de posts y eventos.
 */
const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4">
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    <div className="h-40 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
  </div>
);

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Filtro de tipo: 'all' | 'news' | 'events'
  const [filterType, setFilterType] = useState('all');

  // Llamadas a la API de WordPress
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?_embed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/event?_embed');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchPosts();
    fetchEvents();
  }, []);

  /**
   * Unifica posts (News) y eventos, asignándoles un campo “date”
   * para poder mezclarlos y ordenarlos cronológicamente.
   */
  const allData = useMemo(() => {
    // Convierte cada post a un objeto con datos clave
    const mappedPosts = posts.map((p) => ({
      id: p.id,
      type: 'news',
      date: p.date, // WordPress post.date
      title: p.title.rendered,
      excerpt: p.excerpt.rendered,
      featuredMedia: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    }));

    // Convierte cada event a un objeto con datos clave
    const mappedEvents = events.map((e) => ({
      id: e.id,
      type: 'event',
      // event.acf.date (ajusta si tu formato es distinto)
      date: e.acf?.date || e.date,
      title: e.acf?.title,
      excerpt: e.acf?.description, // Usamos “excerpt” como descripción
      featuredMedia: e._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      location: e.acf?.location,
    }));

    // Unifica y ordena por fecha descendente
    const unified = [...mappedPosts, ...mappedEvents].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return unified;
  }, [posts, events]);

  // Renderizador de tarjetas de Noticias (Posts)
  const renderNewsCards = () => {
    if (loadingPosts) {
      // Muestra placeholders mientras cargan las noticias
      return [...Array(3)].map((_, i) => <SkeletonCard key={`newsSkeleton-${i}`} />);
    }

    return posts.map((post) => (
      <div
        key={post.id}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        <h3 className="text-2xl font-bold mb-4 text-brown font-serif">
          {post.title.rendered}
        </h3>
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
        )}
        <div
          className="text-brown mb-4 flex-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <a
          href={`/news/${post.id}`}
          className="bg-brown text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors text-center"
        >
          Read More
        </a>
      </div>
    ));
  };

  // Renderizador de tarjetas de Eventos
  const renderEventCards = () => {
    if (loadingEvents) {
      // Muestra placeholders mientras cargan los eventos
      return [...Array(3)].map((_, i) => <SkeletonCard key={`eventSkeleton-${i}`} />);
    }

    return events.map((event) => (
      <div
        key={event.id}
        // Se utiliza el verde “bg-green-600” para mantener la coherencia
        className="bg-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        <h3 className="text-2xl font-bold mb-4 font-serif">{event.acf?.title || 'Untitled'}</h3>
        {event._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <img
            src={event._embedded['wp:featuredmedia'][0].source_url}
            alt={event.acf?.title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
        )}
        <p className="mb-2">{event.acf?.description}</p>
        <p className="mb-2">Date: {event.acf?.date}</p>
        <p className="mb-4">Location: {event.acf?.location}</p>
        <a
          href={`/event/${event.id}`}
          className="bg-white text-green-600 px-6 py-2 rounded-full hover:text-green-800 transition-colors text-center mt-auto"
        >
          See Event
        </a>
      </div>
    ));
  };

  // Renderizador de tarjetas mixtas (All), en orden cronológico
  const renderAllCards = () => {
    const isLoadingAll = loadingPosts || loadingEvents;
    if (isLoadingAll) {
      // Placeholder unificado
      return [...Array(3)].map((_, i) => <SkeletonCard key={`allSkeleton-${i}`} />);
    }

    // allData ya viene unificado y ordenado
    return allData.map((item) => {
      if (item.type === 'news') {
        return (
          <div
            key={`${item.type}-${item.id}`}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-4 text-brown font-serif">{item.title}</h3>
            {item.featuredMedia && (
              <img
                src={item.featuredMedia}
                alt={item.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            )}
            <div
              className="text-brown mb-4 flex-1"
              dangerouslySetInnerHTML={{ __html: item.excerpt }}
            />
            <a
              href={`/news/${item.id}`}
              className="bg-brown text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors text-center"
            >
              Read More
            </a>
          </div>
        );
      } else {
        // item.type === 'event'
        return (
          <div
            key={`${item.type}-${item.id}`}
            className="bg-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-4 font-serif">{item.title || 'Untitled'}</h3>
            {item.featuredMedia && (
              <img
                src={item.featuredMedia}
                alt={item.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            )}
            <p className="mb-2">{item.excerpt}</p>
            <p className="mb-2">Date: {item.date}</p>
            {item.location && <p className="mb-4">Location: {item.location}</p>}
            <a
              href={`/event/${item.id}`}
              className="bg-white text-green-600 px-6 py-2 rounded-full hover:text-green-800 transition-colors text-center mt-auto"
            >
              See Event
            </a>
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 mt-16 text-center text-brown font-serif">
          Latest News & Events
        </h2>

        {/* Botones de filtro: All / News / Events */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filterType === 'all' ? 'bg-brown text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('news')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filterType === 'news' ? 'bg-brown text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            News
          </button>
          <button
            onClick={() => setFilterType('events')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filterType === 'events' ? 'bg-green-600 text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            Events
          </button>
        </div>

        {/* Contenedor de tarjetas, usando grid para responsividad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterType === 'all'
            ? renderAllCards()
            : filterType === 'news'
            ? renderNewsCards()
            : renderEventCards()}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;