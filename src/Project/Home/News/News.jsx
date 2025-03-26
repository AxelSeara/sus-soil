// src/components/News.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

/**
 * Componente SkeletonCard para el loading.
 */
function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4 min-h-[24rem]">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
    </div>
  );
}

// Variants para animar el contenedor del grid
const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Variants para cada tarjeta
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    // Fetch latest news (limit 3)
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&_embed'
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    // Fetch events by tag ID (por ejemplo 7)
    const EVENT_TAG_ID = 7;
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?tags=${EVENT_TAG_ID}&per_page=3&_embed`
        );
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

  // Helper para extraer excerpt en texto plano y acortarlo
  const getExcerptText = (html) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, ''); // elimina etiquetas HTML
    if (text.length > 100) {
      return text.substring(0, 97) + '...';
    }
    return text;
  };

  return (
    <>
      {/* Sección “News” */}
      {!loadingPosts && posts.length === 0 ? null : (
        <section className="py-12 px-6 md:px-16 my-8">
          <h2 className="text-3xl md:text-4xl font-medium font-serif text-center mb-10 text-brown">
            News
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {loadingPosts
              ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              : posts.map((post) => {
                  const title = post.title?.rendered || 'No Title';
                  const dateFormatted = new Date(post.date).toLocaleDateString();
                  const excerptText = getExcerptText(post.excerpt?.rendered);
                  const imgUrl =
                    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

                  return (
                    <motion.div
                      key={post.id}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 
                                 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col 
                                 min-h-[24rem]"
                      variants={cardVariants}
                    >
                      <h3 className="text-xl font-serif mb-2 text-brown font-semibold leading-tight">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        Published on: {dateFormatted}
                      </p>
                      {imgUrl && (
                        <img
                          src={imgUrl}
                          alt={title}
                          className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-200 hover:scale-105"
                        />
                      )}
                      {/* Excerpt breve */}
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {excerptText}
                      </p>
                      <div className="mt-auto">
                        <a
                          href={`/news/${post.id}`}
                          className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                          Read More <FaArrowRight className="inline-block ml-2" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
          </motion.div>
        </section>
      )}

      {/* Separador si se mostró “News” */}
      {(!loadingPosts && posts.length > 0) && (
        <div className="w-24 mx-auto border-t-2 border-darkGreen my-16"></div>
      )}

      {/* Sección “Events” */}
      {!loadingEvents && events.length === 0 ? null : (
        <section className="py-12 px-6 md:px-16 my-8">
          <h2 className="text-3xl md:text-4xl font-medium font-serif text-center mb-10 text-brown">
            Events
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {loadingEvents
              ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              : events.map((ev) => {
                  const title = ev.title?.rendered || ev.acf?.title || 'Untitled Event';
                  const dateFormatted = new Date(ev.date).toLocaleDateString();
                  const excerptText = getExcerptText(ev.excerpt?.rendered);
                  const imgUrl =
                    ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

                  return (
                    <motion.div
                      key={ev.id}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 
                                 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col 
                                 min-h-[24rem]"
                      variants={cardVariants}
                    >
                      <h3 className="text-xl font-serif mb-2 text-brown font-semibold leading-tight">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        Published on: {dateFormatted}
                      </p>
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={title}
                          className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-200 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {excerptText}
                      </p>
                      <div className="mt-auto">
                        <a
                          href={`/news/${ev.id}`} 
                          // Ajustar si tu ruta de eventos es /event/:id
                          className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                          Read More <FaArrowRight className="inline-block ml-2" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
          </motion.div>

          {/* Botón "Visit All Events" si hay events */}
          {!loadingEvents && events.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/events"
                className="px-8 py-4 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-lg transition-colors"
              >
                Visit All Events
              </a>
            </div>
          )}
        </section>
      )}
    </>
  );
}