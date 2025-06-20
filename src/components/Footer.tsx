import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ivory text-gray-700 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 animate-fade-in">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p className="text-sm">
          Disclaimer: This tool is for educational and demonstration purposes only.
          Predictions are based on simulated models and should not be used for critical decisions.
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} BattSense. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;