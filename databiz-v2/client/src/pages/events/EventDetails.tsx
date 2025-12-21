import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../../utils/eventData';

const EventDetails: React.FC = () => {
  // useParams returns a string or undefined for the key 'id'
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Explicitly casting or ensuring getEventById handles the type
  const event = getEventById(id!);

  // Handle event not found
  if (!event) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl text-gray-400 mb-8">Event not found</p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-32 md:pt-40">
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={event.ImageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="absolute top-6 left-4 md:left-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">Back to Events</span>
        </button>

        {/* Category & Status Badges */}
        <div className="absolute top-6 right-4 md:right-8 flex gap-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-xs font-semibold">
            {event.category}
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm ${event.status === 'Open' ? 'bg-green-600/80' :
            event.status === 'Filling Fast' ? 'bg-yellow-600/80' : 'bg-red-600/80'
            }`}>
            {event.status}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-12 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Title and Quick Info */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-10 rounded-t-3xl border border-gray-800">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Event Meta Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <i className="far fa-calendar text-blue-400"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Date</div>
                    <div className="font-semibold">
                      {new Date(event.startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <i className="far fa-clock text-purple-400"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Time</div>
                    <div className="font-semibold text-sm">
                      {new Date(event.startsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}
                      {event.endsAt && ` - ${new Date(event.endsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-green-400"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="font-semibold text-sm">{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <i className="fas fa-users text-yellow-400"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Capacity</div>
                    <div className="font-semibold text-sm">{event.capacity}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <span>Organized by</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  {event.createdBy.charAt(0)}
                </div>
                <span className="font-medium text-white">{event.createdBy}</span>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="bg-white text-black p-6 md:p-10 shadow-2xl">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* Registration CTA */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-10 rounded-b-3xl border border-gray-800 border-t-0">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
              <p className="text-gray-400 mb-6">
                Don't miss this opportunity. Register now to secure your spot!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <a
                  href={event.registrationLink}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-check-circle"></i>
                  <span>Register Now</span>
                </a> */}
                <button
                  onClick={() => navigate('/events')}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Browse Other Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .prose h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #000;
                }
                .prose p {
                    margin-bottom: 1rem;
                    color: #374151;
                }
                .prose ul {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                    list-style-type: disc;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                    color: #374151;
                }
                .prose strong {
                    font-weight: 600;
                    color: #000;
                }
            `}</style>
    </div>
  );
};

export default EventDetails;