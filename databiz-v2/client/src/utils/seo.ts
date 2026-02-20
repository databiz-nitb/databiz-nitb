/**
 * SEO base URL - update when domain changes
 */
export const SEO_BASE_URL = 'https://databiz.in';
export const SEO_DEFAULT_IMAGE = `${SEO_BASE_URL}/DataBiz%20Logo.png`;
export const SEO_SITE_NAME = 'DataBiz';

export interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const PAGE_LD_ID = 'page-ld-json';

function injectPageStructuredData(config: SEOConfig, fullUrl: string, fullTitle: string): void {
  const { type, description, publishedTime, modifiedTime, author, image, keywords } = config;

  let schema: object;
  if (type === 'article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: fullTitle,
      description,
      url: fullUrl,
      image: image || SEO_DEFAULT_IMAGE,
      author: {
        '@type': 'Person',
        name: author || SEO_SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SEO_SITE_NAME,
        url: SEO_BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: SEO_DEFAULT_IMAGE,
        },
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      keywords,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      description,
      url: fullUrl,
      isPartOf: { '@id': `${SEO_BASE_URL}/#website` },
    };
  }

  let el = document.getElementById(PAGE_LD_ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('id', PAGE_LD_ID);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"][href]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Apply SEO meta tags and title. Call from useEffect in page components.
 */
export function applySEO(config: SEOConfig): () => void {
  const {
    title,
    description,
    path = '',
    image = SEO_DEFAULT_IMAGE,
    imageAlt = `${SEO_SITE_NAME} - Tech Community`,
    noindex = false,
    keywords = 'DataBiz, databiz.in, tech community, hackathons, workshops, data science, NIT Bhopal',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'DataBiz',
  } = config;

  const fullUrl = path ? `${SEO_BASE_URL}${path.startsWith('/') ? path : `/${path}`}` : SEO_BASE_URL;
  const fullTitle = title.includes('|') || title.includes('DataBiz') ? title : `${title} | DataBiz - databiz.in`;

  const prevTitle = document.title;
  document.title = fullTitle;

  setMeta('name', 'description', description);
  if (keywords) setMeta('name', 'keywords', keywords);
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

  ensureLink('canonical', fullUrl);

  // Open Graph (use property)
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', SEO_SITE_NAME);
  setMeta('property', 'og:locale', 'en_IN');
  if (type === 'article' && publishedTime) setMeta('property', 'article:published_time', publishedTime);
  if (type === 'article' && modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
  if (type === 'article' && author) setMeta('property', 'article:author', author);

  // Twitter (use name)
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  if (imageAlt) setMeta('name', 'twitter:image:alt', imageAlt);

  // Per-page JSON-LD structured data
  injectPageStructuredData(config, fullUrl, fullTitle);

  return () => {
    document.title = prevTitle;
    document.getElementById(PAGE_LD_ID)?.remove();
  };
}
