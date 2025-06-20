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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-4xl font-bold text-color-text mb-4">Upload Battery Dataset</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your battery cycle data and select a machine learning model for SoH prediction analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* File Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in">
          <h3 className="text-2xl font-semibold text-color-text mb-6">Dataset Upload</h3>
          
          <label htmlFor="csvFileInput" className="sr-only">Upload CSV dataset</label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:scale-102 ${
              dragOver 
                ? 'border-indigo bg-indigo/5 scale-105' 
                : selectedFile
                ? 'border-pear bg-pear/5'
                : 'border-gray-300 hover:border-pear/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4 animate-fade-in">
                <CheckCircle className="h-12 w-12 text-pear mx-auto animate-scale-in" />
                <div>
                  <p className="font-semibold text-color-text">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round(selectedFile.size / 1024)} KB • CSV format
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto transition-colors duration-200 hover:text-indigo" />
                <div>
                  <p className="text-lg font-medium text-color-text">
                    Drop your CSV file here
                  </p>
                  <p className="text-gray-500">or click to browse</p>
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
            <div className="mt-2 text-red-600 text-sm animate-fade-in">
              {fileErrorMessages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
            </div>
          )}

          {/* File Requirements */}
          <div className="mt-6 p-4 bg-indigo/5 rounded-lg animate-fade-in">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium text-indigo">File Requirements</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• CSV format with cycle data</li>
                  <li>• Columns: cycle_number, voltage, current, temperature</li>
                  <li>• Maximum file size: 50MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in">
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={onModelChange}
          />

          {/* Selected Model Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h4 className="font-medium text-color-text mb-2">Selected Model</h4>
            <p className="text-sm text-gray-600">
              {selectedModel === 'SVR' && 'Random Forest - Fast training with good performance'}
              {selectedModel === 'LSTM' && 'LSTM Neural Network - Deep learning for time series'}
              {selectedModel === 'DeepSeek' && 'DeepSeek AI - Advanced AI with latest algorithms'}
            </p>
            {selectedModel === 'DeepSeek' && (
              <p className="text-xs text-indigo mt-1 animate-fade-in">
                ✨ Powered by DeepSeek's advanced AI models
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isProcessing}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
              !selectedFile || isProcessing
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-pear hover:bg-indigo text-color-text hover:text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Processing with {selectedModel}...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Predict SoH</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;