import React, { useEffect, useState } from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getWpImageProps } from '../../lib/imageSeo';

const CATEGORY_ID = 37;
const WP_API = 'https://admin.sus-soil.eu/wp-json/wp/v2';

const fileExt = (mime = '') => {
  const ext = mime.split('/').pop();
  return ext ? ext.toUpperCase() : 'FILE';
};

const getAcfFile = (acf = {}) => {
  if (acf.file && typeof acf.file === 'object' && acf.file.url) {
    return {
      url: acf.file.url,
      mime: acf.file.mime_type || '',
    };
  }
  if (acf.pdf_file && typeof acf.pdf_file === 'object' && acf.pdf_file.url) {
    return {
      url: acf.pdf_file.url,
      mime: acf.pdf_file.mime_type || 'application/pdf',
    };
  }
  return { url: '', mime: '' };
};

export default function PracticeAbstracts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPracticeAbstracts = async () => {
      try {
        const postsRes = await fetch(
          `${WP_API}/posts?categories=${CATEGORY_ID}&_embed&acf_format=standard&per_page=100`
        );
        const postsJson = await postsRes.json();
        const posts = Array.isArray(postsJson) ? postsJson : [];

        const enriched = await Promise.all(
          posts.map(async (post) => {
            const acfFile = getAcfFile(post.acf);
            let file = { ...acfFile };

            if (!file.url) {
              const mediaRes = await fetch(
                `${WP_API}/media?parent=${post.id}&per_page=100`
              );
              const mediaJson = await mediaRes.json();
              const attachments = Array.isArray(mediaJson) ? mediaJson : [];
              const pdf = attachments.find((m) => m?.mime_type === 'application/pdf');
              if (pdf?.source_url) {
                file = {
                  url: pdf.source_url,
                  mime: pdf.mime_type || 'application/pdf',
                };
              }
            }

            return {
              id: post.id,
              title: post.title?.rendered || 'Practice Abstract',
              date: new Date(post.date).toLocaleDateString(),
              file,
              featuredMedia: post._embedded?.['wp:featuredmedia']?.[0] || null,
            };
          })
        );

        if (mounted) setItems(enriched);
      } catch (error) {
        console.error('Error fetching practice abstracts:', error);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPracticeAbstracts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Practice Abstracts</h1>
      <p className="text-lg md:text-xl text-gray-700 font-medium mb-10 max-w-3xl">
        Discover concise practice abstracts developed in SUS-SOIL, including visuals and downloadable files.
      </p>

      <section>
        <h2 className="text-2xl font-bold font-serif mb-2">Available Practice Abstracts</h2>
        <p className="text-sm text-gray-600 mb-6">
          Browse by title and download each abstract directly in PDF format.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border rounded-xl bg-white shadow-sm">
                <div className="w-full rounded-lg mb-4 overflow-hidden">
                  <Skeleton className="w-full" height={0} style={{ paddingTop: '100%' }} />
                </div>
                <Skeleton width="72%" height={20} className="mb-2" />
                <Skeleton width="38%" height={14} className="mb-4" />
                <Skeleton width="100%" height={10} className="mb-1" />
                <Skeleton width="84%" height={10} className="mb-4" />
                <Skeleton width={180} height={40} />
              </div>
            ))
          ) : items.length > 0 ? (
            items.map((item) => {
              const imageProps = getWpImageProps(item.featuredMedia, {
                altFallback: item.title,
                sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
              });
              const extension = fileExt(item.file?.mime);

              return (
                <article
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <div className="aspect-square w-full">
                      {imageProps?.src ? (
                        <img
                          {...imageProps}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-red-700">
                          <FaFilePdf className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    {item.file?.mime && (
                      <span className="absolute top-2 left-2 text-[11px] px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-black/5">
                        {extension}
                      </span>
                    )}
                  </div>

                  <header className="mb-2">
                    <h3 className="text-lg font-semibold leading-snug min-h-[3.5rem]">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Uploaded: {item.date}</p>
                  </header>

                  {item.file?.url ? (
                    <a
                      href={item.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-brown text-white px-4 py-2 rounded-lg hover:bg-darkGreen transition-colors focus:outline-none focus-visible:ring-2 ring-offset-2 mt-auto"
                      download
                      aria-label={`Download ${item.title}`}
                    >
                      <FaDownload />
                      Download ({extension})
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm mt-auto">
                      File coming soon
                    </span>
                  )}
                </article>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 py-6">
              No practice abstracts available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
