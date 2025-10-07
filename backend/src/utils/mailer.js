import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// ✅ Mail Transporter
const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure === "true",
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

// ✅ Send Registration Alert Email (without logo)
export async function sendRegistrationAlert(user) {
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
}
