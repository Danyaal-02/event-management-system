import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

function EventCard({ event }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`${
      darkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-800'
    } shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}>
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <p className={`${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      } mb-2`}>
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className={`${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      } mb-4`}>
        {event.location}
      </p>
      <Link 
        to={`/event/${event._id}`} 
        className={`${
          darkMode 
            ? 'bg-purple-600 hover:bg-purple-700' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded transition-colors duration-200`}
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;