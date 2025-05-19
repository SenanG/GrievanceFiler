import { NextResponse } from 'next/server';
import Twilio from 'twilio';

const accountSid = 'AC84aef93fd700f1adffe7bbb7d639098d';
const authToken = '751838f11c9dd22dad996c6fd8757a7e';
const twilioPhoneNumber = '+12494945931';
const recipientPhoneNumber = '+16474580648';

const client = Twilio(accountSid, authToken);

export async function POST(request: Request) {
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
      from: twilioPhoneNumber,
      to: recipientPhoneNumber,
    });

    return NextResponse.json({ success: true, message: 'Grievance sent successfully!' });

  } catch (error: unknown) {
    console.error('Twilio API Error:', error);
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