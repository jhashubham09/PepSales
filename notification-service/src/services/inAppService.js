const Notification = require('../models/Notification');

const saveInAppNotification = async (userId, content) => {
    await Notification.create({
        userId,
        type: 'in-app',
        content,
        status: 'sent'
    });
};

module.exports = saveInAppNotification;
