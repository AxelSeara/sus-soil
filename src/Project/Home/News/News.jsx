// src/components/News.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

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
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=12&_embed&_=${Date.now()}`
        );
        const all = await response.json();

        const postsOnly = all.filter(
          (p) => !p._embedded?.['wp:term']?.[1]?.some((t) => t.name.toLowerCase() === 'event')
        );

        const eventsOnly = all.filter(
          (p) => p._embedded?.['wp:term']?.[1]?.some((t) => t.name.toLowerCase() === 'event')
        );

        setPosts(postsOnly.slice(0, 3));
        setEvents(eventsOnly.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
        setLoadingEvents(false);
      }
    };

    fetchAllPosts();
  }, []);

  const getExcerptText = (html) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    if (text.length > 100) return text.substring(0, 97) + '...';
    return text;
  };

  const renderSection = (items, loading, title, routePrefix) => {
    if (!loading && items.length === 0) return null;

    return (
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-3xl md:text-4xl font-medium font-serif text-center mb-10 text-brown">
          {title}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {loading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : items.map((post) => {
                const title = post.title?.rendered || 'No Title';
                const dateFormatted = new Date(post.date).toLocaleDateString();
                const excerptText = getExcerptText(post.excerpt?.rendered);
                const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

                return (
                  <motion.div
                    key={post.id}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col min-h-[24rem]"
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
        {!loading && items.length > 0 && title === 'Events' && (
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
    );
  };

  return (
    <>
      {renderSection(posts, loadingPosts, 'News', '/news')}
      {!loadingPosts && posts.length > 0 && (
        <div className="w-24 mx-auto border-t-2 border-darkGreen my-16"></div>
      )}
      {renderSection(events, loadingEvents, 'Events', '/events')}
    </>
  );
}
