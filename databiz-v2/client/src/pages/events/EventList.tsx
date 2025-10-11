import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/event.service";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((e) => (
        <Link key={e._id} to={`/events/${e._id}`}>
          <Card
            title={e.title}
            description={`Date: ${new Date(e.date).toLocaleDateString()}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default EventList;
