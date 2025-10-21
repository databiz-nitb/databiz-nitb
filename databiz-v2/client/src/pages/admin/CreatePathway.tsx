import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getResources } from "../../services/resource.service";
import { createPathway } from "../../services/admin.service";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { IResource } from "../../types";

const CreatePathway: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<IResource[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "DS" as "DS" | "AIML" | "DA"
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await getResources();
      setResources(res.data);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceToggle = (resourceId: string) => {
    setSelectedResources(prev => 
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      alert('Only admins can create pathways');
      return;
    }

    try {
      setLoading(true);
      
      const pathwayData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        resources: selectedResources
      };

      await createPathway(pathwayData);
      alert('Pathway created successfully!');
      navigate('/admin');
      
    } catch (error) {
      console.error('Failed to create pathway:', error);
      alert('Failed to create pathway. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Pathway</h1>
            <p className="text-gray-600">Design a new learning pathway for students.</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pathway Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter pathway title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="DS">Data Science</option>
                  <option value="AIML">AI & ML</option>
                  <option value="DA">Data Analytics</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what students will learn in this pathway..."
                required
              />
            </div>
          </div>

          {/* Resource Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Resources</h2>
            <p className="text-gray-600 mb-4">Choose the resources that will be part of this pathway.</p>
            
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {resources.map((resource) => (
                  <div
                    key={resource._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedResources.includes(resource._id!)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleResourceToggle(resource._id!)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedResources.includes(resource._id!)}
                        onChange={() => handleResourceToggle(resource._id!)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            resource.type === 'video' ? 'bg-red-100 text-red-700' :
                            resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                            resource.type === 'course' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {resource.type}
                          </span>
                        </div>
                        {(resource as any).description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {(resource as any).description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No resources available. Create some resources first.</p>
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-600">
              Selected: {selectedResources.length} resource{selectedResources.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={loading || !formData.title || !formData.description}
            >
              {loading ? 'Creating...' : 'Create Pathway'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePathway;
