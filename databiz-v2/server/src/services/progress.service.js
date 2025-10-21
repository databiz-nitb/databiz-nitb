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

const getUserPathwayProgress = async (userId, pathwayId) => {
  const pathway = await Pathway.findById(pathwayId).populate('resources');
  if (!pathway) throw new Error('Pathway not found');

  const progressEntries = await ProgressEntry.find({ 
    user: userId, 
    pathway: pathwayId 
  }).populate('resource');

  const totalResources = pathway.resources.length;
  const completedResources = progressEntries.filter(p => p.status === 'completed').length;
  const inProgressResources = progressEntries.filter(p => p.status === 'in_progress').length;
  
  return {
    pathway,
    totalResources,
    completedResources,
    inProgressResources,
    completionPercentage: totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0,
    progressEntries
  };
};

const getAllUserProgress = async (userId) => {
  const progressEntries = await ProgressEntry.find({ user: userId })
    .populate('pathway resource');

  // Group by pathway
  const pathwayProgress = {};
  progressEntries.forEach(entry => {
    const pathwayId = entry.pathway._id.toString();
    if (!pathwayProgress[pathwayId]) {
      pathwayProgress[pathwayId] = {
        pathway: entry.pathway,
        total: 0,
        completed: 0,
        inProgress: 0,
        resources: []
      };
    }
    pathwayProgress[pathwayId].total++;
    pathwayProgress[pathwayId].resources.push(entry);
    if (entry.status === 'completed') pathwayProgress[pathwayId].completed++;
    if (entry.status === 'in_progress') pathwayProgress[pathwayId].inProgress++;
  });

  // Calculate completion percentages
  Object.keys(pathwayProgress).forEach(pathwayId => {
    const progress = pathwayProgress[pathwayId];
    progress.completionPercentage = progress.total > 0 ? 
      Math.round((progress.completed / progress.total) * 100) : 0;
  });

  return Object.values(pathwayProgress);
};

module.exports = {
  markProgress,
  getMyProgress,
  getPathwayProgress,
  getComparativeProgress,
  getUserPathwayProgress,
  getAllUserProgress,
};
