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
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="bg-white rounded-lg p-3 inline-block mb-6 shadow-lg">
                            <img src="/DataBiz Logo.png" alt="DataBiz" className="h-12 w-auto" />
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Empowering the next generation of data scientists through community, learning, and innovation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#events" className="hover:text-white transition">Events</a></li>
                            <li><Link to="/blog" className="hover:text-white transition">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Learning Path</a></li>
                            <li><a href="#" className="hover:text-white transition">Newsletter</a></li>
                            <li><a href="#" className="hover:text-white transition">Community Guidelines</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Stay Updated</h3>
                        <p className="text-gray-400 mb-4 text-sm">Subscribe to our newsletter for the latest updates and events.</p>
                        <div className="flex flex-col gap-3">
                            <input type="email" placeholder="Enter your email" className="bg-white/10 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white transition" />
                            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2025 DataBiz. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
