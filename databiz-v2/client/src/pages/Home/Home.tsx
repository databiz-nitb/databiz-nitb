import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { motion, useInView } from 'framer-motion';
import { Users, Presentation, Code, Mail, MapPin, Twitter, Linkedin, Instagram, ExternalLink, ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import homeHeroImage from "../../assets/home.png";
import communityImage from "../../assets/images/2.png";
import quantumBlogImage from "../../assets/images/9.png";
import SEO from "../../components/SEO/SEO";
import { getBlogs } from '../../services/blog.service';
import { getEvents } from '../../services/event.service';
import { submitContactForm } from '../../services/query.service';
import type { IBlog, IEvent } from '../../types';

const decodeHtmlEntities = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const downloadBrochure = () => {
  const driveUrl = 'https://drive.google.com/file/d/1NefJk_rRlJCi6ur0IF0yG_sZ7TYSUove/view?usp=sharing';
  try {
    const fileId = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'DataBiz_Brochure.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(driveUrl, '_blank');
    }
  } catch {
    window.open(driveUrl, '_blank');
  }
};

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-9 border-l-2 border-sky-300 pl-4 text-left md:mb-12">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{children}</h2>
      {subtitle && <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 md:text-base">{subtitle}</p>}
    </div>
  );
}

const Home = () => (
  <>
    <SEO
      title="DataBiz - Student-led Tech Community"
      description="Join DataBiz, India's premier student-led tech community. Hackathons, workshops, networking & career opportunities in technology and data science. NIT Bhopal."
      path="/"
      keywords="DataBiz, databiz.in, tech community India, student hackathons, data science workshops, NIT Bhopal, coding events"
    />
    <HomeContent />
  </>
);

