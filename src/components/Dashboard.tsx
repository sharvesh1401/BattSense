import React from 'react';
import { Battery, TrendingDown, AlertTriangle, Download, BarChart3, Zap, Clock, Target, Sparkles } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSoHStatus } from '@utils/batteryUtils';
import { generateBatteryReport } from '@utils/pdfGenerator';
import AnimatedCounter from './AnimatedCounter';

interface DashboardProps {
  uploadedFile: File | null;
  predictionResults: any;
  selectedModel: string;
}

const Dashboard: React.FC<DashboardProps> = ({ uploadedFile, predictionResults, selectedModel }) => {
  const handleExportReport = () => {
    if (!predictionResults) {
      alert('No prediction data available to export.');
      return;
    }

    try {
      const reportData = {
        batteryId: predictionResults.batteryId,
        predictedSoH: predictionResults.predictedSoH,
        confidence: predictionResults.confidence,
        cycleCount: predictionResults.cycleCount,
        degradationRate: predictionResults.degradationRate,
        remainingCycles: predictionResults.remainingCycles,
        model: selectedModel,
        uploadedFileName: uploadedFile?.name,
        inputData: {
          voltage: 3.7, // These would come from actual form data
          current: 2.5,
          temperature: 25,
          capacity: 2.8
        }
      };

      generateBatteryReport(reportData);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  if (!predictionResults) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
        <Battery className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-color-text mb-2">No Prediction Data</h2>
        <p className="text-gray-600">Upload a battery dataset to see prediction results</p>
      </div>
    );
  }

  const { batteryId, predictedSoH, confidence, cycleCount, degradationRate, remainingCycles } = predictionResults;

  // Mock chart data
  const chartData = Array.from({ length: cycleCount }, (_, i) => ({
    cycle: i + 1,
    soh: Math.max(0.5, 1 - (i * degradationRate / 100) + (Math.random() - 0.5) * 0.05)
  }));

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0"> {/* Added horizontal padding for very small screens, adjusted spacing */}
      {/* SOH Explanation */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-slide-up"> {/* Adjusted padding */}
        <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-2 sm:mb-3">What is State of Health (SOH)?</h3> {/* Responsive text */}
        <p className="text-sm text-gray-700 leading-relaxed">
          State of Health (SOH) indicates how much usable capacity a battery has compared to when it was new.
          It's a key indicator of battery aging and performance, typically expressed as a percentage.
          Monitoring SOH helps in understanding current battery condition and predicting its future lifespan.
        </p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-scale-in"> {/* Adjusted padding */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0"> {/* Responsive flex layout and spacing */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo">Battery Analysis Results</h2> {/* Responsive text */}
            <p className="text-sm sm:text-base text-gray-600 mt-1 flex items-center space-x-2"> {/* Responsive text */}
              <span>Dataset: {uploadedFile?.name} • Model: {selectedModel}</span>
              {selectedModel === 'DeepSeek' && (
                <Sparkles className="h-4 w-4 text-indigo animate-pulse" />
              )}
            </p>
          </div>
          <button 
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-pear hover:bg-indigo text-color-text hover:text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base" /* Adjusted padding & text size */
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {/* Responsive grid and gap */}
          <div className={`p-4 sm:p-6 rounded-xl ${status.bg} flex flex-col items-center justify-center text-center animate-scale-in`}> {/* Adjusted padding */}
            <div className="mb-2 sm:mb-3 w-20 h-20 sm:w-24 sm:h-24"> {/* Responsive size for progress bar container */}
              <CircularProgressbar
                value={sohPercentage}
                text={`${sohPercentage}%`}
                styles={buildStyles({
                  pathColor: '#A88AED',
                  textColor: '#A88AED',
                  trailColor: '#f0f0f0',
                })}
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Current SoH</p> {/* Responsive text */}
              <p className={`text-base sm:text-lg font-bold ${status.color}`}>{status.status}</p> {/* Responsive text */}
              {selectedModel === 'DeepSeek' && (
                <p className="text-xs text-indigo mt-1 animate-fade-in">Predicted by DeepSeek AI</p>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-indigo/5 animate-scale-in"> {/* Adjusted padding */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2"> {/* Responsive spacing */}
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-indigo" /> {/* Responsive icon */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Confidence</p> {/* Responsive text */}
                <p className="text-xl sm:text-2xl font-bold text-indigo"> {/* Responsive text */}
                  <AnimatedCounter value={Math.round(confidence * 100)} />
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {selectedModel === 'DeepSeek' ? 'DeepSeek AI Model' : 'Random Forest, R² = 0.91'}
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-pear/10 animate-scale-in"> {/* Adjusted padding */}
            <div className="flex items-center space-x-2 sm:space-x-3">  {/* Responsive spacing */}
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-pear" /> {/* Responsive icon */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Cycle Count</p> {/* Responsive text */}
                <p className="text-xl sm:text-2xl font-bold text-pear"> {/* Responsive text */}
                  <AnimatedCounter value={cycleCount} suffix="" />
                </p>
                <p className="text-xs text-pear">Completed</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-orange-50 animate-scale-in"> {/* Adjusted padding */}
            <div className="flex items-center space-x-2 sm:space-x-3"> {/* Responsive spacing */}
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" /> {/* Responsive icon */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Remaining</p> {/* Responsive text */}
                <p className="text-xl sm:text-2xl font-bold text-orange-600"> {/* Responsive text */}
                  <AnimatedCounter value={remainingCycles} suffix="" />
                </p>
                <p className="text-xs text-orange-600">Est. Cycles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"> {/* Responsive grid and gap */}
        {/* SoH Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-slide-up"> {/* Adjusted padding */}
          <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-4 sm:mb-6">SoH Degradation Trend</h3> {/* Responsive text and margin */}
          <div className="relative h-56 sm:h-64"> {/* Adjusted height for mobile */}
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet"> {/* Added preserveAspectRatio */}
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#grid)" />
              
              <polyline
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                points={chartData.map((point, index) => 
                  `${(index / (chartData.length - 1)) * 380 + 10},${200 - (point.soh * 180 + 10)}`
                ).join(' ')}
                className="animate-fade-in"
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              
              {chartData.filter((_, index) => index % 10 === 0).map((point, index) => (
                <circle
                  key={index}
                  cx={(index * 10 / (chartData.length - 1)) * 380 + 10}
                  cy={200 - (point.soh * 180 + 10)}
                  r="3" /* Adjusted radius for mobile */
                  fill="#A88AED"
                  className="hover:r-5 sm:hover:r-6 transition-all cursor-pointer animate-scale-in" /* Adjusted hover radius */
                />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4"> {/* Responsive text and margin */}
            <span>Cycle 1</span>
            <span>Cycle {cycleCount}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-slide-up"> {/* Adjusted padding */}
          <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-4 sm:mb-6">Performance Analysis</h3> {/* Responsive text and margin */}
          
          <div className="space-y-4 sm:space-y-6"> {/* Responsive spacing */}
            {/* Degradation Rate */}
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-1 sm:mb-2"> {/* Responsive margin */}
                <span className="text-xs sm:text-sm font-medium text-gray-600">Degradation Rate</span> {/* Responsive text */}
                <span className="text-xs sm:text-sm font-semibold text-color-text">{degradationRate}% per 100 cycles</span> {/* Responsive text */}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2"> {/* Responsive height */}
                <div 
                  className="bg-gradient-to-r from-pear to-indigo h-1.5 sm:h-2 rounded-full transition-all duration-1000 animate-fade-in" /* Responsive height */
                  style={{ width: `${Math.min(degradationRate * 5, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Prediction Confidence */}
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-1 sm:mb-2"> {/* Responsive margin */}
                <span className="text-xs sm:text-sm font-medium text-gray-600">Model Confidence</span> {/* Responsive text */}
                <span className="text-xs sm:text-sm font-semibold text-color-text">{Math.round(confidence * 100)}%</span> {/* Responsive text */}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2"> {/* Responsive height */}
                <div 
                  className="bg-indigo h-1.5 sm:h-2 rounded-full transition-all duration-1000 animate-fade-in" /* Responsive height */
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Battery Health Status */}
            <div className={`p-3 sm:p-4 rounded-lg ${status.bg} animate-scale-in`}> {/* Adjusted padding */}
              <div className="flex items-center space-x-2 sm:space-x-3"> {/* Responsive spacing */}
                {sohPercentage >= 90 ? <Zap className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} /> : /* Responsive icon */
                 sohPercentage >= 70 ? <TrendingDown className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} /> : /* Responsive icon */
                 <AlertTriangle className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} />} {/* Responsive icon */}
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${status.color}`}>Battery Status: {status.status}</p> {/* Responsive text */}
                  <p className="text-xs sm:text-sm text-gray-600 mt-1"> {/* Responsive text */}
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
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-slide-up"> {/* Adjusted padding */}
          <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-4 sm:mb-6">Feature Importance</h3> {/* Responsive text and margin */}
          <div style={{ width: '100%', height: 250 }} className="sm:h-[300px]"> {/* Responsive height */}
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={featureImportanceData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }} /* Adjusted margins */
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} /> {/* Smaller ticks for mobile */}
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} /> {/* Smaller ticks and width for mobile */}
                <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{ fontSize: '0.875rem' }}/> {/* Responsive tooltip */}
                <Bar dataKey="importance" name="Importance" fill="#A88AED" barSize={10} sm_barSize={undefined}/> {/* Smaller bar for mobile */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Model Information Section */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-slide-up"> {/* Adjusted padding */}
        <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-4 sm:mb-6">Model Information</h3> {/* Responsive text and margin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-sm"> {/* Responsive grid and gap */}
          <div>
            <span className="font-medium text-color-text">Model Type:</span>
            <p className="text-gray-600">
              {selectedModel === 'DeepSeek' ? 'DeepSeek AI Advanced Model' : 'Random Forest Regressor'}
            </p>
          </div>
          <div>
            <span className="font-medium text-color-text">Training Data:</span>
            <p className="text-gray-600">
              {selectedModel === 'DeepSeek' 
                ? 'Large-scale battery datasets with advanced AI training'
                : 'Real battery cycle datasets from NASA, CALCE, etc.'
              }
            </p>
          </div>
          <div>
            <span className="font-medium text-color-text">Accuracy:</span>
            <p className="text-gray-600">
              {selectedModel === 'DeepSeek' ? '98%+' : '0.91 R²'}
            </p>
          </div>
          <div>
            <span className="font-medium text-color-text">Key Features:</span>
            <p className="text-gray-600">Voltage, Current, Temperature, Charge/Discharge Profiles, Cycle Number</p>
          </div>
        </div>
        {selectedModel === 'DeepSeek' && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-indigo/5 rounded-lg animate-fade-in"> {/* Responsive margin and padding */}
            <p className="text-xs text-indigo flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Powered by DeepSeek's advanced AI algorithms for superior prediction accuracy</span>
            </p>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-slide-up"> {/* Adjusted padding */}
        <h3 className="text-lg sm:text-xl font-semibold text-indigo mb-4 sm:mb-6">Detailed Analysis</h3> {/* Responsive text and margin */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Responsive grid and gap */}
          <div className="space-y-3 sm:space-y-4"> {/* Responsive spacing */}
            <h4 className="font-semibold text-color-text text-base sm:text-lg">Battery Information</h4> {/* Responsive text */}
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm"> {/* Responsive spacing and text */}
              <div className="flex justify-between">
                <span className="text-gray-600">Battery ID:</span>
                <span className="font-medium">{batteryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dataset:</span>
                <span className="font-medium">{uploadedFile?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model Used:</span>
                <span className="font-medium">{selectedModel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4"> {/* Responsive spacing */}
            <h4 className="font-semibold text-color-text text-base sm:text-lg">Key Insights</h4> {/* Responsive text */}
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm"> {/* Responsive spacing and text */}
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo rounded-full mt-1 sm:mt-1.5"></div> {/* Responsive margin */}
                <span className="text-gray-600">Current capacity retention at {sohPercentage}%</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pear rounded-full mt-1 sm:mt-1.5"></div> {/* Responsive margin */}
                <span className="text-gray-600">Estimated {remainingCycles} cycles remaining</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 sm:mt-1.5"></div> {/* Responsive margin */}
                <span className="text-gray-600">Degradation rate: {degradationRate}% per 100 cycles</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4"> {/* Responsive spacing */}
            <h4 className="font-semibold text-color-text text-base sm:text-lg">Recommendations</h4> {/* Responsive text */}
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600"> {/* Responsive spacing and text */}
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