import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">© {new Date().getFullYear()} Ahmed Ashraf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
