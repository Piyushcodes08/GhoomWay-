const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('./middlewares/sanitizeMiddleware'); // Custom Express 5-compatible sanitizer
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// 1. GLOBAL CORS (Must be at top for preflight)
app.use(cors());

// 2. Security Headers & Performance
app.use(helmet());
app.use(compression());

// 3. Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 4. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/v1/', limiter);

// 5. Body Parser & Sanitization
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize); // Custom sanitizer — strips $-prefixed keys from req.body

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

// Error handling
app.use(errorHandler);

module.exports = app;
