/**
 * SEO configuration for every route in the Monogamy web application.
 *
 * Each entry supplies the minimal metadata required for:
 *  - Google Search (technical + semantic SEO)
 *  - AI search engines (Google AI Mode, Gemini, Perplexity, ChatGPT, Copilot, NotebookLM)
 *  - Social sharing (Open Graph + Twitter Card)
 *  - Structured data (JSON-LD)
 */

export const SITE_NAME = "Monogamy";
export const SITE_URL = "https://monogamy.legal";
export const SITE_TAGLINE = "Your on-demand legal team — without the overhead.";
export const TWITTER_HANDLE = "@monogamy_law";
export const DEFAULT_LOCALE = "en_ZA";

export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/social-images/social-1770788034077-GRAVITAS_PORTFOLIO_(Hi-Red_Banners).jpeg";

export const LOGO_URL =
  "https://monogamy.legal/monogamyappicon.png";

/** Canonical page metadata used by the SEO component. */
export interface PageSEO {
  /** <title> content — unique per page, ideally 50–60 chars */
  title: string;
  /** <meta name="description"> — unique per page, 140–160 chars */
  description: string;
  /** Absolute canonical URL for the page */
  canonical: string;
  /** Open Graph type — defaults to "website" */
  ogType?: "website" | "article";
  /** Override the default OG image for this page */
  ogImage?: string;
  /** JSON-LD structured data object(s) — injected as-is */
  jsonLd?: object | object[];
  /** Set true for pages that must not be indexed (e.g. 404) */
  noIndex?: boolean;
}

// ─── JSON-LD helpers ─────────────────────────────────────────────────────────

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Monogamy is an on-demand legal services platform in South Africa, Nigeria, and Kenya. We connect people and businesses with vetted attorneys across major practice areas.",
  sameAs: [
    "https://facebook.com/monogamy.legal",
    "https://linkedin.com/company/monogamylegal",
    "https://whatsapp.com/channel/0029Vb7wLlMI7BeLb4viJx37",
  ],
};

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Global SEO schema injected on every page by the reusable SEO component.
export const GLOBAL_STRUCTURED_DATA = [organization, webSite];

function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  };
}

