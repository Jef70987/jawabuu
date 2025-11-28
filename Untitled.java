import React, { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Save, 
  Cancel,
  Assessment as AssessmentIcon,
  School,
  Sports,
  Group,
  Person,
  TrendingUp,
  Download,
  Print,
  FilterList,
  Search
} from '@mui/icons-material';

// Mock API service for assessments
const assessmentApiService = {
  async getAssessments() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const savedData = localStorage.getItem('teacher-assessments');
      return savedData ? JSON.parse(savedData) : {
        students: [],
        assessments: [],
        criteria: {}
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async saveAssessments(data) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.setItem('teacher-assessments', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// CBC Assessment Criteria
const cbcAssessmentCriteria = {
  academic: {
    "Mathematics": ["Numeracy", "Problem Solving", "Mathematical Communication", "Reasoning"],
    "English": ["Reading", "Writing", "Listening", "Speaking", "Grammar"],
    "Kiswahili": ["Kusoma", "Kuandika", "Kusikiliza", "Kuzungumza", "Sarufi"],
    "Science": ["Scientific Knowledge", "Investigation", "Application", "Safety"],
    "Social Studies": ["Knowledge", "Research", "Critical Thinking", "Citizenship"]
  },
  lms: {
    "Module Completion": ["Timely Submission", "Quality of Work", "Understanding", "Participation"],
    "Quiz Performance": ["Accuracy", "Completion", "Improvement", "Consistency"],
    "Video Engagement": ["Viewing Time", "Interaction", "Note Taking", "Application"],
    "Resource Usage": ["Access Frequency", "Utilization", "Sharing", "Feedback"]
  },
  sports: {
    "Physical Education": ["Participation", "Skills Development", "Teamwork", "Sportsmanship"],
    "Games": ["Coordination", "Strategy", "Fitness", "Discipline"],
    "Athletics": ["Speed", "Endurance", "Technique", "Perseverance"]
  },
  talents: {
    "Music": ["Rhythm", "Creativity", "Participation", "Performance"],
    "Art": ["Creativity", "Skill", "Expression", "Technique"],
    "Drama": ["Expression", "Confidence", "Teamwork", "Creativity"]
  },
  lifeSkills: {
    "Communication": ["Clarity", "Listening", "Respect", "Confidence"],
    "Collaboration": ["Teamwork", "Sharing", "Leadership", "Support"],
    "Critical Thinking": ["Problem Solving", "Analysis", "Decision Making", "Creativity"],
    "Citizenship": ["Responsibility", "Respect", "Patriotism", "Community Service"]
  }
};

function Assessment() {
  // State management
  const [currentView, setCurrentView] = useState('dashboard');
  const [assessments, setAssessments] = useState({
    students: [],
    assessments: [],
    criteria: cbcAssessmentCriteria
  });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('academic');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [newAssessment, setNewAssessment] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [filterGrade, setFilterGrade] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock students data
  const mockStudents = [
    { id: '1', name: 'John Kamau', grade: 'Grade 4', class: '4 Blue', gender: 'Male' },
    { id: '2', name: 'Mary Wanjiku', grade: 'Grade 4', class: '4 Blue', gender: 'Female' },
    { id: '3', name: 'Peter Ochieng', grade: 'Grade 4', class: '4 Blue', gender: 'Male' },
    { id: '4', name: 'Grace Achieng', grade: 'Grade 5', class: '5 Green', gender: 'Female' },
    { id: '5', name: 'James Mwangi', grade: 'Grade 5', class: '5 Green', gender: 'Male' },
    { id: '6', name: 'Sarah Nyambura', grade: 'Grade 6', class: '6 Red', gender: 'Female' }
  ];

  const grades = ['All', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const assessmentCategories = [
    { id: 'academic', label: 'Academic', icon: School, color: 'blue' },
    { id: 'lms', label: 'LMS Performance', icon: AssessmentIcon, color: 'green' },
    { id: 'sports', label: 'Sports & PE', icon: Sports, color: 'red' },
    { id: 'talents', label: 'Talents', icon: Person, color: 'purple' },
    { id: 'lifeSkills', label: 'Life Skills', icon: Group, color: 'orange' }
  ];

  // Load assessments
  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const data = await assessmentApiService.getAssessments();
      
      // Initialize with mock students if no data exists
      if (data.students.length === 0) {
        data.students = mockStudents;
      }
      
      setAssessments(data);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load assessments');
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Assessment operations
  const startNewAssessment = (student) => {
    setSelectedStudent(student);
    setNewAssessment({
      id: Date.now().toString(),
      studentId: student.id,
      category: 'academic',
      subject: 'Mathematics',
      term: 'Term 1',
      academicYear: '2024',
      date: new Date().toISOString().split('T')[0],
      criteria: {},
      comments: '',
      overallScore: 0
    });
  };

  const saveAssessment = async (assessmentData) => {
    try {
      const updatedAssessments = { ...assessments };
      
      if (newAssessment) {
        // Calculate overall score
        const scores = Object.values(assessmentData.criteria).filter(score => score !== '');
        const totalScore = scores.reduce((sum, score) => sum + parseInt(score || 0), 0);
        const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;
        
        assessmentData.overallScore = averageScore;
        assessmentData.createdAt = new Date().toISOString();
        
        updatedAssessments.assessments.push(assessmentData);
        setNewAssessment(null);
      } else if (editingAssessment) {
        const index = updatedAssessments.assessments.findIndex(a => a.id === assessmentData.id);
        if (index !== -1) {
          const scores = Object.values(assessmentData.criteria).filter(score => score !== '');
          const totalScore = scores.reduce((sum, score) => sum + parseInt(score || 0), 0);
          const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;
          
          assessmentData.overallScore = averageScore;
          assessmentData.updatedAt = new Date().toISOString();
          
          updatedAssessments.assessments[index] = assessmentData;
        }
        setEditingAssessment(null);
      }

      await assessmentApiService.saveAssessments(updatedAssessments);
      setAssessments(updatedAssessments);
      setSelectedStudent(null);
      showSuccess('Assessment saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save assessment');
    }
  };

  const deleteAssessment = async (assessmentId) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;

    try {
      const updatedAssessments = {
        ...assessments,
        assessments: assessments.assessments.filter(a => a.id !== assessmentId)
      };
      
      await assessmentApiService.saveAssessments(updatedAssessments);
      setAssessments(updatedAssessments);
      showSuccess('Assessment deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete assessment');
    }
  };

  // Filter and search
  const filteredStudents = assessments.students.filter(student => {
    const matchesGrade = filterGrade === 'All' || student.grade === filterGrade;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const getStudentAssessments = (studentId) => {
    return assessments.assessments.filter(a => a.studentId === studentId);
  };

  const getStudentOverallPerformance = (studentId) => {
    const studentAssessments = getStudentAssessments(studentId);
    if (studentAssessments.length === 0) return 0;
    
    const totalScore = studentAssessments.reduce((sum, assessment) => sum + assessment.overallScore, 0);
    return Math.round(totalScore / studentAssessments.length);
  };

  // Statistics
  const getClassStatistics = () => {
    const classStudents = filterGrade !== 'All' 
      ? assessments.students.filter(s => s.grade === filterGrade)
      : assessments.students;

    if (classStudents.length === 0) return { average: 0, totalAssessments: 0 };

    const totalAssessments = assessments.assessments.filter(a => 
      classStudents.some(s => s.id === a.studentId)
    ).length;

    const totalScore = classStudents.reduce((sum, student) => 
      sum + getStudentOverallPerformance(student.id), 0
    );

    return {
      average: Math.round(totalScore / classStudents.length) || 0,
      totalAssessments
    };
  };

  const stats = getClassStatistics();

  if (loading) {
    return (
      <div className="h-screen max-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CBC Student Assessment</h1>
            <p className="text-gray-600 text-sm">Comprehensive student evaluation across all domains</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome, Teacher</p>
              <p className="text-xs text-gray-500">Assessment Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: AssessmentIcon },
            { id: 'assessments', label: 'Assessments', icon: School },
            { id: 'reports', label: 'Reports', icon: TrendingUp }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">{assessments.students.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Group className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Assessments</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalAssessments}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <AssessmentIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Class Average</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.average}%</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Grade</p>
                      <p className="text-2xl font-bold text-gray-900">{filterGrade === 'All' ? 'All' : filterGrade}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <School className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Assessment Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {assessmentCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedCategory === category.id 
                          ? `border-${category.color}-500 bg-${category.color}-50` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCurrentView('assessments');
                      }}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">{category.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">Click to assess</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Assessments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Assessments</h2>
                  <button 
                    onClick={() => setCurrentView('assessments')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {assessments.assessments.slice(0, 5).map(assessment => {
                    const student = assessments.students.find(s => s.id === assessment.studentId);
                    return (
                      <div key={assessment.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{student?.name}</h4>
                          <p className="text-sm text-gray-600">
                            {assessment.category} • {assessment.subject} • {assessment.term}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            assessment.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                            assessment.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {assessment.overallScore}%
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(assessment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {assessments.assessments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <AssessmentIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No assessments recorded yet</p>
                      <p className="text-sm">Start assessing your students</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Assessments View */}
          {currentView === 'assessments' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <h2 className="text-xl font-semibold text-gray-800">Student Assessments</h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                    />
                  </div>

                  {/* Grade Filter */}
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {assessmentCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Students List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map(student => {
                  const studentAssessments = getStudentAssessments(student.id);
                  const overallPerformance = getStudentOverallPerformance(student.id);
                  
                  return (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.grade} • {student.class}</p>
                          <p className="text-xs text-gray-500">{student.gender}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            overallPerformance >= 80 ? 'bg-green-100 text-green-800' :
                            overallPerformance >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {overallPerformance}%
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{studentAssessments.length} assessments</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => startNewAssessment(student)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Add className="w-4 h-4" />
                          New Assessment
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            // View student details
                          }}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Person className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No students found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {/* Assessment Form */}
          {(newAssessment || editingAssessment) && (
            <AssessmentForm
              assessment={newAssessment || editingAssessment}
              student={selectedStudent}
              onSave={saveAssessment}
              onCancel={() => {
                setNewAssessment(null);
                setEditingAssessment(null);
                setSelectedStudent(null);
              }}
              criteria={cbcAssessmentCriteria}
              assessmentCategories={assessmentCategories}
            />
          )}

          {/* Reports View */}
          {currentView === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Assessment Reports</h2>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Print className="w-4 h-4" />
                    Print
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Reports content would go here */}
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Reports feature coming soon</p>
                <p className="text-sm">Detailed analytics and reporting tools</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Assessment Form Component
const AssessmentForm = ({ assessment, student, onSave, onCancel, criteria, assessmentCategories }) => {
  const [formData, setFormData] = useState({
    ...assessment,
    criteria: { ...assessment.criteria }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateCriteriaScore = (criterion, score) => {
    setFormData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [criterion]: score
      }
    }));
  };

  const getCurrentCriteria = () => {
    if (formData.category === 'academic') {
      return criteria.academic[formData.subject] || [];
    }
    return criteria[formData.category] ? Object.values(criteria[formData.category]).flat() : [];
  };

  const currentCriteria = getCurrentCriteria();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {assessment.id.startsWith('new') ? 'New' : 'Edit'} Assessment
              </h2>
              <p className="text-gray-600">Assessing: {student?.name} - {student?.grade}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Assessment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subject: '' }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {assessmentCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>

            {formData.category === 'academic' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Subject</option>
                  {Object.keys(criteria.academic).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select
                value={formData.term}
                onChange={(e) => setFormData(prev => ({ ...prev, term: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Assessment Criteria */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Criteria</h3>
            <div className="space-y-4">
              {currentCriteria.map((criterion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {criterion}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(score => (
                      <label key={score} className="flex flex-col items-center cursor-pointer">
                        <input
                          type="radio"
                          name={criterion}
                          value={score}
                          checked={formData.criteria[criterion] === score.toString()}
                          onChange={(e) => updateCriteriaScore(criterion, e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.criteria[criterion] === score.toString()
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}>
                          {score}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {score === 1 ? 'Needs Improvement' : 
                           score === 2 ? 'Developing' : 
                           score === 3 ? 'Satisfactory' : 
                           score === 4 ? 'Good' : 'Excellent'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Teacher's Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your comments and observations..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Assessment;