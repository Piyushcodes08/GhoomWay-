const twilio = require('twilio');

/**
 * @desc Builds message body and recipient for a given notification type.
 *       Returns null if type is unrecognized.
 */
const buildNotification = (type, booking, adminNumber) => {
  const pickupDateStr = new Date(booking.pickupDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  if (type === 'NEW_BOOKING_ADMIN') {
    return {
      to: adminNumber,
      body:
        `🚀 *New Ride Request: ${booking.bookingId}*\n\n` +
        `👤 *Customer:* ${booking.customerName}\n` +
        `📞 *Phone:* ${booking.phoneNumber}\n\n` +
        `🚖 *Trip Details:*\n` +
        `  Type: ${booking.tripCategory} (${booking.tripType})\n` +
        `  Pickup: ${booking.pickupCity}\n` +
        (booking.dropCity ? `  Drop: ${booking.dropCity}\n` : '') +
        (booking.rentalPackage ? `  Package: ${booking.rentalPackage}\n` : '') +
        `  Date: ${pickupDateStr} @ ${booking.pickupTime}\n` +
        `  Cab: ${booking.cabCategory} | Pax: ${booking.passengers}\n\n` +
        `🚦 *Status:* Pending Review\n` +
        `Open Admin Dashboard to Accept or Reject.\n\n` +
        `⏰ *Received:* ${new Date().toLocaleString('en-IN')}`,
    };
  }

  return null;
};

/**
 * @desc    Send a WhatsApp notification via Twilio.
 * @param   {string} type        - Notification type key (e.g. 'NEW_BOOKING_ADMIN')
 * @param   {object} bookingData - The booking document or plain object
 * @returns {boolean}            - true on success, false on failure (never throws)
 */
const sendWhatsAppNotification = async (type, bookingData) => {
  console.log(`\n[WhatsApp] Initiating notification: ${type} | Booking: ${bookingData.bookingId}`);
  console.log(`[WhatsApp] Recipient: ${bookingData.phoneNumber || 'N/A'}`);

  try {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER, ADMIN_WHATSAPP_NUMBER } =
      process.env;

    const missing = [];
    if (!TWILIO_ACCOUNT_SID) missing.push('TWILIO_ACCOUNT_SID');
    if (!TWILIO_AUTH_TOKEN) missing.push('TWILIO_AUTH_TOKEN');
    if (!TWILIO_WHATSAPP_NUMBER) missing.push('TWILIO_WHATSAPP_NUMBER');
    if (!ADMIN_WHATSAPP_NUMBER) missing.push('ADMIN_WHATSAPP_NUMBER');

    if (missing.length > 0) {
      console.error(`[WhatsApp] ❌ Missing Twilio credentials: ${missing.join(', ')}`);
      return false;
    }

    const notification = buildNotification(type, bookingData, ADMIN_WHATSAPP_NUMBER);

    if (!notification) {
      console.warn(`[WhatsApp] ⚠️ Unknown notification type: "${type}". Skipping.`);
      return false;
    }

    console.log(`[WhatsApp] Sending to: ${notification.to}`);

    const client = twilio(TWILIO_ACCOUNT_SID.trim(), TWILIO_AUTH_TOKEN.trim());

    const response = await client.messages.create({
      body: notification.body,
      from: TWILIO_WHATSAPP_NUMBER.trim(),
      to: notification.to.trim(),
    });

    const successMsg = `✅ Sent successfully. SID: ${response.sid} | Status: ${response.status}`;
    console.log(`[WhatsApp] ${successMsg}`);
    return true;
  } catch (error) {
    const errorMsg = `❌ Failed to send "${type}": ${error.message}${error.code ? ` (Code: ${error.code})` : ''}`;
    console.error(`[WhatsApp] ${errorMsg}`);
    
    // Developer hints for common Twilio error codes
    const hints = {
      20003: 'Authenticate: Twilio Auth Token is incorrect.',
      63007: 'The "From" number is not a valid WhatsApp sender.',
      63015: 'Recipient has not joined the sandbox. They must send "join <keyword>" first.',
      21608: 'Recipient number is not verified or has not opted in.',
    };
    if (hints[error.code]) {
      console.warn(`[WhatsApp] 💡 Tip: ${hints[error.code]}`);
    }

    return false;
  }
};

module.exports = { sendWhatsAppNotification };
