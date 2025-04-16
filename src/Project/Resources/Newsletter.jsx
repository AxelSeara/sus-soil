import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react'; // Asegúrate de tenerlo instalado

export default function Newsletter() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsletterCategoryId = 14;

  // Función para obtener los posts de la API
  const fetchPosts = () => {
    fetch(`https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${newsletterCategoryId}&per_page=100`)
      .then((res) => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching newsletter posts:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Llamada inicial a la API
    fetchPosts();

    // Configuramos polling para refrescar cada 60 segundos
    const interval = setInterval(() => {
      fetchPosts();
    }, 60000); // 60000 ms = 1 minuto

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Formatear la fecha usando en-US para mostrarla en inglés
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-b from-lightGreen to-white py-20 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start text-brown">
        {/* Sección de Información */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Newsletter</h1>
          <p className="text-lg leading-relaxed mb-10">
            Stay up to date with our latest news, project milestones, and events. Subscribe to our newsletter and never miss an update!
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-bold font-serif mb-4">Newsletter Archive</h2>

            {loading ? (
              <p>Loading newsletter issues...</p>
            ) : posts.length ? (
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.id} className="border-b border-brown/20 pb-4">
                    <a
                      href={post.acf?.url || post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xl font-semibold hover:underline hover:text-brown transition-colors"
                    >
                      {post.title.rendered}
                      <ExternalLink size={16} />
                    </a>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</p>
                    {post.excerpt?.rendered && (
                      <div
                        className="mt-2 text-base text-brown/80"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 border border-dashed border-brown/50 bg-white rounded text-center text-gray-500 italic">
                No newsletter issues available.
              </div>
            )}
          </div>
        </div>

        {/* Caja de Suscripción */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-brown/10">
          <h3 className="text-2xl font-serif font-semibold mb-4">Join Our Mailing List</h3>
          <p className="text-sm text-brown mb-6">
            Click the button below to sign up and receive project updates:
          </p>
          <a
            href="https://gmail.us11.list-manage.com/subscribe?u=6fbd6e1c74aa5e4a311896dcc&id=826cb744b4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown hover:bg-opacity-80 text-white font-semibold px-6 py-3 rounded-full text-center transition-all"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
}