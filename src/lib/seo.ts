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
export const SITE_TAGLINE = "Premium Legal Services On Demand";
export const TWITTER_HANDLE = "@monogamy_law";

export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/social-images/social-1770788034077-GRAVITAS_PORTFOLIO_(Hi-Red_Banners).jpeg";

export const LOGO_URL =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/uploads/1770788009856-MONOGAMY_LOGO_PACK_AND_MEDIA_ASSETS.png";

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
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 200,
    height: 60,
  },
  description:
    "Monogamy is a premium legal services platform connecting individuals and businesses with vetted attorneys across Africa for a flat monthly subscription.",
  sameAs: [
    "https://www.linkedin.com/company/monogamylegal",
    "https://www.facebook.com/monogamylegal",
    "https://twitter.com/monogamy_law",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@monogamy.law",
  },
  areaServed: ["ZA", "NG", "KE"],
  foundingDate: "2024",
};

const webSite = {
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
    title: `${SITE_NAME} — ${SITE_TAGLINE} | From $19.99/month`,
    description:
      "Access top-rated attorneys across every practice area for $19.99/month. Vetted lawyers in South Africa, Nigeria, and Kenya available within 2 hours. No hourly billing.",
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
    title: `About Monogamy | Democratizing Legal Access in Africa`,
    description:
      "Monogamy was founded to democratize access to justice through technology. Learn our mission, values, and how we connect people with vetted attorneys across Africa.",
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
    title: `Practice Areas | Monogamy Legal Services`,
    description:
      "From family law and business law to criminal defense and estate planning — access expert attorneys across every legal practice area for $19.99/month.",
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
    title: `How It Works | Monogamy Legal Services`,
    description:
      "Get matched with a vetted attorney in 4 simple steps. Subscribe, describe your legal need, consult securely, and resolve your matter with confidence.",
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
    title: `Pricing Plans | Monogamy Legal Services — From $19.99/month`,
    description:
      "Simple, transparent legal subscription plans. Essential from $19.99/mo for individuals, Professional from $49.99/mo for SMEs, Enterprise from $129.99/mo for businesses. No surprises.",
    canonical: `${SITE_URL}/pricing`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/pricing`,
      name: "Monogamy Pricing Plans",
      description:
        "Choose a Monogamy subscription plan starting from $19.99/month. Plans available in USD, ZAR, NGN, and KES.",
      breadcrumb: breadcrumb([
        { name: "Pricing", url: `${SITE_URL}/pricing` },
      ]),
      mainEntity: {
        "@type": "ItemList",
        name: "Monogamy Subscription Plans",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Essential Plan",
            description:
              "2 consultations/month, document review, legal templates. From $19.99/month.",
            url: `${SITE_URL}/pricing`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Professional Plan",
            description:
              "5 priority consultations, faster response, custom document drafts. From $49.99/month.",
            url: `${SITE_URL}/pricing`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Enterprise Plan",
            description:
              "Unlimited consultations, dedicated account manager, team access. From $129.99/month.",
            url: `${SITE_URL}/pricing`,
          },
        ],
      },
    },
  },

  contact: {
    title: `Contact Monogamy | Get in Touch`,
    description:
      "Have questions about Monogamy? Contact our support team. Attorneys and law firms can reach us at partners@monogamy.law to join our network.",
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
    title: `FAQ | Frequently Asked Questions — Monogamy`,
    description:
      "Get answers about Monogamy's legal subscription service, attorney network, pricing plans, operating countries, and how attorney-client confidentiality works.",
    canonical: `${SITE_URL}/faq`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: `${SITE_URL}/faq`,
      name: "Monogamy — Frequently Asked Questions",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Monogamy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Monogamy is a premium legal services platform that connects you with an extensive network of top-rated attorneys across every practice area for a flat monthly subscription. We currently serve members in South Africa, Nigeria, and Kenya.",
          },
        },
        {
          "@type": "Question",
          name: "What subscription plans are available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer three plans: Essential ($19.99/month) for individuals and freelancers, Professional ($49.99/month) for SMEs and growing startups, and Enterprise ($129.99/month) for established businesses. Pricing is also available in ZAR, NGN, and KES.",
          },
        },
        {
          "@type": "Question",
          name: "How are attorneys vetted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every attorney in our network undergoes a rigorous vetting process including license verification, background checks, peer reviews, and client satisfaction monitoring. We only accept attorneys with strong track records and high ethical standards.",
          },
        },
        {
          "@type": "Question",
          name: "What practice areas do you cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We cover virtually every area of law including family law, business law, real estate, estate planning, criminal defense, employment law, personal injury, tax law, immigration, intellectual property, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Which countries do you operate in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Monogamy currently operates in South Africa, Nigeria, and Kenya. Our Professional and Enterprise plans include multi-country legal access for cross-border advisory within Africa.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. There are no long-term contracts or cancellation fees. You can cancel your membership at any time from your account settings.",
          },
        },
        {
          "@type": "Question",
          name: "Is my information kept confidential?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All communications between you and your attorney are protected by attorney-client privilege. Our platform uses bank-level encryption to protect your data and documents.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can I get matched with an attorney?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Essential members receive responses within 24–48 hours, Professional members within 12–24 hours, and Enterprise members receive same-day responses with priority queue access.",
          },
        },
      ],
    },
  },

  partners: {
    title: `Partner with Monogamy | Join Our Attorney Network in Africa`,
    description:
      "Lawyers and law firms: join Monogamy's network and get a steady pipeline of pre-qualified clients across South Africa, Nigeria, and Kenya. Free to start, scale as you grow.",
    canonical: `${SITE_URL}/partners`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE_URL}/partners`,
      name: "Partner with Monogamy — Lawyer Network",
      description:
        "Attorneys and law firms can join the Monogamy network to receive pre-qualified client leads, reduce overhead, and grow their practice across Africa.",
      breadcrumb: breadcrumb([
        { name: "Partners", url: `${SITE_URL}/partners` },
      ]),
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
    title: `The Monologue Podcast | Legal Insights by Monogamy`,
    description:
      "Stream The Monologue — Monogamy's podcast on legal services, AI in law, and access to justice across Africa. Available on Apple Podcasts and Spotify.",
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
