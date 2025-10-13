// backend/src/utils/mailer.js
import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure === "true",
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.warn("⚠️ SMTP connection error:", error.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

// Send Registration Alert Email (Enhanced)
export async function sendRegistrationAlert(user, profile) {
  try {
    const profileDetails = profile?.toObject() || {};

    let additionalInfo = "";
    if (user.role === "student") {
      additionalInfo = `
        <tr>
          <td style="font-weight: bold; color: #111;">Experience Type:</td>
          <td>${profileDetails.experienceType || "N/A"}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="font-weight: bold; color: #111;">Location:</td>
          <td>${profileDetails.address?.city || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #111;">KYC Document:</td>
          <td>${profileDetails.kycInfo?.type || "N/A"} - ${
        profileDetails.kycInfo?.number || "N/A"
      }</td>
        </tr>
      `;
    } else if (user.role === "employer") {
      additionalInfo = `
        <tr>
          <td style="font-weight: bold; color: #111;">Company:</td>
          <td>${profileDetails.company?.name || "N/A"}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="font-weight: bold; color: #111;">Position:</td>
          <td>${profileDetails.position || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #111;">Industry:</td>
          <td>${profileDetails.company?.industry || "N/A"}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="font-weight: bold; color: #111;">Location:</td>
          <td>${profileDetails.contact?.address?.city || "N/A"}</td>
        </tr>
      `;
    }

    const mailOptions = {
      from: `"Sabka Pro" <${env.smtpUser}>`,
      to: env.adminEmail,
      subject: `🔔 New ${user.role.toUpperCase()} Registration Pending Approval`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="background-color: #002b5b; padding: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px;">⏳ Approval Required</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; color: #333;">Hello Admin,</p>
                <p style="font-size: 15px; color: #444;">A new <strong>${
                  user.role
                }</strong> has registered and is waiting for your approval:</p>
                
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
                    <td style="font-weight: bold; color: #111;">Phone:</td>
                    <td>${
                      profileDetails.phone ||
                      profileDetails.contact?.phone ||
                      "N/A"
                    }</td>
                  </tr>
                  ${additionalInfo}
                  <tr style="background-color: #f3f4f6;">
                    <td style="font-weight: bold; color: #111;">Registered On:</td>
                    <td>${new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                </table>

                <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #fff3cd; border-radius: 8px;">
                  <p style="margin: 0; color: #856404; font-weight: 600;">⚠️ This user is pending approval</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="${
                    env.corsOrigin || "http://localhost:3000"
                  }/admin/leads" 
                     style="background-color: #28a745; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; margin-right: 10px; display: inline-block;">
                    ✅ Approve
                  </a>
                  <a href="${
                    env.corsOrigin || "http://localhost:3000"
                  }/admin/leads" 
                     style="background-color: #dc3545; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; display: inline-block;">
                    ❌ Reject
                  </a>
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

// Send Approval Email with Credentials
export async function sendApprovalEmail(user, password) {
  try {
    const mailOptions = {
      from: `"Sabka Pro" <${env.smtpUser}>`,
      to: user.email,
      subject: "✅ Your Account Has Been Approved - Sabka Pro",
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; padding: 40px 0;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="background-color: #28a745; padding: 30px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Account Approved!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="font-size: 18px; color: #333;">
                  Hi ${user.firstName || "there"}! 👋
                </p>
                
                <p style="font-size: 15px; color: #444; line-height: 1.6;">
                  Great news! Your <strong>Sabka Pro</strong> account has been approved by our admin team.
                </p>
                
                <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 4px;">
                  <h3 style="margin: 0 0 15px 0; color: #155724;">Your Login Credentials:</h3>
                  <table width="100%" cellpadding="8" style="background-color: white; border-radius: 4px;">
                    <tr>
                      <td style="font-weight: bold; color: #155724; width: 120px;">Username:</td>
                      <td style="color: #155724; font-family: 'Courier New', monospace;">${
                        user.email
                      }</td>
                    </tr>
                    <tr>
                      <td style="font-weight: bold; color: #155724;">Password:</td>
                      <td style="color: #155724; font-family: 'Courier New', monospace; font-size: 16px; letter-spacing: 1px;">${password}</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404; font-size: 14px;">
                    ⚠️ <strong>Important:</strong> Please change your password after your first login for security purposes.
                  </p>
                </div>
                
                <p style="font-size: 15px; color: #444; line-height: 1.6; margin-top: 25px;">
                  ${
                    user.role === "student"
                      ? "You can now start exploring job opportunities and apply for positions that match your skills."
                      : "You can now start posting jobs and managing applications from qualified candidates."
                  }
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${env.corsOrigin || "http://localhost:3000"}/${
        user.role
      }/login" 
                     style="background-color: #002b5b; color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 16px; display: inline-block;">
                    Login to Your Account
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px; line-height: 1.6;">
                  If you have any questions or need assistance, feel free to reach out to our support team at 
                  <a href="mailto:${env.smtpUser}" style="color: #002b5b;">${
        env.smtpUser
      }</a>
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
      text: `
Hi ${user.firstName || "there"}!

Your Sabka Pro account has been approved!

Login Credentials:
Username: ${user.email}
Password: ${password}

IMPORTANT: Please change your password after your first login.

Login here: ${env.corsOrigin || "http://localhost:3000"}/${user.role}/login

If you have any questions, contact us at ${env.smtpUser}

© ${new Date().getFullYear()} Sabka Pro. All rights reserved.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Approval email sent to: ${user.email}`);
  } catch (error) {
    console.error("❌ Failed to send approval email:", error.message);
    throw error;
  }
}

// Send OTP Email
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
  }
}
