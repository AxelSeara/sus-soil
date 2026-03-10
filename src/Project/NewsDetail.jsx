// src/components/NewsDetail.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import { FaShareAlt, FaArrowLeft, FaLink, FaArrowRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import parse from 'html-react-parser';
import {
  fetchPostById,
  fetchRecentPosts,
  fetchRecentEvents,
  fetchRelatedPosts,
  fetchPrevNextForPost,
} from '../services/wpApi';
import { getFeaturedMedia, getWpImageProps } from '../lib/imageSeo';

// ------------------------------
// Helpers búsqueda recursiva
// ------------------------------
function findElementByClass(node, className) {
  if (node.type === 'tag' && node.attribs?.class?.includes(className)) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findElementByClass(child, className);
      if (found) return found;
    }
  }
  return null;
}
function findFirstTag(node, tagName) {
  if (node.type === 'tag' && node.name === tagName) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findFirstTag(child, tagName);
      if (found) return found;
    }
  }
  return null;
}

// ------------------------------
// Procesamiento HTML
// ------------------------------
function parseLeafletScriptForCoords(scriptText) {
  const latMatch = scriptText.match(/"latitude":"([0-9.-]+)"/);
  const lngMatch = scriptText.match(/"longitude":"([0-9.-]+)"/);
  if (!latMatch || !lngMatch) return null;
  return { lat: latMatch[1], lng: lngMatch[1] };
}
function replaceLeafletWithGoogleMaps(doc) {
  const containers = doc.querySelectorAll('.wp-block-themeisle-blocks-leaflet-map');
  containers.forEach((div) => {
    const parent = div.closest('.wp-block-group, .wp-block-themeisle-blocks-leaflet-map') || doc;
    let coords = null;
    parent.querySelectorAll('script').forEach((sc) => {
      const c = parseLeafletScriptForCoords(sc.innerHTML || '');
      if (c) coords = c;
    });
    if (coords) {
      const iframe = doc.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.src = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;
      while (div.firstChild) div.removeChild(div.firstChild);
      div.appendChild(iframe);
    }
  });
}
function transformGalleries(doc) {
  const galleries = doc.querySelectorAll('.wp-block-gallery');
  galleries.forEach((gallery) => {
    const sliderContainer = doc.createElement('div');
    sliderContainer.className = 'gallery-slider';
    gallery.querySelectorAll('img').forEach((img) => {
      const slide = doc.createElement('div');
      slide.className = 'slide';
      slide.appendChild(img.cloneNode(true));
      sliderContainer.appendChild(slide);
    });
    gallery.parentNode.replaceChild(sliderContainer, gallery);
  });
}
function fixLazyLoadAndNoscript(html) {
  let cleaned = (html || '').replace(/data-src=/g, 'src=').replace(/\sclass="lazyload"/g, '');
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');

  doc.querySelectorAll('noscript').forEach((ns) => {
    const realImg = ns.querySelector('img');
    if (realImg) {
      const figure = ns.closest('figure, .wp-block-image, .wp-block-gallery, .wp-block-group');
      if (figure) {
        const figcaption = figure.querySelector('figcaption');
        while (figure.firstChild) figure.removeChild(figure.firstChild);
        figure.appendChild(realImg.cloneNode(true));
        if (figcaption) figure.appendChild(figcaption);
      }
    }
  });

  replaceLeafletWithGoogleMaps(doc);

  // YouTube responsive
  doc.querySelectorAll('iframe[src*="youtube.com"]').forEach((iframe) => {
    const src = iframe.getAttribute('src');
    const container = doc.createElement('div');
    container.innerHTML = `<div class="relative w-full aspect-[16/9] overflow-hidden mb-4">
      <iframe src="${src}" title="${iframe.getAttribute('title') || 'YouTube video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full"></iframe>
    </div>`;
    iframe.parentNode.replaceChild(container, iframe);
  });

  transformGalleries(doc);
  return doc.body.innerHTML;
}
function extractFirstImageFromHTML(html) {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') || null;
}
function generateNewsSlug(id, title, date) {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = (title || '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
}

// ------------------------------
// Utils UX
// ------------------------------
const stripHtmlText = (html) =>
  new DOMParser().parseFromString(html || '', 'text/html').body.textContent || '';
const slugify = (text) =>
  (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
function addHeadingAnchors(html) {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const nodes = Array.from(doc.querySelectorAll('h2, h3'));
  const used = new Set();
  const headings = [];
  nodes.forEach((h) => {
    const txt = h.textContent || '';
    let id = slugify(txt);
    if (!id) return;
    let base = id, i = 2;
    while (used.has(id)) id = `${base}-${i++}`;
    used.add(id);
    h.setAttribute('id', id);
    headings.push({ id, text: txt, level: h.tagName.toLowerCase() });
  });
  return { html: doc.body.innerHTML, headings };
}
const isEventTag = (t) => {
  const name = (t?.name || '').toLowerCase();
  const slug = (t?.slug || '').toLowerCase();
  return name === 'event' || name === 'events' || slug === 'event' || slug === 'events';
};

// ------------------------------
// Skeletons
// ------------------------------
const PostDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-3 md:gap-8">
    <div className="md:col-span-2">
      <Skeleton height={14} width={260} className="mb-4" />
      <Skeleton height={46} width="80%" className="mb-4" />
      <Skeleton height={18} width="45%" className="mb-6" />
      <Skeleton height={420} className="mb-8 rounded-md" />
      <Skeleton height={16} count={7} className="mb-2" />
    </div>
    <aside className="md:col-span-1 mt-10 md:mt-0 space-y-8">
      {[...Array(3)].map((_, idx) => (
        <div key={idx}>
          <Skeleton height={24} width={150} className="mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((__, i) => (
              <RecentPostSkeleton key={`${idx}-${i}`} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  </div>
);
const RecentPostSkeleton = () => (
  <div className="flex items-center space-x-3 p-2">
    <Skeleton circle height={48} width={48} />
    <div className="flex flex-col">
      <Skeleton height={16} width={140} />
      <Skeleton height={12} width={90} />
    </div>
  </div>
);
const EventSkeleton = RecentPostSkeleton;

function LightweightCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  if (!total) return null;

  const prev = () => setIndex((v) => (v - 1 + total) % total);
  const next = () => setIndex((v) => (v + 1) % total);
  const current = images[index];

  return (
    <div className="relative my-4">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md bg-gray-900">
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{
            backgroundImage: `url(${current.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.08)',
          }}
          aria-hidden="true"
        />
        <img
          src={current.src}
          alt={current.alt}
          className="relative z-10 object-contain w-full h-full"
          loading="lazy"
          decoding="async"
        />
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-2.5 py-1.5 text-white hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-2.5 py-1.5 text-white hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="mt-2 flex items-center justify-center gap-1.5" role="tablist" aria-label="Image gallery pagination">
            {images.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? 'bg-brown' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ------------------------------
// Transformador html-react-parser
// ------------------------------
const transform = (node, index) => {
  // Enlaces externos seguros
  if (node.type === 'tag' && node.name === 'a' && node.attribs?.href) {
    const href = node.attribs.href;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const isAbsolute = /^https?:\/\//i.test(href);
    const isExternal = isAbsolute && (origin ? !href.startsWith(origin) : true);
    if (isExternal) {
      node.attribs.target = '_blank';
      node.attribs.rel = (node.attribs.rel ? node.attribs.rel + ' ' : '') + 'noopener noreferrer';
    }
  }
  // YouTube
  if (node.type === 'tag' && node.name === 'iframe' && node.attribs?.src?.includes('youtube.com')) {
    const src = node.attribs.src;
    return (
      <div key={index} className="relative w-full aspect-[16/9] overflow-hidden mb-4">
        <iframe
          src={src}
          title={node.attribs.title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }
  // Slider ThemeIsle → Swiper
  if (node.type === 'tag' && node.name === 'div' && node.attribs?.class?.includes('wp-block-themeisle-blocks-slider')) {
    const glideSlidesNode = findElementByClass(node, 'glide__slides');
    if (glideSlidesNode?.children) {
      const slideNodes = glideSlidesNode.children.filter(
        (child) => child.type === 'tag' && child.attribs?.class?.includes('glide__slide')
      );
      const images = slideNodes.map((slide, i) => {
        const imgNode = findFirstTag(slide, 'img');
        if (!imgNode) return null;
        const src = imgNode.attribs.src?.startsWith('data:') ? imgNode.attribs['data-src'] : imgNode.attribs.src;
        const alt = imgNode.attribs.alt || `Slide ${i + 1}`;
        return src ? { src, alt } : null;
      }).filter(Boolean);
      if (images.length) {
        return <LightweightCarousel key={index} images={images} />;
      }
    }
  }
  // Galería simple → Swiper
  if (node.type === 'tag' && node.name === 'div' && node.attribs?.class?.includes('gallery-slider')) {
    const slides = (node.children || []).filter((c) => c.type === 'tag' && c.attribs?.class?.includes('slide'));
    const images = slides.map((s, i) => {
      const imgNode = findFirstTag(s, 'img');
      if (!imgNode) return null;
      const src = imgNode.attribs.src || imgNode.attribs['data-src'];
      const alt = imgNode.attribs.alt || `Slide ${i + 1}`;
      return src ? { src, alt } : null;
    }).filter(Boolean);
    if (images.length) {
      return <LightweightCarousel key={index} images={images} />;
    }
  }
};

// ------------------------------
// Componente
// ------------------------------
export default function NewsDetail() {
  const { id: routeId } = useParams();
  const numericId = routeId.split('-')[0];
  const location = useLocation();

  // State
  const [post, setPost] = useState(undefined);

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  const [shareMsg, setShareMsg] = useState('');
  const [readProgress, setReadProgress] = useState(0);
  const [headings, setHeadings] = useState([]);

  const articleRef = useRef(null);

  const CATEGORY_ID = 12;
  const EVENT_TAG_ID = 7;

  // Efectos principales (siempre declarados antes de cualquier return)
  useEffect(() => {
    const acPost = new AbortController();
    const acRecent = new AbortController();
    const acEvents = new AbortController();

    const fetchPost = async () => {
      setPost(undefined);
      try {
        const data = await fetchPostById(numericId, { signal: acPost.signal });
        setPost(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error fetching post:', err);
      }
    };

    const fetchRecent = async () => {
      setLoadingRecent(true);
      try {
        const data = await fetchRecentPosts({ categoryId: CATEGORY_ID, perPage: 5, signal: acRecent.signal });
        setRecentPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error fetching recent posts:', err);
      } finally {
        setLoadingRecent(false);
      }
    };

    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const data = await fetchRecentEvents({
          categoryId: CATEGORY_ID,
          eventTagId: EVENT_TAG_ID,
          perPage: 3,
          signal: acEvents.signal,
        });
        setRecentEvents(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error fetching events:', err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchPost();
    fetchRecent();
    fetchEvents();

    return () => {
      acPost.abort();
      acRecent.abort();
      acEvents.abort();
    };
  }, [numericId]);

  useEffect(() => {
    if (!post) return;
    const tagArray = post._embedded?.['wp:term']?.[1] || [];
    if (tagArray.length === 0) return;

    const acRel = new AbortController();
    const tagIds = tagArray.map((t) => t.id);
    setLoadingRelated(true);
    fetchRelatedPosts({ tagIds, excludeId: post.id, perPage: 3, signal: acRel.signal })
      .then((data) => setRelatedPosts(Array.isArray(data) ? data : []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Error fetching related:', err);
      })
      .finally(() => setLoadingRelated(false));

    return () => acRel.abort();
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const acPN = new AbortController();

    const run = async () => {
      try {
        const isEv = (post._embedded?.['wp:term']?.[1] || []).some(isEventTag);
        const { prev, next } = await fetchPrevNextForPost({
          post,
          categoryId: CATEGORY_ID,
          eventTagId: EVENT_TAG_ID,
          isEvent: isEv,
          signal: acPN.signal,
        });
        setPrevPost(prev);
        setNextPost(next);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Prev/Next error:', err);
      }
    };

    run();
    return () => acPN.abort();
  }, [post]);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const el = articleRef.current;
      if (!el) return;
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const total = el.scrollHeight - winH;
      const scrolled = Math.min(Math.max(window.scrollY - elTop, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      const next = Math.max(0, Math.min(100, pct));
      setReadProgress((prev) => (Math.abs(prev - next) > 0.2 ? next : prev));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ------------------------------
  // Derivados SIEMPRE calculados (antes de cualquier return)
  // ------------------------------
  const title = post?.title?.rendered || 'No Title';
  const rawContent = post?.content?.rendered || '<p></p>';
  const { fixedContent, anchoredHtml, toc } = useMemo(() => {
    const fixed = fixLazyLoadAndNoscript(rawContent);
    const safeHtml = DOMPurify.sanitize(fixed, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'id'],
    });
    const { html, headings } = addHeadingAnchors(safeHtml);
    return { fixedContent: fixed, sanitized: safeHtml, anchoredHtml: html, toc: headings };
  }, [rawContent]);

  // Este useEffect DEBE estar antes de cualquier return (para mantener orden de hooks)
  useEffect(() => {
    setHeadings(toc || []);
  }, [routeId, toc]);

  // Con esto ya no cambiamos el número/orden de hooks entre renders 👆

  // Si aún está cargando y no hay post, ya podemos devolver skeleton
  if (post === undefined) return <PostDetailSkeleton />;

  if (post === null) {
   return (
     <div className="container mx-auto px-4 py-6">
       <h2 className="text-2xl font-serif text-red-500">Post not found</h2>
       <Link to="/news" className="underline mt-4 inline-block">Back to News</Link>
     </div>
   );
 }

  const heroImageProps = getWpImageProps(getFeaturedMedia(post), {
    altFallback: stripHtmlText(title),
    sizes: '(max-width: 1024px) 100vw, 70vw',
    loading: 'eager',
    fetchPriority: 'high',
  });
  const featured = heroImageProps?.src || null;
  const fallbackImg = extractFirstImageFromHTML(fixedContent);
  const imageUrl = featured || fallbackImg || null;
  const dateFormatted = (() => {
    try { return new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return ''; }
  })();
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const isEvent = tags.some(isEventTag);

  const plain = stripHtmlText(anchoredHtml);
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(1, Math.ceil(words / 200));

  const canonical = `${window.location.origin}${location.pathname}`;
  const jsonLd = isEvent
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": stripHtmlText(title),
        "startDate": post.date,
        "endDate": post.modified || post.date,
        "image": imageUrl || undefined,
        "eventStatus": "https://schema.org/EventScheduled",
        "organizer": { "@type": "Organization", "name": "SUS-SOIL" },
        "description": stripHtmlText(post.excerpt?.rendered || '')
      }
    : {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": stripHtmlText(title),
        "datePublished": post.date,
        "dateModified": post.modified,
        "image": imageUrl || undefined,
        "author": { "@type": "Organization", "name": "SUS-SOIL" },
        "publisher": { "@type": "Organization", "name": "SUS-SOIL" },
        "mainEntityOfPage": canonical,
        "description": stripHtmlText(post.excerpt?.rendered || '')
      };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title?.rendered || 'News',
          text: `Check this out: ${stripHtmlText(post?.title?.rendered)}`,
          url: window.location.href,
        });
        setShareMsg('Shared!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareMsg('Link copied');
      } else {
        setShareMsg('Press Ctrl/Cmd+C to copy the URL');
      }
    } catch {
      setShareMsg('Could not share');
    } finally {
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Progress */}
      <div className="fixed left-0 right-0 top-16 h-1 z-40 bg-brown/10">
        <div className="h-full bg-brown transition-[width] duration-200" style={{ width: `${readProgress}%` }} aria-hidden="true" />
      </div>

      <Helmet>
        <html lang="en" />
        <meta httpEquiv="content-language" content="en" />
        <title>{stripHtmlText(title)} | SUS-SOIL {isEvent ? 'Events' : 'News'}</title>
        <meta name="description" content={stripHtmlText(post.excerpt?.rendered) || 'News article'} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />
        <meta property="og:type" content={isEvent ? 'article' : 'article'} />
        <meta property="og:site_name" content="SUS-SOIL" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={`${stripHtmlText(title)} | SUS-SOIL`} />
        <meta property="og:description" content={stripHtmlText(post.excerpt?.rendered) || 'News article'} />
        <meta property="og:url" content={canonical} />
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${stripHtmlText(title)} | SUS-SOIL`} />
        <meta name="twitter:description" content={stripHtmlText(post.excerpt?.rendered) || 'News article'} />
        {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-3 md:gap-8">
        {/* MAIN */}
        <article ref={articleRef} className="md:col-span-2">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link to="/" className="hover:text-darkGreen hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to={isEvent ? "/news?filter=events" : "/news"} className="hover:text-darkGreen hover:underline">{isEvent ? 'Events' : 'News'}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-700 line-clamp-1 max-w-[60ch]">{stripHtmlText(title)}</li>
            </ol>
          </nav>

          <div className="max-w-prose mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-brown mb-2">
              {parse(title)}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
              <div>Published: <span className="font-medium">{dateFormatted}</span></div>
              <span aria-hidden="true">•</span>
              <div>{readMins} min read</div>
              {tags.length > 0 && (
                <>
                  <span aria-hidden="true">•</span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Link key={t.id} to={`/news?filter=${encodeURIComponent(t.name)}`} className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full hover:bg-darkGreen/10">
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {imageUrl && (
              <img
                src={imageUrl}
                alt={heroImageProps?.alt || stripHtmlText(title)}
                srcSet={heroImageProps?.srcSet}
                sizes={heroImageProps?.sizes}
                width={heroImageProps?.width}
                height={heroImageProps?.height}
                className="w-full max-h-[600px] object-cover rounded-md mb-6 transition-transform duration-300 hover:scale-105"
                loading={heroImageProps ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={heroImageProps ? 'high' : undefined}
              />
            )}
          </div>

          <div className="max-w-prose mx-auto">
            <div className="prose leading-relaxed mb-6 text-brown prose-a:text-darkGreen prose-a:underline prose-strong:font-bold prose-strong:text-brown">
              {parse(anchoredHtml, { replace: transform })}
            </div>

            {/* Prev / Next */}
            {(prevPost || nextPost) && (
              <div className="mt-10 pt-6 border-t border-brown/20 flex flex-col md:flex-row md:items-stretch gap-4">
                {prevPost ? (
                  <Link
                    to={`/news/${generateNewsSlug(prevPost.id, prevPost.title?.rendered, prevPost.date)}`}
                    className="flex-1 rounded-xl border border-brown/20 p-4 hover:bg-lightGreen/10 transition-colors"
                  >
                    <div className="text-xs uppercase text-gray-500 mb-2 flex items-center gap-2">
                      <FaArrowLeft /> Previous
                    </div>
                    <div className="font-serif font-semibold text-brown line-clamp-2">
                      {parse(prevPost.title?.rendered || '—')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(prevPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 opacity-40 cursor-not-allowed rounded-xl border border-dashed border-gray-200 p-4" aria-hidden="true">
                    <div className="text-xs uppercase text-gray-400 mb-2 flex items-center gap-2">
                      <FaArrowLeft /> Previous
                    </div>
                    <div className="text-gray-400">No previous post</div>
                  </div>
                )}
                {nextPost ? (
                  <Link
                    to={`/news/${generateNewsSlug(nextPost.id, nextPost.title?.rendered, nextPost.date)}`}
                    className="flex-1 rounded-xl border border-brown/20 p-4 hover:bg-lightGreen/10 transition-colors text-right"
                  >
                    <div className="text-xs uppercase text-gray-500 mb-2 flex items-center justify-end gap-2">
                      Next <FaArrowRight />
                    </div>
                    <div className="font-serif font-semibold text-brown line-clamp-2">
                      {parse(nextPost.title?.rendered || '—')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(nextPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 opacity-40 cursor-not-allowed rounded-xl border border-dashed border-gray-200 p-4 text-right" aria-hidden="true">
                    <div className="text-xs uppercase text-gray-400 mb-2 flex items-center justify-end gap-2">
                      Next <FaArrowRight />
                    </div>
                    <div className="text-gray-400">No next post</div>
                  </div>
                )}
              </div>
            )}

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-3 mt-6 mb-10">
              <button
                onClick={handleShare}
                className="bg-darkGreen text-white px-4 py-2 rounded-full hover:bg-darkGreen/90 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGreen"
                title="Share this post"
              >
                <FaShareAlt />
                <span>Share</span>
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    setShareMsg('Link copied');
                    setTimeout(() => setShareMsg(''), 2000);
                  } catch {
                    setShareMsg('Copy failed');
                  }
                }}
                className="px-4 py-2 rounded-full bg-gray-100 text-brown hover:bg-brown hover:text-white inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGreen"
                title="Copy link"
              >
                <FaLink />
                <span>Copy link</span>
              </button>
              <Link
                to={isEvent ? "/news?filter=events" : "/news"}
                className="inline-flex items-center gap-2 bg-brown text-white py-2 px-6 rounded-full hover:bg-brown/90 font-serif transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGreen"
              >
                <FaArrowLeft />
                Back to {isEvent ? 'Events' : 'News'}
              </Link>
              {!!shareMsg && <span className="text-sm text-gray-600 ml-2">{shareMsg}</span>}
            </div>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="md:col-span-1 md:sticky md:top-24 self-start flex flex-col space-y-8">
          {headings?.length >= 2 && (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-3 border-b border-brown/20 pb-2">Contents</h2>
              <ul className="space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 'h3' ? 'pl-4' : ''}>
                    <a
                      href={`#${h.id}`}
                      className="text-darkGreen hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last News */}
          {loadingRecent ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Last News</h2>
              <div className="grid grid-cols-1 gap-4">{[...Array(3)].map((_, i) => <RecentPostSkeleton key={i} />)}</div>
            </div>
          ) : recentPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">Last News</h2>
              <div className="flex flex-col space-y-4">
                {recentPosts.map((rp) => {
                  const rpTitle = rp.title?.rendered || 'No Title';
                  const rpDate = new Date(rp.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                  const rpImageProps = getWpImageProps(getFeaturedMedia(rp), {
                    altFallback: stripHtmlText(rpTitle),
                    sizes: '48px',
                    preferOrder: ['thumbnail', 'medium', 'medium_large', 'large'],
                  });
                  const rpTags = rp._embedded?.['wp:term']?.[1] || [];
                  return (
                    <Link key={rp.id} to={`/news/${generateNewsSlug(rp.id, rpTitle, rp.date)}`} className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded">
                      {rpImageProps?.src ? (
                        <img {...rpImageProps} className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">N/A</div>
                      )}
                      <div className="text-sm text-brown">
                        <div className="font-semibold line-clamp-2">{parse(rpTitle)}</div>
                        <div className="text-xs text-gray-500">{rpDate}</div>
                        <div className="flex flex-wrap gap-2 mt-2" aria-hidden="true">
                          {rpTags.map((t) => (
                            <span key={t.id} className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full">
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Latest Events */}
          {loadingEvents ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Latest Events</h2>
              <div className="grid grid-cols-1 gap-4">{[...Array(3)].map((_, i) => <EventSkeleton key={i} />)}</div>
            </div>
          ) : recentEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">Latest Events</h2>
              <div className="flex flex-col space-y-4">
                {recentEvents.map((ev) => {
                  const evTitle = ev.title?.rendered || 'Untitled';
                  const evDate = new Date(ev.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                  const evImageProps = getWpImageProps(getFeaturedMedia(ev), {
                    altFallback: stripHtmlText(evTitle),
                    sizes: '48px',
                    preferOrder: ['thumbnail', 'medium', 'medium_large', 'large'],
                  });
                  const evTags = ev._embedded?.['wp:term']?.[1] || [];
                  return (
                    <Link key={ev.id} to={`/news/${generateNewsSlug(ev.id, evTitle, ev.date)}`} className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded">
                      {evImageProps?.src ? (
                        <img {...evImageProps} className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">N/A</div>
                      )}
                      <div className="text-sm text-brown">
                        <div className="font-semibold line-clamp-2">{parse(evTitle)}</div>
                        <div className="text-xs text-gray-500">{evDate}</div>
                        <div className="flex flex-wrap gap-2 mt-2" aria-hidden="true">
                          {evTags.map((t) => (
                            <span key={t.id} className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full">
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related */}
          {loadingRelated ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Related Posts</h2>
              <div className="grid grid-cols-1 gap-4">{[...Array(3)].map((_, i) => <RecentPostSkeleton key={i} />)}</div>
            </div>
          ) : relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">Related Posts</h2>
              <div className="flex flex-col space-y-4">
                {relatedPosts.map((r) => {
                  const rTitle = r.title?.rendered || 'No Title';
                  const rDate = new Date(r.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                  const relatedImageProps = getWpImageProps(getFeaturedMedia(r), {
                    altFallback: stripHtmlText(rTitle),
                    sizes: '48px',
                    preferOrder: ['thumbnail', 'medium', 'medium_large', 'large'],
                  });
                  const rTags = r._embedded?.['wp:term']?.[1] || [];
                  return (
                    <Link key={r.id} to={`/news/${generateNewsSlug(r.id, rTitle, r.date)}`} className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded">
                      {relatedImageProps?.src ? (
                        <img {...relatedImageProps} className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">N/A</div>
                      )}
                      <div className="text-sm text-brown">
                        <div className="font-semibold line-clamp-2">{parse(rTitle)}</div>
                        <div className="text-xs text-gray-500">{rDate}</div>
                        <div className="flex flex-wrap gap-2 mt-2" aria-hidden="true">
                          {rTags.map((t) => (
                            <span key={t.id} className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full">
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

    </div>
  );
}
