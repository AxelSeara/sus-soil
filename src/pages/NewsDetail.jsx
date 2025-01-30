import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFacebookF, FaXTwitter, FaEnvelope } from 'react-icons/fa6';

// ===================== SKELETONS =====================
const SkeletonPostDetail = () => (
  <div className="animate-pulse">
    {/* Título placeholder */}
    <div className="h-8 bg-gray-300 w-3/4 rounded mb-4"></div>
    {/* Imagen principal placeholder */}
    <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
    {/* Fecha y texto placeholder */}
    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-5/6 rounded mb-4"></div>
    {/* Botones compartir placeholder */}
    <div className="flex gap-2">
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
    </div>
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

  // Publicación principal
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  // Noticias recientes
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Eventos recientes
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

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
        window.scrollTo(0, 0); // Al cargar el detalle, sube al top
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

  // ================== RENDER: LOADING POST ==================
  if (loadingPost && !post) {
    return (
      <div className="container mx-auto px-4 py-6">
        <SkeletonPostDetail />
      </div>
    );
  }

  // ================== RENDER: NO POST FOUND ==================
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
      </div>
    );
  }

  // ================== DATA POST ==================
  const title = post.title?.rendered || 'No Title';
  const imageUrl =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const dateFormatted = new Date(post.date).toLocaleDateString();

  // ================== RENDER ==================
  return (
    <div>
      {/* Contenido principal de la publicación */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 mt-16">
          <h1 className="text-3xl md:text-4xl font-bold text-brown">
            {title}
          </h1>
          {/* Botón pequeño para ir a todas las noticias */}
          <Link
            to="/news"
            className="bg-brown text-white px-3 py-2 rounded-full text-sm hover:bg-opacity-80 transition-colors"
          >
            All News
          </Link>
        </div>

        {/* Imagen principal */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full max-h-[600px] object-cover rounded-md mb-4"
          />
        )}

        {/* Fecha y contenido */}
        <p className="text-gray-500 text-sm mb-4">
          Published on <span className="font-medium">{dateFormatted}</span>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          className="text-brown leading-relaxed"
        />

        {/* Botones de compartir */}
        <div className="flex flex-wrap gap-3 mt-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
            Share on Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(
              title
            )}`}
            className="bg-blue-400 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
            Share on X
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=Check out this post! ${
              window.location.href
            }`}
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <FaEnvelope />
            Share via Email
          </a>
        </div>
      </section>

      {/* Noticias Recientes */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-brown">
          Recent News
        </h2>

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
                recentPost._embedded?.['wp:featuredmedia']?.[0]
                  ?.source_url || null;

              return (
                <Link
                  key={recentPost.id}
                  to={`/news/${recentPost.id}`}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <h3 className="text-lg font-bold text-brown mb-2">
                    {recentTitle}
                  </h3>
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

      {/* Últimos Eventos */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-brown">
          Latest Events
        </h2>

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
              const evId = ev.id;

              return (
                <Link
                  key={evId}
                  to={`/event/${evId}`}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <h3 className="text-lg font-bold text-brown mb-2">
                    {evTitle}
                  </h3>
                  {evImageUrl ? (
                    <img
                      src={evImageUrl}
                      alt={evTitle}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 mb-2 rounded" />
                  )}
                  {/* Muestra la fecha */}
                  <p className="text-sm text-brown mb-1">
                    Date: <span className="font-medium">{new Date(evDate).toLocaleDateString()}</span>
                  </p>
                  {/* Podrías mostrar la ubicación, excerpt, etc. */}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Animación sutil: fade-in con Tailwind + keyframes, si deseas */}
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