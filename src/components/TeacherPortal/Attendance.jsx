/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWeekend } from 'date-fns';
import { Save, Delete, Edit, Add, FileDownload, Group, Today, CheckCircle } from '@mui/icons-material';

// Mock database with pre-populated students for different grades
const mockDatabase = {
  students: [
    { id: '1', name: 'John Kamau', grade: 'Grade 4', class: '4 Blue' },
    { id: '2', name: 'Mary Wanjiku', grade: 'Grade 4', class: '4 Blue' },
    { id: '3', name: 'Peter Ochieng', grade: 'Grade 4', class: '4 Blue' },
    { id: '4', name: 'Grace Achieng', grade: 'Grade 4', class: '4 Blue' },
    { id: '5', name: 'James Mwangi', grade: 'Grade 4', class: '4 Blue' },
    { id: '6', name: 'Sarah Nyambura', grade: 'Grade 4', class: '4 Blue' },
    { id: '7', name: 'David Kipchoge', grade: 'Grade 4', class: '4 Blue' },
    { id: '8', name: 'Elizabeth Atieno', grade: 'Grade 4', class: '4 Blue' },
    { id: '9', name: 'Michael Njoroge', grade: 'Grade 4', class: '4 Blue' },
    { id: '10', name: 'Rebecca Adhiambo', grade: 'Grade 4', class: '4 Blue' },
    { id: '11', name: 'Brian Otieno', grade: 'Grade 5', class: '5 Green' },
    { id: '12', name: 'Cynthia Wambui', grade: 'Grade 5', class: '5 Green' },
    { id: '13', name: 'Kevin Maina', grade: 'Grade 5', class: '5 Green' },
    { id: '14', name: 'Nancy Akinyi', grade: 'Grade 5', class: '5 Green' },
    { id: '15', name: 'Samuel Gitau', grade: 'Grade 5', class: '5 Green' }
  ]
};

