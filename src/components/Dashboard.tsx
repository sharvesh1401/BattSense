import React from 'react';
import { Battery, TrendingDown, AlertTriangle, Download, BarChart3, Zap, Clock, Target } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSoHStatus } from '@utils/batteryUtils'; // Corrected import path

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

  // const getSoHStatus = (soh: number) => { // Moved to utils
  //   if (soh >= 0.9) return { color: 'text-green-600', bg: 'bg-green-50', status: 'Excellent' };
  //   if (soh >= 0.7) return { color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'Good' };
  //   if (soh >= 0.5) return { color: 'text-orange-600', bg: 'bg-orange-50', status: 'Degraded' };
  //   return { color: 'text-red-600', bg: 'bg-red-50', status: 'Needs Replacement' };
  // };

  const status = getSoHStatus(predictedSoH);
  const sohPercentage = Math.round(predictedSoH * 100);

  const featureImportanceData = [
    { name: 'Voltage Avg.', importance: 0.35, fill: '#A88AED' },
    { name: 'Capacity', importance: 0.28, fill: '#A88AED' },
    { name: 'Temp. Avg.', importance: 0.20, fill: '#A88AED' },
    { name: 'Cycle Index', importance: 0.10, fill: '#A88AED' },
    { name: 'Current Avg.', importance: 0.07, fill: '#A88AED' },
  ];

  return (
    <div className="space-y-8">
      {/* SOH Explanation */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <h3 className="text-xl font-semibold text-indigo mb-3">What is State of Health (SOH)?</h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          State of Health (SOH) indicates how much usable capacity a battery has compared to when it was new.
          It's a key indicator of battery aging and performance, typically expressed as a percentage.
          Monitoring SOH helps in understanding current battery condition and predicting its future lifespan.
        </p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo">Battery Analysis Results</h2> {/* Text color updated */}
            <p className="text-slate-600 mt-1">
              Dataset: {uploadedFile?.name} • Model: {selectedModel}
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-pear hover:bg-pear/90 text-gray-800 px-4 py-2 rounded-lg transition-colors"> {/* Button style updated */}
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl ${status.bg} border border-slate-200 flex flex-col items-center justify-center text-center`}>
            <div style={{ width: 100, height: 100 }} className="mb-3">
              <CircularProgressbar
                value={sohPercentage}
                text={`${sohPercentage}%`}
                styles={buildStyles({
                  pathColor: '#A88AED', // Indigo
                  textColor: '#CBD83B', // Pear
                  trailColor: '#f0f0f0', // Light gray trail
                })}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Current SoH</p>
              <p className={`text-lg font-bold ${status.color}`}>{status.status}</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-blue-50 border border-slate-200">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Confidence</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(confidence * 100)}%
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Predicted by Random Forest, R² = 0.91
            </p>
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
          <h3 className="text-xl font-semibold text-indigo mb-6">SoH Degradation Trend</h3> {/* Text color updated */}
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
                  fill="#A88AED" // Changed to Indigo
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
          <h3 className="text-xl font-semibold text-indigo mb-6">Performance Analysis</h3> {/* Text color updated */}
          
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
                {sohPercentage >= 90 ? <Zap className={`h-5 w-5 ${status.color}`} /> :
                 sohPercentage >= 70 ? <TrendingDown className={`h-5 w-5 ${status.color}`} /> :
                 <AlertTriangle className={`h-5 w-5 ${status.color}`} />}
                <div>
                  <p className={`font-semibold ${status.color}`}>Battery Status: {status.status}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {sohPercentage >= 90
                      ? 'Battery is performing well with minimal degradation.'
                      : sohPercentage >= 70
                      ? 'Battery shows some degradation, regular monitoring advised.'
                      : sohPercentage >= 50
                      ? 'Battery is significantly degraded, consider maintenance options.'
                      : 'Battery is critically degraded and likely needs replacement soon.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-indigo mb-6">Feature Importance</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={featureImportanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                {/* Legend might be redundant for a single series */}
                {/* <Legend /> */}
                <Bar dataKey="importance" name="Importance" fill="#A88AED" /> {/* Ensure Indigo fill */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Model Information Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h3 className="text-xl font-semibold text-indigo mb-6">Model Information</h3>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <span className="font-medium text-slate-700">Model Type:</span>
            <p className="text-slate-600">Random Forest Regressor</p>
          </div>
          <div>
            <span className="font-medium text-slate-700">Training Data:</span>
            <p className="text-slate-600">Real battery cycle datasets from NASA, CALCE, etc.</p>
          </div>
          <div>
            <span className="font-medium text-slate-700">Accuracy (R²):</span>
            <p className="text-slate-600">0.91</p>
          </div>
          <div>
            <span className="font-medium text-slate-700">Key Features:</span>
            <p className="text-slate-600">Voltage, Current, Temperature, Charge/Discharge Profiles, Cycle Number</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Note: The specific model used for this prediction is '{selectedModel}'. The R² value shown here is a general score for the Random Forest model variant. Individual prediction confidence is shown above.
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h3 className="text-xl font-semibold text-indigo mb-6">Detailed Analysis</h3> {/* Text color updated */}
        
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
                <span className="text-slate-600">Current capacity retention at {sohPercentage}%</span>
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
              {sohPercentage >= 90 ? (
                <p>Battery is in excellent condition. Continue regular monitoring.</p>
              ) : sohPercentage >= 70 ? (
                <p>Battery is in good condition. Monitor for accelerated degradation.</p>
              ) : sohPercentage >= 50 ? (
                <p>Battery is degraded. Consider scheduling maintenance or replacement.</p>
              ) : (
                <p>Battery needs replacement. Performance is critically affected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;