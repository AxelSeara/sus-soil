import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://sus-soil.eu').replace(/\/+$/, '');
const WP_BASE = 'https://admin.sus-soil.eu/wp-json/wp/v2';
const OUTPUT_FILE = path.resolve(process.cwd(), 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/news', changefreq: 'daily', priority: '0.9' },
  { loc: '/living-labs', changefreq: 'weekly', priority: '0.9' },
  { loc: '/project/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/project/work-packages', changefreq: 'monthly', priority: '0.7' },
  { loc: '/project/partners', changefreq: 'monthly', priority: '0.7' },
  { loc: '/project/deliverables', changefreq: 'monthly', priority: '0.6' },
  { loc: '/resources', changefreq: 'weekly', priority: '0.8' },
  { loc: '/resources/materials', changefreq: 'monthly', priority: '0.6' },
  { loc: '/resources/practice-abstracts', changefreq: 'monthly', priority: '0.6' },
  { loc: '/resources/newsletter', changefreq: 'monthly', priority: '0.6' },
  { loc: '/knowledge-cloud', changefreq: 'weekly', priority: '0.7' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
];

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return res.json();
}

async function fetchAllWpPostsByCategory(categoryId) {
  const perPage = 100;
  let page = 1;
  let done = false;
  const out = [];

  while (!done) {
    const url = `${WP_BASE}/posts?categories=${categoryId}&_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) break;
      throw new Error(`Failed posts category fetch: ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    out.push(...data);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || 0);
    if (!totalPages || page >= totalPages) done = true;
    page += 1;
  }

  return out;
}

async function fetchAllWpEvents() {
  const perPage = 100;
  let page = 1;
  let done = false;
  const out = [];

  while (!done) {
    const url = `${WP_BASE}/event?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) break;
      throw new Error(`Failed event fetch: ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    out.push(...data);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || 0);
    if (!totalPages || page >= totalPages) done = true;
    page += 1;
  }

  return out;
}

function buildNewsRoutes(posts) {
  return posts.map((post) => {
    const slug = `${post.id}-${slugify(post.title?.rendered || 'news')}-${String(post.date || '').slice(0, 10)}`;
    return {
      loc: `/news/${slug}`,
      lastmod: post.modified || post.date || undefined,
      changefreq: 'weekly',
      priority: '0.8',
    };
  });
}

function buildEventRoutes(events) {
  return events.map((event) => {
    const title = event?.acf?.title || event?.title?.rendered || 'event';
    const date = event?.acf?.date || event?.date || '';
    const slug = `${event.id}-${slugify(title)}-${String(date).slice(0, 10)}`;
    return {
      loc: `/event/${slug}`,
      lastmod: event.modified || event.date || undefined,
      changefreq: 'weekly',
      priority: '0.8',
    };
  });
}

function toXmlUrlTag(entry) {
  const fullLoc = `${SITE_URL}${entry.loc.startsWith('/') ? entry.loc : `/${entry.loc}`}`;
  const lines = [
    '  <url>',
    `    <loc>${xmlEscape(fullLoc)}</loc>`,
  ];
  if (entry.lastmod) lines.push(`    <lastmod>${xmlEscape(new Date(entry.lastmod).toISOString())}</lastmod>`);
  if (entry.changefreq) lines.push(`    <changefreq>${xmlEscape(entry.changefreq)}</changefreq>`);
  if (entry.priority) lines.push(`    <priority>${xmlEscape(entry.priority)}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

async function main() {
  const routes = [...STATIC_ROUTES];

  try {
    const [posts, events] = await Promise.all([
      fetchAllWpPostsByCategory(12),
      fetchAllWpEvents(),
    ]);

    routes.push(...buildNewsRoutes(posts));
    routes.push(...buildEventRoutes(events));
    console.log(`Sitemap: loaded ${posts.length} posts and ${events.length} events.`);
  } catch (error) {
    console.warn(`Sitemap dynamic fetch skipped: ${error.message}`);
  }

  const uniqueMap = new Map();
  for (const route of routes) uniqueMap.set(route.loc, route);
  const uniqueRoutes = Array.from(uniqueMap.values());

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueRoutes.map(toXmlUrlTag),
    '</urlset>',
    '',
  ].join('\n');

  await fs.writeFile(OUTPUT_FILE, xml, 'utf8');
  console.log(`Sitemap generated: ${uniqueRoutes.length} urls -> ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
