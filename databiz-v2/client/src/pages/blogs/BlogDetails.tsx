import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";

const blogsData = [
  {
    id: "intro-to-datascience",
    title: "Introduction to Data Science: A Beginner’s Guide",
    date: "10 March 2025",
    author: "DataBiz Club",
    image: "/images/blog-ds.jpg",
    keywords: ["data", "machine learning", "AI"],
    content: `
Data Science combines statistics, computer science, and domain knowledge to uncover patterns and insights from data.

At DataBiz, we believe in learning by doing — from building machine learning models to interpreting real-world data problems.
    
In this article, we’ll explore what data science really is, its core components, and how you can start your journey today!
    `,
  },
  // ... Add other blog objects here
];

export default function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const blog = blogsData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-gray-600">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <Link
          to="/blogs"
          className="flex items-center text-indigo-600 mb-4 hover:underline"
        >
          <ArrowLeft className="mr-2" size={18} /> Back to Blogs
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-xl mb-6 shadow-md"
        />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Calendar size={16} className="mr-2 text-indigo-500" /> {blog.date} •{" "}
          <span className="ml-1 font-medium text-indigo-600">{blog.author}</span>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
          {blog.content}
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
  );
}
