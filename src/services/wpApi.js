// src/services/wpApi.js
//
// Capa ligera de acceso a la WordPress REST API de SUS-SOIL.
// Centraliza la construcción de URLs y el manejo básico de errores.

const WP_BASE = 'https://admin.sus-soil.eu/wp-json/wp/v2';

// Simple in-memory caches to avoid repeated network calls
const postCache = new Map();              // id -> post
const recentPostsCache = new Map();       // key -> posts[]
const recentEventsCache = new Map();      // key -> events[]
const relatedPostsCache = new Map();      // key -> posts[]
const prevNextCache = new Map();          // key -> { prev, next }

/**
 * Envuelve fetch contra la API de WP.
 * Devuelve el Response para que el llamador decida cómo tratar 400/404.
 */
export async function wpFetch(path, { signal } = {}) {
  const hasQuery = path.includes('?');
  const cacheBust = `_=${Date.now()}`;
  const url = `${WP_BASE}${path}${hasQuery ? '&' : '?'}${cacheBust}`;

  const resp = await fetch(url, { signal });
  return resp;
}

// -------------------------
// Noticias (listados)
// -------------------------

/**
 * Lista paginada de posts por categoría.
 * Mantiene la semántica usada actualmente en la página de News.
 */
export async function fetchCategoryPage({ categoryId, page = 1, perPage = 12, embed = true }) {
  const embedParam = embed ? '&_embed' : '';
  const path = `/posts?categories=${categoryId}${embedParam}&per_page=${perPage}&page=${page}`;
  const resp = await wpFetch(path);

  if (!resp.ok) {
    // 400/404 indican que no hay más páginas
    if (resp.status === 400 || resp.status === 404) {
      return { posts: [], hasMore: false };
    }
    throw new Error('Error fetching posts');
  }

  const posts = await resp.json();
  const hasMore = posts.length === perPage;
  return { posts, hasMore };
}

/**
 * Carga completa de una categoría (todas las páginas).
 * Útil para modos como "ver todos los eventos".
 */
export async function fetchAllCategory({ categoryId, perPage = 100 }) {
  let page = 1;
  let out = [];

  // Límite defensivo de páginas para evitar bucles infinitos.
  const MAX_PAGES = 50;

  while (true) {
    if (page > MAX_PAGES) break;

    const path = `/posts?categories=${categoryId}&_embed&per_page=${perPage}&page=${page}`;
    const res = await wpFetch(path);

    if (!res.ok) {
      if (res.status === 400 || res.status === 404) break;
      throw new Error('Error fetching full list');
    }

    const chunk = await res.json();
    out = out.concat(chunk);

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
    if (!totalPages || page >= totalPages) break;

    page += 1;
  }

  return out;
}

// -------------------------
// Post individual + listados laterales
// -------------------------

export async function fetchPostById(id, { signal } = {}) {
  if (postCache.has(id)) {
    return postCache.get(id);
  }

  const resp = await wpFetch(`/posts/${id}?_embed`, { signal });
  if (resp.status === 404) return null;
  if (!resp.ok) throw new Error('Error fetching post');
  const data = await resp.json();
  postCache.set(id, data);
  return data;
}

export async function fetchRecentPosts({ categoryId, perPage = 5, signal } = {}) {
  const cacheKey = `${categoryId}|${perPage}`;
  if (recentPostsCache.has(cacheKey)) {
    return recentPostsCache.get(cacheKey);
  }

  const resp = await wpFetch(
    `/posts?categories=${categoryId}&per_page=${perPage}&order=desc&orderby=date&_embed`,
    { signal }
  );
  if (!resp.ok) throw new Error('Error fetching recent posts');
  const data = await resp.json();
  const normalized = Array.isArray(data) ? data : [];
  recentPostsCache.set(cacheKey, normalized);
  return normalized;
}

export async function fetchRecentEvents({ categoryId, eventTagId, perPage = 3, signal } = {}) {
  const cacheKey = `${categoryId}|${eventTagId}|${perPage}`;
  if (recentEventsCache.has(cacheKey)) {
    return recentEventsCache.get(cacheKey);
  }

  const resp = await wpFetch(
    `/posts?categories=${categoryId}&tags=${eventTagId}&per_page=${perPage}&order=desc&orderby=date&_embed`,
    { signal }
  );
  if (!resp.ok) throw new Error('Error fetching events');
  const data = await resp.json();
  const normalized = Array.isArray(data) ? data : [];
  recentEventsCache.set(cacheKey, normalized);
  return normalized;
}

export async function fetchRelatedPosts({ tagIds, excludeId, perPage = 3, signal } = {}) {
  if (!tagIds || !tagIds.length) return [];
  const tagsParam = tagIds.join(',');
  const cacheKey = `${tagsParam}|${excludeId}|${perPage}`;
  if (relatedPostsCache.has(cacheKey)) {
    return relatedPostsCache.get(cacheKey);
  }

  const resp = await wpFetch(
    `/posts?tags=${tagsParam}&per_page=${perPage}&exclude=${excludeId}&_embed`,
    { signal }
  );
  if (!resp.ok) throw new Error('Error fetching related posts');
  const data = await resp.json();
  const normalized = Array.isArray(data) ? data : [];
  relatedPostsCache.set(cacheKey, normalized);
  return normalized;
}

export async function fetchPrevNextForPost({ post, categoryId, eventTagId, isEvent, signal }) {
  if (!post) return { prev: null, next: null };

  const base = `/posts?categories=${categoryId}`;
  const tagParam = isEvent ? `&tags=${eventTagId}` : '';
  const dateISO = encodeURIComponent(post.date);

  const prevPath = `${base}${tagParam}&before=${dateISO}&exclude=${post.id}&per_page=1&orderby=date&order=desc&_embed`;
  const nextPath = `${base}${tagParam}&after=${dateISO}&exclude=${post.id}&per_page=1&orderby=date&order=asc&_embed`;

  const cacheKey = `${prevPath}|${nextPath}`;
  if (prevNextCache.has(cacheKey)) {
    return prevNextCache.get(cacheKey);
  }

  const [prevResp, nextResp] = await Promise.all([
    wpFetch(prevPath, { signal }),
    wpFetch(nextPath, { signal }),
  ]);

  const [prevArr, nextArr] = await Promise.all([prevResp.json(), nextResp.json()]);

  const prev = Array.isArray(prevArr) && prevArr.length ? prevArr[0] : null;
  const next = Array.isArray(nextArr) && nextArr.length ? nextArr[0] : null;

  const result = { prev, next };
  prevNextCache.set(cacheKey, result);
  return result;
}
