// src/Project/LivingLabDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { regions, livingLabs } from '../data/regions';

const toSlug = (s) => s?.toString().trim().toLowerCase().replace(/\s+/g, '-');

const ACTIVE_REGION_IDS = new Set([
  'Boreal',
  'Atlantic',
  'Continental',
  'Pannonian',
  'Mediterranean',
]);

export default function LivingLabDetail() {
  const { regionId, labId } = useParams();
  const [loadingHero, setLoadingHero] = useState(true);

  const region = useMemo(() => {
    if (!regionId) return null;
    const found =
      regions.find(
        (r) => r.id.toLowerCase() === regionId.toLowerCase() || toSlug(r.id) === regionId
      ) || null;
    if (!found) return null;
    return ACTIVE_REGION_IDS.has(found.id) ? found : null;
  }, [regionId]);

  const lab = useMemo(() => {
    if (!labId) return null;
    return (
      livingLabs.find((l) => l.id === labId || toSlug(l.id) === labId) || null
    );
  }, [labId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titleLab = lab?.title || 'Living Lab';
    const titleRegion = region?.id ? ` — ${region.id}` : '';
    document.title = `${titleLab}${titleRegion}`;
  }, [lab, region]);

  if (!lab || !region) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-3">Living Lab not found</h2>
        <Link
          to="/living-labs"
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-90"
        >
          Back to Living Labs
        </Link>
      </div>
    );
  }

  const colorStart = Array.isArray(region.color) ? region.color[0] : region.color || '#4b3a2f';
  const colorEnd   = Array.isArray(region.color) ? region.color[1] : '#ffffff';

  const quickRegions = useMemo(
    () => regions.filter((r) => ACTIVE_REGION_IDS.has(r.id)),
    []
  );

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="inline-flex items-center gap-2 text-sm text-brown/80">
          <li><Link to="/" className="underline hover:opacity-80">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/living-labs" className="underline hover:opacity-80">Living Labs</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to={`/living-labs/${toSlug(region.id)}`} className="underline hover:opacity-80">{region.id}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-brown font-semibold">{lab.title}</li>
        </ol>
      </nav>

      {/* Quick Menu */}
      <div className="bg-white/80 backdrop-blur rounded-lg shadow-sm p-4 md:p-5 mb-8">
        <h2 className="w-full text-center text-brown font-serif text-xl font-bold mb-4">Quick Menu</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/living-labs"
            className="px-4 py-2 rounded-full font-semibold shadow-sm transition hover:translate-y-[-1px]
                       bg-white border border-brown/20 text-brown hover:bg-darkGreen hover:text-white
                       focus:outline-none focus-visible:ring-2 ring-offset-2"
          >
            All Living Labs
          </Link>
          {quickRegions.map((reg) => {
            const isActive = reg.id.toLowerCase() === region.id.toLowerCase();
            const bg = isActive ? (Array.isArray(reg.color) ? reg.color[0] : reg.color) : '#f8f8f8';
            const to = `/living-labs/${toSlug(reg.id)}`;
            return (
              <Link
                key={reg.id}
                to={to}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full font-semibold shadow-sm transition hover:translate-y-[-1px]
                            focus:outline-none focus-visible:ring-2 ring-offset-2
                            ${isActive ? 'text-white' : 'text-brown hover:shadow-md'}`}
                style={{ backgroundColor: bg }}
              >
                {reg.id}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hero (imagen si existe, fallback gradiente) */}
      <section className="w-full max-w-4xl mx-auto mb-8">
        <div
          className="h-56 sm:h-64 w-full rounded-2xl overflow-hidden relative shadow-sm ring-1 ring-black/5"
          aria-label={`${lab.title} cover`}
          role="img"
        >
          {lab.image ? (
            <>
              {loadingHero && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
              <img
                src={lab.image}
                alt={lab.title}
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={() => setLoadingHero(false)}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  setLoadingHero(false);
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `linear-gradient(to bottom, ${colorStart} 55%, ${colorEnd} 100%)` }}
            />
          )}

          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 text-[11px] rounded-full bg-white/85 backdrop-blur border border-black/5"
              style={{ color: colorStart }}
            >
              {region.id}
            </span>
          </div>
        </div>
      </section>

      {/* Título + Descripción */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-brown font-serif">{lab.title}</h1>
      </header>

      {lab.description && (
        <section className="max-w-3xl mx-auto mb-10">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{lab.description}</p>
        </section>
      )}

      {/* Info región */}
      <section className="max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-bold font-serif text-brown mb-3">About the {region.id}</h2>
        {region.info && <p className="text-brown/90 font-serif mb-2">{region.info}</p>}
        {region.description && <p className="text-gray-700 leading-relaxed whitespace-pre-line">{region.description}</p>}
      </section>

      {/* Galería opcional */}
      {Array.isArray(lab.gallery) && lab.gallery.length > 0 && (
        <section className="max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-semibold font-serif text-brown mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lab.gallery.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`${lab.title} — image ${i + 1}`}
                className="rounded-lg shadow-sm"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      )}

      {/* Navegación inferior */}
      <div className="text-center mt-12 flex items-center justify-center gap-3">
        <Link
          to={`/living-labs/${toSlug(region.id)}`}
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-90 font-serif
                     focus:outline-none focus-visible:ring-2 ring-offset-2"
        >
          Back to {region.id}
        </Link>
        <Link
          to="/living-labs"
          className="inline-block bg-white border border-brown/20 text-brown py-2 px-6 rounded-lg hover:bg-darkGreen hover:text-white
                     focus:outline-none focus-visible:ring-2 ring-offset-2"
        >
          All Living Labs
        </Link>
      </div>
    </div>
  );
}