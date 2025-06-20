import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Zap, Brain, TrendingUp, Sparkles } from 'lucide-react';
import ModelSelector from './ModelSelector';
import { predictWithDeepSeek } from '../services/deepseekApi';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload, selectedModel, onModelChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileErrorMessages, setFileErrorMessages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setFileErrorMessages([]);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        setFileErrorMessages(['Invalid file type. Please upload a CSV file.']);
        setSelectedFile(null);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileErrorMessages([]);
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        setFileErrorMessages(['Invalid file type. Please upload a CSV file.']);
        setSelectedFile(null);
        e.target.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsProcessing(true);
      
      try {
        if (selectedModel === 'DeepSeek') {
          // Simulate battery data extraction from file
          const batteryData = {
            voltage: 3.7,
            current: 2.5,
            temperature: 25,
            cycleCount: 150,
            capacity: 2.8
          };
          
          await predictWithDeepSeek(batteryData);
        }
        
        setTimeout(() => {
          onFileUpload(selectedFile);
          setIsProcessing(false);
        }, 100);
      } catch (error) {
        console.error('Prediction error:', error);
        setFileErrorMessages(['Failed to process with selected model. Please try again.']);
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in px-4 sm:px-0">
      <div className="text-center mb-8 sm:mb-12 animate-slide-up">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-ivory">Upload Battery Dataset</h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto text-ivory/75">
          Upload your battery cycle data and select a machine learning model for SoH prediction analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* File Upload Section Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-8 animate-scale-in">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-ivory">Dataset Upload</h3>
          
          <label htmlFor="csvFileInput" className="sr-only">Upload CSV dataset</label>
          {/* File Input Area */}
          <div
            className={`relative bg-neutral-800 border-2 border-dashed border-neutral-700 hover:border-secondary rounded-xl p-4 sm:p-8 text-center transition-all duration-300 hover:scale-102 ${
              dragOver ? 'border-secondary' : '' // Highlight on drag over
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-3 sm:space-y-4 animate-fade-in">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto animate-scale-in text-highlight" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-ivory">{selectedFile.name}</p>
                  <p className="text-xs sm:text-sm text-ivory/75">
                    {Math.round(selectedFile.size / 1024)} KB • CSV format
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto transition-colors duration-200 text-ivory/75" />
                <div>
                  <p className="text-base sm:text-lg font-medium text-ivory">
                    Drop your CSV file here
                  </p>
                  <p className="text-sm sm:text-base text-ivory/75">or click to browse</p>
                </div>
              </div>
            )}
            
            <input
              id="csvFileInput"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {fileErrorMessages.length > 0 && (
            <div className="mt-2 text-red-500 text-sm animate-fade-in"> {/* Error text color */}
              {fileErrorMessages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
            </div>
          )}

          {/* File Requirements Info Box */}
          <div className="mt-6 p-4 bg-neutral-800 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 mt-0.5 text-secondary" />
              <div>
                <h4 className="font-medium text-ivory">File Requirements</h4>
                <ul className="text-sm text-ivory/75 mt-1 space-y-1">
                  <li>• CSV format with cycle data</li>
                  <li>• Columns: cycle_number, voltage, current, temperature</li>
                  <li>• Maximum file size: 50MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-8 animate-scale-in">
          {/* ModelSelector might need internal styling for bg-neutral-800, text-ivory, etc. */}
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={onModelChange}
          />

          {/* Selected Model Info Box */}
          <div className="mt-6 p-3 sm:p-4 bg-neutral-800 rounded-lg animate-fade-in">
            <h4 className="font-medium mb-1 sm:mb-2 text-base sm:text-lg text-ivory">Selected Model</h4>
            <p className="text-sm text-ivory/75">
              {selectedModel === 'SVR' && 'Random Forest - Fast training with good performance'}
              {selectedModel === 'LSTM' && 'LSTM Neural Network - Deep learning for time series'}
              {selectedModel === 'DeepSeek' && 'DeepSeek AI - Advanced AI with latest algorithms'}
            </p>
            {selectedModel === 'DeepSeek' && (
              <p className="text-xs mt-1 animate-fade-in text-secondary">
                ✨ Powered by DeepSeek's advanced AI models
              </p>
            )}
          </div>

          {/* Primary Action Button: "Predict SoH" */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isProcessing}
            className={`w-full mt-6 sm:mt-8 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 text-base shadow-md ${
              !selectedFile || isProcessing
                ? 'bg-neutral-700 text-ivory/50 cursor-not-allowed' // Disabled state
                : 'bg-primary text-black hover:bg-primary-dark' // Active state
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-ivory/50 border-t-ivory rounded-full animate-spin"></div> {/* Adjusted spinner color for dark theme */}
                <span className="text-sm sm:text-base">Processing with {selectedModel}...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Predict SoH</span> {/* Responsive text */}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;