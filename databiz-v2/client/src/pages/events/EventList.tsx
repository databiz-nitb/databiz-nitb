import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/event.service";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { IEvent } from "../../types";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data);
    } catch (err: any) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const filteredEvents = events.filter(event => {
    // Use startsAt or fallback to legacy date field
    const eventDate = new Date(event.startsAt || event.date || '');
    switch (filter) {
      case "upcoming":
        return eventDate >= now;
      case "past":
        return eventDate < now;
      default:
        return true;
    }
  }).sort((a, b) => {
    // Sort upcoming events by date ascending, past events by date descending
    const dateA = new Date(a.startsAt || a.date || '');
    const dateB = new Date(b.startsAt || b.date || '');
    return filter === "past" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (dateString: string | undefined) => {
    if (!dateString) {
      return { status: "unknown", label: "Unknown", color: "bg-gray-100 text-gray-600" };
    }
    
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "past", label: "Past Event", color: "bg-gray-100 text-gray-600" };
    } else if (diffDays === 0) {
      return { status: "today", label: "Today", color: "bg-red-100 text-red-600" };
    } else if (diffDays <= 7) {
      return { status: "soon", label: "This Week", color: "bg-orange-100 text-orange-600" };
    } else {
      return { status: "upcoming", label: "Upcoming", color: "bg-green-100 text-green-600" };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600 animate-pulse-subtle">Loading events...</div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-left">Events</h1>
          <p className="text-gray-600 animate-fade-in-left" style={{animationDelay: '0.2s'}}>Stay updated with our latest workshops, seminars, and networking events</p>
        </div>
        {user?.role === "admin" && (
          <Link to="/admin/events/create">
            <Button className="btn-interactive hover-lift animate-fade-in-right bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </Button>
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 animate-slide-in-up">
        <div className="flex gap-2">
          {[
            { key: "upcoming", label: "Upcoming" },
            { key: "past", label: "Past Events" },
            { key: "all", label: "All Events" }
          ].map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-scale animate-fade-in ${
                filter === tab.key
                  ? "bg-blue-600 text-white animate-scale-in"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {tab.label}
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

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => {
            const eventDate = event.startsAt || event.date;
            const eventStatus = getEventStatus(eventDate);
            return (
              <Link key={event._id} to={`/events/${event._id}`}>
                <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full hover-lift animate-stagger-${Math.min(index + 1, 6)}`}>
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex-1">
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 animate-pulse-subtle ${eventStatus.color}`}>
                        {eventStatus.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                      {event.description}
                    </p>
                    
                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-500">
                      {eventDate && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(eventDate)}</span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.onlineUrl && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                          <span>Online Event</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button className="btn-interactive hover-lift w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-sm font-semibold rounded-lg shadow-md">
                        <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg animate-fade-in-up">No events found</p>
            <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {filter === "all" 
                ? "No events are scheduled yet." 
                : `No ${filter} events found.`
              }
            </p>
          </div>
          {user?.role === "admin" && (
            <Link to="/admin/events/create">
              <Button className="btn-interactive hover-lift animate-scale-in-bounce bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg" style={{animationDelay: '0.4s'}}>
                <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Create First Event
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
