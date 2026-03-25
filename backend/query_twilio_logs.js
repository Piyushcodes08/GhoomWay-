const dotenv = require('dotenv');
const path = require('path');
const twilio = require('twilio');

dotenv.config({ path: path.resolve(__dirname, '.env') });

async function queryLogs() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error('❌ Missing credentials in .env');
    return;
  }
  const client = twilio(TWILIO_ACCOUNT_SID.trim(), TWILIO_AUTH_TOKEN.trim());
  try {
    const messages = await client.messages.list({ limit: 5 });
    messages.forEach(m => {
      console.log(`[${m.dateCreated}] SID: ${m.sid}`);
      console.log(` Status: ${m.status} | From: ${m.from} | To: ${m.to}`);
      console.log(` Error: ${m.errorCode || '0'} - ${m.errorMessage || 'None'}`);
      console.log(` Body Preview: ${m.body.substring(0, 50)}...`);
      console.log('---');
    });
  } catch (error) {
    console.error(`\n❌ API ERROR: ${error.message}`);
  }
}
queryLogs();
