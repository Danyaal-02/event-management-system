import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function Register() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'attendee' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await register(userData);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <h1 className={`text-3xl font-bold mb-6 ${
        darkMode ? 'text-yellow-300' : 'text-indigo-700'
      } transition-colors duration-300`}>Register</h1>
      {error && <p className="text-red-500 mb-4 animate-shake">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
            aria-label="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
            aria-label="Email Address"
          />
        </div>
        <div>
          <label htmlFor="password" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
            aria-label="Password"
          />
        </div>
        <div>
          <label htmlFor="role" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Role</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
            aria-label="User Role"
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <button 
          type="submit" 
          className={`w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : darkMode 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className={`mt-4 text-center ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Already have an account?{' '}
        <Link 
          to="/login" 
          className={`font-semibold ${
            darkMode ? 'text-yellow-300 hover:text-yellow-400' : 'text-indigo-600 hover:text-indigo-700'
          } transition-colors duration-300`}
        >
          Login here
        </Link>
      </div>
    </div>
  );
}

export default Register;