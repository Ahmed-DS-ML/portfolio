export const projects = [
  {
    id: "ml-forecasting",
    title: "ML-Powered Sales Forecasting",
    category: "Machine Learning & AI",
    description: "Advanced machine learning system for accurate sales forecasting and inventory optimization using time series analysis and deep learning models.",
    image: "/images/projects/forecasting.jpg",
    gallery: [
      "/images/projects/forecasting/main.jpg",
      "/images/projects/forecasting/dashboard.jpg",
      "/images/projects/forecasting/analysis.jpg",
      "/images/projects/forecasting/results.jpg"
    ],
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Docker"],
    features: [
      "Time series forecasting using LSTM networks",
      "Interactive dashboards for visualization",
      "Automated model retraining pipeline",
      "Real-time prediction API",
      "Comprehensive performance metrics"
    ],
    github: "https://github.com/Ahmed-DS-ML/ml-forecasting",
    demo: "https://ml-forecasting-demo.com",
    youtube: "https://youtube.com/watch?v=demo",
    date: "2023",
    technicalDetails: `
      The system utilizes state-of-the-art machine learning techniques including:
      - LSTM neural networks for time series prediction
      - Feature engineering pipeline for temporal data
      - Automated hyperparameter optimization
      - Model versioning and deployment automation
      - Real-time data processing and prediction serving
    `
  },
  {
    id: "nlp-chatbot",
    title: "Intelligent Customer Service Chatbot",
    category: "Natural Language Processing",
    description: "AI-powered chatbot using advanced NLP techniques to provide automated customer support and query resolution.",
    image: "/images/projects/chatbot.jpg",
    gallery: [
      "/images/projects/chatbot/main.jpg",
      "/images/projects/chatbot/conversation.jpg",
      "/images/projects/chatbot/analytics.jpg",
      "/images/projects/chatbot/training.jpg"
    ],
    technologies: ["Python", "PyTorch", "Transformers", "FastAPI", "Redis"],
    features: [
      "Natural language understanding",
      "Context-aware responses",
      "Multi-language support",
      "Integration with CRM systems",
      "Analytics dashboard"
    ],
    github: "https://github.com/Ahmed-DS-ML/nlp-chatbot",
    demo: "https://chatbot-demo.com",
    youtube: "https://youtube.com/watch?v=chatbot-demo",
    date: "2023",
    technicalDetails: `
      Technical implementation includes:
      - BERT-based model for intent classification
      - Custom transformer architecture for response generation
      - Redis-based caching for improved response time
      - Scalable microservices architecture
      - Real-time analytics and monitoring
    `
  },
  {
    id: "data-pipeline",
    title: "Automated Data Pipeline Platform",
    category: "Data Science & Analytics",
    description: "Enterprise-grade data pipeline solution for automated data collection, processing, and analysis at scale.",
    image: "/images/projects/pipeline.jpg",
    gallery: [
      "/images/projects/pipeline/overview.jpg",
      "/images/projects/pipeline/monitoring.jpg",
      "/images/projects/pipeline/workflow.jpg",
      "/images/projects/pipeline/metrics.jpg"
    ],
    technologies: ["Apache Airflow", "Python", "PostgreSQL", "Docker", "AWS"],
    features: [
      "Automated data collection and validation",
      "Scalable ETL processes",
      "Real-time monitoring and alerts",
      "Data quality checks",
      "Custom reporting tools"
    ],
    github: "https://github.com/Ahmed-DS-ML/data-pipeline",
    demo: "https://pipeline-demo.com",
    youtube: "https://youtube.com/watch?v=pipeline-demo",
    date: "2023",
    technicalDetails: `
      Key technical components:
      - Apache Airflow for workflow orchestration
      - Custom operators for specific data sources
      - Automated data validation framework
      - Scalable processing using Kubernetes
      - Comprehensive monitoring and alerting system
    `
  }
  // Add more projects as needed
];
