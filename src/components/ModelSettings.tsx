import React, { useState } from 'react';
import { Brain, TrendingUp, Zap, Settings, BarChart3, Clock, Target, CheckCircle } from 'lucide-react';

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
      id: 'Ensemble',
      name: 'Ensemble Model',
      icon: Zap,
      accuracy: 97.3,
      speed: 'Slow',
      description: 'Combines multiple models for superior prediction accuracy',
      pros: ['Highest accuracy', 'Robust predictions', 'Reduced overfitting'],
      cons: ['Slowest training', 'Most resource intensive', 'Complex interpretation'],
      params: {
        models: ['SVR', 'LSTM', 'RandomForest'],
        weights: [0.3, 0.4, 0.3],
        voting: 'weighted'
      }
    }
  ];

  const performanceMetrics = [
    { name: 'Mean Absolute Error', value: '0.023', unit: 'SoH' },
    { name: 'Root Mean Square Error', value: '0.031', unit: 'SoH' },
    { name: 'R² Score', value: '0.967', unit: '' },
    { name: 'Training Time', value: '2.4', unit: 'minutes' }
  ];

  const handleRetrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Model Management</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Configure and manage machine learning models for battery SoH prediction
        </p>
      </div>

      {/* Model Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h3 className="text-2xl font-semibold text-slate-900 mb-6">Available Models</h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {models.map((model) => {
            const IconComponent = model.icon;
            const isSelected = selectedModel === model.id;
            
            return (
              <div
                key={model.id}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
                onClick={() => onModelChange(model.id)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{model.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-slate-500">
                        {model.accuracy}% accuracy
                      </span>
                      <span className="text-sm text-slate-500">
                        {model.speed} speed
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">{model.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-1">Advantages</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {model.pros.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-orange-700 mb-1">Considerations</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
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
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">
            {models.find(m => m.id === selectedModel)?.name} Parameters
          </h3>
          
          <div className="space-y-4">
            {Object.entries(models.find(m => m.id === selectedModel)?.params || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-slate-600 font-mono text-sm">
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleRetrain}
            disabled={isTraining}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isTraining
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isTraining ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Retraining Model...</span>
              </div>
            ) : (
              'Retrain Model'
            )}
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Performance Metrics</h3>
          
          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{metric.name}</p>
                  <p className="text-sm text-slate-500">Current model performance</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {metric.value}
                  </p>
                  <p className="text-sm text-slate-500">{metric.unit}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Accuracy Chart */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-4">Training Progress</h4>
            <div className="h-32 flex items-end justify-between space-x-1">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                  style={{
                    height: `${60 + (i * 2) + Math.random() * 10}%`,
                    width: '4%'
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>Epoch 1</span>
              <span>Epoch 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Advanced Configuration</h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Data Preprocessing</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Normalize input features</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Remove outliers</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Apply smoothing</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Validation</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Cross-validation</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Early stopping</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Hyperparameter tuning</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Output</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Confidence intervals</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Uncertainty quantification</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Feature importance</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSettings;