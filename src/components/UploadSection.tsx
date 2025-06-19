import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Zap, Brain, TrendingUp } from 'lucide-react';

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

  const models = [
    { id: 'SVR', name: 'Support Vector Regression', icon: Brain, accuracy: '94%', speed: 'Fast' },
    { id: 'LSTM', name: 'Long Short-Term Memory', icon: TrendingUp, accuracy: '96%', speed: 'Medium' },
    { id: 'Ensemble', name: 'Ensemble Model', icon: Zap, accuracy: '97%', speed: 'Slow' }
  ];

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
    setFileErrorMessages([]); // Clear previous errors

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
    setFileErrorMessages([]); // Clear previous errors
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        setFileErrorMessages(['Invalid file type. Please upload a CSV file.']);
        setSelectedFile(null);
        // Also clear the input field value to allow re-selection of the same "invalid" file if the user wishes
        e.target.value = '';
      }
    }
  };

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsProcessing(true);
      setTimeout(() => {
        onFileUpload(selectedFile);
        setIsProcessing(false);
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Upload Battery Dataset</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Upload your battery cycle data and select a machine learning model for SoH prediction analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* File Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">Dataset Upload</h3>
          
          <label htmlFor="csvFileInput" className="sr-only">Upload CSV dataset</label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <p className="font-semibold text-slate-900">{selectedFile.name}</p>
                  <p className="text-sm text-slate-500">
                    {Math.round(selectedFile.size / 1024)} KB • CSV format
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    Drop your CSV file here
                  </p>
                  <p className="text-slate-500">or click to browse</p>
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
            <div className="mt-2 text-red-600 text-sm">
              {fileErrorMessages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
            </div>
          )}

          {/* File Requirements */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">File Requirements</h4>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• CSV format with cycle data</li>
                  <li>• Columns: cycle_number, voltage, current, temperature</li>
                  <li>• Maximum file size: 50MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 id="model-selection-heading" className="text-2xl font-semibold text-slate-900 mb-6">Select ML Model</h3>
          
          <div role="radiogroup" aria-labelledby="model-selection-heading" className="space-y-4">
            {models.map((model) => {
              const IconComponent = model.icon;
              const isSelected = selectedModel === model.id;
              
              return (
                <div
                  key={model.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleModelSelect(model.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleModelSelect(model.id);
                    }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{model.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-slate-500">Accuracy: {model.accuracy}</span>
                        <span className="text-sm text-slate-500">Speed: {model.speed}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Model Info */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-2">Selected Model</h4>
            <p className="text-sm text-slate-600">
              {models.find(m => m.id === selectedModel)?.name || 'No model selected'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {selectedModel === 'SVR' && 'Fast training with good performance on small datasets'}
              {selectedModel === 'LSTM' && 'Deep learning model excellent for time series data'}
              {selectedModel === 'Ensemble' && 'Combines multiple models for highest accuracy'}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isProcessing}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
              !selectedFile || isProcessing
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-pear hover:bg-pear/90 text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
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