import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <header className="absolute inset-x-0 top-0 z-30 px-4 py-4 md:px-12 md:py-6">
            <div className="mx-auto w-full max-w-7xl">
                <div className="flex min-h-10 items-center justify-between gap-5">
                    <Link to="/" aria-label="DataBiz home" className="shrink-0 rounded-sm text-2xl font-semibold text-white transition-colors hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 md:text-3xl">
                        DataBiz
                    </Link>
                    <div className="flex min-w-0 flex-1 justify-end">
                        <Navbar />
                    </div>
                </div>
                <div className="mt-4 h-px w-full bg-white/15" aria-hidden="true" />
            </div>
        </header>
    );
};

export default Header;
