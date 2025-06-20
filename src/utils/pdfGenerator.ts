import jsPDF from 'jspdf';

interface BatteryReportData {
  batteryId: string;
  predictedSoH: number;
  confidence: number;
  cycleCount: number;
  degradationRate: number;
  remainingCycles: number;
  model: string;
  uploadedFileName?: string;
  inputData?: {
    voltage?: number;
    current?: number;
    temperature?: number;
    capacity?: number;
  };
}

export const generateBatteryReport = (data: BatteryReportData): void => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Define colors (RGB values)
    const colors = {
      pear: [203, 216, 59],      // #CBD83B
      indigo: [168, 138, 237],   // #A88AED
      ivory: [255, 254, 236],    // #FFFEEC
      text: [26, 26, 26],        // #1a1a1a
      gray: [107, 114, 128],     // Gray-500
      lightGray: [243, 244, 246] // Gray-100
    };

    // Set background color
    doc.setFillColor(...colors.ivory);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    let yPosition = 20;

    // Header Section
    doc.setFillColor(...colors.indigo);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Battery Health Report', pageWidth / 2, 25, { align: 'center' });

    yPosition = 60;

    // Timestamp
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' - ' + now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    doc.setTextColor(...colors.gray);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${timestamp}`, 20, yPosition);
    yPosition += 20;

    // Battery Information Section
    doc.setFillColor(...colors.lightGray);
    doc.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
    
    doc.setTextColor(...colors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Battery Information', 20, yPosition + 8);
    yPosition += 30;

    // Battery details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const batteryInfo = [
      ['Battery ID:', data.batteryId],
      ['Dataset:', data.uploadedFileName || 'N/A'],
      ['Model Used:', data.model === 'DeepSeek' ? 'DeepSeek AI' : data.model],
      ['Analysis Date:', timestamp.split(' - ')[0]]
    ];

    batteryInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 80, yPosition);
      yPosition += 12;
    });

    yPosition += 10;

    // Input Parameters Section (if available)
    if (data.inputData) {
      doc.setFillColor(...colors.lightGray);
      doc.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
      
      doc.setTextColor(...colors.text);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Input Parameters', 20, yPosition + 8);
      yPosition += 30;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      const inputParams = [
        ['Voltage:', data.inputData.voltage ? `${data.inputData.voltage} V` : 'N/A'],
        ['Current:', data.inputData.current ? `${data.inputData.current} A` : 'N/A'],
        ['Temperature:', data.inputData.temperature ? `${data.inputData.temperature} °C` : 'N/A'],
        ['Capacity:', data.inputData.capacity ? `${data.inputData.capacity} Ah` : 'N/A']
      ];

      inputParams.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 80, yPosition);
        yPosition += 12;
      });

      yPosition += 10;
    }

    // Prediction Results Section
    doc.setFillColor(...colors.pear);
    doc.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
    
    doc.setTextColor(...colors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Prediction Results', 20, yPosition + 8);
    yPosition += 30;

    // SOH Result - Large and prominent
    const sohPercentage = Math.round(data.predictedSoH * 100);
    doc.setFillColor(...colors.indigo);
    doc.rect(20, yPosition, 60, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sohPercentage}%`, 50, yPosition + 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('State of Health', 50, yPosition + 27, { align: 'center' });

    // Status indicator
    let status = 'Excellent';
    let statusColor = [34, 197, 94]; // Green
    if (sohPercentage < 90) {
      status = 'Good';
      statusColor = [234, 179, 8]; // Yellow
    }
    if (sohPercentage < 70) {
      status = 'Degraded';
      statusColor = [249, 115, 22]; // Orange
    }
    if (sohPercentage < 50) {
      status = 'Needs Replacement';
      statusColor = [239, 68, 68]; // Red
    }

    doc.setFillColor(...statusColor);
    doc.rect(90, yPosition + 5, 80, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Status: ${status}`, 130, yPosition + 17, { align: 'center' });

    yPosition += 45;

    // Detailed metrics
    doc.setTextColor(...colors.text);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const metrics = [
      ['Model Confidence:', `${Math.round(data.confidence * 100)}%`],
      ['Cycle Count:', `${data.cycleCount} cycles`],
      ['Degradation Rate:', `${data.degradationRate}% per 100 cycles`],
      ['Estimated Remaining Cycles:', `${data.remainingCycles} cycles`]
    ];

    metrics.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 120, yPosition);
      yPosition += 12;
    });

    yPosition += 15;

    // Analysis Summary Section
    doc.setFillColor(...colors.lightGray);
    doc.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
    
    doc.setTextColor(...colors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Analysis Summary', 20, yPosition + 8);
    yPosition += 30;

    // Summary text based on SOH
    let summaryText = '';
    if (sohPercentage >= 90) {
      summaryText = 'Battery is in excellent condition with minimal degradation. Continue regular monitoring and maintain current usage patterns.';
    } else if (sohPercentage >= 70) {
      summaryText = 'Battery shows some degradation but is still in good working condition. Regular monitoring is advised to track degradation trends.';
    } else if (sohPercentage >= 50) {
      summaryText = 'Battery is significantly degraded and may affect performance. Consider scheduling maintenance or planning for replacement.';
    } else {
      summaryText = 'Battery is critically degraded and likely needs replacement soon. Performance is significantly affected.';
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(summaryText, pageWidth - 40);
    doc.text(splitText, 20, yPosition);
    yPosition += splitText.length * 6 + 15;

    // Model Information
    if (data.model === 'DeepSeek') {
      doc.setFillColor(...colors.indigo);
      doc.rect(15, yPosition - 5, pageWidth - 30, 20, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('✨ Powered by DeepSeek AI', 20, yPosition + 8);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Advanced AI algorithms for superior prediction accuracy', 20, yPosition + 15);
      yPosition += 30;
    }

    // Footer
    doc.setTextColor(...colors.gray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('This report is generated by BattSense for educational and demonstration purposes.', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('Predictions are based on machine learning models and should not be used for critical decisions.', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save the PDF
    doc.save('battery_report.pdf');
    
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report. Please try again.');
  }
};