const HomeContent = () => {
  const [recentBlogs, setRecentBlogs] = useState<IBlog[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const blogsRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });
  const blogsInView = useInView(blogsRef, { once: true, margin: '-80px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-80px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, eventsRes] = await Promise.all([getBlogs(), getEvents()]);
        setRecentBlogs(blogsRes.data.slice(0, 3));
        const sorted = eventsRes.data
          .filter((event: IEvent) => new Date(event.endsAt || event.startsAt).getTime() >= Date.now())
          .sort((a: IEvent, b: IEvent) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
          .slice(0, 2);
        setUpcomingEvents(sorted);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAuthorName = () => 'Team DataBiz';

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans antialiased">
      {/* Hero */}
      <header className="relative flex min-h-[600px] items-center overflow-hidden pb-14 pt-32 sm:min-h-[680px] sm:pb-16 md:pt-36">
        <div className="absolute inset-0 z-0">
          <img
            src={homeHeroImage}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c11]/90 via-[#080c11]/55 to-[#080c11]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c11]/60 via-transparent to-[#080c11]/15" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mb-6 inline-flex items-center gap-2 border-l-2 border-sky-300 pl-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 sm:mb-8">
              Student-led · NIT Bhopal
            </motion.div>

            <motion.h1
              className="mb-2 text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              DataBiz
            </motion.h1>

            <motion.p
              className="mb-5 text-lg font-medium text-sky-200 sm:text-xl md:text-2xl"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              Data Science & Analytics Club
            </motion.p>

            <motion.p
              className="mb-8 max-w-xl text-sm leading-7 text-slate-200 sm:mb-10 sm:text-base md:text-lg"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              Empowering the next generation through collaborative learning, industry insights, and hands-on projects at NIT Bhopal.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link
                to="/events"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-sky-300 px-6 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Explore Events
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sponsor-us"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-black/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Sponsor Us
              </Link>
              <button
                onClick={downloadBrochure}
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-black/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Download Brochure
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </header>

      {/* About */}
      <section ref={aboutRef} className="border-t border-white/10 bg-[#0d141c] py-16 md:py-24" id="about">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Who We Are</p>
                <h2 className="mb-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">A community built by students, for students</h2>
                <p className="leading-7 text-slate-300">
                  DataBiz is the official Data Science & Analytics Club of NIT Bhopal. We bring together learners interested in data, ML, and AI through events, workshops, and real-world projects.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  { icon: Users, label: 'Networking Events', desc: 'Meet peers and industry folks' },
                  { icon: Presentation, label: 'Industry Talks', desc: 'Learn from practitioners' },
                  { icon: Code, label: 'Hackathons & Workshops', desc: 'Hands-on experience' },
                ].map((item, i) => (
                  <motion.li
                    key={item.label}
                    className="flex items-center gap-4 rounded-lg border border-white/[0.08] bg-[#101820] p-3 transition-colors hover:border-sky-200/20"
                    initial={{ opacity: 0, x: -12 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i + 0.2 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200/15 bg-sky-200/[0.06] text-sky-200">
                      <item.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="font-medium text-white">{item.label}</span>
                      <span className="text-gray-500 text-sm block">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <Link
                to="/team"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sky-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                Meet the team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/30">
                <img src={communityImage} alt="DataBiz students collaborating at a campus workshop" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-4 right-3 flex items-center gap-3 rounded-lg border border-white/10 bg-[#101820] px-4 py-3 shadow-xl sm:right-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Status</p>
                  <p className="font-semibold text-white text-sm">Recruiting</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section ref={blogsRef} className="border-t border-white/10 bg-[#080c11] py-16 md:py-24" id="blogs">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={blogsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <SectionTitle subtitle="Insights and updates on data science, ML, and analytics">
              Recent Blogs
            </SectionTitle>
          </motion.div>

          <div className={`grid grid-cols-1 gap-6 md:gap-8 ${recentBlogs.length === 1 ? 'mx-auto max-w-xl' : 'md:grid-cols-3'}`}>
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={blogsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-[#101820] transition-colors duration-300 hover:border-sky-200/25 hover:bg-[#131e28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
                  >
                    <div className={`${recentBlogs.length === 1 ? 'aspect-[16/8]' : 'aspect-[16/10]'} overflow-hidden`}>
                      <img
                        src={blog.image || (/quantum/i.test(blog.title) ? quantumBlogImage : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop")}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-sky-200">
                        {blog.tags?.[0] || 'Article'}
                      </span>
                      <h3 className="mt-2 font-semibold text-white transition-colors group-hover:text-sky-100 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                        {decodeHtmlEntities(blog.content.replace(/<[^>]*>?/gm, '')).slice(0, 90)}…
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-500 text-xs">{getAuthorName()}</span>
                        <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-[#101820] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-3">
                  <BookOpen size={20} className="mt-0.5 shrink-0 text-sky-200" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-white">Fresh ideas are on the way</p>
                    <p className="mt-1 text-sm text-slate-400">Explore the full collection of DataBiz articles.</p>
                  </div>
                </div>
                <Link to="/blogs" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-white transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                  Browse blogs <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={blogsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/90 text-sm font-medium hover:bg-white/5 hover:border-white/30 transition-all"
            >
              View all blogs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section ref={eventsRef} className="border-t border-white/10 bg-[#0d141c] py-16 md:py-24" id="events">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <SectionTitle subtitle="Workshops, hackathons, and talks at NIT Bhopal">
              Upcoming Events
            </SectionTitle>
          </motion.div>

          <div className="space-y-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 * i }}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#101820] transition-colors duration-300 hover:border-sky-200/25 hover:bg-[#131e28]"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 shrink-0 aspect-video md:aspect-auto md:h-44 relative">
                      <img
                        src={event.ImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 rounded-lg bg-[#0a0a0a]/90 backdrop-blur px-3 py-2 text-center">
                        <span className="block text-[10px] uppercase text-gray-400">
                          {new Date(event.startsAt).toLocaleString('en-US', { month: 'short' })}
                        </span>
                        <span className="block text-lg font-semibold text-white leading-none">
                          {new Date(event.startsAt).getDate()}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <span className="text-xs font-medium text-blue-400">{event.category || 'Event'}</span>
                        <h3 className="mt-1 text-xl font-semibold text-white">{event.title}</h3>
                        <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                          {decodeHtmlEntities(event.description.replace(/<[^>]*>?/gm, '')).slice(0, 120)}…
                        </p>
                        <div className="mt-3 flex flex-wrap gap-4 text-gray-500 text-xs">
                          <span>{new Date(event.startsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}</span>
                          {event.location && <span>{event.location}</span>}
                        </div>
                      </div>
                      <div className="flex gap-3 shrink-0">
                        <Link
                          to={`/events/${event._id}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                        >
                          Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        {event.onlineUrl && (
                          <a
                            href={event.onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                          >
                            Register
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-[#101820] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-3">
                  <CalendarDays size={20} className="mt-0.5 shrink-0 text-sky-200" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-white">No upcoming events just yet</p>
                    <p className="mt-1 text-sm text-slate-400">See past events and check back for the next announcement.</p>
                  </div>
                </div>
                <Link to="/events" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-white transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                  Event calendar <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={eventsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/90 text-sm font-medium hover:bg-white/5 hover:border-white/30 transition-all"
            >
              View all events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="border-t border-white/10 bg-[#080c11] py-16 md:py-24" id="contact">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 16 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Contact</p>
                <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">Get in touch</h2>
                <p className="leading-7 text-slate-300">
                  Questions about the club, events, or how to join? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border border-white/[0.08] bg-[#101820] p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200/15 bg-sky-200/[0.06] text-sky-200">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-white text-sm">Email</p>
                    <a href="mailto:databiz.nitb@gmail.com" className="text-sm text-slate-300 transition-colors hover:text-sky-200">databiz.nitb@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border border-white/[0.08] bg-[#101820] p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200/15 bg-sky-200/[0.06] text-sky-200">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-white text-sm">Location</p>
                    <p className="text-gray-400 text-sm">NIT Bhopal — MANIT</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">Follow us</p>
                <div className="flex gap-3">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/company/databiz-nitb/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/databiz_nitb" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="rounded-xl border border-white/10 bg-[#101820] p-5 sm:p-6 md:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition disabled:opacity-50"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition resize-none disabled:opacity-50"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
