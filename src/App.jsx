import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Lifecycle from './components/Lifecycle';
import Impact from './components/Impact';
import About from './components/About';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import FocusGoals from './components/FocusGoals';
import Education from './components/Education';
import AchievementsGallery from './components/AchievementsGallery';
import Recognition from './components/Recognition';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import AIModel from './components/AIModel';
import Seo from './components/Seo.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';
import { canonicalPath, langFromPath, stripLang } from './seo/paths.js';
import {
  graph,
  personSchema,
  profilePageSchema,
  websiteSchema,
} from './seo/schema.js';

const MainContent = () => {
  const { t, lang } = useI18n();
  const location = useLocation();
  const url = canonicalPath(location.pathname);

  return (
    <>
      <Seo
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        pathname={location.pathname}
        lang={lang}
        jsonLd={graph([personSchema(), websiteSchema(), profilePageSchema(url)])}
      />
      <Hero />
      <Marquee />
      <Projects />
      <Lifecycle />
      <Impact />
      <About />
      <Expertise />
      <Experience />
      <Testimonials />
      <FocusGoals />
      <Education />
      <AchievementsGallery />
      <Recognition />
      <FAQ />
      <Contact />
    </>
  );
};

const App = () => {
  const location = useLocation();
  const { t, localized } = useI18n();
  const bare = stripLang(location.pathname);
  const isAIModelPage = bare === '/ai-model';
  const lang = langFromPath(location.pathname);

  return (
    <div className="relative min-h-dvh bg-os-bg text-os-text">
      <a href="#main" className="skip-link">
        {t('skip')}
      </a>
      {!isAIModelPage && <Navbar />}
      <main id="main">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/ar" element={<MainContent />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/ar/project/:id" element={<ProjectDetail />} />
          <Route path="/ai-model" element={<AIModel />} />
          <Route path="/ar/ai-model" element={<AIModel />} />
          <Route
            path="*"
            element={
              <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
                <Seo
                  title={t('notFound.title')}
                  description={t('notFound.body')}
                  pathname={location.pathname}
                  lang={lang}
                  noindex
                />
                <h1 className="mb-4 font-display text-4xl font-bold">{t('notFound.title')}</h1>
                <p className="mb-6 text-os-muted">{t('notFound.body')}</p>
                <Link to={localized('/')} className="os-btn-primary">
                  {t('notFound.home')}
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      {!isAIModelPage && <Footer />}
    </div>
  );
};

export default App;
