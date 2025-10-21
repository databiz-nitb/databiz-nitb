import React, { useEffect, useState } from "react";
import { getPathways } from "../../services/pathway.service";
import { getResources } from "../../services/resource.service";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { IPathway, IResource } from "../../types";

const PathwayList: React.FC = () => {
  const [pathways, setPathways] = useState<IPathway[]>([]);
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "DS", label: "Data Science" },
    { value: "AIML", label: "AI & ML" },
    { value: "DA", label: "Data Analytics" },
  ];

  useEffect(() => {
    fetchPathways();
  }, []);

  const fetchPathways = async () => {
    try {
      setLoading(true);
      const [pathwaysRes, resourcesRes] = await Promise.all([
        getPathways(),
        getResources()
      ]);
      setPathways(pathwaysRes.data);
      setResources(resourcesRes.data);
    } catch (err: any) {
      setError("Failed to load pathways");
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (pathwayId: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(pathwayId)) {
      newOpenDropdowns.delete(pathwayId);
    } else {
      newOpenDropdowns.add(pathwayId);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const getPathwayResources = (pathway: IPathway) => {
    if (!pathway.resources || !Array.isArray(pathway.resources)) return [];
    return resources.filter(resource => 
      pathway.resources.some((pathwayResource: any) => 
        typeof pathwayResource === 'string' 
          ? pathwayResource === resource._id 
          : pathwayResource._id === resource._id
      )
    );
  };

  const filteredPathways = selectedCategory === "all" 
    ? pathways 
    : pathways.filter(p => p.category === selectedCategory);

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
        <div className="text-lg text-gray-600 animate-pulse-subtle">Loading pathways...</div>
        <div className="ml-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-left">Learning Pathways</h1>
          <p className="text-gray-600 animate-fade-in-left" style={{animationDelay: '0.2s'}}>Discover structured learning paths for your career growth</p>
        </div>
        {user?.role === "admin" && (
          <Link to="/pathways/create">
            <Button className="btn-interactive hover-lift animate-fade-in-right bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Pathway
            </Button>
          </Link>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8 animate-slide-in-up">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover-scale animate-fade-in ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white animate-scale-in"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
          {error}
        </div>
      )}

      {/* Pathways Grid */}
      {filteredPathways.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPathways.map((pathway, index) => {
            const pathwayResources = getPathwayResources(pathway);
            const isDropdownOpen = openDropdowns.has(pathway._id || '');
            
            return (
              <div key={pathway._id} className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 relative hover-lift animate-stagger-${Math.min(index + 1, 6)}`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {pathway.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium animate-pulse-subtle ${getCategoryColor(pathway.category)}`}>
                    {getCategoryName(pathway.category)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pathway.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="font-medium">{pathway.resources?.length || 0} resources</span>
                  <Link to={`/pathways/${pathway._id}`}>
                    <Button className="btn-interactive hover-lift bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg shadow-md font-semibold">
                      <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </Button>
                  </Link>
                </div>
                
                {/* Resources Dropdown */}
                <div className="border-t pt-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(pathway._id || '');
                    }}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 hover-scale"
                  >
                    <span>Resources ({pathwayResources.length})</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto animate-slide-in-down">
                      {pathwayResources.length > 0 ? (
                        pathwayResources.map((resource, resourceIndex) => (
                          <div key={resource._id} className={`p-2 bg-gray-50 rounded text-sm hover-lift animate-fade-in`} style={{animationDelay: `${resourceIndex * 0.1}s`}}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{resource.title}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                resource.type === 'video' ? 'bg-red-100 text-red-700' :
                                resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                                resource.type === 'course' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {resource.type}
                              </span>
                            </div>
                            {resource.url ? (
                              <a 
                                href={resource.url.startsWith('http') ? resource.url : `https://${resource.url}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-2"
                                onClick={(e) => {
                                  // Ensure the URL is valid
                                  if (!resource.url || resource.url.trim() === '') {
                                    e.preventDefault();
                                    alert('Resource URL is not available');
                                    return;
                                  }
                                }}
                              >
                                <Button className="btn-interactive hover-lift bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-2 rounded-md shadow-sm font-medium">
                                  <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Open Resource
                                </Button>
                              </a>
                            ) : (
                              <div className="inline-block mt-2">
                                <Button 
                                  className="bg-gray-400 text-gray-600 text-xs px-3 py-2 rounded-md cursor-not-allowed font-medium" 
                                  disabled
                                  onClick={() => alert('Resource URL is not available')}
                                >
                                  <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                  </svg>
                                  URL Not Available
                                </Button>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No resources available for this pathway.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg animate-fade-in-up">No pathways found</p>
            <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {selectedCategory === "all" 
                ? "No pathways are available yet." 
                : `No pathways found for ${getCategoryName(selectedCategory)}.`
              }
            </p>
          </div>
          {user?.role === "admin" && (
            <Link to="/pathways/create">
              <Button className="btn-interactive hover-lift animate-scale-in-bounce bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg" style={{animationDelay: '0.4s'}}>
                <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Create First Pathway
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PathwayList;
