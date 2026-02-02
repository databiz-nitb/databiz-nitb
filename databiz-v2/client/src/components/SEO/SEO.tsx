import { useEffect } from 'react';
import { applySEO, type SEOConfig } from '../../utils/seo';

interface SEOProps extends SEOConfig {}

/**
 * Renders nothing; updates document head (title + meta + canonical + OG/Twitter) for SEO.
 * Use on every public page for Google-friendly, shareable links.
 */
export default function SEO(props: SEOProps) {
  useEffect(() => {
    const cleanup = applySEO(props);
    return cleanup;
  }, [
    props.title,
    props.description,
    props.path,
    props.image,
    props.noindex,
    props.keywords,
    props.type,
    props.publishedTime,
    props.modifiedTime,
    props.author,
  ]);

  return null;
}
