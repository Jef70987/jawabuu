import React, { useState } from "react";


const Report = () => {
  // State for income statements
  const [incomeData] = useState([
    { category: "Fees", amount: 50000 },
    { category: "Donations", amount: 10000 },
    { category: "Other", amount: 5000 },
  ]);

  // State for expense statements
  const [expenseData] = useState([
    { department: "Administration", amount: 20000, period: "Jan 2023" },
    { department: "Academics", amount: 15000, period: "Jan 2023" },
    { department: "Maintenance", amount: 10000, period: "Jan 2023" },
  ]);

  // State for budget tracking
  const [budgetData] = useState([
    { category: "Salaries", budget: 30000, actual: 28000 },
    { category: "Utilities", budget: 5000, actual: 4500 },
    { category: "Supplies", budget: 10000, actual: 9500 },
  ]);

  return (
    <div className="container">
      <h1 className="header">Financial Reporting System</h1>

      {/* Income Statements Section */}
      <div className="card">
        <h2>Income Statements</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((income, index) => (
              <tr key={index}>
                <td>{income.category}</td>
                <td>${income.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expense Statements Section */}
      <div className="card">
        <h2>Expense Statements</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Amount</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense, index) => (
              <tr key={index}>
                <td>{expense.department}</td>
                <td>${expense.amount}</td>
                <td>{expense.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget Tracking Section */}
      <div className="card">
        <h2>Budget Tracking</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Actual</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((budget, index) => (
              <tr key={index}>
                <td>{budget.category}</td>
                <td>${budget.budget}</td>
                <td>${budget.actual}</td>
                <td>${budget.budget - budget.actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;