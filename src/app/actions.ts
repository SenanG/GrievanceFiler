"use server"

import Twilio from 'twilio';

// Define recipientPhoneNumber at the top level if it's constant for this action
const recipientPhoneNumber = '+16474580648'; // Consider moving to env var if it changes

export async function submitGrievance(message: string): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  // Log the presence of environment variables (without logging the values themselves for security)
  console.log('In action - TWILIO_ACCOUNT_SID is set:', !!accountSid);
  console.log('In action - TWILIO_AUTH_TOKEN is set:', !!authToken);
  console.log('In action - TWILIO_PHONE_NUMBER is set:', !!twilioPhoneNumber);

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error('Critical: Twilio environment variables are not fully set in action.');
    return { success: false, error: 'Twilio client is not configured on the server. Missing environment variables.' };
  }

  const client = Twilio(accountSid, authToken);
  // No need to check if client is null here, as Twilio constructor will throw if SID/Token are invalid/missing,
  // but the check above for presence should catch most issues. We rely on the try/catch below for other init errors.

  try {
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return { success: false, error: 'Message is required and must be a non-empty string.' };
    }

    // Optional: Add more validation for message length, content, etc.
    // if (message.length > 1600) { // Twilio's character limit
    //   return { success: false, error: 'Message exceeds maximum length.' };
    // }

    console.log(`Attempting to send message from ${twilioPhoneNumber} to ${recipientPhoneNumber}`);
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber, // No non-null assertion needed due to check above
      to: recipientPhoneNumber,
    });
    console.log('Message sent successfully via Twilio.');
    return { success: true };

  } catch (error) {
    console.error("Error in submitGrievance action (Twilio or other):", error);
    const errorMessage = "Failed to send grievance due to a server error.";
    if (error instanceof Error) {
      // Potentially log error.message for more detailed server-side debugging
      // but return a more generic message to the client unless it's a specific, safe error.
      // e.g. if (error.message.includes("is not a valid phone number")) errorMessage = "Invalid recipient phone number.";
    }
    // For Twilio-specific errors, error might have more details, e.g. error.status, error.code
    // console.error("Raw Twilio Error details:", JSON.stringify(error, null, 2));
    return { success: false, error: errorMessage };
  }
} 