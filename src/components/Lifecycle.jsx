import React from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Lifecycle = () => {
  const { t } = useI18n();
  const steps = t('lifecycle.steps');

  return (
    <section id="lifecycle" className="os-section">
      <div className="os-container">
        <Reveal className="max-w-2xl">
          <span className="os-eyebrow">{t('lifecycle.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('lifecycle.title')}</h2>
          <p className="mt-4 text-os-muted">{t('lifecycle.sub')}</p>
        </Reveal>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(Array.isArray(steps) ? steps : []).map((step, i) => (
            <Reveal key={step} className="rounded-2xl border border-os-border bg-os-surface p-4">
              <p className="font-mono text-[11px] text-accent-yellow">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 font-display text-sm font-medium leading-snug md:text-base">{step}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Lifecycle;
