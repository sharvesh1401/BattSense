import React, { useState } from 'react';
import { Battery, Upload, BarChart3, Settings, Download, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import LandingPage from './components/LandingPage';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import ModelSettings from './components/ModelSettings';
import Footer from './components/Footer';

type ActiveTab = 'landing' | 'upload' | 'dashboard' | 'models';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('SVR');
  const [predictionResults, setPredictionResults] = useState<any>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate prediction results
    setTimeout(() => {
      setPredictionResults({
        batteryId: 'B0005',
        predictedSoH: 0.78,
        confidence: 0.92,
        cycleCount: 150,
        degradationRate: 0.15,
        remainingCycles: 45
      });
      setActiveTab('dashboard');
    }, 2000);
  };

  if (activeTab === 'landing') {
    return <LandingPage onGetStarted={() => setActiveTab('upload')} />;
  }

  return (
    <div className="min-h-screen bg-ivory"> {/* Updated background color */}
      {/* Header */}
      <header className="bg-indigo backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"> {/* Updated header background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pear rounded-lg"> {/* Updated icon background */}
                <Battery className="h-6 w-6 text-gray-800" /> {/* Updated icon color */}
              </div>
              <h1 className="text-xl font-bold text-ivory">BattSense</h1> {/* Updated text color */}
            </div>
            
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'upload' 
                    ? 'bg-pear text-gray-800 shadow-sm'
                    : 'text-ivory hover:text-white hover:bg-indigo/75'
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Upload
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-pear text-gray-800 shadow-sm'
                    : 'text-ivory hover:text-white hover:bg-indigo/75'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'models' 
                    ? 'bg-pear text-gray-800 shadow-sm'
                    : 'text-ivory hover:text-white hover:bg-indigo/75'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Models
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <UploadSection 
            onFileUpload={handleFileUpload}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        )}
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            uploadedFile={uploadedFile}
            predictionResults={predictionResults}
            selectedModel={selectedModel}
          />
        )}
        
        {activeTab === 'models' && (
          <ModelSettings 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;