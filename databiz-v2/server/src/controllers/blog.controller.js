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

    // Sanitize image field - remove if it's an object/empty from FormData artifact
    if (typeof data.image === 'object' && !req.file) {
      delete data.image;
    }

    if (req.file) {
      data.image = req.file.path;
    }

    // Ensure tags is Array<String>
    if (data.tags) {
      // If tags is a string (single tag), make array
      if (typeof data.tags === 'string') {
        data.tags = [data.tags];
      }
      // If it's already an array, Mongoose handles it.
      // However, to be safe from nested arrays:
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.flat();
      }
    } else {
      delete data.tags; // Let schema default take over if any
    }
    const blog = await blogService.createBlog(data);
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const blog = await blogService.updateBlog(req.params.id, data);
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
