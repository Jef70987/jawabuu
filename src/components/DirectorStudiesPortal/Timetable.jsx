import React, { useState } from 'react';

// CSS styles as JavaScript variables
const styles = {
    container: {
        Width: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    heading: {
        color: '#333',
        justifyContent:'center',
        textAlign:'center'
    },
    controls: {
        backgroundColor: '#e9f7fe',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
    },
    controlGroup: {
        marginBottom: '10px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        padding: '8px',
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    button: {
        padding: '8px',
        width: '100%',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        gridColumn: 'span 2',
        marginTop: '10px'
    },
    buttonHover: {
        backgroundColor: '#45a049'
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px'
    },
    tableCell: {
        padding: '8px',
        textAlign: 'center',
        transform:"rotate(-40deg)",
        transformOrigin:"left-center",
        fontSize: "10px",
        borderBottom: "1px solid skyblue",
    },
    tableHeader: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        textAlign: 'center',
        transform:"rotate(-40deg)",
        transformOrigin:"left-center",
        fontSize: "10px",
        border: "1px solid skyblue",
    },
    breakCell: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        border: "1px solid green",
    },
    headerCell: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        border: "2px solid skyblue",
    },
    editableCell: {
        cursor: 'pointer'
    },
    editableCellHover: {
        backgroundColor: '#f0f8ff'
    },
    specialActivity: {
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontWeight: 'bold',
        border: "1px solid green",
    },
    meetingCell: {
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontWeight: 'bold',
        border: "1px solid green",
    },
    timetableOutput: {
        marginTop: '20px'
    }
    };

    const Timetable = () => {

        const afternoonActivities = [
            'Games','cleaning','clubs','sports','music','debate','community service'
        ];
    const [formData, setFormData] = useState({
        subjects: 'Math, Eng, Biology, Chemistry, Kiswahili, History, C.R.E, Physics, Agric, Geography, Home Science, Comp Studies, PE',
        startTime: '07:00',
        endTime: '16:00',
        classDuration: 40,
        meetingDuration: 30,
        shortBreakTime: '10:00',
        shortBreakDuration: 30,
        lunchTime: '13:00',
        lunchDuration: 40,
        randomActivities: true
    });

    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const timeStrToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'Pm' : 'Am';
        const displayHours = hours > 12 ? hours - 12 : hours;
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    };
    const getRandomActivity = () => {
        return afternoonActivities [Math.floor(Math.random() * afternoonActivities.length)];
    };

    const generateTimetable = async () => {
        setLoading(true);
        
        try {
        /* Simulated API call to save configuration
        const configResponse = await fetch('/api/timetable/config', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!configResponse.ok) {
            throw new Error('Failed to save timetable configuration');
        }
        */

        const subjects = formData.subjects.split(',').map(sub => sub.trim()).filter(sub => sub);
        
        if (subjects.length === 0) {
            alert("Please enter at least one subject");
            return;
        }

        const startTime = timeStrToMinutes(formData.startTime);
        const endTime = timeStrToMinutes(formData.endTime);
        const shortBreakTime = timeStrToMinutes(formData.shortBreakTime);
        const lunchTime = timeStrToMinutes(formData.lunchTime);

        const timeSlots = [];
        let currentTime = startTime;

        if (formData.meetingDuration > 0) {
            timeSlots.push({
            start: currentTime,
            end: currentTime + formData.meetingDuration,
            isMeeting: true,
            name: 'Morning Prep'
            });
            currentTime += formData.meetingDuration;
        }

        while (currentTime < endTime) {
            if (currentTime <= shortBreakTime && currentTime + formData.classDuration > shortBreakTime) {
            if (currentTime < shortBreakTime) {
                timeSlots.push({
                start: currentTime,
                end: shortBreakTime,
                isClass: true
                });
            }
            timeSlots.push({
                start: shortBreakTime,
                end: shortBreakTime + formData.shortBreakDuration,
                isBreak: true,
                name: 'Short Break'
            });
            currentTime = shortBreakTime + formData.shortBreakDuration;
            continue;
            }

            if (currentTime <= lunchTime && currentTime + formData.classDuration > lunchTime) {
            if (currentTime < lunchTime) {
                timeSlots.push({
                start: currentTime,
                end: lunchTime,
                isClass: true
                });
            }
            timeSlots.push({
                start: lunchTime,
                end: lunchTime + formData.lunchDuration,
                isBreak: true,
                name: 'Lunch Break'
            });
            currentTime = lunchTime + formData.lunchDuration;
            continue;
            }

            if (currentTime + formData.classDuration >= endTime - 60 && currentTime < endTime) {
            if (currentTime < endTime - 60) {
                timeSlots.push({
                start: currentTime,
                end: endTime - 60,
                isClass: true
                });
            }
            const activity = formData.randomActivities ? getRandomActivity() : formData.afternoonActivity
            timeSlots.push({
                start: endTime - 60,
                end: endTime,
                isActivity: true,
                name: activity
            });
            currentTime = endTime;
            continue;
            }

            const endTimeForSlot = Math.min(currentTime + formData.classDuration, endTime);
            if (currentTime < endTimeForSlot) {
            timeSlots.push({
                start: currentTime,
                end: endTimeForSlot,
                isClass: true
            });
            }
            currentTime += formData.classDuration;
        }

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timetableData = {
            config: formData,
            days: days.map(day => ({
            name: day,
            slots: timeSlots.map(slot => {
                if (slot.isMeeting || slot.isBreak || slot.isActivity) {
                return {
                    time: `${formatTime(slot.start)} - ${formatTime(slot.end)}`,
                    type: slot.isMeeting ? 'meeting' : slot.isBreak ? 'break' : 'activity',
                    content: slot.name,
                    editable: false
                };
                } else {
                return {
                    time: `${formatTime(slot.start)} - ${formatTime(slot.end)}`,
                    type: 'class',
                    content: subjects[Math.floor(Math.random() * subjects.length)],
                    editable: true
                };
                }
            })
            }))
        };

        /* Simulated API call to save timetable
        const saveResponse = await fetch('/api/timetable', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(timetableData)
        });
        
        if (!saveResponse.ok) {
            throw new Error('Failed to save timetable');
        }
        */

        setTimetable(timetableData);
        } catch (error) {
        console.error('Error generating timetable:', error);
        alert('Error generating timetable. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    const handleCellChange = (dayIndex, slotIndex, newValue) => {
        setTimetable(prev => {
        const updated = { ...prev };
        updated.days[dayIndex].slots[slotIndex].content = newValue;
        return updated;
        });
    };

    /* Simulated function to fetch timetable
    const fetchTimetable = async () => {
        try {
        const response = await fetch('/api/timetable');
        if (!response.ok) {
            throw new Error('Failed to fetch timetable');
        }
        const data = await response.json();
        setTimetable(data);
        } catch (error) {
        console.error('Error fetching timetable:', error);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, []);
    */

    return (
        <div style={styles.container}>
        <h1 style={styles.heading}>Academic Timetable Generator</h1>
        
        <div style={styles.controls}>
            <div style={styles.controlGroup}>
            <label style={styles.label}>Subjects (comma separated):</label>
            <input 
                type="text" 
                name="subjects" 
                value={formData.subjects}
                onChange={handleChange}
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>School Start Time:</label>
            <input 
                type="time" 
                name="startTime" 
                value={formData.startTime}
                onChange={handleChange}
                step="300"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>School End Time:</label>
            <input 
                type="time" 
                name="endTime" 
                value={formData.endTime}
                onChange={handleChange}
                step="300"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Class Duration (minutes):</label>
            <input 
                type="number" 
                name="classDuration" 
                value={formData.classDuration}
                onChange={handleChange}
                min="10" 
                max="120"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Morning Meeting Duration (minutes):</label>
            <input 
                type="number" 
                name="meetingDuration" 
                value={formData.meetingDuration}
                onChange={handleChange}
                min="0" 
                max="120"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Short Break Time:</label>
            <input 
                type="time" 
                name="shortBreakTime" 
                value={formData.shortBreakTime}
                onChange={handleChange}
                step="300"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Short Break Duration (minutes):</label>
            <input 
                type="number" 
                name="shortBreakDuration" 
                value={formData.shortBreakDuration}
                onChange={handleChange}
                min="5" 
                max="60"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Lunch Time:</label>
            <input 
                type="time" 
                name="lunchTime" 
                value={formData.lunchTime}
                onChange={handleChange}
                step="300"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Lunch Duration (minutes):</label>
            <input 
                type="number" 
                name="lunchDuration" 
                value={formData.lunchDuration}
                onChange={handleChange}
                min="20" 
                max="90"
                style={styles.input}
            />
            </div>
            
            <div style={styles.controlGroup}>
            <label style={styles.label}>Afternoon Activity:</label>
            <select 
                name="afternoonActivity" 
                value={formData.afternoonActivity}
                onChange={handleChange}
                style={styles.input}
            >
                <option value="Games">Games</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Clubs">Clubs</option>
                <option value="Study">Study Time</option>
            </select>
            </div>
            
            <button 
            onClick={generateTimetable} 
            disabled={loading}
            style={{
                ...styles.button,
                ...(hoveredButton && !loading ? styles.buttonHover : {}),
                ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            >
            {loading ? 'Generating...' : 'Generate Timetable'}
            </button>
        </div>
        
        {timetable && (
            <div style={styles.timetableOutput}>
            <h2 style={styles.heading}>Term 1 Timetable Grade 10</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.tableHeader}>Days</th>
                    {timetable.days[0].slots.map((slot, i) => (
                    <th key={i} style={styles.tableHeader}>{slot.time}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {timetable.days.map((day, dayIndex) => (
                    <tr key={dayIndex}>
                    <td style={styles.headerCell}>{day.name}</td>
                    {day.slots.map((slot, slotIndex) => (
                        <td 
                        key={slotIndex}
                        style={{
                            ...styles.tableCell,
                            ...(slot.type === 'break' ? styles.breakCell : {}),
                            ...(slot.type === 'meeting' ? styles.meetingCell : {}),
                            ...(slot.type === 'activity' ? styles.specialActivity : {}),
                            ...(slot.editable ? styles.editableCell : {})
                        }}
                        contentEditable={slot.editable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleCellChange(dayIndex, slotIndex, e.target.textContent)}
                        onMouseEnter={slot.editable ? (e) => e.currentTarget.style.backgroundColor = styles.editableCellHover.backgroundColor : null}
                        onMouseLeave={slot.editable ? (e) => e.currentTarget.style.backgroundColor = '' : null}
                        >
                        {slot.content}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Simulated save button with API call
            <button 
                style={{
                ...styles.button,
                marginTop: '20px'
                }}
                onClick={async () => {
                try {
                    const response = await fetch('/api/timetable/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(timetable)
                    });
                    
                    if (response.ok) {
                    alert('Timetable saved successfully!');
                    } else {
                    throw new Error('Failed to save timetable');
                    }
                } catch (error) {
                    console.error('Error saving timetable:', error);
                    alert('Error saving timetable. Please try again.');
                }
                }}
            >
                Save Timetable
            </button>
            */}
            </div>
        )}
        </div>
    );
};

export default Timetable;