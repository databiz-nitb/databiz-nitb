const pathwayService = require("../services/pathway.service");

// Mock data for testing without database
const mockPathways = [
  {
    _id: "1",
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science including statistics, Python programming, and data visualization.",
    category: "DS",
    createdBy: "admin",
    resources: ["res1", "res2", "res3"],
    createdAt: new Date().toISOString()
  },
  {
    _id: "2", 
    title: "Machine Learning Mastery",
    description: "Master machine learning algorithms, model training, and deployment techniques.",
    category: "AIML",
    createdBy: "admin",
    resources: ["res4", "res5"],
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Business Intelligence & Analytics",
    description: "Learn to analyze business data and create meaningful insights for decision making.",
    category: "DA", 
    createdBy: "admin",
    resources: ["res6", "res7", "res8", "res9"],
    createdAt: new Date().toISOString()
  }
];

exports.getAllPathways = async (req, res, next) => {
  try {
    const pathways = await pathwayService.getAllPathways();
    res.json(pathways);
  } catch (err) {
    // If database error, return mock data
    console.log("Database error, returning mock pathways data");
    res.json(mockPathways);
  }
};

exports.getPathwayById = async (req, res, next) => {
  try {
    const pathway = await pathwayService.getPathwayById(req.params.id);
    res.json(pathway);
  } catch (err) {
    next(err);
  }
};

exports.createPathway = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const pathway = await pathwayService.createPathway(data);
    res.status(201).json(pathway);
  } catch (err) {
    next(err);
  }
};

exports.updatePathway = async (req, res, next) => {
  try {
    const pathway = await pathwayService.updatePathway(req.params.id, req.body);
    res.json(pathway);
  } catch (err) {
    next(err);
  }
};

exports.deletePathway = async (req, res, next) => {
  try {
    await pathwayService.deletePathway(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
