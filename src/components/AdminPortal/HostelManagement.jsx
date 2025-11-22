import React, { useState } from "react";


const HostelManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // Add a new room
  const addRoom = () => {
    if (roomNumber && capacity) {
      const newRoom = {
        id: Date.now(),
        roomNumber,
        capacity: parseInt(capacity),
        occupants: [],
      };
      setRooms([...rooms, newRoom]);
      setRoomNumber("");
      setCapacity("");
    }
  };

  // Allocate a student to a room
  const allocateStudent = () => {
    if (studentName && selectedRoom) {
      const updatedRooms = rooms.map((room) => {
        if (room.id === selectedRoom && room.occupants.length < room.capacity) {
          return {
            ...room,
            occupants: [...room.occupants, studentName],
          };
        }
        return room;
      });
      setRooms(updatedRooms);
      setStudentName("");
      setSelectedRoom("");
    }
  };

  return (
    <div className="container">
      <h1>Hostel Management System</h1>

      {/* Add Room Section */}
      <div className="section">
        <h2>Add Room</h2>
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="input"
        />
        <button onClick={addRoom} className="button">
          Add Room
        </button>
      </div>

      {/* Allocate Student Section */}
      <div className="section">
        <h2>Allocate Student to Room</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="input"
        />
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="input"
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              Room {room.roomNumber} (Capacity: {room.capacity})
            </option>
          ))}
        </select>
        <button onClick={allocateStudent} className="button">
          Allocate Student
        </button>
      </div>

      {/* Rooms and Occupancy Section */}
      <div className="section">
        <h2>Rooms and Occupancy</h2>
        {rooms.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Occupants</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>Room {room.roomNumber}</td>
                  <td>{room.capacity}</td>
                  <td>
                    {room.occupants.length > 0 ? (
                      <ul>
                        {room.occupants.map((occupant, index) => (
                          <li key={index}>{occupant}</li>
                        ))}
                      </ul>
                    ) : (
                      "No occupants"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms added yet.</p>
        )}
      </div>
    </div>
  );
};

export default HostelManagement ;