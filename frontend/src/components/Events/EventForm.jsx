import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useNotification } from '../../hooks/useNotification';
import Button from '../common/Button';

function EventForm({ initialData = {}, onSubmit, buttonText = 'Submit', isEditMode = false }) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    ...initialData
  });
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && initialData.date) {
      // Convert date to local date-time format for input
      const localDateTime = new Date(initialData.date).toISOString().slice(0, 16);
      setEventData(prevData => ({ ...prevData, date: localDateTime }));
    }
  }, [isEditMode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(eventData);
      addNotification(`Event ${isEditMode ? 'updated' : 'created'} successfully`, 'success');
      navigate('/events');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, error);
      addNotification(`Failed to ${isEditMode ? 'update' : 'create'} event`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="title" className={`block mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        } transition-colors duration-300`}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
          }`}
        />
      </div>
      <div>
        <label htmlFor="description" className={`block mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        } transition-colors duration-300`}>Description</label>
        <textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          rows="4"
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
          }`}
        ></textarea>
      </div>
      <div>
        <label htmlFor="date" className={`block mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        } transition-colors duration-300`}>Date and Time</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
          }`}
        />
      </div>
      <div>
        <label htmlFor="location" className={`block mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        } transition-colors duration-300`}>Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
          }`}
        />
      </div>
      <div>
        <label htmlFor="capacity" className={`block mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        } transition-colors duration-300`}>Capacity</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={eventData.capacity}
          onChange={handleChange}
          required
          min="1"
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
          }`}
        />
      </div>
      <Button 
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
        {isLoading ? 'Processing...' : buttonText}
      </Button>
    </form>
  );
}

export default EventForm;