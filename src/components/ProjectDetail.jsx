import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JupyterCodeDisplay from "./JupyterCodeDisplay";
import AIModel from "./AIModel";
import BackToProjects from "./BackToProjects";
import Navbar from './Navbar';
import { FaArrowLeft } from 'react-icons/fa';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const projectsData = JSON.parse(localStorage.getItem("projectsData") || "[]");
    const allProjects = Object.values(projectsData).flat();
    const foundProject = allProjects.find((p) => p.id === parseInt(id));
    
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <BackToProjects />
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Project Not Found
          </h1>
        </div>
      </div>
    );
  }

  const projectCategories = project.categories || [];
  const mainCategory = projectCategories[0] || "Project";

  // Sample Jupyter notebook code for the project
  const sampleCode = `
# Import necessary libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Load and preprocess data
def load_data(filename):
    data = pd.read_csv(filename)
    return data.dropna()

# Train model
def train_model(X, y):
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LinearRegression
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model

# Main execution
if __name__ == "__main__":
    data = load_data("dataset.csv")
    model = train_model(data.X, data.y)
    print("Training complete!")
  `;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        className="fixed top-24 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="min-h-screen bg-gray-50 pt-16"
      >
        <BackToProjects />
        
        {/* Project Hero Section */}
        <div className="project-container">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className={`project-image ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          <div className="text-overlay">
            <div className="project-tags">
              <span className="project-tag">{mainCategory}</span>
              {project.technologies?.map((tech, index) => (
                <span key={index} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
            <h1>{project.title}</h1>
            <h2>{project.subtitle || mainCategory}</h2>
            <h3>{project.technologies?.join(", ")}</h3>
            <p>{project.description}</p>
            <div className="project-buttons">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 mr-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <Tabs className="project-tabs">
                <TabList className="flex border-b border-gray-200 mb-8">
                  <Tab className="px-6 py-3 text-gray-600 hover:text-primary-600 cursor-pointer border-b-2 border-transparent focus:outline-none">
                    Overview
                  </Tab>
                  <Tab className="px-6 py-3 text-gray-600 hover:text-primary-600 cursor-pointer border-b-2 border-transparent focus:outline-none">
                    Code Implementation
                  </Tab>
                  <Tab className="px-6 py-3 text-gray-600 hover:text-primary-600 cursor-pointer border-b-2 border-transparent focus:outline-none">
                    AI Playground
                  </Tab>
                </TabList>

                <TabPanel>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Overview</h2>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {project.longDescription || project.description}
                      </p>
                      {project.githubLink && (
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">Source Code</h3>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            View Project on GitHub
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <JupyterCodeDisplay code={sampleCode} />
                </TabPanel>

                <TabPanel>
                  <AIModel />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
