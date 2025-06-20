import React, { useState } from 'react';
import { Brain, TrendingUp, Zap, Settings, BarChart3, Clock, Target, CheckCircle, Sparkles } from 'lucide-react';

interface ModelSettingsProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSettings: React.FC<ModelSettingsProps> = ({ selectedModel, onModelChange }) => {
  const [isTraining, setIsTraining] = useState(false);

  const models = [
    {
      id: 'SVR',
      name: 'Support Vector Regression',
      icon: Brain,
      accuracy: 94.2,
      speed: 'Fast',
      description: 'Traditional ML approach with kernel methods for non-linear regression',
      pros: ['Fast training', 'Good for small datasets', 'Robust to outliers'],
      cons: ['Less accurate on complex patterns', 'Limited deep learning capabilities'],
      params: {
        kernel: 'RBF',
        C: 1.0,
        gamma: 'scale',
        epsilon: 0.1
      }
    },
    {
      id: 'LSTM',
      name: 'Long Short-Term Memory',
      icon: TrendingUp,
      accuracy: 96.7,
      speed: 'Medium',
      description: 'Deep learning RNN architecture for sequential battery data',
      pros: ['Excellent for time series', 'Captures long-term dependencies', 'High accuracy'],
      cons: ['Requires more data', 'Longer training time', 'More complex'],
      params: {
        units: 64,
        dropout: 0.2,
        epochs: 100,
        batchSize: 32
      }
    },
    {
      id: 'DeepSeek',
      name: 'DeepSeek AI Model',
      icon: Sparkles,
      accuracy: 98.3,
      speed: 'Fast',
      description: 'Advanced AI model with cutting-edge algorithms for superior predictions',
      pros: ['Highest accuracy', 'Latest AI technology', 'Continuous learning'],
      cons: ['Requires API connection', 'Usage-based pricing', 'Internet dependent'],
      params: {
        model: 'DeepSeek-V3',
        temperature: 0.1,
        maxTokens: 1024,
        apiVersion: 'v1'
      }
    }
  ];

  const performanceMetrics = [
    { name: 'Mean Absolute Error', value: selectedModel === 'DeepSeek' ? '0.018' : '0.023', unit: 'SoH' },
    { name: 'Root Mean Square Error', value: selectedModel === 'DeepSeek' ? '0.025' : '0.031', unit: 'SoH' },
    { name: 'R² Score', value: selectedModel === 'DeepSeek' ? '0.983' : '0.967', unit: '' },
    { name: 'Processing Time', value: selectedModel === 'DeepSeek' ? '1.8' : '2.4', unit: 'seconds' }
  ];

  const handleRetrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-0 text-ivory">
      {/* Header */}
      <div className="text-center animate-slide-up">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Model Management</h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto text-ivory/75">
          Configure and manage machine learning models for battery SoH prediction
        </p>
      </div>

