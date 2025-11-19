// src/Project/RegionDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { regions } from '../data/regions';

const toSlug = (s) => s?.toLowerCase().replace(/\s+/g, '-');

// ✅ whitelist de regiones activas
const ACTIVE_REGION_IDS = new Set([
  'Boreal',
  'Atlantic',
  'Continental',
  'Pannonian',
  'Mediterranean',
  'Alpine',
]);

export default function RegionDetail() {
  const { regionId } = useParams();
  const [loadingHero, setLoadingHero] = useState(false);

  // Encontrar región (case-insensitive) y validar que esté activa
  const region = useMemo(() => {
    if (!regionId) return null;
    const found =
      regions.find((r) => r.id.toLowerCase() === regionId.toLowerCase()) || null;
    if (!found) return null;
    return ACTIVE_REGION_IDS.has(found.id) ? found : null;
  }, [regionId]);

  // UX: scroll arriba, actualizar título y estado de carga del hero
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = region ? `${region.id} — Living Labs` : `Region not found — Living Labs`;
    // 👉 solo mostramos "loading" si hay imagen
    setLoadingHero(!!region?.image);
  }, [region]);

  if (!region) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="inline-flex items-center gap-2 text-sm text-brown/70">
            <li><Link to="/living-labs" className="underline">Living Labs</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-brown font-semibold">Not found</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold text-red-500 mb-3">Region not found</h2>
        <p className="text-brown/80 mb-6">Please choose a valid region from the list.</p>
        <Link
          to="/living-labs"
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 ring-offset-2"
        >
          Back to Living Labs
        </Link>
      </div>
    );
  }

  // 🎯 Solo regiones activas en el Quick Menu
  const quickRegions = useMemo(
    () => regions.filter((r) => ACTIVE_REGION_IDS.has(r.id)),
    []
  );

  const colorStart = Array.isArray(region.color) ? region.color[0] : region.color || '#4b3a2f';
  const colorEnd   = Array.isArray(region.color) ? region.color[1] : '#ffffff';
  const hasHeroImage = !!region.image;

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="inline-flex items-center gap-2 text-sm text-brown/80">
          <li><Link to="/" className="underline hover:opacity-80">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/living-labs" className="underline hover:opacity-80">Living Labs</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-brown font-semibold">{region.id}</li>
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

      {/* Title + Info */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brown font-serif mb-3">{region.id}</h1>
        <p className="text-brown/90 font-serif text-lg">{region.info}</p>
      </header>

      {/* Hero: usa imagen si existe, si no gradiente */}
      <section className="w-full max-w-4xl mx-auto mb-8">
        <div
          className="h-64 w-full rounded-2xl overflow-hidden relative shadow-sm ring-1 ring-black/5"
          aria-label={`${region.id} cover`}
          role="img"
        >
          {hasHeroImage ? (
            <>
              <img
                src={region.image}
                alt={`${region.id} region`}
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={() => setLoadingHero(false)}
              />
              {/* Overlay suave para que el texto/label se lea bien */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/5" />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${colorStart} 55%, ${colorEnd} 100%)`,
              }}
            />
          )}

          {loadingHero && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
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

      {/* Description */}
      {region.description && (
        <section className="max-w-3xl mx-auto mb-10">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {region.description}
          </p>
        </section>
      )}

      {/* Living Labs Buttons */}
      {Array.isArray(region.livingLabs) && region.livingLabs.length > 0 && (
        <section className="max-w-3xl mx-auto mb-8">
          <h3 className="text-xl font-bold font-serif text-brown mb-4">Living Labs in this region</h3>
          <div className="flex flex-wrap gap-3">
            {region.livingLabs.map((lab, idx) => {
              const slug = toSlug(lab);
              const to = `/living-labs/${toSlug(region.id)}/${slug}`;
              return (
                <Link
                  key={`${lab}-${idx}`}
                  to={to}
                  className="px-4 py-2 rounded-full bg-gray-100 text-brown font-medium hover:bg-gray-100/80
                             focus:outline-none focus-visible:ring-2 ring-offset-2"
                >
                  {lab}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="text-center mt-12">
        <Link
          to="/living-labs"
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-90 font-serif
                     focus:outline-none focus-visible:ring-2 ring-offset-2"
        >
          Back to Living Labs
        </Link>
      </div>
    </div>
  );
}