import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Socials: React.FC = () => {
  return (
    <div className="w-full bg-[#5052B5] text-white flex justify-center items-center border-b border-white/20">
      <div className="max-w-5xl w-full flex justify-center sm:justify-end items-center gap-5 py-1.5 px-4 text-sm">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1877F2] transition-colors duration-200"
        >
          <Facebook size={18} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors duration-200"
        >
          <Instagram size={18} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-400 transition-colors duration-200"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#0A66C2] transition-colors duration-200"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  );
};

export default Socials;
