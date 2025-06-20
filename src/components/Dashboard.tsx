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
      <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in text-ivory">
        <Battery className="h-16 w-16 mx-auto mb-4 text-ivory/50" />
        <h2 className="text-2xl font-semibold mb-2 text-ivory">No Prediction Data</h2>
        <p className="text-ivory/75">Upload a battery dataset to see prediction results</p>
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0 text-ivory">
      {/* SOH Explanation Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 animate-slide-up">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-secondary">What is State of Health (SOH)?</h3>
        <p className="text-sm leading-relaxed text-ivory/75">
          State of Health (SOH) indicates how much usable capacity a battery has compared to when it was new.
          It's a key indicator of battery aging and performance, typically expressed as a percentage.
          Monitoring SOH helps in understanding current battery condition and predicting its future lifespan.
        </p>
      </div>

      {/* Header Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-scale-in">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ivory">Battery Analysis Results</h2>
            <p className="text-sm sm:text-base mt-1 flex items-center space-x-2 text-ivory/75">
              <span>Dataset: {uploadedFile?.name} • Model: {selectedModel}</span>
              {selectedModel === 'DeepSeek' && (
                <Sparkles className="h-4 w-4 animate-pulse text-secondary" />
              )}
            </p>
          </div>
          {/* Export Report Button - Secondary/Info Button styling */}
          <button 
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-secondary text-ivory hover:bg-secondary-dark px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md text-sm sm:text-base"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: SoH */}
          <div className={`p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center text-center animate-scale-in bg-neutral-800`}>
            <div className="mb-2 sm:mb-3 w-20 h-20 sm:w-24 sm:h-24">
              <CircularProgressbar
                value={sohPercentage}
                text={`${sohPercentage}%`}
                styles={buildStyles({
                  pathColor: `rgba(168, 138, 237, ${sohPercentage / 100})`, // secondary with opacity
                  textColor: '#FFFEEC', // ivory
                  trailColor: '#1f1f1f', // neutral-800 (darker than card bg for trail)
                  backgroundColor: '#3e98c7', // Not used
                })}
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-ivory/75">Current SoH</p>
              {/* status.color will need to map to new theme colors e.g. text-highlight for good, text-orange-400 for warning, text-red-500 for critical */}
              <p className={`text-base sm:text-lg font-bold ${status.color}`}>{status.status}</p>
              {selectedModel === 'DeepSeek' && (
                <p className="text-xs mt-1 animate-fade-in text-secondary">Predicted by DeepSeek AI</p>
              )}
            </div>
          </div>

          {/* Card 2: Confidence */}
          <div className="p-4 sm:p-6 rounded-xl animate-scale-in bg-neutral-800">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-ivory/75">Confidence</p>
                <p className="text-xl sm:text-2xl font-bold text-secondary">
                  <AnimatedCounter value={Math.round(confidence * 100)} />
                </p>
              </div>
            </div>
            <p className="text-xs mt-1 text-ivory/60">
              {selectedModel === 'DeepSeek' ? 'DeepSeek AI Model' : 'Random Forest, R² = 0.91'}
            </p>
          </div>

          {/* Card 3: Cycle Count */}
          <div className="p-4 sm:p-6 rounded-xl animate-scale-in bg-neutral-800">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-ivory/75">Cycle Count</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  <AnimatedCounter value={cycleCount} suffix="" />
                </p>
                <p className="text-xs text-primary/80">Completed</p>
              </div>
            </div>
          </div>

          {/* Card 4: Remaining Cycles */}
          <div className="p-4 sm:p-6 rounded-xl animate-scale-in bg-neutral-800">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-highlight" /> {/* Using highlight for remaining */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-ivory/75">Remaining</p>
                <p className="text-xl sm:text-2xl font-bold text-highlight">
                  <AnimatedCounter value={remainingCycles} suffix="" />
                </p>
                <p className="text-xs text-highlight/80">Est. Cycles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* SoH Trend Chart Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">SoH Degradation Trend</h3>
          <div className="relative h-56 sm:h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  {/* SVG grid line color changed for dark theme */}
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#grid)" />
              
              {/* Gradient colors will persist as defined in SVG */}
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
                  <stop offset="0%" stopColor="#6BEF88" /> {/* highlight */}
                  <stop offset="50%" stopColor="#CBD83B" /> {/* primary */}
                  <stop offset="100%" stopColor="#A88AED" /> {/* secondary */}
                </linearGradient>
              </defs>
              
              {/* Circle fill color updated to secondary */}
              {chartData.filter((_, index) => index % 10 === 0).map((point, index) => (
                <circle
                  key={index}
                  cx={(index * 10 / (chartData.length - 1)) * 380 + 10}
                  cy={200 - (point.soh * 180 + 10)}
                  r="3"
                  fill="#A88AED" // secondary
                  className="hover:r-5 sm:hover:r-6 transition-all cursor-pointer animate-scale-in"
                />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-xs sm:text-sm mt-2 sm:mt-4 text-ivory/60">
            <span>Cycle 1</span>
            <span>Cycle {cycleCount}</span>
          </div>
        </div>

        {/* Performance Metrics Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Performance Analysis</h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium text-ivory/75">Degradation Rate</span>
                <span className="text-xs sm:text-sm font-semibold text-ivory">{degradationRate}% per 100 cycles</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-1000 animate-fade-in"
                  style={{ width: `${Math.min(degradationRate * 5, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium text-ivory/75">Model Confidence</span>
                <span className="text-xs sm:text-sm font-semibold text-ivory">{Math.round(confidence * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-secondary h-1.5 sm:h-2 rounded-full transition-all duration-1000 animate-fade-in"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>

            {/* status.bg and status.color are dynamic, will be handled by new theme logic in getSoHStatus */}
            <div className={`p-3 sm:p-4 rounded-lg animate-scale-in bg-neutral-800`}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Icons here should also use status.color or map to new theme colors */}
                {sohPercentage >= 90 ? <Zap className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} /> :
                 sohPercentage >= 70 ? <TrendingDown className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} /> :
                 <AlertTriangle className={`h-4 w-4 sm:h-5 sm:w-5 ${status.color}`} />}
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${status.color}`}>Battery Status: {status.status}</p>
                  <p className="text-xs sm:text-sm mt-1 text-ivory/75">
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

        {/* Feature Importance Chart Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Feature Importance</h3>
          <div style={{ width: '100%', height: 250 }} className="sm:h-[300px]">
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={featureImportanceData.map(item => ({...item, fill: '#A88AED'}))} // Using secondary color hex
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" /> {/* neutral-700 */}
                <XAxis type="number" tick={{ fontSize: 10, fill: '#FFFEECaa' }} /> {/* ivory/60 */}
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10, fill: '#FFFEECaa' }} /> {/* ivory/60 */}
                <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{ fontSize: '0.875rem', backgroundColor: '#1f1f1f', borderColor: '#374151' }} itemStyle={{color: '#FFFEEC'}} /> {/* neutral-800 bg, neutral-700 border, ivory text */}
                <Bar dataKey="importance" name="Importance" fill="#A88AED" barSize={10} sm_barSize={undefined}/> {/* secondary */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Model Information Section Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Model Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-sm">
          <div>
            <span className="font-medium text-ivory">Model Type:</span>
            <p className="text-ivory/75">
              {selectedModel === 'DeepSeek' ? 'DeepSeek AI Advanced Model' : 'Random Forest Regressor'}
            </p>
          </div>
          <div>
            <span className="font-medium text-ivory">Training Data:</span>
            <p className="text-ivory/75">
              {selectedModel === 'DeepSeek' 
                ? 'Large-scale battery datasets with advanced AI training'
                : 'Real battery cycle datasets from NASA, CALCE, etc.'
              }
            </p>
          </div>
          <div>
            <span className="font-medium text-ivory">Accuracy:</span>
            <p className="text-ivory/75">
              {selectedModel === 'DeepSeek' ? '98%+' : '0.91 R²'}
            </p>
          </div>
          <div>
            <span className="font-medium text-ivory">Key Features:</span>
            <p className="text-ivory/75">Voltage, Current, Temperature, Charge/Discharge Profiles, Cycle Number</p>
          </div>
        </div>
        {selectedModel === 'DeepSeek' && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-neutral-800 rounded-lg animate-fade-in">
            <p className="text-xs flex items-center space-x-1 text-secondary">
              <Sparkles className="h-3 w-3" />
              <span>Powered by DeepSeek's advanced AI algorithms for superior prediction accuracy</span>
            </p>
          </div>
        )}
      </div>

      {/* Detailed Analysis Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-ivory">Detailed Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-ivory">Battery Information</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-ivory/75">
              <div className="flex justify-between">
                <span>Battery ID:</span>
                <span className="font-medium text-ivory">{batteryId}</span>
              </div>
              <div className="flex justify-between">
                <span>Dataset:</span>
                <span className="font-medium text-ivory">{uploadedFile?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Model Used:</span>
                <span className="font-medium text-ivory">{selectedModel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-ivory">Key Insights</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-ivory/75">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-1 sm:mt-1.5"></div>
                <span>Current capacity retention at {sohPercentage}%</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1 sm:mt-1.5"></div>
                <span>Estimated {remainingCycles} cycles remaining</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-highlight rounded-full mt-1 sm:mt-1.5"></div>
                <span>Degradation rate: {degradationRate}% per 100 cycles</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-ivory">Recommendations</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-ivory/75">
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