const Blog = require("../models/Blog");

const { deleteFromCloudinary } = require("../utils/cloudinary");

const getAllBlogs = async () => Blog.find().populate("author");
const getBlogById = async (id) => Blog.findById(id).populate("author");
const createBlog = async (data) => new Blog(data).save();
const updateBlog = async (id, data) =>
  Blog.findByIdAndUpdate(id, data, { new: true });
const deleteBlog = async (id) => {
  const blog = await Blog.findById(id);
  if (blog && blog.image) {
    await deleteFromCloudinary(blog.image);
  }
  return Blog.findByIdAndDelete(id);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
