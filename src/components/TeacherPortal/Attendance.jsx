import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Save, Delete, Edit, Add, FileDownload } from '@mui/icons-material';

// API Simulation Service
const apiService = {
  baseUrl: 'https://your-api-endpoint.com/api', // Replace with your actual API URL

async fetchStudents() {
try {
    // Simulate API call - replace with actual fetch/axios call
    console.log('Fetching students from API...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would be:
    // const response = await fetch(`${this.baseUrl}/students`);
    // if (!response.ok) throw new Error('Failed to fetch');
    // return await response.json();
    
    const savedData = localStorage.getItem('attendance-students');
    return savedData ? JSON.parse(savedData) : [];
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
},

async saveStudents(students) {
try {
    // Simulate API call - replace with actual fetch/axios call
    console.log('Saving students to API...');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real implementation, this would be:
    // const response = await fetch(`${this.baseUrl}/students`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(students)
    // });
    // if (!response.ok) throw new Error('Failed to save');
    // return await response.json();
    
    localStorage.setItem('attendance-students', JSON.stringify(students));
    return { success: true };
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
},

async addStudent(student) {
try {
    // Simulate API call
    console.log('Adding student via API...');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Real implementation would POST to your API
    const savedData = localStorage.getItem('attendance-students');
    const existingStudents = savedData ? JSON.parse(savedData) : [];
    const updatedStudents = [...existingStudents, student];
    localStorage.setItem('attendance-students', JSON.stringify(updatedStudents));
    return student;
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
},

async updateStudent(updatedStudent) {
try {
    // Simulate API call
    console.log('Updating student via API...');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Real implementation would PUT to your API
    const savedData = localStorage.getItem('attendance-students');
    const existingStudents = savedData ? JSON.parse(savedData) : [];
    const updatedStudents = existingStudents.map(s => 
    s.id === updatedStudent.id ? updatedStudent : s
    );
    localStorage.setItem('attendance-students', JSON.stringify(updatedStudents));
    return updatedStudent;
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
},

async deleteStudent(id) {
try {
    // Simulate API call
    console.log('Deleting student via API...');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Real implementation would DELETE to your API
    const savedData = localStorage.getItem('attendance-students');
    const existingStudents = savedData ? JSON.parse(savedData) : [];
    const updatedStudents = existingStudents.filter(s => s.id !== id);
    localStorage.setItem('attendance-students', JSON.stringify(updatedStudents));
    return { success: true };
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
},

async updateAttendance(studentId, date, status) {
try {
    // Simulate API call
    console.log('Updating attendance via API...');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Real implementation would PATCH to your API
    const savedData = localStorage.getItem('attendance-students');
    const existingStudents = savedData ? JSON.parse(savedData) : [];
    const updatedStudents = existingStudents.map(student => {
    if (student.id === studentId) {
        return {
        ...student,
        attendance: {
            ...student.attendance,
            [date.toISOString()]: status
        }
        };
    }
    return student;
    });
    localStorage.setItem('attendance-students', JSON.stringify(updatedStudents));
    return { success: true };
} catch (error) {
    console.error('API Error:', error);
    throw error;
}
}
};

function Attendance() {
// State management
const [students, setStudents] = useState([]);
const [currentMonth, setCurrentMonth] = useState(new Date());
const [newStudentName, setNewStudentName] = useState('');
const [editingStudentId, setEditingStudentId] = useState(null);
const [editStudentName, setEditStudentName] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [successMessage, setSuccessMessage] = useState(null);

// Date calculations
const monthStart = startOfMonth(currentMonth);
const monthEnd = endOfMonth(currentMonth);
const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });



// Load initial data
useEffect(() => {
const loadData = async () => {
    try {
    setLoading(true);
    const data = await apiService.fetchStudents();
    setStudents(data);
    setLoading(false);
    showSuccess('Student data loaded successfully');
    } catch (err) {
    setError('Failed to load student data. Please try again later.',err);
    setLoading(false);
    }
};
loadData();
}, []);

// Helper function to show success messages
const showSuccess = (message) => {
setSuccessMessage(message);
setTimeout(() => setSuccessMessage(null), 3000);
};

// Student CRUD operations
const addStudent = async () => {
if (!newStudentName.trim()) {
    setError('Please enter a student name');
    return;
}

const newStudent = {
    id: uuidv4(),
    name: newStudentName.trim(),
    attendance: {}
};

try {
    const addedStudent = await apiService.addStudent(newStudent);
    setStudents([...students, addedStudent]);
    setNewStudentName('');
    showSuccess('Student added successfully');
    setError(null);
} catch (err) {
    setError('Failed to add student. Please try again.',err);
}
};

const deleteStudent = async (id) => {
try {
    await apiService.deleteStudent(id);
    setStudents(students.filter(student => student.id !== id));
    showSuccess('Student deleted successfully');
} catch (err) {
    setError('Failed to delete student. Please try again.',err);
}
};

const startEditing = (student) => {
setEditingStudentId(student.id);
setEditStudentName(student.name);
};

const saveEdit = async () => {
if (!editStudentName.trim()) {
    setError('Please enter a student name');
    return;
}

try {
    const updatedStudent = {
    ...students.find(s => s.id === editingStudentId),
    name: editStudentName.trim()
    };
    
    await apiService.updateStudent(updatedStudent);
    setStudents(students.map(student => 
    student.id === editingStudentId ? updatedStudent : student
    ));
    setEditingStudentId(null);
    showSuccess('Student updated successfully');
    setError(null);
} catch (err) {
    setError('Failed to update student. Please try again.',err);
}
};

// Attendance operations
const markAttendance = async (studentId, date, status) => {
try {
    await apiService.updateAttendance(studentId, date, status);
    setStudents(students.map(student => {
    if (student.id === studentId) {
        return {
        ...student,
        attendance: {
            ...student.attendance,
            [date.toISOString()]: status
        }
        };
    }
    return student;
    }));
} catch (err) {
    setError('Failed to update attendance. Please try again.',err);
}
};

const getAttendanceStatus = (student, date) => {
return student.attendance[date.toISOString()] || 'absent';
};

// Statistics calculations
const getAttendanceStats = () => {
return students.map(student => {
    const attendanceDays = Object.values(student.attendance)
    .filter(status => status === 'present' || status === 'late').length;
    const totalDays = monthDays.length;
    const percentage = totalDays > 0 ? Math.round((attendanceDays / totalDays) * 100) : 0;
    
    return {
    name: student.name,
    present: attendanceDays,
    absent: totalDays - attendanceDays,
    percentage
    };
});
};

// Month navigation
const changeMonth = (months) => {
const newMonth = new Date(currentMonth);
newMonth.setMonth(newMonth.getMonth() + months);
setCurrentMonth(newMonth);
};

// CSV export
const getCSVData = () => {
const headers = [
    { label: 'Student Name', key: 'name' },
    ...monthDays.map(day => ({
    label: format(day, 'MMM dd'),
    key: format(day, 'yyyy-MM-dd')
    }))
];

const data = students.map(student => {
    const row = { name: student.name };
    monthDays.forEach(day => {
    row[format(day, 'yyyy-MM-dd')] = student.attendance[day.toISOString()] || 'absent';
    });
    return row;
});

return { headers, data };
};

const { headers, data } = getCSVData();


// Styles
const styles = {
    app: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    monthNavigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: '20px 0'
    },
    button: {
        background: '#2196f3',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '14px',
        transition: 'background-color 0.3s',
        ':hover': {
        backgroundColor: '#0b7dda'
        }
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '20px',
        flexWrap: 'wrap'
    },
    addStudent: {
        display: 'flex',
        gap: '10px',
        flexGrow: 1,
        minWidth: '300px'
    },
    input: {
        flexGrow: 1,
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        ':focus': {
        outline: 'none',
        borderColor: '#2196f3',
        boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.2)'
        }
    },
    attendanceContainer: {
        display: 'flex',
        gap: '20px',
        '@media (maxwidth: 768px)': {
        flexDirection: 'column'
        }
    },
    studentsList: {
        minWidth: '250px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    attendanceGrid: {
        flexGrow: 1,
        overflowX: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
    },
    th: {
        padding: '12px 8px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        fontWeight: '600'
    },
    td: {
        padding: '12px 8px',
        textAlign: 'center',
        borderBottom: '1px solid #eee'
    },
    attendanceCell: {
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.2s',
        ':hover': {
        transform: 'scale(1.1)'
        }
    },
    presentCell: {
        backgroundColor: '#4caf50',
        color: 'white'
    },
    lateCell: {
        backgroundColor: '#ff9800',
        color: 'white'
    },
    absentCell: {
        backgroundColor: '#f44336',
        color: 'white'
    },
    todayCell: {
        border: '2px solid #2196f3'
    },
    editForm: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center'
    },
    studentItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #eee'
    },
    studentActions: {
        display: 'flex',
        gap: '5px'
    },
    stats: {
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px solid #eee'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#666'
    },
    error: {
        color: '#f44336',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffebee',
        borderRadius: '4px',
        margin: '20px 0'
    },
    success: {
        color: '#4caf50',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#e8f5e9',
        borderRadius: '4px',
        margin: '20px 0'
    },
    studentListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
    },
    
};
if (loading) {
return (
    <div style={styles.app}>
    <div style={styles.loading}>Loading student data...</div>
    </div>
);
}
return (
<div style={styles.app}>
    <div style={styles.header}>
    <h1>Student Attendance Tracker</h1>
    <div style={styles.monthNavigation}>
        <button 
        style={styles.button} 
        onClick={() => changeMonth(-1)}
        disabled={loading}
        >
        &lt; Prev Month
        </button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button 
        style={styles.button} 
        onClick={() => changeMonth(1)}
        disabled={loading}
        >
        Next Month &gt;
        </button>
    </div>
    </div>

    {error && <div style={styles.error}>{error}</div>}
    {successMessage && <div style={styles.success}>{successMessage}</div>}

    <div style={styles.controls}>
    <div style={styles.addStudent}>
        <input
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="Enter student name"
        style={styles.input}
        disabled={loading}
        />
        <button 
        style={styles.button} 
        onClick={addStudent}
        disabled={loading}
        >
        <Add /> Add Student
        </button>
    </div>

    <CSVLink 
        data={data} 
        headers={headers} 
        filename={`attendance-${format(currentMonth, 'yyyy-MM')}.csv`}
        style={{ 
        ...styles.button, 
        textDecoration: 'none',
        opacity: students.length === 0 ? 0.5 : 1,
        pointerEvents: students.length === 0 ? 'none' : 'auto'
        }}
    >
        <FileDownload /> Export to CSV
    </CSVLink>
    </div>

    <div style={styles.attendanceContainer}>
    <div style={styles.studentsList}>
        <div style={styles.studentListHeader}>
        <h3>Students ({students.length})</h3>
        </div>
        
        {students.length === 0 ? (
        <p>No students added yet. Add students to begin tracking attendance.</p>
        ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {students.map(student => (
            <li key={student.id} style={styles.studentItem}>
                {editingStudentId === student.id ? (
                <div style={styles.editForm}>
                    <input
                    type="text"
                    value={editStudentName}
                    onChange={(e) => setEditStudentName(e.target.value)}
                    style={{ ...styles.input, flexGrow: 1 }}
                    disabled={loading}
                    />
                    <button 
                    style={styles.smallButton} 
                    onClick={saveEdit}
                    disabled={loading}
                    >
                    <Save /> Save
                    </button>
                </div>
                ) : (
                <>
                    <span>{student.name}</span>
                    <div style={styles.studentActions}>
                    <button 
                        style={styles.smallButton} 
                        onClick={() => startEditing(student)}
                        disabled={loading}
                    >
                        <Edit /> Edit
                    </button>
                    <button 
                        style={{ ...styles.smallButton, ...styles.dangerButton }} 
                        onClick={() => deleteStudent(student.id)}
                        disabled={loading}
                    >
                        <Delete /> Delete
                    </button>
                    </div>
                </>
                )}
            </li>
            ))}
        </ul>
        )}

        {students.length > 0 && (
        <div style={styles.stats}>
            <h3>Monthly Attendance Statistics</h3>
            <table style={styles.table}>
            <thead>
                <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Present</th>
                <th style={styles.th}>Absent</th>
                <th style={styles.th}>Percentage</th>
                </tr>
            </thead>
            <tbody>
                {getAttendanceStats().map(stat => (
                <tr key={stat.name}>
                    <td style={styles.td}>{stat.name}</td>
                    <td style={styles.td}>{stat.present}</td>
                    <td style={styles.td}>{stat.absent}</td>
                    <td style={styles.td}>{stat.percentage}%</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </div>

    <div style={styles.attendanceGrid}>
        {students.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Add students to view and mark attendance</p>
        </div>
        ) : (
        <>
            <h3>Attendance Grid</h3>
            <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Student</th>
                    {monthDays.map(day => (
                    <th key={day.toISOString()} style={styles.th}>
                        {format(day, 'EEE')}<br />
                        {format(day, 'dd')}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                    <td style={styles.td}>{student.name}</td>
                    {monthDays.map(day => {
                        const status = getAttendanceStatus(student, day);
                        const isToday = isSameDay(day, new Date());
                        
                        return (
                        <td 
                            key={day.toISOString()} 
                            style={{
                            ...styles.td,
                            ...styles.attendanceCell,
                            ...(status === 'present' && styles.presentCell),
                            ...(status === 'late' && styles.lateCell),
                            ...(status === 'absent' && styles.absentCell),
                            ...(isToday && styles.todayCell)
                            }}
                            onClick={() => {
                            if (loading) return;
                            const newStatus = 
                                status === 'present' ? 'late' :
                                status === 'late' ? 'absent' : 'present';
                            markAttendance(student.id, day, newStatus);
                            }}
                        >
                            {status.charAt(0).toUpperCase()}
                        </td>
                        );
                    })}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </>
        )}
    </div>
    </div>
</div>
);
}

export default Attendance;