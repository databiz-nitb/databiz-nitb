import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourceById } from "../../services/resource.service";

const ResourceDetails: React.FC = () => {
  const { id } = useParams();
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    if (id) getResourceById(id).then((res) => setResource(res.data));
  }, [id]);

  if (!resource) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{resource.title}</h1>
      <p className="mb-2">Type: {resource.type}</p>
      <p className="mb-2">Tags: {resource.tags.join(", ")}</p>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Access Resource
      </a>
    </div>
  );
};

export default ResourceDetails;
