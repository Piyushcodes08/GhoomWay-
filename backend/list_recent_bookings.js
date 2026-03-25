const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Booking = require('./src/models/Booking');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();

const checkStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    bookings.forEach(b => {
      console.log(`ID: ${b.bookingId} | Status: ${b.status} | Created: ${b.createdAt}`);
    });
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};
checkStatus();
