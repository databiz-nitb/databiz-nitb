import React, { useEffect, useState } from "react";
import { getProgress } from "../../services/progress.service";
import Card from "../../components/Card/Card";

const Progress: React.FC = () => {
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    getProgress().then((res) => setProgress(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {progress.map((p) => (
        <Card
          key={p._id}
          title={p.pathway.title}
          description={`Completed: ${p.completedResources.length}/${p.pathway.resources.length}`}
        />
      ))}
    </div>
  );
};

export default Progress;
