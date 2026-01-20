// src/Project/Deliverables.jsx
// Espera posts en la categoría 36 ("Deliverables") con estos campos ACF:
// - deliverable_number   (texto, ej. "D1.1")
// - work_package         (texto o número, ej. "1")
// - leader               (texto, ej. "IDELE")
// - dissemination_level  (texto, ej. "PU")  ⚠️ en tu WP ahora mismo llega como "dissemination_level_"
// - milestone            (texto, ej. "M6")
// - pdf_file             (archivo; usamos pdf_file.url y pdf_file.title)

import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

const DELIVERABLES_CATEGORY_ID = 36;

function decodeHtml(str = '') {
  // Decodifica entidades HTML tipo &amp;
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function SkeletonRow() {
  return (
    <tr className="border-t border-darkGreen/20">
      <td className="px-6 py-5">
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-5 text-center">
        <div className="h-4 w-10 mx-auto bg-gray-200 rounded-full" />
      </td>
      <td className="px-4 py-5 text-center">
        <div className="h-4 w-14 mx-auto bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-5 text-center">
        <div className="h-4 w-10 mx-auto bg-gray-200 rounded-full" />
      </td>
      <td className="px-4 py-5 text-center">
        <div className="h-4 w-8 mx-auto bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-5 text-center">
        <div className="h-9 w-9 mx-auto bg-gray-200 rounded-full" />
      </td>
    </tr>
  );
}

export default function Deliverables() {
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://admin.sus-soil.eu/wp-json/wp/v2/posts?categories=${DELIVERABLES_CATEGORY_ID}&_embed&acf_format=standard&per_page=100&_=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Error fetching deliverables');

        let posts = await res.json();
        if (!Array.isArray(posts)) posts = [];

        const mapped = posts.map((post) => {
          const acf = post.acf || {};
          const file = acf.pdf_file || acf.file || {};

          return {
            id: post.id,
            number: acf.deliverable_number || '',
            // ✅ TITULO: SOLO el title del PDF (fallback al title del post si no existe)
            title: file.title || decodeHtml(post.title?.rendered || ''),
            workPackage: acf.work_package || '',
            leader: acf.leader || '',
            level: acf.dissemination_level || acf.dissemination_level_ || '',
            milestone: acf.milestone || '',
            pdfUrl: file.url || '',
          };
        });

        // Orden por número de deliverable si existe, si no por ID desc
        mapped.sort((a, b) => {
          if (a.number && b.number) {
            return a.number.localeCompare(b.number, undefined, { numeric: true });
          }
          return b.id - a.id;
        });

        setDeliverables(mapped);
      } catch (e) {
        console.error(e);
        setError(e?.message || 'Error loading deliverables');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliverables();
  }, []);

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
          Deliverables
        </h1>
        <p className="text-brown/80 text-base md:text-lg max-w-3xl mx-auto">
          Here you can find the public deliverables produced within the SUS-SOIL
          project. Click on a deliverable title to open or download the
          corresponding PDF report.
        </p>
      </header>

      {/* Table container */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg ring-1 ring-black/5 overflow-hidden">
          {/* Top hint bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-6 py-4 border-b border-darkGreen/20 bg-lightGreen/10">
            <h2 className="text-sm md:text-base font-semibold text-darkGreen tracking-wide">
              Project Deliverables Overview
            </h2>
            <p className="text-xs md:text-sm text-darkGreen/80">
              Tip: on small screens, scroll horizontally to see all columns.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs md:text-sm uppercase tracking-wide text-darkGreen">
                  <th className="px-6 py-4 align-middle bg-lightGreen/5 font-semibold">
                    Deliverable number &amp; name
                  </th>
                  <th className="px-4 py-4 align-middle bg-lightGreen/5 font-semibold text-center">
                    Work package
                  </th>
                  <th className="px-4 py-4 align-middle bg-lightGreen/5 font-semibold text-center">
                    Leader
                  </th>
                  <th className="px-4 py-4 align-middle bg-lightGreen/5 font-semibold text-center">
                    Dissemination level
                  </th>
                  <th className="px-4 py-4 align-middle bg-lightGreen/5 font-semibold text-center">
                    Date
                  </th>
                  <th className="px-4 py-4 align-middle bg-lightGreen/5 font-semibold text-center">
                    PDF
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                )}

                {!loading && error && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && deliverables.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No deliverables available yet.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  deliverables.map((d, idx) => (
                    <tr
                      key={d.id}
                      className={`text-sm md:text-base text-brown border-t border-darkGreen/25 ${
                        idx % 2 === 1 ? 'bg-lightGreen/5' : 'bg-white'
                      } hover:bg-lightGreen/15 transition-colors`}
                    >
                      {/* Title + number (link to PDF si existe) */}
                      <td className="px-6 py-5 align-middle">
                        {d.pdfUrl ? (
                          <a
                            href={d.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-start gap-3 text-left"
                          >
                            <span className="mt-[2px] flex-shrink-0 text-darkGreen">
                              <FaFilePdf aria-hidden="true" />
                            </span>
                            <span>
                              {/* ✅ MUESTRA SOLO EL TÍTULO (del PDF) */}
                              <span className="block font-semibold font-serif text-brown">
                                {d.title}
                              </span>
                              <span className="mt-0.5 block text-xs text-brown/60 group-hover:text-brown/80">
                                Click to view / download PDF
                              </span>
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-start gap-3 text-left">
                            <span className="mt-[2px] flex-shrink-0 text-gray-400">
                              <FaFilePdf aria-hidden="true" />
                            </span>
                            <span>
                              {/* ✅ MUESTRA SOLO EL TÍTULO (del PDF) */}
                              <span className="block font-semibold font-serif text-brown">
                                {d.title}
                              </span>
                              <span className="mt-0.5 block text-xs text-brown/60">
                                PDF not available yet
                              </span>
                            </span>
                          </span>
                        )}
                      </td>

                      {/* WP */}
                      <td className="px-4 py-5 align-middle text-center">
                        {d.workPackage && (
                          <span className="inline-flex items-center justify-center rounded-full border border-darkGreen/30 px-3 py-1 text-xs md:text-sm font-semibold text-darkGreen">
                            WP{d.workPackage}
                          </span>
                        )}
                      </td>

                      {/* Leader */}
                      <td className="px-4 py-5 align-middle text-center">
                        <span className="inline-flex items-center justify-center text-sm font-medium text-darkGreen">
                          {d.leader}
                        </span>
                      </td>

                      {/* Dissemination level */}
                      <td className="px-4 py-5 align-middle text-center">
                        {d.level ? (
                          <span className="inline-flex items-center justify-center rounded-full bg-lightGreen/20 px-3 py-1 text-xs md:text-sm font-semibold text-darkGreen">
                            {d.level}
                          </span>
                        ) : (
                          <span className="text-xs md:text-sm text-darkGreen/60">-</span>
                        )}
                      </td>

                      {/* Date / Milestone */}
                      <td className="px-4 py-5 align-middle text-center">
                        <span className="inline-flex items-center justify-center text-xs md:text-sm font-medium text-darkGreen">
                          {d.milestone || '-'}
                        </span>
                      </td>

                      {/* Download icon */}
                      <td className="px-4 py-5 align-middle text-center">
                        {d.pdfUrl && (
                          <a
                            href={d.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-darkGreen/30 text-darkGreen hover:bg-darkGreen hover:text-white transition-colors"
                            aria-label={`Download ${d.title}`}
                          >
                            <FaDownload aria-hidden="true" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}

                {!loading && !error && (
                  <tr className="border-t border-darkGreen/15 bg-white/60">
                    <td className="px-6 py-5 text-sm text-brown/60" colSpan={6}>
                      More deliverables will be added here as they become publicly
                      available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}