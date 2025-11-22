import React, { useState } from "react";


const PortalSettings = () => {
  const [theme, setTheme] = useState("light");
  const [systemConfig, setSystemConfig] = useState({
    schoolName: "Greenwood High",
    academicYear: "2023-2024",
    maxStudentsPerClass: 30,
    enableNotifications: true,
  });

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = e.target.value; // Apply theme to the entire app
  };

  // Handle system configuration changes
  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save system configuration
  const saveConfig = () => {
    alert("System configuration saved successfully!");
    console.log("Updated Config:", systemConfig);
  };

  return (
    <div className="container">
      <h1>Portal Settings and System Configuration</h1>

      {/* Theme Customization Section */}
      <div className="section">
        <h2>Customize Theme</h2>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="input"
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="blue">Blue Theme</option>
        </select>
      </div>

      {/* System Configuration Section */}
      <div className="section">
        <h2>System Configuration</h2>
        <form>
          <label>
            School Name:
            <input
              type="text"
              name="schoolName"
              value={systemConfig.schoolName}
              onChange={handleConfigChange}
              className="input"
            />
          </label>
          <label>
            Academic Year:
            <input
              type="text"
              name="academicYear"
              value={systemConfig.academicYear}
              onChange={handleConfigChange}
              className="input"
            />
          </label>
          <label>
            Max Students Per Class:
            <input
              type="number"
              name="maxStudentsPerClass"
              value={systemConfig.maxStudentsPerClass}
              onChange={handleConfigChange}
              className="input"
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="enableNotifications"
              checked={systemConfig.enableNotifications}
              onChange={handleConfigChange}
            />
            Enable Notifications
          </label>
          <button type="button" onClick={saveConfig} className="button">
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortalSettings;