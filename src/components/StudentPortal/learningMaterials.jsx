/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const LearningPlatform = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedGrade, setSelectedGrade] = useState("Grade 7");
  const [learningMode, setLearningMode] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentUnit, setCurrentUnit] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample curriculum data
  const curriculumData = {
    Mathematics: {
      "Grade 7": {
        modules: [
          {
            title: "Algebra Fundamentals",
            units: [
              {
                title: "Introduction to Algebra",
                content: "Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations. It allows us to solve problems where some numbers are unknown.",
                duration: "15 min",
                completed: false
              },
              {
                title: "Variables and Expressions",
                content: "Variables are symbols (usually letters) that represent unknown numbers. Algebraic expressions combine variables, numbers, and operations like addition, subtraction, multiplication, and division.",
                duration: "20 min",
                completed: false
              },
              {
                title: "Solving Simple Equations",
                content: "To solve equations, we isolate the variable by performing the same operation on both sides of the equation. The goal is to get the variable alone on one side.",
                duration: "25 min",
                completed: false
              }
            ],
            quiz: [
              {
                question: "What is a variable in algebra?",
                options: [
                  "A fixed number",
                  "A symbol that represents an unknown value",
                  "A mathematical operation",
                  "The answer to an equation"
                ],
                correct: 1
              },
              {
                question: "What is the solution to 2x + 5 = 15?",
                options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
                correct: 0
              },
              {
                question: "Which of these is an algebraic expression?",
                options: [
                  "3 + 4 = 7",
                  "2x - 5",
                  "πr²",
                  "All of the above"
                ],
                correct: 1
              },
              {
                question: "What operation would you use to solve x - 7 = 12?",
                options: [
                  "Subtraction",
                  "Multiplication",
                  "Addition",
                  "Division"
                ],
                correct: 2
              },
              {
                question: "If y = 3x + 2 and x = 4, what is the value of y?",
                options: ["14", "10", "18", "12"],
                correct: 0
              }
            ]
          },
          {
            title: "Geometry Basics",
            units: [
              {
                title: "Points, Lines, and Angles",
                content: "Geometry begins with understanding basic elements: points (locations), lines (straight paths), and angles (formed by intersecting lines).",
                duration: "20 min",
                completed: false
              },
              {
                title: "Shapes and Properties",
                content: "Different shapes have unique properties. Triangles have three sides, quadrilaterals have four, and circles have constant radius from center.",
                duration: "25 min",
                completed: false
              }
            ],
            quiz: [
              {
                question: "How many degrees are in a right angle?",
                options: ["45°", "90°", "180°", "360°"],
                correct: 1
              },
              {
                question: "What is the sum of angles in a triangle?",
                options: ["90°", "180°", "270°", "360°"],
                correct: 1
              },
              {
                question: "Which shape has all sides equal?",
                options: ["Rectangle", "Triangle", "Square", "Circle"],
                correct: 2
              },
              {
                question: "What do you call a four-sided polygon?",
                options: ["Pentagon", "Hexagon", "Quadrilateral", "Octagon"],
                correct: 2
              },
              {
                question: "How many sides does a hexagon have?",
                options: ["4", "5", "6", "8"],
                correct: 2
              }
            ]
          }
        ]
      }
    },
    Science: {
      "Grade 7": {
        modules: [
          {
            title: "Environmental Science",
            units: [
              {
                title: "Ecosystems",
                content: "An ecosystem includes all living and non-living things in an area, interacting as a system.",
                duration: "20 min",
                completed: false
              },
              {
                title: "Conservation",
                content: "Conservation involves protecting natural resources and environments for future generations.",
                duration: "25 min",
                completed: false
              }
            ],
            quiz: [
              {
                question: "What is an ecosystem?",
                options: [
                  "Only plants in an area",
                  "Only animals in an area",
                  "Living and non-living things interacting",
                  "A type of animal"
                ],
                correct: 2
              },
              {
                question: "Why is conservation important?",
                options: [
                  "For future generations",
                  "Only for animals",
                  "It's not important",
                  "For building houses"
                ],
                correct: 0
              },
              {
                question: "What is biodiversity?",
                options: [
                  "One type of plant",
                  "Variety of living things",
                  "A conservation method",
                  "Type of ecosystem"
                ],
                correct: 1
              },
              {
                question: "Which is a renewable resource?",
                options: [
                  "Coal",
                  "Solar energy",
                  "Natural gas",
                  "Oil"
                ],
                correct: 1
              },
              {
                question: "What protects wildlife in Kenya?",
                options: [
                  "National parks",
                  "Cities",
                  "Farms",
                  "Roads"
                ],
                correct: 0
              }
            ]
          }
        ]
      }
    }
  };

  const videosData = [
    { 
      id: 1, 
      subject: "Mathematics", 
      title: "Algebra Equations", 
      duration: "15:30",
      instructor: "Mr. Kamau",
      description: "Step-by-step guide to solving algebraic equations.",
      url: "#"
    },
    { 
      id: 2, 
      subject: "Science", 
      title: "Environmental Science", 
      duration: "22:15",
      instructor: "Dr. Wanjiku",
      description: "Exploring Kenyan ecosystems and conservation.",
      url: "#"
    },
    { 
      id: 3, 
      subject: "Mathematics", 
      title: "Geometry Basics", 
      duration: "18:00",
      instructor: "Mrs. Atieno",
      description: "Understanding shapes, angles, and measurements.",
      url: "#"
    }
  ];

  const resourcesData = [
    { 
      id: 1, 
      type: "ebook", 
      title: "Mathematics Guide", 
      subject: "Mathematics",
      format: "PDF",
      size: "2.4 MB",
      description: "Comprehensive CBC curriculum guide",
      url: "#"
    },
    { 
      id: 2, 
      type: "worksheet", 
      title: "Science Exercises", 
      subject: "Science",
      format: "PDF",
      size: "1.8 MB",
      description: "Hands-on scientific activities",
      url: "#"
    },
    { 
      id: 3, 
      type: "lesson_plan", 
      title: "Math Practice Sheets", 
      subject: "Mathematics",
      format: "DOC",
      size: "3.1 MB",
      description: "Daily practice problems and solutions",
      url: "#"
    }
  ];

  // Initialize progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setModuleProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  const subjects = ["Mathematics", "Science", "English", "Kiswahili", "Social Studies"];
  const grades = ["Grade 6", "Grade 7", "Grade 8"];

  const getCurrentModules = () => {
    return curriculumData[selectedSubject]?.[selectedGrade]?.modules || [];
  };

  const calculateModuleProgress = (moduleIndex) => {
    const module = getCurrentModules()[moduleIndex];
    if (!module) return 0;
    
    const completedUnits = module.units.filter(unit => 
      moduleProgress[`${selectedSubject}-${selectedGrade}-${moduleIndex}-${module.units.indexOf(unit)}`]
    ).length;
    
    return (completedUnits / module.units.length) * 100;
  };

  const calculateOverallProgress = () => {
    const modules = getCurrentModules();
    if (modules.length === 0) return 0;
    
    let totalProgress = 0;
    modules.forEach((module, moduleIndex) => {
      totalProgress += calculateModuleProgress(moduleIndex);
    });
    
    return totalProgress / modules.length;
  };

  const markUnitComplete = (moduleIndex, unitIndex) => {
    const key = `${selectedSubject}-${selectedGrade}-${moduleIndex}-${unitIndex}`;
    setModuleProgress(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleQuizSubmit = () => {
    const module = getCurrentModules()[currentModule];
    let score = 0;
    
    module.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        score++;
      }
    });
    
    setQuizResults({
      score,
      total: module.quiz.length,
      passed: score >= 3 // 60% to pass
    });
    
    // Mark module as completed if passed
    if (score >= 3) {
      module.units.forEach((_, unitIndex) => {
        markUnitComplete(currentModule, unitIndex);
      });
    }
  };

  // Mobile sidebar component
  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedSubject}</h2>
              <p className="text-gray-600">{selectedGrade}</p>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Modules Progress</h3>
            <span className="text-sm text-gray-500">
              {Math.round(calculateOverallProgress())}%
            </span>
          </div>
          
          <div className="space-y-4">
            {getCurrentModules().map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Mod {moduleIndex + 1}: {module.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    calculateModuleProgress(moduleIndex) === 100 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {Math.round(calculateModuleProgress(moduleIndex))}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  {module.units.map((unit, unitIndex) => {
                    const completed = moduleProgress[`${selectedSubject}-${selectedGrade}-${moduleIndex}-${unitIndex}`];
                    return (
                      <div 
                        key={unitIndex}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                          currentModule === moduleIndex && currentUnit === unitIndex 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setCurrentModule(moduleIndex);
                          setCurrentUnit(unitIndex);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300'
                        }`}>
                          {completed && '✓'}
                        </div>
                        <span className={`text-sm flex-1 ${
                          completed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {unit.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Jawabu Learning Platform
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Choose your learning path</p>
        </div>

        {/* Subject and Grade Selection */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Learning Modes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div 
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 border-blue-200"
            onClick={() => setLearningMode("modules")}
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📚</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Structured Modules</h3>
              <p className="text-gray-600 text-sm">Learn step-by-step with guided lessons and quizzes</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 border-red-200"
            onClick={() => setLearningMode("videos")}
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🎥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Video Lessons</h3>
              <p className="text-gray-600 text-sm">Watch interactive video explanations</p>
            </div>
          </div>

          <div 
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 border-green-200"
            onClick={() => setLearningMode("resources")}
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📄</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Download Resources</h3>
              <p className="text-gray-600 text-sm">Access worksheets, guides, and reference materials</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${calculateOverallProgress()}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-gray-900">
                  {Math.round(calculateOverallProgress())}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModuleLearning = () => {
    const modules = getCurrentModules();
    if (modules.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No modules available</h2>
            <button 
              onClick={() => setLearningMode(null)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }

    const currentModuleData = modules[currentModule];
    const currentUnitData = currentModuleData.units[currentUnit];

    if (showQuiz) {
      return (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Quiz: {currentModuleData.title}
                </h2>
                <button 
                  onClick={() => setShowQuiz(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              </div>

              {quizResults ? (
                <div className="text-center py-6 sm:py-8">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    quizResults.passed ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className="text-xl sm:text-2xl">
                      {quizResults.passed ? '✓' : '✗'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {quizResults.passed ? 'Quiz Passed!' : 'Quiz Failed'}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Score: {quizResults.score}/{quizResults.total}
                  </p>
                  <button 
                    onClick={() => {
                      setShowQuiz(false);
                      setQuizResults(null);
                      setQuizAnswers({});
                    }}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {currentModuleData.quiz.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              checked={quizAnswers[index] === optIndex}
                              onChange={() => setQuizAnswers(prev => ({
                                ...prev,
                                [index]: optIndex
                              }))}
                              className="text-blue-500"
                            />
                            <span className="text-gray-700 text-sm sm:text-base">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleQuizSubmit}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 text-sm sm:text-base"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        <MobileSidebar />
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ☰
            </button>
            <div className="text-center flex-1">
              <h2 className="font-semibold text-gray-900 text-sm">{selectedSubject}</h2>
              <p className="text-gray-600 text-xs">{selectedGrade}</p>
            </div>
            <button 
              onClick={() => setLearningMode(null)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              🏠
            </button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{selectedSubject}</h2>
            <p className="text-gray-600">{selectedGrade}</p>
          </div>
          
          <div className="p-4 overflow-y-auto h-screen pb-32">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Modules Progress</h3>
              <span className="text-sm text-gray-500">
                {Math.round(calculateOverallProgress())}%
              </span>
            </div>
            
            <div className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Module {moduleIndex + 1}: {module.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      calculateModuleProgress(moduleIndex) === 100 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {Math.round(calculateModuleProgress(moduleIndex))}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {module.units.map((unit, unitIndex) => {
                      const completed = moduleProgress[`${selectedSubject}-${selectedGrade}-${moduleIndex}-${unitIndex}`];
                      return (
                        <div 
                          key={unitIndex}
                          className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                            currentModule === moduleIndex && currentUnit === unitIndex 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setCurrentModule(moduleIndex);
                            setCurrentUnit(unitIndex);
                          }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300'
                          }`}>
                            {completed && '✓'}
                          </div>
                          <span className={`text-sm ${
                            completed ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {unit.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              {/* Mobile Quiz Button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm"
                >
                  Take Quiz
                </button>
                <button 
                  onClick={() => setLearningMode(null)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="hidden lg:flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentModuleData.title}
                  </h2>
                  <p className="text-gray-600">
                    Unit {currentUnit + 1}: {currentUnitData.title}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setLearningMode(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Back to Dashboard
                  </button>
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Learning Content</h3>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {currentUnitData.content}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <button 
                  onClick={() => {
                    if (currentUnit > 0) {
                      setCurrentUnit(currentUnit - 1);
                    } else if (currentModule > 0) {
                      setCurrentModule(currentModule - 1);
                      setCurrentUnit(getCurrentModules()[currentModule - 1].units.length - 1);
                    }
                  }}
                  disabled={currentModule === 0 && currentUnit === 0}
                  className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 text-sm sm:text-base"
                >
                  Previous
                </button>
                
                <button 
                  onClick={() => markUnitComplete(currentModule, currentUnit)}
                  className="w-full sm:w-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 text-sm sm:text-base"
                >
                  Mark Complete
                </button>

                <button 
                  onClick={() => {
                    if (currentUnit < currentModuleData.units.length - 1) {
                      setCurrentUnit(currentUnit + 1);
                    } else if (currentModule < modules.length - 1) {
                      setCurrentModule(currentModule + 1);
                      setCurrentUnit(0);
                    }
                  }}
                  disabled={currentModule === modules.length - 1 && currentUnit === currentModuleData.units.length - 1}
                  className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVideos = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Video Lessons</h2>
          <button 
            onClick={() => setLearningMode(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videosData
            .filter(video => video.subject === selectedSubject)
            .map(video => (
              <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-32 sm:h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl">🎥</span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    <span>{video.duration}</span>
                    <span>{video.instructor}</span>
                  </div>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 text-sm sm:text-base">
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Learning Resources</h2>
          <button 
            onClick={() => setLearningMode(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {resourcesData
            .filter(resource => resource.subject === selectedSubject)
            .map(resource => (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-lg">{resource.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">{resource.description}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded ml-2">
                    {resource.format}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <span>{resource.size}</span>
                  <span>{resource.type.replace('_', ' ')}</span>
                </div>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 text-sm sm:text-base">
                  Download Resource
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (!learningMode) {
    return renderDashboard();
  }

  switch (learningMode) {
    case "modules":
      return renderModuleLearning();
    case "videos":
      return renderVideos();
    case "resources":
      return renderResources();
    default:
      return renderDashboard();
  }
};

export default LearningPlatform;