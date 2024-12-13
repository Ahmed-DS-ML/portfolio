import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const MediaSlideshow = ({ mediaContent, interval = 6000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isPlaying || !mediaContent.length) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        (prev + (isMobile ? 1 : 2)) % mediaContent.length
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, mediaContent, interval, isMobile]);

  const getCurrentItems = () => {
    if (!mediaContent.length) return [];
    if (isMobile) return [mediaContent[currentIndex]];
    return [
      mediaContent[currentIndex],
      mediaContent[(currentIndex + 1) % mediaContent.length]
    ];
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const decrement = isMobile ? 1 : 2;
      return (prev - decrement + mediaContent.length) % mediaContent.length;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const increment = isMobile ? 1 : 2;
      return (prev + increment) % mediaContent.length;
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div 
      className={`relative h-[500px] md:h-[600px] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 px-6"
        >
          {getCurrentItems().map((item, idx) => (
            <div 
              key={`${currentIndex}-${idx}`}
              className="relative h-full overflow-hidden rounded-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
              >
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm line-clamp-2">{item.description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className={`absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={handlePrev}
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={handleNext}
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      <button
        className={`absolute bottom-6 right-6 p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <FaPause className="w-4 h-4" />
        ) : (
          <FaPlay className="w-4 h-4" />
        )}
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {Array.from({ 
          length: Math.ceil(mediaContent.length / (isMobile ? 1 : 2)) 
        }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * (isMobile ? 1 : 2))}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / (isMobile ? 1 : 2)) === idx
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaSlideshow;
