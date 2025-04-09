// src/components/News.jsx
import React, { useState, useEffect, useMemo } from 'react';
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
  const [filterTag, setFilterTag] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=12&_embed&_=${Date.now()}`
        );
        if (!response.ok) throw new Error('Error fetching posts');
        const allPosts = await response.json();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Extrae todos los tags (excluyendo, por ejemplo, los de categoría)
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach((post) => {
      const postTags =
        (post._embedded?.['wp:term'] &&
          post._embedded['wp:term'].flat().filter((t) => t.taxonomy !== 'category')) ||
        [];
      postTags.forEach((tag) => tagsSet.add(tag.name));
    });
    return ['all', ...Array.from(tagsSet)];
  }, [posts]);

  // Si el filtro es "all", se muestran todos los posts; si no, se filtran por tag
  const filteredPosts = useMemo(() => {
    if (filterTag === 'all') return posts;
    return posts.filter((post) => {
      const postTags =
        (post._embedded?.['wp:term'] &&
          post._embedded['wp:term'].flat().filter((t) => t.taxonomy !== 'category')) ||
        [];
      return postTags.some((tag) => tag.name.toLowerCase() === filterTag.toLowerCase());
    });
  }, [posts, filterTag]);

  const getExcerptText = (html) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    if (text.length > 100) return text.substring(0, 97) + '...';
    return text;
  };

  const renderSection = (items, loading, title) => {
    if (!loading && items.length === 0) return null;

    return (
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-3xl md:text-4xl font-medium font-serif text-center mb-10 text-brown">
          {title}
        </h2>

        {/* Menú superior para filtrar por tag */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors focus:outline-none ${
                filterTag.toLowerCase() === tag.toLowerCase()
                  ? 'bg-brown text-white'
                  : 'bg-gray-100 text-brown hover:bg-brown hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

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
                const imgUrl =
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

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
        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}
      </section>
    );
  };

  return <>{renderSection(filteredPosts, loadingPosts, 'News & Events')}</>;
}