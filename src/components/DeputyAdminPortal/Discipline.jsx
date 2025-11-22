import React, { useState, useEffect } from 'react';

const Discipline = () => {
  // State for our data and UI
const [cases, setCases] = useState([]);
const [filteredCases, setFilteredCases] = useState([]);
const [activeTab, setActiveTab] = useState('all');
const [filters, setFilters] = useState({
status: 'All Status',
grade: 'All Grades',
search: ''
});
const [notification, setNotification] = useState(null);
const [isLoading, setIsLoading] = useState(true);

// Simulate API call to fetch cases
useEffect(() => {
const fetchCases = async () => {
    setIsLoading(true);
    try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data - in a real app this would come from an API
    const mockData = [
        {
        id: 'DC-2023-045',
        student: 'John Mwangi',
        grade: '10',
        incidentType: 'Fighting',
        reportedBy: 'Mr. Kamau',
        date: '15 Nov 2023',
        status: 'In Progress',
        severity: 'Medium'
        },
        {
        id: 'DC-2023-044',
        student: 'Sarah Johnson',
        grade: '11',
        incidentType: 'Bullying',
        reportedBy: 'Ms. Wambui',
        date: '14 Nov 2023',
        status: 'Urgent',
        severity: 'High'
        },
        {
        id: 'DC-2023-043',
        student: 'David Ochieng',
        grade: '9',
        incidentType: 'Vandalism',
        reportedBy: 'Mr. Otieno',
        date: '13 Nov 2023',
        status: 'Resolved',
        severity: 'Low'
        },
        {
        id: 'DC-2023-042',
        student: 'Grace Akinyi',
        grade: '12',
        incidentType: 'Truancy',
        reportedBy: 'Mrs. Adhiambo',
        date: '10 Nov 2023',
        status: 'In Progress',
        severity: 'Medium'
        },
        {
        id: 'DC-2023-041',
        student: 'Peter Mbugua',
        grade: '8',
        incidentType: 'Cheating',
        reportedBy: 'Mr. Njoroge',
        date: '08 Nov 2023',
        status: 'New',
        severity: 'Low'
        }
    ];

    setCases(mockData);
    setFilteredCases(mockData);
    setNotification({ message: 'Cases loaded successfully', type: 'success' });
    } catch (error) {
    setNotification({ message: 'Failed to load cases', type: error });
    } finally {
    setIsLoading(false);
    }
};

fetchCases();
}, []);

// Apply filters whenever they change
useEffect(() => {
let results = [...cases];

// Apply tab filter
switch (activeTab) {
    case 'new':
    results = results.filter(c => c.status === 'New');
    break;
    case 'pending':
    results = results.filter(c => c.status === 'In Progress');
    break;
    case 'resolved':
    results = results.filter(c => c.status === 'Resolved');
    break;
    default:
    // 'all' tab - no filtering needed
    break;
}

// Apply status filter
if (filters.status !== 'All Status') {
    results = results.filter(c => c.status === filters.status);
}

// Apply grade filter
if (filters.grade !== 'All Grades') {
    const gradeNum = filters.grade.replace('Grade ', '');
    results = results.filter(c => c.grade === gradeNum);
}

// Apply search filter
if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    results = results.filter(c => 
    c.student.toLowerCase().includes(searchTerm) || 
    c.id.toLowerCase().includes(searchTerm)
    );
}

setFilteredCases(results);
}, [activeTab, filters, cases]);

// Handle filter changes
const handleFilterChange = (e) => {
const { name, value } = e.target;
setFilters(prev => ({ ...prev, [name]: value }));
};

// Handle case status updates
const updateCaseStatus = (caseId, newStatus) => {
setCases(prevCases => 
    prevCases.map(c => 
    c.id === caseId ? { ...c, status: newStatus } : c
    )
);
setNotification({ 
    message: `Case ${caseId} status updated to ${newStatus}`, 
    type: 'success' 
});
};

