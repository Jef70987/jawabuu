import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // For rendering nested routes
import Sidebar from '../components/Sidebar/Sidebar'; // Reusable Sidebar component
import Header from '../components/Header/Header'; // Reusable Header component
import './PortalLayout.css'; // CSS for the layout

function PortalLayout({ sidebarData }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        sidebarData={sidebarData} // Pass the sidebar data dynamically
      />

      {/* Main Content Area */}
      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="content">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>
    </div>
  );
}

export default PortalLayout;