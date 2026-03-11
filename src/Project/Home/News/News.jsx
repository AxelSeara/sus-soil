// src/components/NewsEventsHome.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
import { CardSkeleton } from '../../../components/Skeletons';
import { cardReveal, listReveal } from '../../../lib/motion';
import { fetchAllCategory } from '../../../services/wpApi';
import { getFeaturedMedia, getWpImageProps } from '../../../lib/imageSeo';

const gridVariants = listReveal;
const cardVariants = cardReveal;

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const allCat = await fetchAllCategory({ categoryId: 12 });
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
  }, []);

  const Card = ({ post, featured = false, typeLabel }) => {
    const titleHtml = post.title?.rendered || 'Title unavailable';
    const titleText = stripHtml(titleHtml);
    const dateObj = new Date(post.date);
    const dateFormatted = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const imageProps = getWpImageProps(getFeaturedMedia(post), {
      altFallback: `${typeLabel}: ${titleText}`,
      sizes: featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw',
    });
    const excerptText = shorten(stripHtml(post.excerpt?.rendered || ''), featured ? 180 : 120);

    return (
      <motion.article
        className={`motion-stable relative group cursor-pointer rounded-2xl border border-darkGreen/10 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-darkGreen flex flex-col overflow-hidden ${featured ? 'md:col-span-2 md:min-h-[27rem]' : 'min-h-[22rem]'}`}
        variants={cardVariants}
        aria-labelledby={`post-title-${post.id}`}
      >
        {/* stretched link: toda la tarjeta clickable con focus ring accesible */}
        <Link
          to={`/news/${post.id}`}
          className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGreen"
          aria-label={`Read more: ${titleText}`}
        />

        <div className="relative z-0 mb-3 flex flex-wrap items-center gap-2">
          <span className="meta-chip">{typeLabel}</span>
          <p className="text-xs text-gray-500">
            <time dateTime={dateObj.toISOString()}>{dateFormatted}</time>
          </p>
        </div>

        <h3 id={`post-title-${post.id}`} className="relative z-0 mb-3 text-xl font-serif font-semibold leading-tight text-brown">
          <span className="relative inline-block">
            <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-brown scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </h3>

        {imageProps?.src ? (
          <div className="relative z-0 overflow-hidden rounded-xl">
            <img
              {...imageProps}
              className={`mb-4 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${featured ? 'h-52 md:h-56' : 'h-40'}`}
            />
          </div>
        ) : (
          <div className={`w-full bg-gray-200 flex items-center justify-center rounded-xl mb-4 relative z-0 ${featured ? 'h-52 md:h-56' : 'h-40'}`} aria-hidden="true">
            <span className="text-gray-500 text-xs">No image</span>
          </div>
        )}

        <p className="relative z-0 mb-4 text-sm leading-relaxed text-gray-700">{excerptText}</p>
        <div className="mt-auto border-t border-darkGreen/10 pt-3 text-sm font-medium text-darkGreen">
          Read article →
        </div>
      </motion.article>
    );
  };

  const Section = ({ title, icon, loading, items, error, seeAllHref }) => {
    if (!loading && items.length === 0 && !error) return null;
    return (
      <section
        className="card-elevated my-4 p-5 sm:p-6 lg:p-8"
        aria-labelledby={`${title.toLowerCase()}-heading`}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-brown text-3xl w-10 h-10 rounded-full bg-lightGreen/20 grid place-items-center" aria-hidden="true">
              {icon}
            </span>
            <div>
              <h2 id={`${title.toLowerCase()}-heading`} className="text-3xl font-medium font-serif text-brown md:text-4xl">
                {title}
              </h2>
              {!loading && items.length > 0 && (
                <p className="mt-1 text-sm text-brown/70">Latest 3 updates</p>
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
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-darkGreen/30 to-transparent" aria-hidden="true" />

        {/* Grid */}
        <motion.div
          className="grid min-h-[22rem] grid-cols-1 gap-5 md:grid-cols-4 md:gap-6"
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
    <div className="content-shell section-shell py-12 sm:py-14 lg:py-16">
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
