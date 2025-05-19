import { NextResponse } from 'next/server';
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recipientPhoneNumber = '+16474580648';

// Log the presence of environment variables (without logging the values themselves for security)
console.log('TWILIO_ACCOUNT_SID is set:', !!accountSid);
console.log('TWILIO_AUTH_TOKEN is set:', !!authToken);
console.log('TWILIO_PHONE_NUMBER is set:', !!twilioPhoneNumber);

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('Critical: Twilio environment variables are not fully set.');
  // Do not proceed with client initialization if variables are missing
}

// Initialize client only if variables are set
const client = accountSid && authToken ? Twilio(accountSid, authToken) : null;

if (!client) {
  console.error('Critical: Twilio client failed to initialize, likely due to missing SID or Token.');
}

export async function POST(request: Request) {
  if (!client) {
    // This specific error message should be returned if client is null
    return NextResponse.json({ error: 'Twilio client is not configured on the server. Please check server logs. Missing environment variables.' }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required and must be a non-empty string.' }, { status: 400 });
    }

    // Optional: Add more validation for message length, content, etc.
    // if (message.length > 1600) { // Twilio's character limit for a single SMS is 1600 characters
    //   return NextResponse.json({ error: 'Message exceeds maximum length.' }, { status: 400 });
    // }

    await client.messages.create({
      body: message,
      from: twilioPhoneNumber!,
      to: recipientPhoneNumber,
    });

    return NextResponse.json({ success: true, message: 'Grievance sent successfully!' });

  } catch (error: unknown) {
    console.error('Twilio API Error (raw JSON):', JSON.stringify(error, null, 2));
    console.error('Twilio API Error (full object):', error);
    let errorMessage = 'Failed to send grievance.';
    if (error instanceof Error) {
      errorMessage += ` Details: ${error.message}`;
    } else if (typeof error === 'string') {
      errorMessage += ` Details: ${error}`;
    }
    // Consider not sending raw Twilio errors to the client in production
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 