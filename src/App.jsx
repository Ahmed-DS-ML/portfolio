import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import components directly
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import AIModel from './components/AIModel';
import Achievements from './components/Achievements';

// Loading fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const MainContent = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Achievements />
    <Contact />
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
            element={<ProjectDetail />}
          />
          <Route
            path="/ai-model"
            element={<AIModel />}
          />
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-6">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b3] transition-colors"
                >
                  Back to Home
                </a>
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
