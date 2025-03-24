// NewsDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import { FaShareAlt } from 'react-icons/fa';
import {
  SkeletonPostDetail,
  SkeletonRecentPostCard,
  SkeletonEventCard,
} from './Skeletons';

/**
 * Parsea lat/lng del script de Leaflet 
 * (el plugin pone algo como: '"latitude":"41.xxxx","longitude":"2.xxxx"')
 */
function parseLeafletScriptForCoords(scriptText) {
  const latMatch = scriptText.match(/\"latitude\":\"([0-9.\-]+)\"/);
  const lngMatch = scriptText.match(/\"longitude\":\"([0-9.\-]+)\"/);
  if (!latMatch || !lngMatch) return null;
  return { lat: latMatch[1], lng: lngMatch[1] };
}

/**
 * Reemplaza en el HTML el bloque .wp-block-themeisle-blocks-leaflet-map
 * con un iframe de Google Maps, usando las coords del script inline.
 */
function replaceLeafletWithGoogleMaps(doc) {
  const containers = doc.querySelectorAll('.wp-block-themeisle-blocks-leaflet-map');
  containers.forEach((div) => {
    // Buscamos un <script> con la info de lat/lng
    const parent = div.closest('.wp-block-group, .wp-block-themeisle-blocks-leaflet-map') || doc;
    const scripts = parent.querySelectorAll('script');
    let coords = null;

    scripts.forEach((sc) => {
      const text = sc.innerHTML;
      if (
        text.includes('window.themeisleLeafletMaps.push') &&
        text.includes('"latitude"')
      ) {
        coords = parseLeafletScriptForCoords(text);
      }
    });

    if (coords) {
      // Creamos <iframe> de Google Maps con esas coords
      const iframe = doc.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.src = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;

      // Limpiamos el contenedor y metemos el iframe
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      div.appendChild(iframe);
    } else {
      // Si no hay coords, podrías quitar el div
      // div.remove();
    }
  });
}

/**
 * Ajusta lazy load: data-src->src, remove class="lazyload"
 * Reemplaza <noscript><img/></noscript> con la img real
 * Aplica replaceLeafletWithGoogleMaps para mostrar Google Maps
 */
function fixLazyLoadAndNoscript(html) {
  let cleaned = html
    .replace(/data-src=/g, 'src=')
    .replace(/\sclass="lazyload"/g, '');

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');

  // Reemplazar img del <noscript>
  const noScripts = doc.querySelectorAll('noscript');
  noScripts.forEach((ns) => {
    const realImg = ns.querySelector('img');
    if (realImg) {
      const figure = ns.closest('figure, .wp-block-image, .wp-block-gallery, .wp-block-group');
      if (figure) {
        const figcaption = figure.querySelector('figcaption');
        // Vaciar figure
        while (figure.firstChild) {
          figure.removeChild(figure.firstChild);
        }
        figure.appendChild(realImg.cloneNode(true));
        if (figcaption) {
          figure.appendChild(figcaption);
        }
      }
    }
  });

  // Reemplazar Leaflet con Google Maps
  replaceLeafletWithGoogleMaps(doc);

  return doc.body.innerHTML;
}

/** Extrae la primera imagen del HTML si no hay featured */
function extractFirstImageFromHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') || null;
}

/** Genera un slug SEO: id-slugifiedTitle-YYYY-MM-DD */
const generateNewsSlug = (id, title, date) => {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
};

export default function NewsDetail() {
  const { id: routeId } = useParams();
  const numericId = routeId.split('-')[0];

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Botón nativo de compartir
  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: post?.title?.rendered || 'News',
        text: `Check out this post: ${post?.title?.rendered}`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Sharing failed', err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoadingPost(true);
      try {
        const resp = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts/${numericId}?_embed&_=${Date.now()}`
        );
        const data = await resp.json();
        setPost(data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchRecentPosts = async () => {
      setLoadingRecent(true);
      try {
        const resp = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&_embed&_=${Date.now()}`
        );
        const data = await resp.json();
        setRecentPosts(data);
      } catch (err) {
        console.error('Error fetching recent posts:', err);
      } finally {
        setLoadingRecent(false);
      }
    };

    // Ajusta este ID según tu etiqueta 'event'
    const EVENT_TAG_ID = 7;
    const fetchRecentEvents = async () => {
      setLoadingEvents(true);
      try {
        const resp = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?tags=${EVENT_TAG_ID}&per_page=3&order=desc&orderby=date&_embed&_=${Date.now()}`
        );
        const data = await resp.json();
        setRecentEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchPost();
    fetchRecentPosts();
    fetchRecentEvents();
  }, [numericId]);

  if (loadingPost && !post) {
    return (
      <div className="container mx-auto px-4 py-6">
        <SkeletonPostDetail />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-serif text-red-500">Post not found</h2>
        <Link to="/news" className="underline mt-4 inline-block">
          Back to News
        </Link>
      </div>
    );
  }

  // Título
  const title = post.title?.rendered || 'No Title';

  // Corrige lazy load y leaflet->gMaps
  const rawContent = post.content?.rendered || '<p>No content available.</p>';
  const fixedContent = fixLazyLoadAndNoscript(rawContent);

  // Permitir iframes en DOMPurify
  const sanitized = DOMPurify.sanitize(fixedContent, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
  });

  // Imagen destacada o fallback
  const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const fallback = extractFirstImageFromHTML(fixedContent);
  const imageUrl = featured || fallback || null;

  const dateFormatted = new Date(post.date).toLocaleDateString();
  const tags = post._embedded?.['wp:term']?.[1] || [];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{title} | SUS-SOIL News</title>
        <meta
          name="description"
          content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 'News article'}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-4 md:gap-8">
        {/* Barra lateral */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt-16">
          <div className="text-sm text-gray-600">
            Published on: <span className="font-medium">{dateFormatted}</span>
          </div>
          {!!tags.length && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleShare}
            className="bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 inline-flex items-center space-x-2"
          >
            <span>Share</span>
            <FaShareAlt />
          </button>
        </div>

        {/* Contenido principal */}
        <div className="md:col-span-2 mt-16">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-brown mb-4">
            {title}
          </h1>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-h-[600px] object-cover rounded-md mb-4"
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: sanitized }}
            className="prose prose-brown text-brown leading-relaxed"
          />
        </div>

        {/* Últimas noticias y eventos */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt-16">
          {/* Last News */}
          <div>
            <h2 className="text-xl font-serif font-medium text-brown mb-4">
              Last News
            </h2>
            {loadingRecent ? (
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <SkeletonRecentPostCard key={idx} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {recentPosts.map((rp) => {
                  const rpTitle = rp.title?.rendered || 'No Title';
                  const rpDate = new Date(rp.date).toLocaleDateString();
                  const rpImg =
                    rp._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                  return (
                    <Link
                      key={rp.id}
                      to={`/news/${generateNewsSlug(rp.id, rpTitle, rp.date)}`}
                      className="flex items-center space-x-3 hover:bg-lightGreen/20 rounded p-2 transition"
                    >
                      {rpImg ? (
                        <img
                          src={rpImg}
                          alt={rpTitle}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                          N/A
                        </div>
                      )}
                      <div className="text-sm text-brown">
                        <div className="font-semibold">{rpTitle}</div>
                        <div className="text-xs text-gray-500">
                          {rpDate}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Last Events */}
          {recentEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">
                Latest Events
              </h2>
              {loadingEvents ? (
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <SkeletonEventCard key={idx} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {recentEvents.map((ev) => {
                    const evTitle = ev.title?.rendered || 'Untitled';
                    const evDate = new Date(ev.date).toLocaleDateString();
                    const evImg =
                      ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    return (
                      <Link
                        key={ev.id}
                        to={`/news/${generateNewsSlug(
                          ev.id,
                          evTitle,
                          ev.date
                        )}`}
                        className="flex items-center space-x-3 hover:bg-lightGreen/20 rounded p-2 transition"
                      >
                        {evImg ? (
                          <img
                            src={evImg}
                            alt={evTitle}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            N/A
                          </div>
                        )}
                        <div className="text-sm text-brown">
                          <div className="font-semibold">{evTitle}</div>
                          <div className="text-xs text-gray-500">
                            {evDate}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-auto">
            <Link
              to="/news"
              className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80 font-serif"
            >
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}