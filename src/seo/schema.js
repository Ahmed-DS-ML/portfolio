import { DATE_MODIFIED, OG_IMAGE, SITE_ORIGIN } from './paths.js';

const PERSON_ID = `${SITE_ORIGIN}/#person`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ahmed Ashraf',
    url: `${SITE_ORIGIN}/`,
    jobTitle: 'Data Scientist & AI Engineer',
    description:
      'Ahmed Ashraf is a data scientist and AI engineer who builds AI products that run real operations — TINDA, QUBE, Metron — in Arabic and English.',
    email: 'ahmed.datascince@gmail.com',
    telephone: '+201062798081',
    image: {
      '@type': 'ImageObject',
      url: OG_IMAGE,
      width: 800,
      height: 800,
    },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cairo',
        addressCountry: 'EG',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Deep Blue Startup Studios',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Cairo University — Faculty of Graduate Studies for Statistical Research',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Ain Shams University',
      },
    ],
    knowsLanguage: ['en', 'ar'],
    sameAs: [
      'https://www.linkedin.com/in/ahmed-datascince/',
      'https://github.com/Ahmed-DS-ML',
      'https://x.com/AhmedAshra31860',
      'https://www.kaggle.com/engahmedashraf',
    ],
    knowsAbout: [
      'AI Products',
      'Agentic Systems',
      'TINDA',
      'QUBE',
      'Industrial AI',
      'n8n',
      'RAG',
      'ERP Integration',
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: 'Ahmed Ashraf Portfolio',
    inLanguage: ['en', 'ar'],
    publisher: { '@id': PERSON_ID },
    dateModified: DATE_MODIFIED,
  };
}

export function profilePageSchema(url) {
  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profile`,
    url,
    name: 'Ahmed Ashraf — Data Scientist & AI Engineer',
    dateModified: DATE_MODIFIED,
    mainEntity: { '@id': PERSON_ID },
    inLanguage: url.includes('/ar') ? 'ar' : 'en',
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function webPageSchema({ url, name, description, lang }) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    dateModified: DATE_MODIFIED,
    inLanguage: lang === 'ar' ? 'ar' : 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function softwareSchema({ name, description, demo }) {
  const node = {
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    author: { '@id': PERSON_ID },
  };
  if (demo) node.url = demo;
  return node;
}

export function graph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
