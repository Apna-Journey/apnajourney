const express = require('express');
const router = express.Router();

// Dummy notifications data (Replace with real data from your database)
let notifications = [
  { _id: '1', message: 'New user registered', read: false },
  { _id: '2', message: 'Profile updated', read: true }
];

// Get all notifications
router.get('/', (req, res) => {
  res.status(200).json(notifications);
});

// Mark notification as read
router.post('/:id/read', (req, res) => {
  const { id } = req.params;
  notifications = notifications.map(notification =>
    notification._id === id ? { ...notification, read: true } : notification
  );
  res.status(200).json({ message: 'Notification marked as read' });
});

module.exports = router;
