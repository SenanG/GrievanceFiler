"use server"

export async function submitGrievance(message: string) {
  try {
    // This is where you would integrate with Twilio to send the message
    // Example implementation (you'll need to replace with your actual API endpoint):

    // For server-side fetch, an absolute URL is needed.
    // In production, this should be dynamically set (e.g., via environment variables like process.env.NEXT_PUBLIC_APP_URL or process.env.VERCEL_URL)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/send-grievance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) // Try to parse error response
      console.error("API Error:", errorData)
      throw new Error(errorData.error || "Failed to submit grievance")
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