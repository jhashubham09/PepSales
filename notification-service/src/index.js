require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const amqp = require('amqplib'); // Ensure you have this import

const app = express();
app.use(express.json()); // Parse JSON request body

// Connect to MongoDB
connectDB();

// Function to start RabbitMQ queue with Retry Logic
const startQueue = async () => {
    try {
        console.log("🔧 RabbitMQ URL from ENV:", process.env.RABBITMQ_URL);

        if (!process.env.RABBITMQ_URL) {
            throw new Error('❌ RABBITMQ_URL not set in environment variables');
        }

        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue('notifications');
        console.log('✅ RabbitMQ connected');
    } catch (err) {
        console.error('❌ RabbitMQ connection error:', err.message);
        console.log('Retrying in 5 seconds...');
        setTimeout(startQueue, 5000); // Retry after 5 seconds
    }
};

// Start the queue
startQueue();

// Use notification routes
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
