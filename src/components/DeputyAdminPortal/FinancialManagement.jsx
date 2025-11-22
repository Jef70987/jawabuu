import React, { useState } from "react";


const FinancialManagement = () => {
  const [payments, setPayments] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("school_fees");
  const [reportData, setReportData] = useState([]);

  // Add a new payment
  const addPayment = () => {
    if (studentName && amount) {
      const newPayment = {
        id: Date.now(),
        studentName,
        amount: parseFloat(amount),
        paymentType,
        date: new Date().toLocaleDateString(),
      };
      setPayments([...payments, newPayment]);
      setStudentName("");
      setAmount("");
    }
  };

  // Generate report
  const generateReport = () => {
    setReportData(payments);
  };

  return (
    <div className="container">
      <h1>School Payment Tracker</h1>

      {/* Payment Form */}
      <div className="form">
        <h2>Add Payment</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="input"
        >
          <option value="school_fees">School Fees</option>
          <option value="uniform">Uniform</option>
          <option value="books">Books</option>
          <option value="other">Other</option>
        </select>
        <button onClick={addPayment} className="button">
          Add Payment
        </button>
      </div>

      {/* Payments List */}
      <div className="payments">
        <h2>Payments</h2>
        <ul>
          {payments.map((payment) => (
            <li key={payment.id} className="listItem">
              <strong>{payment.studentName}</strong> - ${payment.amount} (
              {payment.paymentType}) - {payment.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Report Section */}
      <div className="report">
        <h2>Generate Report</h2>
        <button onClick={generateReport} className="button">
          Generate Report
        </button>
        {reportData.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.studentName}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paymentType}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FinancialManagement ;