// API Service with pre-populated data
const apiService = {
  async fetchStudents(grade = null, classGroup = null) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let students = mockDatabase.stents;
      
      // Filter by grade if specified
      if (grade) {
        students = students.filter(student => student.grade === grade);
      }
      
      // Filter by class if specified
      if (classGroup) {
        students = students.filter(student => student.class === classGroup);
      }
      
      // Load existing attendance data from localStorage
      const savedAttendance = localStorage.getItem('attendance-data');
      const attendanceData = savedAttendance ? JSON.parse(savedAttendance) : {};
      
      // Merge student data with attendance records
      const studentsWithAttendance = students.map(student => ({
        ...student,
        attendance: attendanceData[student.id] || {}
      }));
      
      return studentsWithAttendance;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async updateAttendance(studentId, date, status) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Load existing attendance data
      const savedAttendance = localStorage.getItem('attendance-data');
      const attendanceData = savedAttendance ? JSON.parse(savedAttendance) : {};
      
      // Initialize student's attendance record if it doesn't exist
      if (!attendanceData[studentId]) {
        attendanceData[studentId] = {};
      }
      
      // Update attendance for the specific date
      attendanceData[studentId][date.toISOString()] = status;
      
      // Save back to localStorage
      localStorage.setItem('attendance-data', JSON.stringify(attendanceData));
      
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async bulkUpdateAttendance(studentIds, date, status) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const savedAttendance = localStorage.getItem('attendance-data');
      const attendanceData = savedAttendance ? JSON.parse(savedAttendance) : {};
      
      studentIds.forEach(studentId => {
        if (!attendanceData[studentId]) {
          attendanceData[studentId] = {};
        }
        attendanceData[studentId][date.toISOString()] = status;
      });
      
      localStorage.setItem('attendance-data', JSON.stringify(attendanceData));
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

function Attendance() {
  // State management
  const [students, setStudents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState('Grade 4');
  const [selectedClass, setSelectedClass] = useState('4 Blue');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [bulkAction, setBulkAction] = useState(null);

  // Available grades and classes
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  const classes = {
    'Grade 1': ['1 Red', '1 Blue', '1 Green'],
    'Grade 2': ['2 Red', '2 Blue', '2 Green'],
    'Grade 3': ['3 Red', '3 Blue', '3 Green'],
    'Grade 4': ['4 Red', '4 Blue', '4 Green'],
    'Grade 5': ['5 Red', '5 Blue', '5 Green'],
    'Grade 6': ['6 Red', '6 Blue', '6 Green']
  };

  // Date calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Load students when grade or class changes
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchStudents(selectedGrade, selectedClass);
        setStudents(data);
        setLoading(false);
        showSuccess(`Loaded ${data.length} students from ${selectedClass}`);
      } catch (err) {
        setError('Failed to load student data. Please try again later.');
        setLoading(false);
      }
    };
    loadStudents();
  }, [selectedGrade, selectedClass]);

  // Helper function to show success messages
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Attendance operations with default as "present"
  const markAttendance = async (studentId, date, status = 'present') => {
    try {
      await apiService.updateAttendance(studentId, date, status);
      setStudents(students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            attendance: {
              ...student.attendance,
              [date.toISOString()]: status
            }
          };
        }
        return student;
      }));
    } catch (err) {
      setError('Failed to update attendance. Please try again.');
    }
  };

  // Bulk mark attendance for all students
  const markAllForDate = async (date, status = 'present') => {
    try {
      const studentIds = students.map(student => student.id);
      await apiService.bulkUpdateAttendance(studentIds, date, status);
      
      // Update local state
      setStudents(students.map(student => ({
        ...student,
        attendance: {
          ...student.attendance,
          [date.toISOString()]: status
        }
      })));
      
      showSuccess(`Marked all students as ${status} for ${format(date, 'MMM dd')}`);
    } catch (err) {
      setError('Failed to update attendance for all students.');
    }
  };

  // Quick actions for today
  const markAllPresentToday = () => {
    markAllForDate(new Date(), 'present');
  };

  const markAllAbsentToday = () => {
    markAllForDate(new Date(), 'absent');
  };

  const getAttendanceStatus = (student, date) => {
    return student.attendance[date.toISOString()] || 'present'; // Default to present
  };

  // Statistics calculations
  const getAttendanceStats = () => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    
    const presentToday = students.filter(student => {
      const status = student.attendance[today.toISOString()];
      return status === 'present' || status === undefined; // Count undefined as present (default)
    }).length;

    const totalStudents = students.length;
    const attendanceRate = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;

    return {
      presentToday,
      totalStudents,
      attendanceRate
    };
  };

  const stats = getAttendanceStats();

  // Month navigation
  const changeMonth = (months) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + months);
    setCurrentMonth(newMonth);
  };

  // CSV export
  const getCSVData = () => {
    const headers = [
      { label: 'Student Name', key: 'name' },
      { label: 'Grade', key: 'grade' },
      { label: 'Class', key: 'class' },
      ...monthDays.map(day => ({
        label: format(day, 'MMM dd'),
        key: format(day, 'yyyy-MM-dd')
      }))
    ];

    const data = students.map(student => {
      const row = { 
        name: student.name,
        grade: student.grade,
        class: student.class
      };
      monthDays.forEach(day => {
        row[format(day, 'yyyy-MM-dd')] = getAttendanceStatus(student, day);
      });
      return row;
    });

    return { headers, data };
  };

  const { headers, data } = getCSVData();

  if (loading) {
    return (
      <div className="h-screen max-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Attendance</h1>
            <p className="text-gray-600 text-sm">Kenya CBC Teacher Portal</p>
          </div>
          
          {/* Class Selection */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {classes[selectedGrade]?.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>

            {/* Month Navigation */}
            <div className="flex items-center gap-2">
              <button 
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => changeMonth(-1)}
              >
                &lt;
              </button>
              <span className="px-3 py-2 font-semibold text-gray-800 min-w-[150px] text-center">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button 
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => changeMonth(1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {/* Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {successMessage}
            </div>
          )}

          {/* Quick Actions and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Today's Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.presentToday}/{stats.totalStudents}</p>
                  <p className="text-sm text-green-600">{stats.attendanceRate}% Attendance</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Group className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Quick Actions</p>
                  <p className="text-sm font-medium text-gray-900">Mark all for today</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={markAllPresentToday}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    title="Mark all present today"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={markAllAbsentToday}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Mark all absent today"
                  >
                    <Today className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Class Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Class</p>
                  <p className="text-lg font-bold text-gray-900">{selectedClass}</p>
                  <p className="text-sm text-gray-600">{selectedGrade}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Group className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <CSVLink 
                data={data} 
                headers={headers} 
                filename={`attendance-${selectedClass}-${format(currentMonth, 'yyyy-MM')}.csv`}
                className="flex items-center justify-between w-full h-full"
              >
                <div>
                  <p className="text-sm text-gray-600">Export Data</p>
                  <p className="text-lg font-bold text-gray-900">Download CSV</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileDownload className="w-6 h-6 text-purple-600" />
                </div>
              </CSVLink>
            </div>
          </div>

          {/* Attendance Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden flex flex-col h-[calc(100vh-300px)]">
            <div className="flex-shrink-0 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance for {selectedClass} - {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <p className="text-sm text-gray-600">
                Click on cells to toggle attendance status. Default is Present (Green)
              </p>
            </div>

            {students.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Group className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No students found for {selectedClass}</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div className="min-w-max">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="sticky left-0 bg-gray-50 z-20 p-3 text-left font-semibold text-gray-700 border-b border-gray-200 min-w-[200px]">
                          Student Name
                        </th>
                        {monthDays.map(day => {
                          const isToday = isSameDay(day, new Date());
                          const isWeekendDay = isWeekend(day);
                          
                          return (
                            <th 
                              key={day.toISOString()} 
                              className={`p-2 text-center font-semibold border-b border-gray-200 min-w-[70px] ${
                                isToday ? 'bg-blue-50' : isWeekendDay ? 'bg-gray-100' : 'bg-gray-50'
                              }`}
                            >
                              <div className="text-xs font-medium">{format(day, 'EEE')}</div>
                              <div className={`text-sm ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                                {format(day, 'dd')}
                              </div>
                              {isToday && (
                                <button
                                  onClick={() => markAllForDate(day, 'present')}
                                  className="text-xs text-green-600 hover:text-green-800 mt-1"
                                  title="Mark all present"
                                >
                                  All ✓
                                </button>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="sticky left-0 bg-white z-10 p-3 font-medium text-gray-900 border-b border-gray-200 min-w-[200px]">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center">
                                {index + 1}
                              </span>
                              {student.name}
                            </div>
                          </td>
                          {monthDays.map(day => {
                            const status = getAttendanceStatus(student, day);
                            const isToday = isSameDay(day, new Date());
                            const isWeekendDay = isWeekend(day);
                            
                            const statusStyles = {
                              present: 'bg-green-500 hover:bg-green-600 text-white',
                              late: 'bg-orange-500 hover:bg-orange-600 text-white',
                              absent: 'bg-red-500 hover:bg-red-600 text-white'
                            };

                            return (
                              <td 
                                key={day.toISOString()} 
                                className={`p-2 text-center border-b border-gray-200 cursor-pointer transition-all hover:scale-110 ${
                                  statusStyles[status]
                                } ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''} ${
                                  isWeekendDay ? 'opacity-75' : ''
                                }`}
                                onClick={() => {
                                  const newStatus = 
                                    status === 'present' ? 'late' :
                                    status === 'late' ? 'absent' : 'present';
                                  markAttendance(student.id, day, newStatus);
                                }}
                                title={`Click to change from ${status} to ${
                                  status === 'present' ? 'late' : 
                                  status === 'late' ? 'absent' : 'present'
                                }`}
                              >
                                <div className="w-6 h-6 flex items-center justify-center mx-auto text-xs font-bold">
                                  {status.charAt(0).toUpperCase()}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;