
import { teamData } from '../../utils/teamData';

const Team = () => {
    return (
        <div className="bg-slate-50 text-neutral-900 transition-colors duration-200 dark:bg-black dark:text-white min-h-screen font-sans">
            {/* Header Section */}
            <div className="relative bg-gradient-to-b from-slate-100 to-slate-50 dark:from-gray-900 dark:to-black pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-neutral-200 dark:border-white/10">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse-slow delay-300"></div>
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-transparent bg-clip-text animate-fade-in-up">
                        Meet Our Team
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        The brilliant minds behind our data-driven initiatives for the Academic Year 2025-26
                    </p>
                </div>
            </div>

            {/* Team Grid */}
            <main className="container mx-auto px-4 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {teamData.map((member, index) => (
                        <div
                            key={member.id}
                            className={`group relative bg-white border border-neutral-200 dark:bg-white/5 backdrop-blur-sm dark:border-white/10 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl dark:hover:bg-white/10 hover:-translate-y-2 dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Member Image */}
                            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="relative w-full h-full rounded-full object-cover border-4 border-neutral-200 dark:border-gray-800 transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Member Info */}
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sky-600 dark:text-blue-500 font-semibold mb-4 text-sm uppercase tracking-wider">
                                {member.role}
                            </p>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                                {member.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                {member.socials.linkedin && (
                                    <a href={member.socials.linkedin} className="text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                        <i className="fab fa-linkedin text-xl"></i>
                                    </a>
                                )}
                                {member.socials.github && (
                                    <a href={member.socials.github} className="text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                        <i className="fab fa-github text-xl"></i>
                                    </a>
                                )}
                                {member.socials.twitter && (
                                    <a href={member.socials.twitter} className="text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Team;
