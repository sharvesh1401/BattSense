import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Battery, Upload, BarChart3, Settings, Menu, X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import AnimatedDotBackground from './components/AnimatedDotBackground';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const debounce = useCallback(<F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const debounced = (...args: Parameters<F>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
    return debounced;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isMobileMenuOpen) {
        setShowHeader(true);
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 64) { // Header height approx 64px
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    const debouncedScrollHandler = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, [lastScrollY, isMobileMenuOpen, debounce]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleResize = () => {
        if (window.innerWidth >= 768) { // md breakpoint
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    <div className="min-h-screen animate-fade-in">
      {/* Hamburger Menu Button - visible only on small screens */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 rounded-md text-ivory hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        aria-label="Open mobile menu"
      >
        <Menu size={28} />
      </button>

      {/* Header - Added transform classes for scroll behavior */}
      <header
        className={`bg-neutral-900 backdrop-blur-sm sticky top-0 z-50 shadow-md transition-transform duration-300 ease-in-out ${
          (showHeader || isMobileMenuOpen) ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between h-auto sm:h-16 py-3 sm:py-0">
            {/* Wrapped logo and title in an anchor to make it clickable, e.g., to go to a default tab */}
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('upload'); setIsMobileMenuOpen(false); }} className="flex items-center space-x-3 self-start sm:self-center no-underline">
              <div className="p-2 rounded-lg transition-transform duration-200 hover:scale-110">
                <Battery className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-ivory">BattSense</h1>
            </a>
            
            {/* Desktop Navigation - hidden on small screens */}
            {/* Note: Removed setIsMobileMenuOpen(false) from desktop nav button clicks as it's not relevant there */}
            <nav className="hidden md:flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto mt-3 sm:mt-0 sm:space-x-1 space-y-1 sm:space-y-0">
              <button
                onClick={() => { setActiveTab('upload'); }}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'upload' 
                    ? 'bg-secondary text-ivory shadow-md'
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory'
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Upload
              </button>
              <button
                onClick={() => { setActiveTab('dashboard'); }}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'dashboard' 
                    ? 'bg-secondary text-ivory shadow-md'
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => { setActiveTab('models'); }}
                className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto flex items-center justify-center text-sm ${
                  activeTab === 'models' 
                    ? 'bg-secondary text-ivory shadow-md'
                    : 'text-ivory/75 hover:bg-secondary hover:text-ivory'
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