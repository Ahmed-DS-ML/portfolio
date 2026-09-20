import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { Reveal } from '../hooks/useReveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Contact = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const data = new FormData(e.target);
      const response = await fetch('/', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error('fail');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden film-grain os-section">
      <div className="pointer-events-none absolute -bottom-0 -end-20 h-80 w-80 rounded-full bg-accent-yellow/20 blur-[110px]" />
      <div className="os-container relative">
        <Reveal className="max-w-3xl">
          <span className="os-eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t('contact.title')}</h2>
          <p className="mt-4 text-os-muted">{t('contact.sub')}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Reveal className="os-card p-6 lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-wider text-accent-yellow">{t('contact.channels')}</p>
            <a href="mailto:ahmed.datascince@gmail.com" className="mt-4 block font-display text-xl hover:text-accent-yellow">
              ahmed.datascince@gmail.com
            </a>
            <a href="tel:+201062798081" className="mt-3 flex min-h-11 items-center gap-2 text-sm text-os-muted hover:text-accent-yellow">
              <FaPhone aria-hidden="true" />
              {t('contact.phone')}
            </a>
            <p className="mt-2 text-sm text-os-muted">{t('contact.location')}</p>
            <div className="mt-8 flex gap-3">
              <a
                href="https://github.com/Ahmed-DS-ML"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border text-os-muted hover:border-accent-yellow hover:text-accent-yellow"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-datascince/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-os-border text-os-muted hover:border-accent-yellow hover:text-accent-yellow"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </Reveal>

          <Reveal className="os-card p-6 md:p-8 lg:col-span-3">
            <h3 className="font-display text-xl font-semibold">{t('contact.formTitle')}</h3>
            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit} className="mt-6 space-y-4">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  {t('contact.honeypot')} <input name="bot-field" />
                </label>
              </p>
              <div>
                <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-os-muted">
                  {t('contact.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  className="mt-2 w-full rounded-xl border border-os-border bg-os-elevated px-4 py-3 text-os-text outline-none focus:border-accent-yellow"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-os-muted">
                  {t('contact.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="mt-2 w-full rounded-xl border border-os-border bg-os-elevated px-4 py-3 text-os-text outline-none focus:border-accent-yellow"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider text-os-muted">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="mt-2 w-full rounded-xl border border-os-border bg-os-elevated px-4 py-3 text-os-text outline-none focus:border-accent-yellow"
                />
              </div>
              <button type="submit" className="os-btn-primary w-full min-h-11 sm:w-auto" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
              {status === 'success' && <p className="text-sm text-accent-yellow">{t('contact.success')}</p>}
              {status === 'error' && <p className="text-sm text-red-400">{t('contact.error')}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
