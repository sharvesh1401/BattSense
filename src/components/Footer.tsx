import React from 'react';
import { Github, ExternalLink, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    // Removed bg-ivory, text-gray-700, border-gray-200. Added specific border color.
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-neutral-800 animate-fade-in">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        {/* Links Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
          {/* GitHub Link */}
          <a
            href="https://github.com/sharvesh1401"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-ivory/75 hover:text-ivory transition-colors duration-200 group"
          >
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          
          {/* EV Tools Button */}
          <a
            href="https://eco-amp.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-primary text-black hover:bg-primary-dark px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Zap className="h-4 w-4" />
            <span className="text-sm">More EV Tools</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        {/* Made by section */}
        <p className="text-sm text-ivory/75 mb-2">
          Made by{' '}
          <a
            href="https://sharveshfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-secondary-dark font-medium transition-colors duration-200 underline decoration-secondary/50 hover:decoration-secondary"
          >
            Sharvesh Selvakumar
          </a>
        </p>
        
        <p className="text-sm text-ivory/75"> {/* Made disclaimer text slightly less emphasized */}
          Disclaimer: This tool is for educational and demonstration purposes only.
          Predictions are based on simulated models and should not be used for critical decisions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;