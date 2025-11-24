import { useState } from 'react';
import PerformancePredictor from './ChatBot/PerformancePredictor';
import ImprovementSuggestions from './ChatBot/ImprovementSuggestions';
import ProgressPlan from './ChatBot/ProgressPlan';
import ChatWidget from './ChatBot/ChatWidget';

function Bot() {
  const [activeTab, setActiveTab] = useState('performance');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-blue-500 text-white"
        >
          <span className="text-xl">☰</span>
        </button>
        <h1 className="text-lg font-bold text-black">
          {activeTab === 'performance' && 'My Performance'}
          {activeTab === 'suggestions' && 'Ways to Improve'}
          {activeTab === 'progress' && 'My Work Plan'}
        </h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile, shown when toggled */}
        <div className={`
          ${isSidebarOpen ? 'fixed inset-0 z-40 bg-white' : 'hidden'} 
          lg:static lg:block lg:w-64 bg-white shadow-lg border-r border-gray-200 p-4 lg:p-4
        `}>
          {/* Mobile Close Button */}
          {isSidebarOpen && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-bold text-black">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg bg-gray-200 text-black"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
          )}
          
          <div className="space-y-2">
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'performance' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'bg-white text-black hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
              }`}
              onClick={() => {
                setActiveTab('performance');
                setIsSidebarOpen(false);
              }}
            >
              <span className="text-xl w-6 text-center">📊</span>
              <span className="font-medium flex-1">My Performance</span>
            </button>
            
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'suggestions' 
                  ? 'bg-red-500 text-white shadow-sm' 
                  : 'bg-white text-black hover:bg-red-50 hover:text-red-600 border border-gray-300'
              }`}
              onClick={() => {
                setActiveTab('suggestions');
                setIsSidebarOpen(false);
              }}
            >
              <span className="text-xl w-6 text-center">📚</span>
              <span className="font-medium flex-1">Improve</span>
            </button>
            
            <button 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'progress' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'bg-white text-black hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
              }`}
              onClick={() => {
                setActiveTab('progress');
                setIsSidebarOpen(false);
              }}
            >
              <span className="text-xl w-6 text-center">🎯</span>
              <span className="font-medium flex-1">My Plan</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold text-black mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Score</span>
                <span className="font-semibold text-blue-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">To Do</span>
                <span className="font-semibold text-red-600">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Done</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl font-bold text-black mb-2">
                {activeTab === 'performance' && 'My Performance'}
                {activeTab === 'suggestions' && 'Ways to Improve'}
                {activeTab === 'progress' && 'My Work Plan'}
              </h1>
              <p className="text-black">
                {activeTab === 'performance' && 'See how you are doing in your subjects'}
                {activeTab === 'suggestions' && 'Simple tips to help you learn better'}
                {activeTab === 'progress' && 'Track your homework and projects'}
              </p>
            </div>

            {/* Mobile Description */}
            <div className="lg:hidden mb-4">
              <p className="text-sm text-black">
                {activeTab === 'performance' && 'See how you are doing in your subjects'}
                {activeTab === 'suggestions' && 'Simple tips to help you learn better'}
                {activeTab === 'progress' && 'Track your homework and projects'}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-300 p-4 lg:p-6">
              {activeTab === 'performance' && <PerformancePredictor />}
              {activeTab === 'suggestions' && <ImprovementSuggestions />}
              {activeTab === 'progress' && <ProgressPlan />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}

export default Bot;