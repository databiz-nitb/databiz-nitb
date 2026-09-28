import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Shield, LogOut, LayoutDashboard, Plus, Trash2, FileText, Loader2, Edit, Calendar, Users, ChevronDown, Search, ArrowDownUp, AlertCircle, RefreshCw, Activity, MessageSquare, ArrowRight } from "lucide-react";
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

type AdminTab = 'overview' | 'blogs' | 'events' | 'users' | 'queries';
type SortOrder = 'newest' | 'oldest';

interface ActivityItem {
  id: string;
  category: 'Blog' | 'Event' | 'Member' | 'Query';
  title: string;
  detail: string;
  date: string;
  tab: Exclude<AdminTab, 'overview'>;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [adminBlogs, setAdminBlogs] = useState<IBlog[]>([]);
  const [adminEvents, setAdminEvents] = useState<IEvent[]>([]);
  const [adminUsers, setAdminUsers] = useState<IUser[]>([]);
  const [adminQueries, setAdminQueries] = useState<IQuery[]>([]);
  const [adminUserTotal, setAdminUserTotal] = useState(0);
  const [adminQueryTotal, setAdminQueryTotal] = useState(0);

  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingQueries, setIsLoadingQueries] = useState(false);
  const [loadErrors, setLoadErrors] = useState<Partial<Record<AdminTab, string>>>({});

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [queryStatusFilter, setQueryStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

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
    setLoadErrors(prev => ({ ...prev, blogs: undefined }));
    try {
      const response = await getBlogs();
      setAdminBlogs(response.data);
    } catch (error) {
      console.error("Failed to load blogs", error);
      setLoadErrors(prev => ({ ...prev, blogs: "Blogs couldn't be loaded. Try again." }));
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const loadEvents = async () => {
    setIsLoadingEvents(true);
    setLoadErrors(prev => ({ ...prev, events: undefined }));
    try {
      const response = await getEvents();
      // Optionally sorting by date
      const sorted = response.data.sort((a: IEvent, b: IEvent) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
      setAdminEvents(sorted);
    } catch (error) {
      console.error("Failed to load events", error);
      setLoadErrors(prev => ({ ...prev, events: "Events couldn't be loaded. Try again." }));
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const loadUsers = async (page: number, append = false) => {
    if (!append) setIsLoadingUsers(true);
    else setIsMoreUsersLoading(true);
    setLoadErrors(prev => ({ ...prev, users: undefined }));

    try {
      const response = await getUsers(page, 10);
      const { users, pages, total } = response.data;

      if (append) {
        setAdminUsers(prev => [...prev, ...users]);
      } else {
        setAdminUsers(users);
      }
      setAdminUserTotal(total);
      setUserTotalPages(pages);
      setUserPage(page);
    } catch (error) {
      console.error("Failed to load users", error);
      setLoadErrors(prev => ({ ...prev, users: "Users couldn't be loaded. Try again." }));
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
    setLoadErrors(prev => ({ ...prev, queries: undefined }));

    try {
      const response = await getQueries(page, 10);
      const { queries, pages, total } = response.data;

      if (append) {
        setAdminQueries(prev => [...prev, ...queries]);
      } else {
        setAdminQueries(queries);
      }
      setAdminQueryTotal(total);
      setQueryTotalPages(pages);
      setQueryPage(page);
    } catch (error) {
      console.error("Failed to load queries", error);
      setLoadErrors(prev => ({ ...prev, queries: "Contact queries couldn't be loaded. Try again." }));
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

  const getTimestamp = (value?: string) => {
    const timestamp = value ? new Date(value).getTime() : 0;
    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const ordered = <T,>(items: T[], getDate: (item: T) => string | undefined) =>
    [...items].sort((first, second) => {
      const difference = getTimestamp(getDate(first)) - getTimestamp(getDate(second));
      return sortOrder === 'newest' ? -difference : difference;
    });

  const visibleBlogs = ordered(
    adminBlogs.filter(blog => blog.title.toLowerCase().includes(normalizedSearch)),
    blog => blog.updatedAt || blog.createdAt,
  );
  const visibleEvents = ordered(
    adminEvents.filter(event => event.title.toLowerCase().includes(normalizedSearch)),
    event => event.startsAt,
  );
  const visibleUsers = ordered(
    adminUsers.filter(candidate => {
      const matchesSearch = `${candidate.name} ${candidate.email}`.toLowerCase().includes(normalizedSearch);
      return matchesSearch && (userRoleFilter === 'all' || candidate.role === userRoleFilter);
    }),
    candidate => (candidate as IUser & { createdAt?: string }).createdAt,
  );
  const visibleQueries = ordered(
    adminQueries.filter(query => {
      const matchesSearch = `${query.firstName} ${query.lastName} ${query.email} ${query.message}`.toLowerCase().includes(normalizedSearch);
      return matchesSearch && (queryStatusFilter === 'all' || query.status === queryStatusFilter);
    }),
    query => query.createdAt,
  );
  const upcomingEvents = [...adminEvents]
    .filter(event => getTimestamp(event.startsAt) >= Date.now())
    .sort((first, second) => getTimestamp(first.startsAt) - getTimestamp(second.startsAt))
    .slice(0, 4);
  const pendingQueries = adminQueries.filter(query => query.status === 'pending');
  const roleSummary = (['admin', 'junior', 'public'] as const).map(role => ({
    role,
    count: adminUsers.filter(candidate => candidate.role === role).length,
  }));
  const maxInventoryCount = Math.max(adminBlogs.length, adminEvents.length, 1);
  const activityMonths = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date();
    monthDate.setDate(1);
    monthDate.setMonth(monthDate.getMonth() - (11 - index));
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const isInMonth = (value?: string) => {
      if (!value) return false;
      const date = new Date(value);
      return Number.isFinite(date.getTime()) && date.getFullYear() === year && date.getMonth() === month;
    };

    return {
      label: monthDate.toLocaleDateString(undefined, { month: 'short' }),
      year,
      blogs: adminBlogs.filter(blog => isInMonth((blog as IBlog & { publishedAt?: string }).publishedAt || blog.createdAt)).length,
      events: adminEvents.filter(event => isInMonth((event as IEvent & { createdAt?: string }).createdAt)).length,
    };
  });
  const maxMonthlyCount = Math.max(...activityMonths.map(month => Math.max(month.blogs, month.events)), 1);
  const activityChartDescription = `Content activity in the last twelve months: ${activityMonths
    .map(month => `${month.label} ${month.year}, ${month.blogs} blog posts, ${month.events} events`)
    .join('; ')}.`;
  const recentActivity: ActivityItem[] = [
    ...adminBlogs.map(blog => ({
      id: `blog-${blog._id}`,
      category: 'Blog' as const,
      title: blog.title,
      detail: 'Article published',
      date: (blog as IBlog & { publishedAt?: string }).publishedAt || blog.createdAt || '',
      tab: 'blogs' as const,
    })),
    ...adminEvents.map(event => ({
      id: `event-${event._id}`,
      category: 'Event' as const,
      title: event.title,
      detail: 'Event added',
      date: (event as IEvent & { createdAt?: string }).createdAt || '',
      tab: 'events' as const,
    })),
    ...adminUsers.map(candidate => ({
      id: `member-${candidate._id}`,
      category: 'Member' as const,
      title: candidate.name,
      detail: `Joined as ${candidate.role}`,
      date: (candidate as IUser & { createdAt?: string }).createdAt || '',
      tab: 'users' as const,
    })),
    ...adminQueries.map(query => ({
      id: `query-${query._id}`,
      category: 'Query' as const,
      title: `${query.firstName} ${query.lastName}`,
      detail: 'Contact request received',
      date: query.createdAt,
      tab: 'queries' as const,
    })),
  ]
    .filter(item => getTimestamp(item.date) > 0)
    .sort((first, second) => getTimestamp(second.date) - getTimestamp(first.date))
    .slice(0, 6);

  const getVisibleCount = () => {
    if (activeTab === 'blogs') return [visibleBlogs.length, adminBlogs.length];
    if (activeTab === 'events') return [visibleEvents.length, adminEvents.length];
    if (activeTab === 'users') return [visibleUsers.length, adminUsers.length];
    return [visibleQueries.length, adminQueries.length];
  };

  const summaryCards = [
    {
      label: 'Registered members',
      value: isLoadingUsers ? '…' : loadErrors.users ? 'Unavailable' : adminUserTotal,
      detail: 'Across all pages',
      icon: Users,
      tone: 'text-sky-300 bg-sky-300/10',
    },
    {
      label: 'Blog articles',
      value: isLoadingBlogs ? '…' : loadErrors.blogs ? 'Unavailable' : adminBlogs.length,
      detail: 'Managed publications',
      icon: FileText,
      tone: 'text-emerald-300 bg-emerald-300/10',
    },
    {
      label: 'Upcoming events',
      value: isLoadingEvents ? '…' : loadErrors.events ? 'Unavailable' : upcomingEvents.length,
      detail: `${adminEvents.length} total events`,
      icon: Calendar,
      tone: 'text-amber-200 bg-amber-200/10',
    },
    {
      label: 'Contact requests',
      value: isLoadingQueries ? '…' : loadErrors.queries ? 'Unavailable' : adminQueryTotal,
      detail: `${pendingQueries.length} pending in latest ${adminQueries.length} loaded`,
      icon: Mail,
      tone: 'text-rose-200 bg-rose-200/10',
    },
  ];

  const renderLoadError = (message: string, retry: () => void) => (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-5 py-8 text-center">
      <AlertCircle size={22} className="text-rose-300" />
      <p className="text-sm text-slate-300">{message}</p>
      <button onClick={retry} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400">
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#080c11] px-4 pb-8 pt-28 font-sans text-slate-100 sm:px-6 md:pt-36 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

        {/* Left Sidebar / User Card */}
        <aside className="w-full lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10161e] p-5 shadow-xl sm:p-6">

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-sky-300/30 bg-sky-300/10">
                  <div className="text-3xl font-semibold text-sky-200">
                    {getInitials(user.name)}
                  </div>
                </div>
              </div>

              <h1 className="break-words text-xl font-semibold text-white">{user.name}</h1>
              <p className="mb-5 mt-1 flex items-center gap-2 text-sm text-slate-400">
                <span className={`h-2 w-2 rounded-full ${user.role === 'admin' ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                {user.role === 'admin' ? 'Administrator' : 'Club Member'}
              </p>

              <div className="w-full space-y-3 text-left">
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-3">
                  <div className="rounded-lg bg-sky-300/10 p-2 text-sky-200">
                    <Mail size={16} />
                  </div>
                  <div className="text-left overflow-hidden w-full">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Email</p>
                    <p className="truncate text-sm text-slate-200">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-3">
                  <div className="rounded-lg bg-emerald-300/10 p-2 text-emerald-200">
                    <Shield size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Role</p>
                    <p className="text-sm capitalize text-slate-200">{user.role}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] py-2.5 font-semibold text-rose-200 transition hover:bg-rose-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content / Dashboard */}
        <section className="min-w-0">
          {user.role === 'admin' ? (
            <div className="space-y-5">
              {/* Dashboard Header */}
              <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-[#10161e] p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-300">DataBiz / Administration</p>
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <LayoutDashboard className="text-sky-300" aria-hidden="true" />
                    Admin Dashboard
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">Manage platform content, members, and incoming queries.</p>
                </div>
                <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                  <button
                    onClick={() => navigate('/create-blog')}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:flex-none"
                  >
                    <Plus size={16} />
                    Blog
                  </button>
                  <button
                    onClick={() => navigate('/create-event')}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:flex-none"
                  >
                    <Plus size={16} />
                    Event
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {summaryCards.map(({ label, value, detail, icon: Icon, tone }) => (
                  <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-[#10161e] p-4 sm:p-5">
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-400">{label}</p>
                      <span className={`rounded-lg p-2 ${tone}`}><Icon size={17} aria-hidden="true" /></span>
                    </div>
                    <p className="break-words text-2xl font-semibold tabular-nums text-white sm:text-3xl">{value}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div role="tablist" aria-label="Admin sections" className="flex gap-1 overflow-x-auto border-b border-white/10">
                <button
                  role="tab"
                  aria-selected={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                  className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${activeTab === 'overview' ? 'border-sky-300 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                  Overview
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'blogs'}
                  onClick={() => setActiveTab('blogs')}
                  className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${activeTab === 'blogs' ? 'border-sky-300 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                  Blogs <span className="ml-1 text-xs text-slate-500">{adminBlogs.length}</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'events'}
                  onClick={() => setActiveTab('events')}
                  className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${activeTab === 'events' ? 'border-sky-300 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                  Events <span className="ml-1 text-xs text-slate-500">{adminEvents.length}</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'users'}
                  onClick={() => setActiveTab('users')}
                  className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${activeTab === 'users' ? 'border-sky-300 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                  Users <span className="ml-1 text-xs text-slate-500">{adminUsers.length}</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'queries'}
                  onClick={() => setActiveTab('queries')}
                  className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${activeTab === 'queries' ? 'border-sky-300 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                  Queries <span className="ml-1 text-xs text-slate-500">{adminQueries.length}</span>
                </button>
              </div>

              {activeTab !== 'overview' && <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#10161e] p-3 sm:flex-row sm:items-center sm:p-4">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Search the current admin section</span>
                  <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder={`Search ${activeTab}...`}
                    className="min-h-11 w-full rounded-lg border border-white/10 bg-[#080c11] pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/20"
                  />
                </label>
                {activeTab === 'users' && (
                  <label className="flex min-w-36 items-center gap-2">
                    <span className="sr-only">Filter users by role</span>
                    <select value={userRoleFilter} onChange={event => setUserRoleFilter(event.target.value)} className="min-h-11 w-full rounded-lg border border-white/10 bg-[#080c11] px-3 text-sm text-slate-200 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/20">
                      <option value="all">All roles</option>
                      <option value="admin">Admin</option>
                      <option value="junior">Junior</option>
                      <option value="public">Public</option>
                    </select>
                  </label>
                )}
                {activeTab === 'queries' && (
                  <label className="flex min-w-40 items-center gap-2">
                    <span className="sr-only">Filter queries by status</span>
                    <select value={queryStatusFilter} onChange={event => setQueryStatusFilter(event.target.value)} className="min-h-11 w-full rounded-lg border border-white/10 bg-[#080c11] px-3 text-sm text-slate-200 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/20">
                      <option value="all">All statuses</option>
                      <option value="pending">Pending</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                    </select>
                  </label>
                )}
                <label className="flex min-w-40 items-center gap-2">
                  <ArrowDownUp size={16} aria-hidden="true" className="ml-1 shrink-0 text-slate-500" />
                  <span className="sr-only">Sort by date</span>
                  <select value={sortOrder} onChange={event => setSortOrder(event.target.value as SortOrder)} className="min-h-11 w-full rounded-lg border border-white/10 bg-[#080c11] px-3 text-sm text-slate-200 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-300/20">
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </label>
                <p className="shrink-0 px-1 text-xs tabular-nums text-slate-500" aria-live="polite">
                  {getVisibleCount()[0]} / {getVisibleCount()[1]} loaded
                </p>
              </div>}

              {/* Content List */}
              <div role="tabpanel" className="min-h-[400px] rounded-2xl border border-white/10 bg-[#10161e] p-4 sm:p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="inventory-heading">
                        <div className="mb-5 flex items-start justify-between gap-3">
                          <div>
                            <h3 id="inventory-heading" className="font-semibold text-white">Content inventory</h3>
                            <p className="mt-1 text-xs text-slate-500">Published material currently managed</p>
                          </div>
                          <Activity size={18} className="text-sky-300" aria-hidden="true" />
                        </div>
                        <div className="space-y-5">
                          {[
                            { label: 'Blog articles', count: adminBlogs.length, color: 'bg-sky-300' },
                            { label: 'Events', count: adminEvents.length, color: 'bg-emerald-300' },
                          ].map(item => (
                            <div key={item.label}>
                              <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="text-slate-300">{item.label}</span>
                                <span className="font-medium tabular-nums text-white">{item.count}</span>
                              </div>
                              <div
                                role="progressbar"
                                aria-label={`${item.label}: ${item.count}`}
                                aria-valuemin={0}
                                aria-valuemax={maxInventoryCount}
                                aria-valuenow={item.count}
                                className="h-2 overflow-hidden rounded-full bg-white/[0.07]"
                              >
                                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / maxInventoryCount) * 100}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                          <button onClick={() => setActiveTab('blogs')} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm text-sky-200 transition hover:bg-sky-200/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                            Manage blogs <ArrowRight size={14} />
                          </button>
                          <button onClick={() => setActiveTab('events')} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm text-emerald-200 transition hover:bg-emerald-200/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                            Manage events <ArrowRight size={14} />
                          </button>
                        </div>
                      </section>

                      <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="members-heading">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <h3 id="members-heading" className="font-semibold text-white">Member roles</h3>
                            <p className="mt-1 text-xs text-slate-500">Breakdown of the loaded user page</p>
                          </div>
                          <Users size={18} className="text-sky-300" aria-hidden="true" />
                        </div>
                        {isLoadingUsers ? (
                          <div className="flex h-28 items-center justify-center"><Loader2 className="animate-spin text-sky-300" size={24} /></div>
                        ) : loadErrors.users ? (
                          <p role="alert" className="py-6 text-sm text-rose-200">{loadErrors.users}</p>
                        ) : adminUsers.length === 0 ? (
                          <p className="py-6 text-sm text-slate-500">No member data is available.</p>
                        ) : (
                          <div className="space-y-4">
                            {roleSummary.map(item => (
                              <div key={item.role}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                  <span className="capitalize text-slate-300">{item.role}</span>
                                  <span className="tabular-nums text-white">{item.count}</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                                  <div className="h-full rounded-full bg-sky-300" style={{ width: `${(item.count / Math.max(adminUsers.length, 1)) * 100}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <button onClick={() => setActiveTab('users')} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm text-sky-200 transition hover:bg-sky-200/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                          Review members <ArrowRight size={14} />
                        </button>
                      </section>
                    </div>

                    <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="activity-chart-heading">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 id="activity-chart-heading" className="font-semibold text-white">Content activity</h3>
                          <p className="mt-1 text-xs text-slate-500">Blog posts published and events added over the last twelve months</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-sky-300" />Blog posts</span>
                          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-300" />Events</span>
                        </div>
                      </div>
                      <div role="img" aria-label={activityChartDescription} className="mt-5 overflow-x-auto">
                        <div aria-hidden="true" className="grid min-w-[560px] grid-cols-12 gap-2 border-b border-white/10 px-1">
                          {activityMonths.map(month => (
                            <div key={`${month.year}-${month.label}`} className="flex min-w-0 flex-col items-center justify-end">
                              <div className="flex h-36 w-full items-end justify-center gap-1 sm:h-44">
                                <div
                                  title={`${month.blogs} blog posts`}
                                  className="w-3 rounded-t bg-sky-300/90 transition-[height] duration-300 sm:w-4"
                                  style={{ height: `${(month.blogs / maxMonthlyCount) * 100}%` }}
                                />
                                <div
                                  title={`${month.events} events added`}
                                  className="w-3 rounded-t bg-emerald-300/90 transition-[height] duration-300 sm:w-4"
                                  style={{ height: `${(month.events / maxMonthlyCount) * 100}%` }}
                                />
                              </div>
                              <span className="min-h-8 pt-2 text-center text-[11px] text-slate-500">{month.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="queries-heading">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <h3 id="queries-heading" className="font-semibold text-white">Needs attention</h3>
                            <p className="mt-1 text-xs text-slate-500">Pending contact requests in the latest loaded page</p>
                          </div>
                          <MessageSquare size={18} className="text-rose-200" aria-hidden="true" />
                        </div>
                        {isLoadingQueries ? (
                          <div className="flex h-24 items-center justify-center"><Loader2 className="animate-spin text-rose-200" size={24} /></div>
                        ) : loadErrors.queries ? (
                          <p role="alert" className="py-5 text-sm text-rose-200">{loadErrors.queries}</p>
                        ) : pendingQueries.length === 0 ? (
                          <p className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-4 text-sm text-slate-400">No pending requests in the loaded results.</p>
                        ) : (
                          <div className="divide-y divide-white/[0.07]">
                            {pendingQueries.slice(0, 3).map(query => (
                              <div key={query._id} className="flex min-w-0 items-center justify-between gap-3 py-3 first:pt-0">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-white">{query.firstName} {query.lastName}</p>
                                  <p className="truncate text-xs text-slate-500">{query.email}</p>
                                </div>
                                <span className="shrink-0 rounded-full border border-rose-200/20 bg-rose-200/[0.07] px-2.5 py-1 text-xs text-rose-100">Pending</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <button onClick={() => setActiveTab('queries')} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm text-rose-100 transition hover:bg-rose-100/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                          Open contact requests <ArrowRight size={14} />
                        </button>
                      </section>

                      <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="upcoming-heading">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <h3 id="upcoming-heading" className="font-semibold text-white">Upcoming events</h3>
                            <p className="mt-1 text-xs text-slate-500">Next events by start date</p>
                          </div>
                          <Calendar size={18} className="text-amber-200" aria-hidden="true" />
                        </div>
                        {isLoadingEvents ? (
                          <div className="flex h-24 items-center justify-center"><Loader2 className="animate-spin text-amber-200" size={24} /></div>
                        ) : loadErrors.events ? (
                          <p role="alert" className="py-5 text-sm text-rose-200">{loadErrors.events}</p>
                        ) : upcomingEvents.length === 0 ? (
                          <p className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-4 text-sm text-slate-400">No upcoming events are scheduled.</p>
                        ) : (
                          <div className="divide-y divide-white/[0.07]">
                            {upcomingEvents.map(event => (
                              <button key={event._id} onClick={() => navigate(`/events/${event._id}`)} className="flex min-h-14 w-full items-center justify-between gap-3 py-2 text-left transition hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                                <span className="min-w-0 truncate text-sm font-medium text-white">{event.title}</span>
                                <time className="shrink-0 text-xs tabular-nums text-slate-400" dateTime={event.startsAt}>{new Date(event.startsAt).toLocaleDateString()}</time>
                              </button>
                            ))}
                          </div>
                        )}
                        <button onClick={() => setActiveTab('events')} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm text-amber-100 transition hover:bg-amber-100/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                          View all events <ArrowRight size={14} />
                        </button>
                      </section>
                    </div>

                    <section className="rounded-xl border border-white/[0.08] bg-black/15 p-4 sm:p-5" aria-labelledby="activity-heading">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <h3 id="activity-heading" className="font-semibold text-white">Recent activity</h3>
                          <p className="mt-1 text-xs text-slate-500">Latest dated records currently loaded</p>
                        </div>
                        <Activity size={18} className="text-slate-400" aria-hidden="true" />
                      </div>
                      {recentActivity.length === 0 ? (
                        <p className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-5 text-sm text-slate-400">
                          {isLoadingBlogs || isLoadingEvents || isLoadingUsers || isLoadingQueries ? 'Loading activity…' : 'No recent activity is available.'}
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          {recentActivity.map(item => {
                            const Icon = item.category === 'Blog' ? FileText : item.category === 'Event' ? Calendar : item.category === 'Member' ? Users : MessageSquare;
                            return (
                              <button key={item.id} onClick={() => setActiveTab(item.tab)} className="flex min-w-0 items-center gap-3 rounded-lg border border-white/[0.06] px-3 py-3 text-left transition hover:border-white/15 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                                <span className="rounded-lg bg-white/[0.06] p-2 text-slate-300"><Icon size={15} aria-hidden="true" /></span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-medium text-white">{item.title}</span>
                                  <span className="block text-xs text-slate-500">{item.detail}</span>
                                </span>
                                <time className="shrink-0 text-xs tabular-nums text-slate-500" dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  </div>
                )}

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
                    ) : loadErrors.blogs ? renderLoadError(loadErrors.blogs, loadBlogs) : visibleBlogs.length > 0 ? (
                      <div className="space-y-3">
                        {visibleBlogs.map((blog) => (
                          <div key={blog._id} className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-3 transition-colors hover:border-white/15 hover:bg-white/[0.04] sm:p-4">
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

                            <div className="flex shrink-0 items-center gap-1 transition-opacity sm:opacity-60 sm:group-hover:opacity-100">
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
                        <h3 className="text-lg font-medium text-white mb-2">{adminBlogs.length ? 'No matching blogs' : 'No blogs found'}</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">{adminBlogs.length ? 'Try changing your search.' : 'Create your first blog post.'}</p>
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
                    ) : loadErrors.events ? renderLoadError(loadErrors.events, loadEvents) : visibleEvents.length > 0 ? (
                      <div className="space-y-3">
                        {visibleEvents.map((event) => (
                          <div key={event._id} className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-3 transition-colors hover:border-white/15 hover:bg-white/[0.04] sm:p-4">
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

                            <div className="flex shrink-0 items-center gap-1 transition-opacity sm:opacity-60 sm:group-hover:opacity-100">
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
                        <h3 className="text-lg font-medium text-white mb-2">{adminEvents.length ? 'No matching events' : 'No events found'}</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">{adminEvents.length ? 'Try changing your search.' : 'Create your first event to get started.'}</p>
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
                    ) : loadErrors.users ? renderLoadError(loadErrors.users, () => loadUsers(1)) : (
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
                              {visibleUsers.length === 0 ? (
                                <tr>
                                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                    {adminUsers.length ? 'No matching users.' : 'No users found.'}
                                  </td>
                                </tr>
                              ) : visibleUsers.map((u) => (
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
                                    {(u as IUser & { createdAt?: string }).createdAt
                                      ? new Date((u as IUser & { createdAt?: string }).createdAt as string).toLocaleDateString()
                                      : '—'}
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
                    ) : loadErrors.queries ? renderLoadError(loadErrors.queries, () => loadQueries(1)) : (
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
                              {visibleQueries.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    {adminQueries.length ? 'No matching queries.' : 'No queries found.'}
                                  </td>
                                </tr>
                              ) : (
                                visibleQueries.map((query) => (
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
        </section>
      </div>
    </div>
  );
}
