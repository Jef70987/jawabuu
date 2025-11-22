import React, { useState } from 'react';

const PaymentRecords = () => {
  // Sample payment data - in a real app this would come from your backend
  const [payments, setPayments] = useState([
    { id: 1, studentId: 'STD2023001', name: 'John Doe', amount: 5000, date: '2023-05-15', method: 'MPESA' },
    { id: 2, studentId: 'STD2023002', name: 'Jane Smith', amount: 7500, date: '2023-05-14', method: 'Cash' },
    { id: 3, studentId: 'STD2023003', name: 'Michael Brown', amount: 10000, date: '2023-05-13', method: 'Bank Transfer' },
    { id: 4, studentId: 'STD2023004', name: 'Sarah Johnson', amount: 6000, date: '2023-05-12', method: 'MPESA' },
    { id: 5, studentId: 'STD2023005', name: 'David Wilson', amount: 8500, date: '2023-05-11', method: 'Cash' },
    { id: 6, studentId: 'STD2023006', name: 'Emily Davis', amount: 12000, date: '2023-05-10', method: 'Bank Transfer' }
  ]);

  // Function to add a new payment (call this after successful payment)
  // eslint-disable-next-line no-unused-vars
  const addPayment = (newPayment) => {
    setPayments([newPayment, ...payments]);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get method color
  const getMethodColor = (method) => {
    switch (method) {
      case 'MPESA':
        return 'bg-green-100 text-green-800';
      case 'Cash':
        return 'bg-blue-100 text-blue-800';
      case 'Bank Transfer':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-4 md:p-6">
      <div className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Payment Records
          </h2>
          <p className="text-gray-600 text-center mt-2">
            All student payment transactions
          </p>
        </div>

        {/* Payments Table Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map(payment => (
                  <tr 
                    key={payment.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.studentId}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.name}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">
                      KSh {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor(payment.method)}`}>
                        {payment.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-4 py-3 md:px-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{payments.length}</span> payments
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">KSh</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Collected</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900">
                  KSh {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">#</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900">
                  {payments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">AVG</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Payment</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900">
                  KSh {Math.round(payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRecords;