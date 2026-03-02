// src/components/NewsEventsHome.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
import { CardSkeleton } from '../../../components/Skeletons';

const gridVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren', duration: 0.24, ease: 'easeOut' }
  }
};

const cardVariants = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, '') : '');
const shorten = (txt, n) => (txt.length > n ? txt.slice(0, n - 1).trimEnd() + '…' : txt);

// ✅ Events SOLO si tienen tag "event"/"events" (no categorías)
const isEventPost = (post) => {
  const termGroups = post._embedded?.['wp:term'] || [];
  const terms = termGroups.flat().filter(Boolean);
  return terms.some((t) => {
    const name = t.name?.toLowerCase() || '';
    const slug = t.slug?.toLowerCase() || '';
    return t.taxonomy !== 'category' && (name === 'event' || name === 'events' || slug === 'event' || slug === 'events');
  });
};

export default function NewsEventsHome() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [errorNews, setErrorNews] = useState(null);
  const [errorEvents, setErrorEvents] = useState(null);

  // --- NEWS y EVENTS: paginar categoría 12, ordenar por fecha y limitar ---
  const fetchAllCategory = useCallback(async (catId = 12) => {
    const perPage = 100; // máximo WP
    let page = 1;
    let out = [];
    // loop con cabecera X-WP-TotalPages
    while (true) {
      const url = `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${catId}&_embed&per_page=${perPage}&page=${page}&_=${Date.now()}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 400) break; // fin de páginas
        throw new Error('Network error fetching events');
      }
      const chunk = await res.json();
      out = out.concat(chunk);
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
      if (!totalPages || page >= totalPages) break;
      page += 1;
    }
    return out;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const allCat = await fetchAllCategory(12);
        if (cancelled) return;
        const sorted = [...allCat].sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestNews = sorted.filter((p) => !isEventPost(p)).slice(0, 3);
        const latestEvents = sorted.filter(isEventPost).slice(0, 3);
        setNews(latestNews);
        setEvents(latestEvents);
      } catch (e) {
        if (!cancelled) {
          setErrorNews(e.message);
          setErrorEvents(e.message);
        }
      } finally {
        if (!cancelled) {
          setLoadingNews(false);
          setLoadingEvents(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [fetchAllCategory]);

  const Card = ({ post, featured = false, typeLabel }) => {
    const titleHtml = post.title?.rendered || 'Untitled';
    const titleText = stripHtml(titleHtml);
    const dateObj = new Date(post.date);
    const dateFormatted = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const excerptText = shorten(stripHtml(post.excerpt?.rendered || ''), featured ? 180 : 120);

    return (
      <motion.article
        className={`relative group cursor-pointer bg-white p-5 md:p-6 rounded-2xl shadow-md border border-darkGreen/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-darkGreen flex flex-col overflow-hidden ${featured ? 'md:col-span-2 md:min-h-[27rem]' : 'min-h-[22rem]'}`}
        variants={cardVariants}
        aria-labelledby={`post-title-${post.id}`}
      >
        {/* stretched link: toda la tarjeta clickable con focus ring accesible */}
        <Link
          to={`/news/${post.id}`}
          className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGreen"
          aria-label={`Read more: ${titleText}`}
        />

        <h3
          id={`post-title-${post.id}`}
          className="text-xl font-serif mb-2 text-brown font-semibold leading-tight relative z-0"
        >
          <span className="relative inline-block">
            <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
            {/* subrayado animado limpio (no text-decoration) */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-brown scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </h3>

        <p className="text-xs text-gray-500 mb-3 relative z-0">
          <time dateTime={dateObj.toISOString()}>{dateFormatted}</time>
        </p>
        <span className="inline-flex w-fit text-[11px] font-semibold px-2.5 py-1 rounded-full bg-lightGreen/25 text-darkGreen mb-3">
          {typeLabel}
        </span>

        {imgUrl ? (
          <div className="relative z-0">
            <img
              src={imgUrl}
              alt=""
              loading="lazy"
              className={`mb-4 rounded-xl object-cover w-full transition-transform duration-300 group-hover:scale-[1.03] ${featured ? 'h-52 md:h-56' : 'h-40'}`}
            />
          </div>
        ) : (
          <div className={`w-full bg-gray-200 flex items-center justify-center rounded-xl mb-4 relative z-0 ${featured ? 'h-52 md:h-56' : 'h-40'}`} aria-hidden="true">
            <span className="text-gray-500 text-xs">No image</span>
          </div>
        )}

        <p className="text-sm text-gray-700 mb-4 leading-relaxed relative z-0">{excerptText}</p>
        <div className="mt-auto pt-3 border-t border-darkGreen/10 text-sm font-medium text-darkGreen">
          Read article →
        </div>
      </motion.article>
    );
  };

  const Section = ({ title, icon, loading, items, error, seeAllHref }) => {
    if (!loading && items.length === 0 && !error) return null;
    return (
      <section
        className="py-12 px-6 md:px-16 my-4 rounded-2xl border border-darkGreen/10 bg-white/70 backdrop-blur-sm shadow-[0_12px_32px_-24px_rgba(16,74,40,0.65)]"
        aria-labelledby={`${title.toLowerCase()}-heading`}
      >
        {/* Header */}
        <div className="flex items-center justify-center md:justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-brown text-3xl w-10 h-10 rounded-full bg-lightGreen/20 grid place-items-center" aria-hidden="true">
              {icon}
            </span>
            <div>
              <h2 id={`${title.toLowerCase()}-heading`} className="text-3xl md:text-4xl font-medium font-serif text-brown">
                {title}
              </h2>
              {!loading && items.length > 0 && (
                <p className="text-sm text-brown/70 mt-1">Latest 3 updates</p>
              )}
            </div>
          </div>
          {!loading && items.length > 0 && (
            <Link
              to={seeAllHref}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brown text-brown hover:bg-brown hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
              aria-label={`Visit all ${title}`}
            >
              Visit all <FaArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Divider suave */}
        <div className="h-px bg-gradient-to-r from-transparent via-darkGreen/30 to-transparent mb-8" aria-hidden="true" />

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[22rem]"
          variants={gridVariants}
          initial={false}
          animate="visible"
          aria-live="polite"
        >
          {loading
            ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
            : items.map((p, idx) => (
                <Card
                  key={p.id}
                  post={p}
                  featured={idx === 0}
                  typeLabel={title}
                />
              ))}
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 mt-10" role="alert">{error}</p>
        )}
      </section>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-4 py-6">
      <Section
        title="News"
        icon={<FaNewspaper />}
        loading={loadingNews}
        items={news}
        error={errorNews}
        seeAllHref="/news"
      />

      <div className="w-24 mx-auto border-t-2 border-darkGreen my-8" aria-hidden="true" />

      <Section
        title="Events"
        icon={<FaCalendarAlt />}
        loading={loadingEvents}
        items={events}
        error={errorEvents}
        seeAllHref="/news?filter=events"
      />
    </div>
  );
}
