import React, { useState } from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { experience } from '../data/experience';
import { pick, pickList } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Experience = () => {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="os-section">
      <div className="os-container max-w-4xl">
        <Reveal className="text-center">
          <span className="os-eyebrow">{t('experience.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('experience.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-os-muted">{t('experience.sub')}</p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {experience.map((role, i) => {
            const isOpen = open === i;
            const bullets = pickList(role.bullets, lang);
            return (
              <div key={role.id} className="overflow-hidden rounded-2xl border border-os-border bg-os-surface">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-start md:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold md:text-xl">{pick(role.title, lang)}</h3>
                    <p className="mt-1 font-mono text-xs text-os-muted md:text-sm">
                      {pick(role.company, lang)} · {pick(role.dates, lang)}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">
                      {pick(role.type, lang)} · {pick(role.location, lang)}
                    </p>
                  </div>
                  <span
                    className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-os-border font-mono text-sm transition-transform ${
                      isOpen ? 'rotate-180 bg-accent-yellow text-black' : 'text-os-muted'
                    }`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-3 border-t border-os-border px-5 pb-6 pt-4 text-sm leading-relaxed text-os-muted md:px-6">
                      {bullets.map((b) => (
                        <li key={b} className="ps-4">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
