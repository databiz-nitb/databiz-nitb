import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../../services/event.service";
import { deleteEvent } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";
import type { IEvent } from "../../types";

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const res = await getEventById(id);
          setEvent(res.data);
        }
      } catch (err: any) {
        setError("Failed to load event");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (startsAt: string, endsAt?: string) => {
    const now = new Date();
    const startDate = new Date(startsAt);
    const endDate = endsAt ? new Date(endsAt) : null;
    
    if (endDate && now > endDate) {
      return { status: "past", label: "Past Event", color: "bg-gray-100 text-gray-600" };
    } else if (now < startDate) {
      const diffTime = startDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return { status: "today", label: "Today", color: "bg-red-100 text-red-600" };
      } else if (diffDays <= 7) {
        return { status: "soon", label: "This Week", color: "bg-orange-100 text-orange-600" };
      } else {
        return { status: "upcoming", label: "Upcoming", color: "bg-green-100 text-green-600" };
      }
    } else if (!endDate || now <= endDate) {
      return { status: "ongoing", label: "Ongoing", color: "bg-blue-100 text-blue-600" };
    }
    
    return { status: "upcoming", label: "Upcoming", color: "bg-green-100 text-green-600" };
  };

  const handleEditEvent = () => {
    if (id) {
      navigate(`/admin/events/edit/${id}`);
    }
  };

  const handleDeleteEvent = async () => {
    if (!id || !user || user.role !== 'admin') {
      alert('Unauthorized action');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event? This action cannot be undone.'
    );

    if (confirmDelete) {
      try {
        await deleteEvent(id);
        alert('Event deleted successfully!');
        navigate('/events');
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading event...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Event not found"}
        </div>
        <button
          onClick={() => navigate('/events')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  // Use startsAt or fallback to legacy date field
  const eventStartDate = event.startsAt || event.date;
  const eventStatus = eventStartDate ? getEventStatus(eventStartDate, event.endsAt) : null;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/events')}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>
      </div>

      {/* Event Preview at Top */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          {/* Event Title and Status */}
          <div className="flex flex-wrap items-start justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight flex-1 mr-4">
              {event.title}
            </h1>
            {eventStatus && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventStatus.color}`}>
                {eventStatus.label}
              </span>
            )}
          </div>

          {/* Event Description */}
          {event.description && (
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Date and Time */}
            {eventStartDate && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Date & Time</h3>
                </div>
                <p className="text-gray-700">
                  <strong>Starts:</strong> {formatDate(eventStartDate)}
                </p>
                {event.endsAt && (
                  <p className="text-gray-700 mt-1">
                    <strong>Ends:</strong> {formatDate(event.endsAt)}
                  </p>
                )}
              </div>
            )}

            {/* Location */}
            {(event.location || event.onlineUrl) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                {event.location && (
                  <p className="text-gray-700 mb-2">
                    <strong>Venue:</strong> {event.location}
                  </p>
                )}
                {event.onlineUrl && (
                  <div className="text-gray-700">
                    <strong>Online:</strong>
                    <a 
                      href={event.onlineUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Call to Action */}
          {eventStatus?.status === "upcoming" || eventStatus?.status === "ongoing" || eventStatus?.status === "today" ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {eventStatus.status === "today" ? "Event is Today!" : 
                     eventStatus.status === "ongoing" ? "Event is Ongoing!" : 
                     "Don't Miss This Event!"}
                  </h3>
                  <p className="text-blue-700">
                    {eventStatus.status === "today" ? "The event is happening today. Make sure you're prepared!" :
                     eventStatus.status === "ongoing" ? "The event is currently in progress. Join now!" :
                     "Mark your calendar and prepare for this upcoming event."}
                  </p>
                </div>
                {event.onlineUrl && (
                  <a
                    href={event.onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Now
                  </a>
                )}
              </div>
            </div>
          ) : eventStatus?.status === "past" ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Event Completed</h3>
              <p className="text-gray-600">This event has already taken place. Stay tuned for future events!</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Event Type:</span>
            <span className="ml-2 text-gray-600">
              {event.location && event.onlineUrl ? "Hybrid Event" :
               event.onlineUrl ? "Online Event" :
               event.location ? "In-Person Event" : "TBD"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span className="ml-2 text-gray-600">{eventStatus?.label || "Unknown"}</span>
          </div>
          {event.createdAt && (
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <span className="ml-2 text-gray-600">{formatDate(event.createdAt)}</span>
            </div>
          )}
          <div>
            <span className="font-medium text-gray-700">Published:</span>
            <span className="ml-2 text-gray-600">{event.published ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {user?.role === 'admin' && (
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={handleEditEvent}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Edit Event
          </button>
          <button 
            onClick={handleDeleteEvent}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
