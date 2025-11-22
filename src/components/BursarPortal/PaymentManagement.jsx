// src/App.js
import React, { useState } from 'react';

const Payment = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('MPESA');
  const [reference, setReference] = useState('');
  const [recentPayments, setRecentPayments] = useState([
    { id: 'STD2023001', name: 'John Doe', amount: 5000, date: 'May 15, 2023', method: 'MPESA' },
    { id: 'STD2023002', name: 'Jane Smith', amount: 7500, date: 'May 14, 2023', method: 'Cash' }
  ]);

  // Sample student data
  const demoStudents = {
    'STD2023001': { name: 'John Doe', balance: 25000 },
    'STD2023002': { name: 'Jane Smith', balance: 15000 },
    'STD2023003': { name: 'Michael Brown', balance: 35000 }
  };

  const checkStudentBalance = () => {
    if (!admissionNumber) {
      alert("Please enter admission number");
      return;
    }

    const foundStudent = demoStudents[admissionNumber];
    
    if (foundStudent) {
      const proceed = window.confirm(
        `Student: ${foundStudent.name}\nOutstanding Balance: KSh ${foundStudent.balance}\n\nDo you want to proceed with payment?`
      );
      
      if (proceed) {
        setStudent(foundStudent);
      }
    } else {
      alert("Student not found! Please check admission number");
    }
  };

  const processPayment = () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert("Please enter valid amount");
      return;
    }

    if (paymentAmount > student.balance) {
      alert("Payment amount cannot exceed student balance");
      return;
    }

    if (window.confirm(`Confirm payment of KSh ${paymentAmount} via ${paymentMethod}?`)) {
      // In a real app, you would send this data to your backend
      const newPayment = {
        id: admissionNumber,
        name: student.name,
        amount: parseInt(paymentAmount),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        method: paymentMethod
      };
      
      setRecentPayments([newPayment, ...recentPayments]);
      alert(`Payment of KSh ${paymentAmount} processed successfully!\nReceipt will be printed.`);
      
      // Reset form
      setPaymentAmount('');
      setReference('');
      setStudent(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px',width:'1000px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#2c3e50' ,textAlign:'center',justifyContent:'center'}}>Student Fee Payment</h2>
          
          {/* Student Lookup */}
          <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Find Student</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" 
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                placeholder="Enter Admission Number" 
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}
              />
              <button 
                onClick={checkStudentBalance}
                style={{ padding: '8px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Check Balance
              </button>
            </div>
          </div>

          {/* Payment Section */}
          {student && (
            <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Payment Details</h3>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                <p><strong>Student:</strong> {student.name}</p>
                <p><strong>Admission No:</strong> {admissionNumber}</p>
                <p><strong>Balance:</strong> KSh {student.balance}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount (KSh)</label>
                <input 
                  type="number" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  min="1"
                  max={student.balance}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="MPESA">MPESA</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Reference (Optional)</label>
                <input 
                  type="text" 
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <button 
                onClick={processPayment}
                style={{ padding: '10px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Process Payment
              </button>
            </div>
          )}

          {/* Recent Payments */}
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Recent Payments</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#34495e', color: 'blue' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Admission No</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Method</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{payment.id}</td>
                    <td style={{ padding: '10px' }}>{payment.name}</td>
                    <td style={{ padding: '10px', color: 'green' }}>KSh {payment.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>{payment.date}</td>
                    <td style={{ padding: '10px' }}>{payment.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;