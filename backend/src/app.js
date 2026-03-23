const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Basic Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/bookings', bookingRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    database: global.dbConnected ? 'CONNECTED' : 'OFFLINE',
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('CORE ERROR:', err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
