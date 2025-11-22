import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
//import regression from 'regression';

Chart.register(...registerables);

const Analysis = () => {
const [currentTab, setCurrentTab] = useState('dashboard');
const [chemHours, setChemHours] = useState(5);
const [mathHours, setMathHours] = useState(4);
const [predictedGrade, setPredictedGrade] = useState('C (48%)');
const [predictedTime, setPredictedTime] = useState('Est. 12 weeks to target');

const trendChartRef = useRef(null);
const correlationChartRef = useRef(null);
const timeChartRef = useRef(null);
const simulationChartRef = useRef(null);

// Initialize all charts
useEffect(() => {
// Trend Chart
const trendCtx = document.getElementById('trendChart').getContext('2d');
trendChartRef.current = new Chart(trendCtx, {
    type: 'line',
    data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
        label: 'Your Performance',
        data: [38, 40, 42, 41, 43, 44, 45, 45],
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
    },
    {
        label: 'Target Path',
        data: [38, 41, 44, 46, 47, 48, 49, 50],
        borderColor: '#38b000',
        backgroundColor: 'rgba(56, 176, 0, 0.1)',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
        borderWidth: 2
    }]
    },
    options: getChartOptions()
});

// Correlation Chart
const corrCtx = document.getElementById('correlationChart').getContext('2d');
correlationChartRef.current = new Chart(corrCtx, {
    type: 'bar',
    data: {
    labels: ['Math-Chem', 'Bio-Chem', 'Kisw-Math', 'Hum-Bio'],
    datasets: [{
        label: 'Correlation Strength',
        data: [0.82, 0.65, 0.58, 0.42],
        backgroundColor: [
        'rgba(67, 97, 238, 0.7)',
        'rgba(67, 97, 238, 0.7)',
        'rgba(67, 97, 238, 0.5)',
        'rgba(67, 97, 238, 0.3)'
        ],
        borderColor: [
        '#4361ee',
        '#4361ee',
        '#4361ee',
        '#4361ee'
        ],
        borderWidth: 1
    }]
    },
    options: getChartOptions(false)
});

// Time Distribution Chart
const timeCtx = document.getElementById('timeChart').getContext('2d');
timeChartRef.current = new Chart(timeCtx, {
    type: 'doughnut',
    data: {
    labels: ['Chemistry', 'Mathematics', 'Biology', 'Kiswahili', 'Humanities'],
    datasets: [{
        data: [25, 20, 15, 15, 10],
        backgroundColor: [
        '#ef233c',
        '#4361ee',
        '#38b000',
        '#ff9e00',
        '#6c757d'
        ],
        borderWidth: 0
    }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
        legend: {
        position: 'bottom',
        labels: {
            boxWidth: 12,
            padding: 15,
            font: {
            size: 9
            }
        }
        }
    }
    }
});

// Simulation Chart
const simCtx = document.getElementById('simulationChart').getContext('2d');
simulationChartRef.current = new Chart(simCtx, {
    type: 'bar',
    data: {
    labels: ['Current', 'Projected'],
    datasets: [{
        label: 'Average Score',
        data: [45, 48],
        backgroundColor: [
        'rgba(67, 97, 238, 0.7)',
        'rgba(56, 176, 0, 0.7)'
        ],
        borderColor: [
        '#4361ee',
        '#38b000'
        ],
        borderWidth: 1
    }]
    },
    options: getChartOptions(false, 40, 55)
});

return () => {
    trendChartRef.current?.destroy();
    correlationChartRef.current?.destroy();
    timeChartRef.current?.destroy();
    simulationChartRef.current?.destroy();
};
}, []);

const getChartOptions = (showLegend = true, min = 35, max = 55) => ({
responsive: true,
maintainAspectRatio: false,
plugins: {
    legend: {
    display: showLegend,
    position: 'bottom',
    labels: {
        boxWidth: 12,
        padding: 20,
        font: {
        size: 10
        }
    }
    }
},
scales: {
    y: {
    beginAtZero: false,
    min,
    max,
    ticks: {
        callback: (value) => value + '%',
        font: {
        size: 9
        }
    },
    grid: {
        color: 'rgba(0,0,0,0.05)'
    }
    },
    x: {
    grid: {
        display: false
    },
    ticks: {
        font: {
        size: 9
        }
    }
    }
},
elements: {
    point: {
    radius: 3,
    hoverRadius: 5
    }
}
});

const switchTab = (tabId) => {
setCurrentTab(tabId);
// Resize charts when tab becomes visible
setTimeout(() => {
    if (tabId === 'stats') {
    correlationChartRef.current?.resize();
    timeChartRef.current?.resize();
    } else if (tabId === 'predictor') {
    simulationChartRef.current?.resize();
    } else {
    trendChartRef.current?.resize();
    }
}, 50);
};

const updateSimulation = () => {
// Simple prediction algorithm
const chemImprovement = Math.min(10, (chemHours - 5) * 1.5);
const mathImprovement = Math.min(8, (mathHours - 4) * 1.2);
const bioImprovement = Math.min(2, 0.3 * (chemHours - 5));
const kiswImprovement = Math.min(5, 0.5 * (mathHours - 4));

const totalImprovement = (chemImprovement * 0.3) + (mathImprovement * 0.25) + (bioImprovement * 0.2) + (kiswImprovement * 0.15);
const newAverage = Math.min(50, 45 + totalImprovement);

// Update chart
simulationChartRef.current.data.datasets[0].data = [45, newAverage];
simulationChartRef.current.update();

// Update prediction text
setPredictedGrade(getGradeFromScore(newAverage));
setPredictedTime( );
};

const getGradeFromScore = (score) => {
if (score >= 75) return 'A (75%+)';
if (score >= 65) return 'B (65%)';
if (score >= 50) return 'C+ (50%)';
if (score >= 40) return 'C (40%)';
if (score >= 30) return 'D (30%)';
return 'E (Below 30%)';
};

const optimizeStudyPlan = () => {
// Simple optimization - focus on weakest subjects
setChemHours(10);
setMathHours(8);
updateSimulation();
alert("Optimized plan created! Focus on Chemistry (10h) and Math (8h) for maximum improvement.");
};

// Swipe functionality
const [touchStartX, setTouchStartX] = useState(0);
const tabContainerRef = useRef(null);

const handleTouchStart = (e) => {
setTouchStartX(e.changedTouches[0].screenX);
};

const handleTouchEnd = (e) => {
const touchEndX = e.changedTouches[0].screenX;
const diffX = touchEndX - touchStartX;

if (Math.abs(diffX) < 50) return; // Ignore small movements

const tabs = ['dashboard', 'stats', 'predictor'];
const currentIndex = tabs.indexOf(currentTab);

if (diffX < 0 && currentIndex < 2) {
    // Swiped left - next tab
    switchTab(tabs[currentIndex + 1]);
} else if (diffX > 0 && currentIndex > 0) {
    // Swiped right - previous tab
    switchTab(tabs[currentIndex - 1]);
}
};

return (
<div className="container">
    <div className="header">
    <h1>Smart Performance Predictor</h1>
    <p>Data-driven roadmap to your C+ target</p>
    </div>
    
    <div 
    className="tab-container" 
    ref={tabContainerRef}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    >
    <div 
        className={`tab ${currentTab === 'dashboard' ? 'active' : ''}`} 
        onClick={() => switchTab('dashboard')}
    >
        Dashboard
    </div>
    <div 
        className={`tab ${currentTab === 'stats' ? 'active' : ''}`} 
        onClick={() => switchTab('stats')}
    >
        Analysis
    </div>
    <div 
        className={`tab ${currentTab === 'predictor' ? 'active' : ''}`} 
        onClick={() => switchTab('predictor')}
    >
        Simulator
    </div>
    </div>
    
    {/* Dashboard Tab */}
    <div id="dashboard" className={`tab-content ${currentTab === 'dashboard' ? 'active' : ''}`}>
    <div className="card">
        <div className="card-title">
        <span className="icon">📊</span> Current Performance
        <span className="badge badge-primary" style={{marginLeft: 'auto'}}>Grade D (45.4%)</span>
        </div>
        
        <div className="subject-grid">
        {[
            {name: 'Mathematics', score: 42, diff: -8},
            {name: 'Kiswahili', score: 45, diff: -5},
            {name: 'Biology', score: 48, diff: -2},
            {name: 'Chemistry', score: 40, diff: -10}
        ].map((subject, index) => (
            <div className="subject-card" key={index}>
            <div className="subject-name">{subject.name}</div>
            <div className="progress-container">
                <div className="progress-bg"></div>
                <div 
                className="progress-bar" 
                style={{'--percentage': subject.score, transform: `rotate(${subject.score * 3.6}deg)`}}
                ></div>
                <div className="progress-value">{subject.score}%</div>
            </div>
            <div className={`improvement ${subject.diff >= 0 ? 'positive' : 'negative'}`}>
                {Math.abs(subject.diff)}% {subject.diff >= 0 ? 'above' : 'below'} target
            </div>
            </div>
        ))}
        </div>
    </div>
    
    <div className="card">
        <div className="card-title">
        <span className="icon">📈</span> Performance Trend
        </div>
        <div className="chart-container">
        <canvas id="trendChart"></canvas>
        </div>
        <div className="stats-grid">
        <div className="stat-card">
            <div className="stat-value">72%</div>
            <div className="stat-label">Success Probability</div>
        </div>
        <div className="stat-card">
            <div className="stat-value">8-10</div>
            <div className="stat-label">Weeks to Target</div>
        </div>
        </div>
    </div>
    
    <div className="card">
        <div className="card-title">
        <span className="icon">🎯</span> Action Plan
        </div>
        
        {[
        {priority: 1, title: 'Chemistry Intensive', desc: '1 extra hour daily (10% improvement needed)'},
        {priority: 2, title: 'Math Practice', desc: '5 extra problems daily (8% needed)'},
        {priority: 3, title: 'Kiswahili Reading', desc: '2 chapters weekly (5% needed)'},
        {priority: 4, title: 'Biology Labs', desc: '1 extra session weekly (2% needed)'}
        ].map((action, index) => (
        <div className="action-item" key={index} style={index === 3 ? {borderBottom: 'none'} : {}}>
            <div className="action-priority">{action.priority}</div>
            <div className="action-text">
            <div className="action-title">{action.title}</div>
            <div className="action-desc">{action.desc}</div>
            </div>
        </div>
        ))}
    </div>
    </div>
    
    {/* Deep Analysis Tab */}
    <div id="stats" className={`tab-content ${currentTab === 'stats' ? 'active' : ''}`}>
    <div className="card">
        <div className="card-title">
        <span className="icon">🧮</span> Statistical Breakdown
        </div>
        
        <table className="stats-table">
        <tbody>
            {[
            {metric: 'Bayesian Probability', value: '72%', significance: 'Chance of reaching C+'},
            {metric: 'Regression Slope', value: '+1.2%/wk', significance: 'Current improvement rate'},
            {metric: 'Required Slope', value: '+1.5%/wk', significance: 'To hit target on time'},
            {metric: 'Performance Index', value: '58/100', significance: 'Compared to peers'},
            {metric: 'Study Efficiency', value: '67%', significance: 'Hours → Score conversion'}
            ].map((row, index) => (
            <tr key={index}>
                <td>{row.metric}</td>
                <td>{row.value}</td>
                <td>{row.significance}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    
    <div className="card">
        <div className="card-title">
        <span className="icon">📉</span> Subject Correlation
        </div>
        <div className="chart-container">
        <canvas id="correlationChart"></canvas>
        </div>
        <div style={{fontSize: '0.8rem', color: '#6c757d', marginTop: '10px'}}>
        Strongest correlation: Chemistry ↔ Mathematics (r=0.82)
        </div>
    </div>
    
    <div className="card">
        <div className="card-title">
        <span className="icon">⏳</span> Time Distribution
        </div>
        <div className="chart-container">
        <canvas id="timeChart"></canvas>
        </div>
    </div>
    </div>
    
    {/* Predictor Tab */}
    <div id="predictor" className={`tab-content ${currentTab === 'predictor' ? 'active' : ''}`}>
    <div className="card">
        <div className="card-title">
        <span className="icon">🔮</span> Grade Simulator
        </div>
        
        <p>Adjust study hours to see predicted outcomes:</p>
        
        <div style={{marginTop: '15px'}}>
        <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9rem'}}>Chemistry Hours/Week:</label>
        <input 
            type="range" 
            min="2" 
            max="15" 
            value={chemHours} 
            className="prediction-input" 
            id="chemHours" 
            onChange={(e) => {
            setChemHours(parseInt(e.target.value));
            updateSimulation();
            }}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
            <span>2h</span>
            <span id="chemValue">{chemHours}h</span>
            <span>15h</span>
        </div>
        </div>
        
        <div style={{marginTop: '15px'}}>
        <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9rem'}}>Math Hours/Week:</label>
        <input 
            type="range" 
            min="2" 
            max="15" 
            value={mathHours} 
            className="prediction-input" 
            id="mathHours" 
            onChange={(e) => {
            setMathHours(parseInt(e.target.value));
            updateSimulation();
            }}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
            <span>2h</span>
            <span id="mathValue">{mathHours}h</span>
            <span>15h</span>
        </div>
        </div>
        
        <div className="chart-container" style={{height: '180px', marginTop: '20px'}}>
        <canvas id="simulationChart"></canvas>
        </div>
        
        <div id="simResult" style={{marginTop: '15px', padding: '10px', backgroundColor: '#e8f4fc', borderRadius: '8px', textAlign: 'center'}}>
        <div style={{fontSize: '0.9rem'}}>Predicted Outcome:</div>
        <div style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px'}} id="predictedGrade">{predictedGrade}</div>
        <div style={{fontSize: '0.8rem', marginTop: '5px'}} id="predictedTime">{predictedTime}</div>
        </div>
        
        <button className="btn" onClick={optimizeStudyPlan}>Optimize My Study Plan</button>
    </div>
    </div>
</div>
);
};

export default Analysis;