// Handle adding a new case
const addNewCase = () => {
const newCase = {
    id: `DC-2023-0${cases.length + 46}`,
    student: 'New Student',
    grade: '10',
    incidentType: 'New Incident',
    reportedBy: 'Staff Member',
    date: new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
    }),
    status: 'New',
    severity: 'Medium'
};

setCases(prev => [newCase, ...prev]);
setNotification({
    message: `New case ${newCase.id} added`,
    type: 'success'
});
};

// View case details (simulated)
const viewCaseDetails = (caseId) => {
setNotification({
    message: `Viewing details for case ${caseId}`,
    type: 'info'
});
};

// Clear notification after timeout
useEffect(() => {
if (notification) {
    const timer = setTimeout(() => {
    setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
}
}, [notification]);

// Styles (same structure as before)
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
    padding: '20px 20px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
},
headerTitle: {
    margin: 0,
    fontSize: '28px'
},
headerSubtitle: {
    margin: '5px 0 0',
    fontSize: '36px',
    opacity: '0.9',
    color: 'white'
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
statBox: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '14px'
},
mainContent: {
    flex: 1,
    padding: '20px'
},
pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
},
pageTitle: {
    color: '#2c3e50',
    marginTop: 0
},
addButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
},
filterCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
},
filterRow: {
    display: 'flex',
    gap: '15px'
},
filterInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    flex: 1
},
filterButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer'
},
casesTable: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
    borderCollapse: 'collapse'
},
tableHeader: {
    backgroundColor: '#34495e',
    color: 'white'
},
tableHeaderCell: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor : '#2c3e50',
    color : 'white'
},
tableRow: {
    borderBottom: '1px solid #ecf0f1'
},
tableCell: {
    padding: '12px 15px'
},
statusBadge: {
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px'
},
actionLink: {
    textDecoration: 'none',
    marginRight: '10px'
},
notification: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 24px',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    color: 'white',
    backgroundColor: type => 
    type === 'error' ? '#e74c3c' :
    type === 'success' ? '#2ecc71' :
    '#3498db'
},
loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#7f8c8d'
}
};

