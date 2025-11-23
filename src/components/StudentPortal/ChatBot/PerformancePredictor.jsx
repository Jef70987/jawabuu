import React from 'react';

const PerformancePredictor = () => {
  const subjects = [
    { name: 'Math', score: 85, color: 'bg-blue-500' },
    { name: 'Science', score: 72, color: 'bg-green-500' },
    { name: 'English', score: 78, color: 'bg-red-500' },
    { name: 'Kiswahili', score: 90, color: 'bg-yellow-500' },
    { name: 'Social', score: 88, color: 'bg-purple-500' },
  ];

  const getGradeColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeText = (score) => {
    if (score >= 80) return 'Great!';
    if (score >= 70) return 'Good';
    return 'Needs work';
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        How Am I Doing? 📊
      </h2>

      {/* Simple Progress Bars */}
      <div className="space-y-4 mb-6">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{subject.name}</span>
              <div className="text-right">
                <span className={`font-bold ${getGradeColor(subject.score)}`}>
                  {subject.score}%
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {getGradeText(subject.score)}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${subject.color} transition-all duration-500`}
                style={{ width: `${subject.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-bold text-blue-800 mb-2">Your Progress Summary</h3>
        <div className="space-y-2 text-sm">
          <p className="text-blue-700">
            <span className="font-semibold">🎯 Keep working on:</span> Science
          </p>
          <p className="text-green-700">
            <span className="font-semibold">⭐ Doing great in:</span> Math, Kiswahili, Social
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">📈 Overall:</span> Good progress!
          </p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Tip: Practice Science 15 mins daily to improve! 🚀
        </p>
      </div>
    </div>
  );
};

export default PerformancePredictor;