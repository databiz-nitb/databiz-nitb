import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUserProgress } from "../../services/progress.service";
import Button from "../../components/Button/Button";
import type { IUserProgressOverview } from "../../types";

const Progress: React.FC = () => {
  const [progressOverview, setProgressOverview] = useState<IUserProgressOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const res = await getAllUserProgress();
      setProgressOverview(res.data);
    } catch (err: any) {
      setError("Failed to load progress data");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "DS": return "bg-blue-100 text-blue-800";
      case "AIML": return "bg-green-100 text-green-800";
      case "DA": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "DS": return "Data Science";
      case "AIML": return "AI & ML";
      case "DA": return "Data Analytics";
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading your progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Progress</h1>
        <p className="text-gray-600">Track your progress across all pathways and resources.</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Pathways</p>
              <p className="text-2xl font-semibold text-gray-900">{progressOverview.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Resources</p>
              <p className="text-2xl font-semibold text-gray-900">
                {progressOverview.reduce((sum, p) => sum + p.completed, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">
                {progressOverview.reduce((sum, p) => sum + p.inProgress, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pathway Progress */}
      {progressOverview.length > 0 ? (
        <div className="space-y-6">
          {progressOverview.map((pathwayProgress) => (
            <div key={pathwayProgress.pathway._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {pathwayProgress.pathway.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(pathwayProgress.pathway.category)}`}>
                    {getCategoryName(pathwayProgress.pathway.category)}
                  </span>
                </div>
                <Link to={`/pathways/${pathwayProgress.pathway._id}`}>
                  <Button className="btn-interactive hover-lift text-xs px-3 py-1">
                    View Details
                  </Button>
                </Link>
              </div>

              <p className="text-gray-600 mb-4">{pathwayProgress.pathway.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {pathwayProgress.completed}/{pathwayProgress.total} resources</span>
                  <span>{pathwayProgress.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pathwayProgress.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Resource Status Summary */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{pathwayProgress.completed}</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-semibold text-yellow-600">{pathwayProgress.inProgress}</div>
                  <div className="text-sm text-yellow-700">In Progress</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">
                    {pathwayProgress.total - pathwayProgress.completed - pathwayProgress.inProgress}
                  </div>
                  <div className="text-sm text-gray-700">Not Started</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-lg">No progress data found</p>
            <p className="text-sm">Start exploring pathways to track your learning progress.</p>
          </div>
          <Link to="/pathways">
            <Button className="btn-interactive hover-lift">
              Explore Pathways
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Progress;
