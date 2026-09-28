"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, Plus, Users, Award, PlayCircle, FileText, Clock, Code2, AlertCircle, RefreshCw, BookOpen } from "lucide-react";
import { getPathways } from "../../services/pathway.service";
import { getMyProgress, markProgressStatus, getPathwayProgressForUsers } from "../../services/progress.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PathwayDashboard() {
  const [pathways, setPathways] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [adminProgressData, setAdminProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [progressLoadError, setProgressLoadError] = useState("");
  const [progressActionError, setProgressActionError] = useState("");
  const [isAdminProgressLoading, setIsAdminProgressLoading] = useState(false);
  const [adminProgressError, setAdminProgressError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPathwayId, setSelectedPathwayId] = useState<string | null>(null);
  const [openResources, setOpenResources] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoadError("");
    setProgressLoadError("");
    try {
      setLoading(true);
      const res = await getPathways();
      setPathways(res.data);
      if (res.data && res.data.length > 0) {
        setSelectedPathwayId(res.data[0]._id);
      }

      if (user?.role === 'junior') {
        try {
          const progRes = await getMyProgress();
          setProgressData(progRes.data);
        } catch (error) {
          console.error("Error fetching personal progress", error);
          setProgressLoadError("Your progress couldn't be loaded.");
        }
      }
    } catch (error) {
      console.error("Error fetching pathways", error);
      setLoadError("Pathways couldn't be loaded. Check your connection and try again.");
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
    if (!selectedPathwayId) return;
    setIsAdminProgressLoading(true);
    setAdminProgressError("");
    setAdminProgressData([]);
    try {
      const res = await getPathwayProgressForUsers(selectedPathwayId);
      setAdminProgressData(res.data);
    } catch (error) {
      console.error("Error fetching admin progress", error);
      setAdminProgressError("Member progress couldn't be loaded.");
    } finally {
      setIsAdminProgressLoading(false);
    }
  };

  const selectedPathway = pathways.find((p) => p._id === selectedPathwayId);

  const handleToggle = async (resourceId: string, currentStatus: string) => {
    if (!selectedPathway || user?.role !== 'junior') return;

    const newStatus = currentStatus === "completed" ? "not_started" : "completed";
    setProgressActionError("");
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
      setProgressActionError("Couldn't save your progress. Please try again.");
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 pb-12 pt-32 text-slate-100 md:pt-36" role="status" aria-label="Loading pathways">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101820] px-5 py-4 text-sm text-slate-300">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-300/25 border-t-sky-300" />
          Loading learning pathways
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 pb-12 pt-32 text-slate-100 md:pt-36">
        <div role="alert" className="w-full max-w-lg rounded-2xl border border-rose-200/15 bg-[#101820] p-6 text-center sm:p-8">
          <AlertCircle size={28} className="mx-auto mb-4 text-rose-200" aria-hidden="true" />
          <h1 className="text-xl font-semibold text-white">We couldn't load pathways</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{loadError}</p>
          <button onClick={fetchData} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
            <RefreshCw size={16} aria-hidden="true" /> Try again
          </button>
        </div>
      </div>
    );
  }

  if (pathways.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 pb-12 pt-32 text-slate-100 md:pt-36">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#101820] p-6 text-center sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200/15 bg-sky-200/[0.06] text-sky-200">
            <BookOpen size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">No pathways yet</h2>
          <p className="mx-auto mb-8 mt-3 max-w-md text-sm leading-6 text-slate-400">Learning pathways will appear here when they’re available.</p>

          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/pathways/create')}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Plus size={18} aria-hidden="true" /> Create your first pathway
            </button>
          )}
        </div>
      </div>
    );
  }

  // Calculate progress safely
  let completedCount = 0;
  const totalCount = selectedPathway?.resources?.length || 0;

  if (user?.role === 'junior' && selectedPathway) {
    const pathwayProgress = progressData.filter(p =>
      p.pathway?._id === selectedPathway._id || p.pathway === selectedPathway._id
    );
    completedCount = pathwayProgress.filter(p => p.status === 'completed').length;
  }

  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remainingCount = Math.max(totalCount - completedCount, 0);

  return (
    <div className="min-h-screen bg-[#080c11] px-4 pb-12 pt-32 text-slate-100 sm:px-6 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <section className="space-y-6">
          {/* Header */}
          <header className="flex flex-col items-start justify-between gap-5 rounded-xl border border-white/10 bg-[#101820] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">DataBiz / Learning</p>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Learning pathways</h1>
              <p className="mt-2 text-sm text-slate-400">Choose a path, work through its resources, and track your progress.</p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              {/* Select Pathway */}
              {pathways.length > 1 && (
                <div className="relative w-full sm:min-w-56 sm:w-auto">
                  <select
                    aria-label="Select a learning pathway"
                    value={selectedPathwayId || ""}
                    onChange={(e) => setSelectedPathwayId(e.target.value)}
                    className="min-h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#080c11] py-2.5 pl-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/20"
                  >
                    {pathways.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                </div>
              )}

              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/pathways/create')}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <Plus size={18} />
                  New Pathway
                </button>
              )}
            </div>
          </header>

          {/* Pathway Details & Progress Overview */}
          <section className="flex flex-col items-start justify-between gap-6 rounded-xl border border-white/10 bg-[#101820] p-5 sm:p-6 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center rounded-md border border-sky-200/20 bg-sky-200/[0.06] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
                {selectedPathway?.category || 'Pathway'}
              </div>
              <h2 className="break-words text-2xl font-semibold text-white sm:text-3xl">{selectedPathway?.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{selectedPathway?.description}</p>
            </div>

            {user?.role === 'junior' && (
              <div className="w-full rounded-lg border border-white/10 bg-[#080c11] p-4 md:w-64 md:shrink-0">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your progress</p>
                    <p className="mt-1 text-sm text-slate-300">{completedCount} complete <span className="text-slate-500">/ {totalCount}</span></p>
                  </div>
                  <span className="text-3xl font-semibold tabular-nums text-sky-200">{progressPercentage}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label="Pathway completion"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPercentage}
                  className="h-2 overflow-hidden rounded-full bg-white/10"
                >
                  <div
                    className="h-full rounded-full bg-sky-300 transition-[width] duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span>{remainingCount} remaining</span>
                  {totalCount === 0 && <span>No tasks added yet</span>}
                </div>
                {progressLoadError && (
                  <p role="alert" className="mt-3 flex items-center gap-2 text-xs text-rose-200">
                    <AlertCircle size={14} aria-hidden="true" /> {progressLoadError}
                    <button onClick={fetchData} className="underline underline-offset-2 hover:text-white">Retry</button>
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Tasks Section */}
          <section className="overflow-hidden rounded-xl border border-white/10 bg-[#101820]">
            <button
              onClick={() => setOpenResources(!openResources)}
              aria-expanded={openResources}
              aria-controls="pathway-resource-list"
              className="flex min-h-16 w-full items-center justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-4 py-4 text-left transition-colors hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sky-300 sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-semibold text-white text-base sm:text-lg">
                  Pathway Tasks
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
                  {selectedPathway?.resources?.length || 0} Tasks
                </span>
              </div>
              <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-slate-400 transition-transform duration-200 ${openResources ? 'rotate-180 text-white' : ''}`} />
            </button>

            <div id="pathway-resource-list" className={`${openResources ? '' : 'hidden'}`}>
              {progressActionError && <p role="alert" className="border-b border-rose-200/10 bg-rose-200/[0.04] px-4 py-3 text-sm text-rose-100 sm:px-5">{progressActionError}</p>}
              <div className="divide-y divide-white/[0.07]">
                {selectedPathway?.resources?.length > 0 ? (
                  selectedPathway.resources.map((r: any, index: number) => {
                    // Find progress for this resource
                    const resourceProgress = progressData.find(p => p.resource?._id === r._id || p.resource === r._id);
                    const isCompleted = resourceProgress?.status === 'completed';

                    const checkboxId = `resource-${r._id}`;

                    return (
                      <div
                        key={r._id}
                        className={`group relative flex flex-col gap-4 overflow-hidden p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:px-5 ${isCompleted ? 'bg-sky-300/[0.035]' : 'hover:bg-white/[0.025]'}`}
                      >
                        <div className={`pointer-events-none absolute inset-y-0 left-0 w-0.5 ${isCompleted ? 'bg-sky-300' : 'bg-transparent group-hover:bg-white/20'}`} />
                        <div className="relative z-10 flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                          {user?.role === 'junior' && (
                            <input
                              id={checkboxId}
                              type="checkbox"
                              aria-label={`Mark ${r.title} complete`}
                              checked={isCompleted}
                              onChange={() => handleToggle(r._id, isCompleted ? 'completed' : 'not_started')}
                              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/25 bg-[#080c11] text-sky-300 focus:ring-2 focus:ring-sky-300/50"
                            />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className={`text-xs font-semibold uppercase tracking-wide ${isCompleted ? 'text-sky-200' : 'text-slate-500'}`}>
                                Task {String(index + 1).padStart(2, '0')}
                              </span>
                              {user?.role === 'junior' ? (
                                <label htmlFor={checkboxId} className={`cursor-pointer break-words text-base font-semibold ${isCompleted ? 'text-slate-400 line-through' : 'text-white group-hover:text-sky-100'}`}>
                                  {r.title}
                                </label>
                              ) : (
                                <span className="break-words text-base font-semibold text-white">{r.title}</span>
                              )}
                            </div>

                            {r.type && (
                              <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-medium capitalize text-slate-300">
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
                            aria-label={`Open ${r.title} resource in a new tab`}
                            className="relative z-10 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-slate-100 transition-colors hover:border-sky-200/25 hover:bg-sky-200/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:w-auto"
                          >
                            <span>Open resource</span>
                            <ExternalLink size={16} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center sm:p-12">
                    <BookOpen size={28} aria-hidden="true" className="mx-auto mb-4 text-slate-500" />
                    <h3 className="text-lg font-semibold text-white">No tasks yet</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">This pathway doesn’t have any tasks attached to it yet.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

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
                      {isAdminProgressLoading ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400 sm:px-6">
                            <span className="inline-flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-300/25 border-t-sky-300" />Loading member progress</span>
                          </td>
                        </tr>
                      ) : adminProgressError ? (
                        <tr>
                          <td colSpan={4} role="alert" className="px-4 py-10 text-center sm:px-6">
                            <p className="text-sm text-rose-200">{adminProgressError}</p>
                            <button onClick={fetchAdminProgress} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                              <RefreshCw size={14} aria-hidden="true" /> Retry
                            </button>
                          </td>
                        </tr>
                      ) : (() => {
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
                          const rate = totalCount > 0 ? Math.round((stat.completedCount / totalCount) * 100) : 0;
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
