import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// ✅ Mail Transporter (Single instance)
const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure === "true",
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

// ✅ Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.warn("⚠️ SMTP connection error:", error.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

// ✅ Send Registration Alert Email
export async function sendRegistrationAlert(user) {
  try {
    const mailOptions = {
      from: `"Sabka Pro" <${env.smtpUser}>`,
      to: env.adminEmail,
      subject: `🌟 New ${user.role} Registered - Sabka Pro`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="background-color: #002b5b; padding: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New ${
                  user.role.charAt(0).toUpperCase() + user.role.slice(1)
                } Registered</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; color: #333;">Hello Admin,</p>
                <p style="font-size: 15px; color: #444;">A new <strong>${
                  user.role
                }</strong> has just registered on <strong>Sabka Pro</strong>. Here are the details:</p>
                
                <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 10px; border-collapse: collapse;">
                  <tr style="background-color: #f3f4f6;">
                    <td style="font-weight: bold; color: #111;">Name:</td>
                    <td>${user.firstName || ""} ${user.lastName || ""}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #111;">Email:</td>
                    <td>${user.email}</td>
                  </tr>
                  <tr style="background-color: #f3f4f6;">
                    <td style="font-weight: bold; color: #111;">Role:</td>
                    <td>${user.role}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #111;">Registered On:</td>
                    <td>${new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                </table>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  You can review and manage new leads in your CRM dashboard.
                </p>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://sabka-pro-dashboard.com" style="background-color: #002b5b; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px;">View in Dashboard</a>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f3f4f6; padding: 15px; font-size: 13px; color: #777;">
                © ${new Date().getFullYear()} Sabka Pro. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Admin notified about new ${user.role}: ${user.email}`);
  } catch (error) {
    console.error("❌ Failed to send registration alert:", error.message);
    throw error;
  }
}

// ✅ Send OTP Email
export async function sendOTPEmail(email, otp) {
  try {
    const mailOptions = {
      from: `"Sabka Pro" <${env.smtpUser}>`,
      to: email,
      subject: "Your OTP Code - Sabka Pro",
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="background-color: #002b5b; padding: 30px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Email Verification</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <p style="font-size: 16px; color: #333; margin-bottom: 30px;">
                  Your One-Time Password (OTP) for registration:
                </p>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; display: inline-block; margin: 20px 0;">
                  <h2 style="color: #002b5b; font-size: 36px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">
                    ${otp}
                  </h2>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  This OTP will expire in <strong>10 minutes</strong>.<br>
                  Please do not share this code with anyone.
                </p>
                
                <p style="font-size: 13px; color: #999; margin-top: 20px;">
                  If you didn't request this OTP, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f3f4f6; padding: 15px; font-size: 13px; color: #777;">
                © ${new Date().getFullYear()} Sabka Pro. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `,
      text: `Your OTP for Sabka Pro registration is: ${otp}\n\nThis code will expire in 10 minutes.\nIf you didn't request this OTP, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP email sent to: ${email}`);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error.message);
    // Don't throw - we still want registration to proceed even if email fails
  }
}

// ✅ Send Welcome Email
export async function sendWelcomeEmail(user) {
  try {
    const mailOptions = {
      from: `"Sabka Pro" <${env.smtpUser}>`,
      to: user.email,
      subject: "Welcome to Sabka Pro! 🎉",
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="background-color: #002b5b; padding: 30px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Sabka Pro!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="font-size: 18px; color: #333;">
                  Hi ${user.firstName || "there"}! 👋
                </p>
                
                <p style="font-size: 15px; color: #444; line-height: 1.6;">
                  Thank you for registering with <strong>Sabka Pro</strong>. We're excited to have you on board!
                </p>
                
                <p style="font-size: 15px; color: #444; line-height: 1.6;">
                  ${
                    user.role === "student"
                      ? "Start exploring job opportunities and build your career with us."
                      : "Start posting jobs and find the perfect candidates for your company."
                  }
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://sabka-pro.com/dashboard" style="background-color: #002b5b; color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 16px; display: inline-block;">
                    Get Started
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  If you have any questions, feel free to reach out to our support team.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f3f4f6; padding: 15px; font-size: 13px; color: #777;">
                © ${new Date().getFullYear()} Sabka Pro. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Welcome email sent to: ${user.email}`);
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error.message);
  }
}
