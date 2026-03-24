const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Admin = require('./src/models/Admin');

// Fix for Atlas SRV resolution
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const adminExists = await Admin.findOne({ email: 'admin@ghoomway.com' });

    if (adminExists) {
      console.log('Admin already exists. Skipping seed.');
      process.exit();
    }

    const admin = await Admin.create({
      name: 'System Admin',
      email: 'admin@ghoomway.com',
      password: 'Admin@123',
      role: 'admin',
    });

    console.log('Admin seeded successfully:');
    console.log('Email: admin@ghoomway.com');
    console.log('Password: Admin@123');

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
