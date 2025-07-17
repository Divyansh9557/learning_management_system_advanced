import { User } from "better-auth";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMPT_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (user: User, url: string) => {
  try {
    await transporter.sendMail({
      from: `"Learn Hub" <${process.env.SMPT_EMAIL}>`,
      to: user.email,
      subject: "Verify your Email",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 30px;">
      <h2 style="color: #4f46e5; margin-bottom: 20px;">Verify Your Email Address</h2>
      <p style="font-size: 16px; color: #333;">
        Hi there 👋,
        <br /><br />
        Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Verify Email
        </a>
      </div>
      <p style="font-size: 14px; color: #888;">
        If you didn't request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #888; margin-top: 40px;">
        — The LearnHub Team
      </p>
    </div>
  </div>
`,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
};
