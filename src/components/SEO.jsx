import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for advanced meta tag management
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - Page keywords
 * @param {string} image - OG/Twitter image
 * @param {string} url - Canonical URL
 */
const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/logo512.png', 
  url = window.location.href 
}) => {
  const siteTitle = 'Wouchify';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | India's #1 Free Deal Discovery Platform`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Wouchify",
          "url": "https://wouchify.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://wouchify.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
