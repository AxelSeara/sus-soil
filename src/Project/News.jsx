// src/components/News.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4 min-h-[24rem]" aria-hidden="true">
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-10 bg-gray-300 rounded w-full mt-auto" />
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
      ease: 'easeInOut'
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [filterTag, setFilterTag] = useState('all');
  const [error, setError] = useState(null);
  const [orderAsc, setOrderAsc] = useState(false); // false = newest first
  const [page, setPage] = useState(1); // WP REST API pages start at 1
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  // Fetch a page of posts (efficient incremental loading)
  const fetchPosts = useCallback(async (requestedPage = 1) => {
    try {
      if (requestedPage === 1) {
        setLoadingPosts(true);
        setError(null);
      } else {
        setFetchingMore(true);
      }
      const perPage = 12; // tune as needed
      const response = await fetch(
        `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=12&_embed&per_page=${perPage}&page=${requestedPage}&_=${Date.now()}`
      );
      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
          // No more pages
          setHasMore(false);
          return;
        }
        throw new Error('Error fetching posts');
      }
      const newPosts = await response.json();

      // If returned fewer than perPage, no more pages
      if (newPosts.length < perPage) setHasMore(false);

      setPosts(prev => (requestedPage === 1 ? newPosts : [...prev, ...newPosts]));
    } catch (err) {
      console.error('Error fetching posts:', err);
      if (requestedPage === 1) setError(err.message);
      setHasMore(false);
    } finally {
      setLoadingPosts(false);
      setFetchingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const loadMore = () => {
    if (!hasMore || fetchingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  // Extract all tags from embedded terms (excluding categories)
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      const postTags = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(t => t.taxonomy !== 'category')) || [];
      postTags.forEach(tag => tagsSet.add(tag.name));
    });
    return ['all', ...Array.from(tagsSet).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  // Filter by selected tag
  const filteredPosts = useMemo(() => {
    const base = filterTag === 'all' ? posts : posts.filter(post => {
      const postTags = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(t => t.taxonomy !== 'category')) || [];
      return postTags.some(tag => tag.name.toLowerCase() === filterTag.toLowerCase());
    });
    // Sort (client-side) by date
    return [...base].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return orderAsc ? da - db : db - da;
    });
  }, [posts, filterTag, orderAsc]);

  const getExcerptText = html => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 140 ? text.substring(0, 137) + '…' : text;
  };

  const toggleOrder = () => setOrderAsc(o => !o);

  const renderSection = (items, loading, title) => {
    if (!loading && items.length === 0) return null;

    return (
      <section className="py-12 px-6 md:px-16 my-8" aria-labelledby="news-heading">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 id="news-heading" className="text-3xl md:text-4xl font-medium font-serif text-center md:text-left text-brown">
            {title}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter posts by tag">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown ${filterTag.toLowerCase() === tag.toLowerCase() ? 'bg-brown text-white' : 'bg-gray-100 text-brown hover:bg-brown hover:text-white'}`}
                  aria-pressed={filterTag.toLowerCase() === tag.toLowerCase()}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={toggleOrder}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-brown hover:bg-brown hover:text-white font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
              aria-label={orderAsc ? 'Orden cronológico descendente (más recientes primero)' : 'Orden cronológico ascendente (más antiguas primero)'}
            >
              {orderAsc ? <FaSortAmountUp aria-hidden="true" /> : <FaSortAmountDown aria-hidden="true" />}
              <span>{orderAsc ? 'Oldest → Newest' : 'Newest → Oldest'}</span>
            </button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          aria-live="polite"
        >
          {loading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : items.map(post => {
                const title = post.title?.rendered || 'No Title';
                const date = new Date(post.date);
                const dateFormatted = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                const excerptText = getExcerptText(post.excerpt?.rendered);
                const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                const postTags = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(t => t.taxonomy !== 'category')) || [];

                return (
                  <motion.article
                    key={post.id}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brown flex flex-col min-h-[24rem]"
                    tabIndex={-1}
                    variants={cardVariants}
                    aria-labelledby={`post-title-${post.id}`}
                  >
                    <h3
                      id={`post-title-${post.id}`}
                      className="text-xl font-serif mb-2 text-brown font-semibold leading-tight"
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p className="text-xs text-gray-500 mb-3">
                      <time dateTime={date.toISOString()}>{dateFormatted}</time>
                    </p>
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt=""
                        role="presentation"
                        className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-200 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4" aria-hidden="true">
                        <span className="text-gray-500 text-sm">No image</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed" aria-label="Excerpt">
                      {excerptText}
                    </p>
                    {postTags.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mb-4" aria-label="Tags">
                        {postTags.map(t => (
                          <li key={t.id}>
                            <span className="inline-block bg-lightGreen/20 text-darkGreen text-xs font-medium px-2 py-1 rounded-full">
                              {t.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto">
                      <a
                        href={`/news/${post.id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brown hover:bg-opacity-90 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
                        aria-label={`Read more: ${title.replace(/<[^>]+>/g, '')}`}
                      >
                        Read More <FaArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
        </motion.div>

        {/* Load More Button */}
        {!loading && hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={fetchingMore}
              className="px-8 py-3 rounded-full bg-brown text-white font-semibold shadow-md hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown transition"
              aria-live="polite"
            >
              {fetchingMore ? 'Loading…' : 'Load more news'}
            </button>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="mt-12 text-center text-sm text-gray-500" role="status">
            No more news.
          </p>
        )}
        {error && (
          <div className="text-center text-red-600 mt-8" role="alert">{error}</div>
        )}
      </section>
    );
  };

  return <>{renderSection(filteredPosts, loadingPosts, 'News & Events')}</>;
}

/*
Cambios principales:
1. Paginación incremental eficiente con parámetros ?per_page=&page= y botón "Load more news".
2. Control hasMore basado en número de resultados devueltos y manejo de errores 400/404 (fin de páginas).
3. Orden cronológico con botón toggle (Newest ↔ Oldest) accesible con iconos y labels ARIA.
4. Accesibilidad: roles, aria-labels, focus-visible, time element, article semantic, toolbar para filtros.
5. Mejora excerpt (140 chars) y tags listados en cada tarjeta.
6. Evitamos refetch completo al cambiar orden/tag: se filtra y ordena en memoria.
7. Ajustes de foco y estados deshabilitados.
8. Imagen marcada como decorativa (alt="") porque el título ya describe el contenido; si la imagen aporta info adicional, reemplazar alt.
9. Sorting no re-dispara fetch.
10. Preparado para internacionalización futura (usar toLocaleDateString con opciones).*/
