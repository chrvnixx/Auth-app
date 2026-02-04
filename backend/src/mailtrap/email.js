import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export async function sendVerificationEmail(
  email,
  userName,
  verificationToken,
) {
  const recipient = [{ email } || { userName }];
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

export async function sendResetLinkMail(email, resetLink) {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset link",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetLink),
      category: "Password reset",
    });
    console.log("Password reset mail sent successfully", response);
  } catch (error) {
    console.log("Error sending password reset mail", error);
  }
}
