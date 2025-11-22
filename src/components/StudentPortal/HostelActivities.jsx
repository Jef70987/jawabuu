import React, { useState } from "react";

const Notices = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample notices data
  const noticesData = [
    {
      id: 1,
      title: "Mid-Term Examinations",
      category: "academic",
      date: "2024-02-15",
      priority: "high",
      content: "Mid-term examinations will commence from 26th February to 1st March 2024. All students should ensure they are well prepared.",
      author: "Principal's Office",
      attachments: ["Exam Timetable.pdf"]
    },
    {
      id: 2,
      title: "Sports Day Preparation",
      category: "sports",
      date: "2024-02-10",
      priority: "medium",
      content: "Annual sports day will be held on 15th March 2024. Practice sessions begin next week.",
      author: "Sports Department",
      attachments: ["Sports Schedule.docx"]
    },
    {
      id: 3,
      title: "Library Hours Extension",
      category: "general",
      date: "2024-02-08",
      priority: "low",
      content: "Library will remain open until 6:00 PM during examination period to accommodate students' study needs.",
      author: "Library Department",
      attachments: []
    },
    {
      id: 4,
      title: "Science Fair Projects",
      category: "academic",
      date: "2024-02-05",
      priority: "high",
      content: "Submission deadline for science fair projects is 20th February 2024. Projects should align with CBC competencies.",
      author: "Science Department",
      attachments: ["Project Guidelines.pdf", "Submission Form.docx"]
    },
    {
      id: 5,
      title: "Parent-Teacher Meeting",
      category: "general",
      date: "2024-02-03",
      priority: "medium",
      content: "Term 1 parent-teacher meeting scheduled for 25th February 2024. Parents are encouraged to attend.",
      author: "Administration",
      attachments: ["Meeting Schedule.pdf"]
    },
    {
      id: 6,
      title: "Music Club Auditions",
      category: "clubs",
      date: "2024-02-01",
      priority: "low",
      content: "Music club auditions for new members will be held every Thursday after school in the music room.",
      author: "Music Club",
      attachments: []
    }
  ];

  const categories = [
    { id: "all", label: "All Notices", count: noticesData.length },
    { id: "academic", label: "Academic", count: noticesData.filter(n => n.category === "academic").length },
    { id: "sports", label: "Sports", count: noticesData.filter(n => n.category === "sports").length },
    { id: "clubs", label: "Clubs", count: noticesData.filter(n => n.category === "clubs").length },
    { id: "general", label: "General", count: noticesData.filter(n => n.category === "general").length }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "sports": return "bg-green-100 text-green-800";
      case "clubs": return "bg-purple-100 text-purple-800";
      case "general": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredNotices = noticesData.filter(notice => {
    const matchesFilter = activeFilter === "all" || notice.category === activeFilter;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            School Notices
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Important announcements and updates
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeFilter === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">{category.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === category.id
                  ? "bg-blue-400"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Notice Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg pr-2">
                    {notice.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(notice.category)}`}>
                    {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                  </span>
                  <span>{formatDate(notice.date)}</span>
                  <span>•</span>
                  <span>By {notice.author}</span>
                </div>
              </div>

              {/* Notice Content */}
              <div className="p-4">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {notice.content}
                </p>

                {/* Attachments */}
                {notice.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="space-y-1">
                      {notice.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="hover:text-blue-600 cursor-pointer">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Mark as Read
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-600 text-sm">
              {searchTerm ? "Try adjusting your search terms" : "No notices available in this category"}
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {noticesData.length}
            </div>
            <div className="text-sm text-gray-600">Total Notices</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {noticesData.filter(n => n.priority === "high").length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {noticesData.filter(n => n.category === "academic").length}
            </div>
            <div className="text-sm text-gray-600">Academic Notices</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;