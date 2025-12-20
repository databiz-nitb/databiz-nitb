// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, X, User } from "lucide-react";
// import { getUser } from "../../utils/auth.ts";
// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "About Us", path: "/about" },
//   { name: "Events", path: "/events" },
//   { name: "Pathways", path: "/pathways" },
//   { name: "Blogs", path: "/blogs" },
// ];

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = getUser();

//   return (
//     <nav className="w-full bg-[#5052b5] shadow-md sticky top-0 z-50">
//       <div className="lg:max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
//         {/* LOGO */}
//         <Link
//           to="/"
//           className="text-white text-2xl font-semibold tracking-wide"
//         >
//           DataBiz
//         </Link>

//         {/* DESKTOP MENU */}
//         <div className="hidden md:flex items-center space-x-8">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className={`text-white text-sm font-medium transition-all duration-200 hover:text-indigo-200 ${
//                 location.pathname === item.path
//                   ? "border-b-2 border-white pb-1"
//                   : ""
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}

//           {/* PROFILE / LOGIN */}
//           {user ? (
//             <button
//               onClick={() => navigate("/profile")}
//               className="ml-3 text-white hover:text-indigo-200 transition"
//               title="Profile"
//             >
//               <User size={22} />
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className={`text-white text-sm font-medium transition-all duration-200 hover:text-indigo-200 ${
//                 location.pathname === "/login"
//                   ? "border-b-2 border-white pb-1"
//                   : ""
//               }`}
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* MOBILE MENU ICON */}
//         <div className="md:hidden flex items-center space-x-4">
//           {user && (
//             <button
//               onClick={() => navigate("/profile")}
//               className="text-white hover:text-indigo-200 transition"
//               title="Profile"
//             >
//               <User size={22} />
//             </button>
//           )}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-white focus:outline-none"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="md:hidden bg-[#5052B5] flex flex-col items-center space-y-4 py-4 animate-fadeIn">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               onClick={() => setMenuOpen(false)}
//               className={`text-white text-base font-medium hover:text-indigo-200 ${
//                 location.pathname === item.path ? "underline" : ""
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//           {!user && (
//             <Link
//               to="/login"
//               onClick={() => setMenuOpen(false)}
//               className={`text-white text-base font-medium hover:text-indigo-200 ${
//                 location.pathname === "/login" ? "underline" : ""
//               }`}
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    // const navigate = useNavigate();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        ...(user ? [
            { name: "Events", path: "/events" },
            { name: "Blogs", path: "/blogs" },
        ] : []),
    ];

    return (
        <nav className="w-full">
            {/* Desktop Menu */}
            <div className="hidden md:flex justify-end items-center space-x-8 text-sm font-medium text-gray-100">
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="hover:text-gray-300 transition-colors">
                        {link.name}
                    </Link>
                ))}

                {user ? (
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 px-3 py-2 rounded-full border border-indigo-500/30 transition-all duration-300"
                        title="Profile"
                    >
                        <User size={20} />
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-end">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 hover:text-white focus:outline-none z-50"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`
                fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 transition-all duration-300 z-40
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-semibold text-gray-300 hover:text-white"
                    >
                        {link.name}
                    </Link>
                ))}

                {user ? (
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-2xl font-semibold text-indigo-500 hover:text-indigo-400"
                    >
                        <User size={24} />
                        Profile
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-semibold text-blue-500 hover:text-blue-400"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
