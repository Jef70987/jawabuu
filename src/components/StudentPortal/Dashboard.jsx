import { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState('');
  const [studentData, setStudentData] = useState({
    name: '--',
    Student_number: '--',
    class: '--',
    modeOfTravel: '--',
    GPA: '--',
    DropoutRisk: '--',
    Attendance: '--',
    weakSubjects: 0,
    competency: 0,
    LastUpdate: new Date().getDate(),
    topSubjects: 0,
    skills: 0,
    extracurriculars: 0,
    value: 0,
    subjects: [],
    scores: [],
    curriculumActivities: [],
    termProgress: 0,
    status: '--',
    amountPaid: 0,
    totalAmount: 0,
    dueDate: '--',
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
        const response = await fetch("", {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data);

        setStudentData({
          name: data.studentData?.name ?? '',
          Student_number: data.studentData?.Student_number ?? '',
          status: data.studentData?.status ?? '',
          class: data.studentData?.class ?? '',
          modeOfTravel: data.studentData?.modeOfTravel ?? '',
          GPA: data.studentData?.GPA ?? '',
          DropoutRisk: data.studentData?.DropoutRisk ?? '',
          Attendance: data.studentData?.Attendance ?? '',
          weakSubjects: data.studentData?.weakSubjects ?? 0,
          topSubjects: data.studentData?.topSubjects ?? 0,
          skills: data.studentData?.skills ?? 0,
          extracurriculars: data.studentData?.extracurriculars ?? 0,
          competency: data.studentData?.competency ?? 0,
          termProgress: data.studentData?.termProgress ?? 0,
          amountPaid: data.studentData?.amountPaid ?? 0,
          totalAmount: data.studentData?.totalAmount ?? 0,
          dueDate: data.studentData?.dueDate ?? 0,
          subjects: Array.isArray(data.subjects) ? data.subjects : [],
          scores: Array.isArray(data.scores) ? data.scores : [],
          curriculumActivities: Array.isArray(data.curriculumActivities) ? data.curriculumActivities : []
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data:");
        setStudentData({
          name: '--',
          Student_number: '--',
          class: '--',
          modeOfTravel: '--',
          GPA: '--',
          DropoutRisk: '--',
          Attendance: '--',
          weakSubjects: 0,
          competency: 0,
          LastUpdate: new Date().getDate(),
          topSubjects: 0,
          skills: 0,
          extracurriculars: 0,
          value: 0,
          subjects: ['*','*','*'],
          scores: [0,0,0],
          curriculumActivities: ['NA','NA'],
          termProgress: 0,
          status: '--',
          amountPaid: 0,
          totalAmount: 0,
          dueDate: '--',
        });
      }
    };

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 1000);
    return () => clearInterval(interval);
  }, [error, navigate]);

  // Data for the bar chart
  const barChartData = {
    labels: studentData.subjects,
    datasets: [
      {
        label: 'Scores',
        data: studentData.scores,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const trendChartRef = useRef(null);

  useEffect(() => {
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    trendChartRef.current = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Term 1', 'Term 2', 'Term 3'],
        datasets: [{
          label: 'Your Performance',
          data: [38, 40, 48],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true,
          borderWidth: 3,
        },
        {
          label: 'Target Path',
          data: [48, 49, 54],
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.3,
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 35,
            max: 55,
            ticks: {
              callback: (value) => value + '%',
              font: {
                size: 11
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }
    });

    return () => {
      trendChartRef.current?.destroy();
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <img 
              src="../assets/images/images (5).png" 
              alt="Student" 
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome, {studentData.name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <p><strong className="text-gray-700">Admission:</strong> {studentData.Student_number}</p>
                <p><strong className="text-gray-700">Class:</strong> {studentData.class}</p>
                <p><strong className="text-gray-700">Mode:</strong> {studentData.modeOfTravel}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">{currentDate}</p>
            <p className="text-2xl font-bold text-blue-600">{currentTime}</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Competencies', value: studentData.competency, color: 'bg-blue-500' },
          { label: 'Weak Subjects', value: studentData.weakSubjects, color: 'bg-red-500' },
          { label: 'Top Subjects', value: studentData.topSubjects, color: 'bg-green-500' },
          { label: 'Skills', value: studentData.skills, color: 'bg-purple-500' },
          { label: 'Extracurriculars', value: studentData.extracurriculars, color: 'bg-orange-500' },
          { label: 'Attendance', value: studentData.Attendance, color: 'bg-teal-500' },
          { label: 'DropOut Risk', value: studentData.DropoutRisk, color: 'bg-pink-500' },
          { label: 'GPA', value: studentData.GPA, color: 'bg-indigo-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm font-medium text-gray-600 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className={`w-12 h-1 ${stat.color} rounded-full mt-2`}></div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Scores Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
            Subject-wise Scores
          </h3>
          <div className="h-80">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Performance Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
            📈 Overtime Performance Trend
          </h3>
          <div className="h-80">
            <canvas id="trendChart"></canvas>
          </div>
        </div>
      </div>

      {/* Progress and Fees Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Term Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Term Progress</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{studentData.termProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${studentData.termProgress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {studentData.termProgress}% of the term completed.
          </p>
        </div>

        {/* Fee Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Fee Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Status:</p>
              <p className={`font-semibold ${getStatusColor(studentData.status)}`}>
                {studentData.status}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Amount Paid:</p>
              <p className="font-semibold text-blue-600">Ksh {studentData.amountPaid}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Balance:</p>
              <p className="font-semibold text-gray-800">Ksh {studentData.totalAmount}</p>
            </div>
            <div>
              <p className="text-gray-600">Due Date:</p>
              <p className="font-semibold text-red-600">{studentData.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;