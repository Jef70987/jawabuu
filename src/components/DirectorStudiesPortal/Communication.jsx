/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios"; // For API calls (if needed)


const Communication = () => {
  // Sample data for users (students, teachers, school)
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", type: "student" },
    { id: 2, name: "Jane Smith", type: "student" },
    { id: 3, name: "Mr. Brown", type: "teacher" },
    { id: 4, name: "School Admin", type: "school" },
  ]);

  // State for message input
  const [message, setMessage] = useState({
    recipient: "",
    text: "",
  });

  // State for success/error messages
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({
      ...message,
      [name]: value,
    });
  };

  // Handle message submission
  const handleSendMessage = async () => {
    if (!message.recipient || !message.text) {
      setStatus("Please select a recipient and enter a message.");
      return;
    }

    // Simulate sending a message (in a real app, this would call an API)
    const recipient = users.find((user) => user.id === parseInt(message.recipient));
    setStatus(`Message sent to ${recipient.name}: "${message.text}"`);

    // Clear the message input
    setMessage({
      recipient: "",
      text: "",
    });
  };

  return (
    <div className="app">
      <h1>Teacher Communication Portal</h1>

      {/* Message Section */}
      <div className="section">
        <h2>Send a Message</h2>
        <div>
          <label>Recipient:</label>
          <select
            name="recipient"
            value={message.recipient}
            onChange={handleInputChange}
          >
            <option value="">Select a recipient</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.type})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="text"
            value={message.text}
            onChange={handleInputChange}
            rows="4"
            placeholder="Type your message here..."
          />
        </div>
        <button onClick={handleSendMessage}>Send Message</button>
      </div>

      {/* Display Status */}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default Communication;