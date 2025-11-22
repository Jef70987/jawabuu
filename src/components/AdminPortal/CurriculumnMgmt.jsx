import React, { useState } from "react";


const CurriculumManagement = () => {
  const [curricula, setCurricula] = useState([]);
  const [subject, setSubject] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [learningGoals, setLearningGoals] = useState("");
  const [expectations, setExpectations] = useState("");

  // Add or update a curriculum
  const handleCurriculumSubmit = (e) => {
    e.preventDefault();

    if (subject && curriculum) {
      const newCurriculum = { subject, curriculum };

      if (editIndex !== null) {
        // Update existing curriculum
        const updatedCurricula = [...curricula];
        updatedCurricula[editIndex] = newCurriculum;
        setCurricula(updatedCurricula);
        setEditIndex(null);
      } else {
        // Add new curriculum
        setCurricula([...curricula, newCurriculum]);
      }

      // Clear form
      setSubject("");
      setCurriculum("");
    }
  };

  // Edit a curriculum
  const handleEdit = (index) => {
    const entry = curricula[index];
    setSubject(entry.subject);
    setCurriculum(entry.curriculum);
    setEditIndex(index);
  };

  // Delete a curriculum
  const handleDelete = (index) => {
    const updatedCurricula = curricula.filter((_, i) => i !== index);
    setCurricula(updatedCurricula);
  };

  // Save learning goals and expectations
  const handleGoalsSubmit = (e) => {
    e.preventDefault();
    alert("Learning goals and expectations saved successfully!");
  };

  return (
    <div className="container">
      <h1>Curriculum Management</h1>

      {/* Curriculum Form */}
      <div className="section">
        <h2>{editIndex !== null ? "Edit Curriculum" : "Add Curriculum"}</h2>
        <form onSubmit={handleCurriculumSubmit}>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            required
          />
          <textarea
            placeholder="Curriculum Details"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            className="input textarea"
            required
          />
          <button type="submit" className="button">
            {editIndex !== null ? "Update Curriculum" : "Add Curriculum"}
          </button>
        </form>
      </div>

      {/* Curricula List */}
      <div className="section">
        <h2>Subject Curricula</h2>
        {curricula.length > 0 ? (
          <ul className="curricula-list">
            {curricula.map((entry, index) => (
              <li key={index} className="curricula-item">
                <h3>{entry.subject}</h3>
                <p>{entry.curriculum}</p>
                <button onClick={() => handleEdit(index)} className="button">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="button delete">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No curricula added yet.</p>
        )}
      </div>

      {/* Learning Goals and Expectations Section */}
      <div className="section">
        <h2>Set Learning Goals and Expectations</h2>
        <form onSubmit={handleGoalsSubmit}>
          <textarea
            placeholder="Learning Goals"
            value={learningGoals}
            onChange={(e) => setLearningGoals(e.target.value)}
            className="input textarea"
            required
          />
          <textarea
            placeholder="Expectations"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            className="input textarea"
            required
          />
          <button type="submit" className="button">
            Save Goals and Expectations
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurriculumManagement;