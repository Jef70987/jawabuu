import React, { useState } from "react";

// Reusable Toggle Component
const ToggleSwitch = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200">
    <div className="flex-1">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

// Notification Component
const Notification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50">
    <span>{message}</span>
    <button onClick={onClose} className="text-white hover:text-gray-200">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

// Input Field Component
const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

// Privacy and Security Settings Component
const PrivacySettings = ({ privacy, setPrivacy, showNotification }) => {
  const handleSave = () => {
    showNotification("Privacy settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h2>
        <p className="text-gray-600">Manage your account privacy and security settings</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-1">
          <ToggleSwitch
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            checked={privacy.twoFactorAuth}
            onChange={(checked) => setPrivacy({ ...privacy, twoFactorAuth: checked })}
          />
          <ToggleSwitch
            label="Location Access"
            description="Allow access to your location for school-related features"
            checked={privacy.locationAccess}
            onChange={(checked) => setPrivacy({ ...privacy, locationAccess: checked })}
          />
          <ToggleSwitch
            label="Data Sharing"
            description="Share anonymous data to improve school services"
            checked={privacy.dataSharing}
            onChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ notifications, setNotifications, showNotification }) => {
  const handleSave = () => {
    showNotification("Notification settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Notifications</h2>
        <p className="text-gray-600">Choose how you want to be notified</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-1">
          <ToggleSwitch
            label="Email Notifications"
            description="Receive updates and alerts via email"
            checked={notifications.email}
            onChange={(checked) => setNotifications({ ...notifications, email: checked })}
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Get instant notifications on your device"
            checked={notifications.push}
            onChange={(checked) => setNotifications({ ...notifications, push: checked })}
          />
          <ToggleSwitch
            label="Assignment Alerts"
            description="Get notified about new assignments and deadlines"
            checked={notifications.assignments}
            onChange={(checked) => setNotifications({ ...notifications, assignments: checked })}
          />
          <ToggleSwitch
            label="Grade Updates"
            description="Receive notifications when new grades are posted"
            checked={notifications.grades}
            onChange={(checked) => setNotifications({ ...notifications, grades: checked })}
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

// Appearance Settings Component
const AppearanceSettings = ({ showNotification }) => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    showNotification("Appearance settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Appearance</h2>
        <p className="text-gray-600">Customize how the application looks</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleThemeChange("light")}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                theme === "light" 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium text-gray-900">Light</div>
              <div className="text-sm text-gray-600">Clean and bright interface</div>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                theme === "dark" 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium text-gray-900">Dark</div>
              <div className="text-sm text-gray-600">Easy on the eyes in low light</div>
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Font Size</h3>
          <div className="flex space-x-3">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  fontSize === size
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Password Settings Component
const PasswordSettings = ({ password, setPassword, showNotification }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.newPassword !== password.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    showNotification("Password updated successfully");
    setError("");
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
        <p className="text-gray-600">Update your account password</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Current Password"
            type="password"
            value={password.currentPassword}
            onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
            placeholder="Enter current password"
          />
          <InputField
            label="New Password"
            type="password"
            value={password.newPassword}
            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
            placeholder="Enter new password"
          />
          <InputField
            label="Confirm New Password"
            type="password"
            value={password.confirmPassword}
            onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
            placeholder="Confirm new password"
          />
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeSection, setActiveSection] = useState("privacy");
  const [notification, setNotification] = useState(null);

  const [privacy, setPrivacy] = useState({
    twoFactorAuth: false,
    locationAccess: true,
    dataSharing: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    assignments: true,
    grades: true,
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const navigationItems = [
    { id: "privacy", label: "Privacy & Security" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
    { id: "password", label: "Password" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences</p>
        </div>

        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 bg-white rounded-lg border border-gray-200 p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                <AppearanceSettings showNotification={showNotification} />
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
        </div>
      </div>
    </div>
  );
};

export default Settings;