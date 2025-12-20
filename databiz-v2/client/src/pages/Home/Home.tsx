
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { blogData } from "../../utils/blogData";
import { getUpcomingEvents } from '../../utils/eventData';
import Rectangle10 from "../../assets/Rectangle 10.png"
import Typewriter from "../../components/Typewriter";

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans">

            {/* Hero Section */}
            <header className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
                        alt="Data Science Theme"
                        className="w-full h-full object-cover opacity-40 scale-105 animate-fade-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
                </div>

                {/* Header with Navbar and Socials */}
                {/* <Header /> */}

                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] bg-blue-600/10 rounded-full filter blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full filter blur-[100px] animate-pulse-slow delay-300"></div>

                    {/* Floating Data Blobs */}
                    <div className="absolute top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl opacity-20 rotate-12 animate-float blur-sm"></div>
                    <div className="absolute bottom-[25%] left-[15%] w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-float delay-100 blur-sm"></div>
                    <div className="absolute top-[40%] left-[25%] w-8 h-8 bg-blue-400/30 rounded-full animate-float delay-200 blur-[2px]"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Now Enrolling New Members
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
                            <span className="block">
                                <Typewriter text="We're " delay={0.2} />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
                                    <Typewriter text="Data Science" delay={0.8} />
                                </span>
                            </span>
                            <span className="block mt-2">
                                <Typewriter text="And Analytics Club" delay={2} />
                            </span>
                        </h1>

                        <p className="text-gray-400 mb-10 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed animate-fade-in-up delay-100">
                            Empowering the next generation of data enthusiasts through <span className="text-white font-medium">collaborative learning</span>, industry insights, and hands-on project experience.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-200">
                            <Link
                                to="/events"
                                className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                            >
                                <span>Explore Events</span>
                                <span className='text-xl group-hover:translate-x-1 transition-transform'>→</span>
                            </Link>

                            <button className="px-8 py-4 rounded-full font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/30 flex items-center gap-2">
                                Sponsor Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative gradient */}
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
            </header>

            {/* Info Section (Black Background) */}
            <section className="bg-black text-white py-10 md:py-20" id="about">
                <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-3 uppercase tracking-wider text-gray-400">Who We Are</h2>
                            <p className="text-gray-300 text-base leading-relaxed">
                                We are a student-run organization dedicated to fostering a community of data science enthusiasts. We provide resources, workshops, and networking opportunities to help students grow.
                            </p>
                        </div>

                        <div className="w-full h-[1px] bg-gray-800"></div>

                        <div>
                            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-400">Connect</h2>
                            <ul className="text-gray-300 text-base space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                                        <i className="fas fa-glass-cheers"></i>
                                    </span>
                                    Networking Events
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                                        <i className="fas fa-chalkboard-teacher"></i>
                                    </span>
                                    Industry Talks
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                                        <i className="fas fa-code"></i>
                                    </span>
                                    Hackathons
                                </li>
                            </ul>
                        </div>

                        <div className="w-full h-[1px] bg-gray-800"></div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-white">500+</h3>
                                <p className="text-gray-500 text-sm">Members</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">50+</h3>
                                <p className="text-gray-500 text-sm">Events</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">20+</h3>
                                <p className="text-gray-500 text-sm">Projects</p>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-gray-800"></div>

                        <Link to="/team" className="inline-flex items-center text-white font-bold hover:underline group">
                            MEET THE TEAM
                            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
                        <img
                            src={Rectangle10}
                            alt="Data Science Club Team"
                            className="relative rounded-2xl shadow-2xl w-full object-cover border border-gray-800"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-black border border-gray-700 p-4 rounded-xl shadow-xl hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                                    <i className="fas fa-check"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Status</p>
                                    <p className="font-bold text-white">Recruiting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Blogs (White Background) */}
            {/* Recent Blogs (Background Image & Glassmorphism) */}
            {/* Recent Blogs Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            Recent Blogs
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our latest insights and articles on data science, machine learning, and analytics
                        </p>
                    </div>

                    {/* Blog Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {blogData.slice(0, 3).map((blog) => (
                            <Link
                                key={blog._id}
                                to={`/blogs/${blog._id}`}
                                className="group bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                            >
                                {/* Blog Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                                        {blog.tags[0] || 'Article'}
                                    </div>

                                    {/* Read Time Badge */}
                                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                                        {blog.readTime}
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {blog.excerpt}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                                {blog.author.name.charAt(0)}
                                            </div>
                                            <span className="text-gray-300 text-sm">{blog.author.name}</span>
                                        </div>
                                        <span className="text-blue-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More
                                            <span className="text-lg">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <span>View All Blogs</span>
                            <span className="text-xl">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="bg-black text-white py-10 md:py-20" id="events">
                <div className="container mx-auto px-4 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        Upcoming Events
                    </h2>
                    <div className="space-y-6">
                        {getUpcomingEvents(2).map((event) => (
                            <div key={event._id} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    {/* Event Image */}
                                    <div className="relative w-full md:w-64 h-48 shrink-0 rounded-xl overflow-hidden border border-white/10">
                                        <img
                                            src={event.ImageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold z-10 text-center leading-tight">
                                            <span className="block text-xs uppercase opacity-80">
                                                {new Date(event.startsAt).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="block text-2xl">
                                                {new Date(event.startsAt).getDate()}
                                            </span>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                                            {event.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition">{event.title}</h3>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-400 text-sm mb-4">
                                            <span className="flex items-center gap-2"><i className="far fa-clock text-blue-500"></i> {new Date(event.startsAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}</span>
                                            <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-blue-500"></i> {event.location}</span>
                                        </div>
                                        <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl">
                                            {event.description}
                                        </p>
                                        <Link
                                            to={`/events/${event._id}`}
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                                        >
                                            View Details
                                            <span className="text-lg">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/events" className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                            View All Events
                            <span className="text-xl">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact (White Background) */}
            <section className="bg-white text-black py-10 md:py-20" id="contact">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-4 text-black">Get in Touch</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Have questions about the club, events, or how to join? We'd love to hear from you. Reach out to us through any of these channels.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black shrink-0">
                                        <i className="fas fa-envelope text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Email Us</h4>
                                        <p className="text-gray-600">contact@databiz.com</p>
                                        <p className="text-gray-600">support@databiz.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black shrink-0">
                                        <i className="fas fa-map-marker-alt text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Visit Us</h4>
                                        <p className="text-gray-600">123 Data Science Lane,</p>
                                        <p className="text-gray-600">Tech Campus, CA 90210</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea rows="4" className="w-full bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 w-full transition transform hover:-translate-y-1 shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
};

export default Home;
