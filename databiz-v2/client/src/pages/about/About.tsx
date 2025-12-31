import React from 'react';
import { FaLaptopCode, FaUsers, FaBriefcase, FaRocket } from 'react-icons/fa';
import aboutPageImage from "../../../src/assets/AboutPageImage.jpg"
// Import the about page image
// const aboutPageImage = '';

// Define a type for the Core Values list item
interface CoreValue {
    icon: string;
    text: React.ReactNode;
}

// Define the Core Values data
const coreValuesData: CoreValue[] = [
    {
        icon: '💡',
        text: (
            <>
                <span className="font-bold text-blue-400">Hands-on sessions and projects</span> to apply concepts in real-world scenarios.
            </>
        )
    },
    {
        icon: '💚',
        text: (
            <>
                <span className="font-bold text-green-400">Community First:</span> Collaboration and peer learning at the heart of everything we do.
            </>
        )
    },
    {
        icon: '🤝',
        text: (
            <>
                <span className="font-bold text-purple-400">Interdisciplinary Approach:</span> Connecting data with domains like economics, healthcare, environment, and more.
            </>
        )
    },
    {
        icon: '🚀',
        text: (
            <>
                <span className="font-bold text-blue-400">Innovation & Impact:</span> Encouraging members to use data for meaningful, socially responsible innovation.
            </>
        )
    },
];

// Define a type for the bottom cards data
interface Card {
    id: number;
    label: string;
    icon: React.ReactNode;
}

const cardData: Card[] = [
    { id: 1, label: 'Learning by Doing', icon: <FaLaptopCode /> },
    { id: 2, label: 'Community Driven', icon: <FaUsers /> },
    { id: 3, label: 'Industry Ready', icon: <FaBriefcase /> },
    { id: 4, label: 'Innovation First', icon: <FaRocket /> },
];

const About: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Outer container with max width and centered padding */}
            <div className="max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12">

                {/* --- Who We Are Section --- */}
                <header className="mb-16 md:mb-20 mt-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Who We Are
                    </h1>
                    <p className="max-w-5xl mx-auto text-lg md:text-xl leading-relaxed text-center text-gray-300">
                        <span className="font-bold text-white">DataBiz</span> is the official Data Science and Analytics Club of NIT Bhopal, built by students who are passionate about transforming raw data into real insights. We aim to create a community where learners explore the exciting world of Data Science, Machine Learning, and Artificial Intelligence — from fundamentals to advanced applications.
                    </p>
                </header>

                {/* --- Horizontal Rule --- */}
                <hr className="my-12 border-gray-800" />

                {/* --- Mission Section --- */}
                <section className="mt-16 md:mt-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Mission
                    </h2>

                    <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
                        {/* Image Placeholder with gradient border effect */}
                        <div className="relative w-full md:w-1/2">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur-xl"></div>
                            <div className="relative bg-gray-900 h-80 w-full rounded-2xl flex items-center justify-center border border-gray-800 overflow-hidden">
                                <img src={aboutPageImage} alt="about" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <p className="w-full md:w-1/2 text-lg md:text-xl leading-relaxed text-gray-300">
                            Our mission is to empower students with data-driven thinking, enabling them to solve real-world problems using modern analytical tools and technologies. We believe that <span className="font-bold text-white">data is not just numbers</span> — it's stories waiting to be told, and we want to inspire every member to become a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">storyteller through data</span>.
                        </p>
                    </div>
                </section>

                {/* --- Horizontal Rule --- */}
                <hr className="my-12 border-gray-800" />

                {/* --- Core Values Section --- */}
                <section className="mt-16 md:mt-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Core Values
                    </h2>
                    <div className="space-y-6">
                        {coreValuesData.map((value, index) => (
                            <div
                                key={index}
                                className="flex items-start text-lg md:text-xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition duration-300"
                            >
                                <span className="text-3xl mr-4 pt-1">{value.icon}</span>
                                <p className="text-gray-300">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Horizontal Rule --- */}
                <hr className="my-12 border-gray-800" />

                {/* --- Learning Cards Section --- */}
                <section className="mt-16 md:mt-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Our Approach
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardData.map(card => (
                            <div
                                key={card.id}
                                className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Gradient background effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 group-hover:opacity-40 blur transition-opacity"></div>

                                <div className="relative bg-gray-900 border border-gray-800">
                                    {/* Card Icon */}
                                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 w-full flex items-center justify-center">
                                        <div className="text-6xl text-blue-400 opacity-30 group-hover:opacity-50 transition-opacity">
                                            {card.icon}
                                        </div>
                                    </div>

                                    {/* Card Label */}
                                    <div className="bg-black/50 backdrop-blur-sm p-5 text-center font-bold text-white border-t border-gray-800">
                                        {card.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default About;
