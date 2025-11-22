import React, { useState } from 'react';

const PaymentRecords = () => {
  // Sample payment data - in a real app this would come from your backend
  const [payments, setPayments] = useState([
    { id: 1, studentId: 'STD2023001', name: 'John Doe', amount: 5000, date: '2023-05-15', method: 'MPESA' },
    { id: 2, studentId: 'STD2023002', name: 'Jane Smith', amount: 7500, date: '2023-05-14', method: 'Cash' },
    { id: 3, studentId: 'STD2023003', name: 'Michael Brown', amount: 10000, date: '2023-05-13', method: 'Bank Transfer' }
  ]);

  // Function to add a new payment (call this after successful payment)
  // eslint-disable-next-line no-unused-vars
  const addPayment = (newPayment) => {
    setPayments([newPayment, ...payments]);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      Width: '1000px',
      margin: '0 auto',
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px',justifyContent:'center',textAlign:'center' }}>Payment Records</h2>
      
      {/* Payments Table */}
      <div style={{ 
        backgroundColor: 'white',
        width: '1000px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        overflowX: 'auto',
        height:'100vh',
        
      }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#34495e',
              color: 'blue'
            }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Student ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} style={{ 
                borderBottom: '1px solid #eee',
                ':hover': { backgroundColor: '#f9f9f9' }
              }}>
                <td style={{ padding: '12px' }}>{payment.studentId}</td>
                <td style={{ padding: '12px' }}>{payment.name}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>
                  KSh {payment.amount.toLocaleString()}
                </td>
                <td style={{ padding: '12px' }}>{formatDate(payment.date)}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 
                      payment.method === 'MPESA' ? '#e8f5e9' :
                      payment.method === 'Cash' ? '#e3f2fd' :
                      '#f3e5f5',
                    color: '#333'
                  }}>
                    {payment.method}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRecords;