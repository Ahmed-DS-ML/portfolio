import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = {
    'Programming & Tools': ['Python', 'SQL', 'Tableau', 'Power BI', 'Looker', 'Excel'],
    'Data Skills': ['Data Collection', 'Mathematics', 'Statistics', 'Data Preprocessing', 'Data Mining', 'HTML'],
    'Machine Learning': ['KNN', 'Decision Trees (DT)', 'K-means'],
    'Additional Skills': ['Data Visualization', 'Database Management', 'Operations Research', 'Communication Skills', 'English']
  };

  const education = [
    {
      degree: "Pre-master's in data science",
      institution: "Faculty of Graduate Studies for Statistical Research – Cairo University",
      location: "Egypt",
      period: "09/2023 - Present",
      details: "Pre-master in Academic Data Science"
    },
    {
      degree: "Diploma in Data Science",
      institution: "Faculty of Graduate Studies for Statistical Research – Cairo University",
      location: "Egypt",
      period: "09/2021 – 5/2023",
      details: "Diploma in Academic Data Science"
    },
    {
      degree: "Bachelor of Agricultural Engineering",
      institution: "Ain Shams University",
      location: "Egypt",
      period: "09/2015 - 06/2019",
      details: "Major in Power and Machinery Engineering (Mechanical Engineering)"
    }
  ];

  const certifications = [
    "Google Analytics Certification",
    "Data Analyst with Python (Data Camp)",
    "The Complete Python Bootcamp from Zero to Hero in Python (Pierian Training)",
    "Python for Data Science and Machine Learning Bootcamp (Pierian Training)"
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
              I am a data science professional with extensive experience in data analysis, machine learning, and automation. 
              Skilled in Python, SQL, Tableau, Power BI, and Looker, I leverage data to drive business decisions by providing actionable insights.
            </p>
            <p className="mb-4">
              As Head of Analytics and Automation at Elshorbagy Plastic Group, I lead the development of automated systems 
              and generate reports across sales, production, HR, finance, and inventory. Notable achievements include developing 
              a patent-pending automation system for injection machines and integrating real-time monitoring systems with ERP solutions.
            </p>
            <p>
              I am a collaborative team player, focused on fostering positive team dynamics while driving project success. 
              My experience balancing innovation with efficiency ensures high-quality results in fast-paced, demanding environments.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h3 className="section-subtitle text-center mb-8">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-semibold text-primary-600 mb-4">{category}</h4>
                  <ul className="space-y-2">
                    {skillList.map((skill) => (
                      <li key={skill} className="text-secondary-600 flex items-center">
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
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
                <div key={edu.degree} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-semibold text-primary-600">{edu.degree}</h4>
                  <p className="text-secondary-600">{edu.institution}</p>
                  <p className="text-secondary-500">{edu.location} | {edu.period}</p>
                  <p className="text-secondary-600 mt-2">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="section-subtitle text-center mb-8">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-secondary-600">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
