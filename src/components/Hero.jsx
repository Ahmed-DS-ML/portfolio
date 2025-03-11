import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Hero = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/ahmed-datascince/",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/Ahmed-DS-ML",
      color: "hover:text-[#333]",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/AhmedAshraf",  // Update this with your Twitter handle
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:ahmed.datascince@gmail.com",
      color: "hover:text-[#EA4335]",
    },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="/images/profile.jpg"
                alt="Ahmed Ashraf"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl filter contrast-105 brightness-105"
                style={{ boxShadow: "0 0 25px rgba(0, 100, 150, 0.3)" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                loading="lazy"
              />
              <motion.div
                className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 tracking-tight">
                Ahmed Ashraf
              </h1>
              {/* Social Media Icons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-4 justify-center lg:justify-start"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 ${social.color} transform hover:scale-110 transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    title={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="text-lg sm:text-xl md:text-2xl text-primary-600">
              <TypeAnimation
                sequence={[
                  "Data Scientist",
                  2000,
                  "ML Engineer",
                  2000,
                  "Analytics & Automation Lead",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="text-lg text-secondary-600 mb-8 max-w-2xl">
              Transforming data into actionable insights and building
              intelligent automation solutions. Currently leading analytics and
              automation initiatives at Elshorbagy Plastic Group.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                className="px-8 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#projects"
                className="px-8 py-3 bg-white text-primary-600 rounded-full hover:bg-primary-50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
