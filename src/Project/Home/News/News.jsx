// src/components/NewsEventsHome.jsx (versión limpia sin secuencias \n en atributos)
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';

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
      staggerChildren: 0.12,
      when: 'beforeChildren',
      duration: 0.45,
      ease: 'easeOut'
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18
    }
  }
};

const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, '') : '');
const shorten = (txt, n) => (txt.length > n ? txt.slice(0, n - 1).trimEnd() + '…' : txt);

const isEventPost = (post) => {
  const termGroups = post._embedded?.['wp:term'] || [];
  const terms = termGroups.flat().filter(Boolean);
  return terms.some(t => {
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

  const perFetch = 12;

  const fetchBatch = useCallback(async () => {
    const url = `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=12&_embed&per_page=${perFetch}&_=${Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error fetching posts');
    return res.json();
  }, [perFetch]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await fetchBatch();
        if (cancelled) return;
        const eventPosts = [];
        const newsPosts = [];
        for (const p of all) {
          (isEventPost(p) ? eventPosts : newsPosts).push(p);
        }
        setEvents(eventPosts.slice(0, 3));
        setNews(newsPosts.slice(0, 3));
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
  }, [fetchBatch]);

  const Card = ({ post }) => {
    const titleHtml = post.title?.rendered || 'Untitled';
    const titleText = stripHtml(titleHtml);
    const dateObj = new Date(post.date);
    const dateFormatted = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const excerptText = shorten(stripHtml(post.excerpt?.rendered || ''), 140);

    return (
      <motion.article
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brown flex flex-col min-h-[24rem]"
        variants={cardVariants}
        aria-labelledby={`post-title-${post.id}`}
      >
        <h3
          id={`post-title-${post.id}`}
          className="text-xl font-serif mb-2 text-brown font-semibold leading-tight"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <p className="text-xs text-gray-500 mb-3">
          <time dateTime={dateObj.toISOString()}>{dateFormatted}</time>
        </p>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            loading="lazy"
            className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-200 hover:scale-105"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4" aria-hidden="true">
            <span className="text-gray-500 text-xs">No image</span>
          </div>
        )}
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{excerptText}</p>
        <div className="mt-auto">
          <a
            href={`/news/${post.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brown hover:bg-opacity-90 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
            aria-label={`Read more: ${titleText}`}
          >
            Read More <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </motion.article>
    );
  };

  const Section = ({ title, icon, loading, items, error, seeAllHref }) => {
    if (!loading && items.length === 0 && !error) return null;
    return (
      <section className="py-12 px-6 md:px-16 my-4" aria-labelledby={`${title.toLowerCase()}-heading`}>
        <div className="flex items-center justify-center md:justify-start gap-3 mb-10">
          <span className="text-brown text-3xl" aria-hidden="true">{icon}</span>
          <h2 id={`${title.toLowerCase()}-heading`} className="text-3xl md:text-4xl font-medium font-serif text-center md:text-left text-brown">{title}</h2>
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
            : items.map(p => <Card key={p.id} post={p} />)}
        </motion.div>
        {!loading && items.length > 0 && (
          <div className="text-center mt-12">
            <a
              href={seeAllHref}
              className="px-8 py-4 bg-brown hover:bg-opacity-90 text-white font-bold rounded-full shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown"
              aria-label="Visit all news and events"
            >
              Visit all news &amp; events
            </a>
          </div>
        )}
        {error && (
          <p className="text-center text-red-600 mt-6" role="alert">{error}</p>
        )}
      </section>
    );
  };

  return (
    <>
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
    </>
  );
}

