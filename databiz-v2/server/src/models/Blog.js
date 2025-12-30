const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
  image: { type: String }, // URL to image
  visibility: {
    type: String,
    enum: ["public", "junior", "admin"],
    default: "public",
  },
});

module.exports = mongoose.model("Blog", blogSchema);
