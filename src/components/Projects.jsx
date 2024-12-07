import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Automation System for Injection Machines",
      description: "Developed using PLC; applied for a patent for the project 'Future Vision for Production Management.' Features include real-time monitoring with continuous updates on cycle times, material usage, and machine conditions.",
      technologies: ["PLC", "Real-time Monitoring", "Automation"],
      image: "/images/injection-automation.jpg"
    },
    {
      id: 2,
      title: "ERP System Integration",
      description: "Connected devices to the ERP system to benefit cost accounting, production management, and the maintenance team, facilitating efficient operations and data-driven decision-making.",
      technologies: ["ERP", "System Integration", "Data Management"],
      image: "/images/erp-integration.jpg"
    },
    {
      id: 3,
      title: "CBM System Innovation",
      description: "Developed an SAP-integrated system for automated counting of modular parts, facilitating rapid creation of distribution plans.",
      technologies: ["SAP", "Automation", "Distribution Planning"],
      image: "/images/cbm-system.jpg"
    },
    {
      id: 4,
      title: "Norma ERB System Compliance Project",
      description: "Involved in running the project to distribute customers on the map for ease and speed of the company's distribution process.",
      technologies: ["ERB System", "Geospatial Analysis", "Distribution Optimization"],
      image: "/images/norma-erb.jpg"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center mb-12">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-48"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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
