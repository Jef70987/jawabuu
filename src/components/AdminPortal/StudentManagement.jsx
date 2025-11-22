import React, { useState } from 'react';


const StudentManagement = () => {
  // State for student records
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [residentialArea, setResidentialArea] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [orphanStatus, setOrphanStatus] = useState('full'); // full, partial, total
  const [studentClass, setStudentClass] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [modeOfTravel, setModeOfTravel] = useState('dayScholar'); // dayScholar, hostel
  const [editIndex, setEditIndex] = useState(null);

  // State for student groups
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  // Add or update a student
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      firstName,
      secondName,
      thirdName,
      residentialArea,
      fatherName,
      motherName,
      orphanStatus,
      studentClass,
      fatherOccupation,
      motherOccupation,
      modeOfTravel,
    };

    if (editIndex !== null) {
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[editIndex] = newStudent;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      // Add new student
      setStudents([...students, newStudent]);
    }

    // Clear form fields
    setFirstName('');
    setSecondName('');
    setThirdName('');
    setResidentialArea('');
    setFatherName('');
    setMotherName('');
    setOrphanStatus('full');
    setStudentClass('');
    setFatherOccupation('');
    setMotherOccupation('');
    setModeOfTravel('dayScholar');
  };

  // Edit a student
  const handleEdit = (index) => {
    const student = students[index];
    setFirstName(student.firstName);
    setSecondName(student.secondName);
    setThirdName(student.thirdName);
    setResidentialArea(student.residentialArea);
    setFatherName(student.fatherName);
    setMotherName(student.motherName);
    setOrphanStatus(student.orphanStatus);
    setStudentClass(student.studentClass);
    setFatherOccupation(student.fatherOccupation);
    setMotherOccupation(student.motherOccupation);
    setModeOfTravel(student.modeOfTravel);
    setEditIndex(index);
  };

  // Remove a student
  const handleRemove = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  // Add a student group
  const handleGroupSubmit = (e) => {
    e.preventDefault();
    setGroups([...groups, groupName]);
    setGroupName('');
  };

  // Remove a student group
  const handleRemoveGroup = (index) => {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
  };

  return (
    <div className="app">
      <h1>School Admin Dashboard</h1>

      {/* Student Records Section */}
      <div className="section">
        <h2>Manage Student Records</h2>
        <form onSubmit={handleStudentSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Second Name"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Third Name"
            value={thirdName}
            onChange={(e) => setThirdName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Residential Area"
            value={residentialArea}
            onChange={(e) => setResidentialArea(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mother's Name"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            required
          />
          <select
            value={orphanStatus}
            onChange={(e) => setOrphanStatus(e.target.value)}
            required
          >
            <option value="full">Full Parents Alive</option>
            <option value="partial">Partial Orphan</option>
            <option value="total">Total Orphan</option>
          </select>
          <input
            type="text"
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Father's Occupation"
            value={fatherOccupation}
            onChange={(e) => setFatherOccupation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mother's Occupation"
            value={motherOccupation}
            onChange={(e) => setMotherOccupation(e.target.value)}
            required
          />
          <select
            value={modeOfTravel}
            onChange={(e) => setModeOfTravel(e.target.value)}
            required
          >
            <option value="dayScholar">Day Scholar</option>
            <option value="hostel">Hostel</option>
          </select>
          <button type="submit">
            {editIndex !== null ? 'Update Student' : 'Add Student'}
          </button>
        </form>

        <div className="student-list">
          <h3>Student List</h3>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  <span>
                    {student.firstName} {student.secondName} {student.thirdName} (Class: {student.studentClass}, {student.modeOfTravel})
                  </span>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Student Groups Section */}
      <div className="section">
        <h2>Manage Student Groups</h2>
        <form onSubmit={handleGroupSubmit}>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <button type="submit">Add Group</button>
        </form>

        <div className="group-list">
          <h3>Group List</h3>
          {groups.length === 0 ? (
            <p>No groups found.</p>
          ) : (
            <ul>
              {groups.map((group, index) => (
                <li key={index}>
                  <span>{group}</span>
                  <button onClick={() => handleRemoveGroup(index)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;