import React, { useState } from "react";
import { CSVLink } from "react-csv"; // For exporting data to CSV
// Import your CSS file

const Reports= () => {
  // Sample data for students and their grades
  // eslint-disable-next-line no-unused-vars
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", class: "Grade 10", math: 85, science: 90, english: 78 },
    { id: 2, name: "Jane Smith", class: "Grade 10", math: 92, science: 88, english: 85 },
    { id: 3, name: "Alice Johnson", class: "Grade 10", math: 78, science: 82, english: 90 },
  ]);

  // State to store filtered reports
  const [reports, setReports] = useState([]);

  // Function to generate reports for a specific class
  const generateReports = (className) => {
    const filteredReports = students.filter((student) => student.class === className);
    setReports(filteredReports);
  };

  // Function to export data for analytics
  const exportData = () => {
    return students.map((student) => ({
      Name: student.name,
      Class: student.class,
      Math: student.math,
      Science: student.science,
      English: student.english,
    }));
  };

  return (
    <div className="app">
      <h1>Teacher Report Portal</h1>

      {/* Report Generation Section */}
      <div className="section">
        <h2>Generate Reports</h2>
        <button onClick={() => generateReports("Grade 10")}>Generate Grade 10 Reports</button>
        <button onClick={() => generateReports("Grade 11")}>Generate Grade 11 Reports</button>

        {/* Display Reports */}
        {reports.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Math</th>
                <th>Science</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.math}</td>
                  <td>{student.science}</td>
                  <td>{student.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reports generated yet. Select a class to generate reports.</p>
        )}
      </div>

      {/* Data Export Section */}
      <div className="section">
        <h2>Export Data for Analytics</h2>
        <CSVLink data={exportData()} filename={"student-data.csv"}>
          <button>Export Data as CSV</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default  Reports;