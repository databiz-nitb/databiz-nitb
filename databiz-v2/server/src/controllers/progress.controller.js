const progressService = require("../services/progress.service");

exports.markProgress = async (req, res, next) => {
  try {
    const { pathwayId, resourceId, status, notes } = req.body;
    const progress = await progressService.markProgress(
      req.user.id,
      pathwayId,
      resourceId,
      status,
      notes
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const progress = await progressService.markProgress(
      req.user.id,
      req.body.pathwayId,
      req.body.resourceId,
      status,
      notes
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

exports.getMyProgress = async (req, res, next) => {
  try {
    const data = await progressService.getMyProgress(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getPathwayProgress = async (req, res, next) => {
  try {
    const data = await progressService.getPathwayProgress(req.params.pathwayId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getComparativeProgress = async (req, res, next) => {
  try {
    const data = await progressService.getComparativeProgress(
      req.params.pathwayId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};
