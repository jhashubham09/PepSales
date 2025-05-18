require('dotenv').config(); // Load variables from .env
const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const amqp = require('amqplib');

const app = express();
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Function to start RabbitMQ queue
const startQueue = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL); // Use CloudAMQP URL
        const channel = await connection.createChannel();
        await channel.assertQueue('notifications');
        console.log('✅ RabbitMQ connected');
    } catch (err) {
        console.error('❌ RabbitMQ connection error:', err.message);
        process.exit(1);
    }
};

// Start the queue
startQueue();

app.use('/api', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
