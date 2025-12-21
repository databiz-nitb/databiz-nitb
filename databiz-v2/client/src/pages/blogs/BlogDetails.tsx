import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById } from '../../utils/blogData';

const BlogDetail: React.FC = () => {
  // Explicitly typing the param 'id' as a string
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // getBlogById should ideally return BlogPost | undefined
  const blog = id ? getBlogById(id) : undefined;

  // Handle blog not found
  if (!blog) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl text-gray-400 mb-8">Blog not found</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-32 md:pt-40">
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="absolute top-6 left-4 md:left-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">Back to Blogs</span>
        </button>

        {/* Category Badge */}
        <div className="absolute top-6 right-4 md:right-8 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-xs font-semibold">
          {blog.tags && blog.tags.length > 0 ? blog.tags.join(', ') : 'Article'}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-12 -mt-24 relative z-10">
        <article className="max-w-4xl mx-auto">
          {/* Title and Meta */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-10 rounded-t-3xl border border-gray-800">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  {blog.author.name.charAt(0)}
                </div>
                <span className="font-medium text-white">{blog.author.name}</span>
              </div>
              <span>•</span>
              <span>
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-white text-black p-6 md:p-10 rounded-b-3xl shadow-2xl">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* Navigation Footer */}
          <div className="mt-12 mb-20 flex justify-center">
            <Link
              to="/blogs"
              className="group flex items-center gap-2 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span>View All Blogs</span>
            </Link>
          </div>
        </article>
      </div>

      {/* In standard TSX with Vite/CRA, we use a string in the style tag or global CSS */}
      <style>{`
                .prose h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #000;
                }
                .prose p {
                    margin-bottom: 1rem;
                    color: #374151;
                }
                .prose ul {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                    list-style-type: disc;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                    color: #374151;
                }
                .prose strong {
                    font-weight: 600;
                    color: #000;
                }
            `}</style>
    </div>
  );
};

export default BlogDetail;