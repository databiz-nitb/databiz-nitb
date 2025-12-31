import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Shield, LogOut, LayoutDashboard, Plus, Trash2, FileText, Loader2, Edit, Calendar, Users, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getBlogs, deleteBlog } from "../../services/blog.service";
import { getEvents, deleteEvent } from "../../services/event.service";
import { getUsers, updateUserRole } from "../../services/user.service";
import { getQueries, updateQueryStatus } from "../../services/query.service";
import type { IBlog, IEvent, IUser } from "../../types";

interface IQuery {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: 'pending' | 'read' | 'responded';
  createdAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [adminBlogs, setAdminBlogs] = useState<IBlog[]>([]);
  const [adminEvents, setAdminEvents] = useState<IEvent[]>([]);
  const [adminUsers, setAdminUsers] = useState<IUser[]>([]);
  const [adminQueries, setAdminQueries] = useState<IQuery[]>([]);

  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingQueries, setIsLoadingQueries] = useState(false);

  const [activeTab, setActiveTab] = useState<'blogs' | 'events' | 'users' | 'queries'>('blogs');

  // Pagination for users
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [isMoreUsersLoading, setIsMoreUsersLoading] = useState(false);

  // Pagination for queries
  const [queryPage, setQueryPage] = useState(1);
  const [queryTotalPages, setQueryTotalPages] = useState(1);
  const [isMoreQueriesLoading, setIsMoreQueriesLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === 'admin') {
      loadBlogs();
      loadEvents();
      loadUsers(1);
      loadQueries(1);
    }
  }, [user, navigate]);

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const response = await getBlogs();
      setAdminBlogs(response.data);
    } catch (error) {
      console.error("Failed to load blogs", error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const loadEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const response = await getEvents();
      // Optionally sorting by date
      const sorted = response.data.sort((a: IEvent, b: IEvent) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
      setAdminEvents(sorted);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const loadUsers = async (page: number, append = false) => {
    if (!append) setIsLoadingUsers(true);
    else setIsMoreUsersLoading(true);

    try {
      const response = await getUsers(page, 10);
      const { users, pages } = response.data;

      if (append) {
        setAdminUsers(prev => [...prev, ...users]);
      } else {
        setAdminUsers(users);
      }
      setUserTotalPages(pages);
      setUserPage(page);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setIsLoadingUsers(false);
      setIsMoreUsersLoading(false);
    }
  };

  const handleLoadMoreUsers = () => {
    if (userPage < userTotalPages) {
      loadUsers(userPage + 1, true);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: IUser['role']) => {
    try {
      await updateUserRole(userId, newRole);
      setAdminUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to update user role", error);
      alert("Failed to update role");
    }
  };

  const loadQueries = async (page: number, append = false) => {
    if (!append) setIsLoadingQueries(true);
    else setIsMoreQueriesLoading(true);

    try {
      const response = await getQueries(page, 10);
      const { queries, pages } = response.data;

      if (append) {
        setAdminQueries(prev => [...prev, ...queries]);
      } else {
        setAdminQueries(queries);
      }
      setQueryTotalPages(pages);
      setQueryPage(page);
    } catch (error) {
      console.error("Failed to load queries", error);
    } finally {
      setIsLoadingQueries(false);
      setIsMoreQueriesLoading(false);
    }
  };

  const handleLoadMoreQueries = () => {
    if (queryPage < queryTotalPages) {
      loadQueries(queryPage + 1, true);
    }
  };

  const handleQueryStatusUpdate = async (queryId: string, newStatus: IQuery['status']) => {
    try {
      await updateQueryStatus(queryId, newStatus);
      setAdminQueries(prev => prev.map(q => q._id === queryId ? { ...q, status: newStatus } : q));
    } catch (error) {
      console.error("Failed to update query status", error);
      alert("Failed to update status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setAdminBlogs(prev => prev.filter(b => b._id !== id));
    } catch (error) {
      console.error("Failed to delete blog", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      setAdminEvents(prev => prev.filter(e => e._id !== id));
    } catch (error) {
      console.error("Failed to delete event", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  }

  if (!user) return null;

  return (
    <div className="min-h-screen mt-10 relative flex items-start justify-center bg-[#050505] font-sans pt-36 pb-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar / User Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white/[0.03] backdrop-blur-[32px] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-32 h-32 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400">
                    {getInitials(user.name)}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                {user.role === 'admin' ? 'Administrator' : 'Club Member'}
              </p>

              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <Mail size={16} />
                  </div>
                  <div className="text-left overflow-hidden w-full">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                    <p className="text-sm text-gray-200 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Shield size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Role</p>
                    <p className="text-sm text-gray-200 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-8 w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Content / Dashboard */}
        <div className="w-full lg:w-2/3">
          {user.role === 'admin' ? (
            <div className="space-y-6">
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="text-indigo-400" />
                    Admin Dashboard
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Manage content and view statistics</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate('/create-blog')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} />
                    Blog
                  </button>
                  <button
                    onClick={() => navigate('/create-event')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} />
                    Event
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/10">
                  <p className="text-gray-400 text-sm font-medium mb-2">Total Blogs</p>
                  <p className="text-3xl font-bold text-white">{adminBlogs.length}</p>
                </div>
                <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/10">
                  <p className="text-gray-400 text-sm font-medium mb-2">Total Events</p>
                  <p className="text-3xl font-bold text-white">{adminEvents.length}</p>
                </div>
                <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/10 hidden md:block">
                  <p className="text-gray-400 text-sm font-medium mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-white">{adminUsers.length > 0 ? adminUsers.length + '+' : '...'}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-white/10 px-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`pb-3 px-4 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'blogs' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  Manage Blogs
                  {activeTab === 'blogs' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-t-full"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`pb-3 px-4 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'events' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  Manage Events
                  {activeTab === 'events' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`pb-3 px-4 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'users' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  Manage Users
                  {activeTab === 'users' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-t-full"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('queries')}
                  className={`pb-3 px-4 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'queries' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  Contact Queries
                  {activeTab === 'queries' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>}
                </button>
              </div>

              {/* Content List */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 min-h-[400px]">
                {activeTab === 'blogs' && (
                  <>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <FileText size={20} className="text-indigo-400" />
                      Your Blogs
                    </h3>
                    {isLoadingBlogs ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-indigo-500" size={32} />
                      </div>
                    ) : adminBlogs.length > 0 ? (
                      <div className="space-y-3">
                        {adminBlogs.map((blog) => (
                          <div key={blog._id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-12 h-12 rounded-lg bg-gray-800 shrink-0 overflow-hidden">
                                {blog.image ? (
                                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">IMG</div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-white font-medium truncate pr-4 group-hover:text-indigo-300 transition-colors cursor-pointer" onClick={() => navigate(`/blogs/${blog._id}`)}>
                                  {blog.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                  <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => navigate(`/create-blog?edit=${blog._id}`)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                                title="Edit Blog"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => blog._id && handleDeleteBlog(blog._id)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                title="Delete Blog"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center">
                        <div className="p-4 rounded-full bg-white/5 mb-4">
                          <FileText className="text-gray-500" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No blogs found</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first blog post.</p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'events' && (
                  <>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Calendar size={20} className="text-blue-400" />
                      Your Events
                    </h3>
                    {isLoadingEvents ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                      </div>
                    ) : adminEvents.length > 0 ? (
                      <div className="space-y-3">
                        {adminEvents.map((event) => (
                          <div key={event._id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-12 h-12 rounded-lg bg-gray-800 shrink-0 overflow-hidden">
                                {event.ImageUrl ? (
                                  <img src={event.ImageUrl} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">IMG</div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-white font-medium truncate pr-4 group-hover:text-blue-300 transition-colors cursor-pointer" onClick={() => navigate(`/events/${event._id}`)}>
                                  {event.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                  <span>{new Date(event.startsAt).toLocaleDateString()}</span>
                                  <span className={`px-2 py-0.5 rounded-full ${event.status === 'Open' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {event.status || 'Open'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => navigate(`/create-event?edit=${event._id}`)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                                title="Edit Event"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => event._id && handleDeleteEvent(event._id)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                title="Delete Event"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center">
                        <div className="p-4 rounded-full bg-white/5 mb-4">
                          <Calendar className="text-gray-500" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first event to get started.</p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'users' && (
                  <>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Users size={20} className="text-green-400" />
                      Manage Users
                    </h3>
                    {isLoadingUsers ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-green-500" size={32} />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-xs uppercase bg-white/5 text-gray-300">
                              <tr>
                                <th className="px-6 py-3 rounded-l-xl">User</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3 rounded-r-xl">Joined</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {adminUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                        {getInitials(u.name)}
                                      </div>
                                      <div>
                                        <div className="text-white font-medium">{u.name}</div>
                                        <div className="text-xs">{u.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="relative group/role">
                                      <select
                                        value={u.role}
                                        onChange={(e) => u._id && handleRoleUpdate(u._id, e.target.value as IUser['role'])}
                                        className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none pr-8"
                                      >
                                        <option value="public">Public</option>
                                        <option value="junior">Junior</option>
                                        <option value="admin">Admin</option>
                                      </select>
                                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {new Date().toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {userPage < userTotalPages && (
                          <div className="flex justify-center pt-4">
                            <button
                              onClick={handleLoadMoreUsers}
                              disabled={isMoreUsersLoading}
                              className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                              {isMoreUsersLoading ? (
                                <>
                                  <Loader2 size={16} className="animate-spin" />
                                  Loading...
                                </>
                              ) : (
                                "Load More Users"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Queries Tab */}
                {activeTab === 'queries' && (
                  <>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Mail size={20} className="text-yellow-400" />
                      Contact Queries
                    </h3>
                    {isLoadingQueries ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-yellow-500" size={32} />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-xs uppercase bg-white/5 text-gray-300">
                              <tr>
                                <th className="px-6 py-3 rounded-l-xl">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Message</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 rounded-r-xl">Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {adminQueries.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No queries found
                                  </td>
                                </tr>
                              ) : (
                                adminQueries.map((query) => (
                                  <tr key={query._id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                      <div className="text-white font-medium">
                                        {query.firstName} {query.lastName}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="text-xs">{query.email}</div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                      <div className="text-xs whitespace-pre-wrap break-words">
                                        {query.message}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="relative group/status">
                                        <select
                                          value={query.status}
                                          onChange={(e) => handleQueryStatusUpdate(query._id, e.target.value as IQuery['status'])}
                                          className={`border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-yellow-500 cursor-pointer appearance-none pr-8 ${query.status === 'pending' ? 'bg-red-600/50' :
                                            query.status === 'read' ? 'bg-yellow-600/50' : 'bg-green-600/50'
                                            }`}
                                        >
                                          <option value="pending">Pending</option>
                                          <option value="read">Read</option>
                                          <option value="responded">Responded</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="text-xs">
                                        {new Date(query.createdAt).toLocaleDateString()}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        {queryPage < queryTotalPages && (
                          <div className="flex justify-center pt-4">
                            <button
                              onClick={handleLoadMoreQueries}
                              disabled={isMoreQueriesLoading}
                              className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                              {isMoreQueriesLoading ? (
                                <>
                                  <Loader2 size={16} className="animate-spin" />
                                  Loading...
                                </>
                              ) : (
                                "Load More Queries"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            // Non-Admin View
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/welcome-3688626-3231457.png" alt="Welcome" className="w-64 h-auto relative z-10 opacity-80" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Welcome to DataBiz!</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Explore resources, attend events, and connect with other data enthuasiasts. Your journey starts here.
              </p>
              <div className="flex gap-4">
                <Link to="/events" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all">
                  Browse Events
                </Link>
                <Link to="/blogs" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg hover:shadow-indigo-500/25">
                  Read Blogs
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
