
import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_APP_PASSWORD,FRONTEND_URL } from '../config/env.js'

// 1. Create and configure email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false 
  }
});

// 2. Verify transporter connection with smtp server on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

// 3. Enhanced email sending function with error handling
export const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"Bookstore App" <${GMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Welcome to Bookstore App!</h2>
          <p style="font-size: 16px;">Please verify your email by clicking the button below:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #3498db; 
                    color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
            Verify Email
          </a>
          <p style="font-size: 14px; color: #7f8c8d;">
            If you didn't request this, please ignore this email.<br>
            This link will expire in 24 hours.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions); //send email
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};