import React, { useState } from "react";
// Import the CSS file

const PayrollManagement = () => {
  // State for staff salaries
  const [staffSalaries, setStaffSalaries] = useState([]);
  const [staffName, setStaffName] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [contractType, setContractType] = useState("");
  const [attendance, setAttendance] = useState("");

  // State for deductions and benefits
  const [deductions, setDeductions] = useState([]);
  const [deductionName, setDeductionName] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [benefitName, setBenefitName] = useState("");
  const [benefitAmount, setBenefitAmount] = useState("");

  // State for salary reports
  const [generatedReport, setGeneratedReport] = useState([]);

  // Add a new staff salary
  const addStaffSalary = () => {
    if (staffName && salaryAmount && contractType && attendance) {
      const newSalary = {
        id: Date.now(),
        name: staffName,
        amount: parseFloat(salaryAmount),
        contractType,
        attendance: parseFloat(attendance),
      };
      setStaffSalaries([...staffSalaries, newSalary]);
      setStaffName("");
      setSalaryAmount("");
      setContractType("");
      setAttendance("");
    }
  };

  // Add a deduction
  const addDeduction = () => {
    if (deductionName && deductionAmount) {
      const newDeduction = {
        id: Date.now(),
        name: deductionName,
        amount: parseFloat(deductionAmount),
      };
      setDeductions([...deductions, newDeduction]);
      setDeductionName("");
      setDeductionAmount("");
    }
  };

  // Add a benefit
  const addBenefit = () => {
    if (benefitName && benefitAmount) {
      const newBenefit = {
        id: Date.now(),
        name: benefitName,
        amount: parseFloat(benefitAmount),
      };
      setDeductions([...deductions, newBenefit]);
      setBenefitName("");
      setBenefitAmount("");
    }
  };

  // Generate salary report
  const generateSalaryReport = () => {
    const report = staffSalaries.map((salary) => {
      const totalDeductions = deductions
        .filter((deduction) => deduction.name.includes("Tax") || deduction.name.includes("Pension"))
        .reduce((sum, deduction) => sum + deduction.amount, 0);

      const totalBenefits = deductions
        .filter((deduction) => deduction.name.includes("Benefit"))
        .reduce((sum, deduction) => sum + deduction.amount, 0);

      const netSalary = salary.amount - totalDeductions + totalBenefits;

      return {
        ...salary,
        totalDeductions,
        totalBenefits,
        netSalary,
      };
    });

    setGeneratedReport(report);
  };

  return (
    <div className="container">
      <h1 className="header">Staff Salaries Management System</h1>

      {/* Staff Salaries Section */}
      <div className="card">
        <h2>Manage Staff Salaries</h2>
        <input
          type="text"
          placeholder="Staff Name"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Salary Amount"
          value={salaryAmount}
          onChange={(e) => setSalaryAmount(e.target.value)}
          className="input"
        />
        <select
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          className="input"
        >
          <option value="">Select Contract Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          type="number"
          placeholder="Attendance (%)"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          className="input"
        />
        <button onClick={addStaffSalary} className="button">
          Add Salary
        </button>
        <ul className="list">
          {staffSalaries.map((salary) => (
            <li key={salary.id} className="list-item">
              {salary.name} - ${salary.amount} ({salary.contractType}, Attendance: {salary.attendance}%)
            </li>
          ))}
        </ul>
      </div>

      {/* Deductions and Benefits Section */}
      <div className="card">
        <h2>Deductions and Benefits</h2>
        <input
          type="text"
          placeholder="Deduction Name (e.g., Tax, Pension)"
          value={deductionName}
          onChange={(e) => setDeductionName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Deduction Amount"
          value={deductionAmount}
          onChange={(e) => setDeductionAmount(e.target.value)}
          className="input"
        />
        <button onClick={addDeduction} className="button">
          Add Deduction
        </button>
        <input
          type="text"
          placeholder="Benefit Name (e.g., Allowance, Bonus)"
          value={benefitName}
          onChange={(e) => setBenefitName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Benefit Amount"
          value={benefitAmount}
          onChange={(e) => setBenefitAmount(e.target.value)}
          className="input"
        />
        <button onClick={addBenefit} className="button">
          Add Benefit
        </button>
        <ul className="list">
          {deductions.map((deduction) => (
            <li key={deduction.id} className="list-item">
              {deduction.name} - ${deduction.amount}
            </li>
          ))}
        </ul>
      </div>

      {/* Salary Reports Section */}
      <div className="card">
        <h2>Generate Salary Report</h2>
        <button onClick={generateSalaryReport} className="button">
          Generate Report
        </button>
        <ul className="list">
          {generatedReport.map((report) => (
            <li key={report.id} className="list-item">
              {report.name} - Gross: ${report.amount}, Deductions: ${report.totalDeductions}, Benefits: ${report.totalBenefits}, Net: ${report.netSalary}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PayrollManagement;