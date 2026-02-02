import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById } from '../../services/blog.service';
import type { IBlog, IUser } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Edit, ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import SEO from '../../components/SEO/SEO';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog", err);
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const getAuthorName = () => {
    if (!blog?.author) return 'DataBiz';
    return typeof blog.author === 'string' ? blog.author : (blog.author as IUser).name;
  };

  const getMetaDescription = () => {
    if (!blog?.content) return 'Read this article on DataBiz.';
    const text = blog.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.slice(0, 160) + (text.length > 160 ? '...' : '');
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-gray-400">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">404</h1>
          <p className="text-2xl text-gray-400 mb-8">Blog not found</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={getMetaDescription()}
        path={`/blogs/${id}`}
        image={blog.image || undefined}
        imageAlt={blog.title}
        type="article"
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
        author={getAuthorName()}
        keywords={blog.tags?.join(', ') || 'DataBiz, tech blog'}
      />
      <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={blog.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

        {/* Floating Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="absolute top-32 md:top-36 left-4 md:left-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-10 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-medium">Back to Blogs</span>
        </button>

        {/* Admin Edit Button */}
        {user?.role === 'admin' && (
          <Link
            to={`/create-blog?edit=${blog._id}`}
            className="absolute top-32 md:top-36 right-4 md:right-8 flex items-center gap-2 bg-yellow-500/90 backdrop-blur-md px-4 py-2.5 rounded-full text-white hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 z-10 font-medium"
          >
            <Edit size={18} />
            <span className="hidden sm:inline">Edit Blog</span>
          </Link>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-8 left-4 md:left-8 flex gap-2 z-10">
          {blog.tags && blog.tags.length > 0 && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              {blog.tags[0]}
            </div>
          )}
        </div>
      </div>

      {/* Content Section with Overlap */}
      <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10 pb-20">
        <article className="max-w-5xl mx-auto">
          {/* Title and Meta Card */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 md:p-12 rounded-t-3xl border border-gray-800 shadow-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              {blog.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-800">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {getAuthorName().charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm text-gray-400">Written by</div>
                  <div className="font-semibold text-white">{getAuthorName()}</div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={18} className="text-blue-400" />
                <span className="text-sm">
                  {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={18} className="text-purple-400" />
                <span className="text-sm">5 min read</span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <Tag size={16} className="text-gray-500" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="bg-white text-black p-8 md:p-12 lg:p-16 rounded-b-3xl shadow-2xl">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* Navigation Footer */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/blogs"
              className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full text-white hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">View All Blogs</span>
            </Link>
          </div>
        </article>
      </div>

      {/* Enhanced Prose Styles */}
      <style>{`
        .prose h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          color: #000;
          line-height: 1.2;
        }
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #111;
        }
        .prose p {
          margin-bottom: 1.25rem;
          color: #374151;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: #374151;
          line-height: 1.7;
        }
        .prose strong {
          font-weight: 600;
          color: #000;
        }
        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
        }
        .prose code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #dc2626;
        }
        .prose pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose img {
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
      `}</style>
    </div>
    </>
  );
};

export default BlogDetail;