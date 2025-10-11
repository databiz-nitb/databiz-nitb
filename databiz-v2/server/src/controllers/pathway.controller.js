const pathwayService = require("../services/pathway.service");

exports.getAllPathways = async (req, res, next) => {
  try {
    const pathways = await pathwayService.getAllPathways();
    res.json(pathways);
  } catch (err) {
    next(err);
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
