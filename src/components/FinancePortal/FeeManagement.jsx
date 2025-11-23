/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit, FiDollarSign, FiBook, FiLayers, FiSearch, FiDownload, FiFilter, FiUsers, FiCreditCard, FiBarChart2 } from "react-icons/fi";

const FeeManagement = () => {
  // State for fee categories
  const [feeCategories, setFeeCategories] = useState([
    { id: 1, name: "Tuition Fee", description: "Academic tuition fees" },
    { id: 2, name: "Examination Fee", description: "Exam and assessment fees" },
    { id: 3, name: "Activity Fee", description: "Extra-curricular activities" }
  ]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  // State for academic terms
  const [terms, setTerms] = useState([
    { id: 1, name: "Term 1", year: "2024", startDate: "2024-01-08", endDate: "2024-03-22" },
    { id: 2, name: "Term 2", year: "2024", startDate: "2024-05-06", endDate: "2024-07-26" },
    { id: 3, name: "Term 3", year: "2024", startDate: "2024-09-02", endDate: "2024-11-29" }
  ]);
  const [termName, setTermName] = useState("");
  const [termYear, setTermYear] = useState("2024");

  // State for fee structures
  const [feeStructures, setFeeStructures] = useState([
    { id: 1, grade: "Grade 1", category: "Tuition Fee", term: "Term 1", amount: 15000, dueDate: "2024-01-31" },
    { id: 2, grade: "Grade 1", category: "Examination Fee", term: "Term 1", amount: 2000, dueDate: "2024-02-15" }
  ]);
  const [grade, setGrade] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  // State for fee collections
  const [feeCollections, setFeeCollections] = useState([
    { 
      id: 1, 
      studentId: "STU001", 
      studentName: "John Mwangi", 
      grade: "Grade 1", 
      term: "Term 1", 
      amountPaid: 15000, 
      paymentDate: "2024-01-15", 
      paymentMethod: "MPESA",
      receiptNumber: "RCP-001",
      status: "completed"
    },
    { 
      id: 2, 
      studentId: "STU002", 
      studentName: "Mary Wanjiku", 
      grade: "Grade 1", 
      term: "Term 1", 
      amountPaid: 10000, 
      paymentDate: "2024-01-16", 
      paymentMethod: "Cash",
      receiptNumber: "RCP-002",
      status: "partial"
    },
    { 
      id: 3, 
      studentId: "STU003", 
      studentName: "Peter Kamau", 
      grade: "Grade 2", 
      term: "Term 1", 
      amountPaid: 17000, 
      paymentDate: "2024-01-17", 
      paymentMethod: "Bank Transfer",
      receiptNumber: "RCP-003",
      status: "completed"
    }
  ]);

  // State for new fee collection
  const [newCollection, setNewCollection] = useState({
    studentId: "",
    studentName: "",
    grade: "",
    term: "",
    amountPaid: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "",
    description: ""
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState("");
  const [selectedTermFilter, setSelectedTermFilter] = useState("");

  // Statistics
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCollected: 0,
    pendingCollections: 0,
    activeStructures: 0,
    collectionRate: 0
  });

  // Calculate statistics
  useEffect(() => {
    const totalRevenue = feeStructures.reduce((sum, structure) => sum + structure.amount, 0);
    const totalCollected = feeCollections.reduce((sum, collection) => sum + collection.amountPaid, 0);
    const activeStructures = feeStructures.length;
    const collectionRate = totalRevenue > 0 ? (totalCollected / totalRevenue) * 100 : 0;

    setStats({
      totalRevenue,
      totalCollected,
      pendingCollections: totalRevenue - totalCollected,
      activeStructures,
      collectionRate
    });
  }, [feeStructures, feeCollections]);

  // Add a new fee category
  const addFeeCategory = (e) => {
    e.preventDefault();
    if (categoryName) {
      const newCategory = { 
        id: Date.now(), 
        name: categoryName, 
        description: categoryDescription 
      };
      setFeeCategories([...feeCategories, newCategory]);
      setCategoryName("");
      setCategoryDescription("");
    }
  };

  // Add a new academic term
  const addTerm = (e) => {
    e.preventDefault();
    if (termName) {
      const newTerm = { 
        id: Date.now(), 
        name: termName, 
        year: termYear,
        startDate: "",
        endDate: ""
      };
      setTerms([...terms, newTerm]);
      setTermName("");
    }
  };

  // Add a new fee structure
  const addFeeStructure = (e) => {
    e.preventDefault();
    if (grade && selectedCategory && selectedTerm && amount && dueDate) {
      const newStructure = { 
        id: Date.now(), 
        grade, 
        category: selectedCategory, 
        term: selectedTerm,
        amount: parseFloat(amount),
        dueDate
      };
      setFeeStructures([...feeStructures, newStructure]);
      setGrade("");
      setSelectedCategory("");
      setSelectedTerm("");
      setAmount("");
      setDueDate("");
    }
  };

  // Add a new fee collection
  const addFeeCollection = (e) => {
    e.preventDefault();
    if (newCollection.studentId && newCollection.studentName && newCollection.grade && 
        newCollection.term && newCollection.amountPaid && newCollection.paymentMethod) {
      const collection = {
        id: Date.now(),
        ...newCollection,
        amountPaid: parseFloat(newCollection.amountPaid),
        receiptNumber: `RCP-${String(feeCollections.length + 1).padStart(3, '0')}`,
        status: "completed"
      };
      
      setFeeCollections([collection, ...feeCollections]);
      setNewCollection({
        studentId: "",
        studentName: "",
        grade: "",
        term: "",
        amountPaid: "",
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: "",
        description: ""
      });
    }
  };

  // Delete functions
  const deleteFeeStructure = (id) => {
    setFeeStructures(feeStructures.filter(structure => structure.id !== id));
  };

  const deleteFeeCollection = (id) => {
    setFeeCollections(feeCollections.filter(collection => collection.id !== id));
  };

  const deleteFeeCategory = (id) => {
    setFeeCategories(feeCategories.filter(category => category.id !== id));
  };

  // Filter fee structures
  const filteredFeeStructures = feeStructures.filter(structure => {
    const matchesSearch = structure.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGradeFilter || structure.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  // Filter fee collections
  const filteredFeeCollections = feeCollections.filter(collection => {
    const matchesSearch = collection.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGradeFilter || collection.grade === selectedGradeFilter;
    const matchesTerm = !selectedTermFilter || collection.term === selectedTermFilter;
    return matchesSearch && matchesGrade && matchesTerm;
  });

  // Get unique grades for filter
  const uniqueGrades = [...new Set(feeStructures.map(structure => structure.grade))];
  const uniqueTerms = [...new Set(terms.map(term => term.name))];

  // Get status badge style
  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800 border-green-200",
      partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pending: "bg-red-100 text-red-800 border-red-200"
    };
    return `px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`;
  };

  const paymentMethods = ["Cash", "MPESA", "Bank Transfer", "Cheque", "Credit Card"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiDollarSign className="text-blue-600" />
              Fee Management System
            </h1>
            <p className="text-gray-600 mt-2">Manage school fees, structures, and collections</p>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <FiDownload />
              Export Report
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <FiDollarSign className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Collected</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.totalCollected.toLocaleString()}</p>
              </div>
              <FiCreditCard className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Collections</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.pendingCollections.toLocaleString()}</p>
              </div>
              <FiLayers className="text-amber-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Structures</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeStructures}</p>
              </div>
              <FiBook className="text-purple-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-800">{stats.collectionRate.toFixed(1)}%</p>
              </div>
              <FiBarChart2 className="text-cyan-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Fee Categories Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FiBook className="text-blue-600" />
              Fee Categories
            </h2>
          </div>

          <form onSubmit={addFeeCategory} className="mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Library Fee, Sports Fee"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Brief description of the category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FiPlus />
              Add Category
            </button>
          </form>

          <div className="max-h-60 overflow-y-auto">
            {feeCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <button 
                  onClick={() => deleteFeeCategory(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Terms Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FiLayers className="text-green-600" />
              Academic Terms
            </h2>
          </div>

          <form onSubmit={addTerm} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Term Name</label>
                <input
                  type="text"
                  value={termName}
                  onChange={(e) => setTermName(e.target.value)}
                  placeholder="e.g., Term 1, First Semester"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                <input
                  type="text"
                  value={termYear}
                  onChange={(e) => setTermYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FiPlus />
              Add Term
            </button>
          </form>

          <div className="max-h-60 overflow-y-auto">
            {terms.map((term) => (
              <div key={term.id} className="p-3 border-b border-gray-200 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{term.name} - {term.year}</p>
                    {term.startDate && (
                      <p className="text-sm text-gray-600">
                        {term.startDate} to {term.endDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Structures Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 lg:mb-0">
            <FiBook className="text-purple-600" />
            Fee Structures
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search structures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
            
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Grades</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={addFeeStructure} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Class</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g., Grade 1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {feeCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Term</option>
                {terms.map((term) => (
                  <option key={term.id} value={term.name}>
                    {term.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (Ksh)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors"
          >
            <FiPlus />
            Add Fee Structure
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Term</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeeStructures.map((structure) => (
                <tr key={structure.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{structure.grade}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{structure.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{structure.term}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    Ksh {structure.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{structure.dueDate}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => deleteFeeStructure(structure.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fee Collections Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 lg:mb-0">
            <FiCreditCard className="text-green-600" />
            Fee Collections
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
            
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Grades</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>

            <select
              value={selectedTermFilter}
              onChange={(e) => setSelectedTermFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Terms</option>
              {uniqueTerms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={addFeeCollection} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={newCollection.studentId}
                onChange={(e) => setNewCollection({...newCollection, studentId: e.target.value})}
                placeholder="e.g., STU001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                value={newCollection.studentName}
                onChange={(e) => setNewCollection({...newCollection, studentName: e.target.value})}
                placeholder="Full student name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                value={newCollection.grade}
                onChange={(e) => setNewCollection({...newCollection, grade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Grade</option>
                {uniqueGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select
                value={newCollection.term}
                onChange={(e) => setNewCollection({...newCollection, term: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Term</option>
                {terms.map((term) => (
                  <option key={term.id} value={term.name}>
                    {term.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid (Ksh)</label>
              <input
                type="number"
                value={newCollection.amountPaid}
                onChange={(e) => setNewCollection({...newCollection, amountPaid: e.target.value})}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={newCollection.paymentMethod}
                onChange={(e) => setNewCollection({...newCollection, paymentMethod: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Method</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
              <input
                type="date"
                value={newCollection.paymentDate}
                onChange={(e) => setNewCollection({...newCollection, paymentDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FiPlus />
            Record Payment
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Term</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Method</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeeCollections.map((collection) => (
                <tr key={collection.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{collection.studentName}</p>
                      <p className="text-sm text-gray-500">{collection.studentId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{collection.grade}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{collection.term}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">
                    Ksh {collection.amountPaid.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{collection.paymentDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{collection.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(collection.status)}>
                      {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => deleteFeeCollection(collection.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;