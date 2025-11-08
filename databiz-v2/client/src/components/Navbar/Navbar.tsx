import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import Soicials from "./Soicials";
const Navbar: React.FC = () => {
  // const { user, logout } = useAuth();
  const navItem=["DataBiz","Home","About Us","Events","Pathways","Blogs","Login"];
  return (
    <nav className="w-full bg-[#5555b4]">
      <div className="max-w-6xl mx-auto flex justify-center items-center space-x-12 py-3 text-white gap-10">
        <a href="#" className="hover:text-gray-200">DataBiz</a>

        <a href="#" className="relative text-white">
          Home
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500"></span>
        </a>

        <a href="#" className="hover:text-gray-200">About Us</a>
        <a href="#" className="hover:text-gray-200">Events</a>
        <a href="#" className="hover:text-gray-200">Pathways</a>
        <a href="#" className="hover:text-gray-200">Blogs</a>
        <a href="#" className="hover:text-gray-200">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
