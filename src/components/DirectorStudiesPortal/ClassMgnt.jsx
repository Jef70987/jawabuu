import React, { useState } from 'react';


// ClassList Component
const ClassMgnt = ({ classes }) => {
  return (
    <ul>
      {classes.map((cls, index) => (
        <li key={index}>{cls}</li>
      ))}
    </ul>
  );
};

// SubjectList Component
const SubjectList = ({ subjects }) => {
  return (
    <ul>
      {subjects.map((subject, index) => (
        <li key={index}>{subject}</li>
      ))}
    </ul>
  );
};

// TeacherRoster Component
const TeacherRoster = ({ roster }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {roster.map((teacher, index) => (
          <tr key={index}>
            <td>{teacher.name}</td>
            <td>{teacher.subject}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// AttendanceTracker Component
const AttendanceTracker = ({ classes, students }) => {
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [report, setReport] = useState(null);

  // Handle marking attendance
  const handleMarkAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Handle class selection
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setAttendance({}); // Reset attendance when class changes
  };

  // Generate attendance report
  const generateReport = () => {
    const reportData = students
      .filter((student) => student.class === selectedClass)
      .map((student) => ({
        name: student.name,
        status: attendance[student.id] || 'Absent',
      }));
    setReport(reportData);
  };

  return (
    <div>
      <h2>Attendance Tracker</h2>
      <div>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div>
          <h3>Mark Attendance for {selectedClass}</h3>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student) => student.class === selectedClass)
                .map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'Present')}
                        style={{
                          backgroundColor: attendance[student.id] === 'Present' ? 'green' : 'white',
                          color: attendance[student.id] === 'Present' ? 'white' : 'black',
                        }}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'Absent')}
                        style={{
                          backgroundColor: attendance[student.id] === 'Absent' ? 'red' : 'white',
                          color: attendance[student.id] === 'Absent' ? 'white' : 'black',
                        }}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button onClick={generateReport}>Generate Attendance Report</button>
        </div>
      )}

      {report && (
        <div>
          <h3>Attendance Report for {selectedClass}</h3>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {report.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Main TeacherDashboard Component
const TeacherDashboard = () => {
  // Sample data
  const assignedClasses = ['Class 10A', 'Class 9B', 'Class 8C'];
  const assignedSubjects = ['Mathematics', 'Physics', 'Chemistry'];
  const teacherRoster = [
    { name: 'John Doe', subject: 'Mathematics' },
    { name: 'Jane Smith', subject: 'Physics' },
    { name: 'Alice Johnson', subject: 'Chemistry' },
  ];
  const students = [
    { id: 1, name: 'Student 1', class: 'Class 10A' },
    { id: 2, name: 'Student 2', class: 'Class 10A' },
    { id: 3, name: 'Student 3', class: 'Class 9B' },
    { id: 4, name: 'Student 4', class: 'Class 9B' },
    { id: 5, name: 'Student 5', class: 'Class 8C' },
    { id: 6, name: 'Student 6', class: 'Class 8C' },
  ];

  return (
    <div className="dashboard">
      <h1>Teacher Dashboard</h1>
      <div>
        <h2>Assigned Classes</h2>
        <ClassList classes={assignedClasses} />
      </div>
      <div>
        <h2>Assigned Subjects</h2>
        <SubjectList subjects={assignedSubjects} />
      </div>
      <div>
        <h2>Teacher Roster</h2>
        <TeacherRoster roster={teacherRoster} />
      </div>
      <div>
        <AttendanceTracker classes={assignedClasses} students={students} />
      </div>
    </div>
  );
};

export default ClassMgnt;