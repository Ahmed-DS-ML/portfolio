import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';

const Footer = () => {
  const { t, localized } = useI18n();
  return (
    <footer className="border-t border-os-border py-10">
      <div className="os-container flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-center sm:text-start">
          <p className="font-display font-semibold">{t('brand.name')}</p>
          <p className="font-mono text-xs text-os-muted">{t('footer.line')}</p>
          <p className="mt-3 text-sm text-os-muted">
            © {new Date().getFullYear()} {t('brand.name')}. {t('footer.copy')}
          </p>
        </div>
        <nav aria-label={t('footer.work')} className="flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-wider text-os-muted sm:items-start">
          <p className="text-accent-yellow">{t('footer.work')}</p>
          <Link to={localized('/project/tinda')} className="hover:text-accent-yellow">
            {t('footer.tinda')}
          </Link>
          <Link to={localized('/project/qube')} className="hover:text-accent-yellow">
            {t('footer.qube')}
          </Link>
          <Link to={localized('/project/metron')} className="hover:text-accent-yellow">
            {t('footer.metron')}
          </Link>
        </nav>
        <div className="flex justify-center gap-4 font-mono text-xs uppercase tracking-wider text-os-muted">
          <a href="https://github.com/Ahmed-DS-ML" className="hover:text-accent-yellow" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-datascince/"
            className="hover:text-accent-yellow"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
