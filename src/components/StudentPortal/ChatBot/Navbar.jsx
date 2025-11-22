import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="logo">🎓 Jawabu </h1>
      </div>
      <div className="navbar-right">
        <button className="nav-btn">📊 My Stats</button>
        <button className="nav-btn">🔔 Notifications</button>
        <div className="user-profile">
          <span className="username">Student</span>
          <div className="avatar">👩‍🎓</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;