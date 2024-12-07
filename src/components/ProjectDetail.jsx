import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen pt-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title">Project Details</h1>
        {/* Project details will be added later */}
      </div>
    </div>
  );
};

export default ProjectDetail;
