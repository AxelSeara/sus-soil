import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente SkeletonCard: placeholder mientras se cargan los datos
 */
function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse flex flex-col space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
    </div>
  );
}

// Variantes para la animación de las tarjetas
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
};

/**
 * Función auxiliar para generar un slug SEO friendly
 * Formato: id-slugifiedTitle-YYYY-MM-DD
 */
const generateNewsSlug = (id, title, date) => {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
};

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Filtro: 'all' | 'news' | 'events'
  const [filterType, setFilterType] = useState('all');
  // Estado para mostrar los skeletons brevemente al cambiar el filtro
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Obtención de noticias y eventos desde la API
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

  // Cuando se cambie el filtro, mostramos los skeletons por 300ms
  useEffect(() => {
    setShowSkeleton(true);
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterType]);

  /**
   * Crea una versión unificada de posts y eventos para el filtro “All”.
   * Para los eventos se realiza un mapeo que extrae los campos relevantes.
   */
  const allData = useMemo(() => {
    const mappedPosts = posts.map((p) => ({
      id: p.id,
      type: 'news',
      date: p.date,
      title: p.title.rendered || 'No Title',
      excerpt: p.excerpt.rendered || '',
      featuredMedia: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    }));

    const mappedEvents = events.map((e) => ({
      id: e.id,
      type: 'event',
      date: e.acf?.date || e.date,
      title: e.acf?.title || e.title?.rendered || 'Untitled',
      excerpt: e.acf?.description || '',
      featuredMedia: e._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      location: e.acf?.location || '',
    }));

    const unified = [...mappedPosts, ...mappedEvents].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return unified;
  }, [posts, events]);

  // Renderiza solo las noticias
  const renderNewsCards = () => {
    if (loadingPosts) {
      return [...Array(3)].map((_, i) => (
        <motion.div
          key={`newsSkeleton-${i}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <SkeletonCard />
        </motion.div>
      ));
    }

    return posts.map((post) => (
      <motion.div
        key={post.id}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
          <h3 className="text-2xl font-medium font-serif mb-4 text-brown">
            {post.title.rendered}
          </h3>
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered || 'Post image'}
              className="mb-4 rounded-lg object-cover w-full h-40"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 mb-4 rounded-lg" />
          )}
          <div
            className="text-brown mb-4 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          {/* Aquí se utiliza Link con una URL SEO friendly */}
          <Link
            to={`/news/${generateNewsSlug(post.id, post.title.rendered, post.date)}`}
            className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-80 transition-colors text-center"
          >
            Read More
          </Link>
        </div>
      </motion.div>
    ));
  };

  // Renderiza solo los eventos
  const renderEventCards = () => {
    if (loadingEvents) {
      return [...Array(3)].map((_, i) => (
        <motion.div
          key={`eventSkeleton-${i}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <SkeletonCard />
        </motion.div>
      ));
    }

    const mappedEvents = events.map((e) => ({
      id: e.id,
      title: e.acf?.title || e.title?.rendered || 'Untitled',
      excerpt: e.acf?.description || '',
      featuredMedia: e._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      location: e.acf?.location || '',
      date: e.acf?.date || e.date,
    }));

    if (mappedEvents.length === 0) {
      return <p className="text-brown text-center">No events available.</p>;
    }

    return mappedEvents.map((event) => (
      <motion.div
        key={event.id}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col"
      >
        <div className="bg-darkGreen text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
          <h3 className="text-2xl font-medium font-serif mb-4">{event.title}</h3>
          {event.featuredMedia ? (
            <img
              src={event.featuredMedia}
              alt={event.title}
              className="mb-4 rounded-lg object-cover w-full h-40"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 mb-4 rounded-lg" />
          )}
          <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-sm">
            {event.excerpt || ''}
          </p>
          {event.location && (
            <p className="mb-2 text-sm">
              Location: <span className="font-semibold">{event.location}</span>
            </p>
          )}
          <p className="mb-4 text-sm">
            Date: <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
          </p>
          <Link
            to={`/event/${event.id}`}
            className="bg-white text-darkGreen px-4 py-2 rounded-full hover:text-darkGreen-80 transition-colors text-center mt-auto"
          >
            See Event
          </Link>
        </div>
      </motion.div>
    ));
  };

  // Renderiza la unión de ambos tipos (news y events)
  const renderAllCards = () => {
    const isLoadingAll = loadingPosts || loadingEvents;
    if (isLoadingAll) {
      return [...Array(3)].map((_, i) => (
        <motion.div
          key={`allSkeleton-${i}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <SkeletonCard />
        </motion.div>
      ));
    }

    return allData.map((item) => {
      if (item.type === 'news') {
        return (
          <motion.div
            key={`${item.type}-${item.id}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
              <h3 className="text-2xl font-medium font-serif mb-4 text-brown">{item.title}</h3>
              {item.featuredMedia ? (
                <img
                  src={item.featuredMedia}
                  alt={item.title}
                  className="mb-4 rounded-lg object-cover w-full h-40"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 mb-4 rounded-lg" />
              )}
              <div
                className="text-brown mb-4 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
                dangerouslySetInnerHTML={{ __html: item.excerpt || '' }}
              />
              <Link
                to={`/news/${generateNewsSlug(item.id, item.title, item.date)}`}
                className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-80 transition-colors text-center"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        );
      } else {
        // item.type === 'event'
        return (
          <motion.div
            key={`${item.type}-${item.id}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col"
          >
            <div className="bg-darkGreen text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
              <h3 className="text-2xl font-medium font-serif mb-4">{item.title || 'Untitled'}</h3>
              {item.featuredMedia ? (
                <img
                  src={item.featuredMedia}
                  alt={item.title}
                  className="mb-4 rounded-lg object-cover w-full h-40"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 mb-4 rounded-lg" />
              )}
              <div
                className="mb-2 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
                dangerouslySetInnerHTML={{ __html: item.excerpt || '' }}
              />
              {item.location && (
                <p className="mb-2 text-sm">
                  Location: <span className="font-semibold">{item.location}</span>
                </p>
              )}
              <p className="mb-4 text-sm">
                Date: <span className="font-semibold">{new Date(item.date).toLocaleDateString()}</span>
              </p>
              <Link
                to={`/event/${item.id}`}
                className="bg-white text-darkGreen px-4 py-2 rounded-full hover:text-darkGreen-80 transition-colors text-center mt-auto"
              >
                See Event
              </Link>
            </div>
          </motion.div>
        );
      }
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-medium font-serif mb-8 mt-16 text-center text-brown">
          Latest News & Events
        </h2>

        {/* Botones de filtro */}
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

        {/* Contenedor de tarjetas con AnimatePresence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {showSkeleton ? (
              // Se muestran 3 skeletons durante la transición
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={`transition-skel-${i}`}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : filterType === 'all' ? (
              renderAllCards()
            ) : filterType === 'news' ? (
              renderNewsCards()
            ) : (
              renderEventCards()
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;