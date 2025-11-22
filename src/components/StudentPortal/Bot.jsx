
import { useState } from 'react';
import Navbar from './ChatBot/Navbar';
import PerformancePredictor from './ChatBot/PerformancePredictor';
import ImprovementSuggestions from './ChatBot/ImprovementSuggestions';
import ProgressPlan from './ChatBot/ProgressPlan';
import ChatWidget from './ChatBot/ChatWidget';
import './ChatBot/Bot.css';

function Bot() {
const [activeTab, setActiveTab] = useState('performance');
const [isChatOpen, setIsChatOpen] = useState(false);

return (
<div className="bot-app">
    <Navbar />
    <div className="bot-dashboard">
        <div className="bot-sidebar">
            <button
            className={`sidebar-btn ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
            >
            📊 Predict My Performance
            </button>
            <button
            className={`sidebar-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestions')}
            >
            📚 Suggestions to Improve
            </button>
            <button 
            className={`sidebar-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
            >
            🎯 My Progress Plan
            </button>
        </div>
        
        <div className="main-content">
            {activeTab === 'performance' && <PerformancePredictor />}
            {activeTab === 'suggestions' && <ImprovementSuggestions />}
            {activeTab === 'progress' && <ProgressPlan />}
        </div>
    </div>
    
    <ChatWidget isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />
</div>
);
}

export default Bot;