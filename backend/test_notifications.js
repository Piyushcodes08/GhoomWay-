const { sendWhatsAppNotification } = require('./src/services/whatsappService');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const mockBooking = {
  bookingId: 'GW-TEST-12345',
  customerName: 'Test User',
  phoneNumber: '6371149273', // Using the admin number for testing both
  tripCategory: 'Local Rental',
  tripType: '8 Hrs | 80 Kms',
  pickupCity: 'Bhubaneswar',
  pickupDate: new Date(),
  pickupTime: '10:00 AM',
  cabCategory: 'Sedan',
  passengers: '2',
};

async function testNotifications() {
  console.log('=== TESTING WHATSAPP NOTIFICATIONS ===');
  
  console.log('\n--- Test 1: NEW_BOOKING_ADMIN ---');
  const adminSent = await sendWhatsAppNotification('NEW_BOOKING_ADMIN', mockBooking);
  console.log(`Admin Notification Result: ${adminSent ? '✅ SUCCESS' : '❌ FAILED'}`);

  console.log('\n--- Test 2: NEW_BOOKING_USER ---');
  const userSent = await sendWhatsAppNotification('NEW_BOOKING_USER', mockBooking);
  console.log(`User Notification Result: ${userSent ? '✅ SUCCESS' : '❌ FAILED'}`);
}

testNotifications();
