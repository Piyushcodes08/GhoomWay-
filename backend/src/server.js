const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('./config/db');
const app = require('./app');

// Load env vars - path relative to project root where .env lives
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

// Validate required env vars
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ CRITICAL ERROR: Environment variable ${env} is missing.`);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
});

// Provide defaults for optional/non-critical vars
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
process.env.JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || '30';
process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


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
