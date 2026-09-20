import React from 'react';
import { Helmet } from 'react-helmet-async';
import { canonicalPath, hreflangUrls, OG_IMAGE, SITE_ORIGIN } from '../seo/paths.js';

const Seo = ({
  title,
  description,
  pathname,
  lang = 'en',
  type = 'website',
  image = OG_IMAGE,
  jsonLd,
  noindex = false,
}) => {
  const canonical = canonicalPath(pathname);
  const alts = hreflangUrls(pathname);
  const ogLocale = lang === 'ar' ? 'ar_EG' : 'en_US';
  const ogAlt = lang === 'ar' ? 'en_US' : 'ar_EG';

  return (
    <Helmet htmlAttributes={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Ahmed Ashraf" />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={alts.en} />
      <link rel="alternate" hrefLang="ar" href={alts.ar} />
      <link rel="alternate" hrefLang="x-default" href={alts.xDefault} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ahmed Ashraf — Industrial AI" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="800" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="AhmedAshra31860" />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
      <link rel="author" href={`${SITE_ORIGIN}/`} />
    </Helmet>
  );
};

export default Seo;
