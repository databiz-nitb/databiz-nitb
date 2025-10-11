import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/event.service";

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (id) getEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDetails;
