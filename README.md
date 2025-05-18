# PepSales - Notification Service 🚀

## 📌 Project Overview

PepSales is a robust notification service designed to efficiently handle and dispatch notifications using RabbitMQ and MongoDB. Built with scalability and reliability in mind, it is perfect for high-volume notification processing and can be seamlessly integrated into any system requiring a dedicated notification service.

## 🌟 Key Features

* 📨 **Efficient Queue Management:** Leveraging RabbitMQ for scalable message queuing.
* 📩 **RESTful API:** Easily send notifications using a simple API.
* 💾 **Persistent Storage:** MongoDB for reliable notification tracking.
* 🔁 **Automatic Retry Logic:** Ensures stable RabbitMQ connection with retry on failure.
* ⚡ **Scalability:** Designed for high-performance and easy future expansion.

## 🏗️ Tech Stack

* **Node.js** (Backend API)
* **Express.js** (Web Framework)
* **RabbitMQ** (Message Queue)
* **MongoDB** (Database)
* **Render.com** (Cloud Deployment)

## 🚀 Getting Started

### ⚡ Prerequisites

* Node.js installed (v18 or higher)
* MongoDB instance (local or cloud)
* RabbitMQ instance (CloudAMQP recommended)
* Git (for cloning the repository)

### ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jhashubham09/PepSales.git
   cd PepSales
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   * Create a `.env` file in the root directory.
   * Add the following values:

     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     RABBITMQ_URL=your_rabbitmq_connection_string
     ```

### 🚀 Running Locally

```bash
npm start
```

### 📝 Usage

* Use the API to send notifications via the `/api/notifications` route.
* The service will automatically queue the notifications in RabbitMQ.

### 🌐 Deployment on Render

1. Log in to Render.com and create a new service.
2. Link the GitHub repository.
3. Set the environment variables in the Render dashboard (MONGO\_URI, RABBITMQ\_URL, PORT).
4. Deploy the service.

### ⚠️ Troubleshooting

* If you encounter an ECONNREFUSED error for RabbitMQ, ensure your RABBITMQ\_URL is correct and accessible.
* Make sure MongoDB is running and the connection string is correct.

### 📫 Contact

If you have any questions or need further assistance, feel free to reach out.

---

✨ **Pro Tip:** Tailor this README to reflect your specific use case and make it even more impressive for recruiters!