      {/* Model Selection Card Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-scale-in">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-ivory">Available Models</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {models.map((model) => {
            const IconComponent = model.icon;
            const isSelected = selectedModel === model.id;
            
            return (
              // Model Selection Card Styling
              <div
                key={model.id}
                className={`p-4 sm:p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in border-2 ${
                  isSelected
                    ? 'border-secondary bg-neutral-700 shadow-md'
                    : 'border-neutral-700 bg-neutral-800 hover:border-secondary/75'
                }`}
                onClick={() => onModelChange(model.id)}
              >
                <div className="flex items-start sm:items-center space-x-3 mb-3 sm:mb-4">
                  {/* Icon Container Styling */}
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                     isSelected ? 'bg-secondary text-ivory' : 'bg-neutral-700 text-ivory/75'
                  }`}>
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-ivory">{model.name}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1">
                      <span className="text-xs sm:text-sm text-ivory/60">{model.accuracy}% accuracy</span>
                      <span className="text-xs sm:text-sm text-ivory/60">{model.speed} speed</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-ivory/75">{model.description}</p>
                
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium text-primary mb-1">Advantages</h5>
                    <ul className="text-xs space-y-0.5 sm:space-y-1 text-ivory/75">
                      {model.pros.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 flex-shrink-0 text-primary" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium text-ivory/75 mb-1">Considerations</h5>
                    <ul className="text-xs space-y-0.5 sm:space-y-1 text-ivory/75">
                      {model.cons.map((con, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-neutral-600"></div>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Model Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Model Parameters Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center space-x-2 text-ivory">
            <span>{models.find(m => m.id === selectedModel)?.name} Parameters</span>
            {selectedModel === 'DeepSeek' && <Sparkles className="h-5 w-5 text-secondary" />}
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(models.find(m => m.id === selectedModel)?.params || {}).map(([key, value]) => (
              // Parameter List Item Styling
              <div key={key} className="flex flex-col sm:flex-row justify-between sm:items-center p-2 sm:p-3 bg-neutral-800 rounded-lg transition-colors duration-200">
                <span className="font-medium capitalize text-sm sm:text-base text-ivory">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-mono text-xs sm:text-sm mt-1 sm:mt-0 text-ivory/75">
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
              </div>
            ))}
          </div>
          
          {/* DeepSeek Info Box Styling */}
          {selectedModel === 'DeepSeek' && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-neutral-800 rounded-lg animate-fade-in">
              <p className="text-xs flex items-center space-x-1 text-secondary">
                <Sparkles className="h-3 w-3" />
                <span>Connected to DeepSeek AI API for real-time predictions</span>
              </p>
            </div>
          )}
          
          {/* Retrain Button Styling (Primary if active, else disabled) */}
          <button
            onClick={handleRetrain}
            disabled={isTraining || selectedModel === 'DeepSeek'}
            className={`w-full mt-4 sm:mt-6 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 text-sm sm:text-base shadow-md ${
              isTraining || selectedModel === 'DeepSeek'
                ? 'bg-neutral-700 text-ivory/50 cursor-not-allowed' // Disabled state
                : 'bg-primary text-black hover:bg-primary-dark' // Active state
            }`}
          >
            {isTraining ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-ivory/50 border-t-ivory rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Retraining Model...</span>
              </div>
            ) : selectedModel === 'DeepSeek' ? (
              'DeepSeek models are pre-trained'
            ) : (
              'Retrain Model'
            )}
          </button>
        </div>

        {/* Performance Metrics Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Performance Metrics</h3>
          
          <div className="space-y-4 sm:space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between animate-fade-in">
                <div>
                  <p className="font-medium text-sm sm:text-base text-ivory">{metric.name}</p>
                  <p className="text-xs sm:text-sm text-ivory/75">Current model performance</p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold text-secondary">{metric.value}</p>
                  <p className="text-xs sm:text-sm text-ivory/75">{metric.unit}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Accuracy Chart Styling */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-neutral-800 rounded-lg animate-fade-in">
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base text-ivory">Training Progress</h4>
            <div className="h-24 sm:h-32 flex items-end justify-between space-x-0.5 sm:space-x-1">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-secondary to-primary rounded-t transition-all duration-500 hover:scale-110"
                  style={{
                    height: `${60 + (i * 2) + Math.random() * 10}%`,
                    width: '4%'
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs sm:text-sm mt-2 text-ivory/60">
              <span>Epoch 1</span>
              <span>Epoch 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Configuration Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Advanced Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-base sm:text-lg text-ivory">Data Preprocessing</h4>
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Normalize input features</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Remove outliers</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Apply smoothing</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-base sm:text-lg text-ivory">Validation</h4>
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Cross-validation</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Early stopping</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Hyperparameter tuning</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-base sm:text-lg text-ivory">Output</h4>
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Confidence intervals</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Uncertainty quantification</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-secondary focus:ring-offset-black focus:ring-secondary" />
                <span className="text-xs sm:text-sm transition-colors duration-200 text-ivory/75 group-hover:text-ivory">Feature importance</span>
              </label>
            </div> {/* Closes div className="space-y-2 sm:space-y-3" for Output checkboxes */}
          </div> {/* Closes div className="space-y-3 sm:space-y-4" for Output column */}
        </div> {/* Closes div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" for Advanced Config sections */}
      </div> {/* Closes div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up" for Advanced Configuration Card */}
    </div> /* Closes main component wrapper div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-0 text-ivory" */
  );
};

export default ModelSettings;