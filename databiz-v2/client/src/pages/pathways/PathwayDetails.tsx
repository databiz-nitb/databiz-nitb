import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPathwayById } from "../../services/pathway.service";
import { getUserPathwayProgress, markProgress } from "../../services/progress.service";
import { useAuth } from "../../context/AuthContext";
import type { IPathway, IPathwayProgress, IProgress } from "../../types";

const PathwayDetails: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pathway, setPathway] = useState<IPathway | null>(null);
  const [progressData, setProgressData] = useState<IPathwayProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingProgress, setUpdatingProgress] = useState<string | null>(null);

  useEffect(() => {
    fetchPathway();
  }, [id]);

  const fetchPathway = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const pathwayRes = await getPathwayById(id);
      setPathway(pathwayRes.data);
      
      // Fetch progress data if user is logged in
      if (user && (user.role === 'junior' || user.role === 'admin')) {
        try {
          const progressRes = await getUserPathwayProgress(id);
          setProgressData(progressRes.data);
        } catch (progressErr) {
          console.log('No progress data found, starting fresh');
        }
      }
    } catch (err: any) {
      setError("Failed to load pathway details");
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (resourceId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    if (!id || !user) return;
    
    try {
      setUpdatingProgress(resourceId);
      await markProgress({
        pathwayId: id,
        resourceId,
        status
      });
      
      // Refresh progress data
      const progressRes = await getUserPathwayProgress(id);
      setProgressData(progressRes.data);
    } catch (err: any) {
      console.error('Failed to update progress:', err);
    } finally {
      setUpdatingProgress(null);
    }
  };

  const getResourceProgress = (resourceId: string): IProgress | undefined => {
    return progressData?.progressEntries.find(p => 
      typeof p.resource === 'object' ? p.resource._id === resourceId : p.resource === resourceId
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <div className="text-lg text-gray-600">Loading pathway details...</div>
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

  if (!pathway) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Pathway not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/pathways" className="text-blue-600 hover:text-blue-800">
          ← Back to Pathways
        </Link>
      </nav>

      {/* Pathway Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{pathway.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(pathway.category)}`}>
            {getCategoryName(pathway.category)}
          </span>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">{pathway.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <span>
              <strong>{pathway.resources?.length || 0}</strong> resources available
            </span>
            {pathway.createdAt && (
              <span>
                Created on {new Date(pathway.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
          {progressData && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  {progressData.completionPercentage}%
                </div>
                <div className="text-xs text-gray-500">
                  {progressData.completedResources}/{progressData.totalResources} completed
                </div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressData.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Learning Resources</h2>
        
        {pathway.resources && pathway.resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathway.resources.map((resource: any) => {
              const resourceProgress = getResourceProgress(resource._id);
              const currentStatus = resourceProgress?.status || 'not_started';
              const isUpdating = updatingProgress === resource._id;
              
              return (
                <div key={resource._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        resource.type === 'video' ? 'bg-red-100 text-red-700' :
                        resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                        resource.type === 'course' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {resource.type}
                      </span>
                      {user && (user.role === 'junior' || user.role === 'admin') && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(currentStatus)}`}>
                          {currentStatus === 'not_started' ? 'Not Started' :
                           currentStatus === 'in_progress' ? 'In Progress' : 'Completed'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {resource.description && (
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  )}
                  
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {resource.url ? (
                      <a 
                        href={resource.url.startsWith('http') ? resource.url : `https://${resource.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                        onClick={(e) => {
                          // Ensure the URL is valid
                          if (!resource.url || resource.url.trim() === '') {
                            e.preventDefault();
                            alert('Resource URL is not available');
                            return;
                          }
                          if (currentStatus === 'not_started') {
                            handleProgressUpdate(resource._id, 'in_progress');
                          }
                        }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Access Resource
                      </a>
                    ) : (
                      <span className="inline-flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        URL Not Available
                      </span>
                    )}
                    
                    {user && (user.role === 'junior' || user.role === 'admin') && (
                      <div className="flex space-x-2">
                        {currentStatus !== 'completed' && (
                          <button
                            onClick={() => handleProgressUpdate(resource._id, 'completed')}
                            disabled={isUpdating}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            {isUpdating ? 'Updating...' : 'Mark Complete'}
                          </button>
                        )}
                        {currentStatus === 'completed' && (
                          <button
                            onClick={() => handleProgressUpdate(resource._id, 'in_progress')}
                            disabled={isUpdating}
                            className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 disabled:opacity-50"
                          >
                            {isUpdating ? 'Updating...' : 'Mark In Progress'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {resourceProgress?.completedAt && (
                    <div className="mt-2 text-xs text-gray-500">
                      Completed on {new Date(resourceProgress.completedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg">No resources available</p>
              <p className="text-sm">Resources for this pathway haven't been added yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathwayDetails;
