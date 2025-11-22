import React, { useState } from "react";


const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Days and times for the timetable
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];

  // Add or update a timetable entry
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for scheduling conflicts
    const conflict = timetable.find(
      (entry) =>
        entry.day === day &&
        entry.time === time &&
        (entry.teacher === teacher || entry.room === room)
    );

    if (conflict) {
      alert("Scheduling conflict detected! Please check the teacher or room.");
      return;
    }

    const newEntry = { subject, teacher, room, day, time };

    if (editIndex !== null) {
      // Update existing entry
      const updatedTimetable = [...timetable];
      updatedTimetable[editIndex] = newEntry;
      setTimetable(updatedTimetable);
      setEditIndex(null);
    } else {
      // Add new entry
      setTimetable([...timetable, newEntry]);
    }

    // Clear form
    setSubject("");
    setTeacher("");
    setRoom("");
    setTime("");
  };

  // Edit an entry
  const handleEdit = (index) => {
    const entry = timetable[index];
    setSubject(entry.subject);
    setTeacher(entry.teacher);
    setRoom(entry.room);
    setDay(entry.day);
    setTime(entry.time);
    setEditIndex(index);
  };

  // Delete an entry
  const handleDelete = (index) => {
    const updatedTimetable = timetable.filter((_, i) => i !== index);
    setTimetable(updatedTimetable);
  };

  return (
    <div className="container">
      <h1>School Timetable Management</h1>

      {/* Timetable Form */}
      <div className="section">
        <h2>{editIndex !== null ? "Edit Timetable Entry" : "Add Timetable Entry"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="input"
            required
          />
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="input"
            required
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
            required
          >
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button type="submit" className="button">
            {editIndex !== null ? "Update Entry" : "Add Entry"}
          </button>
        </form>
      </div>

      {/* Timetable View */}
      <div className="section">
        <h2>School Timetable</h2>
        <table className="timetable">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((entry, index) => (
              <tr key={index}>
                <td>{entry.day}</td>
                <td>{entry.time}</td>
                <td>{entry.subject}</td>
                <td>{entry.teacher}</td>
                <td>{entry.room}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="button delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;