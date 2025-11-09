"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cpu,
  Users,
  Code,
  Mic2,
  // Rocket,
  // BarChart3,
  // Brain,
  // Lightbulb,
} from "lucide-react";
import { getEvents } from "../../services/event.service";

const whatWeDo = [
  { title: "Workshops & Seminars", icon: <Mic2 size={36} className="text-indigo-600" /> },
  { title: "Hackathons & Competitions", icon: <Cpu size={36} className="text-indigo-600" /> },
  { title: "Projects & Collaborations", icon: <Code size={36} className="text-indigo-600" /> },
  { title: "Guest Lectures & Webinars", icon: <Users size={36} className="text-indigo-600" /> },
];

// const events = [
//   {
//     title: "Data Science Bootcamp",
//     image: "/bootcamp.svg",
//     description:
//       "An intensive training program covering data science fundamentals and real-world applications.",
//     url: "/events/data-science-bootcamp",
//   },
//   {
//     title: "AI & ML Symposium",
//     image: "/symposium.svg",
//     description:
//       "A gathering of experts and enthusiasts to discuss the latest innovations in AI and Machine Learning.",
//     url: "/events/ai-ml-symposium",
//   },
//   {
//     title: "Annual DataFest",
//     image: "/datafest.svg",
//     description:
//       "A celebration of data with competitions, workshops, and networking opportunities.",
//     url: "/events/datafest",
//   },
//   {
//     title: "Tech Talks Series",
//     image: "/techtalk.svg",
//     description:
//       "A series of insightful talks by industry leaders on cutting-edge data technologies.",
//     url: "/events/tech-talks",
//   },
// ];



export default function Home() {

const [events, setEvents] = React.useState<
    Array<{ title: string; image: string; description: string; url: string }>
  >([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents();
      console.log(response)
      const eventsData = response.data;

      if (!eventsData || eventsData.length === 0) {
        console.log("No events data found");
      } else {
        console.log("Events Data:", eventsData);
        setEvents(eventsData);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-white to-indigo-50">
      <div className="lg:max-w-5xl w-full py-12 px-6 flex flex-col gap-24 justify-center items-start">
        
        {/* 🏠 HERO SECTION */}
        <motion.section
          className="w-full flex flex-col justify-center items-center text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gray-900">
            Data<span className="text-indigo-600">Biz</span>
          </h1>
          <p className="text-lg text-gray-600 mt-3 italic">
            Empowering Minds Through Data
          </p>
          <img
            src="/home.svg"
            alt="home illustration"
            className="w-full max-w-3xl mt-10"
          />
        </motion.section>

        {/* ℹ️ ABOUT SECTION */}
        <motion.section
          className="w-full flex sm:flex-row flex-col justify-between items-center gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="sm:w-1/2 flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-gray-900">
              <span className="text-indigo-600 mr-2">•</span>About DataBiz
            </h1>
            <p className="text-gray-600 leading-relaxed">
              DataBiz is the official <b>Data Science and Analytics Club</b> of
              NIT Bhopal, built by students passionate about transforming raw
              data into real insights.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We aim to create a community where learners explore the exciting
              world of <b>Data Science, Machine Learning, and AI</b> — from
              fundamentals to advanced applications.
            </p>
            <Link to="/about">
              <button className="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white rounded-md shadow font-medium">
                Learn More
              </button>
            </Link>
          </div>
          <div className="sm:w-1/2 flex justify-center items-center">
            <img
              src="/about.jpg"
              alt="about"
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </motion.section>

        {/* ⚙️ WHAT WE DO */}
        <motion.section
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
            <span className="text-indigo-600 mr-2">•</span>What We Do
          </h1>

          <div className="grid sm:grid-cols-4 grid-cols-2 gap-10 justify-items-center">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-center items-center gap-4 text-center hover:scale-105 transition-transform duration-300 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 flex justify-center items-center bg-indigo-100 rounded-full shadow-sm">
                  {item.icon}
                </div>
                <h2 className="font-semibold text-gray-800">{item.title}</h2>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 🎉 EVENTS SECTION */}
        <motion.section
          className="w-full py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
              <span className="text-indigo-600 mr-2">•</span>Our Events
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium group-hover:underline">
                      View Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 🚀 JOIN SECTION */}
        <motion.section
          className="w-full text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            <span className="text-indigo-600 mr-2">•</span>Join Us
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Be a part of our journey — learn, build, and grow with the DataBiz
            community. Collaborate on impactful projects and upskill with peers.
          </p>
          <Link to="/join">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold rounded-md shadow-md">
              Join Now
            </button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
