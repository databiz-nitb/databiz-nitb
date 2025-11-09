import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { getUser } from "../../utils/auth.ts";
const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Pathways", path: "/pathways" },
  { name: "Blogs", path: "/blogs" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  return (
    <nav className="w-full bg-[#5052b5] shadow-md sticky top-0 z-50">
      <div className="lg:max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
        {/* LOGO */}
        <Link
          to="/"
          className="text-white text-2xl font-semibold tracking-wide"
        >
          DataBiz
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-white text-sm font-medium transition-all duration-200 hover:text-indigo-200 ${
                location.pathname === item.path
                  ? "border-b-2 border-white pb-1"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* PROFILE / LOGIN */}
          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="ml-3 text-white hover:text-indigo-200 transition"
              title="Profile"
            >
              <User size={22} />
            </button>
          ) : (
            <Link
              to="/login"
              className={`text-white text-sm font-medium transition-all duration-200 hover:text-indigo-200 ${
                location.pathname === "/login"
                  ? "border-b-2 border-white pb-1"
                  : ""
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden flex items-center space-x-4">
          {user && (
            <button
              onClick={() => navigate("/profile")}
              className="text-white hover:text-indigo-200 transition"
              title="Profile"
            >
              <User size={22} />
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#5052B5] flex flex-col items-center space-y-4 py-4 animate-fadeIn">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`text-white text-base font-medium hover:text-indigo-200 ${
                location.pathname === item.path ? "underline" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          {!user && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={`text-white text-base font-medium hover:text-indigo-200 ${
                location.pathname === "/login" ? "underline" : ""
              }`}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
