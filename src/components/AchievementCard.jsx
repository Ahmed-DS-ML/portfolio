import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AchievementCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          className={`absolute w-full h-full bg-white rounded-lg shadow-lg p-4 backface-hidden
            ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          className={`absolute w-full h-full bg-white rounded-lg shadow-lg p-4 backface-hidden
            transform rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementCard;
