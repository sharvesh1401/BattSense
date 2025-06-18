import React from 'react';
import { Battery, TrendingDown, AlertTriangle, Download, BarChart3, Zap, Clock, Target } from 'lucide-react';

interface DashboardProps {
  uploadedFile: File | null;
  predictionResults: any;
  selectedModel: string;
}

const Dashboard: React.FC<DashboardProps> = ({ uploadedFile, predictionResults, selectedModel }) => {
  if (!predictionResults) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <Battery className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">No Prediction Data</h2>
        <p className="text-slate-600">Upload a battery dataset to see prediction results</p>
      </div>
    );
  }

  const { batteryId, predictedSoH, confidence, cycleCount, degradationRate, remainingCycles } = predictionResults;

  // Mock chart data
  const chartData = Array.from({ length: cycleCount }, (_, i) => ({
    cycle: i + 1,
    soh: Math.max(0.5, 1 - (i * degradationRate / 100) + (Math.random() - 0.5) * 0.05)
  }));

  const getSoHStatus = (soh: number) => {
    if (soh >= 0.8) return { color: 'text-green-600', bg: 'bg-green-50', status: 'Excellent' };
    if (soh >= 0.6) return { color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'Good' };
    return { color: 'text-red-600', bg: 'bg-red-50', status: 'Needs Attention' };
  };

  const status = getSoHStatus(predictedSoH);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Battery Analysis Results</h2>
            <p className="text-slate-600 mt-1">
              Dataset: {uploadedFile?.name} • Model: {selectedModel}
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl ${status.bg} border border-slate-200`}>
            <div className="flex items-center space-x-3">
              <Battery className={`h-8 w-8 ${status.color}`} />
              <div>
                <p className="text-sm font-medium text-slate-600">Current SoH</p>
                <p className={`text-2xl font-bold ${status.color}`}>
                  {Math.round(predictedSoH * 100)}%
                </p>
                <p className={`text-xs ${status.color}`}>{status.status}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-blue-50 border border-slate-200">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Confidence</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(confidence * 100)}%
                </p>
                <p className="text-xs text-blue-600">Model Accuracy</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-purple-50 border border-slate-200">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Cycle Count</p>
                <p className="text-2xl font-bold text-purple-600">{cycleCount}</p>
                <p className="text-xs text-purple-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-orange-50 border border-slate-200">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Remaining</p>
                <p className="text-2xl font-bold text-orange-600">{remainingCycles}</p>
                <p className="text-xs text-orange-600">Est. Cycles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* SoH Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">SoH Degradation Trend</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#grid)" />
              
              {/* Chart line */}
              <polyline
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                points={chartData.map((point, index) => 
                  `${(index / (chartData.length - 1)) * 380 + 10},${200 - (point.soh * 180 + 10)}`
                ).join(' ')}
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              
              {/* Data points */}
              {chartData.filter((_, index) => index % 10 === 0).map((point, index) => (
                <circle
                  key={index}
                  cx={(index * 10 / (chartData.length - 1)) * 380 + 10}
                  cy={200 - (point.soh * 180 + 10)}
                  r="4"
                  fill="#3b82f6"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-sm text-slate-500 mt-4">
            <span>Cycle 1</span>
            <span>Cycle {cycleCount}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Performance Analysis</h3>
          
          <div className="space-y-6">
            {/* Degradation Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Degradation Rate</span>
                <span className="text-sm font-semibold text-slate-900">{degradationRate}% per 100 cycles</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(degradationRate * 5, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Prediction Confidence */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Model Confidence</span>
                <span className="text-sm font-semibold text-slate-900">{Math.round(confidence * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Battery Health Status */}
            <div className={`p-4 rounded-lg ${status.bg} border border-slate-200`}>
              <div className="flex items-center space-x-3">
                {predictedSoH >= 0.8 ? (
                  <Zap className={`h-5 w-5 ${status.color}`} />
                ) : (
                  <AlertTriangle className={`h-5 w-5 ${status.color}`} />
                )}
                <div>
                  <p className={`font-semibold ${status.color}`}>Battery Status: {status.status}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {predictedSoH >= 0.8 
                      ? 'Battery is performing well with minimal degradation'
                      : predictedSoH >= 0.6
                      ? 'Battery shows moderate degradation, monitor closely'
                      : 'Battery requires attention or replacement consideration'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Detailed Analysis</h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Battery Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Battery ID:</span>
                <span className="font-medium">{batteryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Dataset:</span>
                <span className="font-medium">{uploadedFile?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Model Used:</span>
                <span className="font-medium">{selectedModel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Key Insights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <span className="text-slate-600">Current capacity retention at {Math.round(predictedSoH * 100)}%</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                <span className="text-slate-600">Estimated {remainingCycles} cycles remaining</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                <span className="text-slate-600">Degradation rate: {degradationRate}% per 100 cycles</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Recommendations</h4>
            <div className="space-y-2 text-sm text-slate-600">
              {predictedSoH >= 0.8 ? (
                <p>Battery is in excellent condition. Continue regular monitoring.</p>
              ) : predictedSoH >= 0.6 ? (
                <p>Consider implementing preventive maintenance strategies.</p>
              ) : (
                <p>Immediate attention required. Plan for battery replacement.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;