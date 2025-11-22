import React from "react";


const Timetable = () => {
    const TimetableData = {
        
        sessions: [
            {id: 1, code: "M",name: "morning"},
            {id: 2, code: "b1",name: "Break"},
            {id: 3, code: "N1",name: "Noon1"},
            {id: 4, code: "b2",name: "Break2"},
            {id: 5, code: "N2",name: "Noon2"},
            {id: 6, code: "L",name: "Lunch"},
            {id: 7, code: "AN",name: "AfterNoon"},
            {id: 8, code: "B3",name: "End"}
        ],

        TimeData : [
            {id: 1,time: "8:00 Am - 8:40 Am",},
            {id: 2,time: "8:40 Am - 9:20 Am",},
            {id: 3,time: "9:20 Am - 10:00 Am",},
            {id: 12,time: "",},
            {id: 4,time: "10:40 Am - 11:20 Am",},
            {id: 5,time: "11:20 Am - 11:40 Am",},
            {id: 12,time: "",},
            {id: 6,time: "11:40 Am - 12:20 Pm",},
            {id: 7,time: "12:20 Pm - 1:20 Pm",},
            {id: 12,time: "",},
            {id: 8,time: "2:00 Pm - 2:40 Pm",},
            {id: 9,time: "2:40 Pm - 3:20 Pm",},
            {id: 10,time: "3:20 Pm- 4:00 Pm",},
            {id: 11,time: "4:00 Pm - 4:30 Pm",},
        ],
        Days : [
            {id: 1, day: "monday",subject1: "Math",subject2: "Eng",subject3: "Biology",subject12: "break",subject4: "History",subject5: "Chemistry",subject6: "P.E",subject7: "Agric",subject8: "Biology",subject9: "Geography",subject10: "Home science",subject11: "Games"},
            {id: 2, day: "Tuesday",subject1: "Chemistry",subject2: "Biology",subject3: "Math",subject12: "break",subject4: "Eng",subject5: "Math",subject6: "Math",subject7: "Math",subject8: "Math",subject9: "Math",subject10: "Biology",subject11: "Clubs"},
            {id: 3, day: "Wednesday",subject1: "Kiswahili",subject2: "Math",subject3: "Eng",subject12: "break",subject4: "C.R.E",subject5: "Physics",subject6: "Agric",subject7: "P.E",subject8: "Chemistry",subject9: "Biology",subject10: "History",subject11: "Games"},
            {id: 4, day: "Thursday",subject1: "Math",subject2: "Math",subject3: "Chemistry",subject12: "break",subject4: "Eng",subject5: "Kiswahili",subject6: "Geography",subject7: "Biology",subject8: "History",subject9: "Home Science",subject10: "Comp Studies",subject11: "Cleaning"},
            {id: 5, day: "Friday",subject1: "Math",subject2: "Math",subject3: "Math",subject12: "break",subject4: "Math",subject5: "Math",subject6: "Math",subject7: "Math",subject8: "Math",subject9: "Math",subject10: "Math",subject11: "Games"},
            {id: 6, day: "saturday",subject1: "Math",subject2: "Math",subject3: "Math",subject12: "break",subject4: "Math",subject5: "Math",subject6: "Math",subject7: "Math",subject8: "Math",subject9: "Math",subject10: "Math",subject11: "Group Discussion"},
        ],
        Events : [
            {id: 1,Day: "Mon",},

        ]

    };
    const styles = {
        timetable: {
            padding:'20px',
            border: '2px solid skyblue',
            borderRadius: '8px',
            minHeight: '300px',
            height: 'fit-content',
            width: '80vw'
        },
        timetableData: {
            transform:"rotate(-40deg)",
            transformOrigin:"left-center",
            
            fontSize: "10px",
            border: "none"
        },
    };

return(
    <div className="content">
        <h3> Timetable</h3>
        <table style={styles.timetable}>
            <tr>
                <th colSpan={TimetableData.TimeData.length + 1} style={{textAlign:"center",}}> Term1 timetable Grade 10</th>
            </tr>
            <tr>
                <th style={{background:"skyblue",fontSize: "10px"}}>Days</th>
                {TimetableData.TimeData.map ((TimeData) =>(
                    <th key={TimeData.key} style={{background:"none",fontSize: "10px",transform:"rotate(-40deg)",transformOrigin:"left-center",}}>{TimeData.time}</th>
                ))}
            </tr>
            {TimetableData.Days.map ((Days) =>(
                <tr key={Days.key}>
                    <th style={{background:"none",color: "green",fontSize: "10px"}}>{Days.day}</th>
                    <td style={styles.timetableData}>{Days.subject1}</td>
                    <td style={styles.timetableData}>{Days.subject2}</td>
                    <td style={styles.timetableData}>{Days.subject3}</td>
                    <td style={{background:"none",color: "green",fontSize: "13px",transform:"rotate(-40deg)",transformOrigin:"left-center"}}><i>Tea {Days.subject12}</i></td>
                    <td style={styles.timetableData}>{Days.subject4}</td>
                    <td style={styles.timetableData}>{Days.subject5}</td>
                    <td style={{background:"none",color: "green",fontSize: "13px",transform:"rotate(-40deg)",transformOrigin:"left-center"}}><i>Short {Days.subject12}</i></td>
                    <td style={styles.timetableData}>{Days.subject6}</td>
                    <td style={styles.timetableData}>{Days.subject7}</td>
                    <td style={{background:"none",color: "green",fontSize: "13px",transform:"rotate(-40deg)",transformOrigin:"left-center"}}><i>Lunch {Days.subject12}</i></td>
                    <td style={styles.timetableData}>{Days.subject8}</td>
                    <td style={styles.timetableData}>{Days.subject9}</td>
                    <td style={styles.timetableData}>{Days.subject10}</td>
                    <td style={{background:"none",color: "green",fontSize: "13px",transform:"rotate(-40deg)",transformOrigin:"left-center"}}><i>{Days.subject11}</i></td>
                </tr>
            ))}
        </table>
    </div>
);

};

export default Timetable;