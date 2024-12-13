import React from 'react';
import AchievementCard from './AchievementCard';

const Achievements = () => {
  const achievements = [
    {
      frontContent: (
        <div className="h-full flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">Cycle Time Report</h3>
          <p className="text-gray-600">Click to view video</p>
        </div>
      ),
      backContent: (
        <div className="h-full">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://drive.google.com/file/d/1ca6uvoff53L7ZG4VA4I8R8DYfPvFti22/preview"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      ),
    },
    {
      frontContent: (
        <div className="h-full flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">Production Dashboard</h3>
          <p className="text-gray-600">Click to view image</p>
        </div>
      ),
      backContent: (
        <div className="h-full">
          <img
            src="/images/achievements/Production-Dashboard.jpg"
            alt="Production Dashboard"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            frontContent={achievement.frontContent}
            backContent={achievement.backContent}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
