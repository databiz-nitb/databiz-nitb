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
        setEvents(response.data || []);
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

  const now = new Date();

  // Upcoming: starts in future or has not finished yet (sorted soonest first)
  const upcomingEvents = events
    .filter((event) => new Date(event.endsAt || event.startsAt) >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  // Completed: ended in the past (sorted most recent first)
  const completedEvents = events
    .filter((event) => new Date(event.endsAt || event.startsAt) < now)
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

  const renderEventCard = (event: IEvent, isCompleted: boolean) => (
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
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              isCompleted
                ? 'bg-zinc-700/80 text-zinc-300'
                : event.status === 'Open'
                ? 'bg-green-600/80'
                : event.status === 'Filling Fast'
                ? 'bg-yellow-600/80'
                : 'bg-red-600/80'
            }`}
          >
            {isCompleted ? 'Completed' : (event.status || 'Open')}
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl text-center leading-tight">
            <div className="text-xs opacity-80">
              {new Date(event.startsAt).toLocaleString('en-US', { month: 'short' })}
            </div>
            <div className="text-2xl font-bold">
              {new Date(event.startsAt).getUTCDate()}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 md:w-3/5 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
            {event.title}
          </h2>

          <div className="space-y-2 mb-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <i className="far fa-clock text-blue-500"></i>
              <span>
                {new Date(event.startsAt).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
                {event.endsAt ? ` - ${new Date(event.endsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-blue-500"></i>
              <span>{event.location}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2">
                <i className="fas fa-users text-blue-500"></i>
                <span>{event.capacity}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
            {(() => {
              const plainText = decodeHtmlEntities((event.description || '').replace(/<[^>]*>?/gm, ''));
              return plainText.length > 120 ? `${plainText.substring(0, 120)}...` : plainText;
            })()}
          </div>

          {/* CTA */}
          <Link
            to={`/events/${event._id}`}
            className={`px-6 py-3 rounded-full font-semibold text-sm text-center transition-all duration-300 flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            {isCompleted ? 'View Recap' : 'View Details'}
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <SEO
        title="Events - Hackathons & Workshops | DataBiz"
        description="Upcoming tech events, hackathons and workshops by DataBiz. Join workshops, talks and networking at NIT Bhopal."
        path="/events"
        keywords="DataBiz events, hackathons NIT Bhopal, tech workshops, coding events"
      />
      <div className="bg-black text-white min-h-screen font-sans">
        {/* Header Hero */}
        <div className="relative bg-gradient-to-b from-gray-900 to-black pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              DataBiz Events
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for workshops, hackathons, talks, and networking opportunities
            </p>
            <div className="mt-6 flex justify-center gap-3 text-sm text-gray-400">
              <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                {upcomingEvents.length} Upcoming
              </span>
              <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                {completedEvents.length} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <section className="container mx-auto px-4 md:px-12 py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-3">
            <span className="w-2.5 h-8 bg-blue-500 rounded-full"></span>
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="p-8 rounded-2xl border border-gray-800 bg-gray-950/50 text-center text-gray-400">
              No upcoming events right now. Stay tuned for future announcements!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {upcomingEvents.map((event) => renderEventCard(event, false))}
            </div>
          )}
        </section>

        {/* Completed Events Section */}
        {completedEvents.length > 0 && (
          <section className="container mx-auto px-4 md:px-12 py-12 border-t border-gray-800/80">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-2.5 h-8 bg-purple-500 rounded-full"></span>
              Completed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {completedEvents.map((event) => renderEventCard(event, true))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default EventPage;