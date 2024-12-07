import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary-200 rounded-full animate-pulse"></div>
              <img
                src="/images/profile.jpg"
                alt="Ahmed Ashraf"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-4">
              Ahmed Ashraf
            </h1>
            <div className="text-xl md:text-2xl text-primary-600 mb-6">
              <TypeAnimation
                sequence={[
                  'Data Scientist',
                  2000,
                  'ML Engineer',
                  2000,
                  'Analytics & Automation Lead',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="text-lg text-secondary-600 mb-8 max-w-2xl">
              Transforming data into actionable insights and building intelligent automation solutions. 
              Currently leading analytics and automation initiatives at Elshorbagy Plastic Group.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-8 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="px-8 py-3 bg-white text-primary-600 rounded-full hover:bg-primary-50 transition-colors duration-300"
              >
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
