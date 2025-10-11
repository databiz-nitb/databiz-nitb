const ProgressEntry = require("../models/ProgressEntry");
const Pathway = require("../models/Pathway");
const mongoose = require("mongoose");

const markProgress = async (userId, pathwayId, resourceId, status, notes) => {
  const update = {
    user: userId,
    pathway: pathwayId,
    resource: resourceId,
    status,
  };
  if (status === "completed") update.completedAt = new Date();
  if (notes) update.notes = notes;

  return ProgressEntry.findOneAndUpdate(
    { user: userId, resource: resourceId },
    { $set: update },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const getMyProgress = async (userId) => {
  return ProgressEntry.find({ user: userId }).populate("pathway resource");
};

const getPathwayProgress = async (pathwayId) => {
  return ProgressEntry.find({ pathway: pathwayId }).populate("user resource");
};

const getComparativeProgress = async (pathwayId) => {
  const pipeline = [
    { $match: { pathway: mongoose.Types.ObjectId(pathwayId) } },
    {
      $group: {
        _id: "$user",
        completedCount: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
      },
    },
    { $sort: { completedCount: -1 } },
  ];
  return ProgressEntry.aggregate(pipeline);
};

module.exports = {
  markProgress,
  getMyProgress,
  getPathwayProgress,
  getComparativeProgress,
};
