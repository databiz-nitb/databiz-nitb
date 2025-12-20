import React from 'react';
import { Link } from 'react-router-dom';
import { eventData, type ClubEvent } from '../../utils/eventData';


const EventPage: React.FC = () => {
  // Check if there are no events
  if (eventData.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 pt-32 md:pt-40">
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
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-32 md:pt-40">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black py-16 md:py-24">
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
              {eventData.length} {eventData.length === 1 ? 'Event' : 'Events'}
            </span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {eventData.map((event: ClubEvent) => (
            <article
              key={event._id}
              className="group bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="md:flex">
                {/* Event Image */}
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src={event.ImageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${event.status === 'Open' ? 'bg-green-600/80' :
                    event.status === 'Filling Fast' ? 'bg-yellow-600/80' : 'bg-red-600/80'
                    }`}>
                    {event.status}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl text-center leading-tight">
                    <div className="text-xs opacity-80">
                      {new Date(event.startsAt).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-2xl font-bold">
                      {new Date(event.startsAt).getDate()}
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
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {event.description}
                  </p>

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
  );
};

export default EventPage;