const resourceService = require("../services/resource.service");

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await resourceService.getAllResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
};

exports.getResourceById = async (req, res, next) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

exports.createResource = async (req, res, next) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const resource = await resourceService.updateResource(
      req.params.id,
      req.body
    );
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    await resourceService.deleteResource(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
