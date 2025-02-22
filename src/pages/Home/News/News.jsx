// src/components/News.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Componente SkeletonCard: muestra un placeholder mientras se cargan los items
function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4">
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
      when: "beforeChildren",
      duration: 0.5,
      ease: 'easeInOut'
    } 
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
      damping: 15 
    },
  },
};

import { motion } from 'framer-motion';

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/event?per_page=3&_embed'
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

  return (
    <>
      {/* Sección Latest News */}
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-4xl font-medium font-serif text-center mb-10 text-brown">
          Latest News
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {loadingPosts
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-[0_0_20px_rgba(110,187,120,0.7)] transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col"
                  variants={cardVariants}
                >
                  <h3 className="text-2xl font-medium font-serif mb-4 text-brown">
                    {post.title.rendered}
                  </h3>
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <img
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered || 'Post image'}
                      className="mb-4 rounded-lg object-cover w-full h-40"
                    />
                  )}
                  <div className="mt-auto">
                    <a
                      href={`/news/${post.id}`}
                      className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Read More
                    </a>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </section>

      {/* Separador */}
      <div className="w-24 mx-auto border-t-2 border-darkGreen my-8"></div>

      {/* Sección Latest Events */}
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-4xl font-medium font-serif text-center mb-10 text-brown">
          Latest Events
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {loadingEvents
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : events.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-[0_0_20px_rgba(110,187,120,0.7)] transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col"
                  variants={cardVariants}
                >
                  <h3 className="text-2xl font-medium font-serif mb-4 text-brown">
                    {event.title.rendered || event.acf?.title || "Untitled Event"}
                  </h3>
                  {event._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <img
                      src={event._embedded['wp:featuredmedia'][0].source_url}
                      alt={event.title.rendered || "Event image"}
                      className="mb-4 rounded-lg object-cover w-full h-40"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <div className="mt-auto">
                    <a
                      href={`/event/${event.id}`}
                      className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Read More
                    </a>
                  </div>
                </motion.div>
              ))}
        </motion.div>
        <div className="text-center mt-12">
          <a
            href="/events"
            className="px-8 py-4 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-lg transition-colors"
          >
            Visit All Events
          </a>
        </div>
      </section>
    </>
  );
};

export default News;