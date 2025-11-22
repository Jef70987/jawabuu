/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const username='John mark';
const role = 'Bursar';
const BursarDashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');


  useEffect(() => {
      updateDateTime();
      const timeInterval = setInterval(updateDateTime, 60000);
      
      return () => clearInterval(timeInterval);
    }, []);
    
  const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes} ${ampm}`);
  };

  // State for dashboard data
  const [user, setUser] = useState([]);
  const [dashboardData] = useState({
    totalStudents: 1250,
    paidStudents: 950,
    pendingStudents: 300,
    totalRevenue: 4250000,
    todayCollections: 125000,
    recentPayments: [
      { id: 'STD2023001', name: 'John Doe', amount: 5000, date: 'May 15, 2023', method: 'MPESA' },
      { id: 'STD2023002', name: 'Jane Smith', amount: 7500, date: 'May 14, 2023', method: 'Cash' },
      { id: 'STD2023003', name: 'Michael Brown', amount: 10000, date: 'May 13, 2023', method: 'Bank Transfer' }
    ],
    paymentMethods: {
      MPESA: 65,
      Cash: 20,
      Bank: 10,
      Cheque: 5
    }
  });

  const [timeFrame, setTimeFrame] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // fetch from an API
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [timeFrame]);

  //fetch user's name from the database using an API
  const fetchUser = async () => {
    const username = await axios.get(`http://localhost:8080/api/user/${user}`, {
        params: { class:'' },
      });
      setUser(username.data);
  };
  // Calculate percentages
  const paidPercentage = Math.round((dashboardData.paidStudents / dashboardData.totalStudents) * 100);
  const pendingPercentage = 100 - paidPercentage;

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      marginBottom: '30px',
      borderBottom: '1px solid #ddd'
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    profileImg: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #3498db'
    },
    welcome: {
      fontSize: '24px',
      color: '#2c3e50'
    },
    dateTime: {
      textAlign: 'right'
    },

}

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh',overflowY:'auto' }}>
        <header style={styles.header}>
        <div style={styles.profile}>
          <img src="../assets/images/images (5).png" alt='' className='student-pic' style={styles.profileImg}/>
          <div>
            <h1 style={styles.welcome}>Welcome, {username}</h1>
            <p ><strong>Status:</strong> {role}</p>
          </div>
        </div>
        <div style={styles.dateTime}>
          <p>{currentDate}</p>
          <p>{currentTime}</p>
        </div>
      </header>
        {/* Main Content */}
        <div style={{width:"1050px"}}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Timeframe Selector */}
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <select 
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Status Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'green', color: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ marginTop: 0 , color:'white'}}>Total Students</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color:'white' }}>{dashboardData.totalStudents}</p>
                </div>
                <div style={{backgroundColor: 'orangered',  color: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ marginTop: 0 , color:'white'}}>Paid Fees</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold',color:'white' }}>{dashboardData.paidStudents} ({paidPercentage}%)</p>
                </div>
                <div style={{ backgroundColor: 'skyblue',  color: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ marginTop: 0, color:'white' }}>Pending Fees</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color:'white' }}>{dashboardData.pendingStudents} ({pendingPercentage}%)</p>
                </div>
              </div>

              {/* Revenue Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Fee Collection Trend</h3>
                  <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #ddd' }}>
                    {/* This to be replaced with a chart library in production */}
                    {[60, 45, 75, 80, 65, 90].map((value, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '8%' }}>
                        <div style={{ width: '100%', backgroundColor: 'blue', height: {value}, marginBottom: '5px' }}></div>
                        <div style={{ fontSize: '12px' }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Payment Methods</h3>
                  <div style={{ marginTop: '20px' }}>
                    {Object.entries(dashboardData.paymentMethods).map(([method, percentage]) => (
                      <div key={method} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>{method}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div style={{ height: '10px', backgroundColor: '#ecf0f1', borderRadius: '5px' }}>
                          <div 
                            style={{ 
                              width: {percentage}, 
                              height: '50%', 
                              backgroundColor: 
                                method === 'MPESA' ? '#2ecc71' : 
                                method === 'Cash' ? '#3498db' : 
                                method === 'Bank' ? '#9b59b6' : '#f39c12',
                              borderRadius: '5px'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Recent Payments</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'green', color: 'blue' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Admission No</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentPayments.map((payment, index) => (
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
            </>
          )}
        </div>
    </div>
  );
};

export default BursarDashboard;