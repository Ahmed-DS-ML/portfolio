import React, { useEffect, useRef, useState } from 'react';
import { Reveal, useCountUp } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const BOOT_LINES = [
  '$ systems boot --profile product-ai',
  '[ok] loading TINDA journeys…',
  '[ok] connecting QUBE commerce flows…',
  '[ok] metron edge: OEE · cycle_time · downtime',
  '[ok] agent runtime: n8n + LLM online',
  '[ok] ar/en ux layer ready',
  'ahmed@systems:~$ products.ready()',
];

const Counter = ({ to, label, active }) => {
  const n = useCountUp(to, active);
  return (
    <div className="rounded-xl border border-os-border bg-os-elevated p-4">
      <p className="font-display text-3xl font-semibold text-accent-yellow">{n}+</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-os-muted">{label}</p>
    </div>
  );
};

const About = () => {
  const { t } = useI18n();
  const termRef = useRef(null);
  const [typed, setTyped] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [countersOn, setCountersOn] = useState(false);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          setCountersOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || lineIdx >= BOOT_LINES.length) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(BOOT_LINES.join('\n'));
      setLineIdx(BOOT_LINES.length);
      return undefined;
    }

    const line = BOOT_LINES[lineIdx];
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped((prev) => {
        const parts = prev.split('\n').filter(Boolean);
        if (parts.length === lineIdx) parts.push('');
        parts[lineIdx] = line.slice(0, i);
        return parts.join('\n');
      });
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setLineIdx((v) => v + 1), 280);
      }
    }, 28 + Math.random() * 24);

    return () => clearInterval(id);
  }, [started, lineIdx]);

  return (
    <section id="mission" className="os-section">
      <div className="os-container grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="os-eyebrow">{t('about.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{t('about.title')}</h2>
          <h3 className="mt-8 font-display text-xl font-semibold text-white">{t('seo.whoHeading')}</h3>
          <p className="mt-3 text-os-muted">{t('seo.whoBody')}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">{t('seo.updated')}</p>
          <p className="mt-5 text-os-muted">{t('about.p1')}</p>
          <p className="mt-4 text-os-muted">{t('about.p2')}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Counter to={500} label={t('about.commits')} active={countersOn} />
            <Counter to={15} label={t('about.systems')} active={countersOn} />
          </div>
        </Reveal>

        <div ref={termRef}>
          <div className="overflow-hidden rounded-2xl border border-accent-yellow/20 bg-[#0D0D0D] shadow-glow">
            <div className="flex items-center gap-2 border-b border-os-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ms-3 font-mono text-xs text-os-muted">ahmed@systems: ~/portfolio</span>
            </div>
            <pre className="min-h-[280px] whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-[#c8d4e8]">
              {typed}
              <span className="ms-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent-yellow animate-blink" />
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
