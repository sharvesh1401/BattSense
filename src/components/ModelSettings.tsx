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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center animate-slide-up">
        <h2 className="text-4xl font-bold text-color-text mb-4">Model Management</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Configure and manage machine learning models for battery SoH prediction
        </p>
      </div>

      {/* Model Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in">
        <h3 className="text-2xl font-semibold text-color-text mb-6">Available Models</h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {models.map((model) => {
            const IconComponent = model.icon;
            const isSelected = selectedModel === model.id;
            
            return (
              <div
                key={model.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in ${
                  isSelected
                    ? 'border-2 border-indigo bg-indigo/5 shadow-lg'
                    : 'border-2 border-gray-200 hover:border-pear/50 hover:shadow-md'
                }`}
                onClick={() => onModelChange(model.id)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    isSelected ? 'bg-indigo text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-color-text">{model.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {model.accuracy}% accuracy
                      </span>
                      <span className="text-sm text-gray-500">
                        {model.speed} speed
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-pear mb-1">Advantages</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {model.pros.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-pear" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-orange-700 mb-1">Considerations</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {model.cons.map((con, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-orange-300"></div>
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

      {/* Current Model Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Model Parameters */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up">
          <h3 className="text-xl font-semibold text-color-text mb-6 flex items-center space-x-2">
            <span>{models.find(m => m.id === selectedModel)?.name} Parameters</span>
            {selectedModel === 'DeepSeek' && <Sparkles className="h-5 w-5 text-indigo" />}
          </h3>
          
          <div className="space-y-4">
            {Object.entries(models.find(m => m.id === selectedModel)?.params || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-indigo/5">
                <span className="font-medium text-color-text capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-gray-600 font-mono text-sm">
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
              </div>
            ))}
          </div>
          
          {selectedModel === 'DeepSeek' && (
            <div className="mt-4 p-3 bg-indigo/5 rounded-lg animate-fade-in">
              <p className="text-xs text-indigo flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>Connected to DeepSeek AI API for real-time predictions</span>
              </p>
            </div>
          )}
          
          <button
            onClick={handleRetrain}
            disabled={isTraining || selectedModel === 'DeepSeek'}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
              isTraining || selectedModel === 'DeepSeek'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-pear hover:bg-indigo text-color-text hover:text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isTraining ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Retraining Model...</span>
              </div>
            ) : selectedModel === 'DeepSeek' ? (
              'DeepSeek models are pre-trained'
            ) : (
              'Retrain Model'
            )}
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up">
          <h3 className="text-xl font-semibold text-color-text mb-6">Performance Metrics</h3>
          
          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between animate-fade-in">
                <div>
                  <p className="font-medium text-color-text">{metric.name}</p>
                  <p className="text-sm text-gray-500">Current model performance</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500">{metric.unit}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Accuracy Chart */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h4 className="font-medium text-color-text mb-4">Training Progress</h4>
            <div className="h-32 flex items-end justify-between space-x-1">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-indigo to-pear rounded-t transition-all duration-500 hover:scale-110"
                  style={{
                    height: `${60 + (i * 2) + Math.random() * 10}%`,
                    width: '4%'
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Epoch 1</span>
              <span>Epoch 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up">
        <h3 className="text-xl font-semibold text-color-text mb-6">Advanced Configuration</h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-color-text">Data Preprocessing</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Normalize input features</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Remove outliers</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Apply smoothing</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-color-text">Validation</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Cross-validation</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Early stopping</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Hyperparameter tuning</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-color-text">Output</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Confidence intervals</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Uncertainty quantification</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded transition-colors duration-200 text-indigo focus:ring-indigo" />
                <span className="text-sm group-hover:text-indigo transition-colors duration-200">Feature importance</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSettings;