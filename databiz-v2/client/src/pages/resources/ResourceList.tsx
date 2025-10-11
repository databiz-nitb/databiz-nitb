import React, { useEffect, useState } from "react";
import { getResources } from "../../services/resource.service";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    getResources().then((res) => setResources(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((r) => (
        <Link key={r._id} to={`/resources/${r._id}`}>
          <Card title={r.title} description={`Type: ${r.type}`} />
        </Link>
      ))}
    </div>
  );
};

export default ResourceList;
