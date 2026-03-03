export function stripHtml(input = '') {
  return String(input).replace(/<[^>]+>/g, '').trim();
}

export function getFeaturedMedia(post) {
  return post?._embedded?.['wp:featuredmedia']?.[0] || null;
}

function normalizeVariant(url, width, height) {
  if (!url) return null;
  return {
    url,
    width: Number(width) || null,
    height: Number(height) || null,
  };
}

function collectVariants(media) {
  if (!media) return [];

  const variants = [];
  const full = normalizeVariant(media.source_url, media.media_details?.width, media.media_details?.height);
  if (full) variants.push(full);

  const sizes = media.media_details?.sizes || {};
  for (const key of Object.keys(sizes)) {
    const entry = sizes[key];
    const variant = normalizeVariant(entry?.source_url, entry?.width, entry?.height);
    if (variant) variants.push(variant);
  }

  const uniqueByWidthAndUrl = new Map();
  for (const variant of variants) {
    const key = `${variant.width || 0}|${variant.url}`;
    if (!uniqueByWidthAndUrl.has(key)) {
      uniqueByWidthAndUrl.set(key, variant);
    }
  }

  return Array.from(uniqueByWidthAndUrl.values()).sort((a, b) => (a.width || 0) - (b.width || 0));
}

function pickPreferredVariant(variants, media, preferOrder) {
  if (!media) return null;
  const sizes = media.media_details?.sizes || {};

  for (const key of preferOrder) {
    const candidate = sizes[key];
    if (candidate?.source_url) {
      return normalizeVariant(candidate.source_url, candidate.width, candidate.height);
    }
  }

  return variants[variants.length - 1] || null;
}

export function getWpImageProps(
  media,
  {
    altFallback = 'Image',
    sizes = '100vw',
    loading = 'lazy',
    decoding = 'async',
    fetchPriority,
    preferOrder = ['large', 'medium_large', 'medium', 'thumbnail'],
  } = {}
) {
  if (!media) return null;

  const variants = collectVariants(media);
  const preferred = pickPreferredVariant(variants, media, preferOrder);
  if (!preferred?.url) return null;

  const srcSet = variants
    .filter((v) => v.width && v.url)
    .map((v) => `${v.url} ${v.width}w`)
    .join(', ');

  const alt = stripHtml(media.alt_text || '') || stripHtml(altFallback) || 'Image';

  return {
    src: preferred.url,
    alt,
    ...(srcSet ? { srcSet } : {}),
    ...(sizes ? { sizes } : {}),
    ...(preferred.width ? { width: preferred.width } : {}),
    ...(preferred.height ? { height: preferred.height } : {}),
    ...(loading ? { loading } : {}),
    ...(decoding ? { decoding } : {}),
    ...(fetchPriority ? { fetchPriority } : {}),
  };
}
