require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const startQueue = require('./queues/notificationQueue');

const app = express();

// 👉 Add this line to parse JSON request body
app.use(express.json());

app.use('/api', notificationRoutes);

connectDB();
startQueue();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
