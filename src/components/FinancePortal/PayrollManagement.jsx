import React, { useState, useEffect } from "react";
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit, 
  FiDollarSign, 
  FiUsers, 
  FiDownload, 
  FiPrinter,
  FiSearch,
  FiFilter,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCreditCard,
  FiPieChart,
  FiBarChart2,
  FiTrendingUp,
  FiEye
} from "react-icons/fi";

const PayrollManagement = () => {
  // State for staff members
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "John Mwangi",
      email: "john.mwangi@school.edu",
      phone: "+254712345678",
      position: "Teacher",
      department: "Academic",
      contractType: "Full-Time",
      basicSalary: 45000,
      joinDate: "2023-01-15",
      bankAccount: "1234567890",
      bankName: "KCB Bank"
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      email: "mary.wanjiku@school.edu",
      phone: "+254723456789",
      position: "Administrator",
      department: "Administration",
      contractType: "Full-Time",
      basicSalary: 38000,
      joinDate: "2023-03-20",
      bankAccount: "2345678901",
      bankName: "Equity Bank"
    },
    {
      id: 3,
      name: "Peter Kamau",
      email: "peter.kamau@school.edu",
      phone: "+254734567890",
      position: "Support Staff",
      department: "Maintenance",
      contractType: "Part-Time",
      basicSalary: 25000,
      joinDate: "2023-06-10",
      bankAccount: "3456789012",
      bankName: "Cooperative Bank"
    }
  ]);

  // State for payroll components
  const [allowances, setAllowances] = useState([
    { id: 1, name: "Housing Allowance", amount: 15000, type: "fixed" },
    { id: 2, name: "Transport Allowance", amount: 8000, type: "fixed" },
    { id: 3, name: "Medical Allowance", amount: 5000, type: "fixed" }
  ]);

  const [deductions, setDeductions] = useState([
    { id: 1, name: "PAYE Tax", amount: 7500, type: "percentage", percentage: 15 },
    { id: 2, name: "NSSF", amount: 1080, type: "fixed" },
    { id: 3, name: "NHIF", amount: 1500, type: "fixed" },
    { id: 4, name: "Pension", amount: 2000, type: "fixed" }
  ]);

  // State for payroll records
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [currentPayroll, setCurrentPayroll] = useState({
    month: new Date().toISOString().slice(0, 7),
    staffId: "",
    overtime: 0,
    bonus: 0,
    absentDays: 0
  });

  // State for forms
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    contractType: "",
    basicSalary: "",
    joinDate: new Date().toISOString().split('T')[0],
    bankAccount: "",
    bankName: ""
  });

  const [newAllowance, setNewAllowance] = useState({ name: "", amount: "", type: "fixed" });
  const [newDeduction, setNewDeduction] = useState({ name: "", amount: "", type: "fixed", percentage: "" });

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Statistics
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalPayroll: 0,
    averageSalary: 0,
    pendingPayments: 0
  });

  // Calculate statistics
  useEffect(() => {
    const totalStaff = staffMembers.length;
    const totalPayroll = staffMembers.reduce((sum, staff) => sum + staff.basicSalary, 0);
    const averageSalary = totalStaff > 0 ? totalPayroll / totalStaff : 0;

    setStats({
      totalStaff,
      totalPayroll,
      averageSalary,
      pendingPayments: totalPayroll
    });
  }, [staffMembers]);

  // Add new staff member
  const addStaffMember = (e) => {
    e.preventDefault();
    const staff = {
      id: Date.now(),
      ...newStaff,
      basicSalary: parseFloat(newStaff.basicSalary)
    };
    setStaffMembers([...staffMembers, staff]);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      contractType: "",
      basicSalary: "",
      joinDate: new Date().toISOString().split('T')[0],
      bankAccount: "",
      bankName: ""
    });
  };

  // Add allowance
  const addAllowance = (e) => {
    e.preventDefault();
    const allowance = {
      id: Date.now(),
      ...newAllowance,
      amount: parseFloat(newAllowance.amount)
    };
    setAllowances([...allowances, allowance]);
    setNewAllowance({ name: "", amount: "", type: "fixed" });
  };

  // Add deduction
  const addDeduction = (e) => {
    e.preventDefault();
    const deduction = {
      id: Date.now(),
      ...newDeduction,
      amount: parseFloat(newDeduction.amount),
      percentage: newDeduction.percentage ? parseFloat(newDeduction.percentage) : null
    };
    setDeductions([...deductions, deduction]);
    setNewDeduction({ name: "", amount: "", type: "fixed", percentage: "" });
  };

  // Process payroll
  const processPayroll = (e) => {
    e.preventDefault();
    const staff = staffMembers.find(s => s.id === parseInt(currentPayroll.staffId));
    if (!staff) return;

    const totalAllowances = allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
    const totalDeductions = deductions.reduce((sum, deduction) => {
      if (deduction.type === "percentage") {
        return sum + (staff.basicSalary * (deduction.percentage / 100));
      }
      return sum + deduction.amount;
    }, 0);

    const overtimePay = currentPayroll.overtime * (staff.basicSalary / 160); // Assuming 160 working hours per month
    const absentDeduction = currentPayroll.absentDays * (staff.basicSalary / 22); // Assuming 22 working days per month

    const grossSalary = staff.basicSalary + totalAllowances + overtimePay + parseFloat(currentPayroll.bonus);
    const netSalary = grossSalary - totalDeductions - absentDeduction;

    const payrollRecord = {
      id: Date.now(),
      staffId: staff.id,
      staffName: staff.name,
      month: currentPayroll.month,
      basicSalary: staff.basicSalary,
      allowances: totalAllowances,
      overtime: overtimePay,
      bonus: parseFloat(currentPayroll.bonus),
      deductions: totalDeductions,
      absentDeduction: absentDeduction,
      grossSalary: grossSalary,
      netSalary: netSalary,
      status: "processed",
      paymentDate: new Date().toISOString().split('T')[0]
    };

    setPayrollRecords([payrollRecord, ...payrollRecords]);
    setCurrentPayroll({
      month: new Date().toISOString().slice(0, 7),
      staffId: "",
      overtime: 0,
      bonus: 0,
      absentDays: 0
    });
  };

  // Delete functions
  const deleteStaff = (id) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== id));
  };

  const deleteAllowance = (id) => {
    setAllowances(allowances.filter(allowance => allowance.id !== id));
  };

  const deleteDeduction = (id) => {
    setDeductions(deductions.filter(deduction => deduction.id !== id));
  };

  // Filter staff members
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments
  const departments = [...new Set(staffMembers.map(staff => staff.department))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiDollarSign className="text-blue-600" />
              Payroll Management System
            </h1>
            <p className="text-gray-600 mt-2">Manage staff salaries, allowances, and deductions</p>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <FiPrinter />
              Print Reports
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <FiDownload />
              Export Payroll
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Staff</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalStaff}</p>
                <p className="text-sm text-gray-500 mt-1">Active employees</p>
              </div>
              <FiUsers className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monthly Payroll</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.totalPayroll.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <FiTrendingUp />
                  Total budget
                </p>
              </div>
              <FiDollarSign className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Salary</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.averageSalary.toLocaleString()}</p>
                <p className="text-sm text-purple-600 mt-1">Per staff member</p>
              </div>
              <FiBarChart2 className="text-purple-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-800">Ksh {stats.pendingPayments.toLocaleString()}</p>
                <p className="text-sm text-amber-600 mt-1">This month</p>
              </div>
              <FiCreditCard className="text-amber-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Staff Management */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 lg:mb-0">
                <FiUsers className="text-blue-600" />
                Staff Management
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
                
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Staff Form */}
            <form onSubmit={addStaffMember} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="Staff full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    value={newStaff.position}
                    onChange={(e) => setNewStaff({...newStaff, position: e.target.value})}
                    placeholder="Job position"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Academic">Academic</option>
                    <option value="Administration">Administration</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Basic Salary (Ksh) *</label>
                  <input
                    type="number"
                    value={newStaff.basicSalary}
                    onChange={(e) => setNewStaff({...newStaff, basicSalary: e.target.value})}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type *</label>
                  <select
                    value={newStaff.contractType}
                    onChange={(e) => setNewStaff({...newStaff, contractType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={newStaff.joinDate}
                    onChange={(e) => setNewStaff({...newStaff, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
                Add Staff Member
              </button>
            </form>

            {/* Staff List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Staff Details</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Salary</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{staff.name}</p>
                          <p className="text-sm text-gray-500">{staff.email}</p>
                          <p className="text-sm text-gray-500">{staff.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {staff.position}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{staff.department}</td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">Ksh {staff.basicSalary.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{staff.contractType}</p>
                      </td>
                      <td className="px-4 py-4">
                        <button 
                          onClick={() => deleteStaff(staff.id)}
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

          {/* Payroll Processing */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <FiCreditCard className="text-green-600" />
              Process Payroll
            </h2>

            <form onSubmit={processPayroll} className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Staff Member *</label>
                  <select
                    value={currentPayroll.staffId}
                    onChange={(e) => setCurrentPayroll({...currentPayroll, staffId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Staff</option>
                    {staffMembers.map(staff => (
                      <option key={staff.id} value={staff.id}>{staff.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payroll Month *</label>
                  <input
                    type="month"
                    value={currentPayroll.month}
                    onChange={(e) => setCurrentPayroll({...currentPayroll, month: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overtime (Hours)</label>
                  <input
                    type="number"
                    value={currentPayroll.overtime}
                    onChange={(e) => setCurrentPayroll({...currentPayroll, overtime: e.target.value})}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bonus (Ksh)</label>
                  <input
                    type="number"
                    value={currentPayroll.bonus}
                    onChange={(e) => setCurrentPayroll({...currentPayroll, bonus: e.target.value})}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Absent Days</label>
                  <input
                    type="number"
                    value={currentPayroll.absentDays}
                    onChange={(e) => setCurrentPayroll({...currentPayroll, absentDays: e.target.value})}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <FiDollarSign />
                Process Payroll
              </button>
            </form>
          </div>
        </div>

        {/* Allowances & Deductions Sidebar */}
        <div className="xl:col-span-1">
          {/* Allowances */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-green-600" />
              Allowances
            </h2>

            <form onSubmit={addAllowance} className="mb-4">
              <div className="space-y-3">
                <input
                  type="text"
                  value={newAllowance.name}
                  onChange={(e) => setNewAllowance({...newAllowance, name: e.target.value})}
                  placeholder="Allowance name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  value={newAllowance.amount}
                  onChange={(e) => setNewAllowance({...newAllowance, amount: e.target.value})}
                  placeholder="Amount"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <select
                  value={newAllowance.type}
                  onChange={(e) => setNewAllowance({...newAllowance, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                <FiPlus />
                Add Allowance
              </button>
            </form>

            <div className="max-h-60 overflow-y-auto">
              {allowances.map((allowance) => (
                <div key={allowance.id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{allowance.name}</p>
                    <p className="text-sm text-gray-500">{allowance.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">Ksh {allowance.amount.toLocaleString()}</span>
                    <button 
                      onClick={() => deleteAllowance(allowance.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              {/* <FiTrendingDown className="text-red-600" /> */}
              Deductions
            </h2>

            <form onSubmit={addDeduction} className="mb-4">
              <div className="space-y-3">
                <input
                  type="text"
                  value={newDeduction.name}
                  onChange={(e) => setNewDeduction({...newDeduction, name: e.target.value})}
                  placeholder="Deduction name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {newDeduction.type === "fixed" ? (
                  <input
                    type="number"
                    value={newDeduction.amount}
                    onChange={(e) => setNewDeduction({...newDeduction, amount: e.target.value})}
                    placeholder="Amount"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                ) : (
                  <input
                    type="number"
                    value={newDeduction.percentage}
                    onChange={(e) => setNewDeduction({...newDeduction, percentage: e.target.value})}
                    placeholder="Percentage %"
                    step="0.01"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                )}
                <select
                  value={newDeduction.type}
                  onChange={(e) => setNewDeduction({...newDeduction, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
              >
                <FiPlus />
                Add Deduction
              </button>
            </form>

            <div className="max-h-60 overflow-y-auto">
              {deductions.map((deduction) => (
                <div key={deduction.id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{deduction.name}</p>
                    <p className="text-sm text-gray-500">{deduction.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-600">
                      {deduction.type === "percentage" ? `${deduction.percentage}%` : `Ksh ${deduction.amount.toLocaleString()}`}
                    </span>
                    <button 
                      onClick={() => deleteDeduction(deduction.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payroll History */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FiPieChart className="text-purple-600" />
          Payroll History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Staff</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Month</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Gross Salary</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Deductions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Net Salary</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrollRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-800">{record.staffName}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{record.month}</td>
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    Ksh {record.grossSalary.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-red-600">
                    Ksh {record.deductions.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 font-semibold text-green-600">
                    Ksh {record.netSalary.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {payrollRecords.length === 0 && (
            <div className="text-center py-8">
              <FiPieChart className="mx-auto text-gray-400 text-3xl mb-3" />
              <p className="text-gray-500">No payroll records found</p>
              <p className="text-sm text-gray-400">Process payroll to see records here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;