import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

console.log("YouTube API Key:", API_KEY); //  verificar 

export default function Materials() {
  // Mock data for materials (will later be replaced by API data)
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

  

  // Estado para almacenar los videos de YouTube
  const [videos, setVideos] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Lee la API Key de .env
  const CHANNEL_ID = 'UCuKwnBuVIiaQ2-azC3qjbQw'; // ID del canal de SUS-SOIL
  const MAX_RESULTS = 6; // Número de videos a mostrar

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setVideos(data.items);
        }
      })
      .catch(error => console.error('Error fetching YouTube videos:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-brown font-serif mt-16 mb-8">
        Materials
      </h1>

      {/* WIP Message */}
      <div className="flex justify-center items-center text-center my-16">
        <p className="text-xl text-gray-700 font-medium">
          On this section you will find all materials produced by the SUS-SOIL project.
        </p>
      </div>

      {/* Materials List */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-6">Available Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((material, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
              <img
                src={material.preview}
                alt={`${material.title} Preview`}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold text-brown mt-4">{material.title}</h3>
              <p className="text-gray-600 text-sm mb-2">Uploaded: {material.uploadDate}</p>
              <a
                href={material.downloadLink}
                download
                className="inline-block bg-brown text-white px-4 py-2 rounded-lg hover:bg-darkGreen transition duration-300"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brown font-serif mb-6">Videos</h2>
        <p className="text-gray-700 mb-6">
          Here you will find the latest content from our YouTube channel.
        </p>

        {/* Grid de videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map(video => (
              <div key={video.id.videoId} className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
                <p className="text-sm font-medium text-gray-700 p-2">{video.snippet.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No videos available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}