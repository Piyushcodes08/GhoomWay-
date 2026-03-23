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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
