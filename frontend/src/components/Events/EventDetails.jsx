import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, rsvpEvent, deleteEvent } from '../../services/eventService';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { formatDate } from '../../utils/dateUtils';
import { ThemeContext } from '../../context/ThemeContext';

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error);
      addNotification('Failed to load event details', 'error');
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    if (!user) {
      addNotification('You must be logged in to RSVP', 'warning');
      return;
    }
    if (event.attendees.includes(user.id)) {
      addNotification('You have already RSVP\'d to this event', 'info');
      return;
    }
    if (event.attendees.length >= event.capacity) {
      addNotification('This event has reached its capacity', 'warning');
      return;
    }
    try {
      await rsvpEvent(id);
      addNotification('RSVP successful!', 'success');
      fetchEvent();
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      addNotification('Failed to RSVP', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        addNotification('Event deleted successfully', 'success');
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
        addNotification('Failed to delete event', 'error');
      }
    }
  };

  if (loading) return (
    <div className={`flex justify-center items-center h-64 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (!event) return (
    <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Event not found</div>
  );

  const isOrganizer = user && event.organizer && event.organizer._id === user.id;
  const isAttendee = user && event.attendees?.includes(user.id);
  const canRSVP = user && !isOrganizer && !isAttendee;

  return (
    <div className={`max-w-2xl mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg animate-fadeIn transition-all duration-300`}>
      <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-yellow-300' : 'text-indigo-700'}`}>{event.title}</h1>
      <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p className="mb-2"><span className="font-semibold">Date:</span> {formatDate(event.date)}</p>
        <p className="mb-2"><span className="font-semibold">Location:</span> {event.location}</p>
        <p className="mb-2"><span className="font-semibold">Organizer:</span> {event.organizer ? event.organizer.name : 'Unknown'}</p>
        <p className="mb-2"><span className="font-semibold">Capacity:</span> {event.attendees.length} / {event.capacity}</p>
      </div>
      <p className={`mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{event.description}</p>
      
      <div className="flex flex-wrap gap-4">
        {canRSVP && (
          <button onClick={handleRSVP} className={`${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-200 p-2 border rounded-md`}>
            RSVP
          </button>
        )}
        
        {isOrganizer && (
          <>
            <button onClick={handleDelete} className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors duration-200 p-2 border rounded-md`}>
              Delete Event
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetails;