import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../../services/event.service';
import { useAuth } from '../../context/AuthContext';
import type { IEvent } from '../../types';
import { Edit, ArrowLeft, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (err) {
        console.error("Failed to fetch event", err);
        setError("Event not found");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-gray-400">Loading event...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">📅</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">404</h1>
          <p className="text-2xl text-gray-400 mb-8">Event not found</p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={event.ImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

        {/* Floating Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="absolute top-32 md:top-36 left-4 md:left-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-10 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-medium">Back to Events</span>
        </button>

        {/* Admin Edit Button */}
        {user?.role === 'admin' && (
          <Link
            to={`/create-event?edit=${event._id}`}
            className="absolute top-32 md:top-36 right-4 md:right-8 flex items-center gap-2 bg-yellow-500/90 backdrop-blur-md px-4 py-2.5 rounded-full text-white hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 z-10 font-medium"
          >
            <Edit size={18} />
            <span className="hidden sm:inline">Edit Event</span>
          </Link>
        )}

        {/* Category & Status Badges */}
        <div className="absolute bottom-8 left-4 md:left-8 flex flex-wrap gap-2 z-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            {event.category || 'Event'}
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${event.status === 'Open' ? 'bg-green-600/90' :
            event.status === 'Filling Fast' ? 'bg-yellow-600/90' : 'bg-red-600/90'
            }`}>
            {event.status || 'Open'}
          </div>
        </div>
      </div>

      {/* Content Section with Overlap */}
      <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Title and Quick Info Card */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 md:p-12 rounded-t-3xl border border-gray-800 shadow-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              {event.title}
            </h1>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Start Date Card */}
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Start Date</div>
                    <div className="font-semibold text-white text-sm leading-tight">
                      {(() => {
                        if (!event.startsAt) return 'TBD';
                        return new Date(event.startsAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* End Date Card */}
              {event.endsAt && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar size={24} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400 uppercase font-semibold mb-1">End Date</div>
                      <div className="font-semibold text-white text-sm leading-tight">
                        {new Date(event.endsAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Card */}
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Time</div>
                    <div className="font-semibold text-white text-sm leading-tight">
                      {(() => {
                        if (!event.startsAt) return 'Time TBD';
                        const startDate = new Date(event.startsAt);
                        const endDate = event.endsAt ? new Date(event.endsAt) : null;

                        const formatTime = (date: Date) => {
                          return date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          });
                        };

                        const startStr = formatTime(startDate);
                        const endStr = endDate ? formatTime(endDate) : null;

                        if (endStr && startStr !== endStr) {
                          return `${startStr} - ${endStr}`;
                        }
                        return startStr;
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Location</div>
                    <div className="font-semibold text-white text-sm leading-tight truncate">
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity Card */}

            </div>
          </div>

          {/* Event Description */}
          {/* <div className="bg-white text-black p-8 md:p-12 lg:p-16 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Event</h2>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
              }}
            />
          </div> */}



          <div className="bg-white text-black p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
              About This Event
            </h2>

            <div
              className="prose prose-base sm:prose-lg max-w-none leading-relaxed"
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                textAlign: "left",
                overflow: "visible",
                maxHeight: "none",
                height: "auto",
                hyphens: "none",
              }}
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>

          {/* Registration CTA */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 md:p-12 rounded-b-3xl border border-gray-800 border-t-0 shadow-2xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                Ready to Join?
              </h3>
              <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                Don't miss this opportunity. Secure your spot and be part of something amazing!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {event.onlineUrl && (
                  <a
                    href={event.onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span>Register Now</span>
                    <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                <button
                  onClick={() => navigate('/events')}
                  className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span>Browse Other Events</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Prose Styles */}
      <style>{`
        .prose h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          color: #000;
          line-height: 1.2;
        }
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #111;
        }
        .prose p {
          margin-bottom: 1.25rem;
          color: #374151;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: #374151;
          line-height: 1.7;
        }
        .prose strong {
          font-weight: 600;
          color: #000;
        }
        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
        }
        .prose code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #dc2626;
        }
        .prose pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose img {
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};

export default EventDetails;