export function stripHtml(html = '') {
  return String(html).replace(/<[^>]*>/g, '').trim();
}

export function decodeHtmlEntities(text = '') {
  return String(text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export function getFeaturedMedia(post) {
  return post?._embedded?.['wp:featuredmedia']?.[0] || null;
}

export function getFeaturedImageUrl(post) {
  const media = getFeaturedMedia(post);
  return media?.source_url || null;
}

export function getFeaturedImageAlt(post, fallback = '') {
  const media = getFeaturedMedia(post);
  return media?.alt_text || fallback;
}

export function getPostTerms(post) {
  const groups = post?._embedded?.['wp:term'] || [];
  return groups.flat().filter(Boolean);
}

export function getNonCategoryTerms(post) {
  return getPostTerms(post).filter((term) => term.taxonomy !== 'category');
}

export function isEventLikePost(post) {
  return getNonCategoryTerms(post).some((term) => {
    const name = (term.name || '').toLowerCase();
    const slug = (term.slug || '').toLowerCase();
    return name === 'event' || name === 'events' || slug === 'event' || slug === 'events';
  });
}

export function buildNewsSlug(id, title, date) {
  const d = new Date(date);
  const datePart = Number.isNaN(d.getTime()) ? 'unknown-date' : d.toISOString().slice(0, 10);
  const slugifiedTitle = stripHtml(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${id}-${slugifiedTitle}-${datePart}`;
}

function ensureHttpsForKnownHosts(value = '') {
  return String(value).replace(/http:\/\/admin\.sus-soil\.eu/gi, 'https://admin.sus-soil.eu');
}

function sanitizeClassList(classValue = '') {
  return classValue
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => token.toLowerCase() !== 'lazyload')
    .join(' ');
}

function normalizeMediaTag(tag, type = 'img') {
  let out = ensureHttpsForKnownHosts(tag);

  const dataSrcMatch = out.match(/\sdata-src\s*=\s*(['"])(.*?)\1/i);
  const dataLazySrcMatch = out.match(/\sdata-lazy-src\s*=\s*(['"])(.*?)\1/i);
  const sourceUrl = dataSrcMatch?.[2] || dataLazySrcMatch?.[2];
  const normalizedSource = sourceUrl ? ensureHttpsForKnownHosts(sourceUrl) : '';

  if (normalizedSource) {
    if (/\ssrc\s*=\s*(['"]).*?\1/i.test(out)) {
      out = out.replace(/\ssrc\s*=\s*(['"]).*?\1/i, ` src="${normalizedSource}"`);
    } else {
      out = out.replace(/^<\w+/, (m) => `${m} src="${normalizedSource}"`);
    }
  }

  out = out.replace(/\sdata-src\s*=\s*(['"]).*?\1/gi, '');
  out = out.replace(/\sdata-lazy-src\s*=\s*(['"]).*?\1/gi, '');

  out = out.replace(/\sclass\s*=\s*(['"])(.*?)\1/i, (_full, quote, classValue) => {
    const cleaned = sanitizeClassList(classValue);
    return cleaned ? ` class=${quote}${cleaned}${quote}` : '';
  });

  if (type === 'img' && !/\sloading\s*=/.test(out)) {
    out = out.replace(/^<img/i, '<img loading="lazy" decoding="async"');
  }

  if (type === 'iframe' && !/\sloading\s*=/.test(out)) {
    out = out.replace(/^<iframe/i, '<iframe loading="lazy"');
  }

  if (type === 'video' && !/\spreload\s*=/.test(out)) {
    out = out.replace(/^<video/i, '<video preload="metadata"');
  }

  return out;
}

function extractAttr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
  return match?.[2] || '';
}

function transformThemeisleSliderBlock(block = '') {
  const rawImgs = block.match(/<img\b[^>]*>/gi) || [];
  const urls = new Set();
  const slides = [];

  rawImgs.forEach((rawTag) => {
    const normalizedTag = normalizeMediaTag(rawTag, 'img');
    const src = extractAttr(normalizedTag, 'src');
    if (!src || urls.has(src)) return;
    urls.add(src);

    const alt = extractAttr(normalizedTag, 'alt');
    slides.push(
      `<figure class="overflow-hidden rounded-xl border border-black/5 bg-white">` +
        `<img src="${src}" alt="${alt || ''}" loading="lazy" decoding="async" class="w-full h-auto object-cover" />` +
      `</figure>`
    );
  });

  if (!slides.length) return '';

  return (
    `<div class="not-prose my-8 grid grid-cols-1 gap-3 sm:grid-cols-2">` +
      slides.join('') +
    `</div>`
  );
}

export function transformRichContentHtml(html = '') {
  let out = ensureHttpsForKnownHosts(String(html || ''));

  // Make lazy-loaded media render in static Astro output.
  out = out.replace(/<img\b[^>]*>/gi, (tag) => normalizeMediaTag(tag, 'img'));
  out = out.replace(/<iframe\b[^>]*>/gi, (tag) => normalizeMediaTag(tag, 'iframe'));
  out = out.replace(/<video\b[^>]*>/gi, (tag) => normalizeMediaTag(tag, 'video'));
  out = out.replace(/<source\b[^>]*>/gi, (tag) => normalizeMediaTag(tag, 'source'));

  // noscript media is not shown with JS enabled; avoid duplicated/unparsed blocks.
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // Replace Themeisle slider blocks (JS-driven) with static responsive media grid.
  out = out.replace(
    /<div[^>]*class=['"][^'"]*wp-block-themeisle-blocks-slider[^'"]*['"][^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
    (block) => transformThemeisleSliderBlock(block)
  );

  return out;
}

export function toNewsCard(post) {
  const titleHtml = post?.title?.rendered || 'Untitled';
  return {
    id: post.id,
    titleHtml,
    title: stripHtml(titleHtml),
    excerptHtml: post?.excerpt?.rendered || '',
    excerpt: stripHtml(post?.excerpt?.rendered || ''),
    contentHtml: transformRichContentHtml(post?.content?.rendered || ''),
    date: post?.date || null,
    imageUrl: getFeaturedImageUrl(post),
    imageAlt: getFeaturedImageAlt(post, stripHtml(titleHtml)),
    terms: getNonCategoryTerms(post),
    slug: buildNewsSlug(post.id, titleHtml, post?.date),
    linkPath: `/news/${buildNewsSlug(post.id, titleHtml, post?.date)}`,
  };
}

export function extractAcfFile(acf = {}) {
  if (acf.file && typeof acf.file === 'object' && acf.file.url) {
    return {
      url: acf.file.url,
      mime: acf.file.mime_type || '',
      title: acf.file.title || '',
    };
  }
  if (acf.pdf_file && typeof acf.pdf_file === 'object' && acf.pdf_file.url) {
    return {
      url: acf.pdf_file.url,
      mime: acf.pdf_file.mime_type || 'application/pdf',
      title: acf.pdf_file.title || '',
    };
  }
  return { url: '', mime: '', title: '' };
}

export function fileExtensionFromMime(mime = '') {
  const ext = String(mime).split('/').pop();
  return ext ? ext.toUpperCase() : 'FILE';
}

export function toMaterialItem(post) {
  const acfFile = extractAcfFile(post?.acf || {});
  const titleHtml = post?.title?.rendered || 'Material';
  return {
    id: post.id,
    title: stripHtml(titleHtml),
    titleHtml,
    contentHtml: post?.content?.rendered || '',
    date: post?.date || null,
    file: acfFile,
    imageUrl: getFeaturedImageUrl(post),
    imageAlt: getFeaturedImageAlt(post, stripHtml(titleHtml)),
  };
}

export function toNewsletterItem(post) {
  const titleHtml = post?.title?.rendered || 'Newsletter issue';
  return {
    id: post.id,
    title: stripHtml(titleHtml),
    titleHtml,
    excerptHtml: post?.excerpt?.rendered || '',
    date: post?.date || null,
    url: post?.acf?.url || post?.link || '#',
    imageUrl: getFeaturedImageUrl(post),
    imageAlt: getFeaturedImageAlt(post, stripHtml(titleHtml)),
  };
}

export function toDeliverableItem(post) {
  const acf = post?.acf || {};
  const file = extractAcfFile(acf);
  const fallbackTitle = stripHtml(post?.title?.rendered || 'Deliverable');
  return {
    id: post.id,
    number: acf.deliverable_number || '',
    title: file.title || fallbackTitle,
    workPackage: acf.work_package || '',
    leader: acf.leader || '',
    level: acf.dissemination_level || acf.dissemination_level_ || '',
    milestone: acf.milestone || '',
    pdfUrl: file.url || '',
  };
}
