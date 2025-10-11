const Event = require("../models/Event");

const getAllEvents = async () => Event.find();
const getEventById = async (id) => Event.findById(id);
const createEvent = async (data) => new Event(data).save();
const updateEvent = async (id, data) =>
  Event.findByIdAndUpdate(id, data, { new: true });
const deleteEvent = async (id) => Event.findByIdAndDelete(id);

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
