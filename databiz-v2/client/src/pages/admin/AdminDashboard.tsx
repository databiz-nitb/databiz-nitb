import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import { getPathways } from "../../services/pathway.service";
import { getBlogs } from "../../services/blog.service";
import { getResources } from "../../services/resource.service";
import type { IPathway, IBlog } from "../../types";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pathways: 0,
    blogs: 0,
    resources: 0,
    users: 0
  });
  const [recentPathways, setRecentPathways] = useState<IPathway[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [pathwaysRes, blogsRes, resourcesRes] = await Promise.all([
        getPathways(),
        getBlogs(),
        getResources()
      ]);

      setStats({
        pathways: pathwaysRes.data.length,
        blogs: blogsRes.data.length,
        resources: resourcesRes.data.length,
        users: 0 // TODO: Add users API call when available
      });

      // Get recent items (last 3)
      setRecentPathways(pathwaysRes.data.slice(0, 3));
      setRecentBlogs(blogsRes.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600 animate-pulse-subtle">Loading dashboard...</div>
        <div className="ml-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-left">Admin Dashboard</h1>
        <p className="text-gray-600 animate-fade-in-left" style={{animationDelay: '0.2s'}}>Welcome back, {user?.name}! Manage your platform content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-stagger-1">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 animate-bounce-subtle">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pathways</p>
              <p className="text-2xl font-semibold text-gray-900 animate-scale-in" style={{animationDelay: '0.3s'}}>{stats.pathways}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-stagger-2">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 animate-bounce-subtle" style={{animationDelay: '0.5s'}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl font-semibold text-gray-900 animate-scale-in" style={{animationDelay: '0.5s'}}>{stats.resources}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-stagger-3">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 animate-bounce-subtle" style={{animationDelay: '1s'}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blogs</p>
              <p className="text-2xl font-semibold text-gray-900 animate-scale-in" style={{animationDelay: '0.7s'}}>{stats.blogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-stagger-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 animate-bounce-subtle" style={{animationDelay: '1.5s'}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Users</p>
              <p className="text-2xl font-semibold text-gray-900 animate-scale-in" style={{animationDelay: '0.9s'}}>{stats.users}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slide-in-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fade-in-up text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/pathways/create">
            <Button className="w-full btn-interactive hover-lift animate-stagger-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div className="text-center">
                <div className="font-bold">Create New</div>
                <div className="text-sm opacity-90">Pathway</div>
              </div>
            </Button>
          </Link>
          <Link to="/admin/blogs/create">
            <Button className="w-full btn-interactive hover-lift animate-stagger-2 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <div className="text-center">
                <div className="font-bold">Create New</div>
                <div className="text-sm opacity-90">Blog</div>
              </div>
            </Button>
          </Link>
          <Link to="/admin/events/create">
            <Button className="w-full btn-interactive hover-lift animate-stagger-3 bg-green-600 hover:bg-green-700 text-white py-4 px-6 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-center">
                <div className="font-bold">Create New</div>
                <div className="text-sm opacity-90">Event</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Pathways */}
        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-slide-in-left">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 animate-fade-in-up">Recent Pathways</h2>
            <Link to="/pathways">
              <Button className="btn-interactive hover-lift text-xs px-3 py-1">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentPathways.length > 0 ? (
              recentPathways.map((pathway, index) => (
                <div key={pathway._id} className={`border-l-4 border-blue-500 pl-4 hover-lift animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                  <h3 className="font-medium text-gray-900">{pathway.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{pathway.description}</p>
                  <span className="text-xs text-gray-500">{pathway.category}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No pathways created yet.</p>
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-slide-in-right">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 animate-fade-in-up">Recent Blogs</h2>
            <Link to="/blogs">
              <Button className="btn-interactive hover-lift text-xs px-3 py-1">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog, index) => (
                <div key={blog._id} className={`border-l-4 border-purple-500 pl-4 hover-lift animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                  <h3 className="font-medium text-gray-900">{blog.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{blog.content}</p>
                  {blog.createdAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No blogs created yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
