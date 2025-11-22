/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const username = 'John Mark';
const role = 'Bursar';

const BursarDashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [user, setUser] = useState([]);
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

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

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [timeFrame]);

  // Fetch user's name from the database using an API
  const fetchUser = async () => {
    const username = await axios.get(`http://localhost:8080/api/user/${user}`, {
      params: { class: '' },
    });
    setUser(username.data);
  };

  // Calculate percentages
  const paidPercentage = Math.round((dashboardData.paidStudents / dashboardData.totalStudents) * 100);
  const pendingPercentage = 100 - paidPercentage;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header - Full Width */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img 
                src="../assets/images/images (5).png" 
                alt="Profile" 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome, {username}</h1>
                <p className="text-gray-600"><strong>Status:</strong> {role}</p>
              </div>
            </div>
            <div className="text-right w-full md:w-auto">
              <p className="text-gray-700 font-medium text-sm md:text-base">{currentDate}</p>
              <p className="text-gray-600 text-sm md:text-base">{currentTime}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width */}
      <div className="w-full px-4 md:px-6 py-4 md:py-6">
        {/* Timeframe Selector */}
        <div className="w-full mb-6 flex justify-end">
          <select 
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Status Cards - Full Width Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Total Students</h3>
            <p className="text-2xl md:text-3xl font-bold">{dashboardData.totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Paid Fees</h3>
            <p className="text-2xl md:text-3xl font-bold">
              {dashboardData.paidStudents.toLocaleString()} ({paidPercentage}%)
            </p>
          </div>
          <div className="bg-sky-500 text-white p-6 rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Pending Fees</h3>
            <p className="text-2xl md:text-3xl font-bold">
              {dashboardData.pendingStudents.toLocaleString()} ({pendingPercentage}%)
            </p>
          </div>
        </div>

        {/* Revenue Section - Full Width */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Fee Collection Trend - Takes 2/3 on large screens */}
          <div className="xl:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Collection Trend</h3>
            <div className="h-64 md:h-80 w-full flex items-end justify-between space-x-1 md:space-x-2 border-b border-gray-200 pb-4">
              {[60, 45, 75, 80, 65, 90, 85, 70, 95, 88, 78, 82].map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1 min-w-[30px]">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2 hidden md:block">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1 md:hidden">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods - Takes 1/3 on large screens */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
            <div className="space-y-4 w-full">
              {Object.entries(dashboardData.paymentMethods).map(([method, percentage]) => (
                <div key={method} className="space-y-2 w-full">
                  <div className="flex justify-between text-sm w-full">
                    <span className="font-medium text-gray-700">{method}</span>
                    <span className="text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        method === 'MPESA' ? 'bg-green-500' :
                        method === 'Cash' ? 'bg-blue-500' :
                        method === 'Bank' ? 'bg-purple-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments - Full Width */}
        <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Payments</h3>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      KSh {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method}
                    </td>
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

export default BursarDashboard;