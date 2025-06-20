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
      <h4 className="font-semibold text-ivory mb-3">Select AI Model</h4> {/* Text color to ivory */}
      {models.map((model) => {
        const IconComponent = model.icon;
        const isSelected = selectedModel === model.id;
        
        return (
          // Applied new styling for selected/unselected states
          <div
            key={model.id}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-102 animate-fade-in border-2 ${
              isSelected
                ? 'bg-neutral-700 border-secondary shadow-md' // Selected state
                : 'bg-neutral-800 border-neutral-700 hover:border-secondary/75' // Unselected state
            }`}
            onClick={() => onModelChange(model.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Icon container styling */}
              <div className={`p-2 rounded-lg transition-colors duration-200 ${
                isSelected ? 'bg-secondary text-ivory' : 'bg-neutral-700 text-ivory/75'
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                {/* Text colors updated */}
                <h5 className="font-semibold text-ivory">{model.name}</h5>
                <p className="text-sm text-ivory/75">{model.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-ivory/60">Accuracy: {model.accuracy}</span>
                  <span className="text-xs text-ivory/60">Speed: {model.speed}</span>
                </div>
              </div>
              {/* Custom radio button visual styling */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'border-secondary bg-secondary' // Selected state
                  : 'border-neutral-600' // Unselected state
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-ivory rounded-full animate-scale-in"></div> // Checkmark color
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