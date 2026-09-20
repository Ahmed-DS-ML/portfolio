export const SITE_ORIGIN = 'https://portfolio.ahmed-n8n.cfd';
export const DATE_MODIFIED = '2026-09-05';
export const OG_IMAGE = `${SITE_ORIGIN}/images/profile.jpg`;
export const PROJECT_IDS = [
  'tinda',
  'qube',
  'metron',
  'cycle-time',
  'oee-platform',
  'ai-automation-platform',
];

export function langFromPath(pathname) {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
}

export function stripLang(pathname) {
  if (pathname === '/ar') return '/';
  if (pathname.startsWith('/ar/')) {
    const rest = pathname.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname || '/';
}

export function withLang(pathname, lang) {
  const bare = stripLang(pathname);
  if (lang === 'ar') {
    return bare === '/' ? '/ar' : `/ar${bare}`;
  }
  return bare;
}

export function homeHash(hash, lang) {
  const path = withLang('/', lang);
  const fragment = hash.startsWith('#') ? hash : `#${hash}`;
  return `${path}${fragment}`;
}

export function canonicalPath(pathname) {
  const path = pathname || '/';
  if (path === '/' || path === '/ar') {
    return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/ar`;
  }
  return `${SITE_ORIGIN}${path.replace(/\/$/, '')}`;
}

export function hreflangUrls(pathname) {
  const bare = stripLang(pathname);
  const enPath = withLang(bare, 'en');
  const arPath = withLang(bare, 'ar');
  return {
    en: canonicalPath(enPath),
    ar: canonicalPath(arPath),
    xDefault: canonicalPath(enPath),
  };
}

export function prerenderRoutes() {
  const homes = ['/', '/ar'];
  const projects = PROJECT_IDS.flatMap((id) => [`/project/${id}`, `/ar/project/${id}`]);
  return [...homes, ...projects];
}

export function distFileForRoute(route) {
  if (route === '/') return 'index.html';
  return `${route.replace(/^\//, '')}/index.html`;
}
