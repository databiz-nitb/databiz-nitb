import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowDown, ArrowUpRight, CalendarDays, CalendarOff, Clock3, MapPin, RefreshCw, Users } from 'lucide-react';
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
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    const fetchEvents = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const response = await getEvents();
        if (isCurrent) setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to fetch events", error);
        if (isCurrent) setLoadError(true);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };
    void fetchEvents();
    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  if (loading) {
    return (
      <>
        <SEO title="Events" description="Upcoming tech events, hackathons and workshops by DataBiz. NIT Bhopal." path="/events" />
        <main className="min-h-screen bg-[#080c11] px-4 pb-12 pt-36 text-white md:pt-40">
          <div className="mx-auto max-w-6xl animate-pulse space-y-6">
            <div className="h-7 w-32 rounded bg-white/[0.07]" />
            <div className="h-12 w-2/3 max-w-lg rounded bg-white/[0.07]" />
            <div className="h-5 w-full max-w-xl rounded bg-white/[0.05]" />
            <div className="mt-12 h-72 rounded-xl border border-white/10 bg-[#101820]" />
          </div>
        </main>
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <SEO title="Events" description="Upcoming tech events, hackathons and workshops by DataBiz. NIT Bhopal." path="/events" />
        <main className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 pb-12 pt-36 text-white md:pt-40">
          <div role="alert" className="w-full max-w-lg rounded-2xl border border-rose-200/15 bg-[#101820] p-6 text-center sm:p-8">
            <AlertCircle size={28} className="mx-auto mb-4 text-rose-200" aria-hidden="true" />
            <h1 className="text-xl font-semibold">Events couldn’t be loaded</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">Check your connection and try again.</p>
            <button onClick={() => setReloadKey(value => value + 1)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
              <RefreshCw size={16} aria-hidden="true" /> Try again
            </button>
          </div>
        </main>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        <SEO title="Events" description="Upcoming tech events, hackathons and workshops by DataBiz. NIT Bhopal." path="/events" />
        <main className="flex min-h-screen items-center justify-center bg-[#080c11] px-4 pb-12 pt-36 text-white md:pt-40">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#101820] p-6 text-center sm:p-10">
            <CalendarOff size={34} className="mx-auto mb-5 text-sky-200" aria-hidden="true" />
            <h1 className="text-2xl font-semibold sm:text-3xl">No events scheduled yet</h1>
            <p className="mb-7 mt-3 text-sm leading-6 text-slate-400">
              We're planning exciting events for you. Check back soon!
            </p>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Back to Home
            </Link>
          </div>
        </main>
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

  const renderEventCard = (event: IEvent, isCompleted: boolean, isFeatured = false) => {
    const startsAt = new Date(event.startsAt);
    const endsAt = event.endsAt ? new Date(event.endsAt) : null;
    const hasValidStart = Number.isFinite(startsAt.getTime());
    const hasValidEnd = endsAt !== null && Number.isFinite(endsAt.getTime());
    const dateLabel = hasValidStart
      ? startsAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Date to be announced';
    const startTime = hasValidStart ? startsAt.toLocaleTimeString('en-US', { timeStyle: 'short' }) : '';
    const endTime = hasValidEnd && endsAt ? endsAt.toLocaleTimeString('en-US', { timeStyle: 'short' }) : '';
    const schedule = hasValidEnd && endsAt
      ? `${dateLabel} · ${startTime} – ${endsAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${endTime}`
      : hasValidStart ? `${dateLabel} · ${startTime}` : dateLabel;
    const venue = event.location?.trim() || (event.onlineUrl ? 'Online event' : 'Venue to be announced');
    const plainText = decodeHtmlEntities((event.description || '').replace(/<[^>]*>?/gm, '')).replace(/\s+/g, ' ').trim();

    return (
    <article
      key={event._id}
      className={`group overflow-hidden rounded-xl border border-white/10 bg-[#101820] transition-colors duration-300 hover:border-sky-200/25 ${isFeatured ? 'shadow-xl shadow-black/20' : ''}`}
    >
      <div className="md:flex">
        {/* Event Image */}
        <div className={`relative h-64 overflow-hidden md:min-h-[340px] md:w-2/5 ${isFeatured ? 'lg:min-h-[420px]' : ''}`}>
          <img
            src={event.ImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10"></div>

          {/* Category Badge */}
          <div className="absolute left-4 top-4 rounded-md border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {event.category || 'Event'}
          </div>

          {/* Status Badge */}
          <div
            className={`absolute right-4 top-4 rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${
              isCompleted
                ? 'bg-zinc-900/75 text-zinc-200'
                : event.status === 'Open'
                ? 'bg-emerald-950/85 text-emerald-100'
                : event.status === 'Filling Fast'
                ? 'bg-amber-950/85 text-amber-100'
                : 'bg-rose-950/85 text-rose-100'
            }`}
          >
            {isCompleted ? 'Completed' : (event.status || 'Open')}
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 min-w-16 rounded-lg border border-white/15 bg-black/70 px-3 py-2 text-center leading-tight backdrop-blur-sm">
            <div className="text-xs uppercase tracking-wide text-slate-300">
              {hasValidStart ? startsAt.toLocaleString('en-US', { month: 'short' }) : 'Date'}
            </div>
            <div className="text-2xl font-semibold tabular-nums text-white">
              {hasValidStart ? startsAt.getDate() : '—'}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className={`flex min-w-0 flex-1 flex-col p-5 sm:p-7 ${isFeatured ? 'md:justify-center md:p-8 lg:p-10' : ''}`}>
          <h2 className={`mb-4 font-semibold leading-tight text-white transition-colors group-hover:text-sky-100 ${isFeatured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'}`}>
            {event.title}
          </h2>

          <div className="mb-5 space-y-3 text-sm text-slate-300">
            <div className="flex min-w-0 items-start gap-2.5">
              <Clock3 size={16} className="mt-0.5 shrink-0 text-sky-200" aria-hidden="true" />
              <time dateTime={hasValidStart ? startsAt.toISOString() : undefined}>{schedule}</time>
            </div>
            <div className="flex min-w-0 items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-sky-200" aria-hidden="true" />
              <span className="break-words">{venue}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2.5">
                <Users size={16} className="shrink-0 text-sky-200" aria-hidden="true" />
                <span>{event.capacity}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className={`mb-6 flex-grow text-sm leading-6 text-slate-400 ${isFeatured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {plainText.length > (isFeatured ? 220 : 150) ? `${plainText.substring(0, isFeatured ? 217 : 147).trimEnd()}...` : plainText}
          </div>

          {/* CTA */}
          <Link
            to={`/events/${event._id}`}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
              isCompleted
                ? 'border border-white/15 bg-white/[0.04] text-slate-100 hover:bg-white/10'
                : 'bg-sky-300 text-slate-950 hover:bg-sky-200'
            }`}
          >
            {isCompleted ? 'View Recap' : 'View Details'}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
    );
  };

  return (
    <>
      <SEO
        title="Events - Hackathons & Workshops | DataBiz"
        description="Upcoming tech events, hackathons and workshops by DataBiz. Join workshops, talks and networking at NIT Bhopal."
        path="/events"
        keywords="DataBiz events, hackathons NIT Bhopal, tech workshops, coding events"
      />
      <div className="min-h-screen bg-[#080c11] font-sans text-white">
        {/* Header Hero */}
        <header className="border-b border-white/10 bg-[#0d141c] pb-12 pt-36 md:pb-14 md:pt-40">
          <div className="container mx-auto px-4 md:px-12">
            <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">DataBiz / Calendar</p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              DataBiz Events
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Join us for workshops, hackathons, talks, and networking opportunities
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3">
                <CalendarDays size={15} className="text-sky-200" aria-hidden="true" />
                {upcomingEvents.length} Upcoming
              </span>
              <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3">
                <Clock3 size={15} className="text-slate-400" aria-hidden="true" />
                {completedEvents.length} Completed
              </span>
            </div>
          </div>
          </div>
        </header>

        {/* Upcoming Events Section */}
        <section className="container mx-auto px-4 py-10 md:px-12 md:py-12">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
            <span className="h-6 w-1 rounded-full bg-sky-300" aria-hidden="true" />
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#101820] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <CalendarOff size={20} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-white">No upcoming events right now</h3>
                  <p className="mt-1 text-sm text-slate-400">Check back soon, or explore the latest event recap.</p>
                </div>
              </div>
              {completedEvents.length > 0 && (
                <a href="#completed-events" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-slate-100 transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                  Past events <ArrowDown size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          ) : (
            <div className={upcomingEvents.length === 1 ? 'mx-auto max-w-6xl' : 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6'}>
              {upcomingEvents.map((event) => renderEventCard(event, false, upcomingEvents.length === 1))}
            </div>
          )}
        </section>

        {/* Completed Events Section */}
        {completedEvents.length > 0 && (
          <section id="completed-events" className="container mx-auto border-t border-white/10 px-4 py-10 md:px-12 md:py-12">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
              <span className="h-6 w-1 rounded-full bg-emerald-300" aria-hidden="true" />
              Completed Events
            </h2>
            <div className={completedEvents.length === 1 ? 'mx-auto max-w-6xl' : 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6'}>
              {completedEvents.map((event) => renderEventCard(event, true, completedEvents.length === 1))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default EventPage;