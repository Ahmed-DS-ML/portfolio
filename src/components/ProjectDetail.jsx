import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaYoutube, FaDownload } from 'react-icons/fa';
import { Document, Page, pdfjs } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Example project data structure - Replace with your actual data
  const project = {
    id: 'anomaly-detection',
    title: 'Industrial Anomaly Detection System',
    shortDescription: 'AI-powered system for detecting manufacturing anomalies in real-time',
    fullDescription: `A comprehensive anomaly detection system that leverages deep learning to identify manufacturing defects in real-time. The system processes sensor data and visual inputs to maintain quality control standards.`,
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'FastAPI'],
    timeline: 'Jan 2023 - Present',
    role: 'Lead Data Scientist',
    company: 'Elshorbagy Plastic Group',
    images: [
      {
        url: '/images/anomaly-detection/main.jpg',
        caption: 'System Dashboard'
      },
      {
        url: '/images/anomaly-detection/architecture.jpg',
        caption: 'System Architecture'
      },
      {
        url: '/images/anomaly-detection/results.jpg',
        caption: 'Performance Results'
      }
    ],
    documents: [
      {
        name: 'Technical Documentation',
        url: '/docs/anomaly-detection-tech-doc.pdf'
      },
      {
        name: 'Research Paper',
        url: '/docs/anomaly-detection-paper.pdf'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/project',
      live: 'https://project-demo.com',
      youtube: 'https://youtube.com/watch?v=...'
    },
    keyFeatures: [
      'Real-time anomaly detection with 99.5% accuracy',
      'Processing of multiple data streams simultaneously',
      'Custom-built deep learning architecture',
      'Automated alert system',
      'Interactive dashboard for monitoring'
    ],
    challenges: [
      'Handling high-frequency sensor data in real-time',
      'Developing robust ML models for diverse anomaly types',
      'Optimizing system performance for production environment'
    ],
    results: [
      '50% reduction in quality control costs',
      '35% improvement in defect detection rate',
      '90% decrease in false positive alerts'
    ]
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">Timeline</h3>
            <p className="text-gray-600">{project.timeline}</p>
            <p className="text-gray-600">{project.company}</p>
            <p className="text-gray-600">{project.role}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <div className="flex space-x-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaExternalLinkAlt className="w-6 h-6" />
                </a>
              )}
              {project.links.youtube && (
                <a
                  href={project.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FaYoutube className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg" />
                    <p className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                      {image.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
              <p className="text-gray-600 mb-6 whitespace-pre-line">
                {project.fullDescription}
              </p>

              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3">Challenges & Solutions</h3>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-600">{challenge}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3">Results & Impact</h3>
              <ul className="list-disc list-inside space-y-2">
                {project.results.map((result, index) => (
                  <li key={index} className="text-gray-600">{result}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Documents & Resources */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <FaDownload className="w-5 h-5 text-gray-400 group-hover:text-primary-600 mr-3" />
                    <span className="text-gray-600 group-hover:text-gray-900">
                      {doc.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* PDF Preview */}
            {project.documents.map((doc, index) => (
              doc.url.endsWith('.pdf') && (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4">{doc.name} Preview</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Document
                      file={doc.url}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="w-full"
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={300}
                        className="mx-auto"
                      />
                    </Document>
                    {numPages && (
                      <div className="p-4 border-t text-center text-sm text-gray-600">
                        Page {pageNumber} of {numPages}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="w-full h-auto rounded-lg"
            />
            <p className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
              {selectedImage.caption}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDetail;
