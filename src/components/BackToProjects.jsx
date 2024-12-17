import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToProjects = () => {
  const navigate = useNavigate();

  return (
    <div className="back-to-projects-container">
      <button
        onClick={() => navigate('/')}
        className="back-to-projects-button"
        aria-label="Back to Projects"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span>Back to Projects</span>
      </button>
    </div>
  );
};

export default BackToProjects;
