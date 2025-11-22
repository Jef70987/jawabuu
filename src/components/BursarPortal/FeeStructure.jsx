/* eslint-disable no-unused-vars */
import React, { useState} from 'react';

const FeeStructure = () => {
  const [feeStructure, setFeeStructure] = useState([
    { id: 1, grade: 'Grade 1', tuition: 15000, activity: 2000, library: 1000, boarding: 0, total: 18000 },
    { id: 2, grade: 'Grade 2', tuition: 16000, activity: 2500, library: 1000, boarding: 0, total: 19500 },
    { id: 3, grade: 'Grade 3', tuition: 17000, activity: 3000, library: 1500, boarding: 0, total: 21500 },
    { id: 4, grade: 'Grade 4', tuition: 18000, activity: 3500, library: 1500, boarding: 0, total: 23000 },
    { id: 5, grade: 'Grade 5', tuition: 19000, activity: 4000, library: 2000, boarding: 0, total: 25000 },
    { id: 6, grade: 'Grade 6', tuition: 20000, activity: 4500, library: 2000, boarding: 0, total: 26500 },
    { id: 7, grade: 'Grade 7', tuition: 22000, activity: 5000, library: 2500, boarding: 15000, total: 44500 },
    { id: 8, grade: 'Grade 8', tuition: 24000, activity: 5500, library: 2500, boarding: 15000, total: 47000 },
  ]);

  const [activeTerm, setActiveTerm] = useState('Term 1 2025');
  const [feeType, setFeeType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = feeStructure.filter(fee =>
    fee.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = feeStructure.reduce((sum, fee) => sum + fee.total, 0);
  const averageFee = totalRevenue / feeStructure.length;

  return (
    <div className="min-h-screen bg-gray-50 w-full p-4 md:p-6">
      <div className="w-full max-w-full mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 md:p-8 mb-6 md:mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">Fee Structure Management</h1>
              <p className="text-blue-100 text-lg">Academic Year 2025 • Bursar's Portal</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-blue-100 text-sm">Total Annual Revenue</p>
                <p className="text-2xl font-bold">KSh {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Term</label>
            <select
              value={activeTerm}
              onChange={(e) => setActiveTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option>Term 1 2025</option>
              <option>Term 2 2025</option>
              <option>Term 3 2025</option>
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fee Type</label>
            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All Fees</option>
              <option value="day">Day School</option>
              <option value="boarding">Boarding</option>
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Grade</label>
            <input
              type="text"
              placeholder="Search by grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center space-x-2">
              <span>📊</span>
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Grades</p>
                <p className="text-2xl font-bold text-gray-800">{feeStructure.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">🏫</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Fee</p>
                <p className="text-2xl font-bold text-gray-800">KSh {Math.round(averageFee).toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Boarding Grades</p>
                <p className="text-2xl font-bold text-gray-800">{feeStructure.filter(f => f.boarding > 0).length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">🛏️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Last Updated</p>
                <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Detailed Fee Breakdown</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Export Excel
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Print
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Grade Level
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Tuition
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Activities
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Library
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Boarding
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Total Fees
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-blue-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-sm">G{fee.id}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{fee.grade}</div>
                          <div className="text-xs text-gray-500">{fee.boarding > 0 ? 'Boarding' : 'Day School'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      <div className="font-medium">KSh {fee.tuition.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      KSh {fee.activity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      KSh {fee.library.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {fee.boarding > 0 ? (
                        <span className="font-medium">KSh {fee.boarding.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-lg font-bold text-green-600">
                        KSh {fee.total.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center">
                          <span className="text-sm">✏️</span>
                        </button>
                        <button className="w-8 h-8 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center">
                          <span className="text-sm">👁️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    GRAND TOTAL
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    KSh {feeStructure.reduce((sum, fee) => sum + fee.tuition, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    KSh {feeStructure.reduce((sum, fee) => sum + fee.activity, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    KSh {feeStructure.reduce((sum, fee) => sum + fee.library, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    KSh {feeStructure.reduce((sum, fee) => sum + fee.boarding, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-lg font-bold text-green-700 text-right">
                    KSh {totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Quick Actions & Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">➕</span>
                  </div>
                  <span className="font-medium text-gray-700">Add New Grade</span>
                </div>
                <span className="text-gray-400 group-hover:text-blue-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">📤</span>
                  </div>
                  <span className="font-medium text-gray-700">Export All Data</span>
                </div>
                <span className="text-gray-400 group-hover:text-green-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🔄</span>
                  </div>
                  <span className="font-medium text-gray-700">Update Fee Structure</span>
                </div>
                <span className="text-gray-400 group-hover:text-purple-600">→</span>
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Payment Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">MPESA</p>
                  <p className="text-blue-100 text-sm">Paybill: 123456 • Acc: Admission No</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                  <span className="font-bold">B</span>
                </div>
                <div>
                  <p className="font-semibold">Bank Transfer</p>
                  <p className="text-blue-100 text-sm">KCB • 1234567890</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-green-800">Fee Structure</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">ACTIVE</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium text-blue-800">Last Updated</span>
                <span className="text-sm text-blue-600">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="font-medium text-purple-800">Next Review</span>
                <span className="text-sm text-purple-600">Dec 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;