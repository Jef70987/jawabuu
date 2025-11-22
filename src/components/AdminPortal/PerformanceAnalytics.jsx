import React, { useState } from "react";


const PerformanceAnalytics = () => {
  // Sample data for performance trends
  const [performanceTrends] = useState([
    { year: "2020", averageScore: 75, passRate: 85 },
    { year: "2021", averageScore: 78, passRate: 88 },
    { year: "2022", averageScore: 80, passRate: 90 },
    { year: "2023", averageScore: 82, passRate: 92 },
  ]);

  // Sample data for predictive analytics
  const [predictiveData] = useState({
    students: [
      { name: "John Doe", predictedScore: 85, improvementAreas: ["Math", "Science"] },
      { name: "Jane Smith", predictedScore: 90, improvementAreas: ["English"] },
      { name: "Alice Johnson", predictedScore: 78, improvementAreas: ["History", "Math"] },
    ],
    staff: [
      { name: "Mr. Brown", predictedPerformance: "High", areas: ["Teaching", "Mentorship"] },
      { name: "Ms. Green", predictedPerformance: "Medium", areas: ["Administration"] },
      { name: "Mr. White", predictedPerformance: "Low", areas: ["Engagement"] },
    ],
  });

  return (
    <div className="container">
      <h1>School Performance and Predictive Analytics</h1>

      {/* Performance Trends Section */}
      <div className="section">
        <h2>School Performance Trends</h2>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Average Score</th>
              <th>Pass Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {performanceTrends.map((trend, index) => (
              <tr key={index}>
                <td>{trend.year}</td>
                <td>{trend.averageScore}</td>
                <td>{trend.passRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Predictive Analytics Section */}
      <div className="section">
        <h2>Predictive Analytics</h2>

        {/* Students Predictive Analytics */}
        <div className="subsection">
          <h3>Students</h3>
          <table className="predictive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Predicted Score</th>
                <th>Improvement Areas</th>
              </tr>
            </thead>
            <tbody>
              {predictiveData.students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.predictedScore}</td>
                  <td>{student.improvementAreas.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Staff Predictive Analytics */}
        <div className="subsection">
          <h3>Staff</h3>
          <table className="predictive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Predicted Performance</th>
                <th>Areas</th>
              </tr>
            </thead>
            <tbody>
              {predictiveData.staff.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.name}</td>
                  <td>{staff.predictedPerformance}</td>
                  <td>{staff.areas.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;