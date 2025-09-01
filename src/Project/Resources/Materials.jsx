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
  if (!mime) return <FaFileAlt className="text-gray-500 w-10 h-10" />;
  if (mime.includes('pdf'))  return <FaFilePdf className="text-red-600 w-10 h-10" />;
  if (mime.includes('zip'))  return <FaFileArchive className="text-yellow-500 w-10 h-10" />;
  if (mime.includes('image'))return <FaFileImage className="text-blue-500 w-10 h-10" />;
  return <FaFileAlt className="text-gray-500 w-10 h-10" />;
};

const fileExt = (mime = '') => {
  const ext = mime.split('/').pop();
  return ext ? ext.toUpperCase() : 'FILE';
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
          `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&_embed&acf_format=standard&_=${Date.now()}`,
          { cache: 'no-cache' }
        );
        let posts = [];
        try {
          posts = await res.json();
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
        }
        if (!Array.isArray(posts)) posts = [];

        const enriched = posts.map((post) => {
          const file = post.acf?.file || {};
          return {
            id: post.id,
            title: post.title.rendered,
            content:
              post.content.rendered.trim() !== '' ? post.content.rendered : '<p> </p>',
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
      .then((data) => {
        const validVideos = (data.items || []).filter(
          (item) => item.id && item.id.kind === 'youtube#video'
        );
        setVideos(validVideos);
      })
      .catch((err) => console.error('YouTube fetch error:', err))
      .finally(() => setLoadingVideos(false));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Materials</h1>
      <p className="text-lg md:text-xl text-gray-700 font-medium mb-12 max-w-2xl">
        In this section you will find all materials produced by the SUS-SOIL project.
      </p>

      {/* Available Materials */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold font-serif mb-6">Available Materials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingMaterials ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg bg-white shadow">
                {/* 16:9 skeleton */}
                <div className="w-full rounded mb-4 overflow-hidden">
                  <Skeleton className="w-full" height={0} style={{ paddingTop: '56.25%' }} />
                </div>
                <Skeleton width={240} height={20} className="mb-2" />
                <Skeleton width={140} height={14} className="mb-4" />
                <Skeleton count={3} height={10} className="mb-2" />
                <Skeleton width={160} height={40} />
              </div>
            ))
          ) : materials.length > 0 ? (
            materials.map((m) => (
              <article
                key={m.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Media: 16:9 area */}
                <div className="relative w-full rounded-lg overflow-hidden mb-4">
                  <div className="aspect-[16/9] w-full bg-gray-100">
                    {m.featured ? (
                      <img
                        src={m.featured}
                        alt={m.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getIconByMime(m.file.mime)}
                      </div>
                    )}
                  </div>

                  {/* File badge (top-left) */}
                  {m.file?.mime && (
                    <span className="absolute top-2 left-2 text-[11px] px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-black/5">
                      {fileExt(m.file.mime)}
                    </span>
                  )}
                </div>

                <header className="mb-2">
                  <h3 className="text-lg font-semibold leading-snug">{m.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Uploaded: {m.date}</p>
                </header>

                <div
                  className="prose prose-sm max-w-none text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{ __html: m.content }}
                />

                {m.file.url && (
                  <a
                    href={m.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brown text-white px-4 py-2 rounded-lg hover:bg-darkGreen transition-colors focus:outline-none focus-visible:ring-2 ring-offset-2"
                    download
                    aria-label={`Download ${fileExt(m.file.mime)} material`}
                  >
                    <FaDownload />
                    Download ({fileExt(m.file.mime)})
                  </a>
                )}
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No materials available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Videos */}
      <section>
        <h2 className="text-2xl font-bold font-serif mb-6">Videos</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Here you can find the latest videos from our YouTube channel.
        </p>

        {loadingVideos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow p-4 bg-white">
                {/* 16:9 skeleton */}
                <div className="w-full rounded mb-3 overflow-hidden">
                  <Skeleton className="w-full" height={0} style={{ paddingTop: '56.25%' }} />
                </div>
                <Skeleton width={220} height={20} />
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-0.5 bg-white"
              >
                <div className="aspect-[16/9] w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 p-3 leading-tight">
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