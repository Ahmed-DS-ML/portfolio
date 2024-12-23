import React from "react";
import { motion } from "framer-motion";
import {
  FaDatabase,
  FaBrain,
  FaCode,
  FaServer,
} from "react-icons/fa";

const About = () => {
  const skills = {
    "Programming & Tools": [
      "Python",
      "SQL",
      "Tableau",
      "Power BI",
      "Looker",
      "Excel",
    ],
    "Data Skills": [
      "Data Collection",
      "Mathematics",
      "Statistics",
      "Data Preprocessing",
      "Data Mining",
      "HTML",
    ],
    "Machine Learning": ["KNN", "Decision Trees (DT)", "K-means","Logistic Regression","Support Vector Machines (SVM)","Random Forest","Neural Networks","Reinforcement Learning"],
    "Deep Learning": ["TensorFlow", "PyTorch", "Keras", "OpenCV", ],
    "Additional Skills": [
      "Data Visualization",
      "Database Management",
      "Operations Research",      "Communication Skills",
      "English",
    ],
  };

  const technicalExpertise = {
    BIG_DATA: {
      title: "Big Data Tools",
      icon: FaDatabase,
      skills: ["Hadoop", "Spark", "Kafka", "MongoDB", "Redis"],
    },
    ML_ALGORITHMS: {
      title: "ML Algorithms",
      icon: FaBrain,
      skills: [
        "K-means Clustering",
        "Association Rules (Apriori)",
        "Linear Regression",
        "Naïve Bayesian Classifiers",
        "Decision Trees",
      ],
    },
    FRAMEWORKS: {
      title: "Frameworks & Libraries",
      icon: FaCode,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    },
    INFRASTRUCTURE: {
      title: "Infrastructure",
      icon: FaServer,
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP"],
    },
  };

  const education = [
    {
      degree: "Pre-master's in Data science",
      institution:
        "Faculty of Graduate Studies for Statistical Research – Cairo University",
      location: "Egypt",
      period: "09/2024 - Present",
      details: "Pre-master in Academic Data Science",
    },
    {
      degree: "Diploma in Academic Data Science",
      institution:
        "Faculty of Graduate Studies for Statistical Research – Cairo University",
      location: "Egypt",
      period: "09/2022 – 6/2024",
      details: "Diploma in Academic Data Science",
    },
    {
      degree: "Bachelor of Agricultural Engineering",
      institution: "Ain Shams University",
      location: "Egypt",
      period: "09/2015 - 06/2019",
      details:
        "Major in Power and Machinery Engineering (Mechanical Engineering)",
    },
  ];

  const certifications = [
    "Google Analytics Certification",
    "Data Analyst with Python (Data Camp)",
    "The Complete Python Bootcamp from Zero to Hero in Python (Pierian Training)",
    "Python for Data Science and Machine Learning Bootcamp (Pierian Training)",
  ];

  return (
    <section id="about" className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center mb-12">About Me</h2>

          {/* Main Introduction */}
          <div className="prose prose-lg max-w-4xl mx-auto mb-16 text-secondary-600">
            <p className="mb-4">
              I am a data science professional with extensive experience in data
              analysis, machine learning, and automation. Skilled in Python,
              SQL, Tableau, Power BI, and Looker, I leverage data to drive
              business decisions by providing actionable insights.
            </p>
            <p className="mb-4">
              As Head of Analytics and Automation at Elshorbagy Plastic Group, I
              lead the development of automated systems and generate reports
              across sales, production, HR, finance, and inventory. Notable
              achievements include developing a patent-pending automation system
              for injection machines and integrating real-time monitoring
              systems with ERP solutions.
            </p>
            <p>
              I am a collaborative team player, focused on fostering positive
              team dynamics while driving project success. My experience
              balancing innovation with efficiency ensures high-quality results
              in fast-paced, demanding environments.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h3 className="section-subtitle text-center mb-8">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h4 className="font-semibold text-primary-600 mb-4">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {skillList.map((skill) => (
                      <li
                        key={skill}
                        className="text-secondary-600 flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Expertise Section */}
          <div className="mb-16">
            <h3 className="section-subtitle text-center mb-8">Technical Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.values(technicalExpertise).map((category) => (
                <div key={category.title} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    {React.createElement(category.icon, {
                      className: "text-primary-600 w-6 h-6",
                    })}
                    <h4 className="font-semibold text-lg">{category.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <span className="w-2 h-2 bg-primary-600 rounded-full mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h3 className="section-subtitle text-center mb-8">Education</h3>
            <div className="space-y-8">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h4 className="font-semibold text-primary-600">
                    {edu.degree}
                  </h4>
                  <p className="text-secondary-600">{edu.institution}</p>
                  <p className="text-secondary-500">
                    {edu.location} | {edu.period}
                  </p>
                  <p className="text-secondary-600 mt-2">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-12">
            <h3 className="section-subtitle text-center mb-8">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-secondary-600">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities and Initiatives Section */}
          <div>
            <h3 className="section-subtitle text-center mb-8">
              Activities and Initiatives
            </h3>
            <div className="space-y-8">
              {/* Workshop for Teaching Mathematics */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-primary-600 mb-3">
                  Workshop for Teaching Mathematics
                </h4>
                <ul className="list-disc list-inside space-y-2 text-secondary-600">
                  <li>
                    Organized a workshop at the Faculty of Computers science, Ain Shams University, 
                    to teach mathematics and assist students in solving mathematical problems.
                  </li>
                  <li>
                    Provided support to students within the university campus, focusing on simplifying 
                    complex information and offering clear explanations to enhance their understanding.
                  </li>
                </ul>
              </div>

              {/* Supporting Students */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-primary-600 mb-3">
                  Supporting Students in University Dormitories
                </h4>
                <div className="text-secondary-600">
                  <h5 className="font-medium mb-2">Mathematics Problem-Solving Competitions:</h5>
                  <p>
                    Organized workshops to prepare students for mathematics competitions in computer science, 
                    fostering a competitive spirit and deepening their problem-solving skills.
                  </p>
                </div>
              </div>

              {/* Community Mathematics Tutoring */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-primary-600 mb-3">
                  Community Mathematics Tutoring
                </h4>
                <div className="text-secondary-600">
                  <p>
                    Conducted mathematics tutoring sessions for middle and high school students in my community, 
                    utilizing real-life examples and interactive methods to simplify concepts and improve their comprehension.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
