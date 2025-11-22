import React from 'react';
import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from 'recharts';

const PerformancePredictor = () => {
  const data = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 72 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 90 },
    { subject: 'Coding', score: 88 },
  ];

  return (
    <div className="performance-card">
      <h2>📊 Predict My Performance</h2>
      <p>Based on your grades, here’s how you’re doing:</p>
      
      <div className="chart-container">
        <RadarChart outerRadius={90} width={400} height={300} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </div>
      
      <div className="prediction-text">
        <p>📈 <strong>Predicted GPA:</strong> 3.6</p>
        <p>🎯 <strong>Goal:</strong> 3.8+ (Keep working on Science!)</p>
      </div>
    </div>
  );
};

export default PerformancePredictor;