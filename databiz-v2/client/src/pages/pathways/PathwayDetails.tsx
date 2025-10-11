import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPathwayById } from "../../services/pathway.service";
import Card from "../../components/Card/Card";

const PathwayDetails: React.FC = () => {
  const { id } = useParams();
  const [pathway, setPathway] = useState<any>(null);

  useEffect(() => {
    if (id) getPathwayById(id).then((res) => setPathway(res.data));
  }, [id]);

  if (!pathway) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{pathway.title}</h1>
      <p className="mb-4">{pathway.description}</p>
      <h2 className="text-xl font-semibold mb-2">Resources:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pathway.resources.map((r: any) => (
          <Card key={r._id} title={r.title} description={`Type: ${r.type}`} />
        ))}
      </div>
    </div>
  );
};

export default PathwayDetails;
