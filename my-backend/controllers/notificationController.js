const Notification = require('../models/Notification');

// Get Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error updating notification' });
  }
};

module.exports = { getNotifications, markAsRead };
