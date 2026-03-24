const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./src/models/Admin');

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
      password: 'adminpassword123',
      role: 'super-admin',
    });

    console.log('Admin seeded successfully:');
    console.log('Email: admin@ghoomway.com');
    console.log('Password: adminpassword123');

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
