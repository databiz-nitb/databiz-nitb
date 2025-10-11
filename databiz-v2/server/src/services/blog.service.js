const Blog = require("../models/Blog");

const getAllBlogs = async () => Blog.find().populate("author");
const getBlogById = async (id) => Blog.findById(id).populate("author");
const createBlog = async (data) => new Blog(data).save();
const updateBlog = async (id, data) =>
  Blog.findByIdAndUpdate(id, data, { new: true });
const deleteBlog = async (id) => Blog.findByIdAndDelete(id);

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
