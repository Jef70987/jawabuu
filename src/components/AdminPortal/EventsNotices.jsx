import React, { useState } from "react";


const EventAnnouncementManagement = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [editEventIndex, setEditEventIndex] = useState(null);

  const [announcements, setAnnouncements] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");

  // Add or update an event
  const handleEventSubmit = (e) => {
    e.preventDefault();

    if (eventName && eventDate && eventDescription) {
      const newEvent = { eventName, eventDate, eventDescription };

      if (editEventIndex !== null) {
        // Update existing event
        const updatedEvents = [...events];
        updatedEvents[editEventIndex] = newEvent;
        setEvents(updatedEvents);
        setEditEventIndex(null);
      } else {
        // Add new event
        setEvents([...events, newEvent]);
      }

      // Clear form
      setEventName("");
      setEventDate("");
      setEventDescription("");
    }
  };

  // Edit an event
  const handleEditEvent = (index) => {
    const event = events[index];
    setEventName(event.eventName);
    setEventDate(event.eventDate);
    setEventDescription(event.eventDescription);
    setEditEventIndex(index);
  };

  // Delete an event
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Add an announcement
  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();

    if (announcementTitle && announcementMessage) {
      const newAnnouncement = {
        id: Date.now(),
        title: announcementTitle,
        message: announcementMessage,
        date: new Date().toLocaleDateString(),
      };
      setAnnouncements([...announcements, newAnnouncement]);

      // Clear form
      setAnnouncementTitle("");
      setAnnouncementMessage("");
    }
  };

  return (
    <div className="container">
      <h1>School Event and Announcement Management</h1>

      {/* Event Management Section */}
      <div className="section">
        <h2>{editEventIndex !== null ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleEventSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="input"
            required
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="input"
            required
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="input textarea"
            required
          />
          <button type="submit" className="button">
            {editEventIndex !== null ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>

      {/* Events List */}
      <div className="section">
        <h2>School Events</h2>
        {events.length > 0 ? (
          <ul className="events-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <h3>{event.eventName}</h3>
                <p>
                  <strong>Date:</strong> {event.eventDate}
                </p>
                <p>{event.eventDescription}</p>
                <button onClick={() => handleEditEvent(index)} className="button">
                  Edit
                </button>
                <button onClick={() => handleDeleteEvent(index)} className="button delete">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events added yet.</p>
        )}
      </div>

      {/* Announcement Section */}
      <div className="section">
        <h2>Post Announcement</h2>
        <form onSubmit={handleAnnouncementSubmit}>
          <input
            type="text"
            placeholder="Announcement Title"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            className="input"
            required
          />
          <textarea
            placeholder="Announcement Message"
            value={announcementMessage}
            onChange={(e) => setAnnouncementMessage(e.target.value)}
            className="input textarea"
            required
          />
          <button type="submit" className="button">
            Post Announcement
          </button>
        </form>
      </div>

      {/* Announcements List */}
      <div className="section">
        <h2>Announcements</h2>
        {announcements.length > 0 ? (
          <ul className="announcements-list">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="announcement-item">
                <h3>{announcement.title}</h3>
                <p>{announcement.message}</p>
                <small>Posted on: {announcement.date}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventAnnouncementManagement;