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

// Extraer la primera imagen del contenido si no hay featured
function extractFirstImageFromHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') || null;
}

// Generar slug SEO
const generateNewsSlug = (id, title, date) => {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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

  // Carga del post
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

    // Últimas 3 noticias
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

    // Últimos eventos (tag=event)
    const fetchRecentEvents = async () => {
      setLoadingEvents(true);
      try {
        const resp = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?tags=event&per_page=3&order=desc&orderby=date&_embed&_=${Date.now()}`
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

  // Loading
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

  // Título e imagen
  const title = post.title?.rendered || 'No Title';
  const rawContent = post.content?.rendered || '<p>No content available.</p>';
  const sanitized = DOMPurify.sanitize(rawContent);
  const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const fallback = extractFirstImageFromHTML(rawContent);
  const imageUrl = featured || fallback || null;

  // Tags
  const tags = post._embedded?.['wp:term']?.[1] || [];
  // Fecha
  const dateFormatted = new Date(post.date).toLocaleDateString();

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{title} | SUS-SOIL News</title>
        <meta
          name="description"
          content={post.excerpt?.rendered.replace(/<[^>]+>/g, '') || 'News article'}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-4 md:gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt-16">
          <div className="text-sm text-gray-600">
            Published on: <span className="font-medium">{dateFormatted}</span>
          </div>
          {tags.length > 0 && (
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

        {/* Main content */}
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

        {/* Right column: last news + last events */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt-16">
          {/* Last News */}
          <div>
            <h2 className="text-xl font-serif font-medium text-brown mb-4">Last News</h2>
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
                  const rpImg = rp._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
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
                        <div className="text-xs text-gray-500">{rpDate}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Last events */}
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
                    const evImg = ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    return (
                      <Link
                        key={ev.id}
                        to={`/news/${generateNewsSlug(ev.id, evTitle, ev.date)}`}
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
                          <div className="text-xs text-gray-500">{evDate}</div>
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