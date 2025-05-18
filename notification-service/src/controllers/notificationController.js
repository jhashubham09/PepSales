const mongoose = require('mongoose'); // ADD this at the top
const User = require('../models/User');
const Notification = require('../models/Notification');
const amqp = require('amqplib');

let ch;
const QUEUE = 'notifications';

(async () => {
    const conn = await amqp.connect('amqp://localhost');
    ch = await conn.createChannel();
    await ch.assertQueue(QUEUE);
})();

const sendNotification = async (req, res) => {
    const { userId, type, content } = req.body;

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(userId)); // ✅ CONVERT TO ObjectId

        if (!user) return res.status(404).json({ message: 'User not found' });

        const data = { user, type, content };
        ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));

        res.status(200).json({ message: 'Notification queued' });
    } catch (err) {
        console.error('Error sending notification:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserNotifications = async (req, res) => {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.json(notifications);
};

module.exports = { sendNotification, getUserNotifications };
