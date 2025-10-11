const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // hashed password
  role: {
    type: String,
    enum: ["admin", "junior", "public"],
    default: "public",
  },
  year: { type: Number }, // 2,3,4
  isGroupAdmin: { type: Boolean, default: false }, // extra privilege
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
