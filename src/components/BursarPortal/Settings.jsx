import React, { useState } from "react";


// Reusable Input Component
const InputField = ({ label, type, value, onChange }) => (
  <div className="input-field">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

// Reusable Toggle Component
const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="toggle-switch">
    <label>{label}</label>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </div>
);

// Notification Component
const Notification = ({ message, onClose }) => (
  <div className="notification">
    <p>{message}</p>
    <button onClick={onClose}>×</button>
  </div>
);


// Privacy and Security Settings Component
const PrivacySettings = ({ privacy, setPrivacy, showNotification }) => {
  const handleSave = () => {
    // Simulate saving privacy settings
    showNotification("Privacy settings updated successfully!");
  };

  return (
    <div className="settings-section">
      <h2>Privacy and Security</h2>
      <ToggleSwitch
        label="Enable Two-Factor Authentication"
        checked={privacy.twoFactorAuth}
        onChange={(e) =>
          setPrivacy({ ...privacy, twoFactorAuth: e.target.checked })
        }
      />
      <ToggleSwitch
        label="Allow Location Access"
        checked={privacy.locationAccess}
        onChange={(e) =>
          setPrivacy({ ...privacy, locationAccess: e.target.checked })
        }
      />
      <button onClick={handleSave}>Save Privacy Settings</button>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ notifications, setNotifications, showNotification }) => {
  const handleSave = () => {
    // Simulate saving notification settings
    showNotification("Notification settings updated successfully!");
  };

  return (
    <div className="settings-section">
      <h2>Notification Settings</h2>
      <ToggleSwitch
        label="Enable Email Notifications"
        checked={notifications.email}
        onChange={(e) =>
          setNotifications({ ...notifications, email: e.target.checked })
        }
      />
      <ToggleSwitch
        label="Enable Push Notifications"
        checked={notifications.push}
        onChange={(e) =>
          setNotifications({ ...notifications, push: e.target.checked })
        }
      />
      <button onClick={handleSave}>Save Notification Settings</button>
    </div>
  );
};

// Appearance Settings Component
const AppearanceSettings = ({ appearance, setAppearance, showNotification }) => {
  const handleSave = () => {
    // Simulate saving appearance settings
    showNotification("Appearance settings updated successfully!");
  };

  return (
    <div className="settings-section">
      <h2>Appearance Settings</h2>
      <label>
        Theme:
        <select
          value={appearance.theme}
          onChange={(e) =>
            setAppearance({ ...appearance, theme: e.target.value })
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <button onClick={handleSave}>Save Appearance Settings</button>
    </div>
  );
};

// Password Settings Component
const PasswordSettings = ({ password, setPassword, showNotification }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    // Simulate updating the password
    showNotification("Password updated successfully!");
    setError("");
  };

  return (
    <div className="settings-section">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Current Password"
          type="password"
          value={password.currentPassword}
          onChange={(e) =>
            setPassword({ ...password, currentPassword: e.target.value })
          }
        />
        <InputField
          label="New Password"
          type="password"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <InputField
          label="Confirm New Password"
          type="password"
          value={password.confirmPassword}
          onChange={(e) =>
            setPassword({ ...password, confirmPassword: e.target.value })
          }
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [notification, setNotification] = useState(null);


  const [privacy, setPrivacy] = useState({
    twoFactorAuth: false,
    locationAccess: true,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const [appearance, setAppearance] = useState({
    theme: "light",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="settings-container">
      {/* Notification */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <button onClick={() => setActiveSection("privacy")}>Privacy</button>
        <button onClick={() => setActiveSection("notifications")}>
          Notifications
        </button>
        <button onClick={() => setActiveSection("appearance")}>Appearance</button>
        <button onClick={() => setActiveSection("password")}>Password</button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {activeSection === "privacy" && (
          <PrivacySettings
            privacy={privacy}
            setPrivacy={setPrivacy}
            showNotification={showNotification}
          />
        )}
        {activeSection === "notifications" && (
          <NotificationSettings
            notifications={notifications}
            setNotifications={setNotifications}
            showNotification={showNotification}
          />
        )}
        {activeSection === "appearance" && (
          <AppearanceSettings
            appearance={appearance}
            setAppearance={setAppearance}
            showNotification={showNotification}
          />
        )}
        {activeSection === "password" && (
          <PasswordSettings
            password={password}
            setPassword={setPassword}
            showNotification={showNotification}
          />
        )}
      </div>
    </div>
  );
};

export default Settings; 