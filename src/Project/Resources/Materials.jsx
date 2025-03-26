// src/Project/Resources/Materials.jsx
import React, { useState, useEffect } from 'react';

/**
 * Importa tu API_KEY desde .env (Vite)
 * Asegúrate de que en vite.config.js tengas envPrefix: ['VITE_']
 */
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Materials() {
  // Datos de prueba para materiales locales
  const materials = [
    {
      title: 'Roll-up Flyer',
      preview: '/assets/previews/flyer-preview.jpg',
      downloadLink: '/downloads/roll-up-flyer.pdf',
      uploadDate: 'March 15, 2025',
    },
    {
      title: 'SUS-SOIL Logo',
      preview: '/assets/previews/logo-preview.png',
      downloadLink: '/downloads/sus-soil-logo.zip',
      uploadDate: 'March 10, 2025',
    },
  ];

  // Estado para almacenar videos del canal de YouTube
  const [videos, setVideos] = useState([]);

  // ID del canal y config
  const CHANNEL_ID = 'UCuKwnBuVIiaQ2-azC3qjbQw';
  const MAX_RESULTS = 6;

  // Obtener lista de videos al montar
  useEffect(() => {
    if (!API_KEY) {
      console.warn("No YouTube API key found in env!");
      return;
    }
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setVideos(data.items);
        }
      })
      .catch(err => console.error('Error fetching YouTube videos:', err));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      {/* Título principal */}
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">
        Materials
      </h1>

      {/* Breve descripción o mensaje WIP */}
      <div className="flex justify-center items-center text-center my-8">
        <p className="text-xl text-gray-700 font-medium leading-relaxed">
          In this section you will find all materials produced by the SUS-SOIL project.
        </p>
      </div>

      {/* Sección: Materiales disponibles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-serif mb-6">Available Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((material, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-md 
                         hover:shadow-xl transition-transform duration-300 
                         hover:-translate-y-1"
            >
              <img
                src={material.preview}
                alt={`${material.title} Preview`}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-4 mb-1">
                {material.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Uploaded: {material.uploadDate}
              </p>
              <a
                href={material.downloadLink}
                download
                className="inline-block bg-brown text-white px-4 py-2 rounded-lg
                           hover:bg-darkGreen transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Sección: Videos */}
      <section>
        <h2 className="text-2xl font-bold font-serif mb-6">Videos</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Here you can find the latest videos from our YouTube channel.
        </p>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div
                key={video.id.videoId}
                className="rounded-lg overflow-hidden shadow-lg
                           hover:shadow-xl transition-transform duration-300
                           hover:-translate-y-1"
              >
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; 
                         encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                />
                <p className="text-sm font-medium text-gray-700 p-2 leading-tight">
                  {video.snippet.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {API_KEY ? (
              <p>No videos available at the moment.</p>
            ) : (
              <p>
                No API Key found. Please provide a YouTube API key to see the videos.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}