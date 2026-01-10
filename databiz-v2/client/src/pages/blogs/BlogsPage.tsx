import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../services/blog.service';
import type { IBlog } from '../../types';

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Helper to get author name safely
  const getAuthorName = () => {
    return 'Team DataBiz';
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-24 md:pt-28">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Check if there are no blogs
  if (blogs.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-24 md:pt-28">
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">No Blogs Available</h1>
          <p className="text-xl text-gray-400 mb-8">
            We're working on creating amazing content for you. Check back soon!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Our Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto">
            Insights, tutorials, and stories from the world of data science and analytics
          </p>
          <div className="mt-6 text-center text-gray-400">
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
              {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="group bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Blog Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={blog.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.tags && blog.tags[0] ? blog.tags[0] : 'Article'}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="far fa-calendar"></i>
                    {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  {/* Read time calculation could be added here */}
                  <span>5 min read</span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                </p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {getAuthorName().charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-300">{getAuthorName()}</span>
                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read More
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;