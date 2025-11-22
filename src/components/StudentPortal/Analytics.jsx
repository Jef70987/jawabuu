/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const CareerGuidance = () => {
  const [timeRange, setTimeRange] = useState('term');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeView, setActiveView] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced analytics data for CBC
  const analyticsData = {
    overview: {
      overallPerformance: 78,
      attendanceRate: 92,
      completionRate: 85,
      competencyMastery: 72,
      averageScore: 76,
      improvementTrend: 12,
      rankInClass: 8,
      totalStudents: 35,
      learningGap: 15,
      engagementScore: 88
    },
    subjects: [
      {
        id: 1,
        name: 'Mathematics',
        score: 85,
        trend: 'improving',
        competencies: 8,
        mastered: 6,
        assignments: 12,
        completed: 10,
        averageTime: '45min',
        strand: 'Numbers & Algebra',
        color: '#3B82F6',
        weeklyProgress: [70, 72, 75, 78, 80, 82, 85]
      },
      {
        id: 2,
        name: 'Integrated Science',
        score: 72,
        trend: 'improving',
        competencies: 10,
        mastered: 7,
        assignments: 8,
        completed: 7,
        averageTime: '38min',
        strand: 'Environment',
        color: '#10B981',
        weeklyProgress: [65, 68, 70, 69, 71, 72, 72]
      },
      {
        id: 3,
        name: 'Kiswahili',
        score: 68,
        trend: 'constant',
        competencies: 12,
        mastered: 8,
        assignments: 10,
        completed: 8,
        averageTime: '42min',
        strand: 'Lugha',
        color: '#F59E0B',
        weeklyProgress: [70, 69, 68, 67, 68, 68, 68]
      },
      {
        id: 4,
        name: 'English',
        score: 78,
        trend: 'improving',
        competencies: 9,
        mastered: 7,
        assignments: 9,
        completed: 8,
        averageTime: '40min',
        strand: 'Communication',
        color: '#EF4444',
        weeklyProgress: [72, 73, 75, 76, 77, 77, 78]
      },
      {
        id: 5,
        name: 'Social Studies',
        score: 65,
        trend: 'dropping',
        competencies: 7,
        mastered: 4,
        assignments: 6,
        completed: 5,
        averageTime: '35min',
        strand: 'Citizenship',
        color: '#8B5CF6',
        weeklyProgress: [70, 68, 67, 66, 65, 65, 65]
      },
      {
        id: 6,
        name: 'CRE',
        score: 82,
        trend: 'improving',
        competencies: 6,
        mastered: 5,
        assignments: 7,
        completed: 6,
        averageTime: '32min',
        strand: 'Christian Values',
        color: '#06B6D4',
        weeklyProgress: [75, 77, 78, 79, 80, 81, 82]
      }
    ],
    competencies: [
      { id: 1, name: 'Communication', score: 80, level: 'Proficient', trend: 'improving', target: 85 },
      { id: 2, name: 'Collaboration', score: 65, level: 'Developing', trend: 'constant', target: 75 },
      { id: 3, name: 'Critical Thinking', score: 72, level: 'Proficient', trend: 'improving', target: 80 },
      { id: 4, name: 'Creativity', score: 68, level: 'Developing', trend: 'constant', target: 75 },
      { id: 5, name: 'Digital Literacy', score: 75, level: 'Proficient', trend: 'improving', target: 85 },
      { id: 6, name: 'Self-Management', score: 70, level: 'Developing', trend: 'improving', target: 80 },
      { id: 7, name: 'Problem Solving', score: 78, level: 'Proficient', trend: 'improving', target: 85 },
      { id: 8, name: 'Citizenship', score: 62, level: 'Developing', trend: 'dropping', target: 70 }
    ],
    trends: {
      weekly: [65, 68, 72, 70, 75, 78, 76],
      monthly: [62, 65, 68, 72, 70, 75, 78, 76, 74, 77, 75, 78],
      term: [70, 72, 68, 75, 72, 78, 76, 74, 77, 75, 78, 76]
    },
    recommendations: [
      {
        id: 1,
        type: 'improvement',
        subject: 'Social Studies',
        message: 'Focus on understanding historical concepts through additional reading materials',
        priority: 'high',
        action: 'Review chapter 3-5 and complete practice questions',
        impact: 'High'
      },
      {
        id: 2,
        type: 'enhancement',
        subject: 'Mathematics',
        message: 'Excellent progress. Consider advanced algebraic concepts',
        priority: 'low',
        action: 'Try challenging problems from the extension workbook',
        impact: 'Medium'
      },
      {
        id: 3,
        type: 'improvement',
        subject: 'Collaboration Skills',
        message: 'Increase participation in group activities and discussions',
        priority: 'medium',
        action: 'Join one additional group project this term',
        impact: 'High'
      }
    ],
    strandPerformance: [
      { strand: 'Numeracy', score: 82, students: 35, average: 75 },
      { strand: 'Literacy', score: 73, students: 35, average: 70 },
      { strand: 'Environmental', score: 76, students: 35, average: 72 },
      { strand: 'Citizenship', score: 65, students: 35, average: 68 },
      { strand: 'Communication', score: 79, students: 35, average: 74 }
    ]
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'constant': return 'text-blue-600 bg-blue-100';
      case 'dropping': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Proficient': return 'text-green-700 bg-green-50 border-green-200';
      case 'Developing': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Beginning': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const calculateProgress = (completed, total) => {
    return (completed / total) * 100;
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Enhanced Line Chart with better styling
  const LineChart = ({ data, color = '#3B82F6', height = 120, showGrid = true, title = '' }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        {title && <h4 className="text-sm font-semibold text-gray-800 mb-3">{title}</h4>}
        <div className="relative" style={{ height: `${height}px` }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 40} ${height}`} preserveAspectRatio="none">
            {/* Grid lines */}
            {showGrid && [0, 25, 50, 75, 100].map((gridValue, index) => (
              <line
                key={index}
                x1="0"
                y1={height - ((gridValue - minValue) / range) * height}
                x2={data.length * 40}
                y2={height - ((gridValue - minValue) / range) * height}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Trend line */}
            <path
              d={`M 0,${height - ((data[0] - minValue) / range) * height} ${data
                .map((point, i) => `L ${i * 40},${height - ((point - minValue) / range) * height}`)
                .join(' ')}`}
              stroke={color}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Gradient fill under line */}
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d={`M 0,${height - ((data[0] - minValue) / range) * height} ${data
                .map((point, i) => `L ${i * 40},${height - ((point - minValue) / range) * height}`)
                .join(' ')} L ${(data.length - 1) * 40},${height} L 0,${height} Z`}
              fill={`url(#gradient-${color})`}
            />
            
            {/* Data points */}
            {data.map((point, i) => (
              <circle
                key={i}
                cx={i * 40}
                cy={height - ((point - minValue) / range) * height}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
    );
  };

  // Enhanced Bar Chart
  const BarChart = ({ data, height = 200, title = '' }) => {
    const maxValue = Math.max(...data.map(item => item.score));
    
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        {title && <h4 className="text-sm font-semibold text-gray-800 mb-3">{title}</h4>}
        <div className="space-y-3">
          {data.map((item, index) => {
            const width = (item.score / maxValue) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-700">{item.strand}</span>
                  <span className="text-gray-600">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Enhanced Progress Gauge
  const ProgressGauge = ({ value, max = 100, size = 80, label = '' }) => {
    const circumference = 2 * Math.PI * (size / 2 - 5);
    const progress = (value / max) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 5}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="6"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 5}
              fill="none"
              stroke={value >= 80 ? '#10B981' : value >= 60 ? '#3B82F6' : '#EF4444'}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{value}%</div>
            </div>
          </div>
        </div>
        {label && <div className="text-xs text-gray-600 mt-1 text-center">{label}</div>}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Learning Analytics Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Track your performance, competencies, and growth across all subjects
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'subjects', label: 'Subjects', icon: '📚' },
                { id: 'competencies', label: 'Competencies', icon: '🎯' },
                { id: 'recommendations', label: 'Recommendations', icon: '💡' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    activeView === item.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['week', 'month', 'term'].map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-2 rounded-md font-medium text-xs capitalize transition-all ${
                      timeRange === range
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Dashboard */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  title: 'Overall Performance', 
                  value: analyticsData.overview.overallPerformance, 
                  trend: analyticsData.overview.improvementTrend,
                  color: 'blue',
                  icon: '📈'
                },
                { 
                  title: 'Competency Mastery', 
                  value: analyticsData.overview.competencyMastery, 
                  trend: 5,
                  color: 'purple',
                  icon: '🎯'
                },
                { 
                  title: 'Learning Progress', 
                  value: analyticsData.overview.completionRate, 
                  trend: 8,
                  color: 'green',
                  icon: '✅'
                },
                { 
                  title: 'Class Rank', 
                  value: `#${analyticsData.overview.rankInClass}`,
                  subtitle: `of ${analyticsData.overview.totalStudents}`,
                  color: 'orange',
                  icon: '🏆'
                }
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{metric.icon}</span>
                    </div>
                    {metric.trend !== undefined && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        metric.trend > 0 ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {metric.trend > 0 ? '+' : ''}{metric.trend}%
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{metric.title}</p>
                    <div className="flex items-end justify-between">
                      <span className={`text-2xl font-bold text-gray-800`}>
                        {metric.value}
                      </span>
                      <ProgressGauge 
                        value={typeof metric.value === 'number' ? metric.value : parseInt(metric.value.replace('#', ''))} 
                        size={60}
                      />
                    </div>
                    {metric.subtitle && (
                      <p className="text-xs text-gray-500 mt-2">{metric.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Performance Trend</h3>
                  <span className="text-sm text-gray-500 capitalize">{timeRange}ly</span>
                </div>
                <LineChart 
                  data={analyticsData.trends[timeRange]} 
                  color="#3B82F6"
                  height={200}
                  title="Overall Performance Over Time"
                />
              </div>

              {/* Strand Performance */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Strand Performance</h3>
                <BarChart 
                  data={analyticsData.strandPerformance}
                  height={200}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Subjects */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Subjects</h3>
                <div className="space-y-4">
                  {analyticsData.subjects.slice(0, 3).map(subject => (
                    <div key={subject.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-sm">📚</span>
                        </div>
                        <span className="font-medium text-gray-800">{subject.name}</span>
                      </div>
                      <span className={`font-semibold ${getPerformanceColor(subject.score)}`}>
                        {subject.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competency Summary */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Competency Summary</h3>
                <div className="space-y-3">
                  {analyticsData.competencies.slice(0, 3).map(comp => (
                    <div key={comp.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{comp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(comp.level)}`}>
                          {comp.level}
                        </span>
                        <span className="font-semibold text-gray-800">{comp.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Actions</h3>
                <div className="space-y-3">
                  {analyticsData.recommendations.slice(0, 2).map(rec => (
                    <div key={rec.id} className={`p-3 rounded-lg border-l-4 ${
                      rec.priority === 'high' ? 'border-red-400 bg-red-50' :
                      rec.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                      'border-green-400 bg-green-50'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800 text-sm">{rec.subject}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subjects View */}
        {activeView === 'subjects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {analyticsData.subjects.map(subject => (
                <div key={subject.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.strand}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(subject.trend)}`}>
                      {subject.trend}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Overall Score</span>
                        <span className={`font-semibold ${getPerformanceColor(subject.score)}`}>
                          {subject.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getPerformanceBgColor(subject.score)}`}
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-500 mb-1">Competencies</div>
                        <div className="font-semibold text-gray-800">{subject.mastered}/{subject.competencies}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-500 mb-1">Assignments</div>
                        <div className="font-semibold text-gray-800">{subject.completed}/{subject.assignments}</div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <LineChart 
                        data={subject.weeklyProgress} 
                        color={subject.color} 
                        height={80} 
                        showGrid={false}
                        title="Weekly Progress"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competencies View */}
        {activeView === 'competencies' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsData.competencies.map(competency => (
                <div key={competency.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{competency.name}</h3>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(competency.level)}`}>
                        {competency.level}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(competency.trend)}`}>
                        {competency.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Current Mastery</span>
                        <span className="font-semibold text-gray-800">{competency.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getPerformanceBgColor(competency.score)}`}
                          style={{ width: `${competency.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Target Level</span>
                        <span className="font-semibold text-gray-800">{competency.target}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${competency.target}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Progress to target: </span>
                        {competency.target - competency.score > 0 
                          ? `${competency.target - competency.score}% needed`
                          : 'Target achieved! 🎉'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations View */}
        {activeView === 'recommendations' && (
          <div className="space-y-6">
            {analyticsData.recommendations.map(rec => (
              <div key={rec.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-xl mb-2">{rec.subject}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.type === 'improvement' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.type === 'improvement' ? 'Area for Improvement' : 'Enhancement Opportunity'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Impact: {rec.impact}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Analysis</h4>
                    <p className="text-gray-600 leading-relaxed">{rec.message}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-gray-800 mb-2">Recommended Action Plan</h4>
                    <p className="text-gray-700">{rec.action}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      Expected improvement: {rec.impact} impact
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                      Start Action Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerGuidance;