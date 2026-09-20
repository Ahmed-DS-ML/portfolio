import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ar } from './ar';
import { en } from './en';
import { langFromPath, withLang } from '../seo/paths.js';

const STORAGE_KEY = 'aa-lang';

function dictFor(lang) {
  return lang === 'ar' ? ar : en;
}

function resolve(dict, path) {
  const value = path.split('.').reduce((acc, key) => (acc != null && acc[key] != null ? acc[key] : null), dict);
  return value ?? path;
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(location.pathname);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  const setLang = useCallback(
    (next) => {
      const dest = withLang(location.pathname, next);
      if (dest !== location.pathname) {
        navigate(`${dest}${location.hash}`);
      }
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    },
    [location.pathname, location.hash, navigate]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const t = useCallback((path) => resolve(dictFor(lang), path), [lang]);

  const value = useMemo(
    () => ({
      lang,
      dir,
      setLang,
      toggleLang,
      t,
      localized: (pathname) => withLang(pathname, lang),
    }),
    [lang, dir, setLang, toggleLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
