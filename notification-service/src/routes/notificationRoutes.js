const express = require('express');
const router = express.Router();
const { sendNotification, getUserNotifications } = require('../controllers/notificationController');

// POST /api/notifications
router.post('/notifications', sendNotification);

// ✅ GET /api/notifications/:id
router.get('/notifications/:id', getUserNotifications);

module.exports = router;
