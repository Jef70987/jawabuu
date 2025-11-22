/* eslint-disable no-unused-vars */
import { useEffect,useState} from 'react';
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
import { data } from 'react-router-dom';

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
const username='John Doe';
const role = 'Accountant';
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
const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const[error, setError] = useState("");
  const [data, setData] = useState(null);
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    pendingFees: 0,
    overduePayments: 0,
    incomeTrend: [],
    expenseTrend: [],
  });
  const [Insights, setInsights] = useState({
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
    const fetchDashboardData = async () =>{
      try {
        const response = await fetch("http://localhost:8080/api/Accountant/Dashboard", {
          headers: {
            'content-Type': 'application/json',
            // authentication here
            // 'Authorization' : `Bearer ${localstorage.getItem('token`)}'
          }
        });

        // checking if response is successful
        if (!response.ok) {
          throw new Error(`server responded with status: ${response.status}`)
        }

        // passing json data
        const data = await response.json();
        console.log("Api response data:", data);

        setFinancialData({
          totalIncome: data.summary?.totalIncome ?? 0,
          totalExpense: data.summary?.totalExpense ?? 0,
          pendingFees: data.summary?.pendingFees ?? 0,
          overduePayments: data.summary ?. overduePayments ?? 0,
          incomeTrend: Array.isArray(data.incomeTrend) ? data.incomeTrend : [],
          expenseTrend: Array.isArray( data.expenseTrend) ? data.expenseTrend : []
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);

        setFinancialData ({
          totalIncome: 0,
          totalExpense: 0,
          pendingFees: 0,
          overduePayments: 0,
          incomeTrend: [],
          expenseTrend: []
        });

      }
    };

    const fetchDashboardInsight  = async () =>{
      try {
          const response = await fetch('http://localhost:8000/analysis_app/AccountantInsights/');
          const insightData = await response.json();
          setInsights(insightData);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(err.message);
      }
    };

    const interval = setInterval(() => {
      fetchDashboardData();
      fetchDashboardInsight();
    }, 1000);
    return () => clearInterval(interval);

  }, []);

  // Bar chart data for income vs. expenses
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income",
        // data: [40000, 45000, 50000, 48000, 52000],
        data: financialData.incomeTrend,
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        // data: [30000, 32000, 35000, 34000, 36000],
        data: financialData.expenseTrend,
        backgroundColor: "red",
      },
    ],
  };

  // Line chart data for financial trends
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income Trend",
        data: financialData.incomeTrend,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expense Trend",
        data: financialData.expenseTrend,
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="container" style={{width:'1000px', justifyContent:'center',alignSelf:'center',overflowY:'hidden',maxHeight:'200vh'}}>
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

      <div className="section" style={{display:'flex',flexDirection:'row', gap:'20px', justifyContent:'center',textAlign:'center',width:'900px'}}>
          <div style={{backgroundColor:'skyblue',justifyContent:'center'}} className="card">
            <h3>Total Income</h3>
            <p style={{color:'white'}}>Ksh{financialData.totalIncome}</p>
          </div>
          <div style={{backgroundColor:'red',justifyContent:'center'}} className="card">
            <h3>Total Expenses</h3>
            <p style={{color:'white'}}>Ksh{financialData.totalExpense}</p>
          </div>
          <div style={{backgroundColor:'green',justifyContent:'center'}} className="card">
            <h3>Pending Fees</h3>
            <p style={{color:'white'}}>Ksh{financialData.pendingFees}</p>
          </div>
          <div style={{backgroundColor:'orange',justifyContent:'center'}} className="card">
            <h3>Overdue Payments</h3>
            <p style={{color:'white'}}>Ksh{financialData.overduePayments}</p>
          </div>
        
      </div>

      {/* Charts Section */}
      <h2>Financial Charts</h2>
      <div className="section"  style={{display:'flex',flexDirection:'row', gap:'20px', justifyContent:'center',width:'900px'}}>
        {/*chart 1*/}
        <div className="chart-container" style={{width:'400px',maxHeight:'fit-content'}}>
          <h3>Income vs. Expenses</h3>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {/*chart 2*/}
        <div className="chart-container" style={{width:'400px',maxHeight:'fit-content'}}>
          <h3>Financial Trends</h3>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        
      </div>

      {/* Key Financial Insights */}
      <div className="section">
        <h2>Key Financial Insights</h2>
        <ul className="insights-list">
          <li><p>Income Growth: {Insights.KeyMetrics.incomeGrowth} Expense Growth: {Insights.KeyMetrics.expenseGrowth} </p></li>
          <li>
            <strong>Trend:</strong>{Insights.trend}
          </li>
          <li>
            <strong>Anomaly:</strong> {Insights.anomaly}
          </li>
          <li>
            <strong>Recommendation:</strong> {Insights.recommendation}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;