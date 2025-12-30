import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createBlog, getBlogById, updateBlog } from "../../services/blog.service";
import { Image as ImageIcon, Type, Tag, ArrowLeft } from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreateBlog() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
        visibility: "public",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        // Check for edit query param
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("edit");

        if (id) {
            setIsEditing(true);
            setEditId(id);
            fetchBlogDetails(id);
        }
    }, [location]);

    const fetchBlogDetails = async (id: string) => {
        setLoading(true);
        try {
            const response = await getBlogById(id);
            const blog = response.data;
            setFormData({
                title: blog.title,
                content: blog.content,
                tags: blog.tags ? blog.tags.join(", ") : "",
                visibility: "public"
            });
            // Note: We can't set file input value programmatically for security reasons
            // But we can show a preview or just let them upload a new one if they want to change
        } catch (err) {
            console.error(err);
            setError("Failed to fetch blog details for editing.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.role !== "admin") {
        return <div className="p-10 text-white">Access Denied</div>;
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setFormData({ ...formData, content });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const tagsArray = formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");

            // Create FormData
            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("content", formData.content);
            formPayload.append("visibility", formData.visibility);

            // Only append tags as 'tags' - the backend interprets multiple fields with same name as array
            tagsArray.forEach(tag => formPayload.append("tags", tag));

            if (imageFile) {
                formPayload.append("image", imageFile);
            }

            if (isEditing && editId) {
                await updateBlog(editId, formPayload);
            } else {
                await createBlog(formPayload);
            }

            navigate("/profile");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} blog`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="relative z-50 flex items-center text-gray-400 hover:text-white mb-8 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 w-2 h-8 rounded-full"></span>
                        {isEditing ? "Edit Blog" : "Create New Blog"}
                    </h1>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Blog Title
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                                    <Type size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="Enter an engaging title..."
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Cover Image
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
                                    <ImageIcon size={18} />
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
                                />
                                {isEditing && !imageFile && (
                                    <p className="mt-2 text-xs text-gray-500">Leave empty to keep current image</p>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Tags
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                                    <Tag size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                    placeholder="Technology, AI, Web Dev (comma separated)"
                                />
                            </div>
                        </div>

                        {/* Visibility */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Visibility
                            </label>
                            <select
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-10 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            >
                                <option value="public">Public</option>
                                <option value="junior">Junior Only</option>
                                <option value="admin">Admin Only</option>
                            </select>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Content
                            </label>
                            <div className="relative group">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    className="text-white"
                                    placeholder="Write your blog content here..."
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white uppercase tracking-wider bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Processing..." : (isEditing ? "Update Blog" : "Publish Blog")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
