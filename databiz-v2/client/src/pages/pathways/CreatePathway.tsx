import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Trash2, Link as LinkIcon, Clock, Type, FileText } from 'lucide-react';
import { createPathway } from '../../services/pathway.service';
import { createResource } from '../../services/resource.service';
import toast from 'react-hot-toast';

interface TaskForm {
    title: string;
    description: string;
    url: string;
    type: string;
    estimatedTimeMin: number;
}

export default function CreatePathway() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'DS',
    });

    const [tasks, setTasks] = useState<TaskForm[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTaskChange = (index: number, field: keyof TaskForm, value: string | number) => {
        const newTasks = [...tasks];
        newTasks[index] = { ...newTasks[index], [field]: value };
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks(prev => [...prev, { title: '', description: '', url: '', type: 'other', estimatedTimeMin: 0 }]);
    };

    const removeTask = (index: number) => {
        setTasks(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category) {
            toast.error("Please fill required pathway fields");
            return;
        }

        // Validate tasks
        for (let i = 0; i < tasks.length; i++) {
            const t = tasks[i];
            if (!t.title) {
                toast.error(`Task ${i + 1} is missing a title`);
                return;
            }
        }

        try {
            setLoading(true);

            // 1. Create all resources (tasks) first
            const createdTaskIds: string[] = [];
            for (const task of tasks) {
                const res = await createResource({
                    title: task.title,
                    description: task.description,
                    url: task.url,
                    type: task.type,
                    estimatedTimeMin: task.estimatedTimeMin || 0
                });
                createdTaskIds.push(res.data._id);
            }

            // 2. Create the pathway with those resource ObjectIds
            await createPathway({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                resources: createdTaskIds
            });

            toast.success("Pathway created successfully");
            navigate('/pathways');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create pathway");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" min-h-screen bg-[#0B0F19] relative overflow-hidden text-gray-100 py-12 px-6">
            {/* Background elements */}
            <div className=" absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 mt-8">
                <button
                    onClick={() => navigate('/pathways')}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors font-medium group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-8 py-8 border-b border-white/5">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Create New Pathway</h1>
                        <p className="text-gray-400 mt-2 text-lg">Design a structured learning journey and add tasks for members.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-10">
                        {/* Pathway Basic Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                                <FileText className="text-indigo-400" size={20} />
                                Pathway Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Pathway Title <span className="text-indigo-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Full Stack Development Core"
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-600 outline-none"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Category <span className="text-indigo-400">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-[#111624] border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all outline-none appearance-none"
                                    >
                                        <option value="DS">Data Science (DS)</option>
                                        <option value="AIML">Artificial Intelligence / Machine Learning (AIML)</option>
                                        <option value="DA">Data Analytics (DA)</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Outline what members will learn in this pathway..."
                                        rows={4}
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-600 outline-none resize-y"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tasks Section */}
                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                                    <LinkIcon className="text-blue-400" size={20} />
                                    Pathway Tasks ({tasks.length})
                                </h2>
                                <button
                                    type="button"
                                    onClick={addTask}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Task
                                </button>
                            </div>

                            {tasks.length === 0 ? (
                                <div className="text-center py-10 bg-black/20 border border-white/5 rounded-2xl border-dashed">
                                    <p className="text-gray-400 mb-4">No tasks added to this pathway yet.</p>
                                    <button
                                        type="button"
                                        onClick={addTask}
                                        className="mx-auto px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600/80 hover:bg-indigo-500 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={18} />
                                        Add First Task
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {tasks.map((task, index) => (
                                        <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group">
                                            <button
                                                type="button"
                                                onClick={() => removeTask(index)}
                                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-400/10"
                                                title="Remove Task"
                                            >
                                                <Trash2 size={20} />
                                            </button>

                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-white/10 text-gray-300 mb-2">
                                                    Task {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Task Title *</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Type size={16} className="text-gray-500" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={task.title}
                                                            onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                                                            className="w-full bg-black/30 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-sm placeholder-gray-600 transition-all"
                                                            placeholder="e.g. Read Chapter 1"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Resource URL</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <LinkIcon size={16} className="text-gray-500" />
                                                        </div>
                                                        <input
                                                            type="url"
                                                            value={task.url}
                                                            onChange={(e) => handleTaskChange(index, 'url', e.target.value)}
                                                            className="w-full bg-black/30 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-sm placeholder-gray-600 transition-all flex-1"
                                                            placeholder="https://..."
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Task Type</label>
                                                    <select
                                                        value={task.type}
                                                        onChange={(e) => handleTaskChange(index, 'type', e.target.value)}
                                                        className="w-full bg-[#111624] border border-white/10 text-white rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-indigo-500/50 outline-none text-sm appearance-none"
                                                    >
                                                        <option value="video">Video</option>
                                                        <option value="article">Article</option>
                                                        <option value="course">Course</option>
                                                        <option value="repo">Repository</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Est. Time (Mins)</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Clock size={16} className="text-gray-500" />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={task.estimatedTimeMin || ''}
                                                            onChange={(e) => handleTaskChange(index, 'estimatedTimeMin', parseInt(e.target.value))}
                                                            className="w-full bg-black/30 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-sm placeholder-gray-600 transition-all"
                                                            placeholder="30"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/pathways')}
                                className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        Save & Create Pathway
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

