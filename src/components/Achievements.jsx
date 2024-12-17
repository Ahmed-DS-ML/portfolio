import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const achievements = [
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
      description: "Experienced professional with expertise in manufacturing and production optimization.",
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
      description: "Technical expert specializing in process optimization.",
      type: "image",
      media: "/images/achievements/Eng-Belal.jpg"
    },
    {
      title: "Eng-Mohamed Saleh",
      description: "Senior engineer leading manufacturing excellence initiatives.",
      type: "image",
      media: "/images/achievements/Eng-Mohamed Saleh.jpg"
    },
    {
      title: "Production Dashboard",
      description: "Comprehensive visualization of production metrics and KPIs, enabling data-driven decision making in manufacturing processes.",
      type: "image",
      media: "/images/achievements/Production-Dashboard.jpg"
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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section id="achievements" className="relative min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Achievements</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Showcasing our patents, team expertise, and technological innovations in manufacturing excellence.
          </p>
        </motion.div>

        <div className="relative h-[600px] max-w-6xl mx-auto">
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
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="p-8 flex flex-col justify-center bg-gradient-to-r from-white to-gray-50">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold text-primary-600 mb-6"
                    >
                      {achievements[currentIndex].title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600 text-lg leading-relaxed mb-6"
                    >
                      {achievements[currentIndex].description}
                    </motion.p>
                  </div>
                  <div className="relative h-full flex items-center justify-center bg-gray-50 p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {achievements[currentIndex].type === 'video' ? (
                        <iframe
                          className="w-full h-full rounded-lg shadow-lg"
                          src={achievements[currentIndex].media}
                          allow="autoplay"
                          allowFullScreen
                        />
                      ) : (
                        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg flex items-center justify-center">
                          <img
                            src={achievements[currentIndex].media}
                            alt={achievements[currentIndex].title}
                            className="max-w-full max-h-[500px] w-auto h-auto object-contain hover:scale-105 transition-transform duration-300"
                            style={{
                              aspectRatio: 'auto',
                              objectFit: 'contain',
                              margin: 'auto'
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Auto-play Toggle Button */}
          <button
            onClick={toggleAutoPlay}
            className="absolute right-4 top-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all"
          >
            {isAutoPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )}
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-full px-4">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary-600 w-6' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
