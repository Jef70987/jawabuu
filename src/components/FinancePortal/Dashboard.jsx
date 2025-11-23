/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const username = 'John Doe';
const role = 'Accountant';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState("");
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    pendingFees: 0,
    overduePayments: 0,
    incomeTrend: [],
    expenseTrend: [],
  });
  const [insights, setInsights] = useState({
    trend: "No data...",
    anomaly: "No data...",
    recommendation: "No data...",
    KeyMetrics: {
      incomeGrowth: 0,
      expenseGrowth: 0
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

  useEffect(() => { 
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/Accountant/Dashboard", {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data);

        setFinancialData({
          totalIncome: data.summary?.totalIncome ?? 0,
          totalExpense: data.summary?.totalExpense ?? 0,
          pendingFees: data.summary?.pendingFees ?? 0,
          overduePayments: data.summary?.overduePayments ?? 0,
          incomeTrend: Array.isArray(data.incomeTrend) ? data.incomeTrend : [],
          expenseTrend: Array.isArray(data.expenseTrend) ? data.expenseTrend : []
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);

        setFinancialData({
          totalIncome: 0,
          totalExpense: 0,
          pendingFees: 0,
          overduePayments: 0,
          incomeTrend: [],
          expenseTrend: []
        });
      }
    };

    const fetchDashboardInsight = async () => {
      try {
        const response = await fetch('http://localhost:8000/analysis_app/AccountantInsights/');
        const insightData = await response.json();
        setInsights(insightData);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(err.message);
      }
    };

    fetchDashboardData();
    fetchDashboardInsight();
    
    const interval = setInterval(() => {
      fetchDashboardData();
      fetchDashboardInsight();
    }, 30000); // Refresh every 30 seconds instead of 1 second
    
    return () => clearInterval(interval);
  }, []);

  // Chart data configuration
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income",
        data: financialData.incomeTrend.length > 0 ? financialData.incomeTrend : [40000, 45000, 50000, 48000, 52000, 55000, 58000],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: financialData.expenseTrend.length > 0 ? financialData.expenseTrend : [30000, 32000, 35000, 34000, 36000, 37000, 38000],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income Trend",
        data: financialData.incomeTrend.length > 0 ? financialData.incomeTrend : [40000, 45000, 50000, 48000, 52000, 55000, 58000],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense Trend",
        data: financialData.expenseTrend.length > 0 ? financialData.expenseTrend : [30000, 32000, 35000, 34000, 36000, 37000, 38000],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 mb-8 border-b border-gray-200">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          <img 
            src="../assets/images/images (5).png" 
            alt="Profile" 
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Welcome, {username}</h1>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Status:</span> {role}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-800">{currentDate}</p>
          <p className="text-2xl font-bold text-blue-600">{currentTime}</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl font-bold">Ksh {financialData.totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg p-6 text-white transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold">Ksh {financialData.totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg p-6 text-white transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Pending Fees</h3>
          <p className="text-2xl font-bold">Ksh {financialData.pendingFees.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg p-6 text-white transform transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Overdue Payments</h3>
          <p className="text-2xl font-bold">Ksh {financialData.overduePayments.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Trends</h3>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Key Financial Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Financial Insights</h2>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Income Growth</p>
            <p className={`text-2xl font-bold ${insights.KeyMetrics.incomeGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {insights.KeyMetrics.incomeGrowth >= 0 ? '+' : ''}{insights.KeyMetrics.incomeGrowth}%
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-sm text-red-600 font-medium">Expense Growth</p>
            <p className={`text-2xl font-bold ${insights.KeyMetrics.expenseGrowth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {insights.KeyMetrics.expenseGrowth >= 0 ? '+' : ''}{insights.KeyMetrics.expenseGrowth}%
            </p>
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-semibold text-gray-800 mb-1">Trend Analysis</h4>
            <p className="text-gray-600">{insights.trend}</p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <h4 className="font-semibold text-gray-800 mb-1">Anomaly Detection</h4>
            <p className="text-gray-600">{insights.anomaly}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <h4 className="font-semibold text-gray-800 mb-1">Recommendations</h4>
            <p className="text-gray-600">{insights.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;