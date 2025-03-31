import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CATEGORY_ID = 12; // News & Events

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

// Extrae de todos los grupos de términos los tags que no sean categorías
const getPostTags = (post) => {
  let tags = [];
  if (post._embedded?.['wp:term']) {
    post._embedded['wp:term'].forEach((termArray) => {
      tags = tags.concat(termArray.filter((t) => t.taxonomy !== 'category'));
    });
  }
  return tags;
};

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Añadimos per_page, order y orderby para traer todos los posts y ordenarlos por fecha
        const res = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&_embed&per_page=100&order=desc&orderby=date`
        );
        if (!res.ok) throw new Error('Error fetching posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Extraer todos los tags (excluyendo categorías)
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach((post) => {
      const postTags = getPostTags(post);
      postTags.forEach((tag) => tagsSet.add(tag.name));
    });
    return ['all', ...Array.from(tagsSet)];
  }, [posts]);

  // Si el filtro es "all", se muestran todos los posts; si no, se filtran por tag
  const filteredPosts = useMemo(() => {
    if (filterTag === 'all') return posts;
    return posts.filter((post) => {
      const postTags = getPostTags(post);
      return postTags.some(
        (tag) => tag.name.toLowerCase() === filterTag.toLowerCase()
      );
    });
  }, [posts, filterTag]);

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-medium font-serif mb-8 text-center text-brown">
          Latest News &amp; Events
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

        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center text-gray-500">
            No posts found for the selected tag.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading
              ? [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <Skeleton height={24} width="75%" className="mb-4" />
                      <Skeleton height={160} className="mb-4" />
                      <Skeleton count={2} height={10} className="mb-4" />
                      <Skeleton height={36} width={120} />
                    </div>
                  </motion.div>
                ))
              : filteredPosts.map((post) => {
                  const image =
                    post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                  const postTags = getPostTags(post);
                  const tagNames = postTags.map((tag) => tag.name);

                  return (
                    <motion.div
                      key={post.id}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
                        <div className="relative mb-4">
                          {image ? (
                            <img
                              src={image}
                              alt={post.title.rendered}
                              className="rounded-lg object-cover w-full h-40"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 rounded-lg" />
                          )}
                          <div className="absolute top-2 left-2 flex gap-2">
                            {tagNames.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-3 py-1 rounded-full font-semibold shadow bg-brown text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-2xl font-medium font-serif mb-4 text-brown">
                          {post.title.rendered}
                        </h3>
                        <div
                          className="text-brown mb-4 flex-1 line-clamp-2 overflow-hidden text-ellipsis text-sm"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                        <Link
                          to={`/news/${generateNewsSlug(
                            post.id,
                            post.title.rendered,
                            post.date
                          )}`}
                          className="px-4 py-2 rounded-full bg-brown text-white text-center font-semibold hover:bg-darkGreen transition-colors"
                        >
                          Read More
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;