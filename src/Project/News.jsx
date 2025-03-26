import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
};

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
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch(`https://admin.sus-soil.eu/wp-json/wp/v2/posts?_embed&_=${Date.now()}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setShowSkeleton(true);
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterType]);

  const renderCards = () => {
    const filtered =
      filterType === 'all'
        ? posts
        : posts.filter((p) => {
            const tags = p._embedded?.['wp:term']?.[1] || [];
            return filterType === 'news'
              ? !tags.find((t) => t.name.toLowerCase() === 'event')
              : tags.find((t) => t.name.toLowerCase() === 'event');
          });

    if (loadingPosts || showSkeleton) {
      return [...Array(3)].map((_, i) => (
        <motion.div key={`skel-${i}`} variants={cardVariants} initial="initial" animate="animate" exit="exit">
          <SkeletonCard />
        </motion.div>
      ));
    }

    return filtered.map((post) => {
      const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      const tags = post._embedded?.['wp:term']?.[1] || [];
      const tagNames = tags.map((tag) => tag.name);
      const isEvent = tagNames.includes('Event');

      return (
        <motion.div
          key={post.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
            <div className="relative mb-4">
              {image ? (
                <img
                  src={image}
                  alt={post.title.rendered || 'Post image'}
                  className="rounded-lg object-cover w-full h-40"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg" />
              )}
              <div className="absolute top-2 left-2 flex gap-2">
                {tagNames.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full font-semibold shadow ${
                      tag === 'Event' ? 'bg-green-600 text-white' : 'bg-brown text-white'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-medium font-serif mb-4 text-brown">{post.title.rendered}</h3>
            <div
              className="text-brown mb-4 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link
              to={`/news/${generateNewsSlug(post.id, post.title.rendered, post.date)}`}
              className={`px-4 py-2 rounded-full transition-colors text-center font-semibold ${
                isEvent ? 'bg-green-600 text-white' : 'bg-brown text-white'
              }`}
            >
              {isEvent ? 'See Event' : 'Read More'}
            </Link>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-medium font-serif mb-8 text-center text-brown">
          Latest News & Events
        </h2>
        <div className="flex justify-center items-center space-x-4 mb-8">
          {['all', 'news', 'events'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                filterType === type
                  ? type === 'events'
                    ? 'bg-green-600 text-white'
                    : 'bg-brown text-white'
                  : 'bg-gray-100 text-brown'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>{renderCards()}</AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
