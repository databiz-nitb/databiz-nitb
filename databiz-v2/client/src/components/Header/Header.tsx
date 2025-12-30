import React from 'react';
import { Link } from 'react-router-dom';
import Socials from '../Navbar/Socials';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-4 md:px-12 py-4 md:py-6 container mx-auto flex flex-col">
            <div className="flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 shadow-lg">
                        <img src="/DataBiz Logo.png" alt="DataBiz" className="h-8 md:h-10 w-auto" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">DataBiz</span>
                </Link>
                {/* Social Icons - Visible on all screens */}
                <Socials />
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-gray-600 my-3 md:my-4"></div>

            {/* Navigation Links */}
            <Navbar />
        </nav>
    );
};

export default Header;
