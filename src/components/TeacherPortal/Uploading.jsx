/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Upload = () => {
  // State for form data
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    term: '',
    academicYear: '',
    assessmentType: '',
    file: null,
    description: ''
  });

  // State for upload history
  const [uploadHistory, setUploadHistory] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // CBC Subjects by grade level
  const subjectsByGrade = {
    'Grade 1': [
      'Literacy Activities',
      'Kiswahili Activities',
      'English Activities',
      'Mathematical Activities',
      'Environmental Activities',
      'Hygiene and Nutrition Activities',
      'Creative Activities',
      'Religious Education Activities'
    ],
    'Grade 2': [
      'Literacy Activities',
      'Kiswahili Activities',
      'English Activities',
      'Mathematical Activities',
      'Environmental Activities',
      'Hygiene and Nutrition Activities',
      'Creative Activities',
      'Religious Education Activities'
    ],
    'Grade 3': [
      'Literacy Activities',
      'Kiswahili Activities',
      'English Activities',
      'Mathematical Activities',
      'Environmental Activities',
      'Hygiene and Nutrition Activities',
      'Creative Activities',
      'Religious Education Activities'
    ],
    'Grade 4': [
      'English',
      'Kiswahili',
      'Mathematics',
      'Science and Technology',
      'Social Studies',
      'Creative Arts',
      'Physical and Health Education',
      'Religious Education'
    ],
    'Grade 5': [
      'English',
      'Kiswahili',
      'Mathematics',
      'Science and Technology',
      'Social Studies',
      'Creative Arts',
      'Physical and Health Education',
      'Religious Education'
    ],
    'Grade 6': [
      'English',
      'Kiswahili',
      'Mathematics',
      'Science and Technology',
      'Social Studies',
      'Creative Arts',
      'Physical and Health Education',
      'Religious Education'
    ]
  };

  // CBC Grades
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

  // Terms
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  // Assessment Types
  const assessmentTypes = [
    'Opening Assessment',
    'Mid-Term Assessment',
    'End of Term Assessment',
    'Project Work',
    'Practical Assessment',
    'Oral Assessment',
    'Portfolio Assessment'
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset subject when grade changes
    if (name === 'grade') {
      setFormData(prev => ({
        ...prev,
        grade: value,
        subject: ''
      }));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ['.csv', '.xlsx', '.xls', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (!validTypes.includes(`.${fileExtension}`) && !validTypes.includes(file.type)) {
        alert('Please upload a valid Excel or CSV file');
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    // Simulate file upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUpload = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        ...formData,
        status: 'Completed',
        records: Math.floor(Math.random() * 40) + 10 // Simulated record count
      };

      setUploadHistory(prev => [newUpload, ...prev]);
      
      // Reset form
      setFormData({
        subject: '',
        grade: '',
        term: '',
        academicYear: '',
        assessmentType: '',
        file: null,
        description: ''
      });
      
      // Reset file input
      document.getElementById('file-upload').value = '';
      
      alert('Results uploaded successfully!');
    } catch (error) {
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Download template
  const downloadTemplate = () => {
    const templateData = `Student ID,Student Name,Assessment Score,Comments\nEMB001,John Doe,85,Good performance\nEMB002,Jane Smith,92,Excellent work`;
    const blob = new Blob([templateData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cbc_results_template_${formData.grade || 'grade'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get current academic year
  const getCurrentAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}/${currentYear + 1}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Student Results</h1>
          <p className="text-gray-600">Kenya CBC Teacher Portal - Results Management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload New Results</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grade and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                      disabled={!formData.grade}
                    >
                      <option value="">Select Subject</option>
                      {formData.grade && subjectsByGrade[formData.grade]?.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    {!formData.grade && (
                      <p className="text-xs text-gray-500 mt-1">Please select a grade first</p>
                    )}
                  </div>
                </div>

                {/* Term and Academic Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Term *
                    </label>
                    <select
                      name="term"
                      value={formData.term}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Select Term</option>
                      {terms.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <input
                      type="text"
                      name="academicYear"
                      value={formData.academicYear || getCurrentAcademicYear()}
                      onChange={handleInputChange}
                      placeholder="e.g., 2024/2025"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Assessment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Type *
                  </label>
                  <select
                    name="assessmentType"
                    value={formData.assessmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Assessment Type</option>
                    {assessmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Results File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.xls"
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Excel or CSV files only (MAX. 5MB)
                        </p>
                      </div>
                    </label>
                  </div>
                  {formData.file && (
                    <div className="mt-3 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-green-800">
                          {formData.file.name}
                        </span>
                      </div>
                      <span className="text-xs text-green-600">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add any notes about this assessment..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isUploading || !formData.file}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      'Upload Results'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={downloadTemplate}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Template
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Upload History and Instructions */}
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Instructions</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Use the provided template for correct formatting</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Ensure all required fields are filled in the form</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>File size should not exceed 5MB</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Only Excel (.xlsx, .xls) and CSV files accepted</span>
                </div>
              </div>
            </div>

            {/* Upload History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Uploads</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploadHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No uploads yet</p>
                  </div>
                ) : (
                  uploadHistory.map(upload => (
                    <div key={upload.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{upload.subject}</h4>
                          <p className="text-sm text-gray-600">{upload.grade} • {upload.term}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {upload.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {upload.assessmentType} • {upload.records} records
                      </p>
                      <p className="text-xs text-gray-400">{upload.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;