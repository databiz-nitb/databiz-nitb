import React from 'react';
import Socials from '../Navbar/Socials';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-4 md:px-12 py-4 md:py-6 container mx-auto flex flex-col">
            <div className="flex justify-between items-center w-full">
                <div className="text-lg md:text-2xl text-gray-100 font-bold tracking-wider">DataBiz</div>
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
