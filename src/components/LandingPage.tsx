import React, { useEffect, useRef } from 'react'; // Added useEffect, useRef
import { Battery, Zap, TrendingUp, BarChart3, Upload, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const textureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (textureRef.current && window.innerWidth >= 768) { // md breakpoint
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        // Calculate move relative to center of screen, parallaxFactor reduces the movement
        const parallaxFactor = 20; // Max pixels to move
        const moveX = (clientX / innerWidth - 0.5) * parallaxFactor;
        const moveY = (clientY / innerHeight - 0.5) * parallaxFactor;

        // Apply as backgroundPosition. Initial backgroundPosition is implicitly '0 0' or what's set by CSS.
        // We adjust it slightly based on mouse.
        // Adding 'px' unit is important for backgroundPosition.
        textureRef.current.style.backgroundPositionX = `${-moveX}px`;
        textureRef.current.style.backgroundPositionY = `${-moveY}px`;
      }
    };

    // Only add mouse listener on desktop, mobile will use CSS animation
    if (window.innerWidth >= 768) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (window.innerWidth >= 768) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      // Reset background position on unmount or if switching to mobile view (though effect re-run handles this better)
      if (textureRef.current) {
        textureRef.current.style.backgroundPositionX = '0px';
        textureRef.current.style.backgroundPositionY = '0px';
      }
    };
  }, []); // Empty dependency array, effect runs once on mount & unmount

  // SVG Data URI for a subtle dot pattern (20x20 tile with one dot)
  const dotPatternUri = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2.5' cy='2.5' r='0.5' fill='rgba(239,236,236,0.25)'/%3E%3C/svg%3E";
  // rgba(239,236,236,0.25) is ivory at 25% opacity for the dot

  return (
    <div className="min-h-screen text-ivory animate-fade-in bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Removed old background pattern div */}
        {/* New Texture Layer */}
        <div
          id="landing-texture-bg"
          ref={textureRef}
          className="absolute inset-0 z-0 opacity-30 animate-texture-scroll md:animate-none" // Removed non-standard transition-background-position
          style={{
            backgroundImage: `url("${dotPatternUri}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '20px 20px', // Matches the animation
          }}
        ></div>
        
        {/* Hero Content - ensure it's above texture */}
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