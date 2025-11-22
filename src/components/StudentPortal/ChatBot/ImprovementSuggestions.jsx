import React from 'react';

const ImprovementSuggestions = () => {
  const suggestions = [
    { subject: 'Math', tip: "Practice 5 algebra problems daily", priority: 'high' },
    { subject: 'Science', tip: "Watch 2 experiment videos weekly", priority: 'medium' },
    { subject: 'English', tip: "Read 1 chapter of a novel every night", priority: 'low' },
  ];

  return (
    <div className="suggestions-card">
      <h2>📚 Suggestions to Improve</h2>
      <p>AI-generated tips just for you:</p>
      
      <div className="suggestion-grid">
        {suggestions.map((item, i) => (
          <div key={i} className={`suggestion-item ${item.priority}`}>
            <h3>{item.subject}</h3>
            <p>{item.tip}</p>
            <button>Try This</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovementSuggestions;