import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Socials: React.FC = () => {
  return (
    <div className="flex space-x-3 md:space-x-8 text-sm md:text-sm text-gray-400">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        <Facebook size={18} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        <Instagram size={18} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        <Twitter size={18} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        <Linkedin size={18} />
      </a>
    </div>
  );
};

export default Socials;