// ─── Per-page SEO config ──────────────────────────────────────────────────────

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: "Monogamy: Your on-demand legal team — without the overhead.",
    description:
      "Your on-demand legal team — without the overhead. Connect with vetted attorneys across every practice area. Available in South Africa, Nigeria and Kenya.",
    canonical: SITE_URL,
    jsonLd: [
      { "@context": "https://schema.org", ...organization },
      { "@context": "https://schema.org", ...webSite },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${SITE_NAME} — ${SITE_TAGLINE}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description:
          "Access top-rated attorneys across every practice area for $19.99/month.",
      },
    ],
  },

  about: {
    title: "About us | Monogamy",
    description:
      "Monogamy connects you with high-intent, pre-qualified clients across every practice area — so you can spend less on marketing and more on winning cases.",
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      { "@context": "https://schema.org", ...organization },
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About Monogamy",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: breadcrumb([{ name: "About", url: `${SITE_URL}/about` }]),
      },
    ],
  },

  practiceAreas: {
    title: "Practice areas | Monogamy",
    description:
      "Our network of 1000+ thoroughly vetted attorneys and law firms covers every major practice area from family law and estate planning to criminal defense, tax law and everything in between.",
    canonical: `${SITE_URL}/practice-areas`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/practice-areas`,
      name: "Practice Areas — Monogamy",
      description:
        "Explore legal practice areas covered by Monogamy: family law, business law, real estate, estate planning, criminal defense, employment law, personal injury, and tax law.",
      breadcrumb: breadcrumb([
        { name: "Practice Areas", url: `${SITE_URL}/practice-areas` },
      ]),
    },
  },

  howItWorks: {
    title: "How it works | Monogamy",
    description:
      "Access world-class legal counsel in minutes with our simple pricing options designed to suit every budget. From signup to resolution, we've made the entire process seamless.",
    canonical: `${SITE_URL}/how-it-works`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Get Legal Help with Monogamy",
      description:
        "Four simple steps to connect with a vetted attorney and resolve your legal matter.",
      url: `${SITE_URL}/how-it-works`,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Create Your Account",
          text: "Sign up for Monogamy in under 2 minutes. Choose from Essential ($19.99/mo), Professional ($49.99/mo), or Enterprise ($129.99/mo) plan.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Describe Your Legal Need",
          text: "Tell us about your situation — contract review, custody matter, or business formation — and our intelligent matching system finds the best attorney.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Connect & Consult",
          text: "Schedule a consultation with your matched attorney via our secure, encrypted platform. Share documents and communicate safely.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Resolve With Confidence",
          text: "Work with your attorney to achieve the best possible outcome. Track progress and communicate until your matter is resolved.",
        },
      ],
    },
  },

  pricing: {
    title: "Pricing plans & features | Monogamy",
    description:
      "Get started with any pricing option that suits you, from as little as $19.99 per month. No surprises. No hourly billing. Just the legal muscle you need, exactly when you need it.",
    canonical: `${SITE_URL}/pricing`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Monogamy Legal Subscription Plans",
      serviceType: "On-demand legal services membership",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["South Africa", "Nigeria", "Kenya"],
      url: `${SITE_URL}/pricing`,
      description:
        "Subscription plans with vetted attorneys across major practice areas for individuals, startups, and enterprises.",
    },
  },

  contact: {
    title: `Contact Monogamy | Get in Touch`,
    description:
      "Whether you're a prospective member, an attorney looking to join our network, or have a general inquiry — we're here to help.",
    canonical: `${SITE_URL}/contact`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${SITE_URL}/contact`,
      name: "Contact Monogamy",
      breadcrumb: breadcrumb([
        { name: "Contact", url: `${SITE_URL}/contact` },
      ]),
    },
  },

  faq: {
    title: "Frequently asked questions | Monogamy",
    description:
      "Everything you need to know about Monogamy and how it works.",
    canonical: `${SITE_URL}/faq`,
    jsonLd: undefined,
  },

  partners: {
    title: "Join our partner network | Monogamy",
    description:
      "Monogamy connects you with high-intent, pre-qualified clients across every practice area — so you can spend less on marketing and more on winning cases.",
    canonical: `${SITE_URL}/partners`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Monogamy Partner Network for Attorneys",
      serviceType: "Client acquisition and legal marketplace service",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/partners`,
      description:
        "Monogamy connects attorneys and law firms with high-intent, pre-qualified clients across major practice areas in Africa.",
      areaServed: ["South Africa", "Nigeria", "Kenya"],
    },
  },

  caseStudyRedemption: {
    title: `Case Study: Redemption Law Group | Monogamy`,
    description:
      "Discover how Redemption Law Group scaled their client base and reduced overhead by partnering with the Monogamy legal subscription platform.",
    canonical: `${SITE_URL}/case-study/redemption`,
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Case Study: Redemption Law Group",
      description:
        "How Redemption Law Group scaled their practice using the Monogamy platform.",
      url: `${SITE_URL}/case-study/redemption`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: breadcrumb([
        { name: "Case Studies", url: `${SITE_URL}/partners` },
        {
          name: "Redemption Law Group",
          url: `${SITE_URL}/case-study/redemption`,
        },
      ]),
    },
  },


  knowledgeCenter: {
    title: `Knowledge Center | Monogamy LegalTech Intelligence`,
    description:
      "Explore Monogamy's Knowledge Center with legaltech documentation, product roadmap updates, market insights, and jurisdiction-specific guidance for the US, South Africa, and Nigeria.",
    canonical: `${SITE_URL}/knowledge-center`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/knowledge-center`,
      name: "Monogamy Knowledge Center",
      breadcrumb: breadcrumb([{ name: "Knowledge Center", url: `${SITE_URL}/knowledge-center` }]),
    },
  },

  irelandLanding: {
    title: `Monogamy Ireland | Founding Members Waiting List`,
    description:
      "Join Monogamy's founding members waiting list in Ireland. Clients and attorneys get early access and launch updates before May 2026.",
    canonical: `${SITE_URL}/ie`,
  },

  ghanaLanding: {
    title: `Monogamy Ghana | Founding Members Waiting List`,
    description:
      "Join Monogamy's founding members waiting list in Ghana. Clients and attorneys get early access and launch updates before May 2026.",
    canonical: `${SITE_URL}/gh`,
  },

  kenyaLanding: {
    title: `Monogamy Kenya | Founding Members Waiting List`,
    description:
      "Join Monogamy's founding members waiting list in Kenya. Clients and attorneys get early access and launch updates before May 2026.",
    canonical: `${SITE_URL}/ke`,
  },

  start: {
    title: `Get Started | Join Monogamy Today`,
    description:
      "Start your Monogamy membership today. Get instant access to top-rated attorneys for just $19.99/month. No contracts, cancel anytime.",
    canonical: `${SITE_URL}/start`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/start`,
      name: "Get Started with Monogamy",
      breadcrumb: breadcrumb([{ name: "Get Started", url: `${SITE_URL}/start` }]),
    },
  },

  stream: {
    title: "The Monologue: Law. Insights. Perspective - Curated | Monogamy",
    description:
      "Listen to the latest episodes of Monogamy's original audio commentary series on legal access, innovation and practice across Africa.",
    canonical: `${SITE_URL}/stream`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "PodcastSeries",
      name: "The Monologue",
      description:
        "The Monologue is Monogamy's podcast series covering legal services trends, AI disruption in law, and access to justice across Africa.",
      url: `${SITE_URL}/stream`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      webFeed: `${SITE_URL}/stream`,
    },
  },

  privacy: {
    title: `Privacy Policy | Monogamy`,
    description:
      "Read Monogamy's privacy policy. Learn how we collect, use, and protect your personal information when you use our legal subscription platform.",
    canonical: `${SITE_URL}/privacy`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/privacy`,
      name: "Monogamy Privacy Policy",
      breadcrumb: breadcrumb([
        { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
      ]),
    },
  },

  terms: {
    title: `Terms of Service | Monogamy`,
    description:
      "Read Monogamy's terms of service. Understand your rights and obligations when using our legal subscription platform.",
    canonical: `${SITE_URL}/terms`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/terms`,
      name: "Monogamy Terms of Service",
      breadcrumb: breadcrumb([
        { name: "Terms of Service", url: `${SITE_URL}/terms` },
      ]),
    },
  },

  notFound: {
    title: `Page Not Found | Monogamy`,
    description: "The page you are looking for could not be found.",
    canonical: SITE_URL,
    noIndex: true,
  },
};
