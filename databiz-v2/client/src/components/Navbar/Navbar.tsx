import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        DataBiz
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
