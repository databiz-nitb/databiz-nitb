import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../services/event.service';
import type { IEvent } from '../../types';
import SEO from '../../components/SEO/SEO';

// HTML entity decoder helper function
const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
};

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        // Sort by date (ascending - closest upcoming first)
        const sorted = response.data.sort((a: IEvent, b: IEvent) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
        setEvents(sorted);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-24 md:pt-28">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Check if there are no events
  if (events.length === 0) {
    return (
      <>
        <SEO title="Events" description="Upcoming tech events, hackathons and workshops by DataBiz. NIT Bhopal." path="/events" />
        <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-24 md:pt-28">
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-6">📅</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">No Events Available</h1>
          <p className="text-xl text-gray-400 mb-8">
            We're planning exciting events for you. Check back soon!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Events - Hackathons & Workshops | DataBiz"
        description="Upcoming tech events, hackathons and workshops by DataBiz. Join workshops, talks and networking at NIT Bhopal."
        path="/events"
        keywords="DataBiz events, hackathons NIT Bhopal, tech workshops, coding events"
      />
      <div className="bg-black text-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Upcoming Events
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto">
            Join us for workshops, hackathons, talks, and networking opportunities
          </p>
          <div className="mt-6 text-center text-gray-400">
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
              {events.length} {events.length === 1 ? 'Event' : 'Events'}
            </span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {events.map((event) => (
            <article
              key={event._id}
              className="group bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="md:flex">
                {/* Event Image */}
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src={event.ImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category || 'Event'}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${event.status === 'Open' ? 'bg-green-600/80' :
                    event.status === 'Filling Fast' ? 'bg-yellow-600/80' : 'bg-red-600/80'
                    }`}>
                    {event.status || 'Open'}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl text-center leading-tight">
                    <div className="text-xs opacity-80">
                      {(() => {
                        const date = new Date(event.startsAt);
                        return date.toLocaleString('en-US', { month: 'short' });
                      })()}
                    </div>
                    <div className="text-2xl font-bold">
                      {(() => {
                        const date = new Date(event.startsAt);
                        return date.getUTCDate();
                      })()}
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 md:w-3/5 flex flex-col">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h2>

                  {/* Event Info */}
                  <div className="space-y-2 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <i className="far fa-clock text-blue-500"></i>
                      <span>{new Date(event.startsAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}{event.endsAt ? ` - ${new Date(event.endsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-blue-500"></i>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-blue-500"></i>
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                    {(() => {
                      // Strip HTML tags and decode entities
                      const plainText = decodeHtmlEntities(event.description.replace(/<[^>]*>?/gm, ''));
                      const truncated = plainText.length > 120
                        ? `${plainText.substring(0, 120)}...`
                        : plainText;
                      return <span>{truncated}</span>;
                    })()}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/events/${event._id}`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default EventPage;