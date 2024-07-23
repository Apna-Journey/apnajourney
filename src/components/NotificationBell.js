import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../services/notificationService';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const handleNotificationClick = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    fetchNotifications();
  };

  return (
    <div>
      <span>🔔 ({notifications.filter(n => !n.read).length})</span>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} onClick={() => handleNotificationClick(notification._id)}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationBell;
