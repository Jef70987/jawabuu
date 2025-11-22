
import React from 'react';

const Dashboard = () => {
  // Style variables
  const styles = {
    root: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5',
      color: '#333',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px 0',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    headerTitle: {
      margin: 0,
      fontSize: '28px',
      color: 'white'
    },
    headerSubtitle: {
      margin: '5px 0 0',
      fontSize: '16px',
      opacity: '0.9'
    },
    contentWrapper: {
      display: 'flex',
      minHeight: 'calc(100vh - 160px)'
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#ecf0f1',
      padding: '20px',
      borderRight: '1px solid #ddd'
    },
    sectionTitle: {
      marginTop: 0,
      color: '#2c3e50',
      borderBottom: '1px solid #bdc3c7',
      paddingBottom: '10px'
    },
    quickLink: {
      color: '#3498db',
      textDecoration: 'none',
      display: 'block',
      padding: '8px',
      borderRadius: '4px',
      transition: 'background-color 0.3s'
    },
    notification: {
      padding: '10px',
      marginBottom: '15px',
      fontSize: '14px'
    },
    mainContent: {
      flex: 1,
      padding: '20px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    statTitle: {
      marginTop: 0,
      color: '#7f8c8d',
      fontSize: '16px'
    },
    statValue: {
      fontSize: '32px',
      margin: '10px 0',
      color: '#2c3e50',
      fontWeight: 'bold'
    },
    statDescription: {
      margin: 0,
      color: '#7f8c8d',
      fontSize: '14px'
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    activityItem: {
      padding: '10px 0'
    },
    activityTime: {
      color: '#7f8c8d',
      fontSize: '14px'
    },
    eventDay: {
      fontWeight: 'bold',
      color: '#e74c3c'
    }
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>DEPUTY PRINCIPAL PORTAL</h1>
      </header>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sectionTitle}>Quick Links</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a href="#" style={styles.quickLink}>Attendance Summary</a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="#" style={styles.quickLink}>Pending Approvals</a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="#" style={styles.quickLink}>Disciplinary Cases</a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="#" style={styles.quickLink}>Teacher Evaluations</a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="#" style={styles.quickLink}>Academic Calendar</a>
            </li>
          </ul>
          
          <h3 style={styles.sectionTitle}>Notifications</h3>
          <div style={{ ...styles.notification, backgroundColor: '#fff9e6', borderLeft: '4px solid #f1c40f' }}>
            <p style={{ margin: 0 }}>3 pending staff leave requests</p>
          </div>
          <div style={{ ...styles.notification, backgroundColor: '#e8f4f8', borderLeft: '4px solid #3498db' }}>
            <p style={{ margin: 0 }}>Meeting with HODs at 2:00 PM</p>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main style={styles.mainContent}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Dashboard Overview</h2>
          
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={{ ...styles.statCard, borderTop: '4px solid #3498db' }}>
              <h3 style={styles.statTitle}>Total Students</h3>
              <p style={styles.statValue}>1,245</p>
              <p style={styles.statDescription}>5% increase from last term</p>
            </div>
            
            <div style={{ ...styles.statCard, borderTop: '4px solid #2ecc71' }}>
              <h3 style={styles.statTitle}>Teaching Staff</h3>
              <p style={styles.statValue}>68</p>
              <p style={styles.statDescription}>2 positions vacant</p>
            </div>
            
            <div style={{ ...styles.statCard, borderTop: '4px solid #e74c3c' }}>
              <h3 style={styles.statTitle}>Disciplinary Cases</h3>
              <p style={styles.statValue}>12</p>
              <p style={styles.statDescription}>3 new this week</p>
            </div>
            
            <div style={{ ...styles.statCard, borderTop: '4px solid #f39c12' }}>
              <h3 style={styles.statTitle}>Attendance Today</h3>
              <p style={styles.statValue}>92%</p>
              <p style={styles.statDescription}>45 students absent</p>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div style={styles.contentCard}>
            <h3 style={{ ...styles.sectionTitle, marginTop: 0 }}>Recent Activities</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ ...styles.activityItem, borderBottom: '1px solid #ecf0f1' }}>
                <span style={styles.activityTime}>Today, 10:30 AM</span><br />
                <span>Approved Mr. Johnson's leave request</span>
              </li>
              <li style={{ ...styles.activityItem, borderBottom: '1px solid #ecf0f1' }}>
                <span style={styles.activityTime}>Yesterday, 3:45 PM</span><br />
                <span>Met with Grade 11 parents regarding discipline</span>
              </li>
              <li style={{ ...styles.activityItem, borderBottom: '1px solid #ecf0f1' }}>
                <span style={styles.activityTime}>Yesterday, 11:20 AM</span><br />
                <span>Reviewed and signed off on term reports</span>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.activityTime}>Monday, 2:15 PM</span><br />
                <span>Conducted teacher performance evaluation</span>
              </li>
            </ul>
          </div>
          
          {/* Upcoming Events */}
          <div style={styles.contentCard}>
            <h3 style={{ ...styles.sectionTitle, marginTop: 0 }}>Upcoming Events</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ ...styles.activityItem, borderBottom: '1px solid #ecf0f1' }}>
                <span style={styles.eventDay}>Tomorrow</span><br />
                <span>Staff meeting - 8:00 AM in Conference Room</span>
              </li>
              <li style={{ ...styles.activityItem, borderBottom: '1px solid #ecf0f1' }}>
                <span style={styles.eventDay}>Friday</span><br />
                <span>Parent-teacher conferences (all day)</span>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.eventDay}>Next Monday</span><br />
                <span>Term report submissions deadline</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;