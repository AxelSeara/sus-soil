import React, { useEffect, useMemo, useRef, useState } from 'react';

const TILE_SIZE = 256;
const MIN_ZOOM = 3;
const MAX_ZOOM = 10;
const INITIAL_VIEW = { lat: 48, lng: 15, zoom: 4 };
const CLUSTER_ZOOM_THRESHOLD = 7;
const CLUSTER_CELL_PX = 48;
const TOTAL_POINTS = 1105;

const tileProviders = {
  osm: {
    id: 'osm',
    label: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  satellite: {
    id: 'satellite',
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function latLngToWorld(lat, lng, z) {
  const scale = TILE_SIZE * 2 ** z;
  const x = ((lng + 180) / 360) * scale;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
  return { x, y };
}

function worldToLatLng(x, y, z) {
  const scale = TILE_SIZE * 2 ** z;
  const lng = (x / scale) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / scale;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
}

function getTileUrl(template, x, y, z) {
  return template.replace('{x}', String(x)).replace('{y}', String(y)).replace('{z}', String(z));
}

function normalizeLng(lng) {
  return ((lng + 540) % 360) - 180;
}

function getClusterStyle(count) {
  if (count >= 50) {
    return {
      size: 44,
      bg: '#17683d',
      ring: '#e7f5e9',
      text: '#ffffff',
      label: 'High density',
    };
  }
  if (count >= 20) {
    return {
      size: 38,
      bg: '#259a56',
      ring: '#ebf7ee',
      text: '#ffffff',
      label: 'Medium density',
    };
  }
  return {
    size: 32,
    bg: '#47b96d',
    ring: '#f2faf4',
    text: '#ffffff',
    label: 'Low density',
  };
}

function getSafeExternalHref(href) {
  if (typeof href !== 'string') return null;
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    const parsed = new URL(href);
    return parsed.href;
  } catch {
    return null;
  }
}

export default function SamplingPointsMap() {
  const rootRef = useRef(null);
  const dragRef = useRef(null);
  const wheelRef = useRef({ accumulator: 0, lastTs: 0 });

  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [layerId, setLayerId] = useState('osm');
  const [popupPointId, setPopupPointId] = useState('');
  const [showMapTips, setShowMapTips] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW);
  const [size, setSize] = useState({ width: 900, height: 500 });

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const url = `${import.meta.env.BASE_URL}maps/sampling-points-data.json`;

    (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal, cache: 'force-cache' });
        if (!response.ok) throw new Error('Failed to load sampling points data');
        const data = await response.json();
        if (!alive) return;
        setPoints(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError('Unable to load sampling points.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowMapTips(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsInteractive(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return undefined;
    const node = rootRef.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry?.contentRect?.width || node.clientWidth || 900;
      const height = entry?.contentRect?.height || node.clientHeight || 500;
      setSize({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      if (drag.pointerId != null && event.pointerId !== drag.pointerId) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      const nextWorld = { x: drag.startCenterWorld.x - dx, y: drag.startCenterWorld.y - dy };
      const next = worldToLatLng(nextWorld.x, nextWorld.y, drag.zoom);
      setView((prev) => ({
        ...prev,
        lat: clamp(next.lat, -85, 85),
        lng: normalizeLng(next.lng),
      }));
    };

    const onPointerUp = (event) => {
      const drag = dragRef.current;
      if (drag?.pointerId != null && event.pointerId !== drag.pointerId) return;
      dragRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  const centerWorld = useMemo(
    () => latLngToWorld(view.lat, view.lng, view.zoom),
    [view.lat, view.lng, view.zoom]
  );

  const topLeft = useMemo(
    () => ({ x: centerWorld.x - size.width / 2, y: centerWorld.y - size.height / 2 }),
    [centerWorld.x, centerWorld.y, size.width, size.height]
  );

  const tiles = useMemo(() => {
    const z = view.zoom;
    const maxTile = 2 ** z;
    const xStart = Math.floor(topLeft.x / TILE_SIZE);
    const yStart = Math.floor(topLeft.y / TILE_SIZE);
    const xEnd = Math.floor((topLeft.x + size.width) / TILE_SIZE);
    const yEnd = Math.floor((topLeft.y + size.height) / TILE_SIZE);
    const layer = tileProviders[layerId];
    const items = [];

    for (let x = xStart; x <= xEnd; x += 1) {
      for (let y = yStart; y <= yEnd; y += 1) {
        const tx = ((x % maxTile) + maxTile) % maxTile;
        const ty = clamp(y, 0, maxTile - 1);
        items.push({
          key: `${z}-${tx}-${ty}-${layer.id}`,
          src: getTileUrl(layer.url, tx, ty, z),
          left: x * TILE_SIZE - topLeft.x,
          top: y * TILE_SIZE - topLeft.y,
        });
      }
    }

    return items;
  }, [layerId, size.height, size.width, topLeft.x, topLeft.y, view.zoom]);

  const visiblePoints = useMemo(() => {
    const margin = 24;
    return points
      .map((point) => {
        const world = latLngToWorld(point.lat, point.lng, view.zoom);
        const left = world.x - topLeft.x;
        const top = world.y - topLeft.y;
        return { ...point, left, top };
      })
      .filter(
        (point) =>
          point.left >= -margin &&
          point.top >= -margin &&
          point.left <= size.width + margin &&
          point.top <= size.height + margin
      );
  }, [points, size.height, size.width, topLeft.x, topLeft.y, view.zoom]);

  const clusteredPoints = useMemo(() => {
    if (view.zoom > CLUSTER_ZOOM_THRESHOLD) {
      return [];
    }

    const buckets = new Map();
    points.forEach((point) => {
      const world = latLngToWorld(point.lat, point.lng, view.zoom);
      const cx = Math.floor(world.x / CLUSTER_CELL_PX);
      const cy = Math.floor(world.y / CLUSTER_CELL_PX);
      const key = `${cx}:${cy}`;
      const prev = buckets.get(key);
      if (!prev) {
        buckets.set(key, {
          key,
          count: 1,
          worldXSum: world.x,
          worldYSum: world.y,
          latSum: point.lat,
          lngSum: point.lng,
        });
        return;
      }
      prev.count += 1;
      prev.worldXSum += world.x;
      prev.worldYSum += world.y;
      prev.latSum += point.lat;
      prev.lngSum += point.lng;
    });

    const margin = 26;
    return Array.from(buckets.values())
      .map((bucket) => {
        const worldX = bucket.worldXSum / bucket.count;
        const worldY = bucket.worldYSum / bucket.count;
        return {
          key: bucket.key,
          count: bucket.count,
          left: worldX - topLeft.x,
          top: worldY - topLeft.y,
          lat: bucket.latSum / bucket.count,
          lng: bucket.lngSum / bucket.count,
        };
      })
      .filter(
        (cluster) =>
          cluster.left >= -margin &&
          cluster.top >= -margin &&
          cluster.left <= size.width + margin &&
          cluster.top <= size.height + margin
      );
  }, [points, size.height, size.width, topLeft.x, topLeft.y, view.zoom]);

  const popupPoint = popupPointId
    ? visiblePoints.find((point) => point.id === popupPointId) || points.find((p) => p.id === popupPointId)
    : null;

  const popupPosition = useMemo(() => {
    if (!popupPoint) return null;
    const world = latLngToWorld(popupPoint.lat, popupPoint.lng, view.zoom);
    const popupWidth = Math.min(360, Math.max(280, size.width * 0.82));
    const maxLeft = Math.max(8, size.width - popupWidth - 8);
    const maxTop = Math.max(8, size.height - 250);
    return {
      left: clamp(world.x - topLeft.x + 12, 8, maxLeft),
      top: clamp(world.y - topLeft.y - 18, 8, maxTop),
    };
  }, [popupPoint, size.height, size.width, topLeft.x, topLeft.y, view.zoom]);

  const zoomBy = (delta, anchorClient) => {
    const nextZoom = clamp(view.zoom + delta, MIN_ZOOM, MAX_ZOOM);
    if (nextZoom === view.zoom) return;

    const node = rootRef.current;
    if (!node || !anchorClient) {
      setView((prev) => ({ ...prev, zoom: nextZoom }));
      return;
    }

    const rect = node.getBoundingClientRect();
    const px = clamp(anchorClient.x - rect.left, 0, rect.width || 1);
    const py = clamp(anchorClient.y - rect.top, 0, rect.height || 1);

    const prevCenterWorld = latLngToWorld(view.lat, view.lng, view.zoom);
    const prevTopLeft = {
      x: prevCenterWorld.x - rect.width / 2,
      y: prevCenterWorld.y - rect.height / 2,
    };
    const anchorWorldPrev = { x: prevTopLeft.x + px, y: prevTopLeft.y + py };
    const zoomScale = 2 ** (nextZoom - view.zoom);
    const anchorWorldNext = { x: anchorWorldPrev.x * zoomScale, y: anchorWorldPrev.y * zoomScale };
    const nextTopLeft = { x: anchorWorldNext.x - px, y: anchorWorldNext.y - py };
    const nextCenterWorld = { x: nextTopLeft.x + rect.width / 2, y: nextTopLeft.y + rect.height / 2 };
    const nextCenter = worldToLatLng(nextCenterWorld.x, nextCenterWorld.y, nextZoom);

    setView({
      zoom: nextZoom,
      lat: clamp(nextCenter.lat, -85, 85),
      lng: normalizeLng(nextCenter.lng),
    });
  };

  const onMapPointerDown = (event) => {
    if (!isInteractive) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startCenterWorld: latLngToWorld(view.lat, view.lng, view.zoom),
      zoom: view.zoom,
      pointerId: event.pointerId,
    };
  };

  const onMapWheel = (event) => {
    if (!isInteractive) return;

    // In interactive mode, wheel/trackpad controls map zoom instead of page scroll.
    event.preventDefault();

    const now = event.timeStamp;
    const threshold = 90;
    const maxStepsPerTick = 2;

    if (now - wheelRef.current.lastTs > 220) {
      wheelRef.current.accumulator = 0;
    }

    wheelRef.current.lastTs = now;
    wheelRef.current.accumulator += event.deltaY;

    const absAcc = Math.abs(wheelRef.current.accumulator);
    if (absAcc < threshold) return;

    const rawSteps = Math.floor(absAcc / threshold);
    const steps = Math.min(rawSteps, maxStepsPerTick);
    const direction = wheelRef.current.accumulator < 0 ? 1 : -1;

    for (let i = 0; i < steps; i += 1) {
      zoomBy(direction, { x: event.clientX, y: event.clientY });
    }

    wheelRef.current.accumulator -= Math.sign(wheelRef.current.accumulator) * steps * threshold;
  };

  const resetView = () => {
    setView(INITIAL_VIEW);
    setPopupPointId('');
  };

  const showClusters = view.zoom <= CLUSTER_ZOOM_THRESHOLD;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl border border-lightGreen/30 bg-[#ecf5e8]"
      role="region"
      aria-label="Sampling points interactive map"
    >
      <div
        ref={rootRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ touchAction: isInteractive ? 'none' : 'pan-y' }}
        onPointerDown={onMapPointerDown}
        onWheel={onMapWheel}
        onClick={() => {
          if (!isInteractive) {
            setIsInteractive(true);
            return;
          }
          setPopupPointId('');
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          {tiles.map((tile) => (
            <img
              key={tile.key}
              src={tile.src}
              alt=""
              draggable={false}
              className="absolute select-none"
              style={{ width: TILE_SIZE, height: TILE_SIZE, left: tile.left, top: tile.top }}
            />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-white/10" />

        {showClusters
          ? clusteredPoints.map((cluster) => {
              const style = getClusterStyle(cluster.count);
              const sizePx = style.size;
              return (
                <button
                  key={cluster.key}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setPopupPointId('');
                    setView((prev) => ({
                      zoom: clamp(prev.zoom + 1, MIN_ZOOM, MAX_ZOOM),
                      lat: clamp(cluster.lat, -85, 85),
                      lng: normalizeLng(cluster.lng),
                    }));
                  }}
                  className="absolute grid place-items-center rounded-full border-[2.5px] font-bold shadow-[0_8px_20px_rgba(25,53,27,0.34)] hover:brightness-105 transition-transform duration-150 ease-out hover:scale-105"
                  style={{
                    width: sizePx,
                    height: sizePx,
                    left: 0,
                    top: 0,
                    fontSize: cluster.count >= 100 ? 10 : 11,
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                    appearance: 'none',
                    padding: 0,
                    borderColor: style.ring,
                    background: style.bg,
                    color: style.text,
                    transform: `translate3d(${cluster.left - sizePx / 2}px, ${cluster.top - sizePx / 2}px, 0)`,
                    transition: 'none',
                  }}
                  title={`${cluster.count} sampling points (${style.label})`}
                  aria-label={`${cluster.count} sampling points (${style.label})`}
                >
                  {cluster.count}
                </button>
              );
            })
          : visiblePoints.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopupPointId(point.id);
                }}
                className="absolute transition-transform duration-150 ease-out hover:scale-105"
                style={{
                  width: 24,
                  height: 30,
                  left: 0,
                  top: 0,
                  appearance: 'none',
                  padding: 0,
                  background: 'transparent',
                  border: 0,
                  transform: `translate3d(${point.left - 12}px, ${point.top - 30}px, 0)`,
                  transition: 'none',
                }}
                title={`Sampling point ${point.id}`}
                aria-label={`Sampling point ${point.id}`}
              >
                <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_3px_6px_rgba(25,53,27,0.35)]" aria-hidden="true">
                  <path d="M12 2c-4.4 0-8 3.6-8 8 0 5.8 8 12 8 12s8-6.2 8-12c0-4.4-3.6-8-8-8Z" fill="#2f8f4d" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3.2" fill="#e9f7ef" />
                </svg>
              </button>
            ))}

        {popupPoint && popupPosition && (
          <div
            className="absolute z-20 w-[min(360px,82vw)] rounded-xl border border-[#d4dfcf] bg-white shadow-[0_12px_28px_rgba(21,32,16,0.24)]"
            style={{ left: popupPosition.left, top: popupPosition.top }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#d4dfcf] bg-[#f2f8ee] text-[17px] leading-none text-brown hover:bg-[#e8f2e4]"
              onClick={() => setPopupPointId('')}
              aria-label="Close popup"
            >
              ×
            </button>
            <div className="p-3 pr-11">
              <div className="mb-2 rounded-lg border border-[#e3eadf] bg-[#f8fbf6] px-2.5 py-2">
                <h3 className="text-[15px] font-extrabold text-brown">ID: {popupPoint.id}</h3>
                <p className="text-[13px] text-[#3e5342]">Land Cover: {popupPoint.landCover}</p>
              </div>

              {popupPoint.composition && Object.keys(popupPoint.composition).length > 0 && (
                <details className="mb-2 rounded bg-[#f4f4f4] p-2 text-[12px]">
                  <summary className="cursor-pointer font-semibold">Composition</summary>
                  <ul className="mt-1 columns-2 pl-4 text-[11px]">
                    {Object.entries(popupPoint.composition).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="flex flex-wrap gap-1.5">
                <span className="w-full text-[11px] font-semibold text-[#4c6250]">Photos</span>
                {(popupPoint.links || []).map((link) => {
                  const safeHref = getSafeExternalHref(link?.href);
                  if (!safeHref) return null;
                  return (
                    <a
                      key={`${popupPoint.id}-${safeHref}`}
                      href={safeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#cfe1c4] bg-[#edf5e8] px-2 py-1 text-[11px] text-[#2f4b34] hover:bg-[#e4f0dc]"
                    >
                      {link?.label || 'Open'}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-white/70 text-brown" role="status" aria-live="polite">
            Preparing {TOTAL_POINTS.toLocaleString('en-US')} sampling points...
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-white/80 text-brown" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className={`absolute left-2 top-2 z-30 grid gap-1.5 transition-opacity ${isInteractive ? 'opacity-100' : 'opacity-60'}`}>
        <button
          type="button"
          className="h-[36px] w-[36px] rounded-lg border border-[#cddbc5] bg-white/95 text-[#2f4b34] text-[20px] leading-none shadow"
          onClick={() => zoomBy(1)}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          className="h-[36px] w-[36px] rounded-lg border border-[#cddbc5] bg-white/95 text-[#2f4b34] text-[20px] leading-none shadow"
          onClick={() => zoomBy(-1)}
          aria-label="Zoom out"
        >
          -
        </button>
        <button
          type="button"
          className="h-[36px] w-[36px] rounded-lg border border-[#cddbc5] bg-white/95 text-[#2f4b34] shadow inline-flex items-center justify-center"
          onClick={resetView}
          aria-label="Reset map view"
          title="Reset view"
        >
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
            <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 3.2v4M12 16.8v4M3.2 12h4M16.8 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 9.2v5.6M9.2 12h5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={`absolute right-2 top-2 z-30 rounded-lg border border-[#d4dfcf] bg-white/95 p-1.5 shadow transition-opacity ${isInteractive ? 'opacity-100' : 'opacity-60'}`}>
        <select
          value={layerId}
          onChange={(event) => setLayerId(event.target.value)}
          className="rounded border border-[#cddbc5] px-2 py-1 text-[12px] text-[#2f4b34]"
          aria-label="Map layer"
        >
          {Object.values(tileProviders).map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.label}
            </option>
          ))}
        </select>
      </div>

      {!isInteractive && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsInteractive(true);
          }}
          className="absolute inset-0 z-40 grid place-items-center bg-black/15"
          aria-label="Enable map interaction"
        >
          <div className="rounded-xl border border-[#dbe8d6] bg-white/95 px-4 py-3 text-center shadow-[0_8px_24px_rgba(19,39,22,0.22)]">
            <p className="text-sm font-semibold text-[#2f4b34]">Click to enable map interaction</p>
            <p className="mt-1 text-[11px] text-[#48614d]">Press Esc to return to page scrolling</p>
          </div>
        </button>
      )}

      {isInteractive && (
        <div className="absolute left-1/2 top-2 z-40 -translate-x-1/2 rounded-lg border border-[#dbe8d6] bg-white/95 px-3 py-1.5 text-[11px] text-[#35533c] shadow" role="status" aria-live="polite">
          Map interaction enabled · Press Esc to return
        </div>
      )}

      {showMapTips && (
        <div className="absolute left-1/2 bottom-2 z-30 w-[min(92vw,720px)] -translate-x-1/2 rounded-lg border border-[#dbe8d6] bg-white/95 px-3 py-2 shadow">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#35533c]">
            <span>Click and drag to pan</span>
            <span>Use + / - controls to zoom</span>
            <span>Select a marker to view metadata</span>
            <button
              type="button"
              className="ml-1 rounded border border-[#dbe8d6] px-1.5 py-0.5 text-[10px] text-[#35533c] hover:bg-[#eff7ec]"
              onClick={() => setShowMapTips(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-2 z-30 rounded-lg border border-[#d9e6d4] bg-white/95 px-2.5 py-2 shadow">
        <p className="text-[11px] font-semibold text-[#2f4b34] mb-1">Density</p>
        <div className="space-y-1 text-[10px] text-[#3e5342]">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#47b96d]" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#259a56]" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#17683d]" />
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
