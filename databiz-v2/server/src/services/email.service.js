const getTransporter = require('../config/email.config');
const { getVerificationEmailTemplate } = require('../templates/verificationEmail');

const sendVerificationEmail = async (email, token) => {
  try {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const htmlContent = getVerificationEmailTemplate(verifyUrl);
    const gmailUser = process.env.GMAIL_USER || "databiz@nitb.in"

    const mailOptions = {
      from: gmailUser,
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify Your Email Account',
      html: htmlContent,
    };

    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email');
  }
};

module.exports = { sendVerificationEmail };

