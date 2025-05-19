"use server"

export async function submitGrievance(message: string) {
  try {
    // This is where you would integrate with Twilio to send the message
    // Example implementation (you'll need to replace with your actual API endpoint):

    // For server-side fetch, an absolute URL is needed.
    let baseUrl = "http://localhost:3000"; // Default for local development
    if (process.env.VERCEL_URL) {
      // VERCEL_URL includes the domain only, so we need to add https://
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_APP_URL) { // Fallback if you prefer to set this manually
      baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    }

    const response = await fetch(`${baseUrl}/api/send-grievance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const responseText = await response.text(); // Get raw response text
      console.error(`API Error: Status ${response.status} ${response.statusText}. Response text: ${responseText}`);
      let errorDetail = "Failed to submit grievance";
      try {
        const errorData = JSON.parse(responseText); // Try to parse it as JSON
        if (errorData && errorData.error) {
          errorDetail = errorData.error;
        }
      } catch {
        // Not a JSON response, or JSON doesn't contain .error
        console.warn("API error response was not valid JSON or did not contain an 'error' field.");
      }
      throw new Error(errorDetail);
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting grievance:", error)
    // Ensure the error message passed to the client is a string
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to submit grievance")
    }
    throw new Error("Failed to submit grievance")
  }
} 