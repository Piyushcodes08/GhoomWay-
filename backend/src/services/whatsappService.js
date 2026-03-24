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
  console.log(`\n[WhatsApp] Initiating notification: ${type} | Booking: ${bookingData.bookingId}`);

  try {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER, ADMIN_WHATSAPP_NUMBER } =
      process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER || !ADMIN_WHATSAPP_NUMBER) {
      console.error('[WhatsApp] ❌ Missing Twilio credentials. Check .env file.');
      return false;
    }

    const notification = buildNotification(type, bookingData, ADMIN_WHATSAPP_NUMBER);

    if (!notification) {
      console.warn(`[WhatsApp] ⚠️ Unknown notification type: "${type}". Skipping.`);
      return false;
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const response = await client.messages.create({
      body: notification.body,
      from: TWILIO_WHATSAPP_NUMBER,
      to: notification.to,
    });

    console.log(`[WhatsApp] ✅ Sent successfully. SID: ${response.sid} | Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error(`[WhatsApp] ❌ Failed to send "${type}": ${error.message}`);

    // Developer hints for common Twilio error codes
    const hints = {
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
