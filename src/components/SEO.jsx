import React from 'react';
import { Helmet } from 'react-helmet';

const DEFAULT_SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://sus-soil.eu').replace(/\/+$/, '');
const DEFAULT_IMAGE_PATH = '/logo.webp';

function toAbsoluteUrl(urlOrPath) {
  if (!urlOrPath) return `${DEFAULT_SITE_URL}${DEFAULT_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${DEFAULT_SITE_URL}${path}`;
}

function ensureAbsoluteCanonical(pathOrUrl) {
  if (!pathOrUrl) return DEFAULT_SITE_URL;
  return toAbsoluteUrl(pathOrUrl);
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  canonicalUrl,
  image,
  type = 'website',
  noindex = false,
  structuredData,
}) {
  const canonical = ensureAbsoluteCanonical(canonicalUrl || canonicalPath || '/');
  const socialImage = toAbsoluteUrl(image || DEFAULT_IMAGE_PATH);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <html lang="en" />
      <meta httpEquiv="content-language" content="en" />
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:site_name" content="SUS-SOIL" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={type} />
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content="summary_large_image" />
      {title ? <meta name="twitter:title" content={title} /> : null}
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={socialImage} />

      {structuredData
        ? (Array.isArray(structuredData) ? structuredData : [structuredData]).map((schema, idx) => (
            <script key={idx} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))
        : null}
    </Helmet>
  );
}
