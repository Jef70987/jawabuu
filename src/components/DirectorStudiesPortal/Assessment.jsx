import React, { useState } from 'react';

function Assessment() {
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Teacher Dashboard</h1>

      {/* Create and Manage Assignments Section */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Create and Manage Assignments</h2>
        <form onSubmit={addAssignment}>
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Create Assignment
          </button>
        </form>

        <h3>Assignments List</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {assignments.map((assignment) => (
            <li key={assignment.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
              <strong>{assignment.title}</strong>
              <p>{assignment.description}</p>
              <p>Deadline: {assignment.deadline}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Review and Provide Feedback Section */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Review and Provide Feedback</h2>
        <form onSubmit={addSubmission}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input
            type="text"
            placeholder="Assignment ID"
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Submission
          </button>
        </form>

        <h3>Submissions List</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {submissions.map((submission) => (
            <li key={submission.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
              <strong>{submission.studentName}</strong>
              <p>Assignment ID: {submission.assignmentId}</p>
              <p>File: {submission.file.name}</p>
              <input
                type="text"
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button
                onClick={() => provideFeedback(submission.id)}
                style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Submit Feedback
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manage Student Grades Section */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Manage Student Grades</h2>
        <form onSubmit={addGrade}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <select
            value={assignmentGradeId}
            onChange={(e) => setAssignmentGradeId(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          >
            <option value="">Select Assignment</option>
            {assignments.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Grade"
            value={studentGrade}
            onChange={(e) => setStudentGrade(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Grade
          </button>
        </form>

        <h3>Grades List</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {grades.map((grade, index) => (
            <li key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
              <strong>
                {students.find((s) => s.id === grade.studentId)?.name}
              </strong>
              <p>
                Assignment:{' '}
                {assignments.find((a) => a.id === grade.assignmentId)?.title}
              </p>
              <p>Grade: {grade.grade}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance Analytics Section */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Performance Analytics</h2>
        <h3>Class Performance</h3>
        <p>Average Grade: {calculateClassPerformance()}</p>

        <h3>Individual Student Performance</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {students.map((student) => (
            <li key={student.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
              <strong>{student.name}</strong>
              <p>Average Grade: {calculateStudentPerformance(student.id)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default  Assessment;