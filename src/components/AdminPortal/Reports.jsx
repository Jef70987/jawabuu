import React, { useState } from "react";


const Reports = () => {
  const [reportType, setReportType] = useState("academic");
  const [academicData] = useState([
    { student: "John Doe", grade: "A", subject: "Math" },
    { student: "Jane Smith", grade: "B", subject: "Science" },
    { student: "Alice Johnson", grade: "C", subject: "History" },
  ]);
  const [financialData] = useState([
    { student: "John Doe", feePaid: 500, balance: 200 },
    { student: "Jane Smith", feePaid: 600, balance: 100 },
    { student: "Alice Johnson", feePaid: 400, balance: 300 },
  ]);
  const [attendanceData] = useState([
    { student: "John Doe", present: 20, absent: 2 },
    { student: "Jane Smith", present: 18, absent: 4 },
    { student: "Alice Johnson", present: 19, absent: 3 },
  ]);

  // Export report as CSV
  const exportReport = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get report data based on type
  const getReportData = () => {
    switch (reportType) {
      case "academic":
        return academicData;
      case "financial":
        return financialData;
      case "attendance":
        return attendanceData;
      default:
        return [];
    }
  };

  return (
    <div className="container">
      <h1>Report Generation</h1>

      {/* Report Type Selection */}
      <div className="section">
        <h2>Select Report Type</h2>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="input"
        >
          <option value="academic">Academic Report</option>
          <option value="financial">Financial Report</option>
          <option value="attendance">Attendance Report</option>
        </select>
      </div>

      {/* Report Table */}
      <div className="section">
        <h2>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              {Object.keys(getReportData()[0] || {}).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getReportData().map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="section">
        <button
          onClick={() => exportReport(getReportData(), `${reportType}_report`)}
          className="button"
        >
          Export Report as CSV
        </button>
      </div>
    </div>
  );
};

export default Reports;