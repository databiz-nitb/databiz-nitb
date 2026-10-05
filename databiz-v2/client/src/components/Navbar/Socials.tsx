import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Socials: React.FC = () => {
  return (
    <div className="flex space-x-3 md:space-x-8 text-sm text-neutral-500 dark:text-gray-400">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
      >
        <Facebook size={18} />
      </a>
      <a
        href="https://www.instagram.com/databiz_nitb?igsh=MXZxcWlxYTBqc3Q1eQ=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
      >
        <Instagram size={18} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
      >
        <Twitter size={18} />
      </a>
      <a
        href="https://www.linkedin.com/company/databiz-nitb/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
      >
        <Linkedin size={18} />
      </a>
    </div>
  );
};

export default Socials;