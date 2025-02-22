// NewsDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import { FaCamera, FaShareAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Icono X para Twitter
import {
  SkeletonPostDetail,
  SkeletonRecentPostCard,
  SkeletonEventCard,
} from './Skeletons';

// Helper para generar el slug a partir del id, título y fecha
const generateNewsSlug = (id, title, date) => {
  const d = new Date(date);
  const datePart = isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10); // YYYY-MM-DD
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
};

export default function NewsDetail() {
  const { id: routeId } = useParams();
  const numericId = routeId.split('-')[0]; // Ej: "56" de "56-we-rise..."

  // Estados para el post principal, noticias recientes y eventos recientes
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Manejador para compartir utilizando la Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title?.rendered || 'News',
          text: `Check out this post: ${post?.title?.rendered}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing failed', error);
      }
    } else {
      console.log('Web Share API not supported in this browser.');
    }
  };

  useEffect(() => {
    // Función para obtener el post principal
    const fetchPost = async () => {
      try {
        setLoadingPost(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts/${numericId}?_embed`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoadingPost(false);
        window.scrollTo(0, 0);
      }
    };

    // Función para obtener las noticias recientes
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

    // Función para obtener los eventos recientes
    const fetchRecentEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/event?per_page=3&order=desc&orderby=date&_embed'
        );
        const data = await response.json();
        setRecentEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
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
      <div className="container mx-auto px-4 py-6 mt-16">
        <SkeletonPostDetail />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-6 mt-16">
        <h2 className="text-2xl font-serif font-medium text-red-500">Post not found</h2>
        <Link to="/news" className="text-blue-600 underline mt-4 inline-block">
          Back to News
        </Link>
      </div>
    );
  }

  // Datos del post
  const title = post.title?.rendered || 'No Title';
  const defaultImage = '/path/to/default-image.jpg'; // Ruta a una imagen por defecto si no hay imagen destacada
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || defaultImage;
  const dateFormatted = new Date(post.date).toLocaleDateString();
  const rawContent = post.content?.rendered || '<p>No content available.</p>';
  // Sanitizamos el contenido HTML para mayor seguridad
  const content = DOMPurify.sanitize(rawContent);

  return (
    <div className="bg-white min-h-screen">
      {/* SEO con react-helmet */}
      <Helmet>
        <title>{title} | Sus Soil News</title>
        <meta
          name="description"
          content={
            post.excerpt?.rendered.replace(/<[^>]+>/g, '') || 'News article'
          }
        />
      </Helmet>

      {/* IMPORTANTE: Asegúrate de incluir el CSS de Elementor en tu index.html o importado globalmente */}
      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-4 md:gap-8">
        {/* Columna Izquierda: Información adicional */}
        <div className="md:col-span-1 mb-8 md:mb-0 flex flex-col space-y-6 mt-16">
          <div className="bg-boreal text-white font-bold px-4 py-2 rounded shadow-md">
            Region: Boreal
          </div>
          <div className="text-sm text-gray-600">
            Published on: <span className="font-medium">{dateFormatted}</span>
          </div>
          <button
            onClick={handleNativeShare}
            className="bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
          >
            <span>Share</span>
            <FaShareAlt />
          </button>
        </div>

        {/* Columna Central: Contenido principal */}
        <div className="md:col-span-2 mt-16">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-brown mb-4">
            {title}
          </h1>
          {imageUrl ? (
            <div className="mb-4">
              <img
                src={imageUrl}
                alt={title}
                className="w-full max-h-[600px] object-cover rounded-md"
              />
              <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                <FaCamera />
                <span>Photo by Author / Placeholder</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xl">Here flyer image</span>
            </div>
          )}
          {/* Renderización del contenido con Tailwind Typography (clase "prose") para preservar la maquetación original */}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-brown text-brown leading-relaxed"
          />
        </div>

        {/* Columna Derecha: Últimas noticias y eventos */}
        <div className="md:col-span-1 flex flex-col space-y-6 md:mt-0 mt-16">
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
                {recentPosts.map((recentPost) => {
                  const rTitle = recentPost.title?.rendered || 'No Title';
                  const rDate = new Date(recentPost.date).toLocaleDateString();
                  const rImageUrl =
                    recentPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                  return (
                    <Link
                      key={recentPost.id}
                      to={`/news/${generateNewsSlug(
                        recentPost.id,
                        rTitle,
                        recentPost.date
                      )}`}
                      className="flex items-center space-x-3 hover:bg-lightGreen/20 rounded p-2 transition"
                    >
                      {rImageUrl ? (
                        <img
                          src={rImageUrl}
                          alt={rTitle}
                          className="w-12 h-12 rounded-full object-cover"
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
            )}
          </div>
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
                  const evTitle = ev.acf?.title || 'Untitled';
                  const evDate = new Date(ev.acf?.date || ev.date).toLocaleDateString();
                  const evImageUrl =
                    ev._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                  return (
                    <Link
                      key={ev.id}
                      to={`/event/${ev.id}`}
                      className="flex items-center space-x-3 hover:bg-lightGreen/20 rounded p-2 transition"
                    >
                      {evImageUrl ? (
                        <img
                          src={evImageUrl}
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

      {/* Animación de fade-in */}
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
}