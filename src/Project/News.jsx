// src/components/News.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { fetchCategoryPage, fetchAllCategory } from '../services/wpApi';
import { CardSkeleton } from '../components/Skeletons';
import SEO from '../components/SEO';
import { cardReveal, listReveal } from '../lib/motion';
import { getFeaturedMedia, getWpImageProps, stripHtml } from '../lib/imageSeo';

const gridVariants = listReveal;
const cardVariants = cardReveal;

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
  const [page, setPage] = useState(1); // WP REST API pages start at 1
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false); // true cuando ya cargamos TODAS las páginas
  const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://sus-soil.eu').replace(/\/+$/, '');

  // si viene ?filter=events en la URL, aplicarlo al montar
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = params.get('filter');
      if (initial && initial.toLowerCase() === 'events') setFilterTag('events');
    } catch {
      // Ignore malformed URL params.
    }
  }, []);

  // Fetch una página (carga incremental por defecto)
  const fetchPosts = useCallback(async (requestedPage = 1) => {
    try {
      if (requestedPage === 1) {
        setLoadingPosts(true);
        setError(null);
      } else {
        setFetchingMore(true);
      }
      const { posts: newPosts, hasMore } = await fetchCategoryPage({
        categoryId: 12,
        page: requestedPage,
        perPage: 12,
      });
      setHasMore(hasMore);
      setPosts((prev) => (requestedPage === 1 ? newPosts : [...prev, ...newPosts]));
    } catch (err) {
      console.error('Error fetching posts:', err);
      if (requestedPage === 1) setError(err.message);
      setHasMore(false);
    } finally {
      setLoadingPosts(false);
      setFetchingMore(false);
    }
  }, []);

  // Carga inicial (página 1)
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  // Si el usuario selecciona Events, forzar CARGA COMPLETA para que salgan TODOS los eventos
  useEffect(() => {
    const isEvents = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';
    if (isEvents && !allLoaded) {
      (async () => {
        try {
          setLoadingPosts(true);
          setError(null);
          const allCat = await fetchAllCategory({ categoryId: 12 });
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
  }, [filterTag, allLoaded]);

  const loadMore = () => {
    if (!hasMore || fetchingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  // Construir lista de tags (forzamos que "Events" exista siempre)
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach((post) => {
      const postTags =
        (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter((t) => t.taxonomy !== 'category')) || [];
      postTags.forEach((tag) => tagsSet.add(tag.name));
    });
    const tags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
    if (!tags.some((t) => t.toLowerCase() === 'events' || t.toLowerCase() === 'event')) {
      tags.unshift('Events');
    }
    return ['all', ...tags];
  }, [posts]);

  // Filtrado + orden local
  const filteredPosts = useMemo(() => {
    const isEvents = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';
    let base;
    if (filterTag === 'all') {
      base = posts;
    } else if (isEvents) {
      base = posts.filter(isEventPost);
    } else {
      base = posts.filter((post) => {
        const t =
          (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter((x) => x.taxonomy !== 'category')) || [];
        return t.some((tag) => (tag.name || '').toLowerCase() === filterTag.toLowerCase());
      });
    }
    return [...base].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return orderAsc ? da - db : db - da;
    });
  }, [posts, filterTag, orderAsc]);

  const isEventsView = filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event';
  const pageTitle = isEventsView ? 'Events | SUS-SOIL' : 'News & Events | SUS-SOIL';
  const pageDescription = isEventsView
    ? 'Discover upcoming and recent SUS-SOIL events, workshops, and stakeholder activities.'
    : 'Read the latest SUS-SOIL news and events on sustainable soil and subsoil management.';
  const canonicalPath = isEventsView ? '/news?filter=events' : '/news';

  const listStructuredData = useMemo(() => {
    const itemListElement = filteredPosts.slice(0, 12).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/news/${post.id}`,
      name: (post.title?.rendered || 'Untitled').replace(/<[^>]+>/g, ''),
    }));

    if (!itemListElement.length) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${canonicalPath}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement,
      },
    };
  }, [filteredPosts, pageTitle, pageDescription, canonicalPath, SITE_URL]);

  const getExcerptText = (html) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 140 ? text.substring(0, 137) + '…' : text;
  };

  const toggleOrder = () => setOrderAsc((o) => !o);

  const renderSection = (items, loading, title) => {
    if (!loading && items.length === 0) {
      if (filterTag.toLowerCase() === 'events' || filterTag.toLowerCase() === 'event') {
        return (
          <section className="content-shell section-shell py-10 sm:py-12">
            <h2 className="text-3xl md:text-4xl font-medium font-serif text-center md:text-left text-brown mb-6">{title}</h2>
            <p className="text-center text-sm text-gray-500">No events found.</p>
          </section>
        );
      }
      return null;
    }

    return (
      <section className="content-shell section-shell py-10 sm:py-12" aria-labelledby="news-heading">
        <div className="card-elevated mb-8 px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <h2 id="news-heading" className="text-3xl md:text-4xl font-medium font-serif text-brown leading-tight">
                {title}
              </h2>
              <p className="text-sm text-brown/70">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'entry' : 'entries'}
              </p>
            </div>

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
              <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter posts by tag">
                {allTags.map((tag) => {
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
                      className={`px-4 py-2 rounded-full text-sm font-semibold leading-none min-h-[38px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown ${
                        filterTag.toLowerCase() === value.toLowerCase()
                          ? 'bg-brown text-white'
                          : 'bg-gray-100 text-brown hover:bg-brown hover:text-white'
                      }`}
                      aria-pressed={filterTag.toLowerCase() === value.toLowerCase()}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={toggleOrder}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[38px] rounded-full bg-gray-100 text-brown hover:bg-brown hover:text-white font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown self-start xl:self-auto"
                aria-label={orderAsc ? 'Orden cronológico descendente (más recientes primero)' : 'Orden cronológico ascendente (más antiguas primero)'}
              >
                {orderAsc ? <FaSortAmountUp aria-hidden="true" /> : <FaSortAmountDown aria-hidden="true" />}
                <span>{orderAsc ? 'Oldest → Newest' : 'Newest → Oldest'}</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7" aria-live="polite">
            {[...Array(3)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7"
            variants={gridVariants}
            initial={false}
            animate="visible"
            aria-live="polite"
          >
            {items.map((post) => {
                const titleHtml = post.title?.rendered || 'No Title';
                const titleText = stripHtml(titleHtml);
                const date = new Date(post.date);
                const dateFormatted = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                const excerptText = getExcerptText(post.excerpt?.rendered);
                const imageProps = getWpImageProps(getFeaturedMedia(post), {
                  altFallback: titleText,
                  sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
                });
                const postTags =
                  (post._embedded?.['wp:term'] && post._embedded['wp:term'].flat().filter((t) => t.taxonomy !== 'category')) || [];

                return (
                  <motion.article
                    key={post.id}
                    className="motion-stable relative group cursor-pointer bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brown flex flex-col min-h-[24rem] overflow-hidden"
                    variants={cardVariants}
                    aria-labelledby={`post-title-${post.id}`}
                  >
                    {/* stretched link: toda la tarjeta clickable con focus ring accesible */}
                    <Link
                      to={`/news/${post.id}`}
                      className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
                      aria-label={`Read more: ${titleText}`}
                    />

                    <div className="relative z-0 mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">
                        <time dateTime={date.toISOString()}>{dateFormatted}</time>
                      </span>
                      {postTags.slice(0, 2).map((t) => (
                        <span key={t.id} className="meta-chip">{t.name}</span>
                      ))}
                    </div>

                    <h3 id={`post-title-${post.id}`} className="text-xl font-serif mb-3 text-brown font-semibold leading-tight relative z-0">
                      <span className="relative inline-block">
                        <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
                        {/* subrayado animado limpio */}
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-brown scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                    </h3>

                    {imageProps?.src ? (
                      <div className="relative z-0 overflow-hidden rounded-lg">
                        <img
                          {...imageProps}
                          className="mb-4 object-cover w-full h-40 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4 relative z-0"
                        aria-hidden="true"
                      >
                        <span className="text-gray-500 text-xs">No image</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed relative z-0" aria-label="Excerpt">
                      {excerptText}
                    </p>

                    {postTags.length > 2 && (
                      <ul className="flex flex-wrap gap-2 mt-auto relative z-0" aria-label="Tags">
                        {postTags.slice(2).map((t) => (
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
        )}

        {/* Load More Button */}
        {!loading && hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={fetchingMore}
              className="px-8 py-3 rounded-full bg-brown text-white font-semibold shadow-md hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown transition"
              aria-live="polite"
            >
              {fetchingMore ? (isEventsView ? 'Loading events…' : 'Loading…') : isEventsView ? 'Load more events' : 'Load more news'}
            </button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="mt-12 text-center text-sm text-gray-500" role="status">
            {isEventsView ? 'All events loaded.' : 'No more news.'}
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-5 text-center" role="alert">
            <p className="text-red-700 font-medium">Could not load content right now.</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button
              type="button"
              onClick={() => fetchPosts(1)}
              className="mt-4 inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Try again
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        keywords="SUS-SOIL news, SUS-SOIL events, sustainable soil management, agroecology updates"
        structuredData={listStructuredData}
      />
      {renderSection(filteredPosts, loadingPosts, 'News & Events')}
    </>
  );
}
