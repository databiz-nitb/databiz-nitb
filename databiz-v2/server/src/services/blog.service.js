const Blog = require("../models/Blog");

const getAllBlogs = async () => Blog.find().populate("author");
const getBlogById = async (id) => Blog.findById(id).populate("author");
const createBlog = async (data) => {
  const blog = new Blog(data);
  await blog.save();
  return blog.populate("author");
};
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
