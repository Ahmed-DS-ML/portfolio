import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../hooks/useReveal.jsx';
import { achievements } from '../data/achievements';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

function frameWellClass(frame) {
  if (frame === 'wide') {
    return 'relative h-[min(58vh,520px)] w-full';
  }
  if (frame === 'document') {
    return 'relative mx-auto h-[min(78vh,760px)] w-full max-w-xl overflow-x-hidden overflow-y-auto px-4 py-5 md:px-6 [scrollbar-width:thin] [scrollbar-color:#222_transparent]';
  }
  return 'relative mx-auto h-[min(72vh,680px)] w-full max-w-xl';
}

function frameImageClass(frame) {
  if (frame === 'document') {
    return 'relative mx-auto block h-auto w-full rounded-md';
  }
  return 'absolute inset-0 m-auto h-full w-full object-contain object-center p-5 md:p-7';
}

const AchievementsGallery = () => {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const item = achievements[index];
  const frame = item.frame || 'portrait';
  const chips = t('achievements.chips');
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!playing || reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % achievements.length), 4500);
    return () => clearInterval(id);
  }, [playing, reduced]);

  const go = (dir) => {
    setPlaying(false);
    setIndex((i) => (i + dir + achievements.length) % achievements.length);
  };

  return (
    <section id="achievements" className="os-section">
      <div className="os-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="os-eyebrow">{t('achievements.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('achievements.title')}</h2>
          <p className="mt-4 text-os-muted">{t('achievements.sub')}</p>
        </Reveal>

        <Reveal className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-os-border bg-os-surface shadow-glow-sm">
            <div className="relative bg-[radial-gradient(ellipse_at_center,rgba(255,229,0,0.06),transparent_62%),linear-gradient(180deg,#0d0d0d_0%,#050505_100%)]">
              <div className={frameWellClass(frame)}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={item.media}
                    src={item.media}
                    alt={pick(item.title, lang)}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className={frameImageClass(frame)}
                  />
                </AnimatePresence>
              </div>

              <div className="pointer-events-none absolute start-4 top-4 flex gap-2">
                <span className="rounded-md border border-os-border bg-os-bg/85 px-2 py-1 font-mono text-[11px] text-accent-yellow backdrop-blur">
                  {pick(item.tag, lang)}
                </span>
                <span className="rounded-md border border-os-border bg-os-bg/85 px-2 py-1 font-mono text-[11px] text-os-muted backdrop-blur">
                  {String(index + 1).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                className="absolute end-4 top-4 min-h-11 rounded-full border border-os-border bg-os-bg/85 px-3 py-1 font-mono text-[11px] text-os-muted backdrop-blur hover:text-accent-yellow"
                aria-label={playing ? t('achievements.pause') : t('achievements.play')}
              >
                {playing ? t('achievements.pause') : t('achievements.play')}
              </button>
            </div>

            <div className="border-t border-os-border px-6 py-5 md:px-8">
              <h3 className="font-display text-2xl font-semibold md:text-3xl">{pick(item.title, lang)}</h3>
              <p className="mt-2 max-w-3xl text-sm text-os-muted md:text-base">{pick(item.description, lang)}</p>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-os-border px-4 py-4 md:px-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border font-mono text-os-muted transition hover:border-accent-yellow hover:text-accent-yellow"
                aria-label={t('achievements.prev')}
              >
                ←
              </button>
              <div className="flex flex-1 justify-center gap-2 overflow-x-auto py-1">
                {achievements.map((slide, i) => (
                  <button
                    key={slide.media}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setIndex(i);
                    }}
                    className="flex h-11 min-w-11 items-center justify-center"
                    aria-label={pick(slide.title, lang)}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <span
                      className={`block h-1.5 w-6 rounded-full transition ${
                        i === index ? 'bg-accent-yellow' : 'bg-os-border hover:bg-os-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border font-mono text-os-muted transition hover:border-accent-yellow hover:text-accent-yellow"
                aria-label={t('achievements.next')}
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(Array.isArray(chips) ? chips : []).map((chip) => (
              <div
                key={chip}
                className="rounded-xl border border-os-border bg-os-surface px-3 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-os-muted"
              >
                {chip}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AchievementsGallery;
