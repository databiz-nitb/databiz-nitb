const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pathway: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pathway",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    completedAt: { type: Date },
    notes: String,
    sourcePlatform: String, // optional: 'youtube','medium','github'
    externalProgressData: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, resource: 1 }, { unique: true });

module.exports = mongoose.model("ProgressEntry", progressSchema);
