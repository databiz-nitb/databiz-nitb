import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../../services/blog.service";
import { deleteBlog } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";
import type { IBlog } from "../../types";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const res = await getBlogById(id);
          setBlog(res.data);
        }
      } catch (err: any) {
        setError("Failed to load blog");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorName = (author: any) => {
    return typeof author === 'string' ? author : author?.name || 'Unknown Author';
  };

  const handleEditBlog = () => {
    if (id) {
      navigate(`/admin/blogs/edit/${id}`);
    }
  };

  const handleDeleteBlog = async () => {
    if (!id || !user || user.role !== 'admin') {
      alert('Unauthorized action');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog? This action cannot be undone.'
    );

    if (confirmDelete) {
      try {
        await deleteBlog(id);
        alert('Blog deleted successfully!');
        navigate('/blogs');
      } catch (error) {
        console.error('Failed to delete blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Blog not found"}
        </div>
        <button
          onClick={() => navigate('/blogs')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/blogs')}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>
      </div>

      {/* Blog Preview at Top */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Blog Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>By {getAuthorName(blog.author)}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
            </div>

            {blog.visibility && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                blog.visibility === 'public' ? 'bg-green-100 text-green-800' :
                blog.visibility === 'junior' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {blog.visibility.charAt(0).toUpperCase() + blog.visibility.slice(1)}
              </span>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Author:</span>
            <span className="ml-2 text-gray-600">{getAuthorName(blog.author)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Published:</span>
            <span className="ml-2 text-gray-600">
              {blog.publishedAt && formatDate(blog.publishedAt)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Visibility:</span>
            <span className="ml-2 text-gray-600 capitalize">{blog.visibility}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tags:</span>
            <span className="ml-2 text-gray-600">
              {blog.tags && blog.tags.length > 0 ? blog.tags.join(', ') : 'No tags'}
            </span>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {user?.role === 'admin' && (
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={handleEditBlog}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Edit Blog
          </button>
          <button 
            onClick={handleDeleteBlog}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
