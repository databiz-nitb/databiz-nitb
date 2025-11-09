"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { getBlogs } from "../../services/blog.service";

type Blog = {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  keywords: string[];
  description: string;
  image: string;
};

// const blogsData: Blog[] = [
//   {
//     id: "intro-to-datascience",
//     title: "Introduction to Data Science: A Beginner’s Guide",
//     date: "10 March 2025",
//     author: "DataBiz Club",
//     category: "Data Science",
//     keywords: ["data", "machine learning", "AI"],
//     description:
//       "Understand what Data Science is, why it matters, and how it’s transforming industries globally.",
//     image: "/images/blog-ds.jpg",
//   },
//   {
//     id: "power-of-visualization",
//     title: "The Power of Data Visualization",
//     date: "28 March 2025",
//     author: "DataBiz Club",
//     category: "Visualization",
//     keywords: ["charts", "tableau", "matplotlib"],
//     description:
//       "Explore how visuals turn complex data into clear insights that drive better decisions.",
//     image: "/images/blog-viz.jpg",
//   },
//   {
//     id: "future-of-ai",
//     title: "The Future of Artificial Intelligence",
//     date: "12 April 2025",
//     author: "DataBiz Club",
//     category: "AI",
//     keywords: ["deep learning", "neural networks"],
//     description:
//       "From automation to creativity — dive into what’s next for AI and how it’ll shape tomorrow.",
//     image: "/images/blog-ai.jpg",
//   },
//   {
//     id: "ml-vs-dl",
//     title: "Machine Learning vs Deep Learning: Key Differences",
//     date: "2 May 2025",
//     author: "DataBiz Club",
//     category: "Machine Learning",
//     keywords: ["ML", "DL", "neural nets"],
//     description:
//       "Learn how ML and DL differ, when to use each, and the core algorithms that power them.",
//     image: "/images/blog-ml.jpg",
//   },
// ];

export default function BlogsPage() {
   const [blogsData, setBlogData] = useState(Array<Blog>);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        const data = response.data;

        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs(); 
  }, []); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(blogsData.map((b) => b.category))];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogsData
      : blogsData.filter((b) => b.category === selectedCategory);

  return (
    <div className="min-h-screen w-full  flex flex-col justify-center items-center bg-gradient-to-b from-[#eef2ff] to-white py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Our <span className="text-indigo-600">Blogs</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Insights, tutorials, and stories written by <span className="font-semibold text-indigo-600">DataBiz Club</span> members — for learners passionate about data.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl w-full">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="bg-white border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {blog.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2 text-indigo-500" />{" "}
                  {blog.date}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {blog.keywords.map((k, i) => (
                    <span
                      key={i}
                      className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
