import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const schoolName = "JAWABU ACADEMY";

// Dummy user data for demonstration
const dummyUsers = [
  { email: "teacher@school.com", password: "teacher123", role: "teacher", name: "John Smith" },
  { email: "student@school.com", password: "student123", role: "student", name: "Sarah Johnson" },
  { email: "finance@school.com", password: "finance123", role: "finance", name: "Michael Brown" },
  { email: "admin@school.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "bursar@school.com", password: "bursar123", role: "bursar", name: "Robert Wilson" },
  { email: "deputyadmin@school.com", password: "deputy123", role: "deputyAdmin", name: "Lisa Davis" },
  { email: "dos@school.com", password: "dos123", role: "dos", name: "Dr. James Miller" },
];

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // For demo purposes, check against dummy data
      const user = dummyUsers.find(
        user => user.email === credentials.email && user.password === credentials.password
      );

      if (user) {
        // Store user info in localStorage
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);

        // Redirect based on role
        switch (user.role) {
          case 'teacher':
            navigate('/TeacherPortal/');
            break;
          case 'student':
            navigate('/StudentPortal/');
            break;
          case 'finance':
            navigate('/FinancePortal/');
            break;
          case 'admin':
            navigate('/AdminPortal/');
            break;
          case 'bursar':
            navigate('/BursarPortal/');
            break;
          case 'deputyAdmin':
            navigate('/DeputyAdminPortal/');
            break;
          case 'dos':
            navigate('/DirectorStudiesPortal/');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-50 w-50 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <img 
              src="../assets/images/images (20).jpeg" 
              alt="Student" 
              className="w-50 h-50 rounded-full object-cover shadow-md"
            />
          </div>
          <h2 className="text-3xl font-bold text-red-900 mb-2">{schoolName}</h2>
          <p className="text-gray-600 mb-2">Enter your login credentials</p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                autoComplete="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>


        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Syntelsafe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;