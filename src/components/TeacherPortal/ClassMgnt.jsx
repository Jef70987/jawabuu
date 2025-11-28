/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const ClassMng = () => {
  // State for classes
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Mathematics 101',
      subject: 'Mathematics',
      grade: '10th Grade',
      students: 28,
      schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
      room: 'Room 101',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Advanced Science',
      subject: 'Science',
      grade: '11th Grade',
      students: 24,
      schedule: 'Tue, Thu 10:00-11:30 AM',
      room: 'Lab 205',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'English Literature',
      subject: 'English',
      grade: '10th Grade',
      students: 30,
      schedule: 'Mon, Wed, Fri 11:00-12:00 PM',
      room: 'Room 103',
      color: 'bg-purple-500'
    }
  ]);

  // State for students
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@student.edu',
      grade: 'A-',
      attendance: '95%',
      classId: 1
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@student.edu',
      grade: 'B+',
      attendance: '88%',
      classId: 1
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@student.edu',
      grade: 'A',
      attendance: '92%',
      classId: 2
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@student.edu',
      grade: 'B',
      attendance: '85%',
      classId: 2
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@student.edu',
      grade: 'A-',
      attendance: '96%',
      classId: 3
    }
  ]);

  // State for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Algebra Quiz',
      classId: 1,
      dueDate: '2024-06-15',
      totalPoints: 100,
      submissions: 25,
      status: 'graded'
    },
    {
      id: 2,
      title: 'Science Lab Report',
      classId: 2,
      dueDate: '2024-06-20',
      totalPoints: 50,
      submissions: 20,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Essay: Shakespeare',
      classId: 3,
      dueDate: '2024-06-18',
      totalPoints: 100,
      submissions: 28,
      status: 'in-progress'
    }
  ]);

  // State for modals and forms
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    grade: '',
    schedule: '',
    room: ''
  });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    classId: '',
    dueDate: '',
    totalPoints: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('all');

  // Filter students based on search and class selection
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClassId === 'all' || student.classId === parseInt(selectedClassId);
    return matchesSearch && matchesClass;
  });

  // Get students for a specific class
  const getStudentsByClass = (classId) => {
    return students.filter(student => student.classId === classId);
  };

  // Get assignments for a specific class
  const getAssignmentsByClass = (classId) => {
    return assignments.filter(assignment => assignment.classId === classId);
  };

  // Modal functions
  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    if (data) {
      if (modalType === 'class-details') setSelectedClass(data);
      if (modalType === 'student-details') setSelectedStudent(data);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedClass(null);
    setSelectedStudent(null);
  };

  // Class management functions
  const handleAddClass = (e) => {
    e.preventDefault();
    const newClassObj = {
      id: classes.length + 1,
      ...newClass,
      students: 0,
      color: `bg-${['blue', 'green', 'purple', 'red', 'yellow', 'indigo'][classes.length % 6]}-500`
    };
    setClasses([...classes, newClassObj]);
    setNewClass({ name: '', subject: '', grade: '', schedule: '', room: '' });
    closeModal();
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const newAssignmentObj = {
      id: assignments.length + 1,
      ...newAssignment,
      submissions: 0,
      status: 'pending'
    };
    setAssignments([...assignments, newAssignmentObj]);
    setNewAssignment({ title: '', classId: '', dueDate: '', totalPoints: '', description: '' });
    closeModal();
  };

  // Delete functions
  const deleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      setClasses(classes.filter(c => c.id !== classId));
      setStudents(students.filter(s => s.classId !== classId));
      setAssignments(assignments.filter(a => a.classId !== classId));
    }
  };

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the class?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  return (
    <div className="flex-1 bg-gray-50 text-gray-800 overflow-hidden flex flex-col max-h-screen">
      {/* Main Content Area with Scroll (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden max-h-full">
        <div className="w-full max-w-full">
          {/* Header */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 md:py-6 mb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Class Management</h1>
              <p className="text-gray-600">Manage your classes, students, and assignments</p>
            </div>
            <button 
              onClick={() => openModal('add-class')}
              className="mt-4 lg:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Class</span>
            </button>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-gray-600 text-sm md:text-base">Total Classes</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{classes.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-gray-600 text-sm md:text-base">Total Students</div>
              <div className="text-2xl md:text-3xl font-bold text-green-500 my-2">{students.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-gray-600 text-sm md:text-base">Active Assignments</div>
              <div className="text-2xl md:text-3xl font-bold text-purple-500 my-2">{assignments.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-gray-600 text-sm md:text-base">Avg. Attendance</div>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 my-2">
                {students.length > 0 
                  ? Math.round(students.reduce((acc, student) => acc + parseInt(student.attendance), 0) / students.length) + '%'
                  : '0%'
                }
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Classes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map(classItem => (
                <div key={classItem.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${classItem.color} flex items-center justify-center text-white font-bold`}>
                      {classItem.subject.charAt(0)}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openModal('class-details', classItem)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteClass(classItem.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{classItem.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{classItem.subject} • {classItem.grade}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium">{classItem.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room:</span>
                      <span className="font-medium">{classItem.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schedule:</span>
                      <span className="font-medium text-right">{classItem.schedule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:mb-0">Students</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <select 
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Classes</option>
                  {classes.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
                <input 
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map(student => {
                      const studentClass = classes.find(c => c.id === student.classId);
                      return (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-medium">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{studentClass?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.grade.includes('A') ? 'bg-green-100 text-green-800' :
                              student.grade.includes('B') ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {student.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.attendance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => openModal('student-details', student)}
                              className="text-blue-500 hover:text-blue-700 mr-3"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => deleteStudent(student.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Assignments Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Assignments</h2>
              <button 
                onClick={() => openModal('add-assignment')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <span>+</span>
                <span>New Assignment</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map(assignment => {
                const assignmentClass = classes.find(c => c.id === assignment.classId);
                return (
                  <div key={assignment.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        assignment.status === 'graded' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{assignmentClass?.name}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Points:</span>
                        <span className="font-medium">{assignment.totalPoints}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Submissions:</span>
                        <span className="font-medium">{assignment.submissions}/{assignmentClass?.students || 0}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                        Grade
                      </button>
                      <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Add Class Modal */}
      {activeModal === 'add-class' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Add New Class</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form onSubmit={handleAddClass}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Class Name</label>
                  <input 
                    type="text" 
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Subject</label>
                  <input 
                    type="text" 
                    value={newClass.subject}
                    onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Grade Level</label>
                  <select 
                    value={newClass.grade}
                    onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Schedule</label>
                  <input 
                    type="text" 
                    value={newClass.schedule}
                    onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                    placeholder="e.g., Mon, Wed, Fri 9:00-10:00 AM"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Room</label>
                  <input 
                    type="text" 
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Create Class
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {activeModal === 'add-assignment' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Create New Assignment</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form onSubmit={handleAddAssignment}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Assignment Title</label>
                  <input 
                    type="text" 
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Class</label>
                  <select 
                    value={newAssignment.classId}
                    onChange={(e) => setNewAssignment({...newAssignment, classId: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(classItem => (
                      <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total Points</label>
                  <input 
                    type="number" 
                    value={newAssignment.totalPoints}
                    onChange={(e) => setNewAssignment({...newAssignment, totalPoints: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                  <textarea 
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  Create Assignment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {activeModal === 'class-details' && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h2>
                  <p className="text-gray-600">{selectedClass.subject} • {selectedClass.grade}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Class Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{selectedClass.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium">{selectedClass.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Students:</span>
                      <span className="font-medium">{selectedClass.students}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      Take Attendance
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                      Post Announcement
                    </button>
                    <button className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
                      View Gradebook
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Students in this Class</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Student Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Grade</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getStudentsByClass(selectedClass.id).map(student => (
                        <tr key={student.id} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm">{student.name}</td>
                          <td className="px-4 py-2 text-sm">{student.grade}</td>
                          <td className="px-4 py-2 text-sm">{student.attendance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Recent Assignments</h3>
                <div className="space-y-3">
                  {getAssignmentsByClass(selectedClass.id).map(assignment => (
                    <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{assignment.submissions}/{selectedClass.students} submitted</div>
                        <div className="text-sm text-gray-600">{assignment.totalPoints} points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassMng;