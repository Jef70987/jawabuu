import { useState, useEffect } from 'react';

const Reports = () => {
  // State for report type and filters
  const [reportType, setReportType] = useState('attendance');
  const [selectedClass, setSelectedClass] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [format, setFormat] = useState('pdf');
  
  // State for generated reports
  const [generatedReports, setGeneratedReports] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State for analytics data
  const [analytics, setAnalytics] = useState({});

  // Sample data
  const classes = [
    { id: 1, name: 'Mathematics 101', grade: '10th Grade', students: 28 },
    { id: 2, name: 'Advanced Science', grade: '11th Grade', students: 24 },
    { id: 3, name: 'English Literature', grade: '10th Grade', students: 30 }
  ];

  const students = [
    { id: 1, name: 'John Smith', classId: 1, attendance: '95%', averageGrade: 'A-' },
    { id: 2, name: 'Sarah Johnson', classId: 1, attendance: '88%', averageGrade: 'B+' },
    { id: 3, name: 'Michael Brown', classId: 2, attendance: '92%', averageGrade: 'A' },
    { id: 4, name: 'Emily Davis', classId: 2, attendance: '85%', averageGrade: 'B' },
    { id: 5, name: 'David Wilson', classId: 3, attendance: '96%', averageGrade: 'A-' }
  ];

  const assignments = [
    { id: 1, title: 'Algebra Quiz', classId: 1, dueDate: '2024-06-15', averageScore: 85, submissions: 25 },
    { id: 2, title: 'Science Lab Report', classId: 2, dueDate: '2024-06-20', averageScore: 78, submissions: 20 },
    { id: 3, title: 'Essay: Shakespeare', classId: 3, dueDate: '2024-06-18', averageScore: 82, submissions: 28 }
  ];

  // Report types configuration
  const reportTypes = {
    attendance: {
      title: 'Attendance Report',
      description: 'Track student attendance patterns and statistics',
      icon: '📊',
      fields: ['Student Name', 'Class', 'Present', 'Absent', 'Late', 'Attendance %']
    },
    grades: {
      title: 'Grade Report',
      description: 'Comprehensive grade analysis and performance tracking',
      icon: '📝',
      fields: ['Student Name', 'Class', 'Assignment', 'Score', 'Grade', 'Date']
    },
    performance: {
      title: 'Performance Analytics',
      description: 'Detailed student performance metrics and trends',
      icon: '📈',
      fields: ['Student Name', 'Class', 'Average Grade', 'Improvement', 'Rank']
    },
    assignments: {
      title: 'Assignment Report',
      description: 'Assignment completion and submission statistics',
      icon: '📋',
      fields: ['Assignment', 'Class', 'Due Date', 'Submissions', 'Average Score', 'Status']
    },
    behavior: {
      title: 'Behavior Report',
      description: 'Student behavior and participation metrics',
      icon: '👥',
      fields: ['Student Name', 'Class', 'Participation', 'Behavior', 'Comments', 'Date']
    }
  };

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalytics({
        totalStudents: students.length,
        averageAttendance: '92%',
        assignmentsGraded: 15,
        pendingGrading: 3,
        topPerformingClass: 'Mathematics 101',
        improvementRate: '+5%'
      });
    };

    fetchAnalytics();
  }, []);

  // Generate report function
  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReport = {
      id: Date.now(),
      type: reportType,
      class: selectedClass === 'all' ? 'All Classes' : classes.find(c => c.id == selectedClass)?.name,
      dateRange: `${dateRange.start} to ${dateRange.end}`,
      format: format,
      generatedAt: new Date().toLocaleString(),
      status: 'completed',
      downloadUrl: '#'
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    setIsGenerating(false);
  };

  // Get filtered data based on selections
  const getFilteredData = () => {
    let data = [];
    
    switch (reportType) {
      case 'attendance':
        data = students.map(student => {
          const studentClass = classes.find(c => c.id === student.classId);
          return {
            name: student.name,
            class: studentClass?.name,
            present: Math.floor(Math.random() * 20) + 15,
            absent: Math.floor(Math.random() * 5),
            late: Math.floor(Math.random() * 3),
            attendance: student.attendance
          };
        });
        break;
        
      case 'grades':
        data = students.flatMap(student => {
          const studentClass = classes.find(c => c.id === student.classId);
          return assignments
            .filter(a => a.classId === student.classId)
            .map(assignment => ({
              name: student.name,
              class: studentClass?.name,
              assignment: assignment.title,
              score: Math.floor(Math.random() * 30) + 70,
              grade: ['A', 'A-', 'B+', 'B', 'B-', 'C+'][Math.floor(Math.random() * 6)],
              date: assignment.dueDate
            }));
        });
        break;
        
      case 'performance':
        data = students.map(student => {
          const studentClass = classes.find(c => c.id === student.classId);
          return {
            name: student.name,
            class: studentClass?.name,
            averageGrade: student.averageGrade,
            improvement: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 10)}%`,
            rank: Math.floor(Math.random() * students.length) + 1
          };
        });
        break;
        
      default:
        data = [];
    }
    
    // Filter by class if selected
    if (selectedClass !== 'all') {
      const classId = parseInt(selectedClass);
      data = data.filter(item => {
        const student = students.find(s => s.name === item.name);
        return student && student.classId === classId;
      });
    }
    
    return data;
  };

  // Preview data for the selected report
  const previewData = getFilteredData().slice(0, 5);

  return (
    <div className="flex-1 bg-gray-50 text-gray-800 overflow-hidden flex flex-col max-h-screen">
      {/* Main Content Area with Scroll (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden max-h-full">
        <div className="w-full max-w-full">
          {/* Header */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 md:py-6 mb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600">Generate comprehensive reports and analyze student data</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last generated</p>
                <p className="text-sm font-medium text-gray-700">Today, 10:30 AM</p>
              </div>
            </div>
          </header>

          {/* Analytics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Total Students</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{analytics.totalStudents || 0}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Avg Attendance</div>
              <div className="text-2xl md:text-3xl font-bold text-green-500 my-2">{analytics.averageAttendance || '0%'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Graded</div>
              <div className="text-2xl md:text-3xl font-bold text-purple-500 my-2">{analytics.assignmentsGraded || 0}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Pending</div>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 my-2">{analytics.pendingGrading || 0}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Top Class</div>
              <div className="text-2xl md:text-3xl font-bold text-indigo-500 my-2 text-sm">
                {analytics.topPerformingClass || 'N/A'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center col-span-2 lg:col-span-1">
              <div className="text-gray-600 text-sm md:text-base">Improvement</div>
              <div className="text-2xl md:text-3xl font-bold text-teal-500 my-2">{analytics.improvementRate || '0%'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Report Configuration Panel */}
            <div className="xl:col-span-2 space-y-6">
              {/* Report Type Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Generate New Report</h2>
                
                {/* Report Type Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {Object.entries(reportTypes).map(([key, report]) => (
                    <button
                      key={key}
                      onClick={() => setReportType(key)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        reportType === key
                          ? 'border-blue-500 bg-blue-50 transform scale-105'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{report.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm mb-1">{report.title}</div>
                      <div className="text-gray-600 text-xs">{report.description}</div>
                    </button>
                  ))}
                </div>

                {/* Report Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Classes</option>
                      {classes.map(classItem => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Format Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
                  <div className="flex space-x-4">
                    {['pdf', 'excel', 'csv'].map(formatType => (
                      <label key={formatType} className="flex items-center">
                        <input
                          type="radio"
                          value={formatType}
                          checked={format === formatType}
                          onChange={(e) => setFormat(e.target.value)}
                          className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 uppercase">{formatType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Report...
                    </>
                  ) : (
                    `Generate ${reportTypes[reportType]?.title}`
                  )}
                </button>
              </div>

              {/* Report Preview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Report Preview</h2>
                  <span className="text-sm text-gray-500">
                    Showing {previewData.length} of {getFilteredData().length} records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {reportTypes[reportType]?.fields.map((field, index) => (
                          <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {previewData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No data available for the selected filters
                  </div>
                )}
              </div>
            </div>

            {/* Recent Reports & Quick Actions */}
            <div className="space-y-6">
              {/* Recent Reports */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Reports</h2>
                
                <div className="space-y-4 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {generatedReports.map(report => (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-800">{reportTypes[report.type]?.title}</div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          report.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {report.class} • {report.dateRange}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{report.generatedAt}</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Download</button>
                          <button className="text-gray-600 hover:text-gray-800">Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {generatedReports.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No reports generated yet
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Reports */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Reports</h2>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-800">Weekly Attendance Summary</div>
                    <div className="text-sm text-gray-600">This week's attendance overview</div>
                  </button>
                  
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-800">Grade Distribution</div>
                    <div className="text-sm text-gray-600">Current grade statistics</div>
                  </button>
                  
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-800">Missing Assignments</div>
                    <div className="text-sm text-gray-600">Students with pending work</div>
                  </button>
                  
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="font-medium text-gray-800">Parent Contact Report</div>
                    <div className="text-sm text-gray-600">Communication history</div>
                  </button>
                </div>
              </div>

              {/* Report Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Report Tips</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Use specific date ranges for accurate data</li>
                  <li>• Export to Excel for advanced analysis</li>
                  <li>• Schedule recurring reports for consistency</li>
                  <li>• Compare multiple classes for insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;