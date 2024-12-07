import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaLaptopCode, FaRobot, FaBrain, FaChartBar, FaComments } from 'react-icons/fa';

// Project categories
const CATEGORIES = {
  AUTOMATION: "Automation & Industrial",
  ML_AI: "Machine Learning & AI",
  BUSINESS: "Business Applications",
  DATA_SCIENCE: "Data Science & Analytics",
  NLP: "Natural Language Processing"
};

const CATEGORY_ICONS = {
  [CATEGORIES.AUTOMATION]: FaRobot,
  [CATEGORIES.ML_AI]: FaBrain,
  [CATEGORIES.BUSINESS]: FaLaptopCode,
  [CATEGORIES.DATA_SCIENCE]: FaChartBar,
  [CATEGORIES.NLP]: FaComments
};

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
);

// Project Card Component
const ProjectCard = ({ project, isHovered, onHover }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => setImageLoaded(true);
  }, [project.image]);

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden shadow-lg bg-white"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
    >
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && <LoadingPlaceholder />}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          )}
          <Link
            to={`/project/${project.id}`}
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            View Details <FaExternalLinkAlt className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Project data organized by categories
  const projectsData = useMemo(() => ({
    [CATEGORIES.AUTOMATION]: [
      {
        id: 1,
        title: "Smart Factory Automation",
        description: "Developed an IoT-based factory automation system with real-time monitoring and predictive maintenance capabilities.",
        technologies: ["Python", "IoT", "MQTT", "TensorFlow"],
        image: "/images/factory-automation.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/smart-factory",
        category: CATEGORIES.AUTOMATION
      },
      {
        id: 2,
        title: "ERP System Integration",
        description: "Connected devices to the ERP system to benefit cost accounting, production management, and the maintenance team, facilitating efficient operations and data-driven decision-making.",
        technologies: ["ERP", "System Integration", "Data Management"],
        image: "/images/erp-integration.jpg",
        category: CATEGORIES.AUTOMATION
      },
      {
        id: 3,
        title: "CBM System Innovation",
        description: "Developed an SAP-integrated system for automated counting of modular parts, facilitating rapid creation of distribution plans.",
        technologies: ["SAP", "Automation", "Distribution Planning"],
        image: "/images/cbm-system.jpg",
        category: CATEGORIES.AUTOMATION
      },
      {
        id: 4,
        title: "Norma ERB System Compliance Project",
        description: "Involved in running the project to distribute customers on the map for ease and speed of the company's distribution process.",
        technologies: ["ERB System", "Geospatial Analysis", "Distribution Optimization"],
        image: "/images/norma-erb.jpg",
        category: CATEGORIES.AUTOMATION
      },
    ],

    [CATEGORIES.ML_AI]: [
      {
        id: 5,
        title: "Image Classification CNN",
        description: "Built a deep learning model for image classification using CNNs. Achieved high accuracy in classifying various object categories.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
        image: "/images/image-classification.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/image-classification-cnn",
        category: CATEGORIES.ML_AI
      },
      {
        id: 6,
        title: "Anomaly Detection System",
        description: "Developed a real-time anomaly detection system for IoT sensor data using statistical and machine learning approaches.",
        technologies: ["Python", "Scikit-learn", "Kafka", "Docker"],
        image: "/images/anomaly-detection.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/anomaly-detection",
        category: CATEGORIES.ML_AI
      },
    ],

    [CATEGORIES.NLP]: [
      {
        id: 7,
        title: "Movie Reviews Sentiment Analysis",
        description: "Developed an NLP model to classify movie reviews sentiment using advanced text processing and machine learning techniques. Achieved 85% accuracy in sentiment prediction.",
        technologies: ["Python", "NLTK", "Scikit-learn", "TF-IDF"],
        image: "/images/sentiment-analysis.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/movie-sentiment-analysis",
        category: CATEGORIES.NLP
      },
      {
        id: 8,
        title: "Natural Language Processing Pipeline",
        description: "Built an advanced NLP pipeline for text classification and named entity recognition using transformer models.",
        technologies: ["Python", "Transformers", "SpaCy", "PyTorch"],
        image: "/images/nlp-pipeline.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/nlp-pipeline",
        category: CATEGORIES.NLP
      },
    ],

    [CATEGORIES.DATA_SCIENCE]: [
      {
        id: 9,
        title: "Bike Sharing Analysis & Prediction",
        description: "Built a predictive model analyzing bike-sharing patterns, focusing on peak usage times and weather impacts. Implemented regression models to forecast demand based on historical data.",
        technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
        image: "/images/bike-sharing.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/bike-sharing-analysis",
        category: CATEGORIES.DATA_SCIENCE
      },
      {
        id: 10,
        title: "Customer Segmentation Engine",
        description: "Applied clustering techniques to segment customers and generate product recommendations. Implemented K-means clustering for customer behavior analysis.",
        technologies: ["Python", "K-means", "Pandas", "Scikit-learn"],
        image: "/images/customer-segmentation.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/customer-segmentation",
        category: CATEGORIES.DATA_SCIENCE
      },
      {
        id: 11,
        title: "Stock Price Forecasting",
        description: "Developed time series forecasting models to predict stock prices using historical data. Implemented ARIMA and Prophet models for accurate predictions.",
        technologies: ["Python", "Prophet", "ARIMA", "Pandas"],
        image: "/images/stock-forecast.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/stock-price-forecasting",
        category: CATEGORIES.DATA_SCIENCE
      },
      {
        id: 12,
        title: "Time Series Forecasting",
        description: "Implemented advanced time series forecasting models for energy consumption prediction.",
        technologies: ["Python", "Prophet", "Neural Prophet", "Pandas"],
        image: "/images/time-series.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/time-series-forecasting",
        category: CATEGORIES.DATA_SCIENCE
      },
    ],

    [CATEGORIES.BUSINESS]: [
      {
        id: 13,
        title: "Recommendation Engine",
        description: "Created a collaborative filtering recommendation system for e-commerce product suggestions.",
        technologies: ["Python", "TensorFlow", "Redis", "FastAPI"],
        image: "/images/recommendation-engine.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/recommendation-engine",
        category: CATEGORIES.BUSINESS
      },
      {
        id: 14,
        title: "Product Quality Classification",
        description: "Advanced machine learning system for product quality assessment and classification. Implements ensemble methods for high-accuracy predictions across multiple product categories.",
        technologies: ["Python", "Random Forest", "Deep Learning", "Scikit-learn", "TensorFlow"],
        image: "/images/quality.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/quality-prediction",
        category: CATEGORIES.BUSINESS
      },
    ],
  }), []);

  const filteredProjects = useMemo(() => {
    const allProjects = Object.values(projectsData).flat();
    return selectedCategory
      ? allProjects.filter(project => project.category === selectedCategory)
      : allProjects;
  }, [projectsData, selectedCategory]);

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(value)}
              className={`px-4 py-2 rounded-full flex items-center ${selectedCategory === value ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
            >
              {React.createElement(CATEGORY_ICONS[value], { className: 'mr-2' })}
              {value}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.slice(0, visibleProjects).map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProjectCard
                  project={project}
                  isHovered={hoveredId === project.id}
                  onHover={setHoveredId}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreProjects}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
