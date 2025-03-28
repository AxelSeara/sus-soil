import React, { useState, useEffect } from 'react';
import {
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaFileAlt,
  FaDownload,
} from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const getIconByMime = (mime) => {
  if (mime.includes('pdf')) return <FaFilePdf className="text-red-600 w-12 h-12" />;
  if (mime.includes('zip')) return <FaFileArchive className="text-yellow-500 w-12 h-12" />;
  if (mime.includes('image')) return <FaFileImage className="text-blue-500 w-12 h-12" />;
  return <FaFileAlt className="text-gray-500 w-12 h-12" />;
};

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const CATEGORY_ID = 11;

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&_embed&acf_format=standard`
        );
        const posts = await res.json();

        const enriched = posts.map((post) => {
          const file = post.acf?.file || {};
          return {
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            date: new Date(post.date).toLocaleDateString(),
            file: {
              url: file.url || '',
              mime: file.mime_type || '',
            },
            featured: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
          };
        });

        setMaterials(enriched);
      } catch (err) {
        console.error('Error fetching materials:', err);
      } finally {
        setLoadingMaterials(false);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    if (!API_KEY) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=UCuKwnBuVIiaQ2-azC3qjbQw&part=snippet,id&order=date&maxResults=6`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []))
      .catch((err) => console.error('YouTube fetch error:', err))
      .finally(() => setLoadingVideos(false));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">Materials</h1>
      <p className="text-xl text-gray-700 font-medium mb-12 max-w-2xl">
        In this section you will find all materials produced by the SUS-SOIL project.
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-bold font-serif mb-6">Available Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingMaterials
            ? [...Array(2)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg bg-white shadow">
                  <Skeleton height={160} className="mb-4 rounded" />
                  <Skeleton width={200} height={20} className="mb-2" />
                  <Skeleton width={120} height={14} className="mb-4" />
                  <Skeleton count={3} height={10} className="mb-2" />
                  <Skeleton width={140} height={36} />
                </div>
              ))
            : materials.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {m.featured ? (
                    <img
                      src={m.featured}
                      alt={m.title}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded mb-4">
                      {getIconByMime(m.file.mime)}
                    </div>
                  )}

                  <h3 className="text-lg font-semibold mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Uploaded: {m.date}</p>

                  <div
                    className="text-sm text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: m.content }}
                  />

                  {m.file.url && (
                    <a
                      href={m.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brown text-white px-4 py-2 rounded-lg hover:bg-darkGreen transition-colors"
                      download
                    >
                      <FaDownload />
                      Download ({m.file.mime.split('/').pop().toUpperCase()})
                    </a>
                  )}
                </div>
              ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-serif mb-6">Videos</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Here you can find the latest videos from our YouTube channel.
        </p>

        {loadingVideos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow p-4 bg-white">
                <Skeleton height={250} className="mb-3 rounded" />
                <Skeleton width={220} height={20} />
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p className="text-sm font-medium text-gray-700 p-2 leading-tight">
                  {video.snippet.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {API_KEY ? 'No videos available at the moment.' : 'Missing YouTube API key.'}
          </p>
        )}
      </section>
    </div>
  );
}
