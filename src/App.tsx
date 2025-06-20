import React, { useState } from 'react';
import { Battery, Upload, BarChart3, Settings } from 'lucide-react'; // Removed unused icons
import LandingPage from './components/LandingPage';
import AnimatedDotBackground from './components/AnimatedDotBackground'; // Import the new component
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
        remainingCycles: 45,
        model: selectedModel
      });
      setActiveTab('dashboard');
    }, 2000);
  };

  if (activeTab === 'landing') {
    // It's better to apply bg-ivory directly to LandingPage or its container
    // to avoid it flashing or affecting other views if App's root div changes bg.
    // For now, LandingPage itself should define its background.
    // We'll assume LandingPage.tsx will be updated to have bg-ivory.
    return <LandingPage onGetStarted={() => setActiveTab('upload')} />;
  }

  return (
    // Removed conditional bg-ivory. Root div allows global background.
    <div className="min-h-screen animate-fade-in">
      {/* Header - Applying new theme background */}
      <header className="bg-neutral-900 backdrop-blur-sm sticky top-0 z-50 animate-slide-up shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed to flex-col on mobile, sm:flex-row for larger. Adjusted height and padding for mobile. */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center space-x-3 self-start sm:self-center"> {/* Ensure title aligns left on mobile */}
              {/* Logo icon container - can add subtle bg if needed, e.g., bg-neutral-800 */}
              <div className="p-2 rounded-lg transition-transform duration-200 hover:scale-110">
                <Battery className="h-6 w-6 text-primary" /> {/* Using primary color for logo icon */}
              </div>
              <h1 className="text-xl font-bold text-ivory">BattSense</h1> {/* text-ivory is new default */}
            </div>
            
            {/* Nav stacks vertically on mobile, row on sm+. Buttons take full width on mobile. */}
            <nav className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto mt-3 sm:mt-0 sm:space-x-1 space-y-1 sm:space-y-0">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'upload' 
                    ? 'bg-secondary text-ivory shadow-md' // Active secondary button style
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory' // Inactive style
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Upload
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'dashboard' 
                    ? 'bg-secondary text-ivory shadow-md' // Active secondary button style
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory' // Inactive style
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'models' 
                    ? 'bg-secondary text-ivory shadow-md' // Active secondary button style
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory' // Inactive style
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative bg-transparent"> {/* Added bg-transparent */}
        {activeTab !== 'landing' && (
          <AnimatedDotBackground className="absolute inset-0 -z-10" />
        )}
        <div className="relative z-10 bg-transparent"> {/* Added bg-transparent. This div will contain the actual content, ensuring it's above the background */}
          {activeTab === 'upload' && (
            <div className="animate-slide-up">
              <UploadSection
                onFileUpload={handleFileUpload}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="animate-slide-up">
              <Dashboard
                uploadedFile={uploadedFile}
                predictionResults={predictionResults}
                selectedModel={selectedModel}
              />
            </div>
          )}

          {activeTab === 'models' && (
            <div className="animate-slide-up">
              <ModelSettings
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;