import React, { useEffect, useMemo, useState } from 'react';

/**
 * SkeletonCard:
 * Tarjeta en modo “skeleton” para mostrar
 * mientras se obtienen los datos de posts y eventos.
 */
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-xl shadow-md animate-pulse flex flex-col space-y-3">
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
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
    // Mapeo de noticias
    const mappedPosts = posts.map((p) => ({
      id: p.id,
      type: 'news',
      date: p.date, // WordPress post.date
      title: p.title.rendered,
      excerpt: p.excerpt.rendered, // posible recorte
      featuredMedia: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    }));

    // Mapeo de eventos
    const mappedEvents = events.map((e) => ({
      id: e.id,
      type: 'event',
      date: e.acf?.date || e.date,
      title: e.acf?.title,
      excerpt: e.acf?.description,
      featuredMedia: e._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      location: e.acf?.location,
    }));

    // Unifica y ordena por fecha (desc)
    const unified = [...mappedPosts, ...mappedEvents].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return unified;
  }, [posts, events]);

  // ============ RENDER DE NOTICIAS ============
  const renderNewsCards = () => {
    if (loadingPosts) {
      // Muestra placeholders mientras cargan las noticias
      return [...Array(3)].map((_, i) => <SkeletonCard key={`newsSkeleton-${i}`} />);
    }

    return posts.map((post) => (
      <div
        key={post.id}
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        <h3 className="text-xl font-bold mb-3 text-brown">
          {post.title.rendered}
        </h3>

        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            className="w-full h-32 object-cover mb-3 rounded-lg"
          />
        ) : (
          // Placeholder si no hay imagen
          <div className="w-full h-32 bg-gray-200 mb-3 rounded-lg" />
        )}

        {/* Texto más corto y line-clamp para reducir altura */}
        <div
          className="text-brown mb-3 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <a
          href={`/news/${post.id}`}
          className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-80 transition-colors text-center"
        >
          Read More
        </a>
      </div>
    ));
  };

  // ============ RENDER DE EVENTOS ============
  const renderEventCards = () => {
    if (loadingEvents) {
      // Muestra placeholders mientras cargan los eventos
      return [...Array(3)].map((_, i) => <SkeletonCard key={`eventSkeleton-${i}`} />);
    }

    return events.map((event) => (
      <div
        key={event.id}
        className="bg-darkGreen text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        <h3 className="text-xl font-bold mb-3">{event.title || 'Untitled'}</h3>

        {event.featuredMedia ? (
          <img
            src={event.featuredMedia}
            alt={event.title || 'Event image'}
            className="w-full h-32 object-cover mb-3 rounded-lg"
          />
        ) : (
          // Placeholder si no hay imagen
          <div className="w-full h-32 bg-gray-200 mb-3 rounded-lg" />
        )}

        {/* Texto y ubicación, recortado si es muy largo */}
        <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-sm">
          {event.excerpt || ''}
        </p>
        {event.location && (
          <p className="mb-2 text-sm">
            Location: <span className="font-semibold">{event.location}</span>
          </p>
        )}

        <p className="mb-3 text-sm">
          Date: <span className="font-semibold">{event.date}</span>
        </p>

        <a
          href={`/event/${event.id}`}
          className="bg-white text-darkGreen px-4 py-2 rounded-full hover:text-darkGreen-80 transition-colors text-center mt-auto"
        >
          See Event
        </a>
      </div>
    ));
  };

  // ============ RENDER DE BOTH (ALL) ============
  const renderAllCards = () => {
    const isLoadingAll = loadingPosts || loadingEvents;
    if (isLoadingAll) {
      return [...Array(3)].map((_, i) => <SkeletonCard key={`allSkeleton-${i}`} />);
    }

    return allData.map((item) => {
      if (item.type === 'news') {
        return (
          <div
            key={`${item.type}-${item.id}`}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className="text-xl font-bold mb-3 text-brown">{item.title}</h3>
            {item.featuredMedia ? (
              <img
                src={item.featuredMedia}
                alt={item.title}
                className="w-full h-32 object-cover mb-3 rounded-lg"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 mb-3 rounded-lg" />
            )}
            <div
              className="text-brown mb-3 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
              dangerouslySetInnerHTML={{ __html: item.excerpt || '' }}
            />
            <a
              href={`/news/${item.id}`}
              className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-80 transition-colors text-center"
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
            className="bg-darkGreen text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className="text-xl font-bold mb-3">{item.title || 'Untitled'}</h3>
            {item.featuredMedia ? (
              <img
                src={item.featuredMedia}
                alt={item.title}
                className="w-full h-32 object-cover mb-3 rounded-lg"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 mb-3 rounded-lg" />
            )}

            <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-sm">
              {item.excerpt || ''}
            </p>
            {item.location && (
              <p className="mb-2 text-sm">
                Location: <span className="font-semibold">{item.location}</span>
              </p>
            )}
            <p className="mb-3 text-sm">
              Date: <span className="font-semibold">{item.date}</span>
            </p>

            <a
              href={`/event/${item.id}`}
              className="bg-white text-darkGreen px-4 py-2 rounded-full hover:text-darkGreen-80 transition-colors text-center mt-auto"
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
        <h2 className="text-3xl font-bold mb-8 mt-16 text-center text-brown">
          Latest News & Events
        </h2>

        {/* Botones de filtro: All / News / Events */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filterType === 'all' ? 'bg-brown text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('news')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filterType === 'news' ? 'bg-brown text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            News
          </button>
          <button
            onClick={() => setFilterType('events')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filterType === 'events' ? 'bg-darkGreen text-white' : 'bg-gray-100 text-brown'
            }`}
          >
            Events
          </button>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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