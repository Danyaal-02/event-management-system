import React from 'react';
import { useNotification } from '../../hooks/useNotification';
import Notification from './Notification';

function NotificationList() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 animate-fadeIn">
      {notifications.map((notification) => (
        <div key={notification.id} className="opacity-90 transition-opacity duration-300">
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default NotificationList;
