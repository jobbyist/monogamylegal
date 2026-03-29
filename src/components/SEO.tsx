import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  DEFAULT_LOCALE,
  GLOBAL_STRUCTURED_DATA,
  type PageSEO,
} from "@/lib/seo";

/**
 * SEO — drop this component near the top of every page to inject:
 *  - <title>
 *  - <meta name="description">
 *  - <link rel="canonical">
 *  - Open Graph (og:*) tags
 *  - Twitter Card tags
 *  - JSON-LD structured data
 *  - noindex/nofollow where required
 */
const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
  noIndex = false,
}: PageSEO) => {
  // SEO addition: inject global Organization + WebSite schema on every route.
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];
  const mergedJsonLd = [...GLOBAL_STRUCTURED_DATA, ...jsonLdArray];

  return (
    <Helmet htmlAttributes={{ lang: "en-ZA" }}>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/* SEO addition: regional hints for South Africa */}
      <meta name="language" content="en-ZA" />
      <meta name="geo.region" content="ZA" />
      <meta name="geo.placename" content="South Africa" />
      <meta name="content-language" content="en-ZA" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {mergedJsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
