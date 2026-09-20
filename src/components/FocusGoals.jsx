import React from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { goals, studying } from '../data/learning';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Tag = ({ children, tone }) => {
  const styles =
    tone === 'live'
      ? 'border-accent-yellow/40 bg-accent-yellow/10 text-accent-yellow'
      : 'border-os-border bg-os-elevated text-os-muted';
  return (
    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${styles}`}>
      {children}
    </span>
  );
};

const FocusGoals = () => {
  const { t, lang } = useI18n();

  return (
    <section id="focus" className="os-section">
      <div className="os-container">
        <Reveal className="max-w-2xl">
          <span className="os-eyebrow">{t('focus.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('focus.title')}</h2>
          <p className="mt-4 text-os-muted">{t('focus.sub')}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-os-border bg-os-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold">{t('focus.studying')}</h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-os-muted">{t('focus.studyingHint')}</p>
            <ul className="mt-8 space-y-5">
              {studying.map((item) => (
                <li
                  key={pick(item.title, lang)}
                  className="flex items-start justify-between gap-4 border-b border-os-border pb-5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-display font-medium text-white">{pick(item.title, lang)}</p>
                    <p className="mt-1 text-sm text-os-muted">{pick(item.desc, lang)}</p>
                  </div>
                  <Tag tone={item.tone}>{pick(item.tag, lang)}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-2xl border border-os-border bg-os-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold">{t('focus.goals')}</h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-os-muted">{t('focus.goalsHint')}</p>
            <ul className="mt-8 space-y-5">
              {goals.map((item) => (
                <li
                  key={pick(item.title, lang)}
                  className="flex items-start justify-between gap-4 border-b border-os-border pb-5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-display font-medium text-white">{pick(item.title, lang)}</p>
                    <p className="mt-1 text-sm text-os-muted">{pick(item.desc, lang)}</p>
                  </div>
                  <Tag>{pick(item.tag, lang)}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FocusGoals;