return (
<div style={styles.root}>
    {/* Notification */}
    {notification && (
    <div style={{ 
        ...styles.notification, 
        backgroundColor: styles.notification.backgroundColor(notification.type)
    }}>
        {notification.message}
    </div>
    )}

    {/* Header */}
    <header style={styles.header}>
    <p style={styles.headerSubtitle}>Disciplinary Management</p>
    </header>

    {/* Main Content */}
    <div style={styles.contentWrapper}>
    {/* Sidebar */}
    <aside style={styles.sidebar}>
        <h3 style={styles.sectionTitle}>Disciplinary Actions</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {['all', 'new', 'pending', 'resolved'].map((tab) => (
            <li key={tab} style={{ marginBottom: '10px' }}>
            <a
                href="#"
                style={{
                ...styles.quickLink,
                ...(activeTab === tab && {
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fontWeight: 'bold'
                })
                }}
                onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab);
                }}
            >
                {tab === 'all' && 'All Cases'}
                {tab === 'new' && 'New Cases'}
                {tab === 'pending' && 'Pending Review'}
                {tab === 'resolved' && 'Resolved Cases'}
            </a>
            </li>
        ))}
        </ul>

        <h3 style={styles.sectionTitle}>Quick Stats</h3>
        <div style={{ ...styles.statBox, backgroundColor: '#fff9e6', borderLeft: '4px solid #f1c40f' }}>
        <p style={{ margin: 0 }}>
            <strong>{cases.filter(c => c.status !== 'Resolved').length}</strong> active cases
        </p>
        </div>
        <div style={{ ...styles.statBox, backgroundColor: '#e8f4f8', borderLeft: '4px solid #3498db' }}>
        <p style={{ margin: 0 }}>
            <strong>{cases.filter(c => c.status === 'Urgent').length}</strong> urgent cases
        </p>
        </div>
        <div style={{ ...styles.statBox, backgroundColor: '#e8f8f0', borderLeft: '4px solid #2ecc71' }}>
        <p style={{ margin: 0 }}>
            <strong>
            
            </strong> cases resolved
        </p>
        </div>
    </aside>

    {/* Main Content Area */}
    <main style={styles.mainContent}>
        <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>Disciplinary Cases</h2>
        <button 
            style={styles.addButton}
            onClick={addNewCase}
            disabled={isLoading}
        >
            + Add New Case
        </button>
        </div>

        {/* Filter Controls */}
        <div style={styles.filterCard}>
        <h3 style={{ ...styles.sectionTitle, marginTop: 0, fontSize: '16px' }}>Filter Cases</h3>
        <div style={styles.filterRow}>
            <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            style={styles.filterInput}
            disabled={isLoading}
            >
            <option>All Status</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Urgent</option>
            </select>
            
            <select
            name="grade"
            value={filters.grade}
            onChange={handleFilterChange}
            style={styles.filterInput}
            disabled={isLoading}
            >
            <option>All Grades</option>
            {[7, 8, 9, 10, 11, 12].map(grade => (
                <option key={grade}>Grade {grade}</option>
            ))}
            </select>
            
            <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search student or case ID"
            style={styles.filterInput}
            disabled={isLoading}
            />
            
            <button
            style={styles.filterButton}
            disabled={isLoading}
            >
            Apply Filters
            </button>
        </div>
        </div>

        {/* Cases Table */}
        {isLoading ? (
        <div style={styles.loadingIndicator}>
            Loading cases...
        </div>
        ) : filteredCases.length > 0 ? (
        <table style={styles.casesTable}>
            <thead>
            <tr style={styles.tableHeader}>
                {['Case ID', 'Student', 'Grade', 'Incident Type', 'Reported By', 'Date', 'Status', 'Actions'].map(header => (
                <th key={header} style={styles.tableHeaderCell}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {filteredCases.map((caseItem) => {
                const statusColors = {
                'New': { bg: '#3498db', text: 'white' },
                'In Progress': { bg: '#f1c40f', text: 'black' },
                'Resolved': { bg: '#2ecc71', text: 'white' },
                'Urgent': { bg: '#e74c3c', text: 'white' }
                };
                
                return (
                <tr key={caseItem.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{caseItem.id}</td>
                    <td style={styles.tableCell}>{caseItem.student}</td>
                    <td style={styles.tableCell}>{caseItem.grade}</td>
                    <td style={styles.tableCell}>{caseItem.incidentType}</td>
                    <td style={styles.tableCell}>{caseItem.reportedBy}</td>
                    <td style={styles.tableCell}>{caseItem.date}</td>
                    <td style={styles.tableCell}>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusColors[caseItem.status]?.bg || '#95a5a6',
                        color: statusColors[caseItem.status]?.text || 'white'
                    }}>
                        {caseItem.status}
                    </span>
                    </td>
                    <td style={styles.tableCell}>
                    <button
                        style={{ ...styles.actionLink, border: 'none', background: 'none', cursor: 'pointer' }}
                        onClick={() => viewCaseDetails(caseItem.id)}
                    >
                        View
                    </button>
                    {caseItem.status !== 'Resolved' ? (
                        <button
                        style={{ 
                            ...styles.actionLink, 
                            color: '#e74c3c',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }}
                        onClick={() => updateCaseStatus(caseItem.id, 'Resolved')}
                        >
                        Resolve
                        </button>
                    ) : (
                        <button
                        style={{ 
                            ...styles.actionLink, 
                            color: '#3498db',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }}
                        onClick={() => updateCaseStatus(caseItem.id, 'In Progress')}
                        >
                        Reopen
                        </button>
                    )}
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        ) : (
        <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
            No cases found matching your criteria
        </div>
        )}
    </main>
    </div>
</div>
);
};

export default Discipline;