const dotenv = require('dotenv');
const path = require('path');

// 1. Load env vars immediately (Must happen before app/routes load)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dns = require('dns');
const connectDB = require('./config/db');
const app = require('./app');

// Validate required env vars
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ CRITICAL ERROR: Environment variable ${env} is missing.`);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
});

// Provide defaults for optional/non-critical vars
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// 2. Configuration Diagnostics (Safe logging for production debugging)
console.log('\n--- 🛠️  Environment Diagnostics ---');
console.log(`📡 Node Env:    ${process.env.NODE_ENV}`);
console.log(`🔌 Database:    ${process.env.MONGO_URI ? 'SET (Hidden)' : '❌ MISSING'}`);
console.log(`💬 Twilio SID:  ${process.env.TWILIO_ACCOUNT_SID ? '✅ DETECTED' : '⚠️ MISSING'}`);
console.log(`🔐 Twilio Auth: ${process.env.TWILIO_AUTH_TOKEN ? '✅ DETECTED' : '⚠️ MISSING'}`);
console.log(`📞 SMS Number:  ${process.env.TWILIO_SMS_NUMBER ? '✅ DETECTED' : '⚠️ MISSING'}`);
console.log(`🌐 Client URL:  ${process.env.CLIENT_URL || '❌ NOT SET'}`);
console.log('----------------------------------\n');


// Force IPv4 first for MongoDB SRV resolution
dns.setDefaultResultOrder('ipv4first');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
