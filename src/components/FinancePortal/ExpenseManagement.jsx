import React, { useState } from "react";
// Import the CSS file

const ExpenseManagement = () => {
  // State for expenses
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  // State for recurring expenses
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [recurringName, setRecurringName] = useState("");
  const [recurringAmount, setRecurringAmount] = useState("");
  const [recurringCategory, setRecurringCategory] = useState("");

  // State for expense reports
  const [reportCategory, setReportCategory] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [reportDepartment, setReportDepartment] = useState("");
  const [generatedReport, setGeneratedReport] = useState([]);

  // Add a new expense
  const addExpense = () => {
    if (expenseName && expenseAmount && expenseCategory && expenseDate) {
      const newExpense = {
        id: Date.now(),
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        date: expenseDate,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setExpenseAmount("");
      setExpenseCategory("");
      setExpenseDate("");
    }
  };

  // Add a recurring expense
  const addRecurringExpense = () => {
    if (recurringName && recurringAmount && recurringCategory) {
      const newRecurring = {
        id: Date.now(),
        name: recurringName,
        amount: parseFloat(recurringAmount),
        category: recurringCategory,
      };
      setRecurringExpenses([...recurringExpenses, newRecurring]);
      setRecurringName("");
      setRecurringAmount("");
      setRecurringCategory("");
    }
  };

  // Generate expense report
  const generateReport = () => {
    let filteredExpenses = expenses;

    if (reportCategory) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === reportCategory);
    }

    if (reportDate) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.date === reportDate);
    }

    if (reportDepartment) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.department === reportDepartment);
    }

    setGeneratedReport(filteredExpenses);
  };

  return (
    <div className="container">
      <h1 className="header">Financial Expense Management System</h1>

      {/* Record Expenses Section */}
      <div className="card">
        <h2>Record Expenses</h2>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="input"
        />
        <select
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
          className="input"
        >
          <option value="">Select Category</option>
          <option value="Utilities">Utilities</option>
          <option value="Suppliers">Suppliers</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          className="input"
        />
        <button onClick={addExpense} className="button">
          Add Expense
        </button>
        <ul className="list">
          {expenses.map((expense) => (
            <li key={expense.id} className="list-item">
              {expense.name} - ${expense.amount} ({expense.category}) on {expense.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Recurring Expenses Section */}
      <div className="card">
        <h2>Recurring Expenses</h2>
        <input
          type="text"
          placeholder="Expense Name"
          value={recurringName}
          onChange={(e) => setRecurringName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={recurringAmount}
          onChange={(e) => setRecurringAmount(e.target.value)}
          className="input"
        />
        <select
          value={recurringCategory}
          onChange={(e) => setRecurringCategory(e.target.value)}
          className="input"
        >
          <option value="">Select Category</option>
          <option value="Salaries">Salaries</option>
          <option value="Rent">Rent</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={addRecurringExpense} className="button">
          Add Recurring Expense
        </button>
        <ul className="list">
          {recurringExpenses.map((expense) => (
            <li key={expense.id} className="list-item">
              {expense.name} - ${expense.amount} ({expense.category})
            </li>
          ))}
        </ul>
      </div>

      {/* Expense Reports Section */}
      <div className="card">
        <h2>Generate Expense Report</h2>
        <select
          value={reportCategory}
          onChange={(e) => setReportCategory(e.target.value)}
          className="input"
        >
          <option value="">Select Category</option>
          <option value="Utilities">Utilities</option>
          <option value="Suppliers">Suppliers</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Salaries">Salaries</option>
          <option value="Rent">Rent</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Department"
          value={reportDepartment}
          onChange={(e) => setReportDepartment(e.target.value)}
          className="input"
        />
        <button onClick={generateReport} className="button">
          Generate Report
        </button>
        <ul className="list">
          {generatedReport.map((expense) => (
            <li key={expense.id} className="list-item">
              {expense.name} - ${expense.amount} ({expense.category}) on {expense.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseManagement;