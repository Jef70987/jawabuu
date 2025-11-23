import React from 'react';

const ImprovementSuggestions = () => {
  const suggestions = [
    { 
      subject: 'Math', 
      tip: "Do 5 sums every day", 
      priority: 'high',
      time: "15 mins"
    },
    { 
      subject: 'Science', 
      tip: "Watch science videos", 
      priority: 'medium',
      time: "30 mins weekly"
    },
    { 
      subject: 'English', 
      tip: "Read story books", 
      priority: 'low',
      time: "10 mins daily"
    },
    { 
      subject: 'Kiswahili', 
      tip: "Speak Swahili at home", 
      priority: 'medium',
      time: "5 mins daily"
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Easy Ways to Improve 📚
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((item, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
              <h3 className="font-bold text-gray-800 text-lg">{item.subject}</h3>
              <span className="text-sm text-gray-500 ml-auto">{item.time}</span>
            </div>

            <p className="text-gray-700 mb-4">
              {item.tip}
            </p>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium">
              Try It
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Pick one thing to try today! 🎯
        </p>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;