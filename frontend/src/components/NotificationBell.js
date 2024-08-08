import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getNotifications, markNotificationAsRead } from '../services/notificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationBell() {
  const { t } = useTranslation(); // Hook to use translations
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
      <span>
        <FontAwesomeIcon icon={faBell} /> {t('notifications')} ({notifications.filter(n => !n.read).length})
      </span>
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

