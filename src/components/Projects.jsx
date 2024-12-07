import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Project data organized by categories
  const projectsData = useMemo(() => ({
    // Automation & Industrial Projects
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

    // Machine Learning & AI Projects
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

    // Natural Language Processing Projects
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

    // Data Science & Analytics Projects
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

    // Business Applications Projects
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

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Innovative Solutions Across Multiple Domains
              </p>
            </motion.div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-16">
            {Object.entries(projectsData).map(([category, projects], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  {CATEGORY_ICONS[category] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: categoryIndex * 0.1 }}
                      className="text-blue-500 text-2xl"
                    >
                      {React.createElement(CATEGORY_ICONS[category])}
                    </motion.div>
                  )}
                  <h3 className="text-3xl font-bold text-white">{category}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10"
                    >
                      {/* Project Image with Overlay */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      </div>

                      {/* Project Content */}
                      <div className="relative p-6">
                        <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                              className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                          {project.githubLink && (
                            <motion.a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaGithub className="text-lg" />
                              <span>View Code</span>
                            </motion.a>
                          )}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={`/project/${project.id}`}
                              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                              <span>View Details</span>
                              <FaExternalLinkAlt className="text-sm" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
