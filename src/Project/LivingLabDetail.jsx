// src/Project/LivingLabDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LLRelatedNews from "../components/LLRelatedNews";
import { HeroSectionSkeleton } from '../components/Skeletons';

const toSlug = (s) => s?.toString().trim().toLowerCase().replace(/\s+/g, '-');

const ACTIVE_REGION_IDS = new Set([
  'Boreal',
  'Atlantic',
  'Continental',
  'Pannonian',
  'Mediterranean',
  'Alpine',
]);

export default function LivingLabDetail() {
  const { regionId, labId } = useParams();
  const [loadingHero, setLoadingHero] = useState(true);
  const [regionsData, setRegionsData] = useState([]);
  const [livingLabsData, setLivingLabsData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Lazy-load static regions/livingLabs data
  useEffect(() => {
    let cancelled = false;
    setLoadingData(true);
    Promise.all([import('../data/regions'), import('../data/livingLabs')])
      .then(([regionsMod, labsMod]) => {
        if (cancelled) return;
        setRegionsData(regionsMod.regions || []);
        setLivingLabsData(labsMod.livingLabs || []);
      })
      .finally(() => {
        if (!cancelled) setLoadingData(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const region = useMemo(() => {
    if (!regionId || !regionsData.length) return null;
    const found =
      regionsData.find(
        (r) =>
          r.id.toLowerCase() === regionId.toLowerCase() ||
          toSlug(r.id) === regionId
      ) || null;
    if (!found) return null;
    return ACTIVE_REGION_IDS.has(found.id) ? found : null;
  }, [regionId, regionsData]);

  const lab = useMemo(() => {
    if (!labId || !livingLabsData.length) return null;
    return (
      livingLabsData.find((l) => l.id === labId || toSlug(l.id) === labId) || null
    );
  }, [labId, livingLabsData]);

  const labBelongsToRegion = useMemo(() => {
    if (!lab || !region) return false;
    const ids = Array.isArray(lab.regionIds)
      ? lab.regionIds
      : (lab.regionId ? [lab.regionId] : []);
    return ids.includes(region.id);
  }, [lab, region]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titleLab = lab?.title || 'Living Lab';
    const titleRegion = region?.id ? ` — ${region.id}` : '';
    document.title = `${titleLab}${titleRegion}`;
  }, [lab, region]);

  useEffect(() => {
    setLoadingHero(true);
  }, [lab?.id]);

  const quickRegions = useMemo(
    () => regionsData.filter((r) => ACTIVE_REGION_IDS.has(r.id)),
    [regionsData]
  );

  if (loadingData) {
    return <HeroSectionSkeleton />;
  }

  if (!lab || !region || !labBelongsToRegion) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="inline-flex items-center gap-2 text-sm text-brown/70">
            <li><Link to="/living-labs" className="underline">Living Labs</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-brown font-semibold">Not found</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold text-red-500 mb-3">Living Lab not found</h2>
        <p className="text-brown/80 mb-6">The requested Living Lab does not belong to this region or does not exist.</p>
        <Link
          to="/living-labs"
          className="inline-block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 ring-offset-2"
        >
          Back to Living Labs
        </Link>
      </div>
    );
  }

  const colorStart = Array.isArray(region.color)
    ? region.color[0]
    : region.color || '#4b3a2f';
  const colorEnd = Array.isArray(region.color) ? region.color[1] : '#ffffff';

  // 🔗 Tag slug para buscar noticias relacionadas en WP
  // Asumimos que el slug del tag en WP coincide con lab.id (ej: "ll-galicia")
  const llTagSlug = lab.id?.toLowerCase();

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="inline-flex items-center gap-2 text-sm text-brown/80">
          <li>
            <Link to="/" className="underline hover:opacity-80">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/living-labs" className="underline hover:opacity-80">
              Living Labs
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={`/living-labs/${toSlug(region.id)}`}
              className="underline hover:opacity-80"
            >
              {region.id}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-brown font-semibold">{lab.title}</li>
        </ol>
      </nav>

      {/* Quick Menu */}
      <div className="bg-white/80 backdrop-blur rounded-lg shadow-sm p-4 md:p-5 mb-8">
        <h2 className="w-full text-center text-brown font-serif text-xl font-bold mb-4">
          Quick Menu
        </h2>
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
            const isActive =
              reg.id.toLowerCase() === region.id.toLowerCase();
            const bg = isActive
              ? Array.isArray(reg.color)
                ? reg.color[0]
                : reg.color
              : '#f8f8f8';
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
              {loadingHero && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={lab.image}
                alt={lab.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
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
              style={{
                backgroundImage: `linear-gradient(to bottom, ${colorStart} 55%, ${colorEnd} 100%)`,
              }}
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
        <h1 className="text-3xl md:text-4xl font-bold text-brown font-serif">
          {lab.title}
        </h1>
      </header>

      {lab.description && (
        <section className="max-w-3xl mx-auto mb-10">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {lab.description}
          </p>
        </section>
      )}

      {/* Galería opcional */}
      {Array.isArray(lab.gallery) && lab.gallery.length > 0 && (
        <section className="max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-semibold font-serif text-brown mb-4">
            Gallery
          </h3>
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

      {/* 🔽 Sección de noticias / eventos relacionados (si hay) */}
      <LLRelatedNews llTagSlug={llTagSlug} />

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
