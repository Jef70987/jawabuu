import React, { useState } from "react";

const Settings = () => {
  // Sample teacher profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "", // Password is not stored in plain text in real applications
    notifications: {
      email: true,
      sms: false,
    },
  });

  // State for form inputs
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: { ...profile.notifications },
  });

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (formData.name !== profile.name || formData.email !== profile.email) {
      // Update profile name and email
      setProfile({
        ...profile,
        name: formData.name,
        email: formData.email,
      });
      setMessage("Profile updated successfully!");
    } else {
      setMessage("No changes detected.");
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    // Simulate password change (in a real app, this would call an API)
    setProfile({
      ...profile,
      password: formData.newPassword, // In real apps, hash the password before saving
    });
    setMessage("Password changed successfully!");
  };

  // Handle notification preferences update
  const handleNotificationUpdate = () => {
    setProfile({
      ...profile,
      notifications: { ...formData.notifications },
    });
    setMessage("Notification preferences updated successfully!");
  };

  return (
    <div className="app">
      <h1>Teacher Settings</h1>

      {/* Profile Update Section */}
      <div className="section">
        <h2>Update Profile</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleProfileUpdate}>Update Profile</button>
      </div>

      {/* Password Change Section */}
      <div className="section">
        <h2>Change Password</h2>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>

      {/* Notification Preferences Section */}
      <div className="section">
        <h2>Notification Preferences</h2>
        <div>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={formData.notifications.email}
              onChange={handleInputChange}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sms"
              checked={formData.notifications.sms}
              onChange={handleInputChange}
            />
            SMS Notifications
          </label>
        </div>
        <button onClick={handleNotificationUpdate}>Update Notifications</button>
      </div>

      {/* Display Messages */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Settings;