import React, { useState } from "react";


const HelpSupport = () => {
  const [supportRequests, setSupportRequests] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", issue: "Login issue", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", issue: "Password reset", status: "Resolved" },
  ]);
  const [newRequest, setNewRequest] = useState({ name: "", email: "", issue: "" });

  // Add a new support request
  const addSupportRequest = (e) => {
    e.preventDefault();
    if (newRequest.name && newRequest.email && newRequest.issue) {
      const request = {
        id: Date.now(),
        ...newRequest,
        status: "Pending",
      };
      setSupportRequests([...supportRequests, request]);
      setNewRequest({ name: "", email: "", issue: "" });
    }
  };

  // Update support request status
  const updateRequestStatus = (id, status) => {
    const updatedRequests = supportRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setSupportRequests(updatedRequests);
  };

  return (
    <div className="container">
      <h1>Support and Documentation</h1>

      {/* Technical Documentation Section */}
      <div className="section">
        <h2>Technical Documentation</h2>
        <p>
          Welcome to the technical documentation section. Here you can find guides and resources to
          help you manage the school portal effectively.
        </p>
        <ul className="documentation-list">
          <li>
            <a href="#user-guide" className="link">
              User Guide
            </a>
          </li>
          <li>
            <a href="#faq" className="link">
              Frequently Asked Questions (FAQ)
            </a>
          </li>
          <li>
            <a href="#troubleshooting" className="link">
              Troubleshooting Guide
            </a>
          </li>
        </ul>
      </div>

      {/* Support Requests Section */}
      <div className="section">
        <h2>Support Requests</h2>
        <form onSubmit={addSupportRequest}>
          <input
            type="text"
            placeholder="Name"
            value={newRequest.name}
            onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newRequest.email}
            onChange={(e) => setNewRequest({ ...newRequest, email: e.target.value })}
            className="input"
            required
          />
          <textarea
            placeholder="Describe your issue"
            value={newRequest.issue}
            onChange={(e) => setNewRequest({ ...newRequest, issue: e.target.value })}
            className="input textarea"
            required
          />
          <button type="submit" className="button">
            Submit Request
          </button>
        </form>

        <h3>Support Requests List</h3>
        {supportRequests.length > 0 ? (
          <table className="support-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supportRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.issue}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "Pending" && (
                      <button
                        onClick={() => updateRequestStatus(request.id, "Resolved")}
                        className="button resolve"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setSupportRequests(supportRequests.filter((r) => r.id !== request.id))
                      }
                      className="button delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No support requests found.</p>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;