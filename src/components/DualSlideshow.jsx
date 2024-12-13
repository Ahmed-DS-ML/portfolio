import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AchievementsCarousel from './AchievementsCarousel';

const DualSlideshow = () => {
  const [achievementMedia, setAchievementMedia] = useState([]);

  useEffect(() => {
    const loadAchievementMedia = async () => {
      try {
        const mediaContent = [
          // Images
          {
            type: 'image',
            url: '/images/achievements/1.jpg',
            title: '1',
            description: 'Professional achievement - 1'
          },
          {
            type: 'image',
            url: '/images/achievements/2.jpg',
            title: '2',
            description: 'Professional achievement - 2'
          },
          {
            type: 'image',
            url: '/images/achievements/3.jpg',
            title: '3',
            description: 'Professional achievement - 3'
          },
          {
            type: 'image',
            url: '/images/achievements/Dr-Saleh.jpg',
            title: 'Dr Saleh',
            description: 'Professional achievement - Dr Saleh'
          },
          {
            type: 'image',
            url: '/images/achievements/Eng Ahmed Ashraf.jpg',
            title: 'Eng Ahmed Ashraf',
            description: 'Professional achievement - Eng Ahmed Ashraf'
          },
          {
            type: 'image',
            url: '/images/achievements/Eng-Belal.jpg',
            title: 'Eng Belal',
            description: 'Professional achievement - Eng Belal'
          },
          {
            type: 'image',
            url: '/images/achievements/Eng-Mohamed Saleh.jpg',
            title: 'Eng Mohamed Saleh',
            description: 'Professional achievement - Eng Mohamed Saleh'
          },
          {
            type: 'image',
            url: '/images/achievements/Production-Dashboard.jpg',
            title: 'Production Dashboard',
            description: 'Professional achievement - Production Dashboard'
          },
          // Example video entries (replace with your actual video IDs)
          {
            type: 'video',
            source: 'drive',
            fileId: '1ca6uvoff53L7ZG4VA4I8R8DYfPvFti22',
            title: 'Report Cycle Time',
            description: 'Video demonstration of report cycle time'
          },
          {
            type: 'video',
            source: 'drive',
            fileId: '1PJ0YnLWIo_XD3BZdAEq6BcVADJxwrwE6',
            title: 'Project Cycle Time',
            description: 'Video demonstration of the project'
          }
        ];

        setAchievementMedia(mediaContent);
      } catch (error) {
        console.error('Error loading achievement media:', error);
      }
    };

    loadAchievementMedia();
  }, []);

  return (
    <motion.div
      id="achievements"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            My Achievements
          </h2>
          <p className="text-lg text-gray-300">
            A showcase of my professional accomplishments and milestones
          </p>
        </motion.div>

        <div className="mt-12">
          <AchievementsCarousel mediaContent={achievementMedia} />
        </div>
      </div>
    </motion.div>
  );
};

export default DualSlideshow;
