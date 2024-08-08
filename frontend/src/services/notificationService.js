import { apiRequest } from './api';

export async function getNotifications() {
  return await apiRequest('/notifications');
}

export async function markNotificationAsRead(notificationId) {
  return await apiRequest(`/notifications/${notificationId}`, 'PUT', { read: true });
}
