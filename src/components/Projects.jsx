import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MediaSlideshow from "./MediaSlideshow";
import DualSlideshow from "./DualSlideshow";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLaptopCode,
  FaRobot,
  FaBrain,
  FaChartBar,
  FaComments,
  FaDatabase,
  FaCode,
  FaCogs,
  FaServer,
} from "react-icons/fa";

// Project categories with descriptions
const CATEGORIES = {
  AUTOMATION: {
    name: "Automation & Industrial",
    description: "Industrial automation solutions and smart manufacturing systems",
    icon: FaRobot,
  },
  ML_AI: {
    name: "Machine Learning & AI",
    description: "Advanced ML models and AI applications",
    icon: FaBrain,
  },
  BUSINESS: {
    name: "Business Applications",
    description: "Enterprise solutions and business intelligence tools",
    icon: FaLaptopCode,
  },
  DATA_SCIENCE: {
    name: "Data Science & Analytics",
    description: "Data analysis and predictive modeling",
    icon: FaChartBar,
  },
  NLP: {
    name: "Natural Language Processing",
    description: "Text analysis and language processing systems",
    icon: FaComments,
  },
};

// Helper function to get category from name
const getCategoryByName = (categoryName) => {
  return Object.values(CATEGORIES).find(cat => cat.name === categoryName);
};

// Loading placeholder with skeleton animation
const LoadingPlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse">
    <div className="h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
  </div>
);

