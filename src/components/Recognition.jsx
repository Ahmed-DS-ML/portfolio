import React from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Recognition = () => {
  const { t } = useI18n();
  return (
    <section id="recognition" className="os-section">
      <div className="os-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="os-eyebrow">{t('recognition.eyebrow')}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{t('recognition.title')}</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-yellow">{t('recognition.meta')}</p>
            <blockquote className="mt-6 space-y-4 text-os-muted">
              <p>{t('recognition.p1')}</p>
              <p>{t('recognition.p2')}</p>
              <p className="text-os-text">
                {t('recognition.p3')}
                <br />
                {t('recognition.p4')}
              </p>
            </blockquote>
            <a
              href="https://www.linkedin.com/in/ahmed-datascince/"
              target="_blank"
              rel="noopener noreferrer"
              className="os-btn-secondary mt-8 inline-flex min-h-11 text-sm"
            >
              {t('recognition.cta')}
            </a>
          </Reveal>

          <Reveal className="justify-self-center lg:justify-self-end">
            <figure className="os-card max-w-md overflow-hidden p-2">
              <img
                src="/images/achievements/favikon-creator-rewind-2025.png"
                alt={t('recognition.alt')}
                className="w-full rounded-xl"
                loading="lazy"
                width="640"
                height="640"
              />
              <figcaption className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-os-muted">
                {t('recognition.caption')}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
