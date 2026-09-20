import React from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { expertise } from '../data/expertise';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Expertise = () => {
  const { t, lang } = useI18n();

  return (
    <section id="expertise" className="os-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent" />
      <div className="os-container">
        <Reveal className="max-w-2xl">
          <span className="os-eyebrow">{t('expertise.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('expertise.title')}</h2>
          <p className="mt-4 text-os-muted">{t('expertise.sub')}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {expertise.map((s, i) => (
            <Reveal
              key={s.n}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-os-border bg-os-surface p-6 transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent-yellow/40 hover:shadow-glow-sm md:p-7"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="pointer-events-none absolute -end-1 -top-3 select-none font-display text-8xl font-bold leading-none text-white/[0.035]">
                {s.n}
              </span>
              <div className="mb-3 h-px w-8 bg-accent-yellow transition-all duration-300 group-hover:w-14" />
              <h3 className="font-display text-xl font-semibold leading-tight text-white">
                {pick(s.title, lang)}
                <span className="mt-1 block text-base font-normal text-os-muted">{pick(s.line2, lang)}</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-os-muted">{pick(s.desc, lang)}</p>
              <div className="relative mt-auto pt-6">
                <div className="flex flex-wrap gap-2">
                  {s.signals.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-os-border bg-os-code px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-os-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 border-t border-os-border pt-4 font-mono text-[11px] text-os-muted">
                  {pick(s.outcome, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
