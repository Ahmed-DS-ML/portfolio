import React, { useState } from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { certifications, education } from '../data/education';
import { pick } from '../i18n/pick';
import { useI18n } from '../i18n/I18nProvider.jsx';

function isExpandable(item) {
  return Boolean(item.research || (item.featured && item.featured.length));
}

const CourseChips = ({ courses, lang, openCode, onToggle }) => (
  <div className="flex flex-wrap gap-2">
    {courses.map((course) => {
      const active = openCode === course.code;
      return (
        <button
          key={course.code}
          type="button"
          aria-expanded={active}
          onClick={() => onToggle(course.code)}
          className={`rounded-md border px-3 py-2 text-start text-xs leading-snug transition ${
            active
              ? 'border-accent-yellow/45 bg-accent-yellow/10 text-white'
              : 'border-os-border bg-os-code text-os-muted hover:border-accent-yellow/40'
          }`}
        >
          <span className="me-2 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">{course.code}</span>
          {pick(course.title, lang)}
        </button>
      );
    })}
  </div>
);

const DegreePanel = ({ item, lang, t }) => {
  const [openCode, setOpenCode] = useState(null);
  const featured = item.featured || [];
  const core = featured.filter((c) => c.kind === 'core');
  const electives = featured.filter((c) => c.kind === 'elective');
  const openCourse = featured.find((c) => c.code === openCode);
  const research = item.research;

  const toggleCourse = (code) => {
    setOpenCode((current) => (current === code ? null : code));
  };

  return (
    <div className="space-y-6 border-t border-os-border px-5 pb-6 pt-5 md:px-6">
      {research ? (
        <div className="rounded-xl border border-accent-yellow/25 bg-os-code/60 p-4 md:p-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent-yellow">{t('education.research')}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h4 className="font-display text-base font-semibold text-white md:text-lg">{pick(research.title, lang)}</h4>
            <span className="rounded-md border border-accent-yellow/40 bg-accent-yellow/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-yellow">
              {t('education.plannedThesis')}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-os-muted">{pick(research.blurb, lang)}</p>
        </div>
      ) : null}

      {core.length ? (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-os-muted">{t('education.featured')}</p>
          <div className="mt-3">
            <CourseChips courses={core} lang={lang} openCode={openCode} onToggle={toggleCourse} />
          </div>
        </div>
      ) : null}

      {electives.length ? (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-os-muted">{t('education.electives')}</p>
          <div className="mt-3">
            <CourseChips courses={electives} lang={lang} openCode={openCode} onToggle={toggleCourse} />
          </div>
        </div>
      ) : null}

      {openCourse ? (
        <p className="border-s-2 border-accent-yellow/50 ps-3 text-sm leading-relaxed text-os-muted">
          <span className="me-2 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">{openCourse.code}</span>
          {pick(openCourse.blurb, lang)}
        </p>
      ) : null}
    </div>
  );
};

const Education = () => {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState('masters');

  return (
    <section id="education" className="os-section">
      <div className="os-container max-w-4xl">
        <Reveal>
          <span className="os-eyebrow">{t('education.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('education.title')}</h2>
          <p className="mt-4 max-w-xl text-os-muted">{t('education.sub')}</p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {education.map((item) => {
            if (!isExpandable(item)) {
              return (
                <Reveal key={item.id} className="rounded-2xl border border-os-border bg-os-surface p-6">
                  <h3 className="font-display text-xl font-semibold">{pick(item.title, lang)}</h3>
                  <p className="mt-2 text-sm text-os-muted">{pick(item.org, lang)}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">
                    {pick(item.dates, lang)}
                  </p>
                  <p className="mt-3 text-sm text-os-muted">{pick(item.note, lang)}</p>
                </Reveal>
              );
            }

            const isOpen = openId === item.id;
            const panelId = `education-panel-${item.id}`;

            return (
              <Reveal key={item.id} className="overflow-hidden rounded-2xl border border-os-border bg-os-surface">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-start md:px-6"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <div>
                    <span className="sr-only">{t('education.toggle')}</span>
                    <h3 className="font-display text-lg font-semibold md:text-xl">{pick(item.title, lang)}</h3>
                    <p className="mt-2 text-sm text-os-muted">{pick(item.org, lang)}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent-yellow">
                      {pick(item.dates, lang)}
                    </p>
                    <p className="mt-3 text-sm text-os-muted">{pick(item.note, lang)}</p>
                  </div>
                  <span
                    className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-os-border font-mono text-sm transition-transform ${
                      isOpen ? 'rotate-180 bg-accent-yellow text-black' : 'text-os-muted'
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                <div
                  id={panelId}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <DegreePanel item={item} lang={lang} t={t} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {certifications.map((c) => (
            <span
              key={pick(c, lang)}
              className="rounded-full border border-os-border bg-os-code px-3 py-2 font-mono text-[11px] text-os-muted"
            >
              {pick(c, lang)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
