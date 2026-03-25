const twilio = require('twilio');

/**
 * @desc    Normalize phone number to E.164 format (+91 for India)
 */
const normalizePhoneNumber = (phone) => {
  if (!phone) return null;
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // If 10 digits, assume India (+91)
  if (digits.length === 10) return `+91${digits}`;
  
  // If starts with 0 and is 11 digits (Indian local format), remove 0 and add +91
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.substring(1)}`;
  
  // If already starts with 91 and has 12 digits, just add +
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  
  // Default fallback (ensure it has a +)
  return phone.startsWith('+') ? phone : `+${digits}`;
};

/**
 * @desc    Get SMS message body based on booking status
 */
const getMessageBody = (status, booking) => {
  let pickupDateStr = 'Soon';
  try {
    if (booking.pickupDate) {
      pickupDateStr = new Date(booking.pickupDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  } catch (err) {
    console.warn(`[SMS] Date formatting error for ${booking.bookingId}: ${err.message}`);
  }

  switch (status) {
    case 'Accepted':
      return (
        `✅ Booking Confirmed - GhoomWay\n\n` +
        `Hi ${booking.customerName}, your ride ${booking.bookingId} is confirmed for ${pickupDateStr} at ${booking.pickupTime}.\n` +
        (booking.adminRemark ? `Note: ${booking.adminRemark}` : `Driver details will be shared shortly.`)
      );
    case 'Rejected':
      return (
        `❌ Booking Update - GhoomWay\n\n` +
        `Hi ${booking.customerName}, we regret to inform you that your booking ${booking.bookingId} could not be confirmed.\n` +
        (booking.adminRemark ? `Reason: ${booking.adminRemark}` : `Please try again or contact us for assistance.`)
      );
    default:
      return null;
  }
};

/**
 * @desc    Send SMS notification to customer
 * @param   {string} status      - Booking status ('Accepted', 'Rejected')
 * @param   {object} bookingData - Booking document
 */
const sendSMSNotification = async (status, bookingData) => {
  const { bookingId, customerName, phoneNumber } = bookingData;
  console.log(`\n[SMS] Initiating notification: ${status} | Booking: ${bookingId}`);

  try {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SMS_NUMBER) {
      console.error('[SMS] ❌ Missing Twilio SMS credentials in environment variables');
      return false;
    }

    const body = getMessageBody(status, bookingData);
    if (!body) {
      console.warn(`[SMS] ⚠️ No message template for status: "${status}". Skipping.`);
      return false;
    }

    const recipient = normalizePhoneNumber(phoneNumber);
    console.log(`[SMS] Sending to: ${recipient}`);

    const client = twilio(TWILIO_ACCOUNT_SID.trim(), TWILIO_AUTH_TOKEN.trim());

    const response = await client.messages.create({
      body: body,
      from: TWILIO_SMS_NUMBER.trim(),
      to: recipient.trim(),
    });

    console.log(`[SMS] ✅ Sent successfully. SID: ${response.sid}`);
    return true;
  } catch (error) {
    console.error(`[SMS] ❌ Failed to send: ${error.message}${error.code ? ` (Code: ${error.code})` : ''}`);
    return false;
  }
};

module.exports = { sendSMSNotification };
