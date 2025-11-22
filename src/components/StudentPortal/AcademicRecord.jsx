import React, { useState } from 'react';

const AcademicRecord = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [activeTab, setActiveTab] = useState('academic');

  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const years = ['2024', '2023', '2022'];

  // Kenya CBC 7 Core Competencies
  const coreCompetencies = [
    {
      name: "Communication and Collaboration",
      description: "Ability to express ideas clearly and work effectively with others",
      level: "Proficient",
      progress: 85,
      evidence: ["Group presentations", "Peer reviews", "Class discussions"]
    },
    {
      name: "Critical Thinking and Problem Solving",
      description: "Ability to analyze information and develop solutions",
      level: "Advanced",
      progress: 88,
      evidence: ["Math problems", "Science experiments", "Research projects"]
    },
    {
      name: "Creativity and Imagination",
      description: "Ability to generate innovative ideas and think creatively",
      level: "Proficient",
      progress: 78,
      evidence: ["Art projects", "Creative writing", "Design solutions"]
    },
    {
      name: "Citizenship",
      description: "Understanding of rights, responsibilities and community engagement",
      level: "Advanced",
      progress: 90,
      evidence: ["Community service", "Class leadership", "Cultural activities"]
    },
    {
      name: "Learning to Learn",
      description: "Ability to plan, monitor and direct one's own learning",
      level: "Proficient",
      progress: 82,
      evidence: ["Study plans", "Self-assessments", "Learning journals"]
    },
    {
      name: "Digital Literacy",
      description: "Ability to use technology effectively for learning and communication",
      level: "Developing",
      progress: 72,
      evidence: ["Digital projects", "Online research", "Tech presentations"]
    },
    {
      name: "Self-Efficacy",
      description: "Confidence in one's ability to accomplish tasks and achieve goals",
      level: "Proficient",
      progress: 80,
      evidence: ["Goal setting", "Project completion", "Peer feedback"]
    }
  ];

  const termResults = [
    {
      term: "Term 1 2024",
      date: "March 2024",
      subjects: [
        { name: "Mathematics", marks: 85, grade: "A", points: 12, position: 5 },
        { name: "English", marks: 78, grade: "B+", points: 10, position: 12 },
        { name: "Kiswahili", marks: 82, grade: "A-", points: 11, position: 8 },
        { name: "Physics", marks: 76, grade: "B+", points: 10, position: 15 },
        { name: "Chemistry", marks: 80, grade: "A-", points: 11, position: 9 },
        { name: "Biology", marks: 79, grade: "B+", points: 10, position: 11 },
        { name: "History", marks: 72, grade: "B", points: 9, position: 18 },
        { name: "Geography", marks: 81, grade: "A-", points: 11, position: 7 }
      ],
      summary: {
        averageMarks: 79.1,
        averageGrade: "B+",
        totalPoints: 84,
        classPosition: 10,
        totalStudents: 45,
        remarks: "Good consistent performance. Shows improvement in sciences."
      }
    },
    {
      term: "Term 2 2024",
      date: "June 2024",
      subjects: [
        { name: "Mathematics", marks: 88, grade: "A", points: 12, position: 3 },
        { name: "English", marks: 82, grade: "A-", points: 11, position: 8 },
        { name: "Kiswahili", marks: 85, grade: "A", points: 12, position: 5 },
        { name: "Physics", marks: 81, grade: "A-", points: 11, position: 10 },
        { name: "Chemistry", marks: 84, grade: "A", points: 12, position: 6 },
        { name: "Biology", marks: 83, grade: "A", points: 12, position: 7 },
        { name: "History", marks: 78, grade: "B+", points: 10, position: 15 },
        { name: "Geography", marks: 85, grade: "A", points: 12, position: 4 }
      ],
      summary: {
        averageMarks: 83.3,
        averageGrade: "A-",
        totalPoints: 92,
        classPosition: 6,
        totalStudents: 45,
        remarks: "Excellent improvement across all subjects. Strong performance in sciences."
      }
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Renewable Energy Research Project",
      type: "Science Project",
      subject: "Physics/Chemistry",
      date: "15 Mar 2024",
      status: "Assessed",
      grade: "A",
      competencies: ["Critical Thinking", "Digital Literacy", "Creativity"],
      description: "Comprehensive research on solar energy applications with working prototype",
      artifacts: ["Research paper", "Prototype photos", "Data analysis", "Presentation"],
      teacher: "Dr. Wanjala",
      feedback: "Outstanding research methodology and innovative approach to renewable energy solutions."
    },
    {
      id: 2,
      title: "Community Environmental Initiative",
      type: "Service Learning",
      subject: "Geography/Citizenship",
      date: "22 Feb 2024",
      status: "Completed",
      grade: "A-",
      competencies: ["Citizenship", "Collaboration", "Self-Efficacy"],
      description: "Organized community cleanup and environmental awareness campaign",
      artifacts: ["Event photos", "Participation records", "Community feedback", "Reflection"],
      teacher: "Mrs. Akinyi",
      feedback: "Demonstrated excellent leadership and community engagement skills."
    }
  ];

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'bg-green-100 text-green-800 border-green-200';
    if (grade.includes('A-')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (grade.includes('B+')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (grade.includes('B')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Proficient': return 'bg-blue-100 text-blue-800';
      case 'Developing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 85) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handlePrint = () => {
    window.print();
  };

  const currentTermResult = termResults.find(term => term.term === `${selectedTerm} ${selectedYear}`) || termResults[0];

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white py-4 px-2 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 print:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 print:text-black">CBC Academic Record</h1>
              <p className="text-gray-600 print:text-gray-700">Kenya Competency Based Curriculum</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 mt-3 sm:mt-0">
              <div className="flex space-x-2">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
                >
                  {terms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium print:hidden"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200 print:hidden">
          <nav className="flex space-x-8">
            {[
              { id: 'academic', name: 'Term Results' },
              { id: 'competencies', name: 'Core Competencies' },
              { id: 'portfolio', name: 'Learning Portfolio' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Term Results Tab */}
        {activeTab === 'academic' && (
          <div className="space-y-6 print:space-y-4">
            {/* Term Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:shadow-none print:border print:p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{currentTermResult.term} Results</h2>
                <span className="text-sm text-gray-500">{currentTermResult.date}</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{currentTermResult.summary.averageMarks.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Average Marks</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${getGradeColor(currentTermResult.summary.averageGrade).split(' ')[1]}`}>
                    {currentTermResult.summary.averageGrade}
                  </div>
                  <div className="text-sm text-gray-600">Average Grade</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{currentTermResult.summary.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{currentTermResult.summary.classPosition}/{currentTermResult.summary.totalStudents}</div>
                  <div className="text-sm text-gray-600">Class Position</div>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentTermResult.subjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subject.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                          {subject.marks}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                          {subject.points}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                          {subject.position}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Remarks */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Teacher's Remarks</h3>
                <p className="text-blue-800">{currentTermResult.summary.remarks}</p>
              </div>
            </div>
          </div>
        )}

        {/* Core Competencies Tab */}
        {activeTab === 'competencies' && (
          <div className="space-y-6 print:space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:shadow-none print:border print:p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Core Competencies Assessment</h2>
              
              <div className="grid gap-4">
                {coreCompetencies.map((competency, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{competency.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{competency.description}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 sm:mt-0 ${getLevelColor(competency.level)}`}>
                        {competency.level}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{competency.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(competency.progress)}`}
                          style={{ width: `${competency.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence of Learning:</h4>
                      <div className="flex flex-wrap gap-2">
                        {competency.evidence.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Learning Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 print:space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:shadow-none print:border print:p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Portfolio</h2>
              
              <div className="grid gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {item.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            {item.subject}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2 mt-2 lg:mt-0">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(item.grade)}`}>
                          Grade: {item.grade}
                        </span>
                        <span className="text-sm text-gray-500">By: {item.teacher}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Applied Competencies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.competencies.map((comp, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Portfolio Artifacts:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.artifacts.map((artifact, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                            {artifact}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Teacher Feedback:</h4>
                      <p className="text-gray-700 italic">"{item.feedback}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Print Footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300">
          <div className="text-center text-sm text-gray-600">
            <p>Official CBC Academic Record - Generated on {new Date().toLocaleDateString()}</p>
            <p>Kenya Competency Based Curriculum - Ministry of Education</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecord;