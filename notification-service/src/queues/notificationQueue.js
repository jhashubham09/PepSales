const amqp = require('amqplib');
const Notification = require('../models/Notification');
const sendEmail = require('../services/emailService');
const sendSMS = require('../services/smsService');
const saveInApp = require('../services/inAppService');

const QUEUE = 'notifications';

const startQueue = async () => {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    await ch.assertQueue(QUEUE);

    ch.consume(QUEUE, async (msg) => {
        const data = JSON.parse(msg.content.toString());
        const { user, type, content } = data;

        try {
            if (type === 'email') await sendEmail(user.email, content);
            else if (type === 'sms') await sendSMS(user.phone, content);
            else if (type === 'in-app') await saveInApp(user._id, content);

            await Notification.create({
                userId: user._id,
                type,
                content,
                status: 'sent',
            });

            ch.ack(msg);
        } catch (err) {
            console.error('Notification failed:', err.message);
            ch.nack(msg, false, true); // retry
        }
    });
};

module.exports = startQueue;
