import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load components
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));
const AIModelPage = React.lazy(() => import('./components/AIModelPage'));

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
      <Contact />
    </Suspense>
  </>
);

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
                <AIModelPage />
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
      <Footer />
    </div>
  );
};

export default App;
