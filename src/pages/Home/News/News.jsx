import React, { useEffect, useState } from 'react';

// Componente SkeletonCard: muestra un placeholder mientras se cargan los items
function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
    </div>
  );
}

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    // Llamada a la API para posts (noticias)
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&_embed'
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    // Llamada a la API para eventos
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://admin.sus-soil.eu/wp-json/wp/v2/event?per_page=3&_embed'
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchPosts();
    fetchEvents();
  }, []);

  return (
    <>
      {/* Sección Latest News sin contenedor envolvente */}
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-brown">
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingPosts
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-[0_0_20px_rgba(110,187,120,0.7)] transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-4 text-brown">
                    {post.title.rendered}
                  </h3>
                  {post._embedded &&
                    post._embedded['wp:featuredmedia'] &&
                    post._embedded['wp:featuredmedia'][0].source_url && (
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered || 'Post image'}
                        className="mb-4 rounded-lg object-cover w-full h-40"
                      />
                    )}
                  <div className="mt-auto">
                    <a
                      href={`/news/${post.id}`}
                      className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Separador centrado */}
      <div className="w-24 mx-auto border-t-2 border-green-500 my-8"></div>

      {/* Sección Latest Events sin contenedor envolvente */}
      <section className="py-12 px-6 md:px-16 my-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-brown">
          Latest Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingEvents
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-[0_0_20px_rgba(110,187,120,0.7)] transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-4 text-brown">
                    {event.title.rendered || event.acf?.title || "Untitled Event"}
                  </h3>
                  {event._embedded &&
                  event._embedded['wp:featuredmedia'] &&
                  event._embedded['wp:featuredmedia'][0].source_url ? (
                    <img
                      src={event._embedded['wp:featuredmedia'][0].source_url}
                      alt={event.title.rendered || "Event image"}
                      className="mb-4 rounded-lg object-cover w-full h-40"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <div className="mt-auto">
                    <a
                      href={`/event/${event.id}`}
                      className="inline-block px-6 py-3 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/events"
            className="px-8 py-4 bg-brown hover:bg-opacity-80 text-white font-bold rounded-full shadow-lg transition-colors"
          >
            Visit All Events
          </a>
        </div>
      </section>
    </>
  );
};

export default News;