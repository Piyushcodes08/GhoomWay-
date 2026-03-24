const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('./config/db');
const app = require('./app');

// Load env vars - path relative to project root where .env lives
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });


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
