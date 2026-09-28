import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock3, Newspaper } from 'lucide-react';
import { getBlogs } from '../../services/blog.service';
import type { IBlog } from '../../types';
import SEO from '../../components/SEO/SEO';
import quantumBlogImage from '../../assets/images/9.png';

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

  const getAuthorName = (blog: IBlog) => {
    if (typeof blog.author === 'object' && blog.author) return blog.author.name || 'Team DataBiz';
    return 'Team DataBiz';
  };

  const getBlogDate = (blog: IBlog) =>
    (blog as IBlog & { publishedAt?: string }).publishedAt || blog.createdAt;

  const getPlainText = (content: string) =>
    content
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim();

  const getExcerpt = (content: string) => {
    const text = getPlainText(content);
    return text.length > 190 ? `${text.slice(0, 187).trimEnd()}...` : text;
  };

  const getReadingTime = (content: string) =>
    Math.max(1, Math.ceil(getPlainText(content).split(' ').filter(Boolean).length / 220));

  const formatBlogDate = (blog: IBlog) => {
    const publishedAt = getBlogDate(blog);
    if (!publishedAt) return 'Date unavailable';
    const date = new Date(publishedAt);
    return Number.isNaN(date.getTime())
      ? 'Date unavailable'
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
      <>
        <SEO title="Blogs" description="Tech blogs and articles by DataBiz. Data science, programming and community updates." path="/blogs" />
        <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-28 md:pt-36">
        <div className="text-center max-w-2xl">
          <Newspaper size={44} aria-hidden="true" className="mx-auto mb-6 text-sky-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">No Blogs Available</h1>
          <p className="text-lg text-gray-400 mb-8">
            We're working on creating amazing content for you. Check back soon!
          </p>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Blogs - Tech Articles & Updates | DataBiz"
        description="Read tech blogs, data science articles and community updates from DataBiz. NIT Bhopal student-led content."
        path="/blogs"
        keywords="DataBiz blogs, tech articles, data science blog, NIT Bhopal"
      />
      <div className="min-h-screen bg-[#080c11] font-sans text-white">
      {/* Header Section */}
      <header className="border-b border-white/10 bg-[#0d141c] pb-12 pt-36 md:pb-14 md:pt-40">
        <div className="container relative z-10 mx-auto px-4 md:px-12">
          <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">DataBiz / Journal</p>
          <h1 className="mb-4 text-4xl font-semibold text-white md:text-5xl">
            Our Blog
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Insights, tutorials, and stories from the world of data science and analytics
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
            <span className="h-px w-8 bg-sky-300/70" aria-hidden="true" />
            {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
          </div>
        </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="container mx-auto px-4 py-10 md:px-12 md:py-14">
        <div className={`${blogs.length === 1 ? 'mx-auto max-w-6xl' : 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3'}`}>
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className={`group overflow-hidden rounded-xl border border-white/10 bg-[#101820] transition-colors duration-300 hover:border-sky-300/30 ${blogs.length === 1 ? 'grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr]' : 'flex h-full flex-col'}`}
            >
              {/* Blog Image */}
              <div className={`relative overflow-hidden ${blogs.length === 1 ? 'h-64 sm:h-80 lg:h-full lg:min-h-[440px]' : 'h-48 md:h-56'}`}>
                <img
                  src={blog.image || (/quantum/i.test(blog.title) ? quantumBlogImage : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop")}
                  alt={blog.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10"></div>

                {/* Category Badge */}
                <div className="absolute left-4 top-4 rounded-md border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {blog.tags && blog.tags[0] ? blog.tags[0] : 'Article'}
                </div>
              </div>

              {/* Blog Content */}
              <div className={`flex min-w-0 flex-col ${blogs.length === 1 ? 'justify-center p-6 sm:p-8 lg:p-10' : 'flex-1 p-5 sm:p-6'}`}>
                {/* Meta Info */}
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} aria-hidden="true" className="text-sky-300" />
                    <time dateTime={getBlogDate(blog)}>{formatBlogDate(blog)}</time>
                  </span>
                  <span aria-hidden="true" className="text-slate-600">/</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" className="text-sky-300" />{getReadingTime(blog.content)} min read</span>
                </div>

                {/* Title */}
                <h2 className={`mb-3 font-semibold leading-tight text-white transition-colors group-hover:text-sky-200 ${blogs.length === 1 ? 'text-2xl sm:text-3xl lg:text-4xl' : 'line-clamp-2 text-xl md:text-2xl'}`}>
                  <Link to={`/blogs/${blog._id}`} className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                    {blog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className={`mb-6 text-sm leading-7 text-slate-400 ${blogs.length === 1 ? 'max-w-2xl sm:text-base' : 'line-clamp-3'}`}>
                  {getExcerpt(blog.content)}
                </p>

                {/* Author & CTA */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <div className="flex min-w-0 items-center gap-3 text-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-xs font-semibold text-sky-200">
                      {getAuthorName(blog).charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate text-slate-300">{getAuthorName(blog)}</span>
                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    Read article <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
    </>
  );
};

export default BlogsPage;