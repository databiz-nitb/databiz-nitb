import React from 'react';
import { Link } from 'react-router-dom';
import Socials from '../Navbar/Socials';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <nav className="absolute backfrop-blur-3xl transparent top-0 left-0 w-full z-20 px-4 md:px-12 py-4 md:py-6  mx-auto flex flex-col">
        <div className="flex flex-col max-w-7xl mx-auto w-full ">
            <div className="flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font font-serif text-white tracking-wide">DataBiz</span>
                </Link>
                {/* Social Icons - Visible on all screens */}
            <Navbar />
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-gray-600 my-3 md:my-4"></div>

            {/* Navigation Links */}

            </div>
        </nav>
    );
};

export default Header;
