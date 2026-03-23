const twilio = require('twilio');

/**
 * @desc    Send WhatsApp notification via Twilio with robust logging
 * @param   {string} type - Notification type (NEW_BOOKING_ADMIN or BOOKING_ACCEPTED_USER)
 * @param   {object} bookingData - The booking document/data
 */
const sendWhatsAppNotification = async (type, bookingData) => {
  console.log(`\n[DEBUG] --- WhatsApp Notification Attempt: ${type} ---`);
  console.log(`[DEBUG] Booking ID: ${bookingData.bookingId}`);
  
  try {
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
    const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    // Verify Credentials
    if (!accountSid || !authToken || !twilioNumber || !adminNumber) {
      console.error('[ERROR] ❌ Twilio configuration missing in .env');
      console.log(`[DEBUG] SID: ${accountSid ? 'OK' : 'MISSING'}`);
      console.log(`[DEBUG] Token: ${authToken ? 'OK' : 'MISSING'}`);
      console.log(`[DEBUG] From: ${twilioNumber || 'MISSING'}`);
      console.log(`[DEBUG] Admin: ${adminNumber || 'MISSING'}`);
      return false;
    }

    const client = twilio(accountSid, authToken);
    let messageBody = '';

    // Format Message Body
    if (type === 'NEW_BOOKING_ADMIN') {
      messageBody = `🚀 *New Ride Request: ${bookingData.bookingId}*\n\n` +
        `👤 *Customer:* ${bookingData.customerName}\n` +
        `📞 *Phone:* ${bookingData.phoneNumber}\n\n` +
        `🚖 *Trip Details:*\n` +
        `Type: ${bookingData.tripCategory} (${bookingData.tripType})\n` +
        `Pickup: ${bookingData.pickupCity}\n` +
        (bookingData.dropCity ? `Drop: ${bookingData.dropCity}\n` : '') +
        (bookingData.rentalPackage ? `Package: ${bookingData.rentalPackage}\n` : '') +
        `Date: ${new Date(bookingData.pickupDate).toLocaleDateString()} @ ${bookingData.pickupTime}\n` +
        `Cab: ${bookingData.cabCategory}\n` +
        `Pax: ${bookingData.passengers}\n\n` +
        `🚦 *Status:* Pending Review\n` +
        `Check Admin Dashboard to Accept/Reject.\n\n` +
        `⏰ *Timestamp:* ${new Date().toLocaleString()}`;
    } else if (type === 'BOOKING_ACCEPTED_USER') {
      messageBody = `✅ *Booking Confirmed!*\n\n` +
        `Hi ${bookingData.customerName},\n` +
        `Your ride (${bookingData.bookingId}) has been ACCEPTED by GhoomWay.\n` +
        `Driver details will be shared shortly.\n` +
        `Pickup: ${bookingData.pickupCity}\n` +
        `Date/Time: ${new Date(bookingData.pickupDate).toLocaleDateString()} @ ${bookingData.pickupTime}\n\n` +
        `Thank you for choosing GhoomWay!`;
    }

    // Determine Recipient
    const recipient = type === 'NEW_BOOKING_ADMIN' ? adminNumber : `whatsapp:+91${bookingData.phoneNumber}`;
    
    console.log(`[DEBUG] Sending from: ${twilioNumber}`);
    console.log(`[DEBUG] Sending to: ${recipient}`);
    console.log(`[DEBUG] Message Body: \n${messageBody.split('\n').map(l => '> ' + l).join('\n')}`);

    // Execute Send
    const response = await client.messages.create({
      body: messageBody,
      from: twilioNumber,
      to: recipient
    });

    console.log(`[INFO] ✅ WhatsApp transmitted successfully! SID: ${response.sid}`);
    console.log(`[DEBUG] Twilio Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error(`[ERROR] ❌ WhatsApp Service Failure: ${error.message}`);
    console.error(`[DEBUG] Error Code: ${error.code}`);
    console.error(`[DEBUG] Error Stack: ${error.stack}`);
    
    if (error.code === 63007) {
      console.log('💡 [TIP] The "From" number in .env must be a valid WhatsApp sender (e.g., standard sandbox or verified number).');
    } else if (error.code === 63015) {
      console.log('💡 [TIP] Freeform messages are blocked for this user. Ensure they have sent "join <keyword>" to the sandbox.');
    } else if (error.code === 21608) {
      console.log('💡 [TIP] Recipient number is not verified in Twilio or has not joined the sandbox.');
    }
    
    return false;
  }
};

module.exports = {
  sendWhatsAppNotification
};
