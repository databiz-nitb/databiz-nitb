const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String }, // external link
  type: {
    type: String,
    enum: ["video", "article", "course", "repo", "other"],
    default: "other",
  },
  estimatedTimeMin: Number,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
