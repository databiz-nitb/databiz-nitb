// import React from "react";
// import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-[#5052b5] text-gray-300 pt-10 pb-6 px-6 md:px-16">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
//         {/* About Section */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-4">DataBiz Club</h2>
//           <p className="text-sm leading-relaxed">
//             Empowering students to explore the world of Data Science and Analytics.
//             We conduct workshops, projects, and hackathons to turn data into insights.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li><a href="/" className="hover:text-white transition">Home</a></li>
//             <li><a href="/about" className="hover:text-white transition">About</a></li>
//             <li><a href="/events" className="hover:text-white transition">Events</a></li>
//             <li><a href="/blogs" className="hover:text-white transition">Blogs</a></li>
//             <li><a href="/pathways" className="hover:text-white transition">Pathways</a></li>
//           </ul>
//         </div>

//         {/* Contact Section */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-4">Connect With Us</h2>
//           <p className="text-sm mb-4">Follow us on social media for updates and resources.</p>
//           <div className="flex space-x-4">
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transition"
//             >
//               <FaInstagram size={20} />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transition"
//             >
//               <FaLinkedin size={20} />
//             </a>
//             <a
//               href="https://github.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transition"
//             >
//               <FaGithub size={20} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-6 text-center text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} <span className="text-white font-medium">DataBiz</span>. All rights reserved.</p>
//         <p className="text-gray-400 mt-1">Made with ❤️ by Team DataBiz</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 bg-[#080c11] pb-8 pt-14 text-white md:pb-10 md:pt-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
                    {/* Brand */}
                    <div className="min-w-0">
                        <div className="mb-5 inline-flex rounded-md bg-white p-2.5">
                            <img src="/DataBiz Logo.png" alt="DataBiz" className="h-12 w-auto" />
                        </div>
                        <p className="mb-5 max-w-xs text-sm leading-6 text-slate-400">
                            Empowering the next generation of data scientists through community, learning, and innovation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/" className="transition-colors hover:text-sky-200">Home</Link></li>
                            <li><a href="#about" className="transition-colors hover:text-sky-200">About Us</a></li>
                            <li><a href="#events" className="transition-colors hover:text-sky-200">Events</a></li>
                            <li><Link to="/blog" className="transition-colors hover:text-sky-200">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="transition-colors hover:text-sky-200">Learning Path</a></li>
                            <li><a href="#" className="transition-colors hover:text-sky-200">Newsletter</a></li>
                            <li><a href="#" className="transition-colors hover:text-sky-200">Community Guidelines</a></li>
                            <li><a href="#" className="transition-colors hover:text-sky-200">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-white">Stay Updated</h3>
                        <p className="mb-4 text-sm leading-6 text-slate-400">Subscribe to our newsletter for the latest updates and events.</p>
                        <div className="flex flex-col gap-3">
                            <input type="email" placeholder="Enter your email" className="min-h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300/50" />
                            <button className="min-h-11 rounded-lg bg-sky-300 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs text-slate-500 sm:flex-row sm:items-center">
                    <p>&copy; 2025 DataBiz. All rights reserved.</p>
                    <div className="flex flex-wrap gap-5">
                        <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
                        <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
