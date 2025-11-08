import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Soicials from "../Navbar/Soicials";
import Navbar from "../Navbar/Navbar";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <Soicials/>
      <Navbar/>
    </header>
  );
};

export default Header;
