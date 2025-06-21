import React from 'react';
import { Battery, Zap, TrendingUp, BarChart3, Upload, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground'; // Import the new background

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  // Removed textureRef, useEffect for mouse move, and dotPatternUri

  return (
    <div className="min-h-screen text-ivory animate-fade-in bg-black">
      <InteractiveBackground /> {/* Add the interactive background component here */}
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Removed old background pattern div (landing-texture-bg) */}
        
        {/* Hero Content - ensure it's above texture */}
        {/* Ensure z-10 is sufficient or adjust if InteractiveBackground causes issues, though it has z-index: -10 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-8">
              <div className="p-4 backdrop-blur-sm rounded-2xl transition-transform duration-300 hover:scale-110">
                <Battery className="h-16 w-16 animate-pulse text-primary" /> {/* Icon color: primary */}
              </div>
            </div>
            
            {/* Main Heading - Applied new gradient */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent animate-fade-in">
              BattSense
            </h1>
            
            <p className="text-xl sm:text-2xl text-ivory/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Advanced machine learning analytics for lithium-ion battery State of Health (SoH) prediction and degradation monitoring
            </p>
            
            {/* CTA Button - Primary Action Button styling */}
            <button
              onClick={onGetStarted}
              className="group bg-primary text-black hover:bg-primary-dark rounded-2xl font-semibold py-4 px-8 transform hover:scale-105 transition-all duration-300 flex items-center mx-auto animate-scale-in shadow-md"
            >
              <Upload className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Upload Battery Dataset
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Added section background */}
      <div className="py-24 bg-neutral-900 backdrop-blur-sm rounded-2xl my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-ivory">Powerful Analytics Platform</h2> {/* Adjusted size */}
            <p className="text-xl text-ivory/80 max-w-2xl mx-auto">
              Comprehensive tools for battery health analysis and predictive maintenance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Added card bg, border, and icon color */}
            <div className="bg-neutral-800 border border-neutral-700 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-ivory">ML-Powered Predictions</h3>
              <p className="text-ivory/80 leading-relaxed">
                Advanced machine learning models including SVR, LSTM, and DeepSeek AI for accurate SoH prediction
              </p>
            </div>
            
            {/* Feature 2 - Added card bg, border. Icon text-ivory is fine. */}
            <div className="bg-neutral-800 border border-neutral-700 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <BarChart3 className="h-8 w-8 text-ivory" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-ivory">Interactive Dashboard</h3>
              <p className="text-ivory/80 leading-relaxed">
                Real-time visualization of battery degradation trends, cycle analysis, and predictive insights
              </p>
            </div>
            
            {/* Feature 3 - Added card bg, border, and icon color */}
            <div className="bg-neutral-800 border border-neutral-700 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-ivory">AI-Enhanced Analysis</h3>
              <p className="text-ivory/80 leading-relaxed">
                Powered by DeepSeek AI for cutting-edge battery health predictions with superior accuracy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 bg-neutral-900 backdrop-blur-sm rounded-2xl my-12"> {/* Added section background from previous step, was missing here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-ivory">Perfect For</h2>
            <p className="text-xl text-ivory/80">Industry professionals and researchers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Battery Engineers',
              'EV Startups',
              'Research Teams',
              'Diagnostic Centers'
            ].map((useCase, index) => (
              // Corrected: Removed bg-white/10, hover:bg-white/20. Added bg-neutral-800, border. Icon text-highlight.
              <div key={index} className="bg-neutral-800 border border-neutral-700 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 animate-fade-in">
                <CheckCircle className="h-8 w-8 text-highlight mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold text-ivory">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Corrected border and icon color */}
      <footer className="py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Battery className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-ivory">BattSense</span>
          </div>
          <p className="text-ivory/80">
            Built with advanced machine learning for battery health prediction
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;