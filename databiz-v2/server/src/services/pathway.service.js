const Pathway = require("../models/Pathway");

const getAllPathways = async () => Pathway.find().populate("resources");
const getPathwayById = async (id) => Pathway.findById(id).populate("resources");
const createPathway = async (data) => new Pathway(data).save();
const updatePathway = async (id, data) =>
  Pathway.findByIdAndUpdate(id, data, { new: true });
const deletePathway = async (id) => Pathway.findByIdAndDelete(id);

module.exports = {
  getAllPathways,
  getPathwayById,
  createPathway,
  updatePathway,
  deletePathway,
};
