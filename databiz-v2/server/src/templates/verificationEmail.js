const getVerificationEmailTemplate = (verifyUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
      <p style="color: #555; font-size: 16px;">
        Thank you for registering! Please click the button below to verify your email address and activate your account.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
          Verify Email
        </a>
      </div>
      <p style="color: #777; font-size: 14px;">
        Or copy and paste this link into your browser: <br/>
        <a href="${verifyUrl}" style="color: #007bff; word-break: break-all;">${verifyUrl}</a>
      </p>
      <p style="color: #777; font-size: 14px;">
        This link will expire in 1 hour. If you did not create an account, please ignore this email.
      </p>
    </div>
  `;
};

module.exports = { getVerificationEmailTemplate };

