import { WP_API_V2 } from './constants';

function buildUrl(path, params) {
  const url = new URL(`${WP_API_V2}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, String(value));
    });
  }
  return url;
}

export async function wpGet(path, { params, signal, allow404 = false } = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (allow404 && (response.status === 404 || response.status === 400)) {
      return { data: null, response };
    }
    throw new Error(`WP request failed (${response.status}) for ${url.pathname}`);
  }

  const data = await response.json();
  return { data, response };
}

export async function wpGetAllPages(
  path,
  { params, signal, perPage = 100, maxPages = 50 } = {}
) {
  const out = [];
  let page = 1;

  while (page <= maxPages) {
    const { data, response } = await wpGet(path, {
      signal,
      allow404: true,
      params: {
        ...params,
        page,
        per_page: perPage,
      },
    });

    if (!Array.isArray(data) || data.length === 0) break;

    out.push(...data);

    const totalPages = Number(response.headers.get('X-WP-TotalPages') || 0);
    if (!totalPages || page >= totalPages) break;

    page += 1;
  }

  return out;
}

export async function fetchPostsByCategory(categoryId, options = {}) {
  return wpGetAllPages('/posts', {
    ...options,
    params: {
      categories: categoryId,
      _embed: '1',
      acf_format: 'standard',
      ...(options.params || {}),
    },
  });
}

export async function fetchPostById(postId, options = {}) {
  const { data } = await wpGet(`/posts/${postId}`, {
    ...options,
    allow404: true,
    params: { _embed: '1' },
  });
  return data;
}

export async function fetchEvents(options = {}) {
  return wpGetAllPages('/event', {
    ...options,
    params: {
      _embed: '1',
      ...(options.params || {}),
    },
  });
}

export async function fetchEventById(eventId, options = {}) {
  const { data } = await wpGet(`/event/${eventId}`, {
    ...options,
    allow404: true,
    params: { _embed: '1' },
  });
  return data;
}

export async function fetchMediaByParent(parentId, options = {}) {
  return wpGetAllPages('/media', {
    ...options,
    params: {
      parent: parentId,
      ...(options.params || {}),
    },
  });
}

export async function fetchTagIdBySlug(slug, options = {}) {
  if (!slug) return null;
  const { data } = await wpGet('/tags', {
    ...options,
    params: { slug },
  });
  return Array.isArray(data) && data[0]?.id ? data[0].id : null;
}
