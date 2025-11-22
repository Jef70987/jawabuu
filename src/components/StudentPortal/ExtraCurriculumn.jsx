import React, { useState } from "react";

const ExtraCurriculumn = () => {
  const [registeredActivities, setRegisteredActivities] = useState([]);
  const [progress, setProgress] = useState({});
  const [competency, setCompetency] = useState({});
  const [pathPrediction, setPathPrediction] = useState("");
  const [activeTab, setActiveTab] = useState("activities");

  // Mock data for sports, clubs, and events
  const activities = [
    { id: 1, name: "Basketball", type: "sport", description: "Team sports and physical fitness", icon: "🏀" },
    { id: 2, name: "Chess Club", type: "club", description: "Strategic thinking and mental development", icon: "♟️" },
    { id: 3, name: "Science Fair", type: "event", description: "Innovation and scientific exploration", icon: "🔬" },
    { id: 4, name: "Football", type: "sport", description: "Team coordination and physical endurance", icon: "⚽" },
    { id: 5, name: "Drama Club", type: "club", description: "Creative expression and public speaking", icon: "🎭" },
    { id: 6, name: "Math Olympiad", type: "event", description: "Problem solving and analytical skills", icon: "📐" },
    { id: 7, name: "Music Band", type: "club", description: "Musical talent and collaboration", icon: "🎵" },
    { id: 8, name: "Swimming", type: "sport", description: "Water sports and physical discipline", icon: "🏊" },
  ];

  // Register for an activity
  const registerActivity = (activity) => {
    if (!registeredActivities.find(a => a.id === activity.id)) {
      const newActivities = [...registeredActivities, activity];
      setRegisteredActivities(newActivities);
      updateProgress(activity, 0);
      updateCompetency(activity, 0);
      updatePathPrediction(newActivities);
    }
  };

  // Unregister from an activity
  const unregisterActivity = (activityId) => {
    const activity = registeredActivities.find(a => a.id === activityId);
    const newActivities = registeredActivities.filter(a => a.id !== activityId);
    setRegisteredActivities(newActivities);
    
    // Remove from progress and competency
    const newProgress = { ...progress };
    const newCompetency = { ...competency };
    delete newProgress[activity.name];
    delete newCompetency[activity.name];
    
    setProgress(newProgress);
    setCompetency(newCompetency);
    updatePathPrediction(newActivities);
  };

  // Update progress for an activity
  const updateProgress = (activity, value) => {
    setProgress({ ...progress, [activity.name]: value });
  };

  // Update competency for an activity
  const updateCompetency = (activity, value) => {
    setCompetency({ ...competency, [activity.name]: value });
  };

  // Update path prediction based on activities
  const updatePathPrediction = (activities = registeredActivities) => {
    const paths = {
      sport: { name: "Athletics & Sports", color: "bg-green-100 text-green-800" },
      club: { name: "Leadership & Arts", color: "bg-blue-100 text-blue-800" },
      event: { name: "Innovation & Academics", color: "bg-purple-100 text-purple-800" },
    };

    const activityTypes = activities.map((a) => a.type);
    const typeCount = activityTypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    if (activities.length > 0) {
      const dominantType = Object.keys(typeCount).reduce((a, b) => 
        typeCount[a] > typeCount[b] ? a : b
      );
      setPathPrediction(paths[dominantType]);
    } else {
      setPathPrediction(null);
    }
  };

  const getProgressColor = (value) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-blue-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCompetencyLevel = (value) => {
    if (value >= 80) return { text: "Advanced", color: "text-green-600" };
    if (value >= 60) return { text: "Proficient", color: "text-blue-600" };
    if (value >= 40) return { text: "Developing", color: "text-yellow-600" };
    return { text: "Beginner", color: "text-red-600" };
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'sport': return 'border-green-200 bg-green-50';
      case 'club': return 'border-blue-200 bg-blue-50';
      case 'event': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Extracurricular Activities Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your progress and develop skills beyond the classroom
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
          {[
            { id: "activities", label: "Available Activities" },
            { id: "registered", label: "My Activities" },
            { id: "progress", label: "Progress Tracking" },
            { id: "analysis", label: "Skills Analysis" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Path Prediction Banner */}
        {pathPrediction && (
          <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Career Path Prediction</h3>
                <p className="text-gray-600 text-sm">Based on your extracurricular profile</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${pathPrediction.color}`}>
                {pathPrediction.name}
              </span>
            </div>
          </div>
        )}

        {/* Available Activities Tab */}
        {activeTab === "activities" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`border rounded-lg p-4 transition-all hover:shadow-md ${getActivityColor(activity.type)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                        activity.type === 'sport' ? 'bg-green-100 text-green-800' :
                        activity.type === 'club' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                  <button
                    onClick={() => registerActivity(activity)}
                    disabled={registeredActivities.find(a => a.id === activity.id)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      registeredActivities.find(a => a.id === activity.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {registeredActivities.find(a => a.id === activity.id) ? 'Registered' : 'Register'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registered Activities Tab */}
        {activeTab === "registered" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              My Activities ({registeredActivities.length})
            </h2>
            {registeredActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities registered</h3>
                <p className="text-gray-600">Register for activities to track your progress and skills</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registeredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`border rounded-lg p-4 ${getActivityColor(activity.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                          activity.type === 'sport' ? 'bg-green-100 text-green-800' :
                          activity.type === 'club' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {activity.type}
                        </span>
                      </div>
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                    <button
                      onClick={() => unregisterActivity(activity.id)}
                      className="w-full py-2 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Unregister
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Progress Tracking Tab */}
        {activeTab === "progress" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h2>
            {registeredActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data</h3>
                <p className="text-gray-600">Register for activities to start tracking your progress</p>
              </div>
            ) : (
              <div className="space-y-6">
                {registeredActivities.map((activity) => (
                  <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{activity.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            activity.type === 'sport' ? 'bg-green-100 text-green-800' :
                            activity.type === 'club' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">
                        {progress[activity.name] || 0}%
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{progress[activity.name] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress[activity.name] || 0)}`}
                            style={{ width: `${progress[activity.name] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <label className="text-sm text-gray-600 flex-1">Update Progress:</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress[activity.name] || 0}
                          onChange={(e) => updateProgress(activity, parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={progress[activity.name] || 0}
                          onChange={(e) => updateProgress(activity, parseInt(e.target.value))}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Analysis Tab */}
        {activeTab === "analysis" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Analysis</h2>
            {registeredActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No skills data</h3>
                <p className="text-gray-600">Register for activities to analyze your skills development</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {registeredActivities.map((activity) => {
                  const competencyValue = competency[activity.name] || 0;
                  const competencyLevel = getCompetencyLevel(competencyValue);
                  
                  return (
                    <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{activity.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              activity.type === 'sport' ? 'bg-green-100 text-green-800' :
                              activity.type === 'club' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {activity.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">{competencyValue}%</span>
                          <div className={`text-sm font-medium ${competencyLevel.color}`}>
                            {competencyLevel.text}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Skill Competency</span>
                            <span>{competencyValue}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(competencyValue)}`}
                              style={{ width: `${competencyValue}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <label className="text-sm text-gray-600 flex-1">Update Competency:</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={competencyValue}
                            onChange={(e) => updateCompetency(activity, parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={competencyValue}
                            onChange={(e) => updateCompetency(activity, parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Overall Skills Summary */}
                {registeredActivities.length > 0 && (
                  <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Overall Skills Development</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-gray-900">
                          {registeredActivities.length}
                        </div>
                        <div className="text-sm text-gray-600">Activities</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / registeredActivities.length) || 0}%
                        </div>
                        <div className="text-sm text-gray-600">Avg Progress</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.round(Object.values(competency).reduce((a, b) => a + b, 0) / registeredActivities.length) || 0}%
                        </div>
                        <div className="text-sm text-gray-600">Avg Competency</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraCurriculumn;