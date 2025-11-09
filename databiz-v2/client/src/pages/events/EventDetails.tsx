import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";

const eventsData = [
  {
    id: "data-quest-2025",
    title: "DataQuest 2025 – Hack the Data",
    date: "12 March 2025",
    location: "MANIT Auditorium",
    description:
      "DataQuest 2025 brings together data enthusiasts for a 24-hour hackathon. Participants will work on real-world datasets, build predictive models, and visualize insights to solve challenging problems.",
    image: "/images/dataquest.jpg",
    resources: [
      { type: "PDF", link: "/resources/dataquest-guide.pdf" },
      { type: "YouTube", link: "https://youtu.be/sample" },
    ],
  },
  {
    id: "ai-summit",
    title: "AI & Analytics Summit",
    date: "5 April 2025",
    location: "Innovation Hub",
    description:
      "The AI & Analytics Summit gathers experts, researchers, and students to explore innovations in artificial intelligence and data analytics.",
    image: "/images/aisummit.jpg",
    resources: [
      { type: "YouTube", link: "https://youtu.be/sample2" },
    ],
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Event not found 😔
        </h1>
        <Link
          to="/events"
          className="mt-4 text-blue-600 hover:underline flex items-center"
        >
          <ArrowLeft className="mr-2" size={18} /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <Link
            to="/events"
            className="text-blue-600 hover:underline flex items-center mb-4"
          >
            <ArrowLeft className="mr-2" size={18} /> Back to Events
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">{event.title}</h1>
          <div className="flex items-center text-gray-600 space-x-4 mb-5">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" /> {event.date}
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" /> {event.location}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {event.description}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Resources
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {event.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {res.type} Link
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
