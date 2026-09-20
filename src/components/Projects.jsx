import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../hooks/useReveal.jsx';
import { projects } from '../data/projects';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

const FILTERS = [
  { id: 'all', labelKey: 'projects.filterAll' },
  { id: 'product', labelKey: 'projects.filterProduct' },
  { id: 'agentic', labelKey: 'projects.filterAgentic' },
  { id: 'industrial', labelKey: 'projects.filterIndustrial' },
];

const JourneyDiagram = ({ steps, lang, label }) => (
  <div className="flex aspect-[4/3] flex-col justify-center bg-os-code p-6">
    <p className="font-mono text-[10px] uppercase tracking-wider text-accent-yellow">{label}</p>
    <ol className="mt-4 space-y-3">
      {steps.map((step, i) => (
        <li key={pick(step, lang)} className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-yellow/40 font-mono text-xs text-accent-yellow">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-sm text-os-text">{pick(step, lang)}</span>
        </li>
      ))}
    </ol>
  </div>
);

const ProjectMedia = ({ project, lang, journeyLabel }) => {
  if (project.journeyOnly || !project.image) {
    return <JourneyDiagram steps={project.architectureFlow} lang={lang} label={journeyLabel} />;
  }
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-os-code">
      <img
        src={project.image}
        alt={pick(project.title, lang)}
        className="h-full w-full object-cover object-top grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-os-bg/85 via-transparent to-transparent" />
    </div>
  );
};

const persist = (project) => {
  let existing = {};
  try {
    existing = JSON.parse(localStorage.getItem('projectsData') || '{}') || {};
  } catch {
    existing = {};
  }
  localStorage.setItem('projectsData', JSON.stringify({ ...existing, [project.id]: project }));
};

const Card = ({ project, lang, t, featured, localized }) => (
  <Link
    to={localized(`/project/${project.id}`)}
    onClick={() => persist(project)}
    className={`os-card group block overflow-hidden ${featured ? 'h-full' : ''}`}
  >
    <div className="relative">
      <ProjectMedia project={project} lang={lang} journeyLabel={t('featured.journey')} />
      <div className="absolute start-4 top-4 z-10 flex flex-wrap gap-2">
        <span className="rounded-md border border-os-border bg-os-bg/85 px-2 py-1 font-mono text-[11px] text-accent-yellow backdrop-blur">
          {project.year}
        </span>
        {project.demo && (
          <span className="rounded-md border border-accent-yellow/40 bg-accent-yellow px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-black">
            {t('featured.live')}
          </span>
        )}
        {pick(project.role, lang) && (
          <span className="rounded-md border border-os-border bg-os-bg/85 px-2 py-1 font-mono text-[11px] text-os-text backdrop-blur">
            {pick(project.role, lang)}
          </span>
        )}
      </div>
    </div>
    <div className="p-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-os-muted">
        {pick(project.productType, lang)}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold transition group-hover:text-accent-yellow md:text-2xl">
        {pick(project.title, lang)}
        {pick(project.subtitle, lang) && (
          <span className="mt-1 block text-base font-normal text-os-muted">{pick(project.subtitle, lang)}</span>
        )}
      </h3>
      <p className="mt-3 text-sm text-os-muted line-clamp-3">{pick(project.description, lang)}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="font-mono text-xs text-os-muted">{(project.technologies || []).slice(0, 4).join(' · ')}</p>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-os-border text-os-muted transition-[color,background-color,border-color] duration-300 ease-out group-hover:border-accent-yellow group-hover:bg-accent-yellow group-hover:text-black">
          →
        </span>
      </div>
    </div>
  </Link>
);

const Projects = () => {
  const { t, lang, localized } = useI18n();
  const [filter, setFilter] = useState('all');
  const featured = useMemo(
    () => projects.filter((p) => p.featured).sort((a, b) => a.featuredRank - b.featuredRank),
    []
  );
  const rest = useMemo(() => {
    if (filter === 'all') return projects.filter((p) => !p.featured);
    return projects.filter((p) => p.filter === filter);
  }, [filter]);

  const lead = featured[0];
  const side = featured.slice(1);

  return (
    <section id="platforms" className="os-section">
      <div className="os-container">
        <Reveal className="max-w-2xl">
          <span className="os-eyebrow">{t('featured.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('featured.title')}</h2>
          <p className="mt-4 text-os-muted">{t('featured.sub')}</p>
        </Reveal>

        {lead && (
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Card project={lead} lang={lang} t={t} featured localized={localized} />
            </Reveal>
            <div className="grid gap-5 lg:col-span-5">
              {side.map((project) => (
                <Reveal key={project.id}>
                  <Card project={project} lang={lang} t={t} featured localized={localized} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="os-eyebrow">{t('projects.eyebrow')}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{t('projects.title')}</h2>
            <p className="mt-4 text-os-muted">{t('projects.sub')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`min-h-11 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
                  filter === f.id
                    ? 'border-accent-yellow bg-accent-yellow text-black'
                    : 'border-os-border text-os-muted hover:border-accent-yellow/50 hover:text-os-text'
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <Reveal key={project.id}>
              <Card project={project} lang={lang} t={t} localized={localized} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
