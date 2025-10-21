import React, { useEffect, useState } from "react";
import { getBlogs } from "../../services/blog.service";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { IBlog } from "../../types";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err: any) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // Get unique tags from all blogs
  const allTags = Array.from(
    new Set(blogs.flatMap(blog => blog.tags || []))
  );

  const filteredBlogs = selectedTag === "all" 
    ? blogs 
    : blogs.filter(blog => blog.tags?.includes(selectedTag));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: any) => {
    return typeof author === 'string' ? author : author?.name || 'Unknown Author';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600 animate-pulse-subtle">Loading blogs...</div>
        <div className="ml-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-left">Blog Posts</h1>
          <p className="text-gray-600 animate-fade-in-left" style={{animationDelay: '0.2s'}}>Insights, tutorials, and updates from our community</p>
        </div>
        {user?.role === "admin" && (
          <Link to="/admin/blogs/create">
            <Button className="btn-interactive hover-lift animate-fade-in-right bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Write Blog
            </Button>
          </Link>
        )}
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-8 animate-slide-in-up">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover-scale ${
                selectedTag === "all"
                  ? "bg-blue-600 text-white animate-scale-in"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover-scale animate-fade-in ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white animate-scale-in"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
          {error}
        </div>
      )}

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <Link key={blog._id} to={`/blogs/${blog._id}`}>
              <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full hover-lift animate-stagger-${Math.min(index + 1, 6)}`}>
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.content.substring(0, 150)}...
                    </p>
                  </div>
                  
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <span>By {getAuthorName(blog.author)}</span>
                    <span>{blog.createdAt && formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v9m0 0h-3m3 0h3m-3 0V4" />
            </svg>
            <p className="text-lg animate-fade-in-up">No blog posts found</p>
            <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {selectedTag === "all" 
                ? "No blog posts are available yet." 
                : `No posts found with tag "${selectedTag}".`
              }
            </p>
          </div>
          {user?.role === "admin" && (
            <Link to="/admin/blogs/create">
              <Button className="btn-interactive hover-lift animate-scale-in-bounce bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg" style={{animationDelay: '0.4s'}}>
                <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Write First Blog
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
