const twilio = require('twilio');

/**
 * @desc    Normalize phone number to E.164 format (+91 for India)
 */
const normalizePhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return `+${digits}`;
};

/**
 * @desc    Get SMS message body based on booking status
 */
const getMessageBody = (status, booking) => {
  const pickupDateStr = new Date(booking.pickupDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    console.log(`[SMS] Executing Twilio call | From: "${TWILIO_SMS_NUMBER}" | To: "${recipient}"`);

    const response = await client.messages.create({
      body: body,
      from: TWILIO_SMS_NUMBER.trim(),
      to: recipient,
    });

    console.log(`[SMS] ✅ Sent successfully. SID: ${response.sid}`);
    return true;
  } catch (error) {
    console.error(`[SMS] ❌ Failed to send: ${error.message}`);
    return false;
  }
};

module.exports = { sendSMSNotification };
