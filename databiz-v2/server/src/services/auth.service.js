const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./email.service");

const register = async (name, email, password, year) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  
  // Generate token and expiry
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const tokenExpires = new Date(Date.now() + 3600000); // 1 hour
  
  const user = new User({ 
    name, 
    email, 
    passwordHash, 
    year, 
    role: "public",
    verificationToken,
    tokenExpires
  });
  
  await user.save();

  // Send the email
  await sendVerificationEmail(user.email, verificationToken);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token, message: "Registration successful. Please check your email to verify your account." };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid email or password");

  if (!user.isVerified) {
    const error = new Error("Please verify your email to continue.");
    error.status = 403;
    error.code = "EMAIL_NOT_VERIFIED";
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return { user, token };
};

module.exports = { register, login };
const verifyEmail = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  
  if (!user || user.tokenExpires < Date.now()) {
    const error = new Error("Invalid or expired verification token.");
    error.status = 400;
    throw error;
  }
  
  user.isVerified = true;
  user.verificationToken = undefined;
  user.tokenExpires = undefined;
  
  // Use $unset to remove fields cleanly from DB
  await User.updateOne({ _id: user._id }, { 
    $set: { isVerified: true },
    $unset: { verificationToken: 1, tokenExpires: 1 }
  });
  
  return { message: "Email verified successfully." };
};

const resendVerification = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }

  if (user.isVerified) {
    const error = new Error("Email is already verified.");
    error.status = 400;
    throw error;
  }

  // Generate new token and expiry
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const tokenExpires = new Date(Date.now() + 3600000); // 1 hour

  user.verificationToken = verificationToken;
  user.tokenExpires = tokenExpires;
  await user.save();

  await sendVerificationEmail(user.email, verificationToken);
  
  return { message: "Verification email sent." };
};

module.exports = { register, login, verifyEmail, resendVerification };
