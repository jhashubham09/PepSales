const nodemailer = require('nodemailer');

const sendEmail = async (to, content) => {
    // Mock transport (replace with real creds for production)
    const transporter = nodemailer.createTransport({
        jsonTransport: true
    });

    const mailOptions = {
        from: 'mock@example.com',
        to,
        subject: 'Notification',
        text: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
};

module.exports = sendEmail;
