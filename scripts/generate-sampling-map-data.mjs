import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_HTML =
  process.env.SAMPLING_MAP_SOURCE ||
  '/Users/axelsearagomez/Downloads/SusSoil_Mobile_Optimized.html';

const OUTPUT_JSON = path.join(ROOT, 'public/maps/sampling-points-data.json');
const OUTPUT_HTML = path.join(ROOT, 'public/maps/sampling-points-map.html');

function readFileSafe(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Source map not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function decodePopupData(base64) {
  const html = Buffer.from(base64, 'base64').toString('utf8');
  const id = html.match(/ID:\s*([^<]+)/i)?.[1]?.trim() || '';
  const landCover =
    html.match(/Land\s*Cover:\s*<\/b>\s*([^<]+)/i)?.[1]?.trim() || '';

  const composition = {};
  const liRe = /<li>\s*<b>([^<:]+):<\/b>\s*([^<]*)<\/li>/gi;
  let li;
  while ((li = liRe.exec(html)) !== null) {
    const key = li[1].trim();
    const value = li[2].trim();
    if (key) composition[key] = value;
  }

  const links = [];
  const linkRe = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let lm;
  while ((lm = linkRe.exec(html)) !== null) {
    const href = lm[1].trim();
    const label = lm[2]
      .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    links.push({ label, href });
  }

  return { id, landCover, composition, links };
}

function extractPoints(sourceHtml) {
  const markerRe =
    /var marker_[a-f0-9]+ = L\.marker\(\s*\[\s*([0-9.-]+)\s*,\s*([0-9.-]+)\s*\]/g;
  const iframeRe =
    /var i_frame_[a-f0-9]+ = \$\(`<iframe src="data:text\/html;charset=utf-8;base64,([^"]+)"/g;

  const markers = [...sourceHtml.matchAll(markerRe)].map((m) => ({
    lat: Number(m[1]),
    lng: Number(m[2]),
  }));

  const popups = [...sourceHtml.matchAll(iframeRe)].map((m) =>
    decodePopupData(m[1])
  );

  if (markers.length !== popups.length) {
    throw new Error(
      `Marker/popup mismatch: ${markers.length} markers vs ${popups.length} popups`
    );
  }

  return markers.map((coords, idx) => ({
    ...coords,
    ...popups[idx],
  }));
}

function extractViewConfig(sourceHtml) {
  const center = sourceHtml.match(/center:\s*\[\s*([0-9.-]+)\s*,\s*([0-9.-]+)\s*\]/);
  const zoom = sourceHtml.match(/"zoom":\s*([0-9]+)/);
  return {
    center: center ? [Number(center[1]), Number(center[2])] : [48, 15],
    zoom: zoom ? Number(zoom[1]) : 4,
  };
}

function writeMapHtml({ center, zoom }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>SUS-SOIL Sampling Points</title>
  <script>
    L_NO_TOUCH = false;
    L_DISABLE_3D = false;
  </script>
  <script src="./leaflet-shim.js"></script>
  <style>
    html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
    #map { width: 100%; height: 100%; }
    .floating-logo { position: fixed; top: 10px; left: 50px; z-index: 9999; height: 50px; }
    .floating-logo img { height: 100%; }
    .custom-credits {
      position: fixed; bottom: 20px; right: 10px; z-index: 9999;
      background: rgba(255, 255, 255, 0.85); padding: 8px;
      font-family: Arial, sans-serif; font-size: 10px; border-radius: 5px; border: 1px solid #bbb;
    }
    @media (max-width: 600px) {
      .floating-logo { height: 35px; left: 45px; }
      .custom-credits { font-size: 8px; bottom: 30px; padding: 5px; }
    }
  </style>
</head>
<body>
  <div class="floating-logo">
    <a href="https://www.sus-soil.eu/" target="_blank" rel="noopener noreferrer">
      <img src="https://www.sus-soil.eu/assets/SUS-SOIL_LOGO__Logo%201-DulUurrk.svg" alt="SUS-SOIL logo" />
    </a>
  </div>

  <div class="custom-credits">
    Made by
    <a href="https://orcid.org/0000-0003-3200-6303" target="_blank" rel="noopener noreferrer" style="font-weight: bold; text-decoration: none; color: #2980b9;">
      J.J. SANTIAGO-FREIJANES
    </a>
  </div>

  <div id="map"></div>

  <script>
    (async function initSamplingMap() {
      const map = L.map('map', {
        center: [${center[0]}, ${center[1]}],
        zoom: ${zoom},
        crs: L.CRS.EPSG3857,
        zoomControl: true,
        preferCanvas: false
      });

      L.control.scale().addTo(map);

      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 19,
        maxNativeZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      osm.addTo(map);

      const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 0,
        maxZoom: 18,
        maxNativeZoom: 18,
        attribution: 'Esri'
      });

      L.control.layers({ OpenStreetMap: osm, Satellite: esri }, {}).addTo(map);

      const cluster = L.markerClusterGroup({});
      const response = await fetch('./sampling-points-data.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Unable to load sampling points data');
      const points = await response.json();

      const safe = (value) =>
        String(value ?? '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      points.forEach((point) => {
        const marker = L.marker([point.lat, point.lng], {}).addTo(cluster);
        const popup = L.popup({ maxWidth: '100%' });

        const card = document.createElement('div');
        card.className = 'ml-popup-card';

        const compositionEntries = Object.entries(point.composition || {});
        const compositionHtml = compositionEntries.length
          ? '<details style="background:#f4f4f4;padding:5px;border-radius:3px;margin:0 0 8px 0;">' +
              '<summary style="cursor:pointer;font-size:12px;font-weight:700;">Composition</summary>' +
              '<ul style="font-size:11px;column-count:2;padding-left:15px;margin-top:5px;">' +
              compositionEntries.map(([k, v]) => '<li><b>' + safe(k) + ':</b> ' + safe(v) + '</li>').join('') +
              '</ul></details>'
          : '';

        const linksHtml = (point.links || [])
          .map((link) =>
            '<a href="' + safe(link.href) + '" target="_blank" rel="noopener noreferrer">' + safe(link.label) + '</a>'
          )
          .join('');

        card.innerHTML =
          '<div class="ml-popup-title">ID: ' + safe(point.id) + '</div>' +
          '<div class="ml-popup-sub">Land Cover: ' + safe(point.landCover) + '</div>' +
          compositionHtml +
          (linksHtml ? '<div class="ml-popup-links">' + linksHtml + '</div>' : '');

        popup.setContent(card);
        marker.bindPopup(popup);
      });

      cluster.addTo(map);
    })().catch((error) => {
      console.error('Sampling map initialization failed:', error);
    });
  </script>
</body>
</html>
`;

  fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
}

const sourceHtml = readFileSafe(SOURCE_HTML);
const points = extractPoints(sourceHtml);
const view = extractViewConfig(sourceHtml);

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(points), 'utf8');
writeMapHtml(view);

console.log(`Generated ${OUTPUT_JSON} with ${points.length} points`);
console.log(`Generated ${OUTPUT_HTML}`);
