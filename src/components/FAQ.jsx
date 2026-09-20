import React, { useState } from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const FAQ = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  const items = t('faq.items');

  return (
    <section id="faq" className="os-section">
      <div className="os-container max-w-3xl">
        <Reveal className="text-center">
          <span className="os-eyebrow">{t('faq.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('faq.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-os-muted">{t('faq.sub')}</p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {(Array.isArray(items) ? items : []).map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl border border-os-border bg-os-surface">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="font-display text-lg font-medium">{item.q}</span>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-os-border font-mono text-lg transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-accent-yellow text-black' : 'text-os-muted'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-os-border px-5 pb-5 pt-4 text-sm leading-relaxed text-os-muted">{item.a}</p>
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

export default FAQ;
