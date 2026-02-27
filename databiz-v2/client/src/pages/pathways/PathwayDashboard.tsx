"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, Plus, Users, Award, PlayCircle, FileText, CheckCircle2, Clock, Code2 } from "lucide-react";
import { getPathways } from "../../services/pathway.service";
import { getMyProgress, markProgressStatus, getPathwayProgressForUsers } from "../../services/progress.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PathwayDashboard() {
  const [pathways, setPathways] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [adminProgressData, setAdminProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPathwayId, setSelectedPathwayId] = useState<string | null>(null);
  const [openResources, setOpenResources] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPathways();
      setPathways(res.data);
      if (res.data && res.data.length > 0) {
        setSelectedPathwayId(res.data[0]._id);
      }

      if (user?.role === 'junior') {
        const progRes = await getMyProgress();
        setProgressData(progRes.data);
      }
    } catch (error) {
      console.error("Error fetching pathways", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin' && selectedPathwayId) {
      fetchAdminProgress();
    }
  }, [user, selectedPathwayId]);

  const fetchAdminProgress = async () => {
    try {
      if (!selectedPathwayId) return;
      const res = await getPathwayProgressForUsers(selectedPathwayId);
      setAdminProgressData(res.data);
    } catch (error) {
      console.error("Error fetching admin progress", error);
    }
  };

  const selectedPathway = pathways.find((p) => p._id === selectedPathwayId);

  const handleToggle = async (resourceId: string, currentStatus: string) => {
    if (!selectedPathway || user?.role !== 'junior') return;

    const newStatus = currentStatus === "completed" ? "not_started" : "completed";
    try {
      await markProgressStatus({
        pathwayId: selectedPathway._id,
        resourceId,
        status: newStatus
      });
      // Refresh progress data
      const progRes = await getMyProgress();
      setProgressData(progRes.data);
    } catch (error) {
      console.error("Error updating progress", error);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={18} />;
      case 'article': return <FileText size={18} />;
      case 'repo': return <Code2 size={18} />;
      default: return <Clock size={18} />;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0B0F19] flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  if (pathways.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 text-gray-100">
        <div className="max-w-2xl w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-2xl rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="w-24 h-24 bg-white/5 border border-white/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4 relative z-10">No Pathways Available</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto relative z-10 text-lg">Your learning journey starts here. When pathways are added, they will appear on this dashboard.</p>

          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/pathways/create')}
              className="relative z-10 inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] font-medium text-lg"
            >
              <Plus size={22} />
              Create Your First Pathway
            </button>
          )}
        </div>
      </div>
    );
  }

  // Calculate progress safely
  let completedCount = 0;
  let totalCount = selectedPathway?.resources?.length || 1;

  if (user?.role === 'junior' && selectedPathway) {
    const pathwayProgress = progressData.filter(p =>
      p.pathway?._id === selectedPathway._id || p.pathway === selectedPathway._id
    );
    completedCount = pathwayProgress.filter(p => p.status === 'completed').length;
  }

  const progressPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden text-gray-100 py-12 px-6">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="mt-20 max-w-5xl mx-auto relative z-10">
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 pb-8 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">Learning Dashboard</h1>
              <p className="text-gray-400 mt-2">Track progress and explore new paths.</p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Select Pathway */}
              {pathways.length > 1 && (
                <div className="relative w-full sm:w-auto cursor-pointer">
                  <select
                    value={selectedPathwayId || ""}
                    onChange={(e) => setSelectedPathwayId(e.target.value)}
                    className="w-full sm:w-auto bg-[#111624] border border-white/10 text-white rounded-xl pl-4 pr-10 py-3 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-medium transition-all shadow-sm outline-none appearance-none"
                  >
                    {pathways.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 " size={18} />
                </div>
              )}

              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/pathways/create')}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] whitespace-nowrap cursor-pointer"
                >
                  <Plus size={18} />
                  New Pathway
                </button>
              )}
            </div>
          </div>

          {/* Pathway Details & Progress Overview */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 bg-black/20 p-8 rounded-2xl border border-white/5">
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold tracking-wider uppercase mb-4">
                {selectedPathway?.category || 'Pathway'}
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">{selectedPathway?.title}</h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{selectedPathway?.description}</p>
            </div>

            {user?.role === 'junior' && (
              <div className="flex flex-col items-center md:items-end bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 min-w-[240px]">
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">Your Journey</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2.5 mt-5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-3 font-medium">{completedCount} of {totalCount} tasks completed</p>
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div className="border border-white/10 rounded-2xl mb-8 overflow-hidden shadow-sm bg-black/20">
            <button
              onClick={() => setOpenResources(!openResources)}
              className="w-full flex justify-between items-center p-6 bg-white/5 hover:bg-white/10 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-white text-xl">
                  Pathway Tasks
                </span>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 py-1 px-4 rounded-full text-sm font-bold shadow-sm">
                  {selectedPathway?.resources?.length || 0} Tasks
                </span>
              </div>
              <div className={`p-2 rounded-full bg-white/5 text-gray-400 transition-transform duration-300 ${openResources ? 'rotate-180 text-white' : ''}`}>
                <ChevronDown size={20} />
              </div>
            </button>

            <div className={`transition-all duration-300 ease-in-out ${openResources ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-0 divide-y divide-white/5">
                {selectedPathway?.resources?.length > 0 ? (
                  selectedPathway.resources.map((r: any, index: number) => {
                    // Find progress for this resource
                    const resourceProgress = progressData.find(p => p.resource?._id === r._id || p.resource === r._id);
                    const isCompleted = resourceProgress?.status === 'completed';

                    return (
                      <label
                        key={r._id}
                        className={`group relative flex items-center justify-between p-6 transition-all duration-300 overflow-hidden ${user?.role === 'junior' ? 'cursor-pointer' : ''}`}
                      >
                        {/* Task Progress Background Highlight */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${isCompleted ? 'bg-indigo-500/5 opacity-100' : 'bg-transparent opacity-0 group-hover:bg-white/5'}`}></div>

                        <div className="flex items-center gap-5 flex-1 relative z-10">
                          {user?.role === 'junior' && (
                            <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => handleToggle(r._id, isCompleted ? 'completed' : 'not_started')}
                                className="peer appearance-none w-8 h-8 rounded-xl border-2 border-white/20 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all cursor-pointer shadow-sm bg-black/20"
                              />
                              <CheckCircle2
                                className={`absolute w-5 h-5 transition-all duration-300 pointer-events-none ${isCompleted ? 'text-white opacity-100 scale-100' : 'text-transparent opacity-0 scale-50'}`}
                                strokeWidth={3}
                              />
                            </div>
                          )}

                          <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className={`font-semibold text-xs tracking-wider uppercase ${isCompleted ? 'text-indigo-400' : 'text-gray-500'}`}>
                                Task {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className={`block font-bold text-lg transition-colors duration-200 ${isCompleted ? "line-through text-gray-500" : "text-white group-hover:text-indigo-300"}`}>
                                {r.title}
                              </span>
                            </div>

                            {r.type && (
                              <span className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${isCompleted
                                ? 'bg-white/5 text-gray-400 border border-white/5'
                                : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                                }`}>
                                {getTaskIcon(r.type)}
                                {r.type}
                              </span>
                            )}
                          </div>
                        </div>

                        {r.url && (
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative z-10 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all border shadow-sm ${isCompleted
                              ? 'text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20'
                              : 'text-white bg-white/10 hover:bg-white/20 border-white/10 hover:shadow-lg'
                              }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="hidden sm:inline">Open Resource</span>
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </label>
                    );
                  })
                ) : (
                  <div className="p-16 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No tasks yet</h3>
                    <p className="text-gray-400 max-w-sm mx-auto text-lg">This pathway doesn't have any tasks attached to it yet. Check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Admin Tracking Section */}
          {user?.role === 'admin' && (
            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Junior Progress Tracking</h3>
                  <p className="text-gray-400 mt-1">Monitor completion rates across all pathway members.</p>
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl border border-white/10 shadow-xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-gray-400 font-bold">
                        <th className="px-8 py-5">Junior Member</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Completed Tasks</th>
                        <th className="px-8 py-5 text-right">Completion Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(() => {
                        // Group progress by user
                        const userStats = new Map();
                        adminProgressData.forEach((entry) => {
                          const userId = entry.user?._id;
                          if (!userId) return;

                          if (!userStats.has(userId)) {
                            userStats.set(userId, {
                              user: entry.user,
                              completedCount: 0
                            });
                          }

                          if (entry.status === 'completed') {
                            userStats.get(userId).completedCount++;
                          }
                        });

                        const userList = Array.from(userStats.values());

                        if (userList.length === 0) {
                          return (
                            <tr>
                              <td colSpan={4} className="px-8 py-12 text-center text-gray-500 text-lg">
                                No juniors have started this pathway yet.
                              </td>
                            </tr>
                          );
                        }

                        return userList.map((stat, idx) => {
                          const rate = Math.round((stat.completedCount / (totalCount || 1)) * 100);
                          const isFinished = stat.completedCount === totalCount && totalCount > 0;

                          return (
                            <tr key={stat.user._id || idx} className="hover:bg-white/5 transition-colors">
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                                    {stat.user.name?.charAt(0) || 'U'}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white text-base">{stat.user.name}</div>
                                    <div className="text-sm text-gray-400">{stat.user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                {isFinished ? (
                                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                                    <Award size={14} /> Certified
                                  </span>
                                ) : stat.completedCount > 0 ? (
                                  <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    In Progress
                                  </span>
                                ) : (
                                  <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-gray-300 border border-white/20">
                                    Not Started
                                  </span>
                                )}
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-300 font-medium tracking-wide">
                                {stat.completedCount} / {totalCount} tasks
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-4">
                                  <div className="text-sm font-bold text-white">{rate}%</div>
                                  <div className="w-32 h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                    <div
                                      className={`h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] ${isFinished ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'}`}
                                      style={{ width: `${rate}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
