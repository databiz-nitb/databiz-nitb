const eventService = require("../services/event.service");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };

    // Sanitize ImageUrl field - remove if it's an object/empty
    if (typeof data.ImageUrl === 'object' && !req.file) {
      delete data.ImageUrl;
    }

    if (req.file) {
      data.ImageUrl = req.file.path;
    }
    const event = await eventService.createEvent(data);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.ImageUrl = req.file.path;
    }
    const event = await eventService.updateEvent(req.params.id, data);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
