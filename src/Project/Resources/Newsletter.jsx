import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Newsletter() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsletterCategoryId = 14;

  const fetchPosts = () => {
    fetch(`https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${newsletterCategoryId}&per_page=100&_embed&_=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching newsletter posts:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-b from-lightGreen to-white py-20 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start text-brown">
        
        {/* Columna izquierda */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Newsletter</h1>
          <p className="text-lg leading-relaxed mb-10">
            Stay up to date with our latest news, project milestones, and events. Subscribe to our newsletter and never miss an update!
          </p>

          {/* Caja de suscripción (móvil) */}
          <div className="lg:hidden bg-white rounded-xl shadow-lg p-6 border border-brown/10 mb-10">
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

          {/* Lista completa sin scroll interno */}
          <div className="flex-1 pr-2">
            <h2 className="text-2xl font-bold font-serif mb-4">Newsletter Archive</h2>

            {loading ? (
              <ul className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <li key={i} className="max-w-md">
                    <Skeleton height={250} className="rounded-xl mb-4" />
                    <Skeleton height={20} width={240} className="mb-2" />
                    <Skeleton height={14} width={100} className="mb-3" />
                    <Skeleton count={2} />
                  </li>
                ))}
              </ul>
            ) : posts.length ? (
              <ul className="space-y-12">
                {posts.map((post) => {
                  const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                  return (
                    <li key={post.id} className="max-w-md">
                      {thumbnail && (
                        <img
                          src={thumbnail}
                          alt={post.title.rendered}
                          className="w-full aspect-square object-cover rounded-xl mb-4"
                        />
                      )}
                      <a
                        href={post.acf?.url || post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-2xl font-semibold hover:underline hover:text-brown transition-colors"
                      >
                        {post.title.rendered}
                        <ExternalLink size={16} />
                      </a>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</p>
                      {post.excerpt?.rendered && (
                        <div
                          className="mt-3 text-base text-brown/80"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-4 border border-dashed border-brown/50 bg-white rounded text-center text-gray-500 italic">
                No newsletter issues available.
              </div>
            )}
          </div>
        </div>

        {/* Caja fija (escritorio) */}
        <div className="hidden lg:block sticky top-20 self-start bg-white rounded-xl shadow-lg p-8 border border-brown/10 h-fit">
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