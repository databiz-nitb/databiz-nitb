import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5052b5] text-gray-300 pt-10 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">DataBiz Club</h2>
          <p className="text-sm leading-relaxed">
            Empowering students to explore the world of Data Science and Analytics.
            We conduct workshops, projects, and hackathons to turn data into insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/events" className="hover:text-white transition">Events</a></li>
            <li><a href="/blogs" className="hover:text-white transition">Blogs</a></li>
            <li><a href="/pathways" className="hover:text-white transition">Pathways</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Connect With Us</h2>
          <p className="text-sm mb-4">Follow us on social media for updates and resources.</p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} <span className="text-white font-medium">DataBiz</span>. All rights reserved.</p>
        <p className="text-gray-400 mt-1">Made with ❤️ by Team DataBiz</p>
      </div>
    </footer>
  );
};

export default Footer;
