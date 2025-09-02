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
      "IoT",
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
    "Deep Learning": ["TensorFlow", "PyTorch", "Keras", "OpenCV", "Computer Vision", "Neural Networks"],
    "AI & Computer Vision": [
      "Computer Vision",
      "Image Processing",
      "Object Detection",
      "Image Segmentation",
      "AI Agentic Systems",
      "Automation Frameworks",
    ],
    "Additional Skills": [
      "Data Visualization",
      "Database Management",
      "Operations Research",
      "Communication Skills",
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
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "Pillow"],
    },
    COMPUTER_VISION: {
      title: "Computer Vision",
      icon: FaBrain,
      skills: ["Image Processing", "Object Detection", "Image Segmentation", "Feature Extraction", "CNN Architectures"],
    },
    INFRASTRUCTURE: {
      title: "Infrastructure",
      icon: FaServer,
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "IoT"],
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
      period: "01/2023 – Present-to 1/2025 ",
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
              business decisions by provide actionable insights.
            </p>
            <p className="mb-4">
              With proven leadership experience in analytics and automation, I
              have successfully led the development of automated systems and generated reports
              across sales, production, HR, finance, and inventory. Notable
              achievements include developing a patent-pending automation system
              for injection machines and integrating real-time monitoring
              systems with ERP solutions.
            </p>
            <p className="mb-4">
              As a lifelong learner in AI and Computer Vision, I am actively advancing towards senior computer vision engineering roles. 
              I am passionate about advancing in computer vision, deep learning, and AI automation technologies to create innovative solutions 
              that drive the future of intelligent systems and transform industries through intelligent automation.
            </p>
            <p>
              I am a collaborative team player, focused on fostering positive
              team dynamics while driving project success. My experience
              balancing innovation with efficiency ensures high-quality results
              in fast-paced, demanding environments.
            </p>
          </div>

          {/* Current Focus & Future Goals */}
          <div className="bg-white p-8 rounded-2xl mb-16 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Current Focus & Future Goals</h3>
              <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 max-w-xl mx-auto">Building expertise in AI automation and advancing in computer vision to create smarter solutions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Studies */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3 text-white text-sm">
                    🚀
                  </span>
                  Currently Studying
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">AI Agentic Automation</p>
                      <p className="text-sm text-gray-600">Building expertise in autonomous AI systems</p>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full mt-1 inline-block">In Progress</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Computer Vision</p>
                      <p className="text-sm text-gray-600">Deep learning for image recognition</p>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full mt-1 inline-block">Advanced</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Advanced ML Algorithms</p>
                      <p className="text-sm text-gray-600">State-of-the-art machine learning</p>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full mt-1 inline-block">Expert</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Goals */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center mr-3 text-white text-sm">
                    🎯
                  </span>
                  Career Goals
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Senior Computer Vision Engineer</p>
                      <p className="text-sm text-gray-600">Lead computer vision projects</p>
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full mt-1 inline-block">Target</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">AI Automation Specialist</p>
                      <p className="text-sm text-gray-600">Design intelligent automation systems</p>
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full mt-1 inline-block">Goal</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">Research & Innovation</p>
                      <p className="text-sm text-gray-600">Advance AI and computer vision</p>
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full mt-1 inline-block">Vision</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Work Experience Section */}
          <div className="mb-16">
            <h3 className="section-subtitle text-center mb-8">Work Experience</h3>
            <div className="space-y-8">
              {/* Analytics and Automation Leadership */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-primary-600">
                  ANALYTICS AND AUTOMATION SECTION HEAD
                </h4>
                <p className="text-secondary-600">Manufacturing Industry</p>
                <p className="text-secondary-500">
                  10th of Ramadan, Egypt | 01/08/2023 – CURRENT
                </p>
                <div className="mt-4">
                  <h5 className="font-medium text-secondary-700 mb-2">Key Responsibilities:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Automation System Development – Designed and implemented an automated injection machine system, reducing downtime and boosting production efficiency (patent-pending).</li>
                    <li>ERP Integration & Real-Time Monitoring – Integrated real-time data solutions with ERP systems, improving decision-making across production, finance, and inventory.</li>
                    <li>Cross-Functional Leadership – Collaborated with sales, production, HR, and finance teams to deliver actionable insights and enhance business outcomes.</li>
                    <li>Project Management – Led large-scale analytics and automation projects, aligning with strategic company objectives.</li>
                    <li>Continuous Improvement – Leveraged data and automation technologies to optimize operations, drive innovation, and enhance performance.</li>
                  </ul>
                  
                  <h5 className="font-medium text-secondary-700 mb-2 mt-4">Achievements & Impact:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Innovation & System Development – Developed the Cycle Time Monitoring System, improving efficiency through real-time analytics and ERP integration (Creative Solution, Turkey).</li>
                    <li>Leadership & Strategic Growth – Headed the Data Science & Automation Department, aligning AI-driven solutions across business units to reduce downtime and improve performance.</li>
                    <li>Process Optimization – Applied data science to streamline production cycles, minimize waste, and enhance operational efficiency through predictive maintenance models.</li>
                    <li>Industry Recognition – Recognized for leadership, problem-solving, and innovation, consistently delivering impactful, data-driven solutions for business growth.</li>
                  </ul>
                </div>
              </div>

              {/* B.TECH */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-primary-600">
                  DISTRIBUTION SUPERVISOR
                </h4>
                <p className="text-secondary-600">B.TECH</p>
                <p className="text-secondary-500">
                  10th of Ramadan, Egypt | 01/08/2020 – 06/02/2023
                </p>
                <div className="mt-4">
                  <h5 className="font-medium text-secondary-700 mb-2">Key Responsibilities:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Standard Part Counting System Development – Designed an optimized system for tracking rental car inventory, improving supplier communication and real-time cost adjustments.</li>
                    <li>Cross-Departmental Coordination – Streamlined collaboration between procurement, finance, and logistics teams to enhance operational efficiency.</li>
                    <li>Inventory Management Optimization – Ensured seamless inventory tracking, reducing delays and improving customer delivery speed.</li>
                  </ul>
                  
                  <h5 className="font-medium text-secondary-700 mb-2 mt-4">Achievements & Impact:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Operational Efficiency – Implemented a standardized counting system, accelerating supplier interactions and cost adjustments.</li>
                    <li>Enhanced Coordination – Strengthened communication across departments, aligning inventory management with business goals.</li>
                    <li>Improved Customer Delivery – Optimized processes to ensure faster and more reliable rental car availability.</li>
                  </ul>
                </div>
              </div>

              {/* MIRACO-CARRIER */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-primary-600">
                  SALES ENGINEER
                </h4>
                <p className="text-secondary-600">MIRACO-CARRIER</p>
                <p className="text-secondary-500">
                  6th of October City, Egypt | 01/08/2019 – 30/06/2020
                </p>
                <div className="mt-4">
                  <h5 className="font-medium text-secondary-700 mb-2">Key Responsibilities:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Client Relationship Management – Built and maintained strong customer relationships, fostering loyalty and repeat business.</li>
                    <li>Strategic Sales & Communication – Applied effective sales techniques to drive revenue growth and meet customer needs.</li>
                  </ul>
                  
                  <h5 className="font-medium text-secondary-700 mb-2 mt-4">Achievements & Impact:</h5>
                  <ul className="list-disc list-inside space-y-2 text-secondary-600 ml-2">
                    <li>Exceeded Sales Targets – Consistently surpassed monthly and annual sales goals, directly boosting company revenue.</li>
                    <li>Enhanced Customer Retention – Strengthened client relationships, leading to increased repeat business and long-term partnerships.</li>
                  </ul>
                </div>
              </div>
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
