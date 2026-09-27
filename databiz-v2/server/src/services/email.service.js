const getTransporter = require('../config/email.config');
const { getVerificationEmailTemplate } = require('../templates/verificationEmail');

const sendVerificationEmail = async (email, token) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, '');
    if (!frontendUrl) {
      throw new Error('FRONTEND_URL is not configured');
    }

    const verifyUrl = `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
    const htmlContent = getVerificationEmailTemplate(verifyUrl);
    const gmailUser = process.env.GMAIL_USER || 'databiz@nitb.in';

    const mailOptions = {
      from: gmailUser,
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

