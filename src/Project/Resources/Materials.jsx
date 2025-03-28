import React, { useState, useEffect } from 'react';
import { FaFileArchive, FaFileWord, FaFileExcel, FaFileImage, FaFile } from 'react-icons/fa';

/**
 * Importa tu API_KEY desde .env (Vite)
 * Asegúrate de que en vite.config.js tengas envPrefix: ['VITE_']
 */
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [videos, setVideos] = useState([]);
  const CHANNEL_ID = 'UCuKwnBuVIiaQ2-azC3qjbQw';
  const MAX_RESULTS = 6;

  useEffect(() => {
    fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=11&_embed')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(post => {
          const media = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
          const fileMatch = post.content?.rendered?.match(/href=["']([^"']+\.(pdf|zip|png|jpg|jpeg|svg|docx?|xlsx?))["']/i);
          return {
            id: post.id,
            title: post.title.rendered,
            preview: media,
            body: post.content.rendered,
            uploadDate: new Date(post.date).toLocaleDateString(),
            downloadLink: fileMatch ? fileMatch[1] : '',
          };
        });
        setMaterials(mapped);
      });
  }, []);

  useEffect(() => {
    if (!API_KEY) return;
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`)
      .then(res => res.json())
      .then(data => {
        if (data.items) setVideos(data.items);
      })
      .catch(err => console.error('Error fetching YouTube videos:', err));
  }, []);

  const getFileIcon = (url) => {
    const ext = url.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'zip':
        return <FaFileArchive className="text-6xl text-brown mx-auto" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-6xl text-brown mx-auto" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-6xl text-brown mx-auto" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        return <FaFileImage className="text-6xl text-brown mx-auto" />;
      default:
        return <FaFile className="text-6xl text-brown mx-auto" />;
    }
  };

  const getFileType = (url) => {
    return url ? url.split('.').pop().toUpperCase() : 'Unknown';
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">Materials</h1>

      <div className="flex justify-center items-center text-center my-8">
        <p className="text-xl text-gray-700 font-medium leading-relaxed">
          In this section you will find all materials produced by the SUS-SOIL project.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold font-serif mb-6">Available Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((material, index) => {
            const hasImage = material.preview && material.preview !== '';
            const fileType = getFileType(material.downloadLink);

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col"
              >
                {hasImage ? (
                  <img
                    src={material.preview}
                    alt={`${material.title} Preview`}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="flex justify-center items-center h-40 mb-4">
                    {getFileIcon(material.downloadLink)}
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-1">{material.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Uploaded: {material.uploadDate}</p>
                <p className="text-sm text-gray-600 mb-4">File type: {fileType}</p>

                <a
                  href={material.downloadLink}
                  download
                  className="inline-block bg-brown text-white text-center px-4 py-2 rounded-lg hover:bg-darkGreen transition-colors mt-auto"
                >
                  Download
                </a>
              </div>
            );
          })}
        </div>
      </section>

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
              <p>No API Key found. Please provide a YouTube API key to see the videos.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
