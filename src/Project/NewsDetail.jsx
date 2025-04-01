import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import { FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Importa html-react-parser y componentes de Swiper, usando módulos desde "swiper/modules"
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ------------------------------
// Funciones de ayuda para búsqueda recursiva
// ------------------------------
function findElementByClass(node, className) {
  if (node.type === 'tag' && node.attribs && node.attribs.class && node.attribs.class.includes(className)) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findElementByClass(child, className);
      if (found) return found;
    }
  }
  return null;
}

function findFirstTag(node, tagName) {
  if (node.type === 'tag' && node.name === tagName) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findFirstTag(child, tagName);
      if (found) return found;
    }
  }
  return null;
}

// ------------------------------
// Funciones de procesamiento de HTML
// ------------------------------
function parseLeafletScriptForCoords(scriptText) {
  const latMatch = scriptText.match(/"latitude":"([0-9.\-]+)"/);
  const lngMatch = scriptText.match(/"longitude":"([0-9.\-]+)"/);
  if (!latMatch || !lngMatch) return null;
  return { lat: latMatch[1], lng: lngMatch[1] };
}

function replaceLeafletWithGoogleMaps(doc) {
  const containers = doc.querySelectorAll('.wp-block-themeisle-blocks-leaflet-map');
  containers.forEach((div) => {
    const parent = div.closest('.wp-block-group, .wp-block-themeisle-blocks-leaflet-map') || doc;
    const scripts = parent.querySelectorAll('script');
    let coords = null;
    scripts.forEach((sc) => {
      const text = sc.innerHTML;
      if (text.includes('window.themeisleLeafletMaps.push') && text.includes('"latitude"')) {
        coords = parseLeafletScriptForCoords(text);
      }
    });
    if (coords) {
      const iframe = doc.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.src = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      div.appendChild(iframe);
    }
  });
}

function transformGalleries(doc) {
  const galleries = doc.querySelectorAll('.wp-block-gallery');
  galleries.forEach((gallery) => {
    const sliderContainer = doc.createElement('div');
    sliderContainer.className = 'gallery-slider';
    const imgs = gallery.querySelectorAll('img');
    imgs.forEach((img) => {
      const slide = doc.createElement('div');
      slide.className = 'slide';
      slide.appendChild(img.cloneNode(true));
      sliderContainer.appendChild(slide);
    });
    gallery.parentNode.replaceChild(sliderContainer, gallery);
  });
}

function fixLazyLoadAndNoscript(html) {
  let cleaned = html
    .replace(/data-src=/g, 'src=')
    .replace(/\sclass="lazyload"/g, '');
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');
  const noScripts = doc.querySelectorAll('noscript');
  noScripts.forEach((ns) => {
    const realImg = ns.querySelector('img');
    if (realImg) {
      const figure = ns.closest('figure, .wp-block-image, .wp-block-gallery, .wp-block-group');
      if (figure) {
        const figcaption = figure.querySelector('figcaption');
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
  replaceLeafletWithGoogleMaps(doc);

  // Transforma los iframes de YouTube: recrea el embed con clases de Tailwind
  const youtubeIframes = doc.querySelectorAll('iframe[src*="youtube.com"]');
  youtubeIframes.forEach((iframe) => {
    const src = iframe.getAttribute('src');
    const container = doc.createElement('div');
    container.innerHTML = `<div class="relative w-full aspect-[16/9] overflow-hidden mb-4">
      <iframe src="${src}" title="${iframe.getAttribute('title') || 'YouTube video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full"></iframe>
    </div>`;
    iframe.parentNode.replaceChild(container, iframe);
  });

  // Transforma galerías simples en contenedores slider
  transformGalleries(doc);

  return doc.body.innerHTML;
}

function extractFirstImageFromHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') || null;
}

function generateNewsSlug(id, title, date) {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
}

// ------------------------------
// Skeletons (sin cambios)
// ------------------------------
const PostDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-6">
    <Skeleton height={40} width="60%" className="mb-6" />
    <Skeleton height={400} className="mb-6" />
    <Skeleton count={5} />
  </div>
);

const RecentPostSkeleton = () => (
  <div className="flex items-center space-x-3 p-2">
    <Skeleton circle={true} height={48} width={48} />
    <div className="flex flex-col">
      <Skeleton height={16} width={120} />
      <Skeleton height={12} width={80} />
    </div>
  </div>
);

const EventSkeleton = () => (
  <div className="flex items-center space-x-3 p-2">
    <Skeleton circle={true} height={48} width={48} />
    <div className="flex flex-col">
      <Skeleton height={16} width={120} />
      <Skeleton height={12} width={80} />
    </div>
  </div>
);

// ------------------------------
// Transformador para html-react-parser (Slider & YouTube)
// ------------------------------
const transform = (node, index) => {
  // Si es un iframe de YouTube, se recrea el embed usando Tailwind
  if (
    node.type === 'tag' &&
    node.name === 'iframe' &&
    node.attribs &&
    node.attribs.src &&
    node.attribs.src.includes('youtube.com')
  ) {
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
  // Detecta slider de Themeisle (Glide)
  if (
    node.type === 'tag' &&
    node.name === 'div' &&
    node.attribs &&
    node.attribs.class &&
    node.attribs.class.includes('wp-block-themeisle-blocks-slider')
  ) {
    const glideSlidesNode = findElementByClass(node, 'glide__slides');
    if (glideSlidesNode && glideSlidesNode.children) {
      const slideNodes = glideSlidesNode.children.filter(
        (child) =>
          child.type === 'tag' &&
          child.attribs &&
          child.attribs.class &&
          child.attribs.class.includes('glide__slide')
      );
      const images = slideNodes
        .map((slide, i) => {
          const imgNode = findFirstTag(slide, 'img');
          if (imgNode) {
            const src =
              imgNode.attribs.src && imgNode.attribs.src.startsWith('data:')
                ? imgNode.attribs['data-src']
                : imgNode.attribs.src;
            const alt = imgNode.attribs.alt || `Slide ${i + 1}`;
            return { src, alt };
          }
          return null;
        })
        .filter(Boolean);
      if (images.length > 0) {
        return (
          <div key={index} className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1} // Un slide por vista para forzar el ratio fijo
              className="w-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900">
                    {/* Fondo con la misma imagen desfeocada */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${img.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px)',
                        transform: 'scale(1.1)',
                      }}
                    />
                    {/* Imagen principal */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="relative z-10 object-contain w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      }
    }
  }
};

// ------------------------------
// Componente NewsDetail
// ------------------------------
export default function NewsDetail() {
  const { id: routeId } = useParams();
  const numericId = routeId.split('-')[0];

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const CATEGORY_ID = 12;
  const EVENT_TAG_ID = 7;

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
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&per_page=10&order=desc&orderby=date&_embed&_=${Date.now()}`
        );
        const data = await resp.json();
        const postsOnly = data.filter((p) => {
          const tags = p._embedded?.['wp:term']?.[1] || [];
          return !tags.some((t) => t.name.toLowerCase() === 'event');
        });
        setRecentPosts(postsOnly.slice(0, 3));
      } catch (err) {
        console.error('Error fetching recent posts:', err);
      } finally {
        setLoadingRecent(false);
      }
    };

    const fetchRecentEvents = async () => {
      setLoadingEvents(true);
      try {
        const resp = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&tags=${EVENT_TAG_ID}&per_page=3&order=desc&orderby=date&_embed&_=${Date.now()}`
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

  useEffect(() => {
    if (!post) return;
    const tagArray = post._embedded?.['wp:term']?.[1] || [];
    if (tagArray.length === 0) return;
    const tagIds = tagArray.map((t) => t.id).join(',');
    setLoadingRelated(true);
    fetch(
      `https://admin.sus-soil.eu/wp-json/wp/v2/posts?tags=${tagIds}&per_page=3&exclude=${post.id}&_embed&_=${Date.now()}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRelatedPosts(data);
      })
      .catch((err) => console.error('Error fetching related:', err))
      .finally(() => {
        setLoadingRelated(false);
      });
  }, [post]);

  if (loadingPost && !post) {
    return <PostDetailSkeleton />;
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

  const title = post.title?.rendered || 'No Title';
  const rawContent = post.content?.rendered || '<p>No content available.</p>';
  const fixedContent = fixLazyLoadAndNoscript(rawContent);
  const sanitized = DOMPurify.sanitize(fixedContent, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
  });

  const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const fallbackImg = extractFirstImageFromHTML(fixedContent);
  const imageUrl = featured || fallbackImg || null;
  const dateFormatted = new Date(post.date).toLocaleDateString();
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const isEvent = tags.some((t) => t.name.toLowerCase() === 'event');

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{title} | SUS-SOIL {isEvent ? 'Events' : 'News'}</title>
        <meta
          name="description"
          content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 'News article'}
        />
      </Helmet>
      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-3 md:gap-8">
        {/* MAIN CONTENT (2/3) */}
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-brown mb-4">
            {title}
          </h1>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-h-[600px] object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
            />
          )}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="text-sm text-gray-600">
              Published on: <span className="font-medium">{dateFormatted}</span>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t.id} className="bg-lightGreen text-brown text-xs font-medium px-2 py-1 rounded-full">
                    {t.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Parseamos el HTML para transformar sliders, galerías y YouTube embeds */}
          <div className="prose leading-relaxed mb-4 text-brown prose-a:text-darkGreen prose-a:underline prose-strong:font-bold prose-strong:text-brown">            {parse(sanitized, { replace: transform })}
          </div>
          <div className="flex items-center gap-4 mt-8 mb8">
            <button
              onClick={handleShare}
              className="bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 inline-flex items-center space-x-2"
              title="Share this post"
            >
              <span>Share</span>
              <FaShareAlt />
            </button>
            <Link
              to="/news"
              className="inline-block bg-brown text-white py-2 px-6 rounded-full hover:bg-opacity-80 font-serif transition-colors duration-300"
            >
              <FaArrowLeft className="inline-block mr-2" />
              Back to News
            </Link>
          </div>
        </div>
        {/* RIGHT COLUMN (1/3) */}
        <div className="md:col-span-1 flex flex-col space-y-8">
          {loadingRecent ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Last News</h2>
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <RecentPostSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : (
            recentPosts.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">
                  Last News
                </h2>
                <div className="flex flex-col space-y-4">
                  {recentPosts.map((rp) => {
                    const rpTitle = rp.title?.rendered || 'No Title';
                    const rpDate = new Date(rp.date).toLocaleDateString();
                    const rpImg = rp._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    return (
                      <Link
                        key={rp.id}
                        to={`/news/${generateNewsSlug(rp.id, rpTitle, rp.date)}`}
                        className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded"
                      >
                        {rpImg ? (
                          <img
                            src={rpImg}
                            alt={rpTitle}
                            className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            N/A
                          </div>
                        )}
                        <div className="text-sm text-brown">
                          <div className="font-semibold">{rpTitle}</div>
                          <div className="text-xs text-gray-500">{rpDate}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )
          )}
          {loadingEvents ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Latest Events</h2>
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <EventSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : (
            recentEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">
                  Latest Events
                </h2>
                <div className="flex flex-col space-y-4">
                  {recentEvents.map((ev) => {
                    const evTitle = ev.title?.rendered || 'Untitled';
                    const evDate = new Date(ev.date).toLocaleDateString();
                    const evImg = ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    return (
                      <Link
                        key={ev.id}
                        to={`/news/${generateNewsSlug(ev.id, evTitle, ev.date)}`}
                        className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded"
                      >
                        {evImg ? (
                          <img
                            src={evImg}
                            alt={evTitle}
                            className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            N/A
                          </div>
                        )}
                        <div className="text-sm text-brown">
                          <div className="font-semibold">{evTitle}</div>
                          <div className="text-xs text-gray-500">{evDate}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )
          )}
          {loadingRelated ? (
            <div>
              <h2 className="text-xl font-serif font-medium text-brown mb-4">Related Posts</h2>
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <RecentPostSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : (
            relatedPosts.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-medium text-brown mb-4 border-b border-brown/20 pb-2">
                  Related Posts
                </h2>
                <div className="flex flex-col space-y-4">
                  {relatedPosts.map((r) => {
                    const rTitle = r.title?.rendered || 'No Title';
                    const rDate = new Date(r.date).toLocaleDateString();
                    const rImg = r._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    return (
                      <Link
                        key={r.id}
                        to={`/news/${generateNewsSlug(r.id, rTitle, r.date)}`}
                        className="flex items-center space-x-3 p-2 transition-colors hover:bg-lightGreen/20 rounded"
                      >
                        {rImg ? (
                          <img
                            src={rImg}
                            alt={rTitle}
                            className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            N/A
                          </div>
                        )}
                        <div className="text-sm text-brown">
                          <div className="font-semibold">{rTitle}</div>
                          <div className="text-xs text-gray-500">{rDate}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}