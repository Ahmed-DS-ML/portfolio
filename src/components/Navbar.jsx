import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { homeHash, stripLang, withLang } from '../seo/paths.js';

const NAV = [
  { key: 'work', href: '#platforms' },
  { key: 'proof', href: '#experience' },
  { key: 'learning', href: '#focus' },
  { key: 'contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = stripLang(location.pathname) === '/';
  const { t, lang, setLang, dir, localized } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    if (!isHome) {
      window.location.href = homeHash(href, lang);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-os-border bg-os-bg/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="os-container flex h-16 items-center justify-between md:h-20">
        <Link to={localized('/')} className="group flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-semibold tracking-tight text-os-text md:text-xl">
            {t('brand.name')}
          </span>
          <span className="hidden font-mono text-xs text-accent-yellow sm:inline">{t('brand.mark')}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="min-h-11 font-mono text-xs uppercase tracking-wider text-os-muted transition-colors hover:text-os-text"
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="inline-flex rounded-full border border-os-border bg-os-code p-0.5"
            role="group"
            aria-label={t('nav.langSwitch')}
          >
            <Link
              to={withLang(location.pathname, 'en') + location.hash}
              className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-[11px] ${
                lang === 'en' ? 'bg-accent-yellow text-black' : 'text-os-muted'
              }`}
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              {t('nav.langEn')}
            </Link>
            <Link
              to={withLang(location.pathname, 'ar') + location.hash}
              className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-[11px] ${
                lang === 'ar' ? 'bg-accent-yellow text-black' : 'text-os-muted'
              }`}
              aria-pressed={lang === 'ar'}
              onClick={() => setLang('ar')}
            >
              {t('nav.langAr')}
            </Link>
          </div>
          <button type="button" onClick={() => go('#contact')} className="os-btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
            {t('nav.cta')}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-os-border text-os-text lg:hidden"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-lg">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="fixed inset-0 top-16 z-40 bg-os-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="os-container flex flex-col gap-2 py-8">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.href}
                  type="button"
                  initial={reduced ? false : { opacity: 0, x: dir === 'rtl' ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(item.href)}
                  className="min-h-11 rounded-xl border border-os-border bg-os-surface px-4 py-4 text-start font-display text-xl"
                >
                  {t(`nav.${item.key}`)}
                </motion.button>
              ))}
              <button type="button" onClick={() => go('#contact')} className="os-btn-primary mt-4 min-h-11">
                {t('nav.cta')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