// Project Card Component with enhanced hover effects
const ProjectCard = ({ project, isHovered, onHover }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const category = getCategoryByName(project.category);

  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => setImageLoaded(true);
  }, [project.image]);

  if (!category) {
    return null;
  }

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg bg-white group cursor-pointer"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {!imageLoaded && <LoadingPlaceholder />}
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {React.createElement(category.icon, {
              className: "text-primary-600 w-5 h-5",
            })}
            <span className="text-sm font-medium text-primary-600">
              {project.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-400">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="w-5 h-5" />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Project data with updated category names
  const projectsData = useMemo(
    () => ({
      [CATEGORIES.AUTOMATION.name]: [
        {
          id: 1,
          title: "Smart Factory Automation",
          description:
            "Developed an IoT-based factory automation system with real-time monitoring and predictive maintenance capabilities.",
          technologies: ["Python", "IoT", "MQTT", "TensorFlow"],
          image: "/images/factory-automation.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/smart-factory",
          category: CATEGORIES.AUTOMATION.name,
        },
        {
          id: 2,
          title: "ERP System Integration",
          description:
            "Connected devices to the ERP system to benefit cost accounting, production management, and the maintenance team, facilitating efficient operations and data-driven decision-making.",
          technologies: ["ERP", "System Integration", "Data Management"],
          image: "/images/erp-integration.jpg",
          category: CATEGORIES.AUTOMATION.name,
        },
        {
          id: 3,
          title: "CBM System Innovation",
          description:
            "Developed an SAP-integrated system for automated counting of modular parts, facilitating rapid creation of distribution plans.",
          technologies: ["SAP", "Automation", "Distribution Planning"],
          image: "/images/cbm-system.jpg",
          category: CATEGORIES.AUTOMATION.name,
        },
        {
          id: 4,
          title: "Norma ERB System Compliance Project",
          description:
            "Involved in running the project to distribute customers on the map for ease and speed of the company's distribution process.",
          technologies: [
            "ERB System",
            "Geospatial Analysis",
            "Distribution Optimization",
          ],
          image: "/images/norma-erb.jpg",
          category: CATEGORIES.AUTOMATION.name,
        },
      ],

      [CATEGORIES.ML_AI.name]: [
        {
          id: 5,
          title: "Image Classification CNN",
          description:
            "Built a deep learning model for image classification using CNNs. Achieved high accuracy in classifying various object categories.",
          technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
          image: "/images/image-classification.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/image-classification-cnn",
          category: CATEGORIES.ML_AI.name,
        },
        {
          id: 6,
          title: "Anomaly Detection System",
          description:
            "Developed a real-time anomaly detection system for IoT sensor data using statistical and machine learning approaches.",
          technologies: ["Python", "Scikit-learn", "Kafka", "Docker"],
          image: "/images/anomaly-detection.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/anomaly-detection",
          category: CATEGORIES.ML_AI.name,
        },
      ],

      [CATEGORIES.NLP.name]: [
        {
          id: 7,
          title: "Movie Reviews Sentiment Analysis",
          description:
            "Developed an NLP model to classify movie reviews sentiment using advanced text processing and machine learning techniques. Achieved 85% accuracy in sentiment prediction.",
          technologies: ["Python", "NLTK", "Scikit-learn", "TF-IDF"],
          image: "/images/sentiment-analysis.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/movie-sentiment-analysis",
          category: CATEGORIES.NLP.name,
        },
        {
          id: 8,
          title: "Natural Language Processing Pipeline",
          description:
            "Built an advanced NLP pipeline for text classification and named entity recognition using transformer models.",
          technologies: ["Python", "Transformers", "SpaCy", "PyTorch"],
          image: "/images/nlp-pipeline.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/nlp-pipeline",
          category: CATEGORIES.NLP.name,
        },
      ],

      [CATEGORIES.DATA_SCIENCE.name]: [
        {
          id: 9,
          title: "Bike Sharing Analysis & Prediction",
          description:
            "Built a predictive model analyzing bike-sharing patterns, focusing on peak usage times and weather impacts. Implemented regression models to forecast demand based on historical data.",
          technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
          image: "/images/bike-sharing.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/bike-sharing-analysis",
          category: CATEGORIES.DATA_SCIENCE.name,
        },
        {
          id: 10,
          title: "Customer Segmentation Engine",
          description:
            "Applied clustering techniques to segment customers and generate product recommendations. Implemented K-means clustering for customer behavior analysis.",
          technologies: ["Python", "K-means", "Pandas", "Scikit-learn"],
          image: "/images/customer-segmentation.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/customer-segmentation",
          category: CATEGORIES.DATA_SCIENCE.name,
        },
        {
          id: 11,
          title: "Stock Price Forecasting",
          description:
            "Developed time series forecasting models to predict stock prices using historical data. Implemented ARIMA and Prophet models for accurate predictions.",
          technologies: ["Python", "Prophet", "ARIMA", "Pandas"],
          image: "/images/stock-forecast.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/stock-price-forecasting",
          category: CATEGORIES.DATA_SCIENCE.name,
        },
        {
          id: 12,
          title: "Time Series Forecasting",
          description:
            "Implemented advanced time series forecasting models for energy consumption prediction.",
          technologies: ["Python", "Prophet", "Neural Prophet", "Pandas"],
          image: "/images/time-series.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/time-series-forecasting",
          category: CATEGORIES.DATA_SCIENCE.name,
        },
      ],

      [CATEGORIES.BUSINESS.name]: [
        {
          id: 13,
          title: "Recommendation Engine",
          description:
            "Created a collaborative filtering recommendation system for e-commerce product suggestions.",
          technologies: ["Python", "TensorFlow", "Redis", "FastAPI"],
          image: "/images/recommendation-engine.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/recommendation-engine",
          category: CATEGORIES.BUSINESS.name,
        },
        {
          id: 14,
          title: "Product Quality Classification",
          description:
            "Advanced machine learning system for product quality assessment and classification. Implements ensemble methods for high-accuracy predictions across multiple product categories.",
          technologies: [
            "Python",
            "Random Forest",
            "Deep Learning",
            "Scikit-learn",
            "TensorFlow",
          ],
          image: "/images/quality.jpg",
          githubLink: "https://github.com/Ahmed-DS-ML/quality-prediction",
          category: CATEGORIES.BUSINESS.name,
        },
      ],
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    const allProjects = Object.values(projectsData).flat();
    return selectedCategory
      ? allProjects.filter((project) => project.category === selectedCategory)
      : allProjects;
  }, [projectsData, selectedCategory]);

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length));
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my portfolio of data science and ML engineering projects,
            showcasing expertise in automation, machine learning, and business applications.
          </p>
        </motion.div>

        {/* Category Filter with enhanced styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              !selectedCategory
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Projects
          </button>
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {React.createElement(category.icon, {
                className: "w-5 h-5",
              })}
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid with Animation */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={loadMoreProjects}
              className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Load More Projects
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Dual Media Slideshow */}
      <DualSlideshow />
    </section>
  );
};

export default Projects;
