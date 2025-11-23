import React from 'react';

const ProgressPlan = () => {
  const tasks = {
    'To Do': ["Math homework", "Read English story"],
    'Doing': ["Science project"],
    'Done': ["Kiswahili exercise"]
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        My Work Plan 🎯
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([status, items]) => (
          <div key={status} className="bg-white border-2 border-gray-200 rounded-xl p-4">
            <h3 className={`font-bold text-center mb-3 ${
              status === 'To Do' ? 'text-blue-600' : 
              status === 'Doing' ? 'text-yellow-600' : 
              'text-green-600'
            }`}>
              {status}
            </h3>
            
            <div className="space-y-2">
              {items.map((task, i) => (
                <div 
                  key={i} 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Move your work from To Do → Doing → Done! ✅
        </p>
      </div>
    </div>
  );
};

export default ProgressPlan;