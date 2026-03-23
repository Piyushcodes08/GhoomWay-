const mongoose = require('mongoose');
const dns = require('dns');

// Force public DNS to resolve MongoDB SRV records (fixes querySrv ECONNREFUSED)
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {

  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    global.dbConnected = true;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    global.dbConnected = false;
  }
};

module.exports = connectDB;