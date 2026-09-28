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

import { Link, NavLink } from 'react-router-dom';
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
            ...(user.role === 'admin' || user.role === 'junior' ? [{ name: "Pathways", path: "/pathways" }] : []),
        ] : []),
    ];

    const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
        [
            "inline-flex min-h-10 items-center border-b-2 px-1 font-sans text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300",
            isActive
                ? "border-sky-300 text-white"
                : "border-transparent text-slate-200 hover:text-white",
        ].join(" ");

    const mobileNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
        [
            "inline-flex min-h-12 items-center border-b border-white/10 px-2 py-3 text-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300",
            isActive ? "text-sky-200" : "text-slate-200 hover:text-white",
        ].join(" ");

    return (
        <nav aria-label="Main navigation" className="w-full">
            {/* Desktop Menu */}
            <div className="hidden items-center justify-end gap-4 text-sm font-medium lg:flex xl:gap-7">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === "/"}
                        className={navLinkClassName}
                    >
                        {link.name}
                    </NavLink>
                ))}

                {user ? (
                    <Link
                        to="/profile"
                        aria-label="Profile"
                        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-slate-100 transition-colors hover:border-sky-200/30 hover:bg-sky-200/10 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                        title="Profile"
                    >
                        <User size={20} />
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex justify-end lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="relative z-50 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 bg-[#080c11]/70 text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div aria-hidden={!isOpen} className={`fixed inset-0 z-40 flex flex-col bg-[#080c11] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-200 lg:hidden ${isOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
                <div className="mx-auto flex w-full max-w-md flex-col">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Navigate</p>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === "/"}
                            onClick={() => setIsOpen(false)}
                            className={mobileNavLinkClassName}
                        >
                            {link.name}
                        </NavLink>
                    ))}

                {user ? (
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex min-h-12 items-center gap-3 px-2 text-lg font-semibold text-sky-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                    >
                        <User size={24} />
                        Profile
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-sky-300 px-4 text-base font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                    >
                        Login
                    </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
