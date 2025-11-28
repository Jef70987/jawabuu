import { Assignment } from '@mui/icons-material';
import React, { useState } from 'react';

function Assignments() {
  // State for assignments
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  // State for submissions
  const [submissions, setSubmissions] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [file, setFile] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');

  // State for grades
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [assignmentGradeId, setAssignmentGradeId] = useState('');
  const [studentGrade, setStudentGrade] = useState('');

  // State for students
  const [students] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);

  // Function to add a new assignment
  const addAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: Date.now(),
      title,
      description,
      deadline,
    };
    setAssignments([...assignments, newAssignment]);
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  // Function to add a new submission
  const addSubmission = (e) => {
    e.preventDefault();
    const newSubmission = {
      id: Date.now(),
      studentName,
      assignmentId,
      file,
      feedback: '',
      grade: '',
    };
    setSubmissions([...submissions, newSubmission]);
    setStudentName('');
    setAssignmentId('');
    setFile('');
  };

  // Function to provide feedback and grade
  const provideFeedback = (submissionId) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === submissionId
          ? { ...submission, feedback, grade }
          : submission
      )
    );
    setFeedback('');
    setGrade('');
  };

  // Function to add or update student grades
  const addGrade = (e) => {
    e.preventDefault();
    const existingGrade = grades.find(
      (g) => g.studentId === studentId && g.assignmentId === assignmentGradeId
    );
    if (existingGrade) {
      setGrades(
        grades.map((g) =>
          g.studentId === studentId && g.assignmentId === assignmentGradeId
            ? { ...g, grade: studentGrade }
            : g
        )
      );
    } else {
      setGrades([...grades, { studentId, assignmentId: assignmentGradeId, grade: studentGrade }]);
    }
    setStudentId('');
    setAssignmentGradeId('');
    setStudentGrade('');
  };

  // Function to calculate class performance
  const calculateClassPerformance = () => {
    const totalGrades = grades.reduce((sum, grade) => sum + parseFloat(grade.grade || 0), 0);
    const averageGrade = totalGrades / grades.length || 0;
    return averageGrade.toFixed(2);
  };

  // Function to calculate individual student performance
  const calculateStudentPerformance = (studentId) => {
    const studentGrades = grades.filter((grade) => grade.studentId === studentId);
    const totalGrades = studentGrades.reduce((sum, grade) => sum + parseFloat(grade.grade || 0), 0);
    const averageGrade = totalGrades / studentGrades.length || 0;
    return averageGrade.toFixed(2);
  };

  return (
    <div className="h-screen max-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600 text-sm">Kenya CBC Teacher Portal</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, Teacher</p>
                <p className="text-xs text-gray-500">Last login: Today</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden">
            <div className="space-y-6 pb-6">
              {/* Create and Manage Assignments Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Create and Manage Assignments</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {assignments.length} assignments
                  </span>
                </div>
                
                <form onSubmit={addAssignment} className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter assignment title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assignment Description
                    </label>
                    <textarea
                      placeholder="Describe the assignment requirements..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Create Assignment
                  </button>
                </form>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Assignments List</h3>
                  <div className="max-h-60 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{assignment.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Deadline: <span className="font-medium">{assignment.deadline}</span>
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded ml-4 flex-shrink-0">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                    {assignments.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No assignments created yet
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Review and Provide Feedback Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Review and Provide Feedback</h2>
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    {submissions.length} submissions
                  </span>
                </div>
                
                <form onSubmit={addSubmission} className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter student name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment ID
                      </label>
                      <input
                        type="text"
                        placeholder="Enter assignment ID"
                        value={assignmentId}
                        onChange={(e) => setAssignmentId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submission File
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Add Submission
                  </button>
                </form>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Submissions List</h3>
                  <div className="max-h-60 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{submission.studentName}</h4>
                            <p className="text-gray-600 text-sm">Assignment ID: {submission.assignmentId}</p>
                            <p className="text-gray-500 text-sm">File: {submission.file?.name}</p>
                          </div>
                          {submission.grade ? (
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                              Graded: {submission.grade}
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded">
                              Pending Review
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Enter feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Enter grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          />
                        </div>
                        
                        <button
                          onClick={() => provideFeedback(submission.id)}
                          className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                        >
                          Submit Feedback
                        </button>
                      </div>
                    ))}
                    {submissions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No submissions yet
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Manage Student Grades Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Manage Student Grades</h2>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {grades.length} grades
                  </span>
                </div>
                
                <form onSubmit={addGrade} className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student
                      </label>
                      <select
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment
                      </label>
                      <select
                        value={assignmentGradeId}
                        onChange={(e) => setAssignmentGradeId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Assignment</option>
                        {assignments.map((assignment) => (
                          <option key={assignment.id} value={assignment.id}>
                            {assignment.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade
                      </label>
                      <input
                        type="text"
                        placeholder="Enter grade"
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Add Grade
                  </button>
                </form>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Grades List</h3>
                  <div className="max-h-60 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {grades.map((grade, index) => (
                      <div key={index} className="flex justify-between items-center border border-gray-200 rounded-lg p-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {students.find((s) => s.id == grade.studentId)?.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {assignments.find((a) => a.id == grade.assignmentId)?.title}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
                          {grade.grade}
                        </span>
                      </div>
                    ))}
                    {grades.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No grades entered yet
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Analytics Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Class Performance</h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {calculateClassPerformance()}
                      </div>
                      <p className="text-gray-600">Average Grade</p>
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (calculateClassPerformance() / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Individual Student Performance</h3>
                    <div className="max-h-48 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {students.map((student) => (
                        <div key={student.id} className="flex justify-between items-center border border-gray-200 rounded-lg p-4">
                          <span className="font-medium text-gray-900">{student.name}</span>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-800">
                              {calculateStudentPerformance(student.id)}
                            </div>
                            <div className="text-sm text-gray-500">Average Grade</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;