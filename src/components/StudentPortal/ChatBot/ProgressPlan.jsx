import React from 'react';

const ProgressPlan = () => {
  const tasks = {
    'To Do': ["Revise Chemistry notes", "Complete Math assignment"],
    'In Progress': ["English essay draft"],
    'Done': ["Science project research"]
  };

  return (
    <div className="progress-card">
      <h2>🎯 My Progress Plan</h2>
      <p>Track your academic goals:</p>
      
      <div className="kanban-board">
        {Object.entries(tasks).map(([status, items]) => (
          <div key={status} className="kanban-column">
            <h3>{status}</h3>
            {items.map((task, i) => (
              <div key={i} className="kanban-task">
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPlan;