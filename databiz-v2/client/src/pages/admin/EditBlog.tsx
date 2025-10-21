import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBlogById } from "../../services/blog.service";
import { updateBlog } from "../../services/admin.service";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { IBlog } from "../../types";

const EditBlog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [blog, setBlog] = useState<IBlog | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    visibility: "public" as "public" | "junior" | "admin"
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const res = await getBlogById(id);
          const blogData = res.data;
          setBlog(blogData);
          setFormData({
            title: blogData.title || "",
            content: blogData.content || "",
            tags: blogData.tags ? blogData.tags.join(", ") : "",
            visibility: blogData.visibility || "public"
          });
        }
      } catch (err: any) {
        console.error("Error fetching blog:", err);
        alert("Failed to load blog");
        navigate("/blogs");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      alert('Only admins can edit blogs');
      return;
    }

    if (!id) {
      alert('Blog ID is missing');
      return;
    }

    try {
      setLoading(true);
      
      const blogData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        visibility: formData.visibility
      };

      await updateBlog(id, blogData);
      alert('Blog updated successfully!');
      navigate(`/blogs/${id}`);
      
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Blog not found
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
            <p className="text-gray-600">Update your blog post content and settings.</p>
          </div>
          <button
            onClick={() => navigate(`/blogs/${id}`)}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Blog
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <Input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="data science, machine learning, python"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate tags with commas.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility *
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="public">Public - Everyone can read</option>
                    <option value="junior">Junior - Junior and Admin users only</option>
                    <option value="admin">Admin - Admin users only</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.visibility === 'public' && 'Visible to all users including non-registered visitors'}
                    {formData.visibility === 'junior' && 'Visible to junior and admin users only'}
                    {formData.visibility === 'admin' && 'Visible to admin users only'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content</h2>
            
            {/* Simple Text Editor */}
            <div className="border border-gray-300 rounded-md">
              {/* Toolbar */}
              <div className="border-b border-gray-300 p-3 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const newText = textarea.value.substring(0, start) + `**${selectedText}**` + textarea.value.substring(end);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const newText = textarea.value.substring(0, start) + `*${selectedText}*` + textarea.value.substring(end);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + '\n## Heading\n' + textarea.value.substring(start);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + '\n- List item\n' + textarea.value.substring(start);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    List
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + '\n```\ncode block\n```\n' + textarea.value.substring(start);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    Code
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + '\n[Link Text](https://example.com)\n' + textarea.value.substring(start);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    Link
                  </button>
                </div>
              </div>
              
              {/* Content Area */}
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={20}
                className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 resize-none"
                placeholder="Write your blog content here... You can use Markdown formatting."
                required
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Markdown Tips:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>**bold text**</code> for <strong>bold text</strong></li>
                <li><code>*italic text*</code> for <em>italic text</em></li>
                <li><code>## Heading</code> for headings</li>
                <li><code>- item</code> for bullet points</li>
                <li><code>```code```</code> for code blocks</li>
                <li><code>[link text](url)</code> for links</li>
              </ul>
            </div>
          </div>

          {/* Preview */}
          {formData.content && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{formData.title}</h3>
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <span>By {user?.name}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    formData.visibility === 'public' ? 'bg-green-100 text-green-800' :
                    formData.visibility === 'junior' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1)}
                  </span>
                </div>
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">
                    {formData.content}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/blogs/${id}`)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={loading || !formData.title || !formData.content}
            >
              {loading ? 'Updating...' : 'Update Blog'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
