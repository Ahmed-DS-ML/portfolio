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
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary-200 rounded-full animate-pulse"></div>
              <img
                src="/images/profile.jpg"
                alt="Ahmed Ashraf"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white shadow-xl transform transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
