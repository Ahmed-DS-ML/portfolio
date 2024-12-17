import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

// Project categories with descriptions
const CATEGORIES = {
  AUTOMATION: {
    name: "Automation & Industrial",
    description: "Industrial automation solutions and smart manufacturing systems",
    icon: FaGithub,
  },
  ML_AI: {
    name: "Machine Learning & AI",
    description: "Advanced ML models and AI applications",
    icon: FaGithub,
  },
  BUSINESS: {
    name: "Business Applications",
    description: "Enterprise solutions and business intelligence tools",
    icon: FaGithub,
  },
  DATA_SCIENCE: {
    name: "Data Science & Analytics",
    description: "Data analysis and predictive modeling",
    icon: FaGithub,
  },
  NLP: {
    name: "Natural Language Processing",
    description: "Text analysis and language processing systems",
    icon: FaGithub,
  },
};

// Get category details by name
const getCategoryByName = (categoryName) =>
  Object.values(CATEGORIES).find((cat) => cat.name === categoryName);

// Project Card Component with enhanced hover effects
const ProjectCard = ({ project }) => {
  const category = getCategoryByName(project.category);

  if (!category) {
    return null;
  }

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg bg-white group cursor-pointer"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
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
        {project.githubLink && (
          <a
            href={project.githubLink}
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
            <BiLinkExternal className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Project data with updated category names
  const projectsData = {
    [CATEGORIES.AUTOMATION.name]: [
      {
        id: 1,
        title: "Smart Factory Automation",
        description: "Developed an IoT-based factory automation system that enables real-time machine monitoring and predictive maintenance. The solution improves operational efficiency and minimizes downtime through actionable insights.",
        technologies: ["Python", "IoT", "MQTT", "TensorFlow"],
        image: "/images/factory-automation.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/smart-factory",
        category: CATEGORIES.AUTOMATION.name,
      },
      {
        id: 2,
        title: "ERP System Integration",
        description: "Created a seamless integration of ERP systems with factory devices. The project automates cost accounting, production management, and supports data-driven maintenance decision-making.",
        technologies: ["ERP", "System Integration", "Data Management"],
        image: "/images/erp-integration.jpg",
        category: CATEGORIES.AUTOMATION.name,
      },
      {
        id: 3,
        title: "CBM System Innovation",
        description: "Built an SAP-integrated system to automate counting and tracking of modular parts. The project accelerated the distribution planning process for logistics and resource optimization.",
        technologies: ["SAP", "Automation", "Distribution Planning"],
        image: "/images/cbm-system.jpg",
        category: CATEGORIES.AUTOMATION.name,
      },
      {
        id: 4,
        title: "Norma ERB System Compliance Project",
        description: "Led the implementation of an optimized distribution system that visualizes customers on maps. This system enhanced speed and accuracy in the company's distribution process.",
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
        description: "Developed a deep learning model leveraging Convolutional Neural Networks (CNNs) to classify images. Achieved high accuracy in predicting object categories across multiple datasets.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
        image: "/images/image-classification.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/image-classification-cnn",
        category: CATEGORIES.ML_AI.name,
      },
      {
        id: 6,
        title: "Anomaly Detection System",
        description: "Implemented a real-time anomaly detection solution for IoT sensor data. Utilized machine learning algorithms to detect abnormal patterns, ensuring system reliability and safety.",
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
        description: "Built an NLP-based sentiment analysis model for classifying movie reviews as positive or negative. Used advanced text pre-processing techniques for accurate predictions.",
        technologies: ["Python", "NLTK", "Scikit-learn", "TF-IDF"],
        image: "/images/sentiment-analysis.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/movie-sentiment-analysis",
        category: CATEGORIES.NLP.name,
      },
      {
        id: 8,
        title: "Natural Language Processing Pipeline",
        description: "Created a robust NLP pipeline that combines text classification and named entity recognition (NER) using transformer models and libraries like SpaCy and PyTorch.",
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
        description: "Conducted an analysis of bike-sharing data to uncover usage trends. Built a regression-based model to forecast peak demand times influenced by weather and seasonal data.",
        technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
        image: "/images/bike-sharing.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/bike-sharing-analysis",
        category: CATEGORIES.DATA_SCIENCE.name,
      },
      {
        id: 10,
        title: "Customer Segmentation Engine",
        description: "Applied K-means clustering to segment customers based on behavioral data. The system generates product recommendations and improves personalized marketing strategies.",
        technologies: ["Python", "K-means", "Pandas", "Scikit-learn"],
        image: "/images/customer-segmentation.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/customer-segmentation",
        category: CATEGORIES.DATA_SCIENCE.name,
      },
      {
        id: 11,
        title: "Stock Price Forecasting",
        description: "Developed time series models such as ARIMA and Prophet to predict stock prices using historical data. The project helps investors make informed financial decisions.",
        technologies: ["Python", "Prophet", "ARIMA", "Pandas"],
        image: "/images/stock-forecast.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/stock-price-forecasting",
        category: CATEGORIES.DATA_SCIENCE.name,
      },
      {
        id: 12,
        title: "Time Series Forecasting",
        description: "Built an advanced forecasting model for predicting energy consumption patterns. Leveraged Prophet and Neural Prophet to produce accurate predictions over time.",
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
        description: "Designed a collaborative filtering recommendation engine for e-commerce platforms. Suggested products to users based on preferences and historical purchase patterns.",
        technologies: ["Python", "TensorFlow", "Redis", "FastAPI"],
        image: "/images/recommendation-engine.jpg",
        githubLink: "https://github.com/Ahmed-DS-ML/recommendation-engine",
        category: CATEGORIES.BUSINESS.name,
      },
      {
        id: 14,
        title: "Product Quality Classification",
        description: "Built a machine learning system to classify products based on quality parameters. Applied ensemble methods like Random Forest and Deep Learning for high-accuracy predictions.",
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
  };

  const filteredProjects = Object.values(projectsData).flat().filter((project) => {
    if (!selectedCategory) return true;
    return project.category === selectedCategory;
  });

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
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

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
    </section>
  );
};

export default Projects;
