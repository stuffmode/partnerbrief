const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendBriefingEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  // TODO: Implement Resend email delivery
  return { id: "", status: "sent" };
}
