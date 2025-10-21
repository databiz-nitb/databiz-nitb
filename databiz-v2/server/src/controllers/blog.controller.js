const blogService = require("../services/blog.service");

// Mock data for testing without database
const mockBlogs = [
  {
    _id: "blog1",
    title: "Getting Started with Python for Data Science",
    content: "Python has become the go-to language for data science. In this comprehensive guide, we'll explore the fundamental libraries and tools that make Python so powerful for data analysis, including pandas, numpy, matplotlib, and scikit-learn. Whether you're a complete beginner or looking to strengthen your foundation, this article will provide you with the essential knowledge to start your data science journey.",
    author: { name: "John Doe", _id: "user1" },
    tags: ["python", "data-science", "beginner", "pandas"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "public"
  },
  {
    _id: "blog2", 
    title: "Advanced Machine Learning Techniques",
    content: "Dive deep into advanced machine learning algorithms including ensemble methods, neural networks, and deep learning architectures. This article covers practical implementation strategies, hyperparameter tuning, and real-world applications. Learn how to build robust models that can handle complex datasets and deliver accurate predictions in production environments.",
    author: { name: "Jane Smith", _id: "user2" },
    tags: ["machine-learning", "deep-learning", "advanced", "neural-networks"],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "public"
  },
  {
    _id: "blog3",
    title: "Data Visualization Best Practices",
    content: "Creating effective data visualizations is both an art and a science. This guide explores the principles of good visualization design, common pitfalls to avoid, and tools like Tableau, Power BI, and Python libraries that can help you create compelling visual stories from your data. Learn how to choose the right chart types and design elements to communicate your insights effectively.",
    author: { name: "Mike Johnson", _id: "user3" },
    tags: ["visualization", "tableau", "design", "storytelling"],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    visibility: "public"
  }
];

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    // If database error, return mock data
    console.log("Database error, returning mock blogs data");
    res.json(mockBlogs);
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
