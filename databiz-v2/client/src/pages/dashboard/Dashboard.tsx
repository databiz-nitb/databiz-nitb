import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
      <p>
        Use the sidebar to navigate through Pathways, Resources, Blogs, and
        Events.
      </p>
    </div>
  );
};

export default Dashboard;
