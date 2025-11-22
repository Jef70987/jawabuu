import React, { useState , Navbar} from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';


const Student = () => {


const [studentId, setStudentId] = useState('');
const [year, setYear] = useState('');
const [className, setClassName] = useState('');
const [grades, setGrades] = useState([]);
const [assessments, setAssessments] = useState([]);
const [progressReport, setProgressReport] = useState([]);
const [subjects, setSubjects] = useState([]);
const [prediction, setPrediction] = useState('');
const [error, setError] = useState('');

// Validate Student ID (only numbers)
  const validateStudentId = (value) => {
    if (/^\d*$/.test(value)) {
      setStudentId(value);
      setError('');
    } else {
      setError('Student ID must contain only numbers.');
    }
  };

  // Validate Year (exactly 4 digits)
  const validateYear = (value) => {
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
      setError('');
    } else {
      setError('Year must be exactly 4 digits.');
    }
  };

  // Validate Class (alphanumeric)
  const validateClassName = (value) => {
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setClassName(value);
      setError('');
    } else {
      setError('Class must contain only letters and numbers.');
    }
  };

  const fetchGrades = async () => {
    if (!studentId || !year || !className) {
      setError('Please fill in all fields.');
      return;
    }
    if (year.length !== 4) {
      setError('Year must be exactly 4 digits.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/grades/${studentId}`, {
        params: { year, class: className },
      });
      setGrades(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching grades:', error);
      setError('Failed to fetch grades. Please try again.');
    }
  };

  const fetchAssessments = async () => {
    if (!studentId || !year || !className) {
      setError('Please fill in all fields.');
      return;
    }
    if (year.length !== 4) {
      setError('Year must be exactly 4 digits.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/assessments/${studentId}`, {
        params: { year, class: className },
      });
      setAssessments(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching assessments:', error);
      setError('Failed to fetch assessments. Please try again.');
    }
  };

  const fetchProgressReport = async () => {
    if (!studentId) {
      setError('Please enter a Student ID.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/progress-report/${studentId}`);
      setProgressReport(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching progress report:', error);
      setError('Failed to fetch progress report. Please try again.');
    }
  };

  const fetchSubjects = async () => {
    if (!studentId) {
      setError('Please enter a Student ID.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/subjects/${studentId}`);
      setSubjects(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to fetch subjects. Please try again.');
    }
  };

  const fetchPerformancePrediction = async () => {
    if (!studentId) {
      setError('Please enter a Student ID.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/performance-prediction/${studentId}`);
      setPrediction(response.data.prediction);
      setError('');
    } catch (error) {
      console.error('Error fetching performance prediction:', error);
      setError('Failed to fetch performance prediction. Please try again.');
    }
  };

return (
  <div className="App">
    <div className="input-container">
      <div>
        <label>Student ID: </label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => validateStudentId(e.target.value)}
          placeholder="Enter Student ID"
        />
      </div>
      <div>
        <label>Year: </label>
        <input
          type="text"
          value={year}
          onChange={(e) => validateYear(e.target.value)}
          placeholder="Enter Year (4 digits)"
          maxLength={4}
        />
      </div>
      <div>
        <label>Class: </label>
        <input
          type="text"
          value={className}
          onChange={(e) => validateClassName(e.target.value)}
          placeholder="Enter Class"
        />
      </div>
    </div>
    {error && <p className="error">{error}</p>}
    <div className="input-container">
      <button onClick={fetchGrades}>Fetch Grades</button>
      <button onClick={fetchAssessments}>Fetch Assessments</button>
      <button onClick={fetchProgressReport}>Generate Progress Report</button>
      <button onClick={fetchSubjects}>View Subjects</button>
      <button onClick={fetchPerformancePrediction}>Performance Prediction</button>
    </div>

    <h2>Grades</h2>
    <ul>
      {grades.map((grade, index) => (
        <li key={index}>{grade.subject}: {grade.grade}</li>
      ))}
    </ul>

    <h2>Assessments</h2>
    <ul>
      {assessments.map((assessment, index) => (
        <li key={index}>{assessment.subject}: {assessment.assessment}</li>
      ))}
    </ul>

    <h2>Progress Report</h2>
    <ul className="progress-report">
      {progressReport.map((report, index) => (
        <li key={index}>{report.year} - {report.class} - {report.subject}: {report.grade}</li>
      ))}
    </ul>

    <h2>Subjects</h2>
    <ul>
      {subjects.map((subject, index) => (
        <li key={index}>{subject.subject_name}</li>
      ))}
    </ul>

    <h2>Performance Prediction</h2>
    <div className="prediction">{prediction}</div>
  </div>
  
);
};

export default Student ;