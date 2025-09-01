// src/components/News.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

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
    transition: { staggerChildren: 0.15, when: 'beforeChildren', duration: 0.5, ease: 'easeInOut' }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

// helper: detectar posts con tag "event"/"events" (no categorías)
const isEventPost = (post) => {
  const groups = post._embedded?.['wp:term'] || [];
  const terms = groups.flat().filter(Boolean);
  return terms.some((t) => {
    const name = (t.name || '').toLowerCase();
    const slug = (t.slug || '').toLowerCase();
    return t.taxonomy !== 'category' && (name === 'event' || name === 'events' || slug === 'event' || slug === 'events');
  });
};

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [filterTag, setFilterTag] = useState('all');
  const [error, setError] = useState(null);
  const [orderAsc, setOrderAsc] = useState(false); // false = newest first
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = params.get('filter');
      if (initial && initial.toLowerCase() === 'events') setFilterTag('events');
    } catch {}
  }, []);

  const fetchPosts = useCallback(async (requestedPage = 1) => {
    try {
      if (requestedPage === 1) {
        setLoadingPosts(true);
        setError(null);
      } else {
        setFetchingMore(true);
      }
      const perPage = 12;
      const response = await fetch(
        `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=12&_embed&per_page=${perPage}&page=${requestedPage}&_=${Date.now()}`
      );
      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
          setHasMore(false);
          return;
        }
        throw new Error('Error fetching posts');
      }
      const newPosts = await response.json();
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

  const fetchAllCategory = useCallback(async (catId = 12) => {
    const perPage = 100;
    let pageNum = 1;
    let out = [];
    while (true) {
      const url = `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${catId}&_embed&per_page=${perPage}&page=${pageNum}&_=${Date.now()}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 400 || res.status === 404) break;
        throw new Error('Error fetching full list');
      }
      const chunk = await res.json();
      out = out.concat(chunk);
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
      if (!totalPages || pageNum >= totalPages) break;
      pageNum += 1;
    }
    return out;
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  useEffect(() => {
    const isEvents = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';
    if (isEvents && !allLoaded) {
      (async () => {
        try {
          setLoadingPosts(true);
          setError(null);
          const allCat = await fetchAllCategory(12);
          allCat.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(allCat);
          setHasMore(false);
          setAllLoaded(true);
          setPage(1);
        } catch (e) {
          console.error(e);
          setError(e.message);
        } finally {
          setFetchingMore(false);
          setLoadingPosts(false);
        }
      })();
    }
  }, [filterTag, allLoaded, fetchAllCategory]);

  const loadMore = () => {
    if (!hasMore || fetchingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      const postTags = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(t => t.taxonomy !== 'category')) || [];
      postTags.forEach(tag => tagsSet.add(tag.name));
    });
    const tags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
    if (!tags.some(t => t.toLowerCase() === 'events' || t.toLowerCase() === 'event')) {
      tags.unshift('Events');
    }
    return ['all', ...tags];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const isEvents = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';
    let base;
    if (filterTag === 'all') {
      base = posts;
    } else if (isEvents) {
      base = posts.filter(isEventPost);
    } else {
      base = posts.filter(post => {
        const t = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(x => x.taxonomy !== 'category')) || [];
        return t.some(tag => (tag.name || '').toLowerCase() === filterTag.toLowerCase());
      });
    }
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
    if (!loading && items.length === 0) {
      if (filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event') {
        return (
          <section className="py-12 px-6 md:px-16 my-8">
            <h2 className="text-3xl md:text-4xl font-medium font-serif text-center md:text-left text-brown mb-6">
              {title}
            </h2>
            <p className="text-center text-sm text-gray-500">No events found.</p>
          </section>
        );
      }
      return null;
    }

    const isEventsView = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';

    return (
      <section className="py-12 px-6 md:px-16 my-8" aria-labelledby="news-heading">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 id="news-heading" className="text-3xl md:text-4xl font-medium font-serif text-center md:text-left text-brown">
            {title}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter posts by tag">
              {allTags.map(tag => {
                const value = tag.toLowerCase() === 'event' ? 'Events' : tag;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      setFilterTag(value);
                      if ((value.toLowerCase() === 'events' || value.toLowerCase() === 'event') && !allLoaded) {
                        setHasMore(false);
                        setPage(1);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown ${filterTag.toLowerCase() === value.toLowerCase() ? 'bg-brown text-white' : 'bg-gray-100 text-brown hover:bg-brown hover:text-white'}`}
                    aria-pressed={filterTag.toLowerCase() === value.toLowerCase()}
                  >
                    {value}
                  </button>
                );
              })}
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
                const plainTitle = title.replace(/<[^>]+>/g, '');
                const date = new Date(post.date);
                const dateFormatted = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                const excerptText = getExcerptText(post.excerpt?.rendered);
                const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                const postTags = (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter(t => t.taxonomy !== 'category')) || [];

                return (
                  <motion.article
                    key={post.id}
                    className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brown flex flex-col min-h-[24rem] group cursor-pointer"
                    tabIndex={-1}
                    variants={cardVariants}
                    aria-labelledby={`post-title-${post.id}`}
                  >
                    {/* stretched link para que toda la tarjeta sea clickable */}
                    <a
                      href={`/news/${post.id}`}
                      aria-label={`Read: ${plainTitle}`}
                      className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
                    />

                    {/* Título con subrayado animado limpio */}
                    <h3
                      id={`post-title-${post.id}`}
                      className="text-xl font-serif mb-2 text-brown font-semibold leading-tight"
                    >
                      <span className="relative inline-block">
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-brown scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                    </h3>

                    <p className="text-xs text-gray-500 mb-3">
                      <time dateTime={date.toISOString()}>{dateFormatted}</time>
                    </p>

                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt=""
                        role="presentation"
                        className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-200 group-hover:scale-105"
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
                      <ul className="flex flex-wrap gap-2 mt-auto" aria-label="Tags">
                        {postTags.map(t => (
                          <li key={t.id}>
                            <span className="inline-block bg-lightGreen/20 text-darkGreen text-xs font-medium px-2 py-1 rounded-full">
                              {t.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
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
              {fetchingMore ? (isEventsView ? 'Loading events…' : 'Loading…') : (isEventsView ? 'Load more events' : 'Load more news')}
            </button>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="mt-12 text-center text-sm text-gray-500" role="status">
            {isEventsView ? 'All events loaded.' : 'No more news.'}
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