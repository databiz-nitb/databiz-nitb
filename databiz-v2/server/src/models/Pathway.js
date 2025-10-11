const mongoose = require("mongoose");

const pathwaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ["DS", "AIML", "DA"], required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }], // ordered
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pathway", pathwaySchema);
