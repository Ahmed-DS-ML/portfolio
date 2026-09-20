import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { pick, pickList } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Seo from './Seo.jsx';
import { canonicalPath, homeHash } from '../seo/paths.js';
import {
  breadcrumbSchema,
  graph,
  personSchema,
  softwareSchema,
  webPageSchema,
  websiteSchema,
} from '../seo/schema.js';

const Flow = ({ steps, lang }) => {
  const resolved = pickList(steps, lang);
  if (!resolved?.length) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {resolved.map((step, i) => (
        <React.Fragment key={`${step}-${i}`}>
          <span className="rounded-lg border border-os-border bg-os-code px-3 py-2 font-mono text-xs text-os-text">
            {step}
          </span>
          {i < resolved.length - 1 && <span className="font-mono text-accent-yellow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const Section = ({ label, children }) => (
  <section className="border-t border-os-border pt-10">
    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent-yellow">{label}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t, lang, localized } = useI18n();
  const [project, setProject] = useState(() => projects.find((p) => p.id === id) || null);

  useEffect(() => {
    let fromStorage = {};
    try {
      fromStorage = JSON.parse(localStorage.getItem('projectsData') || '{}') || {};
    } catch {
      fromStorage = {};
    }
    const found = fromStorage[id] || projects.find((p) => p.id === id);
    setProject(found || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="os-container flex min-h-[60vh] flex-col items-center justify-center py-24">
        <Seo
          title={t('detail.notFound')}
          description={t('detail.notFound')}
          pathname={location.pathname}
          lang={lang}
          noindex
        />
        <h1 className="font-display text-3xl">{t('detail.notFound')}</h1>
        <Link to={homeHash('#platforms', lang)} className="os-btn-primary mt-6">
          {t('detail.back')}
        </Link>
      </div>
    );
  }

  const title = pick(project.title, lang);
  const subtitle = pick(project.subtitle, lang);
  const role = pick(project.role, lang);
  const description = pick(project.description, lang);
  const pageTitle = `${title} — ${subtitle || t('seo.homeTitle')}`;
  const url = canonicalPath(location.pathname);
  const jsonLd = graph([
    personSchema(),
    websiteSchema(),
    webPageSchema({ url, name: pageTitle, description, lang }),
    breadcrumbSchema([
      { name: t('brand.name'), url: canonicalPath(localized('/')) },
      { name: title, url },
    ]),
    softwareSchema({ name: title, description, demo: project.demo }),
  ]);

  return (
    <article className="pb-24 pt-28">
      <Seo
        title={pageTitle}
        description={description}
        pathname={location.pathname}
        lang={lang}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="os-container max-w-5xl">
        <Link to={homeHash('#platforms', lang)} className="font-mono text-xs uppercase tracking-wider text-accent-yellow">
          ← {t('detail.back')}
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-os-muted">
            {pick(project.productType, lang) || pick(project.category, lang)} · {project.year}
            {role ? ` · ${role}` : ''}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-3 font-display text-xl text-accent-yellow md:text-2xl">{subtitle}</p>}
          {role && (
            <p className="mt-4 inline-flex rounded-full border border-accent-yellow/40 bg-accent-yellow/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-yellow">
              {t('detail.role')} · {role}
            </p>
          )}
          <p className="mt-5 max-w-3xl text-lg text-os-muted">{pick(project.description, lang)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="os-btn-primary text-sm">
                {t('detail.live')}
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="os-btn-secondary text-sm">
                {t('detail.github')}
              </a>
            )}
          </div>
        </header>

        {project.image && (
          <img
            src={project.image}
            alt={title}
            className="mt-12 w-full rounded-2xl border border-os-border object-cover object-top shadow-glow-sm"
            loading="lazy"
          />
        )}

        {pick(project.overview, lang) && (
          <Section label={t('detail.overview')}>
            <p className="leading-relaxed text-os-muted">{pick(project.overview, lang)}</p>
          </Section>
        )}

        {pick(project.problem, lang) && (
          <Section label={t('detail.problem')}>
            <p className="leading-relaxed text-os-muted">{pick(project.problem, lang)}</p>
          </Section>
        )}

        {pick(project.challenge, lang) && (
          <Section label={t('detail.challenge')}>
            <p className="leading-relaxed text-os-muted">{pick(project.challenge, lang)}</p>
          </Section>
        )}

        {pick(project.solution, lang) && (
          <Section label={t('detail.solution')}>
            <p className="leading-relaxed text-os-muted">{pick(project.solution, lang)}</p>
          </Section>
        )}

        {(project.architectureFlow || pick(project.architecture, lang)) && (
          <Section label={t('detail.architecture')}>
            {pick(project.architecture, lang) && (
              <p className="leading-relaxed text-os-muted">{pick(project.architecture, lang)}</p>
            )}
            <Flow steps={project.architectureFlow} lang={lang} />
          </Section>
        )}

        {pickList(project.agents, lang).length > 0 && (
          <Section label={t('detail.agents')}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {pickList(project.agents, lang).map((a) => (
                <li key={a} className="rounded-xl border border-os-border bg-os-surface px-4 py-3 font-mono text-sm text-os-muted">
                  <span className="me-2 text-accent-yellow">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {pickList(project.businessFlow, lang).length > 0 && (
          <Section label={t('detail.businessFlow')}>
            <p className="mb-2 text-sm text-os-muted">{t('detail.businessFlowHint')}</p>
            <Flow steps={project.businessFlow} lang={lang} />
          </Section>
        )}

        {pick(project.implementation, lang) && (
          <Section label={t('detail.implementation')}>
            <p className="leading-relaxed text-os-muted">{pick(project.implementation, lang)}</p>
          </Section>
        )}

        {pickList(project.capabilities, lang).length > 0 && (
          <Section label={t('detail.capabilities')}>
            <div className="flex flex-wrap gap-2">
              {pickList(project.capabilities, lang).map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-os-border bg-os-code px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-os-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>
        )}

        {pick(project.challenges, lang) && (
          <Section label={t('detail.challenges')}>
            <p className="leading-relaxed text-os-muted">{pick(project.challenges, lang)}</p>
          </Section>
        )}

        {pick(project.lessons, lang) && (
          <Section label={t('detail.lessons')}>
            <p className="leading-relaxed text-os-muted">{pick(project.lessons, lang)}</p>
          </Section>
        )}

        {(pick(project.impact, lang) || pick(project.businessResult, lang)) && (
          <Section label={t('detail.impact')}>
            <p className="leading-relaxed text-os-muted">{pick(project.impact, lang) || pick(project.businessResult, lang)}</p>
          </Section>
        )}

        {project.gallery?.length > 0 && (
          <Section label={t('detail.gallery')}>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src) => (
                <img key={src} src={src} alt={`${title}`} className="w-full rounded-xl border border-os-border object-cover" loading="lazy" />
              ))}
            </div>
          </Section>
        )}

        {project.technologies?.length > 0 && (
          <Section label={t('detail.technology')}>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-accent-yellow/30 bg-accent-yellow/5 px-3 py-1.5 font-mono text-[11px] text-accent-yellow"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>
        )}

        {pick(project.future, lang) && (
          <Section label={t('detail.future')}>
            <p className="leading-relaxed text-os-muted">{pick(project.future, lang)}</p>
          </Section>
        )}
      </div>
    </article>
  );
};

export default ProjectDetail;
