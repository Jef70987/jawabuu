import { useState } from 'react';

const HelpSupport = () => {
  // State for active FAQ category
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState(null);
  
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    priority: 'medium',
    message: ''
  });
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for ticket submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ data
  const faqCategories = {
    general: [
      {
        id: 1,
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password. If you do not receive the email, check your spam folder or contact system administration.'
      },
      {
        id: 2,
        question: 'How can I update my profile information?',
        answer: 'Go to your profile page by clicking on your profile picture in the top right corner. From there, you can edit your personal information, contact details, and profile picture. Remember to save your changes.'
      },
      {
        id: 3,
        question: 'Where can I find my teaching schedule?',
        answer: 'Your teaching schedule is available on the main dashboard under the "Teaching Schedule" section. You can also access it through the "Classes" menu in the navigation sidebar.'
      }
    ],
    technical: [
      {
        id: 4,
        question: 'The system is running slow. What should I do?',
        answer: 'First, try refreshing your browser. Clear your browser cache and cookies. If the issue persists, check your internet connection. For ongoing performance issues, please contact the IT support team with details about when the slowness occurs.'
      },
      {
        id: 5,
        question: 'I cannot upload files. What could be the issue?',
        answer: 'Ensure the file size is under 50MB and in supported formats (PDF, DOC, DOCX, PPT, PPTX, JPG, PNG). Check your internet connection. If problems continue, try using a different browser or contact technical support.'
      },
      {
        id: 6,
        question: 'How do I enable browser notifications?',
        answer: 'Click on the bell icon in the top navigation bar. Your browser will ask for permission to show notifications. Click "Allow" to receive important updates and reminders.'
      }
    ],
    grading: [
      {
        id: 7,
        question: 'How do I enter grades for assignments?',
        answer: 'Navigate to the "Grade Work" section from your dashboard. Select the class and assignment, then enter grades for each student. You can also upload grades via CSV file for bulk entry.'
      },
      {
        id: 8,
        question: 'Can I export grade reports?',
        answer: 'Yes, go to the "Reports" section and select "Grade Reports". Choose the class and date range, then click "Export" to download the report in PDF or Excel format.'
      },
      {
        id: 9,
        question: 'How do I weight different assignments?',
        answer: 'In the "Grade Settings" section, you can set weights for different assignment types. The system will automatically calculate weighted averages based on your settings.'
      }
    ],
    attendance: [
      {
        id: 10,
        question: 'How do I mark student attendance?',
        answer: 'Go to the "Attendance" section, select your class and date. Click on each student to mark them present, absent, or late. Changes are saved automatically.'
      },
      {
        id: 11,
        question: 'Can I view attendance reports?',
        answer: 'Yes, attendance reports are available under the "Reports" section. You can generate reports by student, class, or date range with various filtering options.'
      },
      {
        id: 12,
        question: 'How do I correct attendance mistakes?',
        answer: 'Navigate to the attendance section, find the date with the error, and click on the student\'s status to change it. Changes are logged for audit purposes.'
      }
    ]
  };

  // Support resources
  const supportResources = [
    {
      title: 'Teacher Portal Guide',
      description: 'Complete user manual for the teacher portal',
      icon: '📚',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: '🎬',
      link: '#'
    },
    {
      title: 'Technical Requirements',
      description: 'System requirements and browser compatibility',
      icon: '⚙️',
      link: '#'
    },
    {
      title: 'Academic Calendar',
      description: 'Important dates and deadlines for the academic year',
      icon: '📅',
      link: '#'
    }
  ];

  // Contact methods
  const contactMethods = [
    {
      method: 'Email Support',
      details: 'support@teachersportal.edu',
      response: 'Within 24 hours',
      icon: '✉️'
    },
    {
      method: 'Phone Support',
      details: '+1 (555) 123-4567',
      response: 'Mon-Fri, 8AM-5PM',
      icon: '📞'
    },
    {
      method: 'Live Chat',
      details: 'Available on dashboard',
      response: 'Instant during business hours',
      icon: '💬'
    },
    {
      method: 'IT Help Desk',
      details: 'Room 205, Main Building',
      response: 'Walk-in support',
      icon: '🏢'
    }
  ];

  // Handle FAQ toggle
  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: 'technical',
      priority: 'medium',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter FAQs based on search
  const filteredFaqs = Object.values(faqCategories)
    .flat()
    .filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex-1 bg-gray-50 text-gray-800 overflow-hidden flex flex-col max-h-screen">
      {/* Main Content Area with Scroll (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden max-h-full">
        <div className="w-full max-w-full">
          {/* Header */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 md:py-6 mb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Help & Support</h1>
              <p className="text-gray-600">Get assistance and find answers to your questions</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-sm text-gray-500">Need urgent help?</div>
              <div className="text-lg font-semibold text-blue-600">+1 (555) 123-4567</div>
            </div>
          </header>

          {/* Quick Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{method.method}</h3>
                <p className="text-gray-600 text-sm mb-2">{method.details}</p>
                <p className="text-green-600 text-xs font-medium">Response: {method.response}</p>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">How can we help you today?</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
            </div>
            
            {/* FAQ Categories */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto space-x-1 px-6 [&::-webkit-scrollbar]:hidden">
                {Object.keys(faqCategories).map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeCategory === category
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="p-6">
              {searchTerm ? (
                // Search results
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Search Results ({filteredFaqs.length})
                  </h3>
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map(faq => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <span className="text-gray-400 transform transition-transform">
                            {openFaq === faq.id ? '▲' : '▼'}
                          </span>
                        </button>
                        {openFaq === faq.id && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No results found for "{searchTerm}"
                    </div>
                  )}
                </div>
              ) : (
                // Category FAQs
                <div className="space-y-4">
                  {faqCategories[activeCategory].map(faq => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        <span className="text-gray-400 transform transition-transform">
                          {openFaq === faq.id ? '▲' : '▼'}
                        </span>
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Support Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Support Team</h2>
              
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-green-500 text-lg mr-2">✓</span>
                    <div>
                      <div className="font-medium text-green-800">Message Sent Successfully!</div>
                      <div className="text-green-600 text-sm">We'll get back to you within 24 hours.</div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={contactForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="academic">Academic Support</option>
                      <option value="account">Account Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high', 'urgent'].map(priority => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={contactForm.priority === priority}
                          onChange={handleInputChange}
                          className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe your issue in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Support Resources */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Support Resources</h2>
              
              <div className="space-y-4">
                {supportResources.map((resource, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="text-2xl mr-4">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                    <span className="text-blue-500">→</span>
                  </div>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Quick Tip</h3>
                <p className="text-blue-700 text-sm">
                  For faster resolution, include screenshots and detailed steps to reproduce the issue when contacting support.
                </p>
              </div>

              {/* System Status */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">System Status</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    All Systems Operational
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Last updated: {new Date().toLocaleDateString()} • No ongoing incidents
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="text-red-500 text-2xl mr-4">🚨</div>
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Emergency Technical Support</h3>
                <p className="text-red-700 text-sm mb-3">
                  For critical system outages or urgent technical issues affecting multiple users, contact emergency support immediately.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="font-medium text-red-800">24/7 Emergency Line: +1 (555) 911-TECH</div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;