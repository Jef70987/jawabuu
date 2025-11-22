import React, { useState } from 'react';

const Payment = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('MPESA');
  const [reference, setReference] = useState('');
  const [recentPayments, setRecentPayments] = useState([
    { id: 'STD2023001', name: 'John Doe', amount: 5000, date: 'May 15, 2023', method: 'MPESA' },
    { id: 'STD2023002', name: 'Jane Smith', amount: 7500, date: 'May 14, 2023', method: 'Cash' }
  ]);

  // Notification state
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showStudentInfo, setShowStudentInfo] = useState(false);

  // Sample student data
  const demoStudents = {
    'STD2023001': { name: 'John Doe', balance: 25000 },
    'STD2023002': { name: 'Jane Smith', balance: 15000 },
    'STD2023003': { name: 'Michael Brown', balance: 35000 }
  };

  // Show notification
  const showNotification = (type, message, duration = 5000) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, duration);
  };

  // Close notification
  const closeNotification = () => {
    setNotification({ show: false, type: '', message: '' });
  };

  const checkStudentBalance = () => {
    if (!admissionNumber) {
      showNotification('error', 'Please enter admission number');
      return;
    }

    const foundStudent = demoStudents[admissionNumber];
    
    if (foundStudent) {
      setStudent(foundStudent);
      setShowStudentInfo(true);
    } else {
      showNotification('error', 'Student not found! Please check admission number');
    }
  };

  const processPayment = () => {
    if (!paymentAmount || paymentAmount <= 0) {
      showNotification('error', 'Please enter valid amount');
      return;
    }

    if (paymentAmount > student.balance) {
      showNotification('error', 'Payment amount cannot exceed student balance');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    // In a real app, you would send this data to your backend
    const newPayment = {
      id: admissionNumber,
      name: student.name,
      amount: parseInt(paymentAmount),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      method: paymentMethod
    };
    
    setRecentPayments([newPayment, ...recentPayments]);
    showNotification('success', `Payment of KSh ${paymentAmount} processed successfully! Receipt will be printed.`);
    
    // Reset form
    setPaymentAmount('');
    setReference('');
    setStudent(null);
    setShowConfirmation(false);
    setShowStudentInfo(false);
    setAdmissionNumber('');
  };

  const cancelPayment = () => {
    setShowConfirmation(false);
  };

  const proceedWithPayment = () => {
    setShowStudentInfo(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-4 md:p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${
          notification.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        } border rounded-lg shadow-lg p-4 transition-all duration-300`}>
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${
              notification.type === 'error' ? 'text-red-400' : 'text-green-400'
            }`}>
              {notification.type === 'error' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${
                notification.type === 'error' ? 'text-red-800' : 'text-green-800'
              }`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={closeNotification}
              className={`ml-4 flex-shrink-0 ${
                notification.type === 'error' ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Student Info Modal */}
      {showStudentInfo && student && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Found</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Student Name:</span>
                <span className="font-semibold">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admission No:</span>
                <span className="font-semibold">{admissionNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Outstanding Balance:</span>
                <span className="font-semibold text-red-600">KSh {student.balance.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Do you want to proceed with payment?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStudentInfo(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={proceedWithPayment}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Payment</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-semibold">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-green-600">KSh {parseInt(paymentAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold">{paymentMethod}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to process this payment?</p>
            <div className="flex gap-3">
              <button
                onClick={cancelPayment}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-full mx-auto">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-8">
            Student Fee Payment
          </h2>
          
          {/* Student Lookup */}
          <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Find Student</h3>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <input 
                type="text" 
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                placeholder="Enter Admission Number" 
                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={checkStudentBalance}
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Check Balance
              </button>
            </div>
          </div>

          {/* Payment Section */}
          {student && (
            <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Student Name</p>
                    <p className="text-lg font-semibold text-gray-800">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Admission No</p>
                    <p className="text-lg font-semibold text-gray-800">{admissionNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Outstanding Balance</p>
                    <p className="text-lg font-semibold text-red-600">KSh {student.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (KSh)
                    </label>
                    <input 
                      type="number" 
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      min="1"
                      max={student.balance}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="MPESA">MPESA</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Reference (Optional)
                    </label>
                    <input 
                      type="text" 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="pt-6">
                    <button 
                      onClick={processPayment}
                      className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-semibold"
                    >
                      Process Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Payments */}
          <div className="w-full">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Recent Payments
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admission No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        KSh {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.method === 'MPESA' ? 'bg-green-100 text-green-800' :
                          payment.method === 'Cash' ? 'bg-blue-100 text-blue-800' :
                          payment.method === 'Bank Transfer' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.method}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;