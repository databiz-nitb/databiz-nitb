import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createEvent, getEventById, updateEvent } from "../../services/event.service";
import {
    Image as ImageIcon,
    Type,
    Calendar,
    MapPin,
    Link as LinkIcon,
    ArrowLeft,
    Users
} from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreateEvent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startsAt: "",
        endsAt: "",
        location: "",
        onlineUrl: "",
        capacity: "",
        category: "Workshop",
        status: "Open"
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        // Check for edit query param
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("edit");

        if (id) {
            setIsEditing(true);
            setEditId(id);
            fetchEventDetails(id);
        }
    }, [location]);

    const fetchEventDetails = async (id: string) => {
        setLoading(true);
        try {
            const response = await getEventById(id);
            const event = response!.data;

            // Format dates for datetime-local input
            const formatDate = (dateString: string) => {
                if (!dateString) return "";
                return new Date(dateString).toISOString().slice(0, 16);
            };

            setFormData({
                title: event.title,
                description: event.description || "",
                startsAt: formatDate(event.startsAt),
                endsAt: formatDate(event.endsAt),
                location: event.location || "",
                onlineUrl: event.onlineUrl || "",
                capacity: event.capacity || "",
                category: event.category || "Workshop",
                status: event.status || "Open"
            });
        } catch (err) {
            console.error(err);
            setError("Failed to fetch event details for editing.");
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

    const handleDescriptionChange = (description: string) => {
        setFormData({ ...formData, description });
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
            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("description", formData.description);
            formPayload.append("startsAt", formData.startsAt);
            if (formData.endsAt) formPayload.append("endsAt", formData.endsAt);
            if (formData.location) formPayload.append("location", formData.location);
            if (formData.onlineUrl) formPayload.append("onlineUrl", formData.onlineUrl);
            if (formData.capacity) formPayload.append("capacity", formData.capacity);
            formPayload.append("category", formData.category);
            formPayload.append("status", formData.status);

            if (imageFile) {
                formPayload.append("ImageUrl", imageFile); // Key must match backend upload.single('ImageUrl')
            }

            if (isEditing && editId) {
                await updateEvent(editId, formPayload);
            } else {
                await createEvent(formPayload);
            }
            navigate("/profile");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} event`);
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
                        {isEditing ? "Edit Event" : "Create New Event"}
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
                                Event Title
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
                                    placeholder="e.g. Data Science Summit 2025"
                                />
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Start Date & Time
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="datetime-local"
                                        name="startsAt"
                                        required
                                        value={formData.startsAt}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    End Date & Time
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="datetime-local"
                                        name="endsAt"
                                        value={formData.endsAt}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Online URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Location
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                        placeholder="e.g. Auditorium Hall"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Online Link (Optional)
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                        <LinkIcon size={18} />
                                    </div>
                                    <input
                                        type="url"
                                        name="onlineUrl"
                                        value={formData.onlineUrl}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                        placeholder="https://zoom.us/..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category & Status & Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-10 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                >
                                    <option value="Workshop">Workshop</option>
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Industry Talk">Industry Talk</option>
                                    <option value="Competition">Competition</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-10 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Filling Fast">Filling Fast</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Capacity
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-yellow-500 transition-colors">
                                        <Users size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                                        placeholder="e.g. 100 seats"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
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
                                    name="ImageUrl"
                                    onChange={handleFileChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
                                />
                                {isEditing && !imageFile && (
                                    <p className="mt-2 text-xs text-gray-500">Leave empty to keep current image</p>
                                )}
                            </div>
                        </div>

                        {/* Content (Description) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Description
                            </label>
                            <div className="relative group">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    className="text-white"
                                    placeholder="Write the event details here..."
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
                            {loading ? "Processing..." : (isEditing ? "Update Event" : "Create Event")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
