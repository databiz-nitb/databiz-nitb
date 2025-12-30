const User = require("../models/User");

const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await User.find().select("-passwordHash").skip(skip).limit(limit);
  const total = await User.countDocuments();

  return {
    users,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
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
