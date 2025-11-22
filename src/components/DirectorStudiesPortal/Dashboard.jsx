// import { color } from 'chart.js/helpers';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  // State for date/time
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // State for tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Grade Math Quiz', due: 'Tomorrow', completed: false },
    { id: 2, title: 'Prepare Science Exam', due: 'Next Week', completed: false },
    { id: 3, title: 'Submit Attendance Report', due: 'Friday', completed: false }
  ]);
  
  // State for events
  const [events, setEvents] = useState([
    { id: 1, date: 'May 30', time: '2:00 PM - 4:00 PM', title: 'Department Meeting' },
    { id: 2, date: 'June 5', time: 'All Day', title: 'Parent-Teacher Conference' },
    { id: 3, date: 'June 15', time: '9:00 AM - 12:00 PM', title: 'Final Exams Begin' }
  ]);
  
  // State for modals
  const [activeModal, setActiveModal] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', due: '', priority: 'medium', notes: '' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [gradeData, setGradeData] = useState({ class: '', assignment: '', file: null });

  // Simulated API functions
  const fetchSchedule = () => {
    return Promise.resolve([
      { day: 'Monday', time: '9:00 AM - 11:00 AM', subject: 'Math', room: '101' },
      { day: 'Tuesday', time: '10:00 AM - 12:00 PM', subject: 'Science', room: '102' },
      { day: 'Wednesday', time: '1:00 PM - 3:00 PM', subject: 'English', room: '103' }
    ]);
  };

  const fetchStats = () => {
    return Promise.resolve({
      classesToday: 2,
      pendingTasks: 3,
      students: 84,
      upcomingEvents: 5
    });
  };

  // State for fetched data
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState({
    classesToday: 0,
    pendingTasks: 0,
    students: 0,
    upcomingEvents: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 60000);
    
    fetchSchedule().then(data => setSchedule(data));
    fetchStats().then(data => setStats(data));
    
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

  // Calendar functions
  const renderCalendar = () => {
    // eslint-disable-next-line no-unused-vars
    const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    const calendarDays = [];
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} style={styles.calendarDayHeader}>{day}</div>
      );
    });
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} style={styles.calendarDay}></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      calendarDays.push(
        <div key={`day-${day}`} style={{ ...styles.calendarDay, ...(isToday ? styles.currentDay : {}) }}>
          <div style={styles.dayNumber}>{day}</div>
          {day % 5 === 0 && <div style={styles.eventMarker}></div>}
        </div>
      );
    }
    
    return calendarDays;
  };

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(year => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(year => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Task functions
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask.title,
      due: newTask.due,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: '', due: '', priority: 'medium', notes: '' });
    setActiveModal(null);
  };

  // Event functions
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventObj = {
      id: events.length + 1,
      date: newEvent.date,
      time: newEvent.time,
      title: newEvent.title,
      location: newEvent.location
    };
    setEvents([...events, newEventObj]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
    setActiveModal(null);
  };

  // Grade functions
  const handleGradeSubmit = (e) => {
    e.preventDefault();
    alert(`Grades submitted for ${gradeData.class} - ${gradeData.assignment}`);
    setGradeData({ class: '', assignment: '', file: null });
    setActiveModal(null);
  };

  // Modal functions
  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Styles
  const styles = {
    root: {
      backgroundColor: '#f5f7fa',
      color: '#333',
      minHeight: '100vh',
      
    },
    container: {
      maxWidthWidth: '1000px',
    },
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
      gap: '35px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width:'190px'
    },
    statValue: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#3498db',
      margin: '10px 0'
    },
    quickActions: {
      display: 'flex',
      gap: '15px',
      marginBottom: '30px'
    },
    actionBtn: {
      flex: '1',
      padding: '15px',
      background: 'white',
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color:'red',
    },
    actionBtnHover: {
      background: '#3498db',
      color: 'white',
      transform: 'translateY(-3px)'
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    card: {
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease'
    },
    cardHover: {
      transform: 'translateY(-5px)'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '1px solid #eee'
    },
    cardTitle: {
      fontSize: '18px',
      color: '#2c3e50',
      fontWeight: '600'
    },
    cardAction: {
      color: '#3498db',
      fontSize: '14px',
      cursor: 'pointer'
    },
    scheduleItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px dashed #eee'
    },
    scheduleDay: {
      fontWeight: '600',
      color: '#2c3e50'
    },
    scheduleTime: {
      color: '#3498db',
      fontSize: '14px'
    },
    scheduleRoom: {
      fontSize: '13px',
      color: '#7f8c8d'
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px dashed #eee'
    },
    taskCompleted: {
      textDecoration: 'line-through',
      color: '#95a5a6'
    },
    calendar: {
      width: '100%',
      marginBottom: '30px'
    },
    calendarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    calendarNav: {
      display: 'flex',
      gap: '10px'
    },
    calendarNavBtn: {
      background: '#3498db',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '5px'
    },
    calendarDayHeader: {
      textAlign: 'center',
      fontWeight: '600',
      padding: '10px',
      background: '#ecf0f1',
      borderRadius: '5px'
    },
    calendarDay: {
      height: '80px',
      padding: '5px',
      background: 'white',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    currentDay: {
      background: '#3498db',
      color: 'white'
    },
    dayNumber: {
      fontWeight: '600',
      marginBottom: '5px'
    },
    eventMarker: {
      width: '6px',
      height: '6px',
      background: '#2ecc71',
      borderRadius: '50%',
      margin: '2px auto'
    },
    modal: {
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    closeModal: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer'
    },
    formGroup: {
      marginBottom: '15px'
    },
    formInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    },
    submitBtn: {
      background: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '500',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.profile}>
            <img src="../assets/images/images (5).png" alt='' className='student-pic' style={styles.profileImg}/>
            <div>
              <h1 style={styles.welcome}>Welcome, James Biko</h1>
              <p>Director of Studies</p>
            </div>
          </div>
          <div style={styles.dateTime}>
            <p>{currentDate}</p>
            <p>{currentTime}</p>
          </div>
        </header>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div>Classes Today</div>
            <div style={styles.statValue}>{stats.classesToday}</div>
          </div>
          <div style={styles.statCard}>
            <div>Pending Tasks</div>
            <div style={styles.statValue}>{stats.pendingTasks}</div>
          </div>
          <div style={styles.statCard}>
            <div>Students</div>
            <div style={styles.statValue}>{stats.students}</div>
          </div>
          <div style={styles.statCard}>
            <div>Upcoming Events</div>
            <div style={styles.statValue}>{stats.upcomingEvents}</div>
          </div>
        </div>
        
        <div style={styles.quickActions}>
          <button 
            style={styles.actionBtn} 
            onMouseEnter={e => e.currentTarget.style.background = '#3498db'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
            onClick={() => openModal('add-task')}
          >
            <span style={{ fontSize: '24px', marginBottom: '10px' }}>+</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Add Task</span>
          </button>
          <button 
            style={styles.actionBtn} 
            onMouseEnter={e => e.currentTarget.style.background = '#3498db'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
            onClick={() => openModal('add-event')}
          >
            <span style={{ fontSize: '24px', marginBottom: '10px' }}>📅</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Add Event</span>
          </button>
          <button 
            style={styles.actionBtn} 
            onMouseEnter={e => e.currentTarget.style.background = '#3498db'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
            onClick={() => openModal('grade-work')}
          >
            <span style={{ fontSize: '24px', marginBottom: '10px' }}>📝</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Grade Work</span>
          </button>
          <button 
            style={styles.actionBtn} 
            onMouseEnter={e => e.currentTarget.style.background = '#3498db'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
            onClick={() => openModal('send-message')}
          >
            <span style={{ fontSize: '24px', marginBottom: '10px' }}>✉️</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Send Message</span>
          </button>
        </div>
        
        <div style={styles.dashboardGrid}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Teaching Schedule</div>
              <div style={styles.cardAction} onClick={() => openModal('full-schedule')}>View All</div>
            </div>
            <div>
              {schedule.map((item, index) => (
                <div key={index} style={styles.scheduleItem}>
                  <div style={styles.scheduleDay}>{item.day}</div>
                  <div>
                    <div style={styles.scheduleTime}>{item.time}</div>
                    <div style={styles.scheduleRoom}>{item.subject} - Room {item.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Notifications & Pending Tasks</div>
              <div style={styles.cardAction} onClick={() => openModal('all-tasks')}>View All</div>
            </div>
            <div>
              {tasks.map(task => (
                <div key={task.id} style={styles.taskItem}>
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ marginRight: '10px' }}
                  />
                  <div style={{ ...styles.taskContent, ...(task.completed ? styles.taskCompleted : {}) }}>
                    <div style={styles.taskTitle}>{task.title}</div>
                    <div style={styles.taskDue}>Due: {task.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Upcoming Events</div>
              <div style={styles.cardAction} onClick={() => openModal('all-events')}>View All</div>
            </div>
            <div>
              {events.map(event => (
                <div key={event.id} style={styles.scheduleItem}>
                  <div style={styles.scheduleDay}>{event.date}</div>
                  <div>
                    <div style={styles.scheduleTime}>{event.time}</div>
                    <div style={styles.scheduleRoom}>{event.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.calendar}>
          <div style={styles.calendarHeader}>
            <div style={styles.cardTitle}>
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div style={styles.calendarNav}>
              <button style={styles.calendarNavBtn} onClick={prevMonth}>Previous</button>
              <button style={styles.calendarNavBtn} onClick={nextMonth}>Next</button>
            </div>
          </div>
          <div style={styles.calendarGrid}>
            {renderCalendar()}
          </div>
        </div>
      </div>
      
      {/* Add Task Modal */}
      {activeModal === 'add-task' && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.cardTitle}>Add New Task</div>
              <button style={styles.closeModal} onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleAddTask}>
              <div style={styles.formGroup}>
                <label>Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  style={styles.formInput}
                  required 
                />
              </div>
              <div style={styles.formGroup}>
                <label>Due Date</label>
                <input 
                  type="date" 
                  value={newTask.due}
                  onChange={(e) => setNewTask({...newTask, due: e.target.value})}
                  style={styles.formInput}
                  required 
                />
              </div>
              <div style={styles.formGroup}>
                <label>Priority</label>
                <select 
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  style={styles.formInput}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Notes</label>
                <textarea 
                  value={newTask.notes}
                  onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                  style={{ ...styles.formInput, minHeight: '100px' }}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Add Task</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Event Modal */}
      {activeModal === 'add-event' && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.cardTitle}>Add New Event</div>
              <button style={styles.closeModal} onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div style={styles.formGroup}>
                <label>Event Title</label>
                <input 
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  style={styles.formInput}
                  required 
                />
              </div>
              <div style={styles.formGroup}>
                <label>Date</label>
                <input 
                  type="date" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  style={styles.formInput}
                  required 
                />
              </div>
              <div style={styles.formGroup}>
                <label>Time</label>
                <input 
                  type="time" 
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  style={styles.formInput}
                  required 
                />
              </div>
              <div style={styles.formGroup}>
                <label>Location</label>
                <input 
                  type="text" 
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Description</label>
                <textarea 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  style={{ ...styles.formInput, minHeight: '100px' }}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Add Event</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Grade Work Modal */}
      {activeModal === 'grade-work' && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.cardTitle}>Grade Student Work</div>
              <button style={styles.closeModal} onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleGradeSubmit}>
              <div style={styles.formGroup}>
                <label>Class</label>
                <select 
                  value={gradeData.class}
                  onChange={(e) => setGradeData({...gradeData, class: e.target.value})}
                  style={styles.formInput}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Assignment</label>
                <select 
                  value={gradeData.assignment}
                  onChange={(e) => setGradeData({...gradeData, assignment: e.target.value})}
                  style={styles.formInput}
                  required
                >
                  <option value="">Select Assignment</option>
                  <option value="quiz1">Quiz 1</option>
                  <option value="quiz2">Quiz 2</option>
                  <option value="midterm">Midterm Exam</option>
                  <option value="final">Final Exam</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Upload Grades (CSV)</label>
                <input 
                  type="file" 
                  accept=".csv"
                  onChange={(e) => setGradeData({...gradeData, file: e.target.files[0]})}
                  style={styles.formInput}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Submit Grades</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Send Message Modal */}
      {activeModal === 'send-message' && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.cardTitle}>Send Message</div>
              <button style={styles.closeModal} onClick={closeModal}>&times;</button>
            </div>
            <form>
              <div style={styles.formGroup}>
                <label>Recipient</label>
                <select style={styles.formInput}>
                  <option value="">Select Recipient</option>
                  <option value="all">All Students</option>
                  <option value="math">Math Class</option>
                  <option value="science">Science Class</option>
                  <option value="english">English Class</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Subject</label>
                <input type="text" style={styles.formInput} />
              </div>
              <div style={styles.formGroup}>
                <label>Message</label>
                <textarea style={{ ...styles.formInput, minHeight: '150px' }}></textarea>
              </div>
              <button type="submit" style={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;