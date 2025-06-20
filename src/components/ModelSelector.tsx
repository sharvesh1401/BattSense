import React from 'react';
import { Brain, TrendingUp, Zap, Sparkles } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange, 
  className = '' 
}) => {
  const models = [
    { 
      id: 'SVR', 
      name: 'Random Forest', 
      icon: Brain, 
      accuracy: '94%', 
      speed: 'Fast',
      description: 'Traditional ML with proven reliability'
    },
    { 
      id: 'LSTM', 
      name: 'LSTM Neural Network', 
      icon: TrendingUp, 
      accuracy: '96%', 
      speed: 'Medium',
      description: 'Deep learning for time series analysis'
    },
    { 
      id: 'DeepSeek', 
      name: 'DeepSeek AI', 
      icon: Sparkles, 
      accuracy: '98%', 
      speed: 'Fast',
      description: 'Advanced AI with latest algorithms'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold text-color-text mb-3">Select AI Model</h4>
      {models.map((model) => {
        const IconComponent = model.icon;
        const isSelected = selectedModel === model.id;
        
        return (
          <div
            key={model.id}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-102 animate-fade-in ${
              isSelected
                ? 'bg-indigo/10 border-2 border-indigo shadow-lg'
                : 'bg-white border-2 border-transparent hover:border-pear/30 hover:shadow-md'
            }`}
            onClick={() => onModelChange(model.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg transition-colors duration-200 ${
                isSelected ? 'bg-indigo text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-color-text">{model.name}</h5>
                <p className="text-sm text-gray-600">{model.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">Accuracy: {model.accuracy}</span>
                  <span className="text-xs text-gray-500">Speed: {model.speed}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'border-indigo bg-indigo'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModelSelector;