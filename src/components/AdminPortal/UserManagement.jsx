import React, { useState } from "react";
 // Import the CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [editIndex, setEditIndex] = useState(null);

  const [rolesPermissions, setRolesPermissions] = useState({
    admin: { canManageUsers: true, canManageEvents: true, canPostAnnouncements: true },
    teacher: { canManageStudents: true, canPostGrades: true },
    parent: { canViewGrades: true, canViewAttendance: true },
  });

  // Add or update a user
  const handleUserSubmit = (e) => {
    e.preventDefault();

    if (name && email && role) {
      const newUser = { name, email, role };

      if (editIndex !== null) {
        // Update existing user
        const updatedUsers = [...users];
        updatedUsers[editIndex] = newUser;
        setUsers(updatedUsers);
        setEditIndex(null);
      } else {
        // Add new user
        setUsers([...users, newUser]);
      }

      // Clear form
      setName("");
      setEmail("");
      setRole("admin");
    }
  };

  // Edit a user
  const handleEditUser = (index) => {
    const user = users[index];
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditIndex(index);
  };

  // Delete a user
  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Update roles and permissions
  const handleRolePermissionChange = (role, permission, value) => {
    setRolesPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: value,
      },
    }));
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* User Form */}
      <div className="section">
        <h2>{editIndex !== null ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleUserSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
            required
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
          <button type="submit" className="button">
            {editIndex !== null ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="section">
        <h2>Users</h2>
        {users.length > 0 ? (
          <ul className="users-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => handleEditUser(index)} className="button">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(index)} className="button delete">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users added yet.</p>
        )}
      </div>

      {/* Roles and Permissions Section */}
      <div className="section">
        <h2>Roles and Permissions</h2>
        {Object.entries(rolesPermissions).map(([role, permissions]) => (
          <div key={role} className="role-permissions">
            <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
            {Object.entries(permissions).map(([permission, value]) => (
              <div key={permission} className="permission-item">
                <label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handleRolePermissionChange(role, permission, e.target.checked)
                    }
                  />
                  {permission}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;