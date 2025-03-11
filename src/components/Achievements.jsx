import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import styles from './Achievements.module.css';

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const achievements = [
    {
      title: "Google Professional Certification",
      description: "Completed advanced certification in Data Analytics and Machine Learning, demonstrating expertise in data-driven decision making and AI solutions.",
      type: "image",
      media: "/images/achievements/google.jpg"
    },
    {
      title: "Production Dashboard",
      description: "A real-time manufacturing dashboard displaying key performance metrics with circular gauges showing OEE (Overall Equipment Effectiveness) at 6.58% and 92.66%. The interface features Arabic text and includes production status indicators, cycle times, and efficiency measurements for comprehensive production monitoring.",
      type: "image",
      media: "/images/achievements/Production-Dashboard.jpg"
    },
    {
      title: "B.TECH Leadership",
      description: "Led successful distribution and logistics optimization initiatives at B.TECH, one of Egypt's largest electronics retailers, resulting in significant improvements in operational efficiency.",
      type: "image",
      media: "/images/achievements/btech.jpg"
    },
    {
      title: "Patent 1-1",
      description: "Official patent documentation showcasing innovative manufacturing process improvements.",
      type: "image",
      media: "/images/achievements/Patent 1-1.jpg"
    },
    {
      title: "Patent 1-2",
      description: "Detailed technical specifications and diagrams of the patented manufacturing solution.",
      type: "image",
      media: "/images/achievements/Patent 1-2.jpg"
    },
    {
      title: "Dr. Saleh",
      description: "CEO of Creative Solutions ERP systems in Egypt, with a Masters in Operations Management and Supply Chain. Successfully integrated the project with ERP Cycle Time systems, enhancing manufacturing process monitoring and optimization capabilities.",
      type: "image",
      media: "/images/achievements/Dr-Saleh.jpg"
    },
    {
      title: "Eng Ahmed Ashraf",
      description: "Lead engineer contributing to innovative manufacturing solutions.",
      type: "image",
      media: "/images/achievements/Eng Ahmed Ashraf.jpg"
    },
    {
      title: "Eng-Ahmed Ashraf",
      description: "Key team member driving production efficiency improvements.",
      type: "image",
      media: "/images/achievements/Eng-Ahmed Ashraf.jpg"
    },
    {
      title: "Eng-Belal",
      description: "Factory owner and key decision-maker responsible for project execution and funding. His leadership and vision drive the implementation of innovative manufacturing solutions and continuous improvement initiatives.",
      type: "image",
      media: "/images/achievements/Eng-Belal.jpg"
    },
    {
      title: "Eng-Mohamed Saleh",
      description: "Chief Engineer specializing in the innovation and implementation of IML robotics projects. Leading the development and execution of advanced robotic solutions for industrial manufacturing.",
      type: "image",
      media: "/images/achievements/Eng-Mohamed Saleh.jpg"
    },
    {
      title: "Cycle Time Report",
      description: "Interactive dashboard for monitoring and analyzing production cycle times, providing real-time insights into manufacturing efficiency.",
      type: "video",
      media: "https://drive.google.com/file/d/1ca6uvoff53L7ZG4VA4I8R8DYfPvFti22/preview"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % achievements.length);
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, achievements.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section id="achievements" className={`py-16 bg-gray-100 ${styles.achievements}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Achievements</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Showcasing our patents, team expertise, and technological innovations in manufacturing excellence.
          </p>
        </motion.div>

        <div className={`relative h-[500px] sm:h-[600px] max-w-6xl mx-auto overflow-hidden ${styles.slideContainer}`}>
          <div className="relative w-full h-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute w-full h-full"
              >
                <div className="relative w-full h-full">
                  {achievements[currentIndex].type === 'image' ? (
                    <img
                      src={achievements[currentIndex].media}
                      alt={achievements[currentIndex].title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <iframe
                        src={achievements[currentIndex].media}
                        className="w-full h-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        frameBorder="0"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="description-overlay">
                    <h3 className="achievement-title text-2xl sm:text-3xl font-bold text-white">
                      {achievements[currentIndex].title}
                    </h3>
                    <p className="achievement-description text-base sm:text-lg text-gray-200">
                      {achievements[currentIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg z-10 transition-all touch-manipulation"
            >
              <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg z-10 transition-all touch-manipulation"
            >
              <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Auto-play Toggle Button */}
            <button
              onClick={toggleAutoPlay}
              className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg z-10 transition-all touch-manipulation"
            >
              {isAutoPlaying ? (
                <FaPause className="w-4 h-4" />
              ) : (
                <FaPlay className="w-4 h-4" />
              )}
            </button>

            {/* Slide Indicators */}
            <div className="absolute -bottom-8 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-full px-4">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all touch-manipulation ${
                    index === currentIndex ? 'bg-primary-600 w-5 sm:w-6' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
