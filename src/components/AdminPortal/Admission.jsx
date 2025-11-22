import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Admission ()  {
  const [newApplications, setNewApplications] = useState([]); // New student applications
  const [admissionRequests, setAdmissionRequests] = useState([]); // Admission requests

  // Fetch data from the API
  useEffect(() => {
    // Fetch new applications
    axios.get('http://localhost:3001/new-applications')
      .then(response => setNewApplications(response.data))
      .catch(error => console.error('Error fetching new applications:', error));

    // Fetch admission requests
    axios.get('http://localhost:3001/admission-requests')
      .then(response => setAdmissionRequests(response.data))
      .catch(error => console.error('Error fetching admission requests:', error));
  }, []);

  // Handle approval of a request
  const handleApprove = (id) => {
    axios.delete(`http://localhost:3001/admission-requests/${id}`)
      .then(() => {
        setAdmissionRequests(admissionRequests.filter(request => request.id !== id)); // Remove approved request
      })
      .catch(error => console.error('Error approving request:', error));
  };

  // Handle rejection of a request
  const handleReject = (id) => {
    axios.delete(`http://localhost:3001/admission-requests/${id}`)
      .then(() => {
        setAdmissionRequests(admissionRequests.filter(request => request.id !== id)); // Remove rejected request
      })
      .catch(error => console.error('Error rejecting request:', error));
  };

  return (
    <div className="container">
      <h1>School Admission Portal</h1>

      {/* Section 1: Track New Student Applications */}
      <div className="section">
        <h2>New Student Applications</h2>
        <ul>
          {newApplications.map(application => (
            <li key={application.id}>
              <span>{application.name} - {application.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2: Manage Admission Requests */}
      <div className="section">
        <h2>Admission Requests</h2>
        <ul>
          {admissionRequests.map(request => (
            <li key={request.id}>
              <span>{request.name} - {request.status}</span>
              <div>
                <button className="approve" onClick={() => handleApprove(request.id)}>Approve</button>
                <button className="reject" onClick={() => handleReject(request.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admission;