import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load components
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));
const AIModel = React.lazy(() => import('./components/AIModel'));
const Achievements = React.lazy(() => import('./components/Achievements'));

// Loading fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const MainContent = () => (
  <>
    <Suspense fallback={<LoadingSpinner />}>
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
    </Suspense>
  </>
);

const App = () => {
  const location = useLocation();
  const isAIModelPage = location.pathname === '/ai-model';

  return (
    <div className="min-h-screen bg-white">
      {!isAIModelPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route
            path="/project/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route
            path="/ai-model"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <div className="container mx-auto px-4 py-24">
                  <AIModel />
                </div>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  404 - Page Not Found
                </h1>
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
