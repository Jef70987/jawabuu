import React, { useState } from "react";


const AttendanceResults = () => {
  // Mock data for attendance and classes/departments
  const [attendanceData, setAttendanceData] = useState({
    totalStudents: 500,
    presentToday: 450,
    absentToday: 50,
  });

  const [classes, setClasses] = useState([
    { id: 1, name: "Class 10A", attendance: 95 },
    { id: 2, name: "Class 10B", attendance: 90 },
    { id: 3, name: "Class 11A", attendance: 85 },
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, name: "Science", attendance: 92 },
    { id: 2, name: "Arts", attendance: 88 },
    { id: 3, name: "Commerce", attendance: 85 },
  ]);

  const [selectedReportType, setSelectedReportType] = useState("class");
  const [reportData, setReportData] = useState([]);

  // Function to generate reports
  const generateReport = () => {
    if (selectedReportType === "class") {
      setReportData(classes);
    } else if (selectedReportType === "department") {
      setReportData(departments);
    }
  };

  return (
    <div className="dashboard">
      <h1>School Admin Dashboard</h1>

      {/* Section 1: Overall Attendance Monitoring */}
      <section  className="section">
        <h2>Overall School Attendance</h2>
        <div className="attendance-container">
          <p>Total Students: {attendanceData.totalStudents}</p>
          <p>Present Today: {attendanceData.presentToday}</p>
          <p>Absent Today: {attendanceData.absentToday}</p>
        </div>
      </section>

      {/* Section 2: Generate Reports */}
      <section className="section">
        <h2>Generate Reports</h2>
        <div className="report-controls">
          <label>
            Report Type:
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
            >
              <option value="class">By Class</option>
              <option value="department">By Department</option>
            </select>
          </label>
          <button onClick={generateReport}>Generate Report</button>
        </div>

        {/* Display Report Data */}
        {reportData.length > 0 && (
          <div className="report-table">
            <h3>Report: {selectedReportType.toUpperCase()}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Attendance (%)</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AttendanceResults; // Fixed: Exporting the correct component name