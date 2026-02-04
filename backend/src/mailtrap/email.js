import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export default async function sendVerificationEmail(email, verificationToken) {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "verificationCode",
        verificationToken,
      ),
      category: "Email verification",
    });
    console.log("Verification mail has been sent", response);
  } catch (error) {
    console.log("Unable to send verification mail", error);
  }
}
