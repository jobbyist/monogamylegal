import { Helmet } from "react-helmet-async";

const SITE_URL = "https://monogamy.legal";
const SITE_NAME = "Monogamy";
const DEFAULT_IMAGE = `${SITE_URL}/monogamyappicon.png`;
const TWITTER_HANDLE = "@monogamy_law";
const SOCIAL_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/social-images/social-1770788034077-GRAVITAS_PORTFOLIO_(Hi-Red_Banners).jpeg";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/monogamyappicon.png`,
  description:
    "Your on-demand legal team — without the overhead. Connect with vetted attorneys across every practice area. Available in South Africa, Nigeria and Kenya.",
  email: "hello@monogamy.legal",
  areaServed: ["South Africa", "Nigeria", "Kenya"],
  sameAs: [
    "https://facebook.com/monogamy.legal",
    "https://linkedin.com/company/monogamylegal",
    "https://whatsapp.com/channel/0029Vb7wLlMI7BeLb4viJx37",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@monogamy.legal",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  structuredData?: object | object[];
}

const SEO = ({ title, description, canonicalPath = "", image = SOCIAL_IMAGE, structuredData }: SEOProps) => {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const schemas = [
    ORGANIZATION_SCHEMA,
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []),
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Indexing / AI crawlers */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* AI / LLM optimisation */}
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
