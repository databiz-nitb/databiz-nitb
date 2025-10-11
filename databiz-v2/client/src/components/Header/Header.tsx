import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">DataBiz</Link>
      </div>

      <nav className="space-x-4">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:underline" to="/pathways">
          Pathways
        </Link>
        <Link className="hover:underline" to="/resources">
          Resources
        </Link>
        <Link className="hover:underline" to="/blogs">
          Blogs
        </Link>
        <Link className="hover:underline" to="/events">
          Events
        </Link>
        {token ? (
          <>
            <Link className="hover:underline" to="/progress">
              Progress
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:underline" to="/login">
              Login
            </Link>
            <Link className="hover:underline" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
