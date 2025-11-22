import React, { useState, useEffect } from 'react';

const FeeStructure = () => {
  // Sample fee structure data - in real app this would come from API
  // eslint-disable-next-line no-unused-vars
  const [feeStructure, setFeeStructure] = useState([
    { id: 1, grade: 'Grade 1', tuition: 15000, activity: 2000, library: 1000, total: 18000 },
    { id: 2, grade: 'Grade 2', tuition: 16000, activity: 2500, library: 1000, total: 19500 },
    { id: 3, grade: 'Grade 3', tuition: 17000, activity: 3000, library: 1500, total: 21500 },
    { id: 4, grade: 'Grade 4', tuition: 18000, activity: 3500, library: 1500, total: 23000 },
  ]);

  const [activeTerm, setActiveTerm] = useState('Term 1 2023');

  // fetch from API
  useEffect(() => {
    // fetchFeeStructure().then(data => setFeeStructure(data));
  }, [activeTerm]);

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{ color: '#2c3e50', margin: 0,textAlign:'center',justifyContent:'center' }}>Fee Structure</h2>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        width:'1000px'
      }}>
        <select
          value={activeTerm}
          onChange={(e) => setActiveTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            textAlign:'center',
            justifyContent:'center'
          }}
        >
          <option>Term 1 2025</option>
          <option>Term 2 2025</option>
          <option>Term 3 2025</option>
        </select>
      </div>

      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '15px'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#34495e',
              color: 'blue'
            }}>
              <th style={{ padding: '15px', textAlign: 'left', minWidth: '120px' }}>Grade</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Tuition Fee</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Activity Fee</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Library Fee</th>
              <th style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {feeStructure.map((fee) => (
              <tr key={fee.id} style={{ 
                borderBottom: '1px solid #eee',
                ':hover': { backgroundColor: '#f8f9fa' }
              }}>
                <td style={{ padding: '15px', fontWeight: '600' }}>{fee.grade}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>KSh {fee.tuition.toLocaleString()}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>KSh {fee.activity.toLocaleString()}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>KSh {fee.library.toLocaleString()}</td>
                <td style={{ 
                  padding: '15px', 
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  KSh {fee.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ 
        marginTop: '100px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        borderLeft: '4px solid #3498db'
      }}>
        <p style={{ margin: 0, color: '#7f8c8d' }}>
          <strong>Note:</strong> This fee structure was last updated on {new Date().toLocaleDateString()}. 
          All fees are payable before the term begins.
        </p>
      </div>
    </div>
  );
};

export default FeeStructure;