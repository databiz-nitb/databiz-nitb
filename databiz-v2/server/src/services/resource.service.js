const Resource = require("../models/Resource");

const getAllResources = async () => Resource.find();
const getResourceById = async (id) => Resource.findById(id);
const createResource = async (data) => new Resource(data).save();
const updateResource = async (id, data) =>
  Resource.findByIdAndUpdate(id, data, { new: true });
const deleteResource = async (id) => Resource.findByIdAndDelete(id);

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
