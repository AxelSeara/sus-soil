(function () {
  const TILE_SIZE = 256;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function latLngToWorld(lat, lng, z) {
    const scale = TILE_SIZE * Math.pow(2, z);
    const x = ((lng + 180) / 360) * scale;
    const sinLat = Math.sin((lat * Math.PI) / 180);
    const y =
      (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
    return { x, y };
  }

  function worldToLatLng(x, y, z) {
    const scale = TILE_SIZE * Math.pow(2, z);
    const lng = (x / scale) * 360 - 180;
    const n = Math.PI - (2 * Math.PI * y) / scale;
    const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    return { lat, lng };
  }

  function el(tag, cls, parent) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (parent) parent.appendChild(node);
    return node;
  }

  class TileLayer {
    constructor(url, options = {}) {
      this.url = url;
      this.options = options;
      this._map = null;
      this._isTileLayer = true;
      this._name = options.name || 'Layer';
    }

    addTo(map) {
      map.addLayer(this);
      return this;
    }

    getTileUrl(x, y, z) {
      return this.url
        .replace('{x}', x)
        .replace('{y}', y)
        .replace('{z}', z);
    }
  }

  class Popup {
    constructor() {
      this.content = null;
    }

    setContent(content) {
      this.content = content;
      return this;
    }
  }

  class Marker {
    constructor(latlng) {
      this.latlng = { lat: latlng[0], lng: latlng[1] };
      this.popup = null;
      this._map = null;
      this._el = null;
    }

    addTo(layerOrMap) {
      if (layerOrMap && typeof layerOrMap.addLayer === 'function') {
        layerOrMap.addLayer(this);
      }
      return this;
    }

    bindPopup(popup) {
      this.popup = popup;
      if (this._el) this._bindClick();
      return this;
    }

    _bindClick() {
      if (!this._map || !this._el || !this.popup) return;
      this._el.onclick = (ev) => {
        ev.stopPropagation();
        this._map.openPopup(this);
      };
    }

    _render(map) {
      this._map = map;
      if (!this._el) {
        this._el = el('button', 'ml-marker', map.markerPane);
        this._el.type = 'button';
        this._el.title = 'Sampling point';
      }
      const z = map.zoom;
      const world = latLngToWorld(this.latlng.lat, this.latlng.lng, z);
      const left = world.x - map.topLeft.x;
      const top = world.y - map.topLeft.y;
      this._el.style.transform = `translate(${left}px, ${top}px)`;
      this._bindClick();
    }
  }

  class MarkerClusterGroup {
    constructor() {
      this.markers = [];
      this._map = null;
    }

    addLayer(marker) {
      this.markers.push(marker);
      if (this._map) marker._render(this._map);
      return this;
    }

    addTo(map) {
      this._map = map;
      map.addLayer(this);
      return this;
    }

    _render(map) {
      this._map = map;
      this.markers.forEach((m) => m._render(map));
    }
  }

  class LayerControl {
    constructor(baseLayers = {}, overlays = {}) {
      this.baseLayers = baseLayers;
      this.overlays = overlays;
      this._map = null;
    }

    addTo(map) {
      this._map = map;
      const wrap = el('div', 'ml-layer-control', map.root);

      const select = el('select', 'ml-select', wrap);
      const entries = Object.entries(this.baseLayers);
      entries.forEach(([name, layer], idx) => {
        layer._name = name;
        const opt = el('option', '', select);
        opt.value = String(idx);
        opt.textContent = name;
        if (map.currentBaseLayer === layer) opt.selected = true;
      });

      select.onchange = () => {
        const layer = entries[Number(select.value)]?.[1];
        if (layer) {
          map.currentBaseLayer = layer;
          map.render();
        }
      };

      return this;
    }
  }

  class MapShim {
    constructor(id, options = {}) {
      this.zoom = options.zoom || 4;
      this.center = {
        lat: options.center?.[0] ?? 48,
        lng: options.center?.[1] ?? 15,
      };
      this.minZoom = 2;
      this.maxZoom = 18;
      this.layers = [];
      this.currentBaseLayer = null;
      this.clusterLayer = null;
      this.root = document.getElementById(id);
      this.root.classList.add('ml-map-root');

      this.tilePane = el('div', 'ml-tile-pane', this.root);
      this.markerPane = el('div', 'ml-marker-pane', this.root);
      this.popupPane = el('div', 'ml-popup-pane', this.root);

      this._setupInteraction();
      this._setupZoomControl();

      this.root.addEventListener('click', () => this.closePopup());
      window.addEventListener('resize', () => this.render());
      requestAnimationFrame(() => this.render());
    }

    addLayer(layer) {
      this.layers.push(layer);
      if (layer instanceof TileLayer) {
        this.currentBaseLayer = layer;
      } else if (layer instanceof MarkerClusterGroup) {
        this.clusterLayer = layer;
      }
      this.render();
      return this;
    }

    openPopup(marker) {
      this.closePopup();
      if (!marker.popup?.content) return;
      const popup = el('div', 'ml-popup', this.popupPane);
      const close = el('button', 'ml-popup-close', popup);
      close.type = 'button';
      close.textContent = 'x';
      close.onclick = (e) => {
        e.stopPropagation();
        this.closePopup();
      };

      const body = el('div', 'ml-popup-body', popup);
      const content = marker.popup.content;
      if (content instanceof HTMLElement) {
        body.appendChild(content.cloneNode(true));
      } else {
        body.innerHTML = String(content || '');
      }

      const z = this.zoom;
      const world = latLngToWorld(marker.latlng.lat, marker.latlng.lng, z);
      const left = world.x - this.topLeft.x;
      const top = world.y - this.topLeft.y;
      popup.style.transform = `translate(${left + 12}px, ${top - 18}px)`;
      this._openPopup = popup;
    }

    closePopup() {
      if (this._openPopup) {
        this._openPopup.remove();
        this._openPopup = null;
      }
    }

    _setupZoomControl() {
      const ctl = el('div', 'ml-zoom', this.root);
      const plus = el('button', 'ml-zoom-btn', ctl);
      plus.type = 'button';
      plus.textContent = '+';
      plus.onclick = () => {
        this.zoom = clamp(this.zoom + 1, this.minZoom, this.maxZoom);
        this.render();
      };
      const minus = el('button', 'ml-zoom-btn', ctl);
      minus.type = 'button';
      minus.textContent = '-';
      minus.onclick = () => {
        this.zoom = clamp(this.zoom - 1, this.minZoom, this.maxZoom);
        this.render();
      };
    }

    _setupInteraction() {
      let dragging = false;
      let start = null;
      let startCenterWorld = null;

      this.root.addEventListener('mousedown', (e) => {
        dragging = true;
        start = { x: e.clientX, y: e.clientY };
        startCenterWorld = latLngToWorld(this.center.lat, this.center.lng, this.zoom);
      });

      window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        const nextWorld = { x: startCenterWorld.x - dx, y: startCenterWorld.y - dy };
        const next = worldToLatLng(nextWorld.x, nextWorld.y, this.zoom);
        this.center = next;
        this.render();
      });

      window.addEventListener('mouseup', () => {
        dragging = false;
      });

      this.root.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1 : -1;
        this.zoom = clamp(this.zoom + delta, this.minZoom, this.maxZoom);
        this.render();
      }, { passive: false });
    }

    render() {
      const rect = this.root.getBoundingClientRect();
      const width = rect.width || this.root.clientWidth || 800;
      const height = rect.height || this.root.clientHeight || 500;
      const centerWorld = latLngToWorld(this.center.lat, this.center.lng, this.zoom);
      this.topLeft = {
        x: centerWorld.x - width / 2,
        y: centerWorld.y - height / 2,
      };

      this.closePopup();
      this._renderTiles(width, height);
      if (this.clusterLayer) this.clusterLayer._render(this);
    }

    _renderTiles(width, height) {
      this.tilePane.innerHTML = '';
      if (!this.currentBaseLayer) return;

      const z = this.zoom;
      const maxTile = Math.pow(2, z);
      const xStart = Math.floor(this.topLeft.x / TILE_SIZE);
      const yStart = Math.floor(this.topLeft.y / TILE_SIZE);
      const xEnd = Math.floor((this.topLeft.x + width) / TILE_SIZE);
      const yEnd = Math.floor((this.topLeft.y + height) / TILE_SIZE);

      for (let x = xStart; x <= xEnd; x += 1) {
        for (let y = yStart; y <= yEnd; y += 1) {
          const tx = ((x % maxTile) + maxTile) % maxTile;
          const ty = clamp(y, 0, maxTile - 1);
          const img = el('img', 'ml-tile', this.tilePane);
          img.draggable = false;
          img.src = this.currentBaseLayer.getTileUrl(tx, ty, z);
          img.style.left = `${x * TILE_SIZE - this.topLeft.x}px`;
          img.style.top = `${y * TILE_SIZE - this.topLeft.y}px`;
          img.width = TILE_SIZE;
          img.height = TILE_SIZE;
        }
      }
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin: 0; height: 100%; }
    .ml-map-root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #e6eef5; cursor: grab; }
    .ml-map-root:active { cursor: grabbing; }
    .ml-tile-pane, .ml-marker-pane, .ml-popup-pane { position: absolute; inset: 0; }
    .ml-tile { position: absolute; user-select: none; pointer-events: none; }
    .ml-marker { position: absolute; width: 10px; height: 10px; border: 2px solid #fff; border-radius: 999px; background: #cf3a2b; box-shadow: 0 1px 6px rgba(0,0,0,0.35); transform: translate(-5px, -5px); cursor: pointer; z-index: 10; }
    .ml-popup { position: absolute; z-index: 20; background: #fff; border: 1px solid #ccd6dd; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); max-width: min(320px, 80vw); }
    .ml-popup-close { position: absolute; top: 6px; right: 6px; border: 0; background: #eef3f7; border-radius: 999px; width: 22px; height: 22px; cursor: pointer; }
    .ml-popup-body { padding: 14px 10px 10px; }
    .ml-popup iframe { width: min(290px, 74vw); height: 320px; border: 0; }
    .ml-layer-control { position: absolute; top: 10px; right: 10px; z-index: 30; background: rgba(255,255,255,0.92); border: 1px solid #c7d2da; border-radius: 8px; padding: 6px; }
    .ml-select { border: 1px solid #c7d2da; border-radius: 6px; padding: 4px 6px; font-size: 12px; }
    .ml-zoom { position: absolute; left: 10px; top: 10px; z-index: 30; display: grid; gap: 4px; }
    .ml-zoom-btn { width: 30px; height: 30px; border: 1px solid #c7d2da; border-radius: 6px; background: rgba(255,255,255,0.92); font-size: 20px; line-height: 1; cursor: pointer; }
  `;
  document.head.appendChild(style);

  window.$ = function (html) {
    const t = document.createElement('template');
    t.innerHTML = String(html).trim();
    return [t.content.firstElementChild || document.createElement('div')];
  };

  window.L = {
    CRS: { EPSG3857: {} },
    map(id, options) {
      return new MapShim(id, options || {});
    },
    tileLayer(url, options) {
      return new TileLayer(url, options || {});
    },
    marker(latlng) {
      return new Marker(latlng);
    },
    popup() {
      return new Popup();
    },
    markerClusterGroup() {
      return new MarkerClusterGroup();
    },
    control: {
      scale() {
        return { addTo() { return this; } };
      },
      layers(baseLayers, overlays) {
        return new LayerControl(baseLayers, overlays);
      },
    },
  };
})();
