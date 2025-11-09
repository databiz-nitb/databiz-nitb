"use client";

import  { useState } from "react";
import { ChevronDown, ChevronUp,  ExternalLink } from "lucide-react";
// import { getPathways } from "../../services/pathway.service";

interface Resource {
  id: number;
  title: string;
  youtube?: string;
  completed: boolean;
}

interface Pathway {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
  materials: {
    title: string;
    type: "pdf" | "video" | "article";
    link: string;
  }[];
}

const pathwaysData: Pathway[] = [
  {
    id: 1,
    title: "Data Analytics Fundamentals",
    description:
      "Learn the core concepts of data analytics, including data cleaning, transformation, and visualization.",
    resources: [
      {
        id: 1,
        title: "Introduction to Data Analytics",
        youtube: "https://www.youtube.com/watch?v=68KkZY8gSAU",
        completed: false,
      },
      {
        id: 2,
        title: "Python for Data Analysis",
        youtube: "https://www.youtube.com/watch?v=vmEHCJofslg",
        completed: false,
      },
      {
        id: 3,
        title: "Exploratory Data Analysis (EDA)",
        youtube: "https://www.youtube.com/watch?v=Gp3AwL4S7kA",
        completed: false,
      },
    ],
    materials: [
      {
        title: "EDA with Pandas (PDF)",
        type: "pdf",
        link: "https://example.com/eda-guide.pdf",
      },
      {
        title: "Data Cleaning Tutorial (YouTube)",
        type: "video",
        link: "https://www.youtube.com/watch?v=uoJ0Tv-BFcQ",
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description:
      "Understand supervised and unsupervised learning, regression, and evaluation metrics.",
    resources: [
      {
        id: 1,
        title: "Supervised vs Unsupervised Learning",
        youtube: "https://www.youtube.com/watch?v=UqYde-LULfs",
        completed: false,
      },
      {
        id: 2,
        title: "Regression & Classification Overview",
        youtube: "https://www.youtube.com/watch?v=9r3X2fGxR0M",
        completed: false,
      },
      {
        id: 3,
        title: "Model Evaluation Metrics",
        youtube: "https://www.youtube.com/watch?v=85dtiMz9tSo",
        completed: false,
      },
    ],
    materials: [
      {
        title: "ML Algorithms Explained (PDF)",
        type: "pdf",
        link: "https://example.com/ml-algorithms.pdf",
      },
      {
        title: "ML Fundamentals (YouTube)",
        type: "video",
        link: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      },
    ],
  },
];

export default function PathwayDashboard() {
  const [pathways, setPathways] = useState(pathwaysData);
  // const [pathways, setPathways] = useState<Pathway[]>([]);

  // React.useEffect(() => {
  //   const fetchPathways = async () => {
  //     // Simulate fetching data from an API
  //     const response = await getPathways(
        
  //     );
  //     setPathways(response.data);
  //   }
  // }, []);

  const [selectedPathwayId, setSelectedPathwayId] = useState<number | null>(1);
  const [openResources, setOpenResources] = useState<boolean>(true);

  const selectedPathway = pathways.find((p) => p.id === selectedPathwayId);

  const handleToggle = (resourceId: number) => {
    if (!selectedPathway) return;
    const updated = pathways.map((p) =>
      p.id === selectedPathway.id
        ? {
            ...p,
            resources: p.resources.map((r) =>
              r.id === resourceId ? { ...r, completed: !r.completed } : r
            ),
          }
        : p
    );
    setPathways(updated);
  };

  const completedCount = selectedPathway?.resources.filter((r) => r.completed).length || 0;
  const totalCount = selectedPathway?.resources.length || 1;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl border border-indigo-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Learning Dashboard</h1>

        {/* Select Pathway */}
        <select
          value={selectedPathwayId ?? ""}
          onChange={(e) => setSelectedPathwayId(Number(e.target.value))}
          className="border border-indigo-200 text-gray-700 rounded-md px-3 py-2 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
          {pathways.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Overview */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800">{selectedPathway?.title}</h2>
          <p className="text-sm text-gray-500">{selectedPathway?.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-500 mb-1">Progress</p>
          <div className="flex items-center gap-3">
            {/* <Progress value={progress} className="w-40" /> */}
            <span className="text-sm font-medium text-indigo-600">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="border border-indigo-100 rounded-xl mb-8">
        <button
          onClick={() => setOpenResources(!openResources)}
          className="w-full flex justify-between items-center p-4 bg-indigo-50 hover:bg-indigo-100 transition rounded-t-xl"
          >
          <span className="font-semibold text-gray-800 text-lg">Resources</span>
          {openResources ? (
            <ChevronUp className="text-indigo-600" />
          ) : (
            <ChevronDown className="text-indigo-600" />
          )}
        </button>

        {openResources && (
          <div className="p-4 bg-white">
            {selectedPathway?.resources.map((r) => (
              <label
              key={r.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={r.completed}
                    onChange={() => handleToggle(r.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  <span
                    className={`text-gray-700 ${
                      r.completed ? "line-through text-gray-400" : ""
                    }`}
                    >
                    {r.title}
                  </span>
                </div>
                {r.youtube && (
                  <a
                  href={r.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
                  >
                    Watch <ExternalLink size={14} />
                  </a>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Additional Materials */}
      {selectedPathway && (
        <div className="border-t border-indigo-100 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Additional Resources
          </h3>
          <ul className="space-y-2">
            {selectedPathway.materials.map((m, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                <span className="text-gray-700">{m.title}</span>
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
                  >
                  Open <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
