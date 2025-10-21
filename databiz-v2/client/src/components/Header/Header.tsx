import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md animate-slide-in-down">
      <div className="text-xl font-bold">
        <Link to="/" className="hover-scale transition-all duration-200 animate-glow">DataBiz</Link>
      </div>

      <nav className="space-x-4">
        <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/">
          Home
        </Link>
        
        {/* Public routes - visible to all */}
        <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/blogs" style={{animationDelay: '0.1s'}}>
          Blogs
        </Link>
        <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/events" style={{animationDelay: '0.2s'}}>
          Events
        </Link>
        
        {/* Junior and Admin only */}
        {user && (user.role === "junior" || user.role === "admin") && (
          <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/pathways" style={{animationDelay: '0.3s'}}>
            Pathways
          </Link>
        )}
        
        {/* Admin only */}
        {user && user.role === "admin" && (
          <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/admin" style={{animationDelay: '0.4s'}}>
            Admin
          </Link>
        )}
        
        {user ? (
          <>
            <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/progress" style={{animationDelay: '0.5s'}}>
              Progress
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover-scale btn-interactive animate-fade-in hover:shadow-lg"
              style={{animationDelay: '0.6s'}}
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/login" style={{animationDelay: '0.3s'}}>
              Login
            </Link>
            <Link className="hover:underline transition-all duration-200 hover-scale animate-fade-in" to="/register" style={{animationDelay: '0.4s'}}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
