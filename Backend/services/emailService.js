const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email (type: 'verify' or 'reset')
const sendOTPEmail = async (email, otp, type = "reset") => {
  try {
    const transporter = createTransporter();
    let subject, html;
    if (type === "verify") {
      subject = "Verify Your Email - EventSpark";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p>Hello,</p>
          <p>Thank you for signing up for EventSpark! Please verify your email address using the OTP below:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not sign up for EventSpark, please ignore this email.</p>
          <p>Best regards,<br>The EventSpark Team</p>
        </div>
      `;
    } else {
      subject = "Password Reset OTP - EventSpark";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for your EventSpark account.</p>
          <p>Your OTP (One-Time Password) is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The EventSpark Team</p>
        </div>
      `;
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to EventSpark!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Welcome to EventSpark!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for signing up with EventSpark! We're excited to have you on board.</p>
          <p>You can now start exploring and creating amazing events.</p>
          <p>Best regards,<br>The EventSpark Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending welcome email: ", error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail,
};
