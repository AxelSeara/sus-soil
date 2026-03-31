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

export function toNewsCard(post) {
  const titleHtml = post?.title?.rendered || 'Untitled';
  return {
    id: post.id,
    titleHtml,
    title: stripHtml(titleHtml),
    excerptHtml: post?.excerpt?.rendered || '',
    excerpt: stripHtml(post?.excerpt?.rendered || ''),
    contentHtml: post?.content?.rendered || '',
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
