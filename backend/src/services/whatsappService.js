const twilio = require('twilio');
const fs = require('fs');
const path = require('path');

const logToFile = (msg) => {
  const logMsg = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), 'whatsapp_debug.log'), logMsg);
  } catch (err) {
    // ignore
  }
};

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

  switch (type) {
    case 'NEW_BOOKING_ADMIN':
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

    case 'NEW_BOOKING_USER':
      return {
        to: `whatsapp:+91${booking.phoneNumber}`,
        body:
          `🚖 *Booking Received – GhoomWay*\n\n` +
          `Hi ${booking.customerName},\n\n` +
          `Thank you for choosing GhoomWay! We've received your booking request *${booking.bookingId}*.\n\n` +
          `📍 *Trip:* ${booking.pickupCity} ${booking.dropCity ? `to ${booking.dropCity}` : ''}\n` +
          `📅 *Date:* ${pickupDateStr} @ ${booking.pickupTime}\n\n` +
          `⏳ *What's Next?*\n` +
          `Please wait 5-10 minutes. Our team is reviewing your request. You will receive the final trip details and fare options here shortly.\n\n` +
          `Thank you for your patience! 🙏`,
      };

    case 'BOOKING_ACCEPTED_USER':
      return {
        to: `whatsapp:+91${booking.phoneNumber}`,
        body:
          `✅ *Booking Confirmed – GhoomWay*\n\n` +
          `Hi ${booking.customerName},\n\n` +
          `Great news! Your booking *${booking.bookingId}* has been *confirmed*.\n\n` +
          `🚖 *Trip Details:*\n` +
          `  Pickup: ${booking.pickupCity}\n` +
          (booking.dropCity ? `  Drop: ${booking.dropCity}\n` : '') +
          `  Date: ${pickupDateStr} @ ${booking.pickupTime}\n` +
          `  Cab: ${booking.cabCategory}\n\n` +
          (booking.adminRemark ? `📌 *Note:* ${booking.adminRemark}\n\n` : '') +
          `Driver details will be shared shortly. Stay tuned!\n\n` +
          `Thank you for choosing *GhoomWay* 🙏`,
      };

    case 'BOOKING_REJECTED_USER':
      return {
        to: `whatsapp:+91${booking.phoneNumber}`,
        body:
          `❌ *Booking Update – GhoomWay*\n\n` +
          `Hi ${booking.customerName},\n\n` +
          `We regret to inform you that your booking *${booking.bookingId}* could not be confirmed at this time.\n\n` +
          (booking.adminRemark ? `📌 *Reason:* ${booking.adminRemark}\n\n` : '') +
          `We apologize for the inconvenience. Please try booking again or contact us for assistance.\n\n` +
          `Thank you for your understanding 🙏\n*– Team GhoomWay*`,
      };

    case 'BOOKING_COMPLETED_USER':
      return {
        to: `whatsapp:+91${booking.phoneNumber}`,
        body:
          `🏁 *Trip Completed – GhoomWay*\n\n` +
          `Hi ${booking.customerName},\n\n` +
          `We hope you had a pleasant journey! Your booking *${booking.bookingId}* is now marked as *completed*.\n\n` +
          `🙏 *Thank you for riding with us!*\n\n` +
          `We'd love to hear your feedback. See you on your next trip! 🚗💨`,
      };

    case 'BOOKING_CANCELLED_USER':
      return {
        to: `whatsapp:+91${booking.phoneNumber}`,
        body:
          `🚫 *Booking Cancelled – GhoomWay*\n\n` +
          `Hi ${booking.customerName},\n\n` +
          `Your booking *${booking.bookingId}* has been *cancelled*.\n\n` +
          (booking.adminRemark ? `📌 *Note:* ${booking.adminRemark}\n\n` : '') +
          `If this was a mistake, please book again or contact support.\n\n` +
          `We hope to serve you again soon! 🙏`,
      };

    default:
      return null;
  }
};

/**
 * @desc    Send a WhatsApp notification via Twilio.
 * @param   {string} type        - Notification type key (e.g. 'NEW_BOOKING_ADMIN')
 * @param   {object} bookingData - The booking document or plain object
 * @returns {boolean}            - true on success, false on failure (never throws)
 */
const sendWhatsAppNotification = async (type, bookingData) => {
  const startMsg = `Initiating notification: ${type} | Booking: ${bookingData.bookingId} | Recipient: ${bookingData.phoneNumber}`;
  console.log(`\n[WhatsApp] ${startMsg}`);
  logToFile(startMsg);

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

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const response = await client.messages.create({
      body: notification.body,
      from: TWILIO_WHATSAPP_NUMBER,
      to: notification.to,
    });

    const successMsg = `✅ Sent successfully. SID: ${response.sid} | Status: ${response.status}`;
    console.log(`[WhatsApp] ${successMsg}`);
    logToFile(successMsg);
    return true;
  } catch (error) {
    const errorMsg = `❌ Failed to send "${type}": ${error.message}${error.code ? ` (Code: ${error.code})` : ''}`;
    console.error(`[WhatsApp] ${errorMsg}`);
    logToFile(errorMsg);
    
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
