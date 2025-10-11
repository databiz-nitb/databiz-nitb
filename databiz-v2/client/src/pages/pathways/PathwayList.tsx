import React, { useEffect, useState } from "react";
import { getPathways } from "../../services/pathway.service";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

const PathwayList: React.FC = () => {
  const [pathways, setPathways] = useState<any[]>([]);

  useEffect(() => {
    getPathways().then((res) => setPathways(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pathways.map((p) => (
        <Link key={p._id} to={`/pathways/${p._id}`}>
          <Card title={p.title} description={p.description} />
        </Link>
      ))}
    </div>
  );
};

export default PathwayList;
