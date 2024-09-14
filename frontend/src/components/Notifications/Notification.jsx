import React from 'react';

function Notification({ message, type = 'info', onClose }) {
  const bgColor = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  }[type];

  return (
    <div
      className={`border-l-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${bgColor} relative flex items-start animate-slideIn`}
      role="alert"
    >
      <div className="flex-grow">
        <p className="font-semibold text-lg">Notification</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-lg text-gray-500 hover:text-gray-700 transition-colors duration-200"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}

export default Notification;
