const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Core Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/admin', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    database: global.dbConnected ? 'CONNECTED' : 'OFFLINE',
    timestamp: new Date().toISOString(),
  });
});

// Centralized error handler — must be last middleware
app.use(errorHandler);

module.exports = app;
