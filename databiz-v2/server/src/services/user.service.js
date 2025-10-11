const User = require("../models/User");

const getAllUsers = async () => {
  return User.find().select("-passwordHash");
};

const getMe = async (userId) => {
  return User.findById(userId).select("-passwordHash");
};

const assignRole = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.role = role;
  await user.save();
  return user;
};

module.exports = { getAllUsers, getMe, assignRole };
