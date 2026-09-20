import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../hooks/useReveal.jsx';
import { testimonials } from '../data/testimonials';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Testimonials = () => {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="os-section">
      <div className="os-container max-w-4xl">
        <Reveal className="text-center">
          <span className="os-eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('testimonials.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-os-muted">{t('testimonials.sub')}</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-os-border bg-os-surface p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={item.id + lang}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent-yellow">
                  {t('testimonials.source')}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-os-text md:text-xl">“{pick(item.quote, lang)}”</p>
                <footer className="mt-8 border-t border-os-border pt-6">
                  <p className="font-display text-xl font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-os-muted">{pick(item.role, lang)}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-os-muted">
                    {pick(item.context, lang)}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border text-os-muted hover:border-accent-yellow hover:text-accent-yellow"
                aria-label={t('testimonials.prev')}
              >
                ←
              </button>
              <div className="flex gap-2">
                {testimonials.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-accent-yellow' : 'bg-os-border'}`}
                    aria-label={slide.name}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border text-os-muted hover:border-accent-yellow hover:text-accent-yellow"
                aria-label={t('testimonials.next')}
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
