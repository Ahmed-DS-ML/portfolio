import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nProvider.jsx';
import NeuralField from './NeuralField.jsx';

const Hero = () => {
  const { t, lang } = useI18n();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section id="home" className="relative flex min-h-[92dvh] items-center overflow-hidden pt-24">
      <NeuralField />
      <div className="pointer-events-none absolute inset-0 z-[1] tech-grid" aria-hidden="true" />

      <div className="os-container relative z-10 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="os-eyebrow">
                <span className="status-dot" />
                {t('hero.open')}
              </span>
              <button
                type="button"
                onClick={() => scrollTo('#recognition')}
                className="min-h-11 rounded-full border border-os-border bg-os-surface/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-os-muted transition hover:text-accent-yellow"
              >
                {t('hero.favikon')}
              </button>
            </div>

            <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent-yellow">
              {t('hero.alias')}
            </p>

            <h1 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.08] text-white">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="block"
                >
                  {t('hero.line1')}
                  {' '}
                  <br />
                  <span className="text-accent-yellow">{t('hero.line2')}</span>
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-os-muted">{t('hero.sub')}</p>
            <p className="mt-3 max-w-xl text-sm text-os-text/80">{t('hero.promise')}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={() => scrollTo('#platforms')} className="os-btn-primary min-h-11">
                {t('hero.ctaPrimary')}
              </button>
              <button type="button" onClick={() => scrollTo('#contact')} className="os-btn-secondary min-h-11">
                {t('hero.ctaSecondary')}
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 border-t border-os-border pt-8 font-mono text-xs text-os-muted">
              <span>{t('hero.role')}</span>
              <span>{t('hero.focus')}</span>
              <span className="text-accent-yellow">{t('hero.studio')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-os-border bg-os-surface">
              <img
                src="/images/profile.jpg"
                alt={t('hero.photoAlt')}
                className="aspect-[4/5] w-full object-cover object-top"
                width="640"
                height="800"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-os-bg via-os-bg/50 to-transparent p-5 pt-16">
                <p className="font-display text-xl font-semibold">{t('brand.name')}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-yellow">{t('hero.photoRole')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
