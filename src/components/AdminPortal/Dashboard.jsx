import { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

// Style variables
const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f5f5f5'
  },
  layout: {
    display: 'flex',
    flexDirection : 'column'
  },
  
  mainContent: {
    marginLeft: '0',
    maxWidth: '1200px',
    padding: '20px',
    justifyContent: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    marginBottom: '30px',
    borderBottom: '1px solid #ddd',
    
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  profileImg: {
    width: '50px',
    height: '50px',
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  quickActionButton: {
    border: 'none',
    padding: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ecf0f1'
  },
  activityTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    textAlign: 'left',
    padding: '12px 15px',
    borderBottom: '1px solid #ddd'
  },
  tableCell: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd'
  },
  statusBadge: {
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px'
  }
};

// Helper functions
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const statusColors = {
  pending: { bg: '#e3f2fd', text: '#1976d2' },
  completed: { bg: '#e8f5e9', text: '#388e3c' },
  'in-progress': { bg: '#fff3e0', text: '#ffa000' }
};

const notificationColors = {
  warning: { bg: '#e3f2fd', icon: '#2196f3' },
  info: { bg: '#fff8e1', icon: '#ffb300' },
  success: { bg: '#e8f5e9', icon: '#4caf50' }
};

function Dashboard() {

const [currentDate, setCurrentDate] = useState('');
const [currentTime, setCurrentTime] = useState('');

  // Fetch data on component mount
useEffect(() => {
  updateDateTime();
  const timeInterval = setInterval(updateDateTime, 60000);
  
  return () => clearInterval(timeInterval);
  }, []);

  // Update current date and time
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

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', icon: 'exclamation', title: '3 teachers absent today', time: '2 hours ago', read: false },
    { id: 2, type: 'info', icon: 'calendar-check', title: 'PTA meeting scheduled', time: 'Yesterday', read: false },
    { id: 3, type: 'success', icon: 'trophy', title: 'School won science fair', time: '2 days ago', read: true }
  ]);
  const [activities] = useState([
    { id: 1, date: 'Today, 10:30 AM', activity: 'New student enrollment', initiatedBy: 'Admissions Office', status: 'pending' },
    { id: 2, date: 'Yesterday, 3:45 PM', activity: 'Teacher evaluation submitted', initiatedBy: 'Dr. Michael Brown', status: 'completed' },
    { id: 3, date: 'Yesterday, 11:20 AM', activity: 'Budget approval request', initiatedBy: 'Finance Department', status: 'in-progress' },
    { id: 4, date: '2 days ago, 4:15 PM', activity: 'School maintenance report', initiatedBy: 'Facilities Team', status: 'completed' }
  ]);

  useEffect(() => {
    // Initialize chart when component mounts
    const ctx = document.getElementById('performanceChart');
    let performanceChart ;
    if (ctx) {
      if (ctx.Chart){
        ctx.Chart.destroy();
      }

      performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
          datasets: [
            {
              label: 'Math',
              data: [85, 78, 92, 88, 76, 90],
              backgroundColor: 'rgba(52, 152, 219, 0.7)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1
            },
            {
              label: 'Science',
              data: [78, 85, 80, 89, 82, 87],
              backgroundColor: 'rgba(46, 204, 113, 0.7)',
              borderColor: 'rgba(46, 204, 113, 1)',
              borderWidth: 1
            },
            {
              label: 'English',
              data: [82, 80, 85, 83, 88, 91],
              backgroundColor: 'rgba(155, 89, 182, 0.7)',
              borderColor: 'rgba(155, 89, 182, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              min: 70,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          }
        }
      });
      ctx.Chart = performanceChart;
    }

    return () => {
      if (performanceChart) {
        performanceChart.destroy();
      }
    };
  }, []);

  const handleQuickAction = (action) => {
    alert(`Action triggered: ${action}`);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div style={styles.app}>
      <div style={styles.layout}>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <header style={styles.header}>
            <div style={styles.profile}>
              <img src="../assets/images/images (5).png" alt='' className='student-pic' style={styles.profileImg}/>
              <div>
                <h1 style={styles.welcome}>Welcome, Dr. Mark Johnson </h1>
                <p>School Admin</p>
              </div>
            </div>
            <div style={styles.dateTime}>
              <p>{currentDate}</p>
              <p>{currentTime}</p>
              <div style={{ position: 'relative', marginRight: '20px', cursor: 'pointer' }}>
                <i
                  className="fas fa-bell" 
                  style={{ fontSize: '20px', color: '#7f8c8d' }}
                  onClick={() => alert('Showing notifications')}
                ></i>Messages
                <span style={{ 
                  position: 'absolute', 
                  top: '-5px', 
                  right: '-5px', 
                  backgroundColor: '#e74c3c', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '18px', 
                  height: '18px', 
                  fontSize: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  {notifications.filter(n => !n.read).length}
                </span>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <StatCard 
              title="Total Students" 
              value="1,245" 
              icon="users" 
              color="#3498db" 
              trend="5.2% from last year" 
              trendPositive 
            />
            <StatCard 
              title="Teaching Staff" 
              value="68" 
              icon="chalkboard-teacher" 
              color="#e74c3c" 
              trend="3 new hires" 
              trendPositive 
            />
            <StatCard 
              title="Attendance Today" 
              value="92.5%" 
              icon="user-check" 
              color="#2ecc71" 
              trend="2.1% below average" 
              trendPositive={false} 
            />
            <StatCard 
              title="Upcoming Events" 
              value="5" 
              icon="calendar-alt" 
              color="#f39c12" 
              trend="Next: Sports Day (3 days)" 
            />
          </div>

          {/* Charts and Tables */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div style={styles.chartContainer}>
              <h3 style={{ marginTop: 0 }}>Academic Performance (2023-24)</h3>
              <canvas id="performanceChart" height="250"></canvas>
            </div>
            
            <div style={styles.chartContainer}>
              <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
              <div style={styles.quickActions}>
                <QuickActionButton 
                  icon="user-plus" 
                  label="Add Student" 
                  color="#3498db" 
                  onClick={() => handleQuickAction('Add Student')} 
                />
                <QuickActionButton 
                  icon="file-invoice" 
                  label="Generate Report" 
                  color="#2ecc71" 
                  onClick={() => handleQuickAction('Generate Report')} 
                />
                <QuickActionButton 
                  icon="bullhorn" 
                  label="Send Announcement" 
                  color="#f39c12" 
                  onClick={() => handleQuickAction('Send Announcement')} 
                />
                <QuickActionButton 
                  icon="calendar-plus" 
                  label="Add Event" 
                  color="#9b59b6" 
                  onClick={() => handleQuickAction('Add Event')} 
                />
              </div>
              
              <h3 style={{ marginTop: '20px' }}>Recent Notifications</h3>
              <div style={{ borderTop: '1px solid #ecf0f1', paddingTop: '10px' }}>
                {notifications.map(notification => (
                  <NotificationItem 
                    key={notification.id}
                    notification={notification}
                    onClick={() => markAsRead(notification.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div style={{ ...styles.chartContainer, marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ marginTop: 0 }}>Recent Activities</h3>
              <button 
                style={{ 
                  backgroundColor: 'transparent', 
                  border: '1px solid #3498db', 
                  color: '#3498db', 
                  padding: '5px 10px', 
                  borderRadius: '4px', 
                  cursor: 'pointer'
                }}
                onClick={() => alert('Showing all activities')}
              >
                View All
              </button>
            </div>
            
            <table style={styles.activityTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Activity</th>
                  <th style={styles.tableHeader}>Initiated By</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={styles.tableCell}>{activity.date}</td>
                    <td style={styles.tableCell}>{activity.activity}</td>
                    <td style={styles.tableCell}>{activity.initiatedBy}</td>
                    <td style={styles.tableCell}>
                      <span style={{ 
                        ...styles.statusBadge,
                        backgroundColor: statusColors[activity.status].bg,
                        color: statusColors[activity.status].text
                      }}>
                        {capitalizeFirstLetter(activity.status.replace('-', ' '))}
                      </span>
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
}

// Component for Stat Cards
function StatCard({ title, value, icon, color, trend, trendPositive }) {
  return (
    <div style={{ 
      ...styles.statCard,
      borderTop: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>{title}</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>{value}</p>
        </div>
        <i 
          className={`fas fa-${icon}`} 
          style={{ 
            fontSize: '40px', 
            color: color, 
            opacity: '0.3'
          }} 
        ></i>
      </div>
      {trend && (
        <p style={{ 
          color: trendPositive ? '#2ecc71' : '#e74c3c', 
          margin: '5px 0 0', 
          fontSize: '12px'
        }}>
          <i className={`fas fa-arrow-${trendPositive ? 'up' : 'down'}`}></i> {trend}
        </p>
      )}
    </div>
  );
}

// Component for Quick Action Buttons
function QuickActionButton({ icon, label, color, onClick }) {
  return (
    <button 
      style={{ 
        ...styles.quickActionButton,
        backgroundColor: color,
        color: 'white'
      }}
      onClick={onClick}
    >
      <i className={`fas fa-${icon}`} style={{ display: 'block', fontSize: '20px', marginBottom: '5px' }}></i>
      {label}
    </button>
  );
}

// Component for Notification Items
function NotificationItem({ notification, onClick }) {
  return (
    <div 
      style={styles.notificationItem}
      onClick={onClick}
    >
      <div style={{ 
        backgroundColor: notificationColors[notification.type].bg,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
      }}>
        <i 
          className={`fas fa-${notification.icon}`} 
          style={{ color: notificationColors[notification.type].icon }}
        ></i>
      </div>
      <div>
        <p style={{ 
          margin: 0, 
          fontSize: '14px',
          fontWeight: notification.read ? 'normal' : 'bold'
        }}>
          {notification.title}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>{notification.time}</p>
      </div>
    </div>
  );
}

export default Dashboard;

