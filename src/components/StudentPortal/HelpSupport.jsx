import React, { useState } from 'react';
import { FiHelpCircle, FiMessageCircle, FiBook, FiVideo, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const StudentHelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Simple FAQ for students
  const faqCategories = [
    {
      id: 'studying',
      title: 'Studying Help',
      questions: [
        {
          id: 1,
          question: 'How do I check my grades?',
          answer: 'Go to "My Performance" page to see all your subject scores and progress.'
        },
        {
          id: 2,
          question: 'Where can I find study tips?',
          answer: 'Check the "Ways to Improve" page for simple tips to help you learn better.'
        },
        {
          id: 3,
          question: 'How do I track my homework?',
          answer: 'Use "My Work Plan" to see what you need to do, what you are doing, and what is finished.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Help',
      questions: [
        {
          id: 4,
          question: 'The page is not loading',
          answer: 'Check your internet connection and try refreshing the page. If it still does not work, tell your teacher.'
        },
        {
          id: 5,
          question: 'I forgot my password',
          answer: 'Ask your teacher to reset your password for you.'
        }
      ]
    }
  ];

  // Simple contact information
  const contactInfo = [
    {
      person: 'Your Teacher',
      help: 'For all school work questions',
      when: 'During school hours'
    },
    {
      person: 'Computer Teacher',
      help: 'For technical problems',
      when: 'Monday to Friday'
    },
    {
      person: 'School Office',
      help: 'For serious issues',
      when: '8:00 AM - 4:00 PM'
    }
  ];

  // Quick guides
  const quickGuides = [
    {
      title: 'Check Your Grades',
      steps: ['Click "My Performance"', 'See your scores', 'Find subjects to improve'],
      color: 'blue'
    },
    {
      title: 'Get Study Tips',
      steps: ['Click "Ways to Improve"', 'Read the tips', 'Try one today'],
      color: 'red'
    },
    {
      title: 'Plan Your Work',
      steps: ['Click "My Work Plan"', 'See what to do', 'Move tasks when done'],
      color: 'blue'
    }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-3 flex items-center justify-center gap-2">
            <FiHelpCircle className="text-blue-500" />
            Student Help Center
          </h1>
          <p className="text-black text-lg">
            Get help with your learning dashboard
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border border-gray-300 rounded-lg mb-6">
          <div className="flex border-b border-gray-300">
            {[
              { id: 'faq', label: 'Help Questions', icon: <FiHelpCircle /> },
              { id: 'contact', label: 'Who to Ask', icon: <FiMessageCircle /> },
              { id: 'guides', label: 'Quick Guides', icon: <FiBook /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-6 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-black hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-4">Common Questions</h2>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((category) => (
                    <div key={category.id} className="bg-white border border-gray-300 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-black mb-3">{category.title}</h3>
                      <div className="space-y-3">
                        {category.questions.map((faq) => (
                          <div key={faq.id} className="border border-gray-300 rounded-lg">
                            <button
                              onClick={() => toggleFaq(faq.id)}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <span className="font-medium text-black pr-4">{faq.question}</span>
                              {expandedFaq === faq.id ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                            </button>
                            {expandedFaq === faq.id && (
                              <div className="px-3 pb-3 border-t border-gray-200 pt-3">
                                <p className="text-black leading-relaxed">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FiHelpCircle className="mx-auto text-gray-400 text-4xl mb-3" />
                    <h3 className="text-xl font-semibold text-black mb-2">No results found</h3>
                    <p className="text-black">Try different search words</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-4">Who Can Help You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 text-center">
                      <h3 className="font-bold text-black text-lg mb-2">{contact.person}</h3>
                      <p className="text-black text-sm mb-2">{contact.help}</p>
                      <p className="text-gray-600 text-sm">{contact.when}</p>
                    </div>
                  ))}
                </div>

                {/* Emergency Note */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Important</h3>
                  <p className="text-red-700 text-sm">
                    If you see something wrong or feel unsafe, tell a teacher immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Guides Tab */}
            {activeTab === 'guides' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-4">Quick How-To Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickGuides.map((guide, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
                      <h3 className={`font-bold text-lg mb-3 ${
                        guide.color === 'blue' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {guide.title}
                      </h3>
                      <ol className="space-y-2">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-2">
                            <span className="w-5 h-5 bg-gray-200 text-black rounded-full text-sm flex items-center justify-center font-semibold mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            <span className="text-black text-sm flex-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-black mb-2">Still Need Help?</h2>
          <p className="text-black mb-4">
            Ask your teacher for help with anything on this system.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Talk to Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHelpSupport;