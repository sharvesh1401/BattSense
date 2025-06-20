import React from 'react';
import { Battery, Zap, TrendingUp, BarChart3, Upload, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo via-indigo/90 to-indigo/80 text-white animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl transition-transform duration-300 hover:scale-110">
                <Battery className="h-16 w-16 text-pear animate-pulse" />
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pear bg-clip-text text-transparent animate-fade-in">
              BattSense
            </h1>
            
            <p className="text-xl sm:text-2xl text-ivory/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Advanced machine learning analytics for lithium-ion battery State of Health (SoH) prediction and degradation monitoring
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group bg-pear hover:bg-indigo text-color-text hover:text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto animate-scale-in"
            >
              <Upload className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Upload Battery Dataset
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Powerful Analytics Platform</h2>
            <p className="text-xl text-ivory/80 max-w-2xl mx-auto">
              Comprehensive tools for battery health analysis and predictive maintenance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 bg-pear/20 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <TrendingUp className="h-8 w-8 text-pear" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">ML-Powered Predictions</h3>
              <p className="text-ivory/80 leading-relaxed">
                Advanced machine learning models including SVR, LSTM, and DeepSeek AI for accurate SoH prediction
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 bg-indigo/20 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <BarChart3 className="h-8 w-8 text-ivory" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Dashboard</h3>
              <p className="text-ivory/80 leading-relaxed">
                Real-time visualization of battery degradation trends, cycle analysis, and predictive insights
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="p-3 bg-pear/20 rounded-lg w-fit mb-6 transition-transform duration-300 hover:scale-110">
                <Sparkles className="h-8 w-8 text-pear" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI-Enhanced Analysis</h3>
              <p className="text-ivory/80 leading-relaxed">
                Powered by DeepSeek AI for cutting-edge battery health predictions with superior accuracy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-xl text-ivory/80">Industry professionals and researchers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Battery Engineers',
              'EV Startups',
              'Research Teams',
              'Diagnostic Centers'
            ].map((useCase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in">
                <CheckCircle className="h-8 w-8 text-pear mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Battery className="h-6 w-6 text-pear" />
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