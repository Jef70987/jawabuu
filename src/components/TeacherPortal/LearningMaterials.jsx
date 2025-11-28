/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Save, 
  Cancel,
  VideoLibrary,
  Description,
  Quiz,
  Group,
  CloudUpload,
  Preview,
  MenuBook,
  Dashboard,
  Analytics
} from '@mui/icons-material';

// Mock API service for learning management
const learningApiService = {
  // Get all learning content
  async getLearningContent() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const savedContent = localStorage.getItem('teacher-learning-content');
      return savedContent ? JSON.parse(savedContent) : {
        subjects: {},
        videos: [],
        resources: []
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Save learning content
  async saveLearningContent(content) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.setItem('teacher-learning-content', JSON.stringify(content));
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Upload file (simulated)
  async uploadFile(file, type) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, this would upload to cloud storage
      return {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: type
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }
};

function LearningMng() {
  // State management
  const [currentView, setCurrentView] = useState('modules');
  const [learningContent, setLearningContent] = useState({
    subjects: {},
    videos: [],
    resources: []
  });
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editingResource, setEditingResource] = useState(null);
  const [newModule, setNewModule] = useState(null);
  const [newVideo, setNewVideo] = useState(null);
  const [newResource, setNewResource] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Available subjects and grades
  const subjects = ["Mathematics", "Science", "English", "Kiswahili", "Social Studies", "CRE", "IRE", "Home Science"];
  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"];
  const resourceTypes = ["ebook", "worksheet", "lesson_plan", "reference", "activity_sheet"];

  // Load learning content
  useEffect(() => {
    loadLearningContent();
  }, []);

  const loadLearningContent = async () => {
    try {
      setLoading(true);
      const content = await learningApiService.getLearningContent();
      setLearningContent(content);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load learning content');
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Module Management
  const addModule = (subject, grade) => {
    const newModuleTemplate = {
      id: Date.now().toString(),
      subject,
      grade,
      title: 'New Module',
      description: '',
      units: [],
      quiz: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNewModule(newModuleTemplate);
  };

  const saveModule = async (module) => {
    try {
      const updatedContent = { ...learningContent };
      
      if (!updatedContent.subjects[module.subject]) {
        updatedContent.subjects[module.subject] = {};
      }
      if (!updatedContent.subjects[module.subject][module.grade]) {
        updatedContent.subjects[module.subject][module.grade] = { modules: [] };
      }

      if (newModule) {
        // Add new module
        updatedContent.subjects[module.subject][module.grade].modules.push(module);
        setNewModule(null);
      } else {
        // Update existing module
        const moduleIndex = updatedContent.subjects[module.subject][module.grade].modules.findIndex(m => m.id === module.id);
        if (moduleIndex !== -1) {
          updatedContent.subjects[module.subject][module.grade].modules[moduleIndex] = {
            ...module,
            updatedAt: new Date().toISOString()
          };
        }
      }

      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      setEditingModule(null);
      showSuccess('Module saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save module');
    }
  };

  const deleteModule = async (subject, grade, moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;

    try {
      const updatedContent = { ...learningContent };
      const modules = updatedContent.subjects[subject]?.[grade]?.modules || [];
      updatedContent.subjects[subject][grade].modules = modules.filter(m => m.id !== moduleId);
      
      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      showSuccess('Module deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete module');
    }
  };

  // Video Management
  const handleVideoUpload = async (videoData) => {
    try {
      setUploadProgress(prev => ({ ...prev, video: 0 }));
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, video: i }));
      }

      const uploadedVideo = await learningApiService.uploadFile(videoData.file, 'video');
      
      const newVideo = {
        id: Date.now().toString(),
        subject: videoData.subject,
        title: videoData.title,
        description: videoData.description,
        instructor: videoData.instructor,
        duration: videoData.duration,
        url: uploadedVideo.url,
        createdAt: new Date().toISOString()
      };

      const updatedContent = {
        ...learningContent,
        videos: [...learningContent.videos, newVideo]
      };

      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      setNewVideo(null);
      setUploadProgress(prev => ({ ...prev, video: null }));
      showSuccess('Video uploaded successfully!');
    } catch (error) {
      setErrorMessage('Failed to upload video');
      setUploadProgress(prev => ({ ...prev, video: null }));
    }
  };

  const deleteVideo = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      const updatedContent = {
        ...learningContent,
        videos: learningContent.videos.filter(v => v.id !== videoId)
      };
      
      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      showSuccess('Video deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete video');
    }
  };

  // Resource Management
  const handleResourceUpload = async (resourceData) => {
    try {
      setUploadProgress(prev => ({ ...prev, resource: 0 }));
      
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, resource: i }));
      }

      const uploadedResource = await learningApiService.uploadFile(resourceData.file, 'resource');
      
      const newResource = {
        id: Date.now().toString(),
        subject: resourceData.subject,
        title: resourceData.title,
        description: resourceData.description,
        type: resourceData.type,
        format: uploadedResource.name.split('.').pop().toUpperCase(),
        size: (uploadedResource.size / 1024 / 1024).toFixed(1) + ' MB',
        url: uploadedResource.url,
        createdAt: new Date().toISOString()
      };

      const updatedContent = {
        ...learningContent,
        resources: [...learningContent.resources, newResource]
      };

      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      setNewResource(null);
      setUploadProgress(prev => ({ ...prev, resource: null }));
      showSuccess('Resource uploaded successfully!');
    } catch (error) {
      setErrorMessage('Failed to upload resource');
      setUploadProgress(prev => ({ ...prev, resource: null }));
    }
  };

  const deleteResource = async (resourceId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;

    try {
      const updatedContent = {
        ...learningContent,
        resources: learningContent.resources.filter(r => r.id !== resourceId)
      };
      
      await learningApiService.saveLearningContent(updatedContent);
      setLearningContent(updatedContent);
      showSuccess('Resource deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete resource');
    }
  };

  // Statistics
  const getStatistics = () => {
    let totalModules = 0;
    let totalVideos = learningContent.videos.length;
    let totalResources = learningContent.resources.length;

    Object.values(learningContent.subjects).forEach(gradeData => {
      Object.values(gradeData).forEach(classData => {
        totalModules += classData.modules?.length || 0;
      });
    });

    return { totalModules, totalVideos, totalResources };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div className="h-screen max-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading learning content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Content Management</h1>
            <p className="text-gray-600 text-sm">Manage modules, videos, and resources for students</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome, Teacher</p>
              <p className="text-xs text-gray-500">LMS Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-1">
          {[
            { id: 'modules', label: 'Modules', icon: MenuBook },
            { id: 'videos', label: 'Videos', icon: VideoLibrary },
            { id: 'resources', label: 'Resources', icon: Description },
            { id: 'analytics', label: 'Analytics', icon: Analytics }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Modules</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalModules}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <MenuBook className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Video Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVideos}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <VideoLibrary className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resources</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Description className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Modules Management */}
          {currentView === 'modules' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Manage Learning Modules</h2>
                <button
                  onClick={() => setNewModule({})}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Add className="w-4 h-4" />
                  New Module
                </button>
              </div>

              {/* Module Creation/Editing Form */}
              {(newModule || editingModule) && (
                <ModuleForm
                  module={newModule || editingModule}
                  onSave={saveModule}
                  onCancel={() => {
                    setNewModule(null);
                    setEditingModule(null);
                  }}
                  subjects={subjects}
                  grades={grades}
                />
              )}

              {/* Modules List */}
              <div className="space-y-4">
                {Object.entries(learningContent.subjects).map(([subject, gradeData]) =>
                  Object.entries(gradeData).map(([grade, classData]) =>
                    classData.modules?.map((module) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-600">{subject} • {grade}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {module.units?.length || 0} units • {module.quiz?.length || 0} quiz questions
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingModule(module)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteModule(subject, grade, module.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Delete className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {new Date(module.createdAt).toLocaleDateString()}
                          {module.updatedAt && ` • Updated: ${new Date(module.updatedAt).toLocaleDateString()}`}
                        </div>
                      </div>
                    ))
                  )
                )}

                {stats.totalModules === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MenuBook className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No modules created yet</p>
                    <p className="text-sm">Create your first module to get started</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Videos Management */}
          {currentView === 'videos' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Manage Video Lessons</h2>
                <button
                  onClick={() => setNewVideo({})}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <CloudUpload className="w-4 h-4" />
                  Upload Video
                </button>
              </div>

              {/* Video Upload Form */}
              {newVideo && (
                <VideoUploadForm
                  onUpload={handleVideoUpload}
                  onCancel={() => setNewVideo(null)}
                  uploadProgress={uploadProgress.video}
                  subjects={subjects}
                />
              )}

              {/* Videos List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningContent.videos.map((video) => (
                  <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-3">
                      <VideoLibrary className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{video.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span>{video.subject}</span>
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-xs">
                        <Preview className="w-3 h-3 inline mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        <Delete className="w-3 h-3 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {learningContent.videos.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    <VideoLibrary className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No videos uploaded yet</p>
                    <p className="text-sm">Upload your first video lesson</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resources Management */}
          {currentView === 'resources' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Manage Learning Resources</h2>
                <button
                  onClick={() => setNewResource({})}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CloudUpload className="w-4 h-4" />
                  Upload Resource
                </button>
              </div>

              {/* Resource Upload Form */}
              {newResource && (
                <ResourceUploadForm
                  onUpload={handleResourceUpload}
                  onCancel={() => setNewResource(null)}
                  uploadProgress={uploadProgress.resource}
                  subjects={subjects}
                  resourceTypes={resourceTypes}
                />
              )}

              {/* Resources List */}
              <div className="space-y-4">
                {learningContent.resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{resource.subject}</span>
                          <span>{resource.type.replace('_', ' ')}</span>
                          <span>{resource.format}</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Preview className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Delete className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {learningContent.resources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Description className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No resources uploaded yet</p>
                    <p className="text-sm">Upload your first learning resource</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Distribution */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Content Distribution by Subject</h3>
                  <div className="space-y-3">
                    {subjects.map(subject => {
                      const moduleCount = Object.values(learningContent.subjects[subject] || {}).reduce(
                        (acc, gradeData) => acc + (gradeData.modules?.length || 0), 0
                      );
                      const videoCount = learningContent.videos.filter(v => v.subject === subject).length;
                      const resourceCount = learningContent.resources.filter(r => r.subject === subject).length;
                      
                      return (
                        <div key={subject} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{subject}</span>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>{moduleCount} modules</span>
                            <span>{videoCount} videos</span>
                            <span>{resourceCount} resources</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[...learningContent.videos, ...learningContent.resources]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex items-center gap-3 text-sm">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.url ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {item.url ? <VideoLibrary className="w-4 h-4" /> : <Description className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Module Form Component
const ModuleForm = ({ module, onSave, onCancel, subjects, grades }) => {
  const [formData, setFormData] = useState({
    subject: module.subject || '',
    grade: module.grade || '',
    title: module.title || '',
    description: module.description || '',
    units: module.units || [{ title: '', content: '', duration: '' }],
    quiz: module.quiz || [{ question: '', options: ['', '', '', ''], correct: 0 }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...module,
      ...formData
    });
  };

  const addUnit = () => {
    setFormData(prev => ({
      ...prev,
      units: [...prev.units, { title: '', content: '', duration: '' }]
    }));
  };

  const updateUnit = (index, field, value) => {
    const updatedUnits = [...formData.units];
    updatedUnits[index][field] = value;
    setFormData(prev => ({ ...prev, units: updatedUnits }));
  };

  const addQuizQuestion = () => {
    setFormData(prev => ({
      ...prev,
      quiz: [...prev.quiz, { question: '', options: ['', '', '', ''], correct: 0 }]
    }));
  };

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuiz = [...formData.quiz];
    updatedQuiz[index][field] = value;
    setFormData(prev => ({ ...prev, quiz: updatedQuiz }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Grade</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Module Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Units Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-900">Learning Units</h4>
          <button
            type="button"
            onClick={addUnit}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Add className="w-4 h-4" />
            Add Unit
          </button>
        </div>

        <div className="space-y-4">
          {formData.units.map((unit, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit Title</label>
                  <input
                    type="text"
                    value={unit.title}
                    onChange={(e) => updateUnit(index, 'title', e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="Unit title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={unit.duration}
                    onChange={(e) => updateUnit(index, 'duration', e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., 15 min"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={unit.content}
                  onChange={(e) => updateUnit(index, 'content', e.target.value)}
                  rows={3}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Unit content..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-900">Quiz Questions</h4>
          <button
            type="button"
            onClick={addQuizQuestion}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Add className="w-4 h-4" />
            Add Question
          </button>
        </div>

        <div className="space-y-4">
          {formData.quiz.map((question, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter question"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Option {optIndex + 1}
                      {question.correct === optIndex && <span className="text-green-600 ml-1">✓</span>}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optIndex] = e.target.value;
                        updateQuizQuestion(index, 'options', updatedOptions);
                      }}
                      className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                      placeholder={`Option ${optIndex + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Correct Answer</label>
                <select
                  value={question.correct}
                  onChange={(e) => updateQuizQuestion(index, 'correct', parseInt(e.target.value))}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                >
                  {question.options.map((_, optIndex) => (
                    <option key={optIndex} value={optIndex}>Option {optIndex + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Cancel className="w-4 h-4 inline mr-1" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 inline mr-1" />
          Save Module
        </button>
      </div>
    </form>
  );
};

// Video Upload Form Component
const VideoUploadForm = ({ onUpload, onCancel, uploadProgress, subjects }) => {
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please select a video file');
      return;
    }
    await onUpload(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }
    setFormData(prev => ({ ...prev, file }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 15:30"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Name</label>
        <input
          type="text"
          value={formData.instructor}
          onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, MOV, AVI (Max: 100MB)</p>
      </div>

      {uploadProgress !== null && uploadProgress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploadProgress !== null && uploadProgress !== undefined}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          <CloudUpload className="w-4 h-4 inline mr-1" />
          Upload Video
        </button>
      </div>
    </form>
  );
};

// Resource Upload Form Component
const ResourceUploadForm = ({ onUpload, onCancel, uploadProgress, subjects, resourceTypes }) => {
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    description: '',
    type: '',
    file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please select a file');
      return;
    }
    await onUpload(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Type</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>
                {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Resource Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Resource File</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, PPT, XLS, TXT (Max: 50MB)</p>
      </div>

      {uploadProgress !== null && uploadProgress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploadProgress !== null && uploadProgress !== undefined}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <CloudUpload className="w-4 h-4 inline mr-1" />
          Upload Resource
        </button>
      </div>
    </form>
  );
};

export default LearningMng;