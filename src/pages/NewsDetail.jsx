// EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaEnvelope, FaWhatsapp, FaTelegramPlane, FaCopy } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Ícono X para Twitter
// Ícono para Bluesky (muy simplificado: una "B")
const BlueskyIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text x="2" y="18" fontSize="18" fontFamily="Arial" fill="currentColor">
      B
    </text>
  </svg>
);

/**
 * Helper para formatear la fecha para Google Calendar.
 * Se asume un evento de día completo.
 */
const formatDateForCalendar = (dateStr) => {
  const d = new Date(dateStr);
  const year = d.getUTCFullYear();
  const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + d.getUTCDate()).slice(-2);
  return `${year}${month}${day}`;
};

// ===================== SKELETON COMPONENTS =====================
const SkeletonPostDetail = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 w-3/4 rounded mb-4"></div>
    <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-5/6 rounded mb-4"></div>
  </div>
);

const SkeletonRecentPostCard = () => (
  <div className="border p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
    <div className="w-full h-48 bg-gray-200 mb-2 rounded"></div>
  </div>
);

const SkeletonEventCard = () => (
  <div className="border p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
    <div className="w-full h-48 bg-gray-200 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-2/3 rounded mb-4"></div>
    <div className="h-8 bg-gray-300 w-full rounded"></div>
  </div>
);

// ===================== COMPONENT =====================
const NewsDetail = () => {
  const { id } = useParams();

  // Estados para la publicación principal
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  // Estados para noticias recientes
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Estados para eventos recientes
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Estados para la sección de compartir
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // Carga la publicación principal
    const fetchPost = async () => {
      try {
        setLoadingPost(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts/${id}?_embed`
        );
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoadingPost(false);
        window.scrollTo(0, 0);
      }
    };

    // Carga noticias recientes
    const fetchRecentPosts = async () => {
      try {
        setLoadingRecent(true);
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&_embed'
        );
        const data = await response.json();
        setRecentPosts(data);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoadingRecent(false);
      }
    };

    // Carga eventos recientes
    const fetchRecentEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/event?per_page=3&order=desc&orderby=date&_embed'
        );
        const data = await response.json();
        setRecentEvents(data);
      } catch (error) {
        console.error('Error fetching recent events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchPost();
    fetchRecentPosts();
    fetchRecentEvents();
  }, [id]);

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
        <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
      </div>
    );
  }

  const title = post.title?.rendered || 'No Title';
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const dateFormatted = new Date(post.date).toLocaleDateString();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Opciones de compartir
  const shareOptions = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      icon: <FaFacebookF size={16} />,
    },
    {
      name: 'Bluesky',
      href: `https://blueskyweb.xyz/compose?text=${encodeURIComponent(title + " " + window.location.href)}`,
      bg: 'bg-sky-400',
      hover: 'hover:bg-sky-500',
      icon: <BlueskyIcon size={16} />,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(title)}`,
      bg: 'bg-slate-500',
      hover: 'hover:bg-slate-600',
      icon: <FaXTwitter size={16} />,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=Check out this post! ${window.location.href}`,
      bg: 'bg-gray-600',
      hover: 'hover:bg-gray-700',
      icon: <FaEnvelope size={16} />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + window.location.href)}`,
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      icon: <FaWhatsapp size={16} />,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`,
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      icon: <FaTelegramPlane size={16} />,
    },
    {
      name: 'Copy Link',
      onClick: handleCopyLink,
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      icon: <FaCopy size={16} />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-4 py-12">
        {/* Header: Back link and title with Back to Events & News button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mt-16">
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-brown ">{title}</h1>
          </div>
          <Link to="/news" className="mt-4 sm:mt-0 bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors">
            Back to Events & News
          </Link>
        </div>

        {/* Main Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full max-h-[600px] object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-[800px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xl">Here flyer image</span>
          </div>
        )}

        {/* Date and Content */}
        <p className="text-gray-500 text-sm mb-4">
          Published on <span className="font-medium">{dateFormatted}</span>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          className="text-brown leading-relaxed"
        />

        {/* Share Section */}
        <div className="mt-6">
          <button
            onClick={toggleShareOptions}
            className="bg-gray-200 text-brown px-6 py-3 rounded-full hover:bg-gray-300 transition-colors"
          >
            Share
          </button>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t pt-4 max-w-xl mx-auto space-y-2"
            >
              {shareOptions.map((option, idx) =>
                option.href ? (
                  <a
                    key={idx}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex justify-between items-center ${option.bg} ${option.hover} text-white px-4 py-2 rounded transition-colors`}
                  >
                    <span>{option.name}</span>
                    <span>{option.icon}</span>
                  </a>
                ) : (
                  <button
                    key={idx}
                    onClick={option.onClick}
                    className={`w-full flex justify-between items-center ${option.bg} ${option.hover} text-white px-4 py-2 rounded transition-colors`}
                  >
                    <span>{option.name}</span>
                    <span>{option.icon}</span>
                  </button>
                )
              )}
              {copySuccess && (
                <p className="mt-2 text-sm text-green-600 text-center">{copySuccess}</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Recent News Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-brown">Recent News</h2>
        {loadingRecent && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, idx) => (
              <SkeletonRecentPostCard key={idx} />
            ))}
          </div>
        )}
        {!loadingRecent && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
            {recentPosts.map((recentPost) => {
              const recentTitle = recentPost.title?.rendered || 'No Title';
              const recentImageUrl =
                recentPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
              return (
                <Link
                  key={recentPost.id}
                  to={`/news/${recentPost.id}`}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <h3 className="text-lg font-bold text-brown mb-2">{recentTitle}</h3>
                  {recentImageUrl ? (
                    <img
                      src={recentImageUrl}
                      alt={recentTitle}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 mb-2 rounded" />
                  )}
                  <p className="text-sm text-brown">
                    Published on{' '}
                    <span className="font-medium">
                      {new Date(recentPost.date).toLocaleDateString()}
                    </span>
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Latest Events Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-brown">Latest Events</h2>
        {loadingEvents && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, idx) => (
              <SkeletonEventCard key={idx} />
            ))}
          </div>
        )}
        {!loadingEvents && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
            {recentEvents.map((ev) => {
              const evTitle = ev.acf?.title || 'Untitled';
              const evImageUrl =
                ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
              const evDate = ev.acf?.date || ev.date;
              return (
                <Link
                  key={ev.id}
                  to={`/event/${ev.id}`}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <h3 className="text-lg font-bold text-brown mb-2">{evTitle}</h3>
                  {evImageUrl ? (
                    <img
                      src={evImageUrl}
                      alt={evTitle}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 mb-2 rounded flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <p className="text-sm text-brown mb-1">
                    Date: <span className="font-medium">{new Date(evDate).toLocaleDateString()}</span>
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Animación sutil: fade-in */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.8s ease-in forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NewsDetail;