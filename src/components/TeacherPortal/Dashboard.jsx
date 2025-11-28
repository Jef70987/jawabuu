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
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    const calendarDays = [];
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} className="text-center font-semibold py-2 bg-gray-100 rounded text-xs lg:text-sm">
          {day}
        </div>
      );
    });
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-16 lg:h-20 p-1 bg-white rounded shadow-sm"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`h-16 lg:h-20 p-1 rounded shadow-sm relative ${
            isToday ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          <div className="font-semibold mb-1 text-xs lg:text-sm">{day}</div>
          {day % 5 === 0 && <div className="w-1.5 h-1.5 bg-green-500 rounded-full mx-auto"></div>}
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

  return (
    <div className="flex-1 bg-gray-50 text-gray-800 overflow-hidden flex flex-col max-h-screen">
      {/* Main Content Area with Scroll (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden max-h-full">
        <div className="w-full max-w-full">
          {/* Header */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 md:py-6 mb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <img 
                src="../assets/images/images (5).png" 
                alt="Profile" 
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome, Dr. Sarah Johnson</h1>
                <p className="text-gray-600">Mathematics Department</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-700 font-medium">{currentDate}</p>
              <p className="text-gray-600">{currentTime}</p>
            </div>
          </header>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center">
              <div className="text-gray-600 text-sm md:text-base">Classes Today</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{stats.classesToday}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center">
              <div className="text-gray-600 text-sm md:text-base">Pending Tasks</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{stats.pendingTasks}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center">
              <div className="text-gray-600 text-sm md:text-base">Students</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{stats.students}</div>
            </div>
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center">
              <div className="text-gray-600 text-sm md:text-base">Upcoming Events</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 my-2">{stats.upcomingEvents}</div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
            <button 
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:transform hover:-translate-y-1"
              onClick={() => openModal('add-task')}
            >
              <span className="text-2xl mb-2">+</span>
              <span className="text-sm font-medium">Add Task</span>
            </button>
            <button 
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:transform hover:-translate-y-1"
              onClick={() => openModal('add-event')}
            >
              <span className="text-2xl mb-2">📅</span>
              <span className="text-sm font-medium">Add Event</span>
            </button>
            <button 
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:transform hover:-translate-y-1"
              onClick={() => openModal('grade-work')}
            >
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium">Grade Work</span>
            </button>
            <button 
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:transform hover:-translate-y-1"
              onClick={() => openModal('send-message')}
            >
              <span className="text-2xl mb-2">✉️</span>
              <span className="text-sm font-medium">Send Message</span>
            </button>
          </div>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Teaching Schedule */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <div className="text-lg font-semibold text-gray-800">Teaching Schedule</div>
                <div className="text-blue-500 text-sm cursor-pointer" onClick={() => openModal('full-schedule')}>
                  View All
                </div>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-b-0">
                    <div className="font-semibold text-gray-800">{item.day}</div>
                    <div className="text-right">
                      <div className="text-blue-500 text-sm">{item.time}</div>
                      <div className="text-gray-500 text-xs">{item.subject} - Room {item.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tasks */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <div className="text-lg font-semibold text-gray-800">Pending Tasks</div>
                <div className="text-blue-500 text-sm cursor-pointer" onClick={() => openModal('all-tasks')}>
                  View All
                </div>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center py-2 border-b border-dashed border-gray-100 last:border-b-0">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 h-4 w-4 text-blue-500 rounded focus:ring-blue-400"
                    />
                    <div className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500">Due: {task.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Events */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <div className="text-lg font-semibold text-gray-800">Upcoming Events</div>
                <div className="text-blue-500 text-sm cursor-pointer" onClick={() => openModal('all-events')}>
                  View All
                </div>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {events.map(event => (
                  <div key={event.id} className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-b-0">
                    <div className="font-semibold text-gray-800">{event.date}</div>
                    <div className="text-right">
                      <div className="text-blue-500 text-sm">{event.time}</div>
                      <div className="text-gray-700">{event.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  onClick={prevMonth}
                >
                  Previous
                </button>
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  onClick={nextMonth}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {renderCalendar()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {/* Add Task Modal */}
      {activeModal === 'add-task' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Add New Task</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form onSubmit={handleAddTask}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Task Title</label>
                  <input 
                    type="text" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.due}
                    onChange={(e) => setNewTask({...newTask, due: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Notes</label>
                  <textarea 
                    value={newTask.notes}
                    onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Event Modal */}
      {activeModal === 'add-event' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Add New Event</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form onSubmit={handleAddEvent}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Event Title</label>
                  <input 
                    type="text" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Time</label>
                  <input 
                    type="time" 
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                  <textarea 
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Add Event
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Grade Work Modal */}
      {activeModal === 'grade-work' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Grade Student Work</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form onSubmit={handleGradeSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Class</label>
                  <select 
                    value={gradeData.class}
                    onChange={(e) => setGradeData({...gradeData, class: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Assignment</label>
                  <select 
                    value={gradeData.assignment}
                    onChange={(e) => setGradeData({...gradeData, assignment: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Assignment</option>
                    <option value="quiz1">Quiz 1</option>
                    <option value="quiz2">Quiz 2</option>
                    <option value="midterm">Midterm Exam</option>
                    <option value="final">Final Exam</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Upload Grades (CSV)</label>
                  <input 
                    type="file" 
                    accept=".csv"
                    onChange={(e) => setGradeData({...gradeData, file: e.target.files[0]})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Submit Grades
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Send Message Modal */}
      {activeModal === 'send-message' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Send Message</div>
                <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={closeModal}>&times;</button>
              </div>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Recipient</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Recipient</option>
                    <option value="all">All Students</option>
                    <option value="math">Math Class</option>
                    <option value="science">Science Class</option>
                    <option value="english">English Class</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Subject</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Message</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;