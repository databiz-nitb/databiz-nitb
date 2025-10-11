const blogService = require("../services/blog.service");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const data = { ...req.body, author: req.user.id };
    const blog = await blogService.createBlog(data);
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
