const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 3. Rate Limiting (Prevents Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/v1/', limiter);

// 4. Body Parser & Sanitization
app.use(express.json({ limit: '10kb' })); // Limit body size
// app.use(mongoSanitize()); // Data sanitization against NoSQL query injection

// 5. CORS
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],

  }
));

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
