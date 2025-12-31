const Event = require("../models/Event");

const { deleteFromCloudinary } = require("../utils/cloudinary");

const getAllEvents = async () => Event.find();
const getEventById = async (id) => Event.findById(id);
const createEvent = async (data) => new Event(data).save();
const updateEvent = async (id, data) =>
  Event.findByIdAndUpdate(id, data, { new: true });
const deleteEvent = async (id) => {
  const event = await Event.findById(id);
  if (event && event.ImageUrl) {
    await deleteFromCloudinary(event.ImageUrl);
  }
  return Event.findByIdAndDelete(id);
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
