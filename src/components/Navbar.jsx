import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      href: 'https://github.com/yourusername',
      hoverColor: 'hover:text-gray-900'
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/in/yourusername',
      hoverColor: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: FaTwitter, 
      href: 'https://twitter.com/yourusername',
      hoverColor: 'hover:text-sky-500'
    },
    { 
      name: 'YouTube', 
      icon: FaYoutube, 
      href: 'https://www.youtube.com/@AhmedAshraf-f3y',
      hoverColor: 'hover:text-red-600'
    }
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-300 transition-all duration-300"
              onClick={() => handleNavClick('#home')}
            >
              Ahmed Ashraf
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links */}
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 text-secondary-600 hover:text-primary-600 text-sm font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-primary-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out transform origin-center"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-secondary-400 ${social.hoverColor} transition-colors transform hover:scale-110 duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 px-3 py-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-secondary-400 ${social.hoverColor} transition-colors`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Mobile Resume Button */}
              <div className="px-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
