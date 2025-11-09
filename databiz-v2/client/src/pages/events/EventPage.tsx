"use client";
import React from "react";
import { Link } from "react-router-dom";
import {  MapPin } from "lucide-react";
import { getEvents } from "../../services/event.service";

// type Event = {
//   id: string;
//   title: string;
//   date: string;
//   location: string;
//   description: string;
//   image: string;
// };

// const eventsData: Event[] = [
//   {
//     id: "data-quest-2025",
//     title: "DataQuest 2025 – Hack the Data",
//     date: "12 March 2025",
//     location: "MANIT Auditorium",
//     description:
//       "A 24-hour hackathon where students analyze, predict, and visualize real-world datasets using advanced data tools.",
//     image: "/images/dataquest.jpg",
//   },
//   {
//     id: "ai-summit",
//     title: "AI & Analytics Summit",
//     date: "5 April 2025",
//     location: "Innovation Hub",
//     description:
//       "Explore the future of AI and data analytics with expert sessions, networking, and interactive workshops.",
//     image: "/images/aisummit.jpg",
//   },
//   {
//     id: "workshop-ml",
//     title: "Machine Learning Workshop",
//     date: "20 May 2025",
//     location: "Data Science Lab",
//     description:
//       "A hands-on workshop covering ML algorithms, model deployment, and data visualization techniques.",
//     image: "/images/mlworkshop.jpg",
//   },
//   {
//     id: "dataviz-bootcamp",
//     title: "Data Visualization Bootcamp",
//     date: "10 June 2025",
//     location: "Computer Center",
//     description:
//       "Master the art of telling stories through data using tools like Tableau, PowerBI, and Python.",
//     image: "/images/dataviz.jpg",
//   },
//   {
//     id: "python-dive",
//     title: "Python for Data Science",
//     date: "25 July 2025",
//     location: "Online Session",
//     description:
//       "Learn Python libraries such as NumPy, Pandas, and Matplotlib for real-world data analysis.",
//     image: "/images/python.jpg",
//   },
//   {
//     id: "data-careers",
//     title: "Careers in Data Science",
//     date: "15 August 2025",
//     location: "Main Seminar Hall",
//     description:
//       "Panel discussion with industry experts on the evolving career paths in Data Science and AI.",
//     image: "/images/career.jpg",
//   },
// ];

export default function EventsPage() {
  // const [events] = useState(eventsData);


  const [events, setEvents] = React.useState<
    Array<{ 
      id: string;
      title: string; 
      date: string;
      location: string;
      description: string; 
      image: string;
     }>
  >([]);

  React.useEffect(() => {
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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#eef2ff] to-white py-16 px-6 lg:px-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Our <span className="text-indigo-600">Events</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dive into the journey of Data Science and Analytics through our interactive
          workshops, hackathons, and summits.
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {events.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <div className="bg-white border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {event.date}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {event.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin size={16} className="mr-2 text-indigo-500" />{" "}
                  {event.location}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
