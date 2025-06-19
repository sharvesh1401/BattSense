import React from 'react';
import { Battery, Zap, TrendingUp, BarChart3, Upload, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Battery className="h-16 w-16 text-blue-300" />
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              BattSense
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning analytics for lithium-ion battery State of Health (SoH) prediction and degradation monitoring
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group bg-pear hover:bg-pear/90 text-gray-800 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Analytics Platform</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive tools for battery health analysis and predictive maintenance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-6">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">ML-Powered Predictions</h3>
              <p className="text-blue-100 leading-relaxed">
                Advanced machine learning models including SVR, LSTM, and ensemble methods for accurate SoH prediction
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-6">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Dashboard</h3>
              <p className="text-blue-100 leading-relaxed">
                Real-time visualization of battery degradation trends, cycle analysis, and predictive insights
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-6">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Production Ready</h3>
              <p className="text-blue-100 leading-relaxed">
                Enterprise-grade analytics with secure data handling and scalable architecture
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-xl text-blue-100">Industry professionals and researchers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Battery Engineers',
              'EV Startups',
              'Research Teams',
              'Diagnostic Centers'
            ].map((useCase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Battery className="h-6 w-6 text-blue-300" />
            <span className="text-xl font-bold text-blue-200">BattSense</span>
          </div>
          <p className="text-blue-200">
            Built with advanced machine learning for battery health prediction
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;