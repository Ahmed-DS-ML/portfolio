import React, { useEffect, useRef, useState } from 'react';
import { Reveal, useCountUp } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const KpiTile = ({ label, value, suffix, active }) => {
  const n = useCountUp(value, active);
  return (
    <div className="os-card p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-os-muted">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold text-os-text md:text-4xl">
        {n}
        <span className="text-accent-yellow">{suffix}</span>
      </p>
    </div>
  );
};

const Impact = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const kpis = t('impact.kpis');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="impact" className="os-section" ref={ref}>
      <div className="os-container">
        <Reveal>
          <span className="os-eyebrow">{t('impact.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('impact.title')}</h2>
          <p className="mt-4 max-w-2xl text-os-muted">{t('impact.sub')}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Array.isArray(kpis) ? kpis : []).map((kpi) => (
            <KpiTile key={kpi.label} {...kpi} